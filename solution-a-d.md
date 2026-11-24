Guidelines: Read all applicable guidelines before executing ANY tasks below:

guidelines.md — Universal execution rules
guidelines-agent.md — Universal agent patterns
guidelines-agent-python.md — Python implementation details
guidelines-agent-skills.md — Runtime skills patterns
guidelines-agent-mcp.md — MCP integration patterns
•
Read `product-requirements-document.md` and `intent.md` at the solution root for full context
•
Bootstrap agent code in `assets/sap-guardian-agent/` using the `sap-agent-bootstrap` skill (invoke from inside `assets/sap-guardian-agent/`, use copy commands — do NOT create files manually)
•
Install dependencies, validate the agent starts and responds at `/.well-known/agent.json`
The agent handles complex, domain-specific multi-step workflows and A&D regulatory rules — runtime skills are required.

•
Create `assets/sap-guardian-agent/app/skills/parts-authentication/SKILL.md` — multi-factor authentication workflow: price anomaly check, supplier approval lookup, ERAI/GIDEP query, date-code validation, documentation completeness check, composite risk score computation, and risk-band classification (low/medium/high/critical). Include the risk factor weights from the PRD (price 0.25, supplier 0.20, documentation 0.20, supply chain 0.20, part characteristics 0.15). Include fallback behavior when external databases are unreachable.
•
Create `assets/sap-guardian-agent/app/skills/parts-authentication/references/risk-scoring-rules.md` — risk band thresholds (0.0–0.3 low, 0.3–0.6 medium, 0.6–0.8 high, 0.8–1.0 critical) and per-band action matrix (log only / flag / quarantine+notify / quarantine+block+escalate).
•
Create `assets/sap-guardian-agent/app/skills/airworthiness-validation/SKILL.md` — 8130-3 and CoC document validation workflow: repair station certificate validity check, work scope vs capability list comparison, digital signature integrity, serial number consistency across documents, and Release to Service vs Hold decision logic.
•
Create `assets/sap-guardian-agent/app/skills/airworthiness-validation/references/validation-checks.md` — checklist of all required 8130-3 validation fields (issuing authority, certificate number, work performed description, release authorization statement, date, signature block) and failure reason codes.
•
Create `assets/sap-guardian-agent/app/skills/pma-oem-enforcement/SKILL.md` — PMA vs OEM policy enforcement workflow: ATA chapter lookup, criticality classification check, customer policy rule evaluation (OEM-only, PMA-allowed, exception-required), alternate OEM part number suggestion, and escalation path for exceptions.
•
Create `assets/sap-guardian-agent/app/skills/pma-oem-enforcement/references/ata-policy-matrix.md` — sample ATA chapter policy matrix (flight controls ATA 27 = OEM-only critical, cabin interior ATA 25 = PMA-allowed, etc.) as a configurable reference table.
•
Create `assets/sap-guardian-agent/app/skills/warranty-fraud-detection/SKILL.md` — MRO warranty fraud detection workflow: claim frequency analysis vs. customer benchmark, returned serial number vs. original sale record match, counterfeit replacement indicator check, labor hours validation against standard repair time, fraud score computation, and route decision (approve / review / investigate / deny).
•
Create `assets/sap-guardian-agent/app/skills/warranty-fraud-detection/references/fraud-indicators.md` — fraud indicator weights from PRD (claim pattern 0.25, part authentication 0.30, documentation inconsistency 0.20, customer risk profile 0.15, economic anomaly 0.10) and threshold definitions for each route decision.
•
Create `assets/sap-guardian-agent/app/skills/supplier-risk-scoring/SKILL.md` — supplier risk scoring workflow: ERAI alert history lookup, GIDEP report matching, internal quality history aggregation from SAP Quality Info Records, composite risk score update, threshold breach notification logic.
•
Create `assets/sap-guardian-agent/app/skills/regulatory-reporting/SKILL.md` — regulatory report generation workflow: counterfeit finding confirmation check (risk score ≥ 0.8), report type selection (FAA AC 21-29D SUP report, DFARS 252.246-7007/7008 notification, Transport Canada CAR 571), draft generation from evidence package, deadline tracking, mandatory human approval gate before submission. Must never submit to external bodies without explicit approval.
•
Create `assets/sap-guardian-agent/app/skills/regulatory-reporting/references/report-templates.md` — skeleton templates for FAA SUP report (Part/Serial/Supplier/Description of Concern/Regulatory Basis) and DFARS counterfeit notification (Contractor/Contract/CLIN/Part/Supplier/Evidence Summary).
•
Open `assets/sap-guardian-agent/app/agent.py` and write the system prompt:
Identity: SAP Guardian — Aerospace & Defense Aftermarket Intelligence Agent
Purpose: Authenticate parts, validate airworthiness documents, enforce PMA/OEM policies, detect warranty fraud, score supplier risk, and generate regulatory reports using SAP S/4HANA data and external A&D intelligence databases
Instruct the agent to NEVER fabricate part numbers, serial numbers, supplier data, or certification records — always retrieve live data via MCP tools
Instruct the agent to set pagination top parameter ≤ 100 on all tool calls that support it
Instruct the agent to relay tool errors verbatim without embellishment
Instruct the agent to NEVER submit any regulatory report (FAA, DFARS, Transport Canada) to an external body without explicit human approval — always produce a draft and route for review
Instruct the agent to load the appropriate runtime skill before executing each major workflow (parts-authentication, airworthiness-validation, pma-oem-enforcement, warranty-fraud-detection, supplier-risk-scoring, regulatory-reporting)
Instruct the agent to flag data gaps (e.g. ERAI/GIDEP unreachable) explicitly in its risk assessment — never silently proceed as if external checks passed
Instruct the agent that all quarantine, block, and approval actions must be logged immutably via SAP Quality Notification or Quality Task creation
•
Implement `validate_airworthiness_document` tool that:
Accepts: material number, serial number, certificate type (8130-3 | CoC), document reference
Loads the airworthiness-validation runtime skill
Calls: get_material_serial_number (CE_API_MATERIALSERIALNUMBER) to verify serial number match
Performs: repair station validity check, work scope vs capability check, digital signature check, serial number consistency check (mock external repair station DB as a configurable reference)
Returns: validation result (pass/fail), reason codes for each check, recommended action (Release to Service | Hold — awaiting airworthiness engineer review)
•
Implement `create_airworthiness_task` tool that:
Calls create_quality_task (QUALITYTASK) to create a follow-up task in SAP assigned to the airworthiness engineer when any validation check fails
•
Implement `check_pma_oem_policy` tool that:
Accepts: material number, purchase order number, part type (PMA | OEM | TSO), ATA chapter, criticality class, customer policy configuration
Loads the pma-oem-enforcement runtime skill
Calls: get_quality_info_record (API_QUALITYINFORECORD_SRV) for approved source verification
Evaluates the customer's OEM-only policy against the ATA chapter and criticality class (using ata-policy-matrix.md)
Returns: policy_compliant (bool), violation_type (hard_block | advisory), suggested_oem_part_number (if available), escalation_required (bool)
•
Implement `notify_po_policy_violation` tool that creates a SAP Quality Notification (`create_quality_notification` via CE_QUALITYNOTIFICATION) with violation details, suggested OEM alternative, and escalation flag
•
Implement `quarantine_inventory` tool that:
Accepts: material number, batch number, serial number, plant, storage location, risk_band, evidence_package (dict)
Calls create_inspection_lot (API_INSPECTIONLOT_SRV) to place material in quality inspection stock (blocking stock)
Calls create_quality_notification (CE_QUALITYNOTIFICATION) with full evidence package (risk score, factor breakdown, ERAI/GIDEP match references, certificate document reference, supplier history)
Only executes autonomous quarantine for risk_band high or critical; for medium creates a review-flagged Quality Notification without blocking stock
Returns: inspection_lot_number, quality_notification_number, action_taken
•
Implement `approve_goods_receipt` tool that:
For low risk: logs verification result and updates part risk profile in Quality Info Record
Creates a Quality Notification of type "informational" for audit trail
Returns: approval_reference, audit_log_entry
•
Implement `analyze_warranty_claim` tool that:
Accepts: warranty claim number, customer ID, returned part serial number, claimed labor hours, claim date
Calls: get_warranty_claim (WARRANTYCLAIM), get_master_warranty (CE_MASTERWARRANTY), get_returns_inspection (CE_RETURNSINSPECTION)
Loads the warranty-fraud-detection runtime skill for fraud scoring
Cross-checks returned serial vs. original sale record; computes fraud score per indicator weights
Returns: fraud_score, fraud_band (approve / review / investigate / deny), evidence_summary, recommended_action
•
Implement `route_warranty_claim` tool that:
For review or investigate: calls create_quality_task (QUALITYTASK) to route claim to warranty analyst with fraud evidence
For investigate with serial mismatch: adds a serial_mismatch_flag to the task
Updates the warranty claim status via update_warranty_claim (WARRANTYCLAIM)
•
Implement `score_supplier_risk` tool that:
Accepts: supplier ID, material number (optional), trigger (new_alert | scheduled | quality_escape)
Calls: get_quality_info_record (API_QUALITYINFORECORD_SRV) for internal quality history
Queries ERAI and GIDEP mock tools for external alert data
Loads the supplier-risk-scoring runtime skill
Returns: supplier_risk_score (0.0–1.0), risk_level (low/medium/high), contributing_factors, recommended_action
•
Implement `update_supplier_risk_profile` tool that:
Calls update_quality_info_record (API_QUALITYINFORECORD_SRV) to persist updated risk score in SAP
Creates a create_quality_task (QUALITYTASK) when risk crosses high threshold, notifying quality manager
•
Implement `generate_regulatory_report` tool that:
Accepts: finding_type (SUP | counterfeit_electronic | documentation_fraud), evidence_package (dict), applicable_regulation (FAA_AC21-29D | DFARS_252_246_7008 | TC_CAR571), deadline_date (optional)
Loads the regulatory-reporting runtime skill and retrieves the appropriate template from report-templates.md
Populates report template from evidence_package (part number, serial, supplier, description of concern, regulatory basis)
Returns: report_draft (structured dict), report_type, requires_human_approval (always True), review_assigned_to
MUST include a prominent disclaimer: "DRAFT — Requires regulatory affairs manager approval before submission"
•
Implement `track_regulatory_deadline` tool that:
Accepts: report_type, finding_date, regulatory_deadline_days (default: 5 for GIDEP/FAR 52.246-26)
Calculates deadline date and remaining hours
Creates a create_quality_task (QUALITYTASK) if deadline is within 48 hours and report is unsubmitted
Returns: deadline_date, hours_remaining, escalation_triggered (bool)
•
Implement `query_erai_database` mock tool that:
Accepts: part_number, manufacturer (optional), date_code (optional)
Returns a structured mock response matching ERAI Data Connect format: {"alerts": [...], "reported_companies": [...], "total_results": N, "data_source": "ERAI", "query_timestamp": "..."}
In production this wraps the ERAI Data Connect API; for now returns realistic mock data for A&D parts (include at least one alert scenario and one clean scenario in mock data)
•
Implement `query_gidep_reports` mock tool that:
Accepts: part_number, cage_code (optional), report_type (counterfeit | failure_experience | dmsms)
Returns a structured mock response matching GIDEP format: {"reports": [...], "data_source": "GIDEP", "query_timestamp": "..."}
Include at least one counterfeit component report scenario in mock data
•
Implement `build_evidence_package` helper function (not a tool) that assembles a structured evidence dict from:
Authentication result (risk score, factor breakdown, risk band)
Document validation result (if applicable)
ERAI/GIDEP query results (alert IDs, report references)
Supplier risk profile (current score, trend)
SAP transaction references (material, serial, PO, GR document numbers)
Agent decision (action taken, timestamp, agent version)
Human override record (if applicable — approver ID, reason, timestamp)
•
Verify that ALL write actions to SAP (Quality Notification creation, Inspection Lot creation, Quality Task creation, warranty claim update) include the evidence package reference in their payload for immutable audit trail
All 9 SAP S/4HANA APIs are available as EDMX spec files in specification/sap-guardian-agent/api-specs/. All APIs require custom MCP tool wrappers (no pre-built MCP servers available).

