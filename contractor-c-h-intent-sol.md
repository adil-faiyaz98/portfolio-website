•
Read `product-requirements-document.md` and `intent.md` for full context before any implementation
•
Bootstrap agent code in `assets/contractor-integration-hub-agent/` using instructions from the `sap-agent-bootstrap` reference. Run from inside `assets/contractor-integration-hub-agent/` using copy commands — do NOT create files manually
•
Install dependencies and validate the agent starts and responds at `/.well-known/agent.json`
•
Create `assets/contractor-integration-hub-agent/app/skills/procore-sync/SKILL.md` — covers the step-by-step logic for syncing Procore daily logs and progress to SAP: webhook receipt → data validation → field mapping → SAP write → portal notification. Includes decision tree for CNESST vs standard safety incident classification
•
Create `assets/contractor-integration-hub-agent/app/skills/invoice-approval/SKILL.md` — covers the invoice preparation and human-in-loop approval workflow: invoice extraction → QST/GST calculation → SAP field pre-fill (WBS, PO ref, cost center) → approval routing to Isabelle → SAP AP post on approval. Includes rejection and retry flow
•
Create `assets/contractor-integration-hub-agent/app/skills/change-order-routing/SKILL.md` — covers the change order detection, portal routing, approver notification, and SAP write-back flow. Includes rejection notification
•
Create `assets/contractor-integration-hub-agent/app/skills/quebec-localization/SKILL.md` — covers the Quebec-specific data rules: QST (9.975%) + GST (5%) dual-tax calculation, CCQ labor classification field mapping, CNESST incident classification criteria, and bilingual (FR/EN) output rules
•
Create `assets/contractor-integration-hub-agent/app/skills/connector-adapter/SKILL.md` — defines the reusable connector adapter interface that all connectors (Procore, Sage, Viewpoint, QuickBooks) must implement: authentication, retry logic (3× with exponential backoff), error handling, versioned adapter pattern, and monitoring hooks
•
Implement `procore_get_project_progress` tool — retrieves daily logs and progress updates from Procore REST API for a given project ID. Returns structured records with project ID, date, progress percentage, daily log entries, and subcontractor ID. Tool is read-only
•
Implement `procore_webhook_receiver` — HTTP endpoint that accepts Procore webhook events for daily log and progress update events, validates the payload signature, and enqueues the event for agent processing. Fallback: if webhook delivery fails more than 3 times, switch to 5-minute polling
•
Implement `sap_read_project_priority` tool — reads WBS code, project priority code, and project status from the SAP Enterprise Project Priority API (`ENTPROJECTPRIORITYCODE_0001`). Returns project priority, WBS element, and project profile. Tool is read-only
•
Implement `sap_create_billing_request` tool — creates a project billing request in SAP via the Project Billing Request API (`CE_PROJECTBILLINGREQUEST_0001`). This is a **write tool**; it must only be invoked after explicit human approval. Implements 3× retry with exponential backoff on SAP API errors
•
Implement WBS code mapping logic — maps Procore project IDs to SAP WBS elements by cross-referencing the project priority read result. Handles cases where no WBS match exists (hold + notify)
•
Implement 60-second end-to-end sync SLA — log a warning if the webhook-to-SAP-write cycle exceeds 60 seconds (p95)
•
Implement sync status persistence — store per-project sync status (timestamp, records synced, errors) accessible via portal API endpoint
•
Expose portal API endpoint `GET /api/projects/{id}/sync-status` — returns sync timestamp, records synced, and error list for a project. Used by the subcontractor portal
•
Log milestone: `M1.achieved: procore-to-sap progress sync operational — first live sync completed successfully` / `M1.missed: procore-to-sap progress sync not operational — webhook or SAP write failed`
•
Implement `procore_get_invoice_data` tool — extracts invoice line items, amounts, dates, and PO references from Procore for a given invoice ID. Read-only. Maps raw Procore invoice fields to the Quebec data model (QST/GST applicable flag, CCQ labor lines, cost center hint)
•
Implement Quebec QST/GST calculation engine — applies QST (9.975%) and GST (5%) to taxable line items, maps to SAP tax codes (use configuration-driven rates — never hardcode). Rule-based, not LLM-generated. Raises "needs review" flag if tax applicability cannot be resolved
•
Implement SAP invoice field pre-fill logic — assembles the full SAP-ready invoice payload: WBS code (from `sap_read_project_priority`), PO reference (from Procore), QST/GST breakdown, cost center, vendor ID. All field sources are recorded for portal explainability display
•
Implement `sap_post_invoice` tool — posts an approved invoice to SAP AP via the billing API. **Write tool — must only be invoked after Isabelle's explicit approval.** Returns SAP document number on success. Implements 3× retry with exponential backoff
•
Implement approval routing service — when an invoice is prepared, create an approval record in the hub's in-memory store and notify Isabelle via portal. The approval record includes the full invoice payload, all field sources (for explainability), and a plaintext explanation of each SAP field in non-jargon language (FR/EN)
•
Implement `POST /api/invoices/{id}/approve` portal endpoint — Isabelle submits her approval decision (approve / edit / reject). On approve, agent proceeds to `sap_post_invoice`. On edit, returns to pre-fill with corrections. On reject, marks invoice as rejected and notifies GC contact
•
Expose `GET /api/invoices` portal endpoint — returns list of invoices with status (draft / pending-approval / approved / rejected / posted), SAP document number when posted, and payment status
•
Log milestone: `M2.achieved: invoice submission workflow live — first invoice approved and posted to SAP AP` / `M2.missed: invoice submission workflow incomplete — preparation, approval, or SAP post step failed`
•
Implement `procore_get_change_orders` tool — reads change order records from Procore for a given project. Returns change order ID, description, amount, status, and linked WBS code hint. Read-only
•
Implement change order detection and routing — agent polls Procore change orders on a configurable interval (default: 5 minutes) or processes via webhook event. New or updated change orders trigger an approval record creation and portal notification to the designated approver
•
Implement `sap_write_change_order` tool — writes an approved change order back to the SAP project record via the billing request API. **Write tool — requires explicit approver sign-off.** Logs SAP document reference on success
•
Implement `POST /api/change-orders/{id}/approve` portal endpoint — approver submits approval or rejection. On approval, agent calls `sap_write_change_order`. On rejection, sends portal notification with reason to originating project manager (Marco)
•
Expose `GET /api/change-orders` portal endpoint — lists change orders with status (detected / pending-approval / approved / rejected / written-to-sap) and SAP reference
•
Log milestone: `M3.achieved: change order routing live — first change order approved and written to SAP` / `M3.missed: change order routing incomplete — detection, routing, or SAP write step failed`
•
Implement `procore_get_safety_incidents` tool — retrieves safety incident reports from Procore for a given project. Returns incident ID, type, severity, date, location, and description. Read-only
•
Implement CNESST classification engine — evaluates each Procore safety incident against the embedded CNESST incident classification rules (see Quebec localization skill). Outputs: CNESST-reportable (yes/no), confidence score, classification rationale. If confidence < threshold, routes to compliance officer for manual review — never auto-classifies uncertain incidents
•
Implement `sap_surface_cnesst_flag` tool — creates a structured CNESST compliance record in SAP for reportable incidents. **Write tool — requires compliance officer acknowledgement before creating.** Includes incident type, date, location, classification, and status
•
Implement portal CNESST notification — when a CNESST-reportable incident is detected, send a plain-language French-language notification to Jean-François (site supervisor) via the portal: "Un incident CNESST a été détecté. Voici ce que vous devez faire : [action]"
•
Implement `GET /api/safety-incidents` portal endpoint — returns list of incidents with classification (CNESST-reportable / standard / pending-review), compliance status, and notification history
•
Log milestone: `M4.achieved: safety compliance flagging live — first CNESST incident surfaced in SAP` / `M4.missed: safety compliance flagging incomplete — incident classification or SAP surface step failed`
•
Implement Quebec tax configuration — QST rate (9.975%) and GST rate (5%) stored in a configuration file (not hardcoded). SAP tax code mappings for QST and GST are configuration-driven and updatable without code changes
•
Implement CCQ labor field mapping — when a Procore time entry includes a labor type matching CCQ classifications (carpenter, electrician, plumber, etc.), map to the corresponding SAP custom field. Preserve the original CCQ classification code
•
Implement bilingual output layer — all portal-facing strings (labels, notifications, error messages, field explanations) exist in both French (`fr`) and English (`en`). Default to French when user locale is `fr-CA`. The bilingual layer covers all agent-generated messages (not just UI strings)
•
Implement configuration-driven locale switching — portal passes `Accept-Language` header; agent respects it for all text output. No hardcoded French strings in business logic
•
Scaffold a React application using SAP UI5 Web Components in `assets/contractor-integration-hub-ui/`. Separate CAP-based backend for portal API serving (BTP Cloud Foundry deployment)
•
Implement Project Health Dashboard — loads in under 3 seconds. Shows all connected projects, sync status (last sync timestamp, records synced), pending approvals count, and active alerts. Color-coded status indicators (green/yellow/red). Bilingual (FR/EN toggle)
•
Implement Invoice Approval View — displays pre-filled invoice with all SAP fields visible. Each field shows its source in plain language (e.g., "WBS code pulled from SAP project P-10234"). Approve / Edit / Reject actions. Supports QST/GST breakdown display. Bilingual
•
Implement Change Order Management View — lists all change orders with status. Approve/reject action for pending items. Shows SAP write-back confirmation reference
•
Implement Safety Compliance View — lists safety incidents with CNESST classification status. French-language notifications for Jean-François. Compliance officer acknowledgement action for escalated incidents
•
Implement Sync Monitor View — timeline of sync events per project. Plain-language error descriptions (never raw API errors). Suggested action for each error state
•
All portal error messages are plain-language (no raw API codes shown to users). French error messages for all CNESST and compliance-related errors
•
Define `ConnectorAdapter` base class in `assets/contractor-integration-hub-agent/app/connectors/base.py` — abstract interface with: `authenticate()`, `get_projects()`, `get_progress()`, `get_invoices()`, `get_change_orders()`, `get_safety_incidents()`, `handle_retry(max_retries=3, backoff_factor=2)`, `handle_error(error, context)`. Each method must document expected input/output schema
•
Implement `ProcoreAdapter` in `assets/contractor-integration-hub-agent/app/connectors/procore.py` extending `ConnectorAdapter` — implements all interface methods using Procore REST API. Uses versioned adapter pattern: adapter version tracked; on API breaking change, new adapter version can be registered without touching core agent
•
Implement Connector Registry in `assets/contractor-integration-hub-agent/app/connectors/registry.py` — maps connector name (e.g., `procore`, `sage`, `viewpoint`, `quickbooks`) to its adapter class. New connectors register by adding an entry to the registry — no core agent changes required
•
Stub adapter classes for future connectors: `SageAdapter`, `ViewpointAdapter`, `QuickBooksAdapter` in `assets/contractor-integration-hub-agent/app/connectors/` — each extending `ConnectorAdapter` with `NotImplementedError` for all methods, and a clear docstring indicating Phase 2 implementation target
•
Validate the adapter pattern with a unit test: assert that adding a new mock connector to the registry makes all its tools available to the agent without changes to agent logic
•
Verify `/.well-known/agent.json` is served correctly and contains: `name`, `description`, `capabilities` (including `streaming`), `skills` list referencing all runtime skill names, and a `version` field
•
Implement A2A capability discovery endpoint — when an A2A handshake is received, respond with the agent's full capability manifest including all available tools and skills
•
Add SAP Enterprise AI Gateway extension point — a configuration-driven hook in `main.py` that, when `ENTERPRISE_AI_GATEWAY_URL` environment variable is set, registers the agent with the gateway. Does nothing if the variable is absent (gateway not yet available)
•
Verify agent responds correctly to A2A streaming protocol with test covering protocol handshake, capability discovery, and task invocation
•
Invoke the `mcp-translation-file` skill for each downloaded API spec:
specification/contractor-integration-hub-agent/api-specs/CE_PROJECTBILLINGREQUEST_0001.edmx → ORD ID: sap.s4:apiResource:CE_PROJECTBILLINGREQUEST_0001:v1
specification/contractor-integration-hub-agent/api-specs/ENTPROJECTPRIORITYCODE_0001.edmx → ORD ID: sap.s4:apiResource:ENTPROJECTPRIORITYCODE_0001:v1
•
Invoke `setup-solution` skill to create and register the MCP assets produced by `mcp-translation-file`
•
Wire MCP tool loading in `agent.py` using `get_mcp_tools()` from the `mcp_tools` module — see `guidelines-agent-python.md` for canonical pattern. NEVER import directly from `sap_cloud_sdk.agentgateway`. NEVER create direct HTTP clients for SAP APIs
•
Add MCP server dependencies to `asset.yaml` under `requires` — one entry per MCP server generated, using exact ORD IDs from generated assets
•
Generate `mcp-mock.json` using the `mcp-mock-config` skill after MCP assets are generated (required before tests can run)
•
Instrument M1 (Progress Sync): structured log + OTel span around the Procore webhook → SAP billing request write cycle. Pattern: `[M1.achieved|missed]: procore-to-sap progress sync operational — first live sync completed successfully`
•
Instrument M2 (Invoice Workflow): structured log + OTel span around invoice preparation → approval → SAP AP post. Pattern: `[M2.achieved|missed]: invoice submission workflow live — first invoice approved and posted to SAP AP`
•
Instrument M3 (Change Order): structured log + OTel span around change order detection → approval → SAP write-back. Pattern: `[M3.achieved|missed]: change order routing live — first change order approved and written to SAP`
•
Instrument M4 (Safety/CNESST): structured log + OTel span around incident detection → classification → SAP CNESST flag creation. Pattern: `[M4.achieved|missed]: safety compliance flagging live — first CNESST incident surfaced in SAP`
•
Verify `bootstrap(app)` is called after `app = server.build()` in `main.py`
Specification.md