API Name	Spec File	ORD ID	Tools Needed
Quality Notification	CE_QUALITYNOTIFICATION_0001.edmx	sap.s4:apiResource:CE_QUALITYNOTIFICATION_0001:v1	create, read
Material Serial Number	CE_API_MATERIALSERIALNUMBER_0001.edmx	sap.s4:apiResource:CE_API_MATERIALSERIALNUMBER_0001:v1	read
Inspection Lot	API_INSPECTIONLOT_SRV.edmx	sap.s4:apiResource:API_INSPECTIONLOT_SRV:v1	create, read
Quality Info Record	API_QUALITYINFORECORD_SRV.edmx	sap.s4:apiResource:API_QUALITYINFORECORD_SRV:v1	read, update
Warranty Claim	WARRANTYCLAIM_0001.edmx	sap.s4:apiResource:WARRANTYCLAIM_0001:v1	read, update
Quality Task	QUALITYTASK_0001.edmx	sap.s4:apiResource:QUALITYTASK_0001:v1	create, read
Master Warranty	CE_MASTERWARRANTY_0001.edmx	sap.s4:apiResource:CE_MASTERWARRANTY_0001:v1	read
Returns Inspection	CE_RETURNSINSPECTION_0001.edmx	sap.s4:apiResource:CE_RETURNSINSPECTION_0001:v1	read
Goods Receipt	SSPOPENITMGOODSRECEIPT_0001.edmx	sap.s4:apiResource:SSPOPENITMGOODSRECEIPT_0001:v1	read
MCP API: sap.s4:apiResource:CE_QUALITYNOTIFICATION_0001:v1
MCP tool scope: read-write
Resources in scope: QualityNotification, QualityNotificationItem, QualityNotificationTask, QualityNotificationActivity

MCP API: sap.s4:apiResource:CE_API_MATERIALSERIALNUMBER_0001:v1
MCP tool scope: read-only
Resources in scope: MaterialSerialNumber, MaterialSerialNumberPlant

MCP API: sap.s4:apiResource:API_INSPECTIONLOT_SRV:v1
MCP tool scope: read-write
Resources in scope: InspectionLot, InspectionLotWithStatus, InspectionLotActualQuantity

MCP API: sap.s4:apiResource:API_QUALITYINFORECORD_SRV:v1
MCP tool scope: read-write
Resources in scope: QualityInInfoRecord, QualityInInfoRecordInspControl

MCP API: sap.s4:apiResource:WARRANTYCLAIM_0001:v1
MCP tool scope: read-write
Resources in scope: WarrantyClaim, WarrantyClaimItem, WarrantyClaimPartner

MCP API: sap.s4:apiResource:QUALITYTASK_0001:v1
MCP tool scope: read-write
Resources in scope: QualityTask, QualityTaskActivity

MCP API: sap.s4:apiResource:CE_MASTERWARRANTY_0001:v1
MCP tool scope: read-only
Resources in scope: MasterWarranty, MasterWarrantyCounter, MasterWarrantyItem

MCP API: sap.s4:apiResource:CE_RETURNSINSPECTION_0001:v1
MCP tool scope: read-only
Resources in scope: ReturnsInspection, ReturnsInspectionItem

MCP API: sap.s4:apiResource:SSPOPENITMGOODSRECEIPT_0001:v1
MCP tool scope: read-only
Resources in scope: GoodsReceiptConfirmation, GoodsReceiptConfirmationItem
•
Invoke `mcp-translation-file` skill for each of the 9 API spec files in `specification/sap-guardian-agent/api-specs/` to generate MCP translation files in `specification/sap-guardian-agent/mcps/<api-spec-stem>/`
•
Invoke `setup-solution` skill to register all generated MCP server assets in `solution.yaml`
•
Wire MCP tool loading in `assets/sap-guardian-agent/app/agent.py` using `get_mcp_tools()` from the `mcp_tools` module — never import directly from `sap_cloud_sdk.agentgateway`, never create direct HTTP clients
•
Add all 9 MCP server dependencies to `assets/sap-guardian-agent/asset.yaml` under `requires` using exact ORD IDs from generated `asset.yaml` files (read with `grep '^ordId:' assets/<mcp-server-name>/asset.yaml`)
•
Generate `mcp-mock.json` using the `mcp-mock-config` skill — required before tests can run
•
Implement all 5 milestones from the PRD with structured logging and OpenTelemetry spans. Extract business logic from `stream()` into a plain async helper `_run_agent()` to avoid `GeneratorExit` context errors. Use decorator form `@tracer.start_as_current_span("name")` on regular async methods.
M1 — Part Received / Authentication Triggered:

Log on achievement: M1.achieved: authentication triggered for material={material_number} serial={serial_number} supplier={supplier_id} gr_document={gr_document_number}
Log on miss: M1.missed: authentication not triggered — missing required fields={missing_fields} for gr_document={gr_document_number}
M2 — Risk Score Computed:

Log on achievement: M2.achieved: risk_score={score} band={low|medium|high|critical} factors={factor_breakdown_json} external_data_available={true|false} material={material_number}
Log on miss: M2.missed: risk scoring incomplete — reason={reason} material={material_number}
M3 — Airworthiness Documentation Validated:

Log on achievement: M3.achieved: cert_validation={pass|fail} checks={validation_checks_json} cert_type={8130-3|CoC} material={material_number} serial={serial_number}
Log on miss: M3.missed: cert validation not completed — reason={reason} material={material_number}
M4 — Blocking or Approval Action Taken:

Log on achievement: M4.achieved: action={quarantine|block_gr|approve|flag_review} risk_band={band} sap_notification={notification_number} material={material_number}
Log on miss: M4.missed: action not completed — reason={reason} intended_action={action} material={material_number}
M5 — Evidence Package Dispatched:

Log on achievement: M5.achieved: quality_notification={notification_number} recipients={recipients_list} evidence_items={count} material={material_number}
Log on miss: M5.missed: evidence package not dispatched — reason={reason} material={material_number}
•
Verify `bootstrap(app)` is called after `app = server.build()` in `main.py`
Sp