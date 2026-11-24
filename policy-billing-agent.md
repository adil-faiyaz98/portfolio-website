PolicyBridge Agent — Finance Policy Digitization & AI-Readiness Accelerator



Business Challenge

Finance policy documentation is scattered across unstructured sources (PDF, DOCX, XLSX, PPTX, TXT, MSG/EML, video transcripts, contracts, rough notes, SharePoint, network file shares, email attachments) and is unavailable in machine-readable form. SAP's native Finance AI agents (Intelligent Accruals, Journal Entry, Financial Close) require structured, rule-based policy input to operate. The gap between raw documentation and AI-ready policy currently demands a 4–8 week, $150–300K manual consulting engagement per customer. PolicyBridge automates this preparation work — extracting, validating, structuring, and obtaining approval for policy rules — reducing it from weeks to days and enabling SAP Finance AI adoption that is stalled on policy readiness. It is delivered as a reusable accelerator for SAP implementation partners and consulting engagements, designed as a composable node within SAP's AI agent ecosystem.



Business Goals & Success Criteria







Metric



Baseline



Target



Timeline



Process / Capability



Source





Policy digitization time



4–8 weeks



3–5 days



Per engagement



Finance Policy Preparation



user





Cost per engagement



$150–300K



$15–30K (90% reduction)



Per engagement



Finance Policy Preparation



user





Policy coverage rate



40–60%



95%+



Per engagement



Rule Extraction & Structuring



user





Policy gap detection rate



0% (gaps found in production)



85%+ pre-deployment



Per engagement



Gap Analysis & Validation



user





Audit readiness



20–30%



100% (full evidence chain)



Per engagement



Evidence Chain & Compliance



user





Approval turnaround



2–4 weeks



2–3 days



Per engagement



Finance Owner Sign-off



user



Key Milestones





Document Ingestion Complete — all source files (PDF, DOCX, XLSX, PPTX, TXT, MSG/EML, transcripts, contracts) loaded, indexed, and accessible via Document Grounding.



Rule Extraction Complete — all candidate policy rules (thresholds, GL mappings, calculation methods, approval matrices, exceptions, effective dates) identified, structured with required fields, and confidence-scored.



Validation Complete — conflicts between sources detected, policy gaps identified, ambiguities flagged, and every rule linked to source document + location (evidence chain).



Approval Initiated — structured policy package sent to finance owner(s) via multi-level approval routing with email notification and in-app approval UI.



Policy Approved — named finance owner has signed off; policy version locked and timestamped for audit trail.



AI-Ready Package Exported — structured JSON/YAML output delivered and stored in CAP service, queryable by SAP Finance AI agents via API.



Ongoing Value — Event-Driven Policy Governance

The regulatory landscape is continuously changing across multiple domains:







Domain



Key Regulations



Finance Policy Impact





Data Privacy



GDPR, CCPA, Quebec Law 25, India DPDP



Data retention rules, consent-based processing policies





Security & Controls



SOX 404, NIS2, DORA (EU)



Access controls, SoD policies, audit trail requirements





Accounting Standards



ASC 842 (Leases), IFRS 17 (Insurance), IFRS 9 (Credit Loss)



Recognition rules, measurement policies, disclosure requirements





ESG / Sustainability



CSRD, SEC Climate Rules, ISSB Standards



Non-financial reporting policies, carbon accounting rules





Tax



Pillar Two (Global Minimum Tax), e-invoicing mandates



Tax calculation policies, compliance thresholds

PolicyBridge extends beyond one-time digitization into a continuous policy governance platform via SAP Integration Suite and Event Mesh:





Event-driven ingestion: Subscribe to regulatory change feeds (IASB, FASB, SEC, ESMA); automatically trigger policy impact analysis when a relevant regulation changes



Delta detection: Compare new/amended regulations against the current policy corpus; identify which extracted rules are affected and require update



Multi-system synchronization: Push updated, approved policies to multiple SAP landscapes (S/4HANA Cloud, On-Premise, ECC) via Integration Suite



End-to-end traceability: Full chain from external regulation → policy document → extracted rule → SAP configuration → audit evidence



Centralized governance: Single source of truth for all finance policies with full version history and regulatory linkage

This transforms the value proposition:





One-time project: $150–300K savings per engagement (policy digitization)



Continuous platform: Ongoing compliance assurance, regulatory change management, and audit readiness (subscription model)



Business Architecture (RBA)

End-to-End Process

Record to Report

Process Hierarchy

Record to Report
└── Perform Accounting and Financial Close
    └── Perform Accounting and Financial Close (BPS-413_002)
        └── Perform financial accounting
        └── Manage GL master data and mappings
        └── Execute financial close tasks
        └── Apply accrual and journal entry policies


Summary

PolicyBridge maps directly to the Record to Report E2E, specifically the "Perform Accounting and Financial Close" sub-process (BPS-413_002), by preparing the structured policy inputs that govern GL accounting, accruals, journal entries, and financial close tasks required for SAP Finance AI execution.



Fit Gap Analysis







Requirement (business)



Standard asset(s) found



API ORD ID



MCP Server ORD ID



MCP Server Version



Webhook API ORD ID



Gap?



Notes / assumptions





Perform accounting and financial close (GL, accruals, JE, close)



SAP S/4HANA Cloud Public/Private, SAP Advanced Financial Closing



—



—



—



—



No



Standard SAP coverage; PolicyBridge prepares rules these products consume





Read GL account master data for policy validation



GL Account – Read API



sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1



—



—



—



Maybe



Available API, no MCP server found; custom MCP tooling required





Read journal entry items for rule cross-validation



Journal Entry Item – Read



sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1



—



—



—



Maybe



Available API, no MCP server found; custom MCP tooling required





Read GL account line items



GL Account Line Items – Read (A2X)



sap.s4:apiResource:API_GLACCOUNTLINEITEM:v1



—



—



—



Maybe



Available API, no MCP server found; custom MCP tooling required





Consolidation GL account reference



Consolidation GL Account



sap.s4:apiResource:CE_CNSLDTNGLACCOUNT_0001:v1



—



—



—



Maybe



Available for group reporting scenarios





Unstructured document ingestion (PDF, DOCX, XLSX, PPTX, TXT, MSG/EML, transcripts)



SAP Document Grounding (AI Foundation)



—



—



—



—



Yes



No standard SAP product automates multi-format document ingestion for policy extraction; custom agent required





AI-powered rule extraction and structuring from free-text documents



SAP Generative AI Hub (AI Core)



—



—



—



—



Yes



Core custom capability — no standard product covers policy rule extraction; custom agent required





Policy conflict detection, gap analysis, ambiguity flagging



None



—



—



—



—



Yes



Fully custom capability; no standard SAP product performs cross-document policy validation





Evidence chain linking rules to source documents



None



—



—



—



—



Yes



Custom audit trail generation required





Multi-level approval workflow with SoD, delegation, escalation



Email + in-app approval (custom)



—



—



—



—



Yes



SBPA available optionally for complex routing; primary path is custom email + in-app UI





Policy versioning and queryable API



CAP service (custom)



—



—



—



—



Yes



Custom CAP multi-tenant service required for policy storage, versioning, and SAP Finance AI consumption





Structured JSON/YAML export for SAP Finance AI consumption



None (format to be defined)



—



—



—



—



Yes



Output schema must align with Intelligent Accruals, Journal Entry, Financial Close agent input formats





Multi-tenant SaaS with tenant isolation



SAP BTP multi-tenancy (CAP)



—



—



—



—



Maybe



CAP supports multi-tenancy natively; requires configuration per tenant





A2A composability within SAP Joule agent ecosystem



SAP AI Foundation A2A protocol



—



—



—



—



Maybe



Supported by Joule Studio runtime; agent must expose tools via A2A for other agents to invoke





Live GL validation (Connected Mode)



SAP Integration Suite (optional)



—



—



—



—



Maybe



Required only in Connected Mode for on-premise or hybrid landscapes

Key Findings





Core gap is custom: No standard SAP product automates the extraction, structuring, and validation of unstructured finance policy documents — the entire extraction/validation pipeline requires a custom AI agent.



Document Grounding + Generative AI Hub are the enabling platform services for ingestion and extraction; no MCP servers exist yet for the available S/4 finance APIs — custom MCP tooling will be needed.



CAP multi-tenancy is the right storage layer for policy versioning and the queryable API consumed by downstream SAP Finance AI agents.



Two deployment modes (Standalone / Connected) allow the accelerator to serve both cloud-only and hybrid/on-premise customers without mandating Integration Suite.



A2A composability positions PolicyBridge as a reusable node in the SAP Finance AI ecosystem — other agents (Accruals, JE, Close) can query it at runtime.



Ariba Document Approval API and SAP Advanced Financial Closing SPI are marked unavailable in this landscape; the approval path uses custom email + in-app UI with optional SBPA for complex routing.



Recommendations

PolicyBridge: Custom AI Agent + CAP Backend on SAP BTP

Executive Summary

Custom Python A2A agent with CAP multi-tenant backend on SAP BTP, composable within SAP Joule ecosystem.

Recommended Solution

A production-grade, multi-tenant SaaS accelerator built on SAP BTP comprising:





PolicyBridge AI Agent — Python-based, A2A protocol agent hosted on SAP BTP. Uses SAP Document Grounding (AI Foundation) to ingest and retrieve documents across all supported formats and languages (EN, FR, DE, ES, AR). Uses SAP Generative AI Hub (AI Core) for rule extraction, structuring, conflict detection, gap analysis, confidence scoring, and evidence chain generation. Exposes tools via A2A for invocation by other Joule agents (Intelligent Accruals, Journal Entry, Financial Close).



CAP Policy Service — Multi-tenant CAP (Node.js) service providing policy storage with full version history, a queryable OData/REST API for SAP Finance AI consumption, tenant isolation at the data layer, and configurable extraction rules and approval workflows per tenant. Supports consumption-based GenAI metering.



Approval Flow — Multi-level approval routing (preparer → reviewer → approver) with delegation, escalation, SoD enforcement, rejection/re-submission, and full audit trail. Primary delivery: email notification + in-app approval UI. Optional: SAP Build Process Automation for regulated / complex routing scenarios.



AI-Ready Output — Structured JSON/YAML policy packages (exportable) + queryable API. Compatible with SAP Finance AI agent rule consumption formats. Versioned and signed-off by named finance owner before activation.



Deployment Modes:





Standalone: Ingestion → extraction → validation → export. No Integration Suite required. For S/4 Cloud Public and cost-sensitive engagements.



Connected: Standalone + live GL master data validation, policy write-back, multi-system connectivity. Integration Suite optional. For hybrid, on-premise (S/4HANA On-Premise, ECC EHP7+), and regulated industries.



Flexible Hosting:





BTP multi-tenant SaaS (recommended for partners)



Single-tenant dedicated (enterprise customers)



Customer-managed BYOL (customer's own BTP subaccount)

Problem Statement

SAP Finance AI agents require structured, machine-readable policy rules. In reality, policies live in scattered, unstructured documents. Preparing them manually takes 4–8 weeks and $150–300K per engagement. This blocks SAP Finance AI adoption.

Affected User Roles





Finance Transformation Teams



Accounting Policy Owners



SAP Implementation Partners / Consultants



Internal Audit Teams

Important Factors

Reduces policy digitization from weeks to days

The AI agent automates the most time-consuming steps (reading, extracting, structuring, cross-validating), compressing an 8-week effort to 3–5 days.

Creates audit-ready evidence chain automatically

Every extracted rule is linked to its source document, page, and location — satisfying internal audit and regulatory requirements without additional manual documentation.

Identifies policy gaps before they block AI deployment

85%+ of undocumented scenarios are surfaced during extraction, preventing costly failures when SAP Finance AI agents encounter missing rules in production.

Composable within SAP's AI agent ecosystem

PolicyBridge is not a standalone tool — it is a composable node that other SAP Finance AI agents can query at runtime, positioning it as infrastructure within a broader AI-ready finance platform.

Multi-tenant SaaS economics for partners

Delivered as a reusable accelerator, each new engagement requires only configuration, not re-development — compressing partner time-to-value and enabling consumption-based pricing.

Potential Risks

Policy output schema alignment with SAP Finance AI agents

SAP's Intelligent Accruals, Journal Entry, and Financial Close agents have specific input format requirements. If the output schema is not aligned at build time, downstream consumption will require rework.

Document quality and language coverage

Low-quality scans, informal notes, or highly ambiguous language reduce extraction confidence. Multi-language support (FR, DE, ES, AR) requires LLM capability validation per language.

Multi-tenant data isolation compliance

Regulated-industry customers (banking, public sector) may require formal data isolation certification beyond standard CAP multi-tenancy. This must be assessed per customer.

Approval governance complexity

SoD enforcement and delegation matrices vary significantly between organizations. The custom approval flow must be configurable enough to handle enterprise governance requirements without becoming a consulting engagement in itself.





Event-Driven Policy Synchronization (Platform Mode):





SAP Integration Suite + Event Mesh for regulatory change feed subscriptions



Automatic policy impact analysis triggered on regulatory change events



Delta detection: identifies affected rules and flags required updates



Multi-system policy push to all connected SAP landscapes



Full traceability chain: regulation → policy → rule → SAP config → audit evidence



Enables subscription-based commercial model (ongoing platform) vs. one-time project tool

Recommended Solution Category

AI Agent, CAP Application

Intent Fit

92%

Product Requirements Document (PRD)

Title: PolicyBridge Agent — Finance Policy Digitization & AI-Readiness Accelerator Date: 2026-11-05 Owner: Finance Transformation / SAP Implementation Practice Solution Category: AI Agent + CAP Application





Product Purpose & Value Proposition

Elevator Pitch: Finance policy documentation is scattered across Word files, PDFs, Excel workbooks, email chains, and meeting transcripts. SAP's Finance AI agents — Intelligent Accruals, Journal Entry, and Financial Close — require structured, machine-readable rules to operate. PolicyBridge extracts, validates, and packages those rules automatically, compressing a 4–8 week, $150–300K manual consulting engagement into 3–5 days at $15–30K.

Business Need: SAP Finance AI adoption is stalling not because the AI is unready, but because the policy inputs it requires do not exist in usable form. Every customer engagement begins with the same manual work: reading scattered documents, extracting rules by hand, reconciling conflicts, and building an evidence chain for audit. PolicyBridge automates this preparation layer — and, with its event-driven platform mode, keeps policies synchronized as regulations continuously change.

Strategic Shift — From Project Tool to Compliance Platform: Initial policy digitization is the entry point, but the long-term value is continuous regulatory governance. As regulations accelerate (GDPR, DORA, ASC 842, Pillar Two, CSRD, IFRS 17), enterprises face a permanent compliance workload: detect which rules are affected by each change, update and re-approve them, and push corrections to all connected SAP systems. PolicyBridge in Platform Mode becomes the infrastructure layer for this ongoing work — transforming the commercial model from one-time project revenue per engagement to subscription revenue for continuous governance. This is the differentiator that positions PolicyBridge as a platform, not just an accelerator.

Expected Value:







Metric



Baseline



Target





Policy digitization time



4–8 weeks



3–5 days





Cost per engagement



$150–300K



$15–30K (90% reduction)





Policy coverage rate



40–60%



95%+





Gap detection rate



0% (gaps found in production)



85%+ pre-deployment





Audit readiness



20–30%



100% (full evidence chain)





Approval turnaround



2–4 weeks



2–3 days

Product Objectives (Prioritized):





Automate extraction and structuring of finance policy rules from unstructured documents, achieving 95%+ policy coverage per engagement



Surface policy gaps and conflicts before SAP Finance AI deployment, with 85%+ gap detection pre-production



Deliver a 100% audit-ready evidence chain linking every rule to its source document



Enable continuous regulatory compliance via event-driven policy synchronization across SAP landscapes



Package the solution as a multi-tenant SaaS accelerator reusable across partner engagements with minimal configuration overhead





Business Metrics







Metric



Baseline



Target



Timeline



Process / Capability



Source





Policy digitization time



4–8 weeks



3–5 days



Per engagement



Finance Policy Preparation



user





Cost per engagement



$150–300K



$15–30K



Per engagement



Finance Policy Preparation



user





Policy coverage rate



40–60%



95%+



Per engagement



Rule Extraction & Structuring



user





Policy gap detection rate



0%



85%+ pre-deployment



Per engagement



Gap Analysis & Validation



user





Audit readiness



20–30%



100%



Per engagement



Evidence Chain & Compliance



user





Approval turnaround



2–4 weeks



2–3 days



Per engagement



Finance Owner Sign-off



user





User Profiles & Personas

Primary Persona: Alex — SAP Implementation Consultant

Alex is a 35-year-old senior consultant at an SAP implementation partner, running 3–4 Finance AI readiness engagements per year. Each one begins with weeks of document archaeology: reading policy binders, chasing policy owners, manually building rule inventories in spreadsheets. Alex's margin is squeezed because this work is time-intensive but not billable at premium rates. He needs a tool that automates the extraction so he can focus on the validation and advisory work that actually commands consulting rates. He is technically proficient but not a developer — he needs a guided experience with clear outputs he can present to clients.

Goals: Complete policy extraction and structuring in days, not weeks. Present clients with a credible, evidence-backed policy gap report. Reduce re-work from missed rules discovered later in the project.

Key Tasks: Upload or connect client document sources; review and approve extracted rules; generate gap report; export AI-ready policy package; track approval status from finance owners.



Secondary Persona: Maria — Accounting Policy Owner

Maria is a 42-year-old Head of Accounting Policy at a mid-sized manufacturing company. She owns the finance policy corpus but has never had a system to manage it — policies live in shared drives, email threads, and her team's institutional memory. She is skeptical of AI tools after a previous project where automation gave wrong answers. She needs to see exactly where each extracted rule came from before she will approve it. She is the final sign-off in the approval chain and her name goes on the policy before it activates.

Goals: Review and approve only rules she can verify. Understand what gaps exist before they become an audit finding. Sign off with confidence, not pressure.

Key Tasks: Review extracted rules with source citations; approve, reject, or request clarification on individual rules; track open items in the approval queue; sign off on the final policy package.



Tertiary Persona: James — Finance Transformation Lead

James is a 50-year-old VP of Finance Transformation sponsoring the SAP Finance AI program. His measure of success is whether the Intelligent Accruals and Journal Entry agents go live on time. Policy readiness is his biggest risk — it is the dependency he cannot control. He needs visibility into coverage status across the policy corpus and confidence that gaps are known before go-live, not after.

Goals: Know the policy readiness status at any point. Understand which gaps block SAP Finance AI go-live. Track regulatory change exposure across the policy corpus.

Key Tasks: Review policy coverage dashboard; review gap analysis report; escalate unresolved items; sign off on go-live readiness.



Other User Types





Internal Auditor: Validates evidence chain completeness and policy version history for compliance review.



Tenant Administrator: Configures per-tenant extraction rules, approval routing, and SAP system connections.



Regulatory Change Analyst (Platform Mode): Monitors incoming regulatory change events and reviews delta impact reports.





User Goals & Tasks

For Alex (Implementation Consultant):

Goals:





Complete a full policy corpus extraction and structuring engagement in 3–5 days



Deliver a client-ready gap analysis report with evidence



Export a structured policy package the client's SAP Finance AI team can consume directly

Key Tasks:





Connect or upload document sources (SharePoint, file share, individual files)



Trigger extraction and review confidence-scored rule inventory



Review and resolve flagged conflicts and ambiguities



Route policy package for finance owner approval



Export AI-ready JSON/YAML and API endpoint details

For Maria (Accounting Policy Owner):

Goals:





Approve only rules she can verify against source documents



Ensure no rules are activated without her explicit sign-off



Maintain an audit-ready record of what she approved and why

Key Tasks:





Review rule-by-rule with source citation and confidence score



Approve, reject with comments, or request clarification



Monitor approval queue and track pending items



Confirm final policy package version before activation





Product Principles





Evidence before activation: No policy rule is activated without a named approval and a traceable link to its source document. The system flags uncertainty; it never invents policy.



Composability over isolation: PolicyBridge is a node in the SAP Finance AI ecosystem, not a standalone tool. Every output must be consumable by the agents and systems downstream.



Configurability without consultancy: Approval workflows, extraction rules, and tenant settings must be configurable by a power user — not require a new consulting engagement to adjust.



Continuous over one-time: The platform is designed for ongoing regulatory synchronization, not just a single digitization sprint. Architecture decisions must support event-driven, incremental updates.



Transparency over confidence: The agent surfaces low-confidence extractions and unresolved gaps explicitly. A known gap is better than a confident error.





Business Context

Current State: Finance policy documentation is fragmented across SharePoint folders, email attachments, Excel workbooks, PDF binders, and institutional memory. No single source of truth exists. When SAP Finance AI implementations begin, the policy preparation step is discovered to be a multi-week manual effort requiring specialized finance and SAP knowledge. This is a consistent, repeatable pain point across every engagement.

Strategic Alignment: PolicyBridge directly unblocks SAP Finance AI adoption — one of SAP's highest-priority growth areas. For implementation partners, it converts a cost-intensive, low-margin engagement phase into a high-value, tool-assisted service. In Platform Mode, it shifts from project revenue to subscription revenue by becoming the ongoing regulatory compliance layer.

Success Criteria: See Business Metrics section above.





Goals and Non-Goals

Goals (In Scope)





Ingest unstructured finance policy documents from multiple formats and sources (PDF, DOCX, XLSX, PPTX, TXT, MSG/EML, video transcripts, contracts, rough notes) in English, French, German, Spanish, and Arabic



Extract, structure, and confidence-score policy rules including thresholds, GL mappings, calculation methods, approval matrices, exceptions, and effective dates



Detect conflicts between rules from different sources; identify undocumented policy gaps; flag ambiguities for human resolution



Generate and maintain a full evidence chain linking every rule to its source document, page, and extraction timestamp



Route extracted policy packages through a configurable multi-level approval workflow (preparer → reviewer → approver) with SoD enforcement, delegation, escalation, and rejection/re-submission



Deliver AI-ready output as structured JSON/YAML export files and as a queryable OData/REST API hosted in a multi-tenant CAP service



Expose agent tools via A2A protocol so other Joule Finance agents (Intelligent Accruals, Journal Entry, Financial Close) can query policies at runtime



Enable event-driven policy synchronization via SAP Integration Suite and Event Mesh: subscribe to regulatory change feeds, perform delta detection, push updated approved policies to connected SAP landscapes



Support deployment as BTP multi-tenant SaaS, single-tenant dedicated, or customer-managed BYOL

Non-Goals (Out of Scope)





Calculating accruals, posting journal entries, or executing financial close tasks (covered by SAP's native Finance AI agents)



Modifying SAP configuration tables or system settings directly



Auto-approving policies without named finance owner sign-off



Replacing SAP Advanced Financial Closing, Intelligent Accruals Agent, or Journal Entry Agent



Providing general-purpose document management or records management capabilities



Legal interpretation of regulations (regulatory change events are flagged for human review, not auto-resolved)





Requirements

Must-Have Requirements

R01: Multi-Format Document Ingestion





Problem to Solve: Policy documents exist in many formats across scattered locations; consultants spend days manually reading and cataloguing them.



User Story: As an Implementation Consultant, I need to connect document sources (SharePoint, file shares, uploaded files) and trigger automated ingestion so that all policy-relevant content is available for extraction without manual reading.



Acceptance Criteria:





Given a connected SharePoint folder or uploaded file set, when ingestion is triggered, then all natively supported formats (PDF, DOCX, PPTX, TXT, HTML, JPEG, PNG, TIFF) are processed and indexed directly via SAP Document Grounding.



MSG/EML files require a pre-processing adapter: email body and attachments are extracted to TXT/HTML before Document Grounding ingestion. This adapter is part of the PolicyBridge ingestion pipeline.



Video transcripts (Teams, Zoom, Webex recordings) require a pre-processing adapter: speech-to-text conversion (via SAP AI Core or equivalent) produces a TXT transcript which is then ingested via Document Grounding. Raw video files are not passed to Document Grounding directly.



XLSX files: Document Grounding support is not confirmed; a pre-processing adapter converting sheet content to structured TXT/CSV is required as a fallback. Confirm native support during development.



Given a multi-language document (FR, DE, ES, AR), when ingested, then the content is correctly extracted and made available for rule extraction in that language.



Maps to Objective: 1 — Automate extraction and structuring



Priority Rank: 1

R02: AI-Powered Rule Extraction and Confidence Scoring





Problem to Solve: Identifying policy rules within free-text documents requires finance domain expertise and takes days per document set.



User Story: As an Implementation Consultant, I need the agent to automatically identify and structure candidate policy rules with confidence scores so that I can review findings rather than perform the initial extraction manually.



Acceptance Criteria:





Given an ingested document set, when extraction runs, then candidate rules are identified across rule types: thresholds, GL mappings, calculation methods, approval matrices, exceptions, and effective dates.



Each extracted rule includes: rule type, rule text, structured fields, confidence score (0–100), source document reference, page/location, and extraction timestamp.



Rules with confidence below a configurable threshold are flagged for mandatory human review before they can be included in a policy package.



Maps to Objective: 1 — Automate extraction and structuring



Priority Rank: 2

R03: Policy Validation — Conflict Detection, Gap Analysis, Ambiguity Flagging





Problem to Solve: Policy conflicts and gaps are currently discovered during SAP AI go-live, causing costly delays and rework.



User Story: As a Finance Transformation Lead, I need a validation report that surfaces conflicts, gaps, and ambiguities in the policy corpus before SAP Finance AI deployment so that we can resolve them proactively.



Acceptance Criteria:





Given an extracted rule set, when validation runs, then all cross-document rule conflicts are identified and described (which rules conflict, which documents they originate from).



The validation report identifies undocumented scenarios — finance situations for which no policy rule exists — and classifies them as gaps requiring resolution.



Ambiguous rules (contradictory language, missing effective dates, unclear scope) are flagged with the specific ambiguity described.



Validation report is exportable as a structured document.



Maps to Objective: 2 — Gap detection pre-deployment



Priority Rank: 3

R04: Full Evidence Chain





Problem to Solve: Auditors cannot validate AI-driven finance decisions without a traceable link from rule to source document.



User Story: As an Internal Auditor, I need every activated policy rule to have a complete evidence chain so that I can verify the rule's origin and approve it as audit-ready.



Acceptance Criteria:





Every activated rule stores: source document name, document version/date, page number or section reference, extraction timestamp, extraction model version, reviewer identity, approval identity, and approval timestamp.



Evidence chain is immutable once a rule is approved — no post-approval modification without creating a new version.



Evidence chain is exportable per rule and per policy package.



Maps to Objective: 3 — Audit-ready evidence chain



Priority Rank: 4

R05: Multi-Level Approval Workflow





Problem to Solve: Finance policies cannot be activated without named owner approval; current approval processes are informal and undocumented.



User Story: As an Accounting Policy Owner, I need a structured approval workflow with SoD controls so that I can review, approve, or reject rules with full traceability and confidence that no rule activates without my explicit sign-off.



Acceptance Criteria:





Approval routing supports configurable stages: preparer → reviewer → approver (minimum); additional stages configurable per tenant.



SoD enforcement: the person who extracted/prepared a rule cannot be the final approver.



Delegation: approvers can delegate to named alternates with delegation recorded in the audit trail.



Escalation: items exceeding a configurable deadline are automatically escalated to the next level.



Rejection: approvers can reject with mandatory comments; rejected rules return to preparer for revision and re-submission.



All approvals, rejections, and delegations are timestamped and attributed to named users.



Notifications delivered via email; approval actions available in-app.



Maps to Objective: 1, 3



Priority Rank: 5

R06: AI-Ready Output — Export and Queryable API





Problem to Solve: Extracted and approved policies need to be consumable by SAP Finance AI agents in a structured, versioned format.



User Story: As a Finance Transformation Lead, I need approved policies available as both downloadable export files and a live queryable API so that our SAP Finance AI implementation team can consume them directly without format conversion.



Acceptance Criteria:





Approved policy packages are exportable as structured JSON and YAML files.



The CAP Policy Service exposes an OData/REST API that SAP Finance AI agents and implementation tools can query by policy type, rule ID, effective date, and tenant.



Only approved, signed-off policy versions are exposed via the API; draft and rejected versions are not accessible externally.



Policy versions are immutable once approved; updates create new versions with full change history.



Maps to Objective: 1, 2



Priority Rank: 6

R07: Multi-Tenant CAP Backend with Tenant Isolation





Problem to Solve: As a reusable partner accelerator, PolicyBridge must serve multiple customer engagements without data leakage between tenants.



User Story: As a Tenant Administrator, I need full isolation of my organization's policy corpus, approval configuration, and extracted rules from other tenants so that confidential finance policies are never accessible outside my tenant boundary.



Acceptance Criteria:





CAP multi-tenancy enforces data isolation at the persistence layer: tenant A cannot access tenant B's data under any query path.



Per-tenant configuration: extraction rule profiles, approval routing stages, SoD rules, and connected SAP system endpoints are configurable independently per tenant.



GenAI consumption is metered per tenant for consumption-based billing.



Tenant onboarding and offboarding (including data deletion) are supported via administrative operations.



Maps to Objective: 5 — Multi-tenant SaaS reusability



Priority Rank: 7

R08: A2A Composability — Expose Policy Query Tools to Joule Agents





Problem to Solve: SAP Finance AI agents (Accruals, Journal Entry, Financial Close) need to query approved policies at runtime; without a standard interface they cannot access PolicyBridge outputs.



User Story: As a SAP Finance AI implementation team, I need PolicyBridge to expose policy query capabilities via the A2A protocol so that Joule Finance agents can retrieve relevant policy rules during their execution without manual data extraction.



Acceptance Criteria:





PolicyBridge registers as an A2A-compatible agent in the Joule Studio runtime.



Exposed tools include at minimum: query policy by type, query rules by GL account, query rules by scenario/process, retrieve gap list for a given domain.



Tools are read-only: no write or modification operations are exposed via A2A.



A2A calls are authenticated, logged, and attributable to the calling agent.



Maps to Objective: 2, 4



Priority Rank: 8

R09: Event-Driven Policy Synchronization (Platform Mode)





Problem to Solve: Regulatory changes (GDPR, DORA, ASC 842, Pillar Two, CSRD, IFRS 17) continuously affect finance policies; today there is no mechanism to detect which rules are impacted or to propagate updates across SAP landscapes. This is not a one-time problem — it is a permanent operational burden that currently has no tooling.



User Story: As a Regulatory Change Analyst, I need PolicyBridge to detect when a relevant regulatory change occurs and automatically identify which approved rules are affected so that we can update, re-approve, and push the corrected policies to all connected SAP systems before the next compliance deadline.



Acceptance Criteria:





Integration Suite + Event Mesh subscription ingests regulatory change events from configured sources: Phase 1 supports manual regulatory document upload; Phase 2 adds RSS/API polling of IASB, FASB, SEC, and ESMA feeds; Phase 3 supports commercial regulatory intelligence providers (e.g., Thomson Reuters, Wolters Kluwer).



Delta detection compares incoming regulatory content against the current approved rule corpus and produces an impact report: which rules are potentially affected, which are not.



Affected rules are flagged and routed back into the approval workflow for review and re-approval before re-activation.



Updated, re-approved policies are pushed to all connected SAP landscape endpoints (S/4HANA Cloud Public, Cloud Private, On-Premise, ECC) via Integration Suite. For ECC on-premise, the RFC Adapter + SAP Cloud Connector is the standard integration path; Integration Suite MCP Server is an alternative for A2A-native invocation.



Full traceability chain is maintained: regulation change event → impact report → affected rules → re-approval record → updated SAP config.



Maps to Objective: 4 — Continuous regulatory compliance



Phase Roadmap: Phase 1 (manual upload trigger) ships with core product; Phase 2 (automated feed polling) and Phase 3 (commercial feeds) are planned follow-on releases.



Priority Rank: 1 (elevated — this is the primary commercial differentiator distinguishing PolicyBridge as a platform from a one-time tool)



High-Want Requirements

R10: Policy Corpus Dashboard





Problem to Solve: Finance Transformation Leads and Policy Owners have no visibility into overall policy coverage status and outstanding gaps.



User Story: As a Finance Transformation Lead, I need a coverage dashboard showing extraction status, gap count, approval queue depth, and regulatory exposure so that I can track AI readiness progress and escalate blockers.



Priority Rank: 1

R11: Multi-Language Extraction (FR, DE, ES, AR)





Problem to Solve: Multinational organizations maintain policy documents in multiple languages; English-only extraction excludes a significant portion of the policy corpus.



User Story: As an Implementation Consultant at a multinational engagement, I need extraction to work across French, German, Spanish, and Arabic documents so that the full policy corpus is captured regardless of source language.



Priority Rank: 2

R12: SBPA Integration for Complex Approval Routing





Problem to Solve: Some regulated industries require approval workflows with more complex routing logic than the built-in email + in-app UI provides.



User Story: As a Tenant Administrator in a regulated industry, I need the option to route approval workflows through SAP Build Process Automation so that compliance-grade approval governance is enforced.



Priority Rank: 3



Nice-to-Have Requirements

R13: Policy Similarity and Deduplication





Problem to Solve: Large document sets may contain near-duplicate rules stated differently; these create noise in the rule inventory.



Priority Rank: 1

R14: Regulatory Feed Configurability





Problem to Solve: Different tenants need to monitor different regulatory bodies based on their industry and geography.



Priority Rank: 2

R15: Policy Readiness Certification Report





Problem to Solve: SAP implementation partners need a formal deliverable to present to customers confirming AI readiness.



Priority Rank: 3





Non-Functional Requirements

Performance





Extraction latency: A document set of up to 500 pages should complete extraction within 30 minutes.



API response time: Policy query API (CAP OData/REST) should respond within 2 seconds at the 95th percentile.



Approval notification: Email notifications for approval actions should be delivered within 5 minutes of trigger.

Reliability





Availability: 99.5% uptime for the CAP Policy Service (SaaS deployment).



Fallback: If Generative AI Hub is unavailable, extraction jobs queue and resume automatically; no data loss.

Cost





GenAI metering: Token consumption is logged per tenant per extraction run to support consumption-based billing.



Cost guardrails: Configurable per-tenant monthly token budget with alert on threshold breach.

Explainability





Traceability: Every rule carries its full extraction provenance; every API response includes the rule version and approval timestamp.



Confidence communication: Rules below the confidence threshold are always surfaced as requiring human review — never silently included.



Decision logging: All agent reasoning steps (extraction, conflict detection, gap identification) are logged at INFO level with structured fields.





Solution Architecture

Architecture Overview: PolicyBridge runs on SAP BTP as a multi-tenant SaaS solution. The AI agent handles document ingestion and intelligence work; the CAP service provides persistence and the queryable API; Integration Suite and Event Mesh enable the continuous regulatory synchronization platform mode.

Key Components:





PolicyBridge AI Agent — Python A2A agent on SAP BTP Cloud Foundry. Orchestrates document ingestion via SAP Document Grounding, rule extraction and validation via SAP Generative AI Hub (AI Core), and evidence chain assembly. Exposes A2A tools for Joule agent interoperability. Supports multi-language extraction (EN, FR, DE, ES, AR).



CAP Policy Service — Multi-tenant Node.js CAP service on SAP BTP. Stores policy rules, versions, evidence chains, and approval records with full tenant isolation. Exposes OData/REST API for downstream consumption. Handles per-tenant configuration and GenAI consumption metering.



Approval UI — SAP BTP-hosted in-app approval interface for rule review, approve/reject actions, and queue management. Paired with email notifications. Optional SBPA integration for regulated/complex routing.



Integration Suite + Event Mesh (Platform Mode) — Subscribes to regulatory change event feeds. Triggers delta detection in the agent. Routes updated policies to connected SAP landscapes (S/4HANA Cloud Public/Private, On-Premise, ECC) via Integration Suite adapters.



Document Grounding — SAP AI Foundation service for document indexing and retrieval across all supported formats and source connectors.

Integration Points:





SAP Document Grounding: document ingestion and retrieval (read-only, per engagement)



SAP Generative AI Hub / AI Core: LLM inference for extraction, validation, and delta detection (read-only from data perspective)



SAP S/4HANA Cloud (GL Account, Journal Entry APIs): optional live GL master data validation in Connected Mode (read-only)



SAP Integration Suite + Event Mesh: regulatory change event subscription and multi-system policy push (Platform Mode)



A2A runtime: bidirectional tool invocation with Joule Finance agents

Deployment Modes:







Mode



Description



Integration Suite Required





Standalone



Ingestion → extraction → validation → approval → export



No





Connected



Standalone + live GL validation + policy write-back



Optional





Platform



Connected + event-driven regulatory synchronization



Yes

Hosting Options:





BTP multi-tenant SaaS (recommended for partners)



Single-tenant dedicated (enterprise customers requiring isolation)



Customer-managed BYOL (customer's own BTP subaccount)



Agent Extensibility & Instrumentation

Agent Extensibility: PolicyBridge is designed as a composable, extensible node. The following extension points are built in:





Extraction rule profiles: Per-tenant, per-domain rule extraction configurations (e.g., US GAAP vs. IFRS extraction profiles) without code changes.



Tool hooks: A2A-exposed tools are designed to be extended with new query types (e.g., query by IFRS standard, query by jurisdiction) without modifying core agent logic.



Regulatory feed connectors: New regulatory source connectors can be added as Integration Suite iFlow configurations without agent code changes.



Approval workflow stages: Additional approval stages, conditions, and routing logic are configurable per tenant via CAP configuration entities.

Business Step Instrumentation: All six key milestones are instrumented with structured log emissions at INFO level following the pattern [MILESTONE_ID].[achieved|missed]: [description]. This enables observability dashboards, SLA monitoring, and production debugging without code changes.



Automation & Agent Behaviour

Automation Level: Autonomous agent with mandatory human approval gate before policy activation.

Actions the system performs without human approval:





Document ingestion and indexing



Rule extraction and confidence scoring



Conflict detection and gap identification



Evidence chain assembly



Regulatory change delta detection and impact report generation



Routing approval notifications

Actions that require human review or approval:





Activating any policy rule (requires named finance owner sign-off)



Including low-confidence rules in a policy package



Resolving flagged conflicts or ambiguities



Approving re-extracted rules following a regulatory change delta



Pushing updated policies to connected SAP landscapes (requires re-approval)

Model / engine used: SAP Generative AI Hub (AI Core) via Python agent; model selection configurable per tenant (GPT-4o class models recommended for extraction fidelity).

Knowledge & data sources accessed:





Tenant document corpus (via SAP Document Grounding) — policy documents, contracts, transcripts; read-only per engagement



SAP S/4HANA GL Account and Journal Entry APIs — optional, read-only, Connected Mode only; used for live validation of extracted GL mappings against actual chart of accounts



Regulatory change event feeds — Integration Suite / Event Mesh subscriptions; Platform Mode only

Tools or connectors invoked:





Document Grounding tools: retrieve and search indexed documents (read-only)



GL Account – Read (sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1): validate extracted GL account codes against live chart of accounts (read-only, Connected Mode)



Journal Entry Item – Read (sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1): cross-validate extracted journal entry rules against live posting patterns (read-only, Connected Mode)



CAP Policy Service API: read/write approved policy rules, versions, and approval records



A2A policy query tools: expose read-only policy queries to calling Joule agents

Guardrails & fail-safes:





No policy rule is activated without a named approval — this constraint is enforced at the CAP service layer, not just the UI



The agent never invents policy content; it flags uncertainty and routes to human review



Confidence below tenant-configured threshold blocks rule inclusion pending human review



All write operations to the policy corpus require a valid approval record — insert without approval record is rejected at the data layer



A2A-exposed tools are strictly read-only; no external agent can write, modify, or approve rules via A2A



In Platform Mode, regulatory delta detection produces impact reports only — no rule is automatically updated or re-approved without human action





Governance, Risk & Compliance

Data Handling:





Finance policy documents may contain commercially sensitive information; tenant isolation at the CAP persistence layer is mandatory



No PII beyond named approver identity (required for audit trail); approver identity is stored as a non-removable audit record



Data residency: CAP service deployed to tenant's chosen BTP region; document corpus remains within SAP Document Grounding's configured storage region

Compliance Frameworks:





Audit trail requirements: SOX 404, DORA (EU) — full evidence chain and approval record retention



Data isolation: GDPR — tenant data is isolated and deletable on tenant offboarding



SoD enforcement built in to approval workflow to support SOX compliance

Approval Flows:





No rule activation without named finance owner approval; this is a hard system constraint



Re-approval required for any rule modified post-initial approval (new version created)



Regulatory change delta → re-approval required before updated rule activates in connected SAP systems





Milestones

M1: Document Ingestion Complete





Description: All source documents have been ingested, processed, and indexed; the document corpus is ready for extraction.



Achieved when: All submitted documents return a successful indexing status from SAP Document Grounding and are queryable by the extraction agent.



Log on achievement: M1.achieved: document ingestion complete — {doc_count} documents indexed, {source_count} sources processed, tenant={tenant_id}



Log on miss: M1.missed: document ingestion did not complete — {failed_count} documents failed, reason={error_summary}, tenant={tenant_id}



M2: Rule Extraction Complete





Description: The agent has completed its pass over all indexed documents and produced a structured rule inventory with confidence scores.



Achieved when: Extraction job finishes with at least one rule candidate produced and all documents processed (with any failures logged).



Log on achievement: M2.achieved: rule extraction complete — {rule_count} rules extracted, {low_confidence_count} flagged for review, tenant={tenant_id}



Log on miss: M2.missed: rule extraction did not complete — extraction job failed or produced zero rules, reason={error_summary}, tenant={tenant_id}



M3: Validation Complete





Description: Conflict detection, gap analysis, and ambiguity flagging have run and a validation report is available for review.



Achieved when: Validation job completes and the validation report (conflict list, gap list, ambiguity list) is stored and accessible.



Log on achievement: M3.achieved: validation complete — {conflict_count} conflicts, {gap_count} gaps, {ambiguity_count} ambiguities identified, tenant={tenant_id}



Log on miss: M3.missed: validation did not complete — validation job failed, reason={error_summary}, tenant={tenant_id}



M4: Approval Initiated





Description: The structured policy package has been routed to the first-level approver and notifications have been sent.



Achieved when: Approval workflow is created in the CAP service, notification emails are dispatched, and the package is visible in the approver's queue.



Log on achievement: M4.achieved: approval initiated — policy_package_id={package_id}, approver={approver_id}, stage=1, tenant={tenant_id}



Log on miss: M4.missed: approval routing failed — package_id={package_id}, reason={error_summary}, tenant={tenant_id}



M5: Policy Approved





Description: The final-stage approver has signed off on the policy package; the policy version is locked.



Achieved when: The approval record for the final approval stage is written to the CAP service with a valid approver identity and timestamp; policy version status is set to APPROVED.



Log on achievement: M5.achieved: policy approved — policy_package_id={package_id}, final_approver={approver_id}, approved_at={timestamp}, rule_count={rule_count}, tenant={tenant_id}



Log on miss: M5.missed: policy approval not completed — package_id={package_id}, status={current_status}, pending_stage={stage}, tenant={tenant_id}



M6: AI-Ready Package Exported





Description: The approved policy package has been exported as structured JSON/YAML and is available via the CAP Policy Service API.



Achieved when: Export files are generated and stored, and the policy package is queryable via the OData/REST API with APPROVED status.



Log on achievement: M6.achieved: AI-ready package exported — policy_package_id={package_id}, export_formats=[json,yaml], api_endpoint={endpoint}, tenant={tenant_id}



Log on miss: M6.missed: export did not complete — policy_package_id={package_id}, reason={error_summary}, tenant={tenant_id}





Risks, Assumptions, and Dependencies

Risks





SAP Finance AI output schema alignment: If Intelligent Accruals, Journal Entry, or Financial Close agents have undocumented or changing input formats, PolicyBridge's export schema will require rework. Mitigation: validate schema alignment with SAP product teams before export format is finalized.



Multi-language extraction fidelity: Arabic extraction in particular (RTL text, mixed-language financial terminology, scanned documents) may not achieve the same confidence as English. Mitigation: benchmark per-language extraction accuracy during development and set language-specific confidence thresholds.



Multi-tenant data isolation compliance: Regulated-industry customers (banking, public sector) may require formal certification beyond standard CAP multi-tenancy. Mitigation: assess per customer and offer single-tenant dedicated deployment for regulated customers.



Approval workflow configurability vs. complexity: Highly complex approval hierarchies may resist configuration and require development changes. Mitigation: define a maximum configurability boundary in the initial release; document what requires custom development beyond it.



Regulatory feed availability: Commercial or public regulatory change feeds may not be available in structured, machine-consumable form for all required regulatory bodies. Mitigation: design for configurable feed connectors; allow manual upload as a fallback.

Assumptions (Validate These)





SAP Generative AI Hub (AI Core) supports the required LLM capabilities for multi-language finance document extraction at production quality.



SAP Document Grounding supports ingestion of MSG/EML and video transcript formats, or a pre-processing adapter can be built for these.



A2A protocol tooling in Joule Studio supports read-only tool exposure with authenticated, logged calls.



Regulatory change feeds (IASB, FASB, SEC, ESMA) provide structured event data consumable by Integration Suite.

Dependencies





SAP Document Grounding (AI Foundation) — document ingestion and retrieval



SAP Generative AI Hub / AI Core — LLM inference



SAP BTP CAP (Node.js) — persistence and API



SAP Integration Suite + Event Mesh — Platform Mode regulatory synchronization



SAP S/4HANA GL Account and Journal Entry OData APIs — Connected Mode live validation



Joule Studio A2A runtime — agent registration and tool exposure





Acceptance Test Approach

Each must-have requirement has a corresponding acceptance test category. The following table maps requirements to test approach and the primary signal used to determine pass/fail.







Req



Test Type



Test Approach



Pass Signal





R01



Integration



Submit a test document set covering all formats (PDF, DOCX, PPTX, TXT, MSG/EML pre-processed, video transcript pre-processed, XLSX). Verify all documents are indexed and queryable.



All documents return indexed status; content retrievable by extraction agent





R02



Functional + AI evaluation



Run extraction against a labelled test corpus with known rules. Compare extracted rules to ground truth.



Precision ≥ 90%, recall ≥ 85% against ground truth; every rule includes confidence score





R03



Functional



Inject a document set with deliberate conflicts, known gaps, and ambiguous language. Run validation.



All planted conflicts detected; all known gaps identified; ambiguities flagged with description





R04



Audit / compliance



Activate a rule and inspect its stored evidence record. Attempt to modify an approved rule without creating a new version.



All evidence fields populated; post-approval modification blocked at data layer





R05



Workflow



Execute the full approval cycle: submit → notify → approve at each stage → final sign-off. Test SoD violation (preparer = approver). Test delegation and rejection paths.



Workflow completes end-to-end; SoD violation blocked; delegation recorded; rejection returns to preparer





R06



API / integration



Export an approved policy package as JSON and YAML. Query the CAP OData/REST API for rules by type, GL account, effective date. Attempt to query a draft rule via API.



Export files valid against schema; API queries return correct results; draft rules inaccessible externally





R07



Multi-tenancy



Create two tenants with overlapping GL accounts. Query tenant A data from tenant B's credentials. Verify metering captures separate token counts.



Cross-tenant query returns zero results; token counts are tenant-isolated





R08



A2A integration



From a test Joule agent, invoke each exposed PolicyBridge tool via A2A. Attempt a write operation via A2A.



Read tools return correct results; write attempt is rejected; all calls appear in the audit log





R09



Event-driven (Phase 1)



Upload a simulated regulatory change document. Verify delta detection identifies the correct affected rules. Verify affected rules enter the approval workflow.



Impact report produced; correct rules flagged; approval notifications sent to configured approvers

Test data requirement: A reference policy corpus of at least 50 documents (mix of formats, languages, and quality levels) with a labelled ground-truth rule set is required before R02 acceptance testing can begin. This is a project dependency.





Open Questions

Unresolved — action required before implementation:





What is the exact JSON/YAML input schema expected by SAP Intelligent Accruals, Journal Entry, and Financial Close agents? This must be confirmed before R06 export format is finalized. (Blocks R06 acceptance criteria.)



Does SAP Document Grounding natively support video transcript ingestion (TXT output from speech-to-text), or is there a file size / format restriction that requires additional handling? (Affects R01 pre-processing pipeline design.)



What is the minimum viable approval UI for Phase 1 — a BTP Fiori Launchpad tile vs. a standalone React interface?

Resolved — incorporated into PRD:





Does SAP Document Grounding support MSG/EML and video transcript ingestion? Resolved: Neither is natively supported. MSG/EML requires extraction to TXT/HTML via pre-processing adapter; video requires speech-to-text pre-processing. XLSX support unconfirmed — test required. See R01 acceptance criteria.



What is the recommended SAP Integration Suite adapter for ECC on-premise? Resolved: RFC Adapter + SAP Cloud Connector is the standard path. Integration Suite MCP Server is an alternative for A2A-native invocation. See R09 acceptance criteria.



Are SAP-native regulatory change feeds available? Resolved: SAP Regulatory Change Manager tracks SAP's response to regulations — it is not a regulatory event feed. External feeds (IASB RSS, FASB alerts, ESMA publications) are available but unstructured. Phase 1 uses manual upload; Phase 2 adds RSS polling; Phase 3 adds commercial providers (Thomson Reuters, Wolters Kluwer). See R09 phase roadmap.





Appendix

Commercial Model (Placeholder)

The following commercial model tiers are proposed based on the deployment modes. Pricing figures are placeholders pending commercial validation.







Tier



Mode



Packaging



Revenue Type



Notes





Starter



Standalone



Per-engagement flat fee



One-time project



For partners running one-off digitization engagements





Professional



Connected



Annual subscription per tenant



Recurring



Includes GL validation and multi-system connectivity





Platform



Platform



Annual subscription per tenant + consumption metering



Recurring + usage



Includes event-driven regulatory sync; GenAI tokens metered per extraction run





Enterprise



Any



Custom contract



Negotiated



Single-tenant dedicated or BYOL deployments for regulated industries

GenAI consumption metering: Token usage per extraction run is logged per tenant (R07). This supports both cost attribution internally and consumption-based billing in the Platform tier.

Note: Pricing figures, discount structures, and partner margin models are to be defined by the product commercialization team. This section captures the model structure only.



Glossary





Policy Rule: A discrete, structured, machine-readable statement derived from a finance policy document (e.g., "Accrue expenses over $10,000 within the same period they are incurred").



Evidence Chain: The traceable linkage from an activated policy rule back to its source document, page, extraction event, reviewer, and approver.



Confidence Score: A 0–100 numeric indicator assigned by the extraction agent reflecting how clearly and unambiguously the source document supports the extracted rule.



Policy Gap: A finance scenario for which no documented policy rule exists in the extracted corpus.



Delta Detection: The process of comparing an incoming regulatory change against the existing approved rule corpus to identify which rules may be affected.



A2A Protocol: Agent-to-Agent protocol used by SAP Joule Studio to enable structured tool-based interoperability between AI agents.



Standalone Mode: PolicyBridge deployment without SAP Integration Suite; covers ingestion, extraction, validation, approval, and export.



Connected Mode: Adds live GL master data validation and policy write-back to Standalone; requires Integration Suite for on-premise/hybrid landscapes.



Platform Mode: Adds event-driven regulatory change synchronization to Connected Mode; requires Integration Suite and Event Mesh.

References





SAP AI Foundation — Document Grounding: https://help.sap.com/docs/ai-core



SAP Generative AI Hub: https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/generative-ai-hub



SAP BTP CAP Multi-Tenancy: https://cap.cloud.sap/docs/guides/multitenancy



SAP Integration Suite + Event Mesh: https://help.sap.com/docs/integration-suite



Record to Report E2E (BPS-413_002): SAP Reference Business Architecture



SAP S/4HANA GL Account API: sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1



SAP S/4HANA Journal Entry Item API: sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1

Product Requirements Document (PRD)

Title: PolicyBridge Agent — Finance Policy Digitization & AI-Readiness Accelerator Date: 2026-11-05 Owner: Finance Transformation / SAP Implementation Practice Solution Category: AI Agent + CAP Application





Product Purpose & Value Proposition

Elevator Pitch: Finance policy documentation is scattered across Word files, PDFs, Excel workbooks, email chains, and meeting transcripts. SAP's Finance AI agents — Intelligent Accruals, Journal Entry, and Financial Close — require structured, machine-readable rules to operate. PolicyBridge extracts, validates, and packages those rules automatically, compressing a 4–8 week, $150–300K manual consulting engagement into 3–5 days at $15–30K.

Business Need: SAP Finance AI adoption is stalling not because the AI is unready, but because the policy inputs it requires do not exist in usable form. Every customer engagement begins with the same manual work: reading scattered documents, extracting rules by hand, reconciling conflicts, and building an evidence chain for audit. PolicyBridge automates this preparation layer — and, with its event-driven platform mode, keeps policies synchronized as regulations continuously change.

Strategic Shift — From Project Tool to Compliance Platform: Initial policy digitization is the entry point, but the long-term value is continuous regulatory governance. As regulations accelerate (GDPR, DORA, ASC 842, Pillar Two, CSRD, IFRS 17), enterprises face a permanent compliance workload: detect which rules are affected by each change, update and re-approve them, and push corrections to all connected SAP systems. PolicyBridge in Platform Mode becomes the infrastructure layer for this ongoing work — transforming the commercial model from one-time project revenue per engagement to subscription revenue for continuous governance. This is the differentiator that positions PolicyBridge as a platform, not just an accelerator.

Expected Value:







Metric



Baseline



Target





Policy digitization time



4–8 weeks



3–5 days





Cost per engagement



$150–300K



$15–30K (90% reduction)





Policy coverage rate



40–60%



95%+





Gap detection rate



0% (gaps found in production)



85%+ pre-deployment





Audit readiness



20–30%



100% (full evidence chain)





Approval turnaround



2–4 weeks



2–3 days

Product Objectives (Prioritized):





Automate extraction and structuring of finance policy rules from unstructured documents, achieving 95%+ policy coverage per engagement



Surface policy gaps and conflicts before SAP Finance AI deployment, with 85%+ gap detection pre-production



Deliver a 100% audit-ready evidence chain linking every rule to its source document



Enable continuous regulatory compliance via event-driven policy synchronization across SAP landscapes



Package the solution as a multi-tenant SaaS accelerator reusable across partner engagements with minimal configuration overhead





Business Metrics







Metric



Baseline



Target



Timeline



Process / Capability



Source





Policy digitization time



4–8 weeks



3–5 days



Per engagement



Finance Policy Preparation



user





Cost per engagement



$150–300K



$15–30K



Per engagement



Finance Policy Preparation



user





Policy coverage rate



40–60%



95%+



Per engagement



Rule Extraction & Structuring



user





Policy gap detection rate



0%



85%+ pre-deployment



Per engagement



Gap Analysis & Validation



user





Audit readiness



20–30%



100%



Per engagement



Evidence Chain & Compliance



user





Approval turnaround



2–4 weeks



2–3 days



Per engagement



Finance Owner Sign-off



user





User Profiles & Personas

Primary Persona: Alex — SAP Implementation Consultant

Alex is a 35-year-old senior consultant at an SAP implementation partner, running 3–4 Finance AI readiness engagements per year. Each one begins with weeks of document archaeology: reading policy binders, chasing policy owners, manually building rule inventories in spreadsheets. Alex's margin is squeezed because this work is time-intensive but not billable at premium rates. He needs a tool that automates the extraction so he can focus on the validation and advisory work that actually commands consulting rates. He is technically proficient but not a developer — he needs a guided experience with clear outputs he can present to clients.

Goals: Complete policy extraction and structuring in days, not weeks. Present clients with a credible, evidence-backed policy gap report. Reduce re-work from missed rules discovered later in the project.

Key Tasks: Upload or connect client document sources; review and approve extracted rules; generate gap report; export AI-ready policy package; track approval status from finance owners.



Secondary Persona: Maria — Accounting Policy Owner

Maria is a 42-year-old Head of Accounting Policy at a mid-sized manufacturing company. She owns the finance policy corpus but has never had a system to manage it — policies live in shared drives, email threads, and her team's institutional memory. She is skeptical of AI tools after a previous project where automation gave wrong answers. She needs to see exactly where each extracted rule came from before she will approve it. She is the final sign-off in the approval chain and her name goes on the policy before it activates.

Goals: Review and approve only rules she can verify. Understand what gaps exist before they become an audit finding. Sign off with confidence, not pressure.

Key Tasks: Review extracted rules with source citations; approve, reject, or request clarification on individual rules; track open items in the approval queue; sign off on the final policy package.



Tertiary Persona: James — Finance Transformation Lead

James is a 50-year-old VP of Finance Transformation sponsoring the SAP Finance AI program. His measure of success is whether the Intelligent Accruals and Journal Entry agents go live on time. Policy readiness is his biggest risk — it is the dependency he cannot control. He needs visibility into coverage status across the policy corpus and confidence that gaps are known before go-live, not after.

Goals: Know the policy readiness status at any point. Understand which gaps block SAP Finance AI go-live. Track regulatory change exposure across the policy corpus.

Key Tasks: Review policy coverage dashboard; review gap analysis report; escalate unresolved items; sign off on go-live readiness.



Other User Types





Internal Auditor: Validates evidence chain completeness and policy version history for compliance review.



Tenant Administrator: Configures per-tenant extraction rules, approval routing, and SAP system connections.



Regulatory Change Analyst (Platform Mode): Monitors incoming regulatory change events and reviews delta impact reports.





User Goals & Tasks

For Alex (Implementation Consultant):

Goals:





Complete a full policy corpus extraction and structuring engagement in 3–5 days



Deliver a client-ready gap analysis report with evidence



Export a structured policy package the client's SAP Finance AI team can consume directly

Key Tasks:





Connect or upload document sources (SharePoint, file share, individual files)



Trigger extraction and review confidence-scored rule inventory



Review and resolve flagged conflicts and ambiguities



Route policy package for finance owner approval



Export AI-ready JSON/YAML and API endpoint details

For Maria (Accounting Policy Owner):

Goals:





Approve only rules she can verify against source documents



Ensure no rules are activated without her explicit sign-off



Maintain an audit-ready record of what she approved and why

Key Tasks:





Review rule-by-rule with source citation and confidence score



Approve, reject with comments, or request clarification



Monitor approval queue and track pending items



Confirm final policy package version before activation





Product Principles





Evidence before activation: No policy rule is activated without a named approval and a traceable link to its source document. The system flags uncertainty; it never invents policy.



Composability over isolation: PolicyBridge is a node in the SAP Finance AI ecosystem, not a standalone tool. Every output must be consumable by the agents and systems downstream.



Configurability without consultancy: Approval workflows, extraction rules, and tenant settings must be configurable by a power user — not require a new consulting engagement to adjust.



Continuous over one-time: The platform is designed for ongoing regulatory synchronization, not just a single digitization sprint. Architecture decisions must support event-driven, incremental updates.



Transparency over confidence: The agent surfaces low-confidence extractions and unresolved gaps explicitly. A known gap is better than a confident error.





Business Context

Current State: Finance policy documentation is fragmented across SharePoint folders, email attachments, Excel workbooks, PDF binders, and institutional memory. No single source of truth exists. When SAP Finance AI implementations begin, the policy preparation step is discovered to be a multi-week manual effort requiring specialized finance and SAP knowledge. This is a consistent, repeatable pain point across every engagement.

Strategic Alignment: PolicyBridge directly unblocks SAP Finance AI adoption — one of SAP's highest-priority growth areas. For implementation partners, it converts a cost-intensive, low-margin engagement phase into a high-value, tool-assisted service. In Platform Mode, it shifts from project revenue to subscription revenue by becoming the ongoing regulatory compliance layer.

Success Criteria: See Business Metrics section above.





Goals and Non-Goals

Goals (In Scope)





Ingest unstructured finance policy documents from multiple formats and sources (PDF, DOCX, XLSX, PPTX, TXT, MSG/EML, video transcripts, contracts, rough notes) in English, French, German, Spanish, and Arabic



Extract, structure, and confidence-score policy rules including thresholds, GL mappings, calculation methods, approval matrices, exceptions, and effective dates



Detect conflicts between rules from different sources; identify undocumented policy gaps; flag ambiguities for human resolution



Generate and maintain a full evidence chain linking every rule to its source document, page, and extraction timestamp



Route extracted policy packages through a configurable multi-level approval workflow (preparer → reviewer → approver) with SoD enforcement, delegation, escalation, and rejection/re-submission



Deliver AI-ready output as structured JSON/YAML export files and as a queryable OData/REST API hosted in a multi-tenant CAP service



Expose agent tools via A2A protocol so other Joule Finance agents (Intelligent Accruals, Journal Entry, Financial Close) can query policies at runtime



Enable event-driven policy synchronization via SAP Integration Suite and Event Mesh: subscribe to regulatory change feeds, perform delta detection, push updated approved policies to connected SAP landscapes



Support deployment as BTP multi-tenant SaaS, single-tenant dedicated, or customer-managed BYOL

Non-Goals (Out of Scope)





Calculating accruals, posting journal entries, or executing financial close tasks (covered by SAP's native Finance AI agents)



Modifying SAP configuration tables or system settings directly



Auto-approving policies without named finance owner sign-off



Replacing SAP Advanced Financial Closing, Intelligent Accruals Agent, or Journal Entry Agent



Providing general-purpose document management or records management capabilities



Legal interpretation of regulations (regulatory change events are flagged for human review, not auto-resolved)





Requirements

Must-Have Requirements

R01: Multi-Format Document Ingestion





Problem to Solve: Policy documents exist in many formats across scattered locations; consultants spend days manually reading and cataloguing them.



User Story: As an Implementation Consultant, I need to connect document sources (SharePoint, file shares, uploaded files) and trigger automated ingestion so that all policy-relevant content is available for extraction without manual reading.



Acceptance Criteria:





Given a connected SharePoint folder or uploaded file set, when ingestion is triggered, then all natively supported formats (PDF, DOCX, PPTX, TXT, HTML, JPEG, PNG, TIFF) are processed and indexed directly via SAP Document Grounding.



MSG/EML files require a pre-processing adapter: email body and attachments are extracted to TXT/HTML before Document Grounding ingestion. This adapter is part of the PolicyBridge ingestion pipeline.



Video transcripts (Teams, Zoom, Webex recordings) require a pre-processing adapter: speech-to-text conversion (via SAP AI Core or equivalent) produces a TXT transcript which is then ingested via Document Grounding. Raw video files are not passed to Document Grounding directly.



XLSX files: Document Grounding support is not confirmed; a pre-processing adapter converting sheet content to structured TXT/CSV is required as a fallback. Confirm native support during development.



Given a multi-language document (FR, DE, ES, AR), when ingested, then the content is correctly extracted and made available for rule extraction in that language.



Maps to Objective: 1 — Automate extraction and structuring



Priority Rank: 1

R02: AI-Powered Rule Extraction and Confidence Scoring





Problem to Solve: Identifying policy rules within free-text documents requires finance domain expertise and takes days per document set.



User Story: As an Implementation Consultant, I need the agent to automatically identify and structure candidate policy rules with confidence scores so that I can review findings rather than perform the initial extraction manually.



Acceptance Criteria:





Given an ingested document set, when extraction runs, then candidate rules are identified across rule types: thresholds, GL mappings, calculation methods, approval matrices, exceptions, and effective dates.



Each extracted rule includes: rule type, rule text, structured fields, confidence score (0–100), source document reference, page/location, and extraction timestamp.



Rules with confidence below a configurable threshold are flagged for mandatory human review before they can be included in a policy package.



Maps to Objective: 1 — Automate extraction and structuring



Priority Rank: 2

R03: Policy Validation — Conflict Detection, Gap Analysis, Ambiguity Flagging





Problem to Solve: Policy conflicts and gaps are currently discovered during SAP AI go-live, causing costly delays and rework.



User Story: As a Finance Transformation Lead, I need a validation report that surfaces conflicts, gaps, and ambiguities in the policy corpus before SAP Finance AI deployment so that we can resolve them proactively.



Acceptance Criteria:





Given an extracted rule set, when validation runs, then all cross-document rule conflicts are identified and described (which rules conflict, which documents they originate from).



The validation report identifies undocumented scenarios — finance situations for which no policy rule exists — and classifies them as gaps requiring resolution.



Ambiguous rules (contradictory language, missing effective dates, unclear scope) are flagged with the specific ambiguity described.



Validation report is exportable as a structured document.



Maps to Objective: 2 — Gap detection pre-deployment



Priority Rank: 3

R04: Full Evidence Chain





Problem to Solve: Auditors cannot validate AI-driven finance decisions without a traceable link from rule to source document.



User Story: As an Internal Auditor, I need every activated policy rule to have a complete evidence chain so that I can verify the rule's origin and approve it as audit-ready.



Acceptance Criteria:





Every activated rule stores: source document name, document version/date, page number or section reference, extraction timestamp, extraction model version, reviewer identity, approval identity, and approval timestamp.



Evidence chain is immutable once a rule is approved — no post-approval modification without creating a new version.



Evidence chain is exportable per rule and per policy package.



Maps to Objective: 3 — Audit-ready evidence chain



Priority Rank: 4

R05: Multi-Level Approval Workflow





Problem to Solve: Finance policies cannot be activated without named owner approval; current approval processes are informal and undocumented.



User Story: As an Accounting Policy Owner, I need a structured approval workflow with SoD controls so that I can review, approve, or reject rules with full traceability and confidence that no rule activates without my explicit sign-off.



Acceptance Criteria:





Approval routing supports configurable stages: preparer → reviewer → approver (minimum); additional stages configurable per tenant.



SoD enforcement: the person who extracted/prepared a rule cannot be the final approver.



Delegation: approvers can delegate to named alternates with delegation recorded in the audit trail.



Escalation: items exceeding a configurable deadline are automatically escalated to the next level.



Rejection: approvers can reject with mandatory comments; rejected rules return to preparer for revision and re-submission.



All approvals, rejections, and delegations are timestamped and attributed to named users.



Notifications delivered via email; approval actions available in-app.



Maps to Objective: 1, 3



Priority Rank: 5

R06: AI-Ready Output — Export and Queryable API





Problem to Solve: Extracted and approved policies need to be consumable by SAP Finance AI agents in a structured, versioned format.



User Story: As a Finance Transformation Lead, I need approved policies available as both downloadable export files and a live queryable API so that our SAP Finance AI implementation team can consume them directly without format conversion.



Acceptance Criteria:





Approved policy packages are exportable as structured JSON and YAML files.



The CAP Policy Service exposes an OData/REST API that SAP Finance AI agents and implementation tools can query by policy type, rule ID, effective date, and tenant.



Only approved, signed-off policy versions are exposed via the API; draft and rejected versions are not accessible externally.



Policy versions are immutable once approved; updates create new versions with full change history.



Maps to Objective: 1, 2



Priority Rank: 6

R07: Multi-Tenant CAP Backend with Tenant Isolation





Problem to Solve: As a reusable partner accelerator, PolicyBridge must serve multiple customer engagements without data leakage between tenants.



User Story: As a Tenant Administrator, I need full isolation of my organization's policy corpus, approval configuration, and extracted rules from other tenants so that confidential finance policies are never accessible outside my tenant boundary.



Acceptance Criteria:





CAP multi-tenancy enforces data isolation at the persistence layer: tenant A cannot access tenant B's data under any query path.



Per-tenant configuration: extraction rule profiles, approval routing stages, SoD rules, and connected SAP system endpoints are configurable independently per tenant.



GenAI consumption is metered per tenant for consumption-based billing.



Tenant onboarding and offboarding (including data deletion) are supported via administrative operations.



Maps to Objective: 5 — Multi-tenant SaaS reusability



Priority Rank: 7

R08: A2A Composability — Expose Policy Query Tools to Joule Agents





Problem to Solve: SAP Finance AI agents (Accruals, Journal Entry, Financial Close) need to query approved policies at runtime; without a standard interface they cannot access PolicyBridge outputs.



User Story: As a SAP Finance AI implementation team, I need PolicyBridge to expose policy query capabilities via the A2A protocol so that Joule Finance agents can retrieve relevant policy rules during their execution without manual data extraction.



Acceptance Criteria:





PolicyBridge registers as an A2A-compatible agent in the Joule Studio runtime.



Exposed tools include at minimum: query policy by type, query rules by GL account, query rules by scenario/process, retrieve gap list for a given domain.



Tools are read-only: no write or modification operations are exposed via A2A.



A2A calls are authenticated, logged, and attributable to the calling agent.



Maps to Objective: 2, 4



Priority Rank: 8

R09: Event-Driven Policy Synchronization (Platform Mode)





Problem to Solve: Regulatory changes (GDPR, DORA, ASC 842, Pillar Two, CSRD, IFRS 17) continuously affect finance policies; today there is no mechanism to detect which rules are impacted or to propagate updates across SAP landscapes. This is not a one-time problem — it is a permanent operational burden that currently has no tooling.



User Story: As a Regulatory Change Analyst, I need PolicyBridge to detect when a relevant regulatory change occurs and automatically identify which approved rules are affected so that we can update, re-approve, and push the corrected policies to all connected SAP systems before the next compliance deadline.



Acceptance Criteria:





Integration Suite + Event Mesh subscription ingests regulatory change events from configured sources: Phase 1 supports manual regulatory document upload; Phase 2 adds RSS/API polling of IASB, FASB, SEC, and ESMA feeds; Phase 3 supports commercial regulatory intelligence providers (e.g., Thomson Reuters, Wolters Kluwer).



Delta detection compares incoming regulatory content against the current approved rule corpus and produces an impact report: which rules are potentially affected, which are not.



Affected rules are flagged and routed back into the approval workflow for review and re-approval before re-activation.



Updated, re-approved policies are pushed to all connected SAP landscape endpoints (S/4HANA Cloud Public, Cloud Private, On-Premise, ECC) via Integration Suite. For ECC on-premise, the RFC Adapter + SAP Cloud Connector is the standard integration path; Integration Suite MCP Server is an alternative for A2A-native invocation.



Full traceability chain is maintained: regulation change event → impact report → affected rules → re-approval record → updated SAP config.



Maps to Objective: 4 — Continuous regulatory compliance



Phase Roadmap: Phase 1 (manual upload trigger) ships with core product; Phase 2 (automated feed polling) and Phase 3 (commercial feeds) are planned follow-on releases.



Priority Rank: 1 (elevated — this is the primary commercial differentiator distinguishing PolicyBridge as a platform from a one-time tool)



High-Want Requirements

R10: Policy Corpus Dashboard





Problem to Solve: Finance Transformation Leads and Policy Owners have no visibility into overall policy coverage status and outstanding gaps.



User Story: As a Finance Transformation Lead, I need a coverage dashboard showing extraction status, gap count, approval queue depth, and regulatory exposure so that I can track AI readiness progress and escalate blockers.



Priority Rank: 1

R11: Multi-Language Extraction (FR, DE, ES, AR)





Problem to Solve: Multinational organizations maintain policy documents in multiple languages; English-only extraction excludes a significant portion of the policy corpus.



User Story: As an Implementation Consultant at a multinational engagement, I need extraction to work across French, German, Spanish, and Arabic documents so that the full policy corpus is captured regardless of source language.



Priority Rank: 2

R12: SBPA Integration for Complex Approval Routing





Problem to Solve: Some regulated industries require approval workflows with more complex routing logic than the built-in email + in-app UI provides.



User Story: As a Tenant Administrator in a regulated industry, I need the option to route approval workflows through SAP Build Process Automation so that compliance-grade approval governance is enforced.



Priority Rank: 3



Nice-to-Have Requirements

R13: Policy Similarity and Deduplication





Problem to Solve: Large document sets may contain near-duplicate rules stated differently; these create noise in the rule inventory.



Priority Rank: 1

R14: Regulatory Feed Configurability





Problem to Solve: Different tenants need to monitor different regulatory bodies based on their industry and geography.



Priority Rank: 2

R15: Policy Readiness Certification Report





Problem to Solve: SAP implementation partners need a formal deliverable to present to customers confirming AI readiness.



Priority Rank: 3





Non-Functional Requirements

Performance





Extraction latency: A document set of up to 500 pages should complete extraction within 30 minutes.



API response time: Policy query API (CAP OData/REST) should respond within 2 seconds at the 95th percentile.



Approval notification: Email notifications for approval actions should be delivered within 5 minutes of trigger.

Reliability





Availability: 99.5% uptime for the CAP Policy Service (SaaS deployment).



Fallback: If Generative AI Hub is unavailable, extraction jobs queue and resume automatically; no data loss.

Cost





GenAI metering: Token consumption is logged per tenant per extraction run to support consumption-based billing.



Cost guardrails: Configurable per-tenant monthly token budget with alert on threshold breach.

Explainability





Traceability: Every rule carries its full extraction provenance; every API response includes the rule version and approval timestamp.



Confidence communication: Rules below the confidence threshold are always surfaced as requiring human review — never silently included.



Decision logging: All agent reasoning steps (extraction, conflict detection, gap identification) are logged at INFO level with structured fields.





Solution Architecture

Architecture Overview: PolicyBridge runs on SAP BTP as a multi-tenant SaaS solution. The AI agent handles document ingestion and intelligence work; the CAP service provides persistence and the queryable API; Integration Suite and Event Mesh enable the continuous regulatory synchronization platform mode.

Key Components:





PolicyBridge AI Agent — Python A2A agent on SAP BTP Cloud Foundry. Orchestrates document ingestion via SAP Document Grounding, rule extraction and validation via SAP Generative AI Hub (AI Core), and evidence chain assembly. Exposes A2A tools for Joule agent interoperability. Supports multi-language extraction (EN, FR, DE, ES, AR).



CAP Policy Service — Multi-tenant Node.js CAP service on SAP BTP. Stores policy rules, versions, evidence chains, and approval records with full tenant isolation. Exposes OData/REST API for downstream consumption. Handles per-tenant configuration and GenAI consumption metering.



Approval UI — SAP BTP-hosted in-app approval interface for rule review, approve/reject actions, and queue management. Paired with email notifications. Optional SBPA integration for regulated/complex routing.



Integration Suite + Event Mesh (Platform Mode) — Subscribes to regulatory change event feeds. Triggers delta detection in the agent. Routes updated policies to connected SAP landscapes (S/4HANA Cloud Public/Private, On-Premise, ECC) via Integration Suite adapters.



Document Grounding — SAP AI Foundation service for document indexing and retrieval across all supported formats and source connectors.

Integration Points:





SAP Document Grounding: document ingestion and retrieval (read-only, per engagement)



SAP Generative AI Hub / AI Core: LLM inference for extraction, validation, and delta detection (read-only from data perspective)



SAP S/4HANA Cloud (GL Account, Journal Entry APIs): optional live GL master data validation in Connected Mode (read-only)



SAP Integration Suite + Event Mesh: regulatory change event subscription and multi-system policy push (Platform Mode)



A2A runtime: bidirectional tool invocation with Joule Finance agents

Deployment Modes:







Mode



Description



Integration Suite Required





Standalone



Ingestion → extraction → validation → approval → export



No





Connected



Standalone + live GL validation + policy write-back



Optional





Platform



Connected + event-driven regulatory synchronization



Yes

Hosting Options:





BTP multi-tenant SaaS (recommended for partners)



Single-tenant dedicated (enterprise customers requiring isolation)



Customer-managed BYOL (customer's own BTP subaccount)



Agent Extensibility & Instrumentation

Agent Extensibility: PolicyBridge is designed as a composable, extensible node. The following extension points are built in:





Extraction rule profiles: Per-tenant, per-domain rule extraction configurations (e.g., US GAAP vs. IFRS extraction profiles) without code changes.



Tool hooks: A2A-exposed tools are designed to be extended with new query types (e.g., query by IFRS standard, query by jurisdiction) without modifying core agent logic.



Regulatory feed connectors: New regulatory source connectors can be added as Integration Suite iFlow configurations without agent code changes.



Approval workflow stages: Additional approval stages, conditions, and routing logic are configurable per tenant via CAP configuration entities.

Business Step Instrumentation: All six key milestones are instrumented with structured log emissions at INFO level following the pattern [MILESTONE_ID].[achieved|missed]: [description]. This enables observability dashboards, SLA monitoring, and production debugging without code changes.



Automation & Agent Behaviour

Automation Level: Autonomous agent with mandatory human approval gate before policy activation.

Actions the system performs without human approval:





Document ingestion and indexing



Rule extraction and confidence scoring



Conflict detection and gap identification



Evidence chain assembly



Regulatory change delta detection and impact report generation



Routing approval notifications

Actions that require human review or approval:





Activating any policy rule (requires named finance owner sign-off)



Including low-confidence rules in a policy package



Resolving flagged conflicts or ambiguities



Approving re-extracted rules following a regulatory change delta



Pushing updated policies to connected SAP landscapes (requires re-approval)

Model / engine used: SAP Generative AI Hub (AI Core) via Python agent; model selection configurable per tenant (GPT-4o class models recommended for extraction fidelity).

Knowledge & data sources accessed:





Tenant document corpus (via SAP Document Grounding) — policy documents, contracts, transcripts; read-only per engagement



SAP S/4HANA GL Account and Journal Entry APIs — optional, read-only, Connected Mode only; used for live validation of extracted GL mappings against actual chart of accounts



Regulatory change event feeds — Integration Suite / Event Mesh subscriptions; Platform Mode only

Tools or connectors invoked:





Document Grounding tools: retrieve and search indexed documents (read-only)



GL Account – Read (sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1): validate extracted GL account codes against live chart of accounts (read-only, Connected Mode)



Journal Entry Item – Read (sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1): cross-validate extracted journal entry rules against live posting patterns (read-only, Connected Mode)



CAP Policy Service API: read/write approved policy rules, versions, and approval records



A2A policy query tools: expose read-only policy queries to calling Joule agents

Guardrails & fail-safes:





No policy rule is activated without a named approval — this constraint is enforced at the CAP service layer, not just the UI



The agent never invents policy content; it flags uncertainty and routes to human review



Confidence below tenant-configured threshold blocks rule inclusion pending human review



All write operations to the policy corpus require a valid approval record — insert without approval record is rejected at the data layer



A2A-exposed tools are strictly read-only; no external agent can write, modify, or approve rules via A2A



In Platform Mode, regulatory delta detection produces impact reports only — no rule is automatically updated or re-approved without human action





Governance, Risk & Compliance

Data Handling:





Finance policy documents may contain commercially sensitive information; tenant isolation at the CAP persistence layer is mandatory



No PII beyond named approver identity (required for audit trail); approver identity is stored as a non-removable audit record



Data residency: CAP service deployed to tenant's chosen BTP region; document corpus remains within SAP Document Grounding's configured storage region

Compliance Frameworks:





Audit trail requirements: SOX 404, DORA (EU) — full evidence chain and approval record retention



Data isolation: GDPR — tenant data is isolated and deletable on tenant offboarding



SoD enforcement built in to approval workflow to support SOX compliance

Approval Flows:





No rule activation without named finance owner approval; this is a hard system constraint



Re-approval required for any rule modified post-initial approval (new version created)



Regulatory change delta → re-approval required before updated rule activates in connected SAP systems





Milestones

M1: Document Ingestion Complete





Description: All source documents have been ingested, processed, and indexed; the document corpus is ready for extraction.



Achieved when: All submitted documents return a successful indexing status from SAP Document Grounding and are queryable by the extraction agent.



Log on achievement: M1.achieved: document ingestion complete — {doc_count} documents indexed, {source_count} sources processed, tenant={tenant_id}



Log on miss: M1.missed: document ingestion did not complete — {failed_count} documents failed, reason={error_summary}, tenant={tenant_id}



M2: Rule Extraction Complete





Description: The agent has completed its pass over all indexed documents and produced a structured rule inventory with confidence scores.



Achieved when: Extraction job finishes with at least one rule candidate produced and all documents processed (with any failures logged).



Log on achievement: M2.achieved: rule extraction complete — {rule_count} rules extracted, {low_confidence_count} flagged for review, tenant={tenant_id}



Log on miss: M2.missed: rule extraction did not complete — extraction job failed or produced zero rules, reason={error_summary}, tenant={tenant_id}



M3: Validation Complete





Description: Conflict detection, gap analysis, and ambiguity flagging have run and a validation report is available for review.



Achieved when: Validation job completes and the validation report (conflict list, gap list, ambiguity list) is stored and accessible.



Log on achievement: M3.achieved: validation complete — {conflict_count} conflicts, {gap_count} gaps, {ambiguity_count} ambiguities identified, tenant={tenant_id}



Log on miss: M3.missed: validation did not complete — validation job failed, reason={error_summary}, tenant={tenant_id}



M4: Approval Initiated





Description: The structured policy package has been routed to the first-level approver and notifications have been sent.



Achieved when: Approval workflow is created in the CAP service, notification emails are dispatched, and the package is visible in the approver's queue.



Log on achievement: M4.achieved: approval initiated — policy_package_id={package_id}, approver={approver_id}, stage=1, tenant={tenant_id}



Log on miss: M4.missed: approval routing failed — package_id={package_id}, reason={error_summary}, tenant={tenant_id}



M5: Policy Approved





Description: The final-stage approver has signed off on the policy package; the policy version is locked.



Achieved when: The approval record for the final approval stage is written to the CAP service with a valid approver identity and timestamp; policy version status is set to APPROVED.



Log on achievement: M5.achieved: policy approved — policy_package_id={package_id}, final_approver={approver_id}, approved_at={timestamp}, rule_count={rule_count}, tenant={tenant_id}



Log on miss: M5.missed: policy approval not completed — package_id={package_id}, status={current_status}, pending_stage={stage}, tenant={tenant_id}



M6: AI-Ready Package Exported





Description: The approved policy package has been exported as structured JSON/YAML and is available via the CAP Policy Service API.



Achieved when: Export files are generated and stored, and the policy package is queryable via the OData/REST API with APPROVED status.



Log on achievement: M6.achieved: AI-ready package exported — policy_package_id={package_id}, export_formats=[json,yaml], api_endpoint={endpoint}, tenant={tenant_id}



Log on miss: M6.missed: export did not complete — policy_package_id={package_id}, reason={error_summary}, tenant={tenant_id}





Risks, Assumptions, and Dependencies

Risks





SAP Finance AI output schema alignment: If Intelligent Accruals, Journal Entry, or Financial Close agents have undocumented or changing input formats, PolicyBridge's export schema will require rework. Mitigation: validate schema alignment with SAP product teams before export format is finalized.



Multi-language extraction fidelity: Arabic extraction in particular (RTL text, mixed-language financial terminology, scanned documents) may not achieve the same confidence as English. Mitigation: benchmark per-language extraction accuracy during development and set language-specific confidence thresholds.



Multi-tenant data isolation compliance: Regulated-industry customers (banking, public sector) may require formal certification beyond standard CAP multi-tenancy. Mitigation: assess per customer and offer single-tenant dedicated deployment for regulated customers.



Approval workflow configurability vs. complexity: Highly complex approval hierarchies may resist configuration and require development changes. Mitigation: define a maximum configurability boundary in the initial release; document what requires custom development beyond it.



Regulatory feed availability: Commercial or public regulatory change feeds may not be available in structured, machine-consumable form for all required regulatory bodies. Mitigation: design for configurable feed connectors; allow manual upload as a fallback.

Assumptions (Validate These)





SAP Generative AI Hub (AI Core) supports the required LLM capabilities for multi-language finance document extraction at production quality.



SAP Document Grounding supports ingestion of MSG/EML and video transcript formats, or a pre-processing adapter can be built for these.



A2A protocol tooling in Joule Studio supports read-only tool exposure with authenticated, logged calls.



Regulatory change feeds (IASB, FASB, SEC, ESMA) provide structured event data consumable by Integration Suite.

Dependencies





SAP Document Grounding (AI Foundation) — document ingestion and retrieval



SAP Generative AI Hub / AI Core — LLM inference



SAP BTP CAP (Node.js) — persistence and API



SAP Integration Suite + Event Mesh — Platform Mode regulatory synchronization



SAP S/4HANA GL Account and Journal Entry OData APIs — Connected Mode live validation



Joule Studio A2A runtime — agent registration and tool exposure





Acceptance Test Approach

Each must-have requirement has a corresponding acceptance test category. The following table maps requirements to test approach and the primary signal used to determine pass/fail.







Req



Test Type



Test Approach



Pass Signal





R01



Integration



Submit a test document set covering all formats (PDF, DOCX, PPTX, TXT, MSG/EML pre-processed, video transcript pre-processed, XLSX). Verify all documents are indexed and queryable.



All documents return indexed status; content retrievable by extraction agent





R02



Functional + AI evaluation



Run extraction against a labelled test corpus with known rules. Compare extracted rules to ground truth.



Precision ≥ 90%, recall ≥ 85% against ground truth; every rule includes confidence score





R03



Functional



Inject a document set with deliberate conflicts, known gaps, and ambiguous language. Run validation.



All planted conflicts detected; all known gaps identified; ambiguities flagged with description





R04



Audit / compliance



Activate a rule and inspect its stored evidence record. Attempt to modify an approved rule without creating a new version.



All evidence fields populated; post-approval modification blocked at data layer





R05



Workflow



Execute the full approval cycle: submit → notify → approve at each stage → final sign-off. Test SoD violation (preparer = approver). Test delegation and rejection paths.



Workflow completes end-to-end; SoD violation blocked; delegation recorded; rejection returns to preparer





R06



API / integration



Export an approved policy package as JSON and YAML. Query the CAP OData/REST API for rules by type, GL account, effective date. Attempt to query a draft rule via API.



Export files valid against schema; API queries return correct results; draft rules inaccessible externally





R07



Multi-tenancy



Create two tenants with overlapping GL accounts. Query tenant A data from tenant B's credentials. Verify metering captures separate token counts.



Cross-tenant query returns zero results; token counts are tenant-isolated





R08



A2A integration



From a test Joule agent, invoke each exposed PolicyBridge tool via A2A. Attempt a write operation via A2A.



Read tools return correct results; write attempt is rejected; all calls appear in the audit log





R09



Event-driven (Phase 1)



Upload a simulated regulatory change document. Verify delta detection identifies the correct affected rules. Verify affected rules enter the approval workflow.



Impact report produced; correct rules flagged; approval notifications sent to configured approvers

Test data requirement: A reference policy corpus of at least 50 documents (mix of formats, languages, and quality levels) with a labelled ground-truth rule set is required before R02 acceptance testing can begin. This is a project dependency.





Open Questions

Unresolved — action required before implementation:





What is the exact JSON/YAML input schema expected by SAP Intelligent Accruals, Journal Entry, and Financial Close agents? This must be confirmed before R06 export format is finalized. (Blocks R06 acceptance criteria.)



Does SAP Document Grounding natively support video transcript ingestion (TXT output from speech-to-text), or is there a file size / format restriction that requires additional handling? (Affects R01 pre-processing pipeline design.)



What is the minimum viable approval UI for Phase 1 — a BTP Fiori Launchpad tile vs. a standalone React interface?

Resolved — incorporated into PRD:





Does SAP Document Grounding support MSG/EML and video transcript ingestion? Resolved: Neither is natively supported. MSG/EML requires extraction to TXT/HTML via pre-processing adapter; video requires speech-to-text pre-processing. XLSX support unconfirmed — test required. See R01 acceptance criteria.



What is the recommended SAP Integration Suite adapter for ECC on-premise? Resolved: RFC Adapter + SAP Cloud Connector is the standard path. Integration Suite MCP Server is an alternative for A2A-native invocation. See R09 acceptance criteria.



Are SAP-native regulatory change feeds available? Resolved: SAP Regulatory Change Manager tracks SAP's response to regulations — it is not a regulatory event feed. External feeds (IASB RSS, FASB alerts, ESMA publications) are available but unstructured. Phase 1 uses manual upload; Phase 2 adds RSS polling; Phase 3 adds commercial providers (Thomson Reuters, Wolters Kluwer). See R09 phase roadmap.





Appendix

Commercial Model (Placeholder)

The following commercial model tiers are proposed based on the deployment modes. Pricing figures are placeholders pending commercial validation.







Tier



Mode



Packaging



Revenue Type



Notes





Starter



Standalone



Per-engagement flat fee



One-time project



For partners running one-off digitization engagements





Professional



Connected



Annual subscription per tenant



Recurring



Includes GL validation and multi-system connectivity





Platform



Platform



Annual subscription per tenant + consumption metering



Recurring + usage



Includes event-driven regulatory sync; GenAI tokens metered per extraction run





Enterprise



Any



Custom contract



Negotiated



Single-tenant dedicated or BYOL deployments for regulated industries

GenAI consumption metering: Token usage per extraction run is logged per tenant (R07). This supports both cost attribution internally and consumption-based billing in the Platform tier.

Note: Pricing figures, discount structures, and partner margin models are to be defined by the product commercialization team. This section captures the model structure only.



Glossary





Policy Rule: A discrete, structured, machine-readable statement derived from a finance policy document (e.g., "Accrue expenses over $10,000 within the same period they are incurred").



Evidence Chain: The traceable linkage from an activated policy rule back to its source document, page, extraction event, reviewer, and approver.



Confidence Score: A 0–100 numeric indicator assigned by the extraction agent reflecting how clearly and unambiguously the source document supports the extracted rule.



Policy Gap: A finance scenario for which no documented policy rule exists in the extracted corpus.



Delta Detection: The process of comparing an incoming regulatory change against the existing approved rule corpus to identify which rules may be affected.



A2A Protocol: Agent-to-Agent protocol used by SAP Joule Studio to enable structured tool-based interoperability between AI agents.



Standalone Mode: PolicyBridge deployment without SAP Integration Suite; covers ingestion, extraction, validation, approval, and export.



Connected Mode: Adds live GL master data validation and policy write-back to Standalone; requires Integration Suite for on-premise/hybrid landscapes.



Platform Mode: Adds event-driven regulatory change synchronization to Connected Mode; requires Integration Suite and Event Mesh.

References





SAP AI Foundation — Document Grounding: https://help.sap.com/docs/ai-core



SAP Generative AI Hub: https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/generative-ai-hub



SAP BTP CAP Multi-Tenancy: https://cap.cloud.sap/docs/guides/multitenancy



SAP Integration Suite + Event Mesh: https://help.sap.com/docs/integration-suite



Record to Report E2E (BPS-413_002): SAP Reference Business Architecture



SAP S/4HANA GL Account API: sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1



SAP S/4HANA Journal Entry Item API: sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1

Product Requirements Document (PRD)

Title: PolicyBridge Agent — Finance Policy Digitization & AI-Readiness Accelerator Date: 2026-11-05 Owner: Finance Transformation / SAP Implementation Practice Solution Category: AI Agent + CAP Application





Product Purpose & Value Proposition

Elevator Pitch: Finance policy documentation is scattered across Word files, PDFs, Excel workbooks, email chains, and meeting transcripts. SAP's Finance AI agents — Intelligent Accruals, Journal Entry, and Financial Close — require structured, machine-readable rules to operate. PolicyBridge extracts, validates, and packages those rules automatically, compressing a 4–8 week, $150–300K manual consulting engagement into 3–5 days at $15–30K.

Business Need: SAP Finance AI adoption is stalling not because the AI is unready, but because the policy inputs it requires do not exist in usable form. Every customer engagement begins with the same manual work: reading scattered documents, extracting rules by hand, reconciling conflicts, and building an evidence chain for audit. PolicyBridge automates this preparation layer — and, with its event-driven platform mode, keeps policies synchronized as regulations continuously change.

Strategic Shift — From Project Tool to Compliance Platform: Initial policy digitization is the entry point, but the long-term value is continuous regulatory governance. As regulations accelerate (GDPR, DORA, ASC 842, Pillar Two, CSRD, IFRS 17), enterprises face a permanent compliance workload: detect which rules are affected by each change, update and re-approve them, and push corrections to all connected SAP systems. PolicyBridge in Platform Mode becomes the infrastructure layer for this ongoing work — transforming the commercial model from one-time project revenue per engagement to subscription revenue for continuous governance. This is the differentiator that positions PolicyBridge as a platform, not just an accelerator.

Expected Value:







Metric



Baseline



Target





Policy digitization time



4–8 weeks



3–5 days





Cost per engagement



$150–300K



$15–30K (90% reduction)





Policy coverage rate



40–60%



95%+





Gap detection rate



0% (gaps found in production)



85%+ pre-deployment





Audit readiness



20–30%



100% (full evidence chain)





Approval turnaround



2–4 weeks



2–3 days

Product Objectives (Prioritized):





Automate extraction and structuring of finance policy rules from unstructured documents, achieving 95%+ policy coverage per engagement



Surface policy gaps and conflicts before SAP Finance AI deployment, with 85%+ gap detection pre-production



Deliver a 100% audit-ready evidence chain linking every rule to its source document



Enable continuous regulatory compliance via event-driven policy synchronization across SAP landscapes



Package the solution as a multi-tenant SaaS accelerator reusable across partner engagements with minimal configuration overhead





Business Metrics







Metric



Baseline



Target



Timeline



Process / Capability



Source





Policy digitization time



4–8 weeks



3–5 days



Per engagement



Finance Policy Preparation



user





Cost per engagement



$150–300K



$15–30K



Per engagement



Finance Policy Preparation



user





Policy coverage rate



40–60%



95%+



Per engagement



Rule Extraction & Structuring



user





Policy gap detection rate



0%



85%+ pre-deployment



Per engagement



Gap Analysis & Validation



user





Audit readiness



20–30%



100%



Per engagement



Evidence Chain & Compliance



user





Approval turnaround



2–4 weeks



2–3 days



Per engagement



Finance Owner Sign-off



user





User Profiles & Personas

Primary Persona: Alex — SAP Implementation Consultant

Alex is a 35-year-old senior consultant at an SAP implementation partner, running 3–4 Finance AI readiness engagements per year. Each one begins with weeks of document archaeology: reading policy binders, chasing policy owners, manually building rule inventories in spreadsheets. Alex's margin is squeezed because this work is time-intensive but not billable at premium rates. He needs a tool that automates the extraction so he can focus on the validation and advisory work that actually commands consulting rates. He is technically proficient but not a developer — he needs a guided experience with clear outputs he can present to clients.

Goals: Complete policy extraction and structuring in days, not weeks. Present clients with a credible, evidence-backed policy gap report. Reduce re-work from missed rules discovered later in the project.

Key Tasks: Upload or connect client document sources; review and approve extracted rules; generate gap report; export AI-ready policy package; track approval status from finance owners.



Secondary Persona: Maria — Accounting Policy Owner

Maria is a 42-year-old Head of Accounting Policy at a mid-sized manufacturing company. She owns the finance policy corpus but has never had a system to manage it — policies live in shared drives, email threads, and her team's institutional memory. She is skeptical of AI tools after a previous project where automation gave wrong answers. She needs to see exactly where each extracted rule came from before she will approve it. She is the final sign-off in the approval chain and her name goes on the policy before it activates.

Goals: Review and approve only rules she can verify. Understand what gaps exist before they become an audit finding. Sign off with confidence, not pressure.

Key Tasks: Review extracted rules with source citations; approve, reject, or request clarification on individual rules; track open items in the approval queue; sign off on the final policy package.



Tertiary Persona: James — Finance Transformation Lead

James is a 50-year-old VP of Finance Transformation sponsoring the SAP Finance AI program. His measure of success is whether the Intelligent Accruals and Journal Entry agents go live on time. Policy readiness is his biggest risk — it is the dependency he cannot control. He needs visibility into coverage status across the policy corpus and confidence that gaps are known before go-live, not after.

Goals: Know the policy readiness status at any point. Understand which gaps block SAP Finance AI go-live. Track regulatory change exposure across the policy corpus.

Key Tasks: Review policy coverage dashboard; review gap analysis report; escalate unresolved items; sign off on go-live readiness.



Other User Types





Internal Auditor: Validates evidence chain completeness and policy version history for compliance review.



Tenant Administrator: Configures per-tenant extraction rules, approval routing, and SAP system connections.



Regulatory Change Analyst (Platform Mode): Monitors incoming regulatory change events and reviews delta impact reports.





User Goals & Tasks

For Alex (Implementation Consultant):

Goals:





Complete a full policy corpus extraction and structuring engagement in 3–5 days



Deliver a client-ready gap analysis report with evidence



Export a structured policy package the client's SAP Finance AI team can consume directly

Key Tasks:





Connect or upload document sources (SharePoint, file share, individual files)



Trigger extraction and review confidence-scored rule inventory



Review and resolve flagged conflicts and ambiguities



Route policy package for finance owner approval



Export AI-ready JSON/YAML and API endpoint details

For Maria (Accounting Policy Owner):

Goals:





Approve only rules she can verify against source documents



Ensure no rules are activated without her explicit sign-off



Maintain an audit-ready record of what she approved and why

Key Tasks:





Review rule-by-rule with source citation and confidence score



Approve, reject with comments, or request clarification



Monitor approval queue and track pending items



Confirm final policy package version before activation





Product Principles





Evidence before activation: No policy rule is activated without a named approval and a traceable link to its source document. The system flags uncertainty; it never invents policy.



Composability over isolation: PolicyBridge is a node in the SAP Finance AI ecosystem, not a standalone tool. Every output must be consumable by the agents and systems downstream.



Configurability without consultancy: Approval workflows, extraction rules, and tenant settings must be configurable by a power user — not require a new consulting engagement to adjust.



Continuous over one-time: The platform is designed for ongoing regulatory synchronization, not just a single digitization sprint. Architecture decisions must support event-driven, incremental updates.



Transparency over confidence: The agent surfaces low-confidence extractions and unresolved gaps explicitly. A known gap is better than a confident error.





Business Context

Current State: Finance policy documentation is fragmented across SharePoint folders, email attachments, Excel workbooks, PDF binders, and institutional memory. No single source of truth exists. When SAP Finance AI implementations begin, the policy preparation step is discovered to be a multi-week manual effort requiring specialized finance and SAP knowledge. This is a consistent, repeatable pain point across every engagement.

Strategic Alignment: PolicyBridge directly unblocks SAP Finance AI adoption — one of SAP's highest-priority growth areas. For implementation partners, it converts a cost-intensive, low-margin engagement phase into a high-value, tool-assisted service. In Platform Mode, it shifts from project revenue to subscription revenue by becoming the ongoing regulatory compliance layer.

Success Criteria: See Business Metrics section above.





Goals and Non-Goals

Goals (In Scope)





Ingest unstructured finance policy documents from multiple formats and sources (PDF, DOCX, XLSX, PPTX, TXT, MSG/EML, video transcripts, contracts, rough notes) in English, French, German, Spanish, and Arabic



Extract, structure, and confidence-score policy rules including thresholds, GL mappings, calculation methods, approval matrices, exceptions, and effective dates



Detect conflicts between rules from different sources; identify undocumented policy gaps; flag ambiguities for human resolution



Generate and maintain a full evidence chain linking every rule to its source document, page, and extraction timestamp



Route extracted policy packages through a configurable multi-level approval workflow (preparer → reviewer → approver) with SoD enforcement, delegation, escalation, and rejection/re-submission



Deliver AI-ready output as structured JSON/YAML export files and as a queryable OData/REST API hosted in a multi-tenant CAP service



Expose agent tools via A2A protocol so other Joule Finance agents (Intelligent Accruals, Journal Entry, Financial Close) can query policies at runtime



Enable event-driven policy synchronization via SAP Integration Suite and Event Mesh: subscribe to regulatory change feeds, perform delta detection, push updated approved policies to connected SAP landscapes



Support deployment as BTP multi-tenant SaaS, single-tenant dedicated, or customer-managed BYOL

Non-Goals (Out of Scope)





Calculating accruals, posting journal entries, or executing financial close tasks (covered by SAP's native Finance AI agents)



Modifying SAP configuration tables or system settings directly



Auto-approving policies without named finance owner sign-off



Replacing SAP Advanced Financial Closing, Intelligent Accruals Agent, or Journal Entry Agent



Providing general-purpose document management or records management capabilities



Legal interpretation of regulations (regulatory change events are flagged for human review, not auto-resolved)





Requirements

Must-Have Requirements

R01: Multi-Format Document Ingestion





Problem to Solve: Policy documents exist in many formats across scattered locations; consultants spend days manually reading and cataloguing them.



User Story: As an Implementation Consultant, I need to connect document sources (SharePoint, file shares, uploaded files) and trigger automated ingestion so that all policy-relevant content is available for extraction without manual reading.



Acceptance Criteria:





Given a connected SharePoint folder or uploaded file set, when ingestion is triggered, then all natively supported formats (PDF, DOCX, PPTX, TXT, HTML, JPEG, PNG, TIFF) are processed and indexed directly via SAP Document Grounding.



MSG/EML files require a pre-processing adapter: email body and attachments are extracted to TXT/HTML before Document Grounding ingestion. This adapter is part of the PolicyBridge ingestion pipeline.



Video transcripts (Teams, Zoom, Webex recordings) require a pre-processing adapter: speech-to-text conversion (via SAP AI Core or equivalent) produces a TXT transcript which is then ingested via Document Grounding. Raw video files are not passed to Document Grounding directly.



XLSX files: Document Grounding support is not confirmed; a pre-processing adapter converting sheet content to structured TXT/CSV is required as a fallback. Confirm native support during development.



Given a multi-language document (FR, DE, ES, AR), when ingested, then the content is correctly extracted and made available for rule extraction in that language.



Maps to Objective: 1 — Automate extraction and structuring



Priority Rank: 1

R02: AI-Powered Rule Extraction and Confidence Scoring





Problem to Solve: Identifying policy rules within free-text documents requires finance domain expertise and takes days per document set.



User Story: As an Implementation Consultant, I need the agent to automatically identify and structure candidate policy rules with confidence scores so that I can review findings rather than perform the initial extraction manually.



Acceptance Criteria:





Given an ingested document set, when extraction runs, then candidate rules are identified across rule types: thresholds, GL mappings, calculation methods, approval matrices, exceptions, and effective dates.



Each extracted rule includes: rule type, rule text, structured fields, confidence score (0–100), source document reference, page/location, and extraction timestamp.



Rules with confidence below a configurable threshold are flagged for mandatory human review before they can be included in a policy package.



Maps to Objective: 1 — Automate extraction and structuring



Priority Rank: 2

R03: Policy Validation — Conflict Detection, Gap Analysis, Ambiguity Flagging





Problem to Solve: Policy conflicts and gaps are currently discovered during SAP AI go-live, causing costly delays and rework.



User Story: As a Finance Transformation Lead, I need a validation report that surfaces conflicts, gaps, and ambiguities in the policy corpus before SAP Finance AI deployment so that we can resolve them proactively.



Acceptance Criteria:





Given an extracted rule set, when validation runs, then all cross-document rule conflicts are identified and described (which rules conflict, which documents they originate from).



The validation report identifies undocumented scenarios — finance situations for which no policy rule exists — and classifies them as gaps requiring resolution.



Ambiguous rules (contradictory language, missing effective dates, unclear scope) are flagged with the specific ambiguity described.



Validation report is exportable as a structured document.



Maps to Objective: 2 — Gap detection pre-deployment



Priority Rank: 3

R04: Full Evidence Chain





Problem to Solve: Auditors cannot validate AI-driven finance decisions without a traceable link from rule to source document.



User Story: As an Internal Auditor, I need every activated policy rule to have a complete evidence chain so that I can verify the rule's origin and approve it as audit-ready.



Acceptance Criteria:





Every activated rule stores: source document name, document version/date, page number or section reference, extraction timestamp, extraction model version, reviewer identity, approval identity, and approval timestamp.



Evidence chain is immutable once a rule is approved — no post-approval modification without creating a new version.



Evidence chain is exportable per rule and per policy package.



Maps to Objective: 3 — Audit-ready evidence chain



Priority Rank: 4

R05: Multi-Level Approval Workflow





Problem to Solve: Finance policies cannot be activated without named owner approval; current approval processes are informal and undocumented.



User Story: As an Accounting Policy Owner, I need a structured approval workflow with SoD controls so that I can review, approve, or reject rules with full traceability and confidence that no rule activates without my explicit sign-off.



Acceptance Criteria:





Approval routing supports configurable stages: preparer → reviewer → approver (minimum); additional stages configurable per tenant.



SoD enforcement: the person who extracted/prepared a rule cannot be the final approver.



Delegation: approvers can delegate to named alternates with delegation recorded in the audit trail.



Escalation: items exceeding a configurable deadline are automatically escalated to the next level.



Rejection: approvers can reject with mandatory comments; rejected rules return to preparer for revision and re-submission.



All approvals, rejections, and delegations are timestamped and attributed to named users.



Notifications delivered via email; approval actions available in-app.



Maps to Objective: 1, 3



Priority Rank: 5

R06: AI-Ready Output — Export and Queryable API





Problem to Solve: Extracted and approved policies need to be consumable by SAP Finance AI agents in a structured, versioned format.



User Story: As a Finance Transformation Lead, I need approved policies available as both downloadable export files and a live queryable API so that our SAP Finance AI implementation team can consume them directly without format conversion.



Acceptance Criteria:





Approved policy packages are exportable as structured JSON and YAML files.



The CAP Policy Service exposes an OData/REST API that SAP Finance AI agents and implementation tools can query by policy type, rule ID, effective date, and tenant.



Only approved, signed-off policy versions are exposed via the API; draft and rejected versions are not accessible externally.



Policy versions are immutable once approved; updates create new versions with full change history.



Maps to Objective: 1, 2



Priority Rank: 6

R07: Multi-Tenant CAP Backend with Tenant Isolation





Problem to Solve: As a reusable partner accelerator, PolicyBridge must serve multiple customer engagements without data leakage between tenants.



User Story: As a Tenant Administrator, I need full isolation of my organization's policy corpus, approval configuration, and extracted rules from other tenants so that confidential finance policies are never accessible outside my tenant boundary.



Acceptance Criteria:





CAP multi-tenancy enforces data isolation at the persistence layer: tenant A cannot access tenant B's data under any query path.



Per-tenant configuration: extraction rule profiles, approval routing stages, SoD rules, and connected SAP system endpoints are configurable independently per tenant.



GenAI consumption is metered per tenant for consumption-based billing.



Tenant onboarding and offboarding (including data deletion) are supported via administrative operations.



Maps to Objective: 5 — Multi-tenant SaaS reusability



Priority Rank: 7

R08: A2A Composability — Expose Policy Query Tools to Joule Agents





Problem to Solve: SAP Finance AI agents (Accruals, Journal Entry, Financial Close) need to query approved policies at runtime; without a standard interface they cannot access PolicyBridge outputs.



User Story: As a SAP Finance AI implementation team, I need PolicyBridge to expose policy query capabilities via the A2A protocol so that Joule Finance agents can retrieve relevant policy rules during their execution without manual data extraction.



Acceptance Criteria:





PolicyBridge registers as an A2A-compatible agent in the Joule Studio runtime.



Exposed tools include at minimum: query policy by type, query rules by GL account, query rules by scenario/process, retrieve gap list for a given domain.



Tools are read-only: no write or modification operations are exposed via A2A.



A2A calls are authenticated, logged, and attributable to the calling agent.



Maps to Objective: 2, 4



Priority Rank: 8

R09: Event-Driven Policy Synchronization (Platform Mode)





Problem to Solve: Regulatory changes (GDPR, DORA, ASC 842, Pillar Two, CSRD, IFRS 17) continuously affect finance policies; today there is no mechanism to detect which rules are impacted or to propagate updates across SAP landscapes. This is not a one-time problem — it is a permanent operational burden that currently has no tooling.



User Story: As a Regulatory Change Analyst, I need PolicyBridge to detect when a relevant regulatory change occurs and automatically identify which approved rules are affected so that we can update, re-approve, and push the corrected policies to all connected SAP systems before the next compliance deadline.



Acceptance Criteria:





Integration Suite + Event Mesh subscription ingests regulatory change events from configured sources: Phase 1 supports manual regulatory document upload; Phase 2 adds RSS/API polling of IASB, FASB, SEC, and ESMA feeds; Phase 3 supports commercial regulatory intelligence providers (e.g., Thomson Reuters, Wolters Kluwer).



Delta detection compares incoming regulatory content against the current approved rule corpus and produces an impact report: which rules are potentially affected, which are not.



Affected rules are flagged and routed back into the approval workflow for review and re-approval before re-activation.



Updated, re-approved policies are pushed to all connected SAP landscape endpoints (S/4HANA Cloud Public, Cloud Private, On-Premise, ECC) via Integration Suite. For ECC on-premise, the RFC Adapter + SAP Cloud Connector is the standard integration path; Integration Suite MCP Server is an alternative for A2A-native invocation.



Full traceability chain is maintained: regulation change event → impact report → affected rules → re-approval record → updated SAP config.



Maps to Objective: 4 — Continuous regulatory compliance



Phase Roadmap: Phase 1 (manual upload trigger) ships with core product; Phase 2 (automated feed polling) and Phase 3 (commercial feeds) are planned follow-on releases.



Priority Rank: 1 (elevated — this is the primary commercial differentiator distinguishing PolicyBridge as a platform from a one-time tool)



High-Want Requirements

R10: Policy Corpus Dashboard





Problem to Solve: Finance Transformation Leads and Policy Owners have no visibility into overall policy coverage status and outstanding gaps.



User Story: As a Finance Transformation Lead, I need a coverage dashboard showing extraction status, gap count, approval queue depth, and regulatory exposure so that I can track AI readiness progress and escalate blockers.



Priority Rank: 1

R11: Multi-Language Extraction (FR, DE, ES, AR)





Problem to Solve: Multinational organizations maintain policy documents in multiple languages; English-only extraction excludes a significant portion of the policy corpus.



User Story: As an Implementation Consultant at a multinational engagement, I need extraction to work across French, German, Spanish, and Arabic documents so that the full policy corpus is captured regardless of source language.



Priority Rank: 2

R12: SBPA Integration for Complex Approval Routing





Problem to Solve: Some regulated industries require approval workflows with more complex routing logic than the built-in email + in-app UI provides.



User Story: As a Tenant Administrator in a regulated industry, I need the option to route approval workflows through SAP Build Process Automation so that compliance-grade approval governance is enforced.



Priority Rank: 3



Nice-to-Have Requirements

R13: Policy Similarity and Deduplication





Problem to Solve: Large document sets may contain near-duplicate rules stated differently; these create noise in the rule inventory.



Priority Rank: 1

R14: Regulatory Feed Configurability





Problem to Solve: Different tenants need to monitor different regulatory bodies based on their industry and geography.



Priority Rank: 2

R15: Policy Readiness Certification Report





Problem to Solve: SAP implementation partners need a formal deliverable to present to customers confirming AI readiness.



Priority Rank: 3





Non-Functional Requirements

Performance





Extraction latency: A document set of up to 500 pages should complete extraction within 30 minutes.



API response time: Policy query API (CAP OData/REST) should respond within 2 seconds at the 95th percentile.



Approval notification: Email notifications for approval actions should be delivered within 5 minutes of trigger.

Reliability





Availability: 99.5% uptime for the CAP Policy Service (SaaS deployment).



Fallback: If Generative AI Hub is unavailable, extraction jobs queue and resume automatically; no data loss.

Cost





GenAI metering: Token consumption is logged per tenant per extraction run to support consumption-based billing.



Cost guardrails: Configurable per-tenant monthly token budget with alert on threshold breach.

Explainability





Traceability: Every rule carries its full extraction provenance; every API response includes the rule version and approval timestamp.



Confidence communication: Rules below the confidence threshold are always surfaced as requiring human review — never silently included.



Decision logging: All agent reasoning steps (extraction, conflict detection, gap identification) are logged at INFO level with structured fields.





Solution Architecture

Architecture Overview: PolicyBridge runs on SAP BTP as a multi-tenant SaaS solution. The AI agent handles document ingestion and intelligence work; the CAP service provides persistence and the queryable API; Integration Suite and Event Mesh enable the continuous regulatory synchronization platform mode.

Key Components:





PolicyBridge AI Agent — Python A2A agent on SAP BTP Cloud Foundry. Orchestrates document ingestion via SAP Document Grounding, rule extraction and validation via SAP Generative AI Hub (AI Core), and evidence chain assembly. Exposes A2A tools for Joule agent interoperability. Supports multi-language extraction (EN, FR, DE, ES, AR).



CAP Policy Service — Multi-tenant Node.js CAP service on SAP BTP. Stores policy rules, versions, evidence chains, and approval records with full tenant isolation. Exposes OData/REST API for downstream consumption. Handles per-tenant configuration and GenAI consumption metering.



Approval UI — SAP BTP-hosted in-app approval interface for rule review, approve/reject actions, and queue management. Paired with email notifications. Optional SBPA integration for regulated/complex routing.



Integration Suite + Event Mesh (Platform Mode) — Subscribes to regulatory change event feeds. Triggers delta detection in the agent. Routes updated policies to connected SAP landscapes (S/4HANA Cloud Public/Private, On-Premise, ECC) via Integration Suite adapters.



Document Grounding — SAP AI Foundation service for document indexing and retrieval across all supported formats and source connectors.

Integration Points:





SAP Document Grounding: document ingestion and retrieval (read-only, per engagement)



SAP Generative AI Hub / AI Core: LLM inference for extraction, validation, and delta detection (read-only from data perspective)



SAP S/4HANA Cloud (GL Account, Journal Entry APIs): optional live GL master data validation in Connected Mode (read-only)



SAP Integration Suite + Event Mesh: regulatory change event subscription and multi-system policy push (Platform Mode)



A2A runtime: bidirectional tool invocation with Joule Finance agents

Deployment Modes:







Mode



Description



Integration Suite Required





Standalone



Ingestion → extraction → validation → approval → export



No





Connected



Standalone + live GL validation + policy write-back



Optional





Platform



Connected + event-driven regulatory synchronization



Yes

Hosting Options:





BTP multi-tenant SaaS (recommended for partners)



Single-tenant dedicated (enterprise customers requiring isolation)



Customer-managed BYOL (customer's own BTP subaccount)



Agent Extensibility & Instrumentation

Agent Extensibility: PolicyBridge is designed as a composable, extensible node. The following extension points are built in:





Extraction rule profiles: Per-tenant, per-domain rule extraction configurations (e.g., US GAAP vs. IFRS extraction profiles) without code changes.



Tool hooks: A2A-exposed tools are designed to be extended with new query types (e.g., query by IFRS standard, query by jurisdiction) without modifying core agent logic.



Regulatory feed connectors: New regulatory source connectors can be added as Integration Suite iFlow configurations without agent code changes.



Approval workflow stages: Additional approval stages, conditions, and routing logic are configurable per tenant via CAP configuration entities.

Business Step Instrumentation: All six key milestones are instrumented with structured log emissions at INFO level following the pattern [MILESTONE_ID].[achieved|missed]: [description]. This enables observability dashboards, SLA monitoring, and production debugging without code changes.



Automation & Agent Behaviour

Automation Level: Autonomous agent with mandatory human approval gate before policy activation.

Actions the system performs without human approval:





Document ingestion and indexing



Rule extraction and confidence scoring



Conflict detection and gap identification



Evidence chain assembly



Regulatory change delta detection and impact report generation



Routing approval notifications

Actions that require human review or approval:





Activating any policy rule (requires named finance owner sign-off)



Including low-confidence rules in a policy package



Resolving flagged conflicts or ambiguities



Approving re-extracted rules following a regulatory change delta



Pushing updated policies to connected SAP landscapes (requires re-approval)

Model / engine used: SAP Generative AI Hub (AI Core) via Python agent; model selection configurable per tenant (GPT-4o class models recommended for extraction fidelity).

Knowledge & data sources accessed:





Tenant document corpus (via SAP Document Grounding) — policy documents, contracts, transcripts; read-only per engagement



SAP S/4HANA GL Account and Journal Entry APIs — optional, read-only, Connected Mode only; used for live validation of extracted GL mappings against actual chart of accounts



Regulatory change event feeds — Integration Suite / Event Mesh subscriptions; Platform Mode only

Tools or connectors invoked:





Document Grounding tools: retrieve and search indexed documents (read-only)



GL Account – Read (sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1): validate extracted GL account codes against live chart of accounts (read-only, Connected Mode)



Journal Entry Item – Read (sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1): cross-validate extracted journal entry rules against live posting patterns (read-only, Connected Mode)



CAP Policy Service API: read/write approved policy rules, versions, and approval records



A2A policy query tools: expose read-only policy queries to calling Joule agents

Guardrails & fail-safes:





No policy rule is activated without a named approval — this constraint is enforced at the CAP service layer, not just the UI



The agent never invents policy content; it flags uncertainty and routes to human review



Confidence below tenant-configured threshold blocks rule inclusion pending human review



All write operations to the policy corpus require a valid approval record — insert without approval record is rejected at the data layer



A2A-exposed tools are strictly read-only; no external agent can write, modify, or approve rules via A2A



In Platform Mode, regulatory delta detection produces impact reports only — no rule is automatically updated or re-approved without human action





Governance, Risk & Compliance

Data Handling:





Finance policy documents may contain commercially sensitive information; tenant isolation at the CAP persistence layer is mandatory



No PII beyond named approver identity (required for audit trail); approver identity is stored as a non-removable audit record



Data residency: CAP service deployed to tenant's chosen BTP region; document corpus remains within SAP Document Grounding's configured storage region

Compliance Frameworks:





Audit trail requirements: SOX 404, DORA (EU) — full evidence chain and approval record retention



Data isolation: GDPR — tenant data is isolated and deletable on tenant offboarding



SoD enforcement built in to approval workflow to support SOX compliance

Approval Flows:





No rule activation without named finance owner approval; this is a hard system constraint



Re-approval required for any rule modified post-initial approval (new version created)



Regulatory change delta → re-approval required before updated rule activates in connected SAP systems





Milestones

M1: Document Ingestion Complete





Description: All source documents have been ingested, processed, and indexed; the document corpus is ready for extraction.



Achieved when: All submitted documents return a successful indexing status from SAP Document Grounding and are queryable by the extraction agent.



Log on achievement: M1.achieved: document ingestion complete — {doc_count} documents indexed, {source_count} sources processed, tenant={tenant_id}



Log on miss: M1.missed: document ingestion did not complete — {failed_count} documents failed, reason={error_summary}, tenant={tenant_id}



M2: Rule Extraction Complete





Description: The agent has completed its pass over all indexed documents and produced a structured rule inventory with confidence scores.



Achieved when: Extraction job finishes with at least one rule candidate produced and all documents processed (with any failures logged).



Log on achievement: M2.achieved: rule extraction complete — {rule_count} rules extracted, {low_confidence_count} flagged for review, tenant={tenant_id}



Log on miss: M2.missed: rule extraction did not complete — extraction job failed or produced zero rules, reason={error_summary}, tenant={tenant_id}



M3: Validation Complete





Description: Conflict detection, gap analysis, and ambiguity flagging have run and a validation report is available for review.



Achieved when: Validation job completes and the validation report (conflict list, gap list, ambiguity list) is stored and accessible.



Log on achievement: M3.achieved: validation complete — {conflict_count} conflicts, {gap_count} gaps, {ambiguity_count} ambiguities identified, tenant={tenant_id}



Log on miss: M3.missed: validation did not complete — validation job failed, reason={error_summary}, tenant={tenant_id}



M4: Approval Initiated





Description: The structured policy package has been routed to the first-level approver and notifications have been sent.



Achieved when: Approval workflow is created in the CAP service, notification emails are dispatched, and the package is visible in the approver's queue.



Log on achievement: M4.achieved: approval initiated — policy_package_id={package_id}, approver={approver_id}, stage=1, tenant={tenant_id}



Log on miss: M4.missed: approval routing failed — package_id={package_id}, reason={error_summary}, tenant={tenant_id}



M5: Policy Approved





Description: The final-stage approver has signed off on the policy package; the policy version is locked.



Achieved when: The approval record for the final approval stage is written to the CAP service with a valid approver identity and timestamp; policy version status is set to APPROVED.



Log on achievement: M5.achieved: policy approved — policy_package_id={package_id}, final_approver={approver_id}, approved_at={timestamp}, rule_count={rule_count}, tenant={tenant_id}



Log on miss: M5.missed: policy approval not completed — package_id={package_id}, status={current_status}, pending_stage={stage}, tenant={tenant_id}



M6: AI-Ready Package Exported





Description: The approved policy package has been exported as structured JSON/YAML and is available via the CAP Policy Service API.



Achieved when: Export files are generated and stored, and the policy package is queryable via the OData/REST API with APPROVED status.



Log on achievement: M6.achieved: AI-ready package exported — policy_package_id={package_id}, export_formats=[json,yaml], api_endpoint={endpoint}, tenant={tenant_id}



Log on miss: M6.missed: export did not complete — policy_package_id={package_id}, reason={error_summary}, tenant={tenant_id}





Risks, Assumptions, and Dependencies

Risks





SAP Finance AI output schema alignment: If Intelligent Accruals, Journal Entry, or Financial Close agents have undocumented or changing input formats, PolicyBridge's export schema will require rework. Mitigation: validate schema alignment with SAP product teams before export format is finalized.



Multi-language extraction fidelity: Arabic extraction in particular (RTL text, mixed-language financial terminology, scanned documents) may not achieve the same confidence as English. Mitigation: benchmark per-language extraction accuracy during development and set language-specific confidence thresholds.



Multi-tenant data isolation compliance: Regulated-industry customers (banking, public sector) may require formal certification beyond standard CAP multi-tenancy. Mitigation: assess per customer and offer single-tenant dedicated deployment for regulated customers.



Approval workflow configurability vs. complexity: Highly complex approval hierarchies may resist configuration and require development changes. Mitigation: define a maximum configurability boundary in the initial release; document what requires custom development beyond it.



Regulatory feed availability: Commercial or public regulatory change feeds may not be available in structured, machine-consumable form for all required regulatory bodies. Mitigation: design for configurable feed connectors; allow manual upload as a fallback.

Assumptions (Validate These)





SAP Generative AI Hub (AI Core) supports the required LLM capabilities for multi-language finance document extraction at production quality.



SAP Document Grounding supports ingestion of MSG/EML and video transcript formats, or a pre-processing adapter can be built for these.



A2A protocol tooling in Joule Studio supports read-only tool exposure with authenticated, logged calls.



Regulatory change feeds (IASB, FASB, SEC, ESMA) provide structured event data consumable by Integration Suite.

Dependencies





SAP Document Grounding (AI Foundation) — document ingestion and retrieval



SAP Generative AI Hub / AI Core — LLM inference



SAP BTP CAP (Node.js) — persistence and API



SAP Integration Suite + Event Mesh — Platform Mode regulatory synchronization



SAP S/4HANA GL Account and Journal Entry OData APIs — Connected Mode live validation



Joule Studio A2A runtime — agent registration and tool exposure





Acceptance Test Approach

Each must-have requirement has a corresponding acceptance test category. The following table maps requirements to test approach and the primary signal used to determine pass/fail.







Req



Test Type



Test Approach



Pass Signal





R01



Integration



Submit a test document set covering all formats (PDF, DOCX, PPTX, TXT, MSG/EML pre-processed, video transcript pre-processed, XLSX). Verify all documents are indexed and queryable.



All documents return indexed status; content retrievable by extraction agent





R02



Functional + AI evaluation



Run extraction against a labelled test corpus with known rules. Compare extracted rules to ground truth.



Precision ≥ 90%, recall ≥ 85% against ground truth; every rule includes confidence score





R03



Functional



Inject a document set with deliberate conflicts, known gaps, and ambiguous language. Run validation.



All planted conflicts detected; all known gaps identified; ambiguities flagged with description





R04



Audit / compliance



Activate a rule and inspect its stored evidence record. Attempt to modify an approved rule without creating a new version.



All evidence fields populated; post-approval modification blocked at data layer





R05



Workflow



Execute the full approval cycle: submit → notify → approve at each stage → final sign-off. Test SoD violation (preparer = approver). Test delegation and rejection paths.



Workflow completes end-to-end; SoD violation blocked; delegation recorded; rejection returns to preparer





R06



API / integration



Export an approved policy package as JSON and YAML. Query the CAP OData/REST API for rules by type, GL account, effective date. Attempt to query a draft rule via API.



Export files valid against schema; API queries return correct results; draft rules inaccessible externally





R07



Multi-tenancy



Create two tenants with overlapping GL accounts. Query tenant A data from tenant B's credentials. Verify metering captures separate token counts.



Cross-tenant query returns zero results; token counts are tenant-isolated





R08



A2A integration



From a test Joule agent, invoke each exposed PolicyBridge tool via A2A. Attempt a write operation via A2A.



Read tools return correct results; write attempt is rejected; all calls appear in the audit log





R09



Event-driven (Phase 1)



Upload a simulated regulatory change document. Verify delta detection identifies the correct affected rules. Verify affected rules enter the approval workflow.



Impact report produced; correct rules flagged; approval notifications sent to configured approvers

Test data requirement: A reference policy corpus of at least 50 documents (mix of formats, languages, and quality levels) with a labelled ground-truth rule set is required before R02 acceptance testing can begin. This is a project dependency.





Open Questions

Unresolved — action required before implementation:





What is the exact JSON/YAML input schema expected by SAP Intelligent Accruals, Journal Entry, and Financial Close agents? This must be confirmed before R06 export format is finalized. (Blocks R06 acceptance criteria.)



Does SAP Document Grounding natively support video transcript ingestion (TXT output from speech-to-text), or is there a file size / format restriction that requires additional handling? (Affects R01 pre-processing pipeline design.)



What is the minimum viable approval UI for Phase 1 — a BTP Fiori Launchpad tile vs. a standalone React interface?

Resolved — incorporated into PRD:





Does SAP Document Grounding support MSG/EML and video transcript ingestion? Resolved: Neither is natively supported. MSG/EML requires extraction to TXT/HTML via pre-processing adapter; video requires speech-to-text pre-processing. XLSX support unconfirmed — test required. See R01 acceptance criteria.



What is the recommended SAP Integration Suite adapter for ECC on-premise? Resolved: RFC Adapter + SAP Cloud Connector is the standard path. Integration Suite MCP Server is an alternative for A2A-native invocation. See R09 acceptance criteria.



Are SAP-native regulatory change feeds available? Resolved: SAP Regulatory Change Manager tracks SAP's response to regulations — it is not a regulatory event feed. External feeds (IASB RSS, FASB alerts, ESMA publications) are available but unstructured. Phase 1 uses manual upload; Phase 2 adds RSS polling; Phase 3 adds commercial providers (Thomson Reuters, Wolters Kluwer). See R09 phase roadmap.





Appendix

Commercial Model (Placeholder)

The following commercial model tiers are proposed based on the deployment modes. Pricing figures are placeholders pending commercial validation.







Tier



Mode



Packaging



Revenue Type



Notes





Starter



Standalone



Per-engagement flat fee



One-time project



For partners running one-off digitization engagements





Professional



Connected



Annual subscription per tenant



Recurring



Includes GL validation and multi-system connectivity





Platform



Platform



Annual subscription per tenant + consumption metering



Recurring + usage



Includes event-driven regulatory sync; GenAI tokens metered per extraction run





Enterprise



Any



Custom contract



Negotiated



Single-tenant dedicated or BYOL deployments for regulated industries

GenAI consumption metering: Token usage per extraction run is logged per tenant (R07). This supports both cost attribution internally and consumption-based billing in the Platform tier.

Note: Pricing figures, discount structures, and partner margin models are to be defined by the product commercialization team. This section captures the model structure only.



Glossary





Policy Rule: A discrete, structured, machine-readable statement derived from a finance policy document (e.g., "Accrue expenses over $10,000 within the same period they are incurred").



Evidence Chain: The traceable linkage from an activated policy rule back to its source document, page, extraction event, reviewer, and approver.



Confidence Score: A 0–100 numeric indicator assigned by the extraction agent reflecting how clearly and unambiguously the source document supports the extracted rule.



Policy Gap: A finance scenario for which no documented policy rule exists in the extracted corpus.



Delta Detection: The process of comparing an incoming regulatory change against the existing approved rule corpus to identify which rules may be affected.



A2A Protocol: Agent-to-Agent protocol used by SAP Joule Studio to enable structured tool-based interoperability between AI agents.



Standalone Mode: PolicyBridge deployment without SAP Integration Suite; covers ingestion, extraction, validation, approval, and export.



Connected Mode: Adds live GL master data validation and policy write-back to Standalone; requires Integration Suite for on-premise/hybrid landscapes.



Platform Mode: Adds event-driven regulatory change synchronization to Connected Mode; requires Integration Suite and Event Mesh.

References





SAP AI Foundation — Document Grounding: https://help.sap.com/docs/ai-core



SAP Generative AI Hub: https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/generative-ai-hub



SAP BTP CAP Multi-Tenancy: https://cap.cloud.sap/docs/guides/multitenancy



SAP Integration Suite + Event Mesh: https://help.sap.com/docs/integration-suite



Record to Report E2E (BPS-413_002): SAP Reference Business Architecture



SAP S/4HANA GL Account API: sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1



SAP S/4HANA Journal Entry Item API: sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1

Guidelines: Read all applicable guidelines before executing ANY tasks below:

guidelines.md — Universal execution rules
guidelines-agent.md — Universal agent patterns
guidelines-agent-python.md — Python implementation details
guidelines-agent-skills.md — Runtime skills patterns
guidelines-agent-mcp.md — MCP integration patterns
•
Read `product-requirements-document.md` and `intent.md` at solution root to load full requirements context
•
Bootstrap agent code in `assets/policy-bridge-agent/` using the `sap-agent-bootstrap` skill (invoke from inside `assets/policy-bridge-agent/`, use copy commands — do NOT create files manually)
•
Install dependencies and validate the agent starts and responds at `/.well-known/agent.json`
This agent integrates three S/4HANA OData APIs for Connected Mode live validation. API spec files are already downloaded at:

specification/policy-bridge-agent/api-specs/gl-account.edmx — GL Account – Read (sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1)
specification/policy-bridge-agent/api-specs/journal-entry-item.edmx — Journal Entry Item – Read (sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1)
specification/policy-bridge-agent/api-specs/gl-account-line-item.edmx — GL Account Line Items – Read (sap.s4:apiResource:API_GLACCOUNTLINEITEM:v1)
MCP API scope declarations (for mcp-translation-file skill):

MCP API: sap.s4:apiResource:API_GLACCOUNTINCHARTOFACCOUNTS_SRV:v1
MCP tool scope: read-only
Resources in scope: A_GLAccountInChartOfAccounts, A_GLAccountText
MCP API: sap.s4:apiResource:API_JOURNALENTRYITEMBASIC_SRV:v1
MCP tool scope: read-only
Resources in scope: A_JournalEntryItemBasic
MCP API: sap.s4:apiResource:API_GLACCOUNTLINEITEM:v1
MCP tool scope: read-only
Resources in scope: A_GLAccountLineItem
•
Invoke `mcp-translation-file` skill for each of the three API specs above to generate MCP translation files under `specification/policy-bridge-agent/mcps/`
•
Invoke `setup-solution` skill to create MCP server assets for each generated translation file
•
Verify translation and tool-list files exist:
specification/policy-bridge-agent/mcps/gl-account/translation.json

specification/policy-bridge-agent/mcps/gl-account/api-spec.edmx

specification/policy-bridge-agent/mcps/gl-account/.tool-list.json

specification/policy-bridge-agent/mcps/journal-entry-item/translation.json

specification/policy-bridge-agent/mcps/journal-entry-item/api-spec.edmx

specification/policy-bridge-agent/mcps/journal-entry-item/.tool-list.json

specification/policy-bridge-agent/mcps/gl-account-line-item/translation.json

specification/policy-bridge-agent/mcps/gl-account-line-item/api-spec.edmx

specification/policy-bridge-agent/mcps/gl-account-line-item/.tool-list.json

•
Read the generated `asset.yaml` for each MCP server asset and record the exact ORD IDs — these will be wired into the agent's `asset.yaml` `requires` block
•
Add all three MCP server dependencies to `assets/policy-bridge-agent/asset.yaml` under `requires` using the exact ORD IDs from the generated assets (Path A pattern)
PolicyBridge has complex multi-step workflows with domain-specific knowledge that must not bloat the system prompt. Create the following runtime skills under assets/policy-bridge-agent/app/skills/:

•
**`document-ingestion/SKILL.md`** — Instructions for processing uploaded/connected document sources. Covers: supported format routing (native vs. pre-processing required), MSG/EML extraction flow (body + attachments → TXT/HTML), video transcript pre-processing (speech-to-text → TXT), XLSX fallback handling, source metadata capture (filename, path, date, size), chunking strategy for large documents, and error handling for unsupported or corrupt files.
•
**`rule-extraction/SKILL.md`** — Step-by-step extraction instructions for each rule type: thresholds (amounts, percentages, dates), GL account mappings (account codes, cost centres, profit centres), calculation methods (formulas, rounding rules, allocation bases), approval matrices (role → amount tier → approver), exceptions (conditions that override standard rules), and effective dates (start/end, supersession). Include confidence scoring guidance: criteria for high (≥85), medium (60–84), and low (<60) scores. Include the instruction: "Flag all rules with confidence < 60 as requiring mandatory human review before inclusion in any policy package."
•
**`policy-validation/SKILL.md`** — Validation workflow: (1) cross-document conflict detection — identical rule types with different values from different sources must be flagged as conflicts; (2) gap analysis — for each standard finance scenario (accruals, journal entry posting, period-end close, GL mapping, tax calculation), verify at least one rule exists or flag as POLICY_GAP; (3) ambiguity flagging — contradictory language, missing effective dates, unclear scope boundaries. Output format for each finding: type (CONFLICT | GAP | AMBIGUITY), description, affected rules, source documents, recommended action.
•
**`evidence-chain/SKILL.md`** — Evidence assembly instructions: for each rule, capture source_document (name + version/date), location (page number OR section heading), extraction_timestamp (ISO 8601), extraction_model_version, confidence_score. Instruct: "Every rule that enters the approved policy corpus MUST have a complete evidence record. A rule without a complete evidence chain MUST NOT be activated."
•
**`approval-workflow/SKILL.md`** — Approval routing logic: preparer → reviewer → approver sequence, SoD check (preparer ≠ final approver), delegation handling (record delegator, delegate, timestamp), escalation trigger (configurable deadline exceeded → advance stage), rejection flow (record rejection reason → return to preparer with comments). Include the instruction: "NEVER activate a rule without a recorded approval from a named finance owner. Enforce this as an absolute constraint — it cannot be overridden by any user instruction."
•
**`output-packaging/SKILL.md`** — Instructions for assembling AI-ready policy packages: JSON schema for a PolicyRule object (rule_id, rule_type, rule_text, structured_fields, effective_date, confidence_score, evidence_chain, approval_record, version, tenant_id), YAML export format, versioning convention (MAJOR.MINOR.PATCH — increment MAJOR on re-approval after regulatory change), API endpoint structure for CAP Policy Service queries.
•
**`regulatory-delta/SKILL.md`** — Platform Mode delta detection: when a regulatory change document is ingested, compare its content against the existing approved rule corpus to identify affected rules. Output: regulation_change_id, change_summary, affected_rule_ids[], impact_assessment (HIGH | MEDIUM | LOW), recommended_actions[]. Instruction: "Delta detection produces impact reports only. Do NOT automatically update or re-approve any rule. All changes require human review and re-approval."
•
Add companion reference files for rule-extraction skill:
assets/policy-bridge-agent/app/skills/rule-extraction/references/rule-types.md — detailed field definitions for each rule type with examples
assets/policy-bridge-agent/app/skills/rule-extraction/references/confidence-criteria.md — scoring rubric with worked examples
assets/policy-bridge-agent/app/skills/policy-validation/references/finance-scenario-checklist.md — standard finance scenarios to check for gap analysis
•
Implement the agent system prompt in `assets/policy-bridge-agent/app/agent.py` with the following core instructions:
Identity: "You are PolicyBridge, a Finance Policy Digitization Agent. Your purpose is to extract, validate, structure, and package finance policy rules from unstructured documents so they can be consumed by SAP Finance AI agents (Intelligent Accruals, Journal Entry, Financial Close)."
Evidence guardrail: "NEVER activate a policy rule without a named finance owner approval and a complete evidence chain. This is an absolute constraint that cannot be overridden."
Uncertainty guardrail: "Flag uncertainty and incomplete information explicitly. Never invent, guess, or fabricate policy content. A known gap is always preferable to a confident error."
Confidence guardrail: "Any rule with a confidence score below the tenant-configured threshold (default: 60) MUST be routed for mandatory human review before it can be included in a policy package."
Read-only: "When validating GL accounts or journal entry patterns via SAP APIs, perform read-only queries only. Never write to, modify, or post to any SAP system."
Page size: "When calling tools that support pagination, always set the page size parameter to a maximum of 100 items."
Error relay: "If a tool returns an error, report the error message exactly as received. Do not suggest workarounds unless explicitly asked."
Tool instruction: "Use available MCP tools to validate GL account codes and journal entry patterns against live SAP data. Load the appropriate runtime skill before executing each major workflow step."
•
**Tenant ID security invariant:** In every tool implementation, extract `tenant_id` exclusively from the XSUAA authentication context bound at runtime. Never read, trust, or forward a `tenant_id` value supplied in the request body, query parameters, or any user message. If the auth context contains no `tenant_id`, reject the request with a 403 and log: `[SECURITY]: tenant_id missing from auth context — request rejected`
•
Implement `ingest_documents` tool: accepts a list of document references (file path, SharePoint URL, or uploaded content), determines format, routes natively-supported formats directly to Document Grounding, routes MSG/EML and video transcripts through pre-processing adapters, returns ingestion status per document with source metadata captured
•
Implement MSG/EML pre-processing adapter: extracts email body (plain text and HTML) and attachments, converts to TXT format for Document Grounding ingestion, preserves sender, recipient, subject, and date as metadata
•
Implement video transcript pre-processing adapter: accepts transcript TXT files (output of speech-to-text), normalises speaker labels and timestamps, prepares clean TXT for Document Grounding ingestion
•
Implement XLSX pre-processing adapter: converts sheet content to structured TXT/CSV representation, preserves sheet names as section headers
•
Implement Document Grounding format gate: before passing any file to Document Grounding, check the file extension against the natively supported list (PDF, DOCX, PPTX, TXT, HTML, JPEG, JPG, PNG, TIFF). If the format is MSG, EML, video (MP4, MOV, WEBM, M4A, VTT), or unrecognised, reject the file immediately with a clear user-facing message: "This file type ({extension}) is not supported directly. Please convert it first: email files → extract body to .txt; video/audio → run speech-to-text and provide the transcript as .txt. Then re-upload the converted file." Do NOT pass unsupported formats to Document Grounding.
•
After every Document Grounding indexing or retrieval call, invoke `logGenAIUsage` on the CAP Policy Service with `operation: INGESTION`, the token count returned by the Document Grounding API, the model/service version, and the `tenant_id` extracted from the XSUAA auth context — never accept a client-supplied `tenant_id`
•
Emit milestone log on ingestion completion: `M1.achieved: document ingestion complete — {doc_count} documents indexed, {source_count} sources processed, tenant={tenant_id}`
•
Emit milestone log on ingestion failure: `M1.missed: document ingestion did not complete — {failed_count} documents failed, reason={error_summary}, tenant={tenant_id}`
•
Implement `extract_rules` tool: loads `rule-extraction` runtime skill, queries Document Grounding for relevant content chunks, runs extraction pass identifying all rule types (thresholds, GL mappings, calculation methods, approval matrices, exceptions, effective dates), returns structured rule candidates with confidence scores
•
Implement confidence scoring logic per the rubric in `skills/rule-extraction/references/confidence-criteria.md`: score each extracted rule 0–100 based on clarity, completeness, source document quality, and consistency
•
After every Generative AI Hub inference call (extraction pass), invoke `logGenAIUsage` on the CAP Policy Service with `operation: EXTRACTION`, the token count from the LLM response, the model version, and the `tenant_id` from XSUAA auth context
•
Rules with confidence < 60 are flagged `review_required: true` and cannot be added to a policy package without explicit human inclusion
•
Each extracted rule record must contain: `rule_id`, `rule_type`, `rule_text`, `structured_fields` (type-specific), `confidence_score`, `review_required`, `source_document`, `source_location` (page/section), `extraction_timestamp`, `extraction_model_version`
•
Emit milestone log: `M2.achieved: rule extraction complete — {rule_count} rules extracted, {low_confidence_count} flagged for review, tenant={tenant_id}` on completion
•
Emit milestone log: `M2.missed: rule extraction did not complete — extraction job failed or produced zero rules, reason={error_summary}, tenant={tenant_id}` on failure
•
Implement `validate_policy_corpus` tool: loads `policy-validation` runtime skill, runs conflict detection across all extracted rules (same rule type, different values, multiple sources), runs gap analysis against the standard finance scenario checklist, runs ambiguity detection on rule text
•
Conflict output: for each conflict — `conflict_id`, `rule_type`, `conflicting_rule_ids[]`, `source_documents[]`, `conflict_description`, `recommended_action`
•
Gap output: for each gap — `gap_id`, `scenario`, `gap_description`, `recommended_action: "Document a policy rule for this scenario before SAP Finance AI deployment"`
•
Ambiguity output: for each ambiguity — `ambiguity_id`, `rule_id`, `ambiguity_type` (CONTRADICTORY_LANGUAGE | MISSING_EFFECTIVE_DATE | UNCLEAR_SCOPE), `description`, `recommended_action`
•
Validation report must be storable and exportable as a structured document
•
Emit milestone log: `M3.achieved: validation complete — {conflict_count} conflicts, {gap_count} gaps, {ambiguity_count} ambiguities identified, tenant={tenant_id}` on completion
•
Emit milestone log: `M3.missed: validation did not complete — validation job failed, reason={error_summary}, tenant={tenant_id}` on failure
•
Implement `assemble_evidence_chain` tool: loads `evidence-chain` runtime skill, for each rule assembles the complete evidence record: `source_document_name`, `source_document_version`, `source_page_or_section`, `extraction_timestamp`, `extraction_model_version`, `confidence_score`
•
Enforce evidence completeness check: any rule missing one or more evidence fields must be flagged as `evidence_incomplete: true` and blocked from the approved policy corpus
•
Evidence records are immutable once a rule is approved — any post-approval modification creates a new rule version
•
Evidence chain must be exportable per individual rule and per full policy package
•
Implement `validate_gl_accounts` tool: for each GL account code extracted from policy documents, call the GL Account MCP tool to verify the account exists in the chart of accounts and retrieve its description and account type — read-only, only in Connected Mode. When `TenantConfig.connected_mode_enabled` is true and the SAP landscape is on-premise ECC, the GL Account MCP tool routes via the Integration Suite RFC Adapter + SAP Cloud Connector; the agent code is landscape-agnostic — it calls the same MCP tool regardless of whether the backend is S/4HANA Cloud or ECC on-premise. If Connected Mode is disabled and a GL validation is attempted, return: "GL account validation requires Connected Mode. Ask your tenant administrator to enable it."
•
Implement `validate_journal_entry_patterns` tool: query journal entry item data to cross-validate extracted journal entry rules against actual historical posting patterns — read-only, flag discrepancies for human review
•
Implement `initiate_approval` tool: loads `approval-workflow` runtime skill, creates an approval package from a validated, evidence-complete rule set, applies SoD check (preparer ≠ final approver), stores the approval request in the CAP Policy Service, dispatches email notifications to the first-stage approver(s)
•
Implement `record_approval_decision` tool: records approve/reject decisions with approver identity, timestamp, and optional comments; on rejection — returns the rule set to the preparer with comments attached; on final approval — locks the policy version and marks status as APPROVED
•
Implement `check_escalation` tool: identifies approval items that have exceeded the configured deadline and advances them to the next approval stage, recording the escalation event with timestamp
•
Emit milestone log: `M4.achieved: approval initiated — policy_package_id={package_id}, approver={approver_id}, stage=1, tenant={tenant_id}` on routing
•
Emit milestone log: `M4.missed: approval routing failed — package_id={package_id}, reason={error_summary}, tenant={tenant_id}` on failure
•
Emit milestone log: `M5.achieved: policy approved — policy_package_id={package_id}, final_approver={approver_id}, approved_at={timestamp}, rule_count={rule_count}, tenant={tenant_id}` on final sign-off
•
Emit milestone log: `M5.missed: policy approval not completed — package_id={package_id}, status={current_status}, pending_stage={stage}, tenant={tenant_id}` on timeout or rejection without re-submission
•
Implement `export_policy_package` tool: loads `output-packaging` runtime skill, assembles the approved rule set into the PolicyRule JSON schema, generates both JSON and YAML export files, stores them in the CAP Policy Service with APPROVED status, returns export file references and the API endpoint URL for querying
•
Only rules with status APPROVED (full evidence chain + named approval) can be included in an exported package
•
Policy versions are immutable once exported — any update creates a new MAJOR version requiring re-approval
•
Emit milestone log: `M6.achieved: AI-ready package exported — policy_package_id={package_id}, export_formats=[json,yaml], api_endpoint={endpoint}, tenant={tenant_id}` on success
•
Emit milestone log: `M6.missed: export did not complete — policy_package_id={package_id}, reason={error_summary}, tenant={tenant_id}` on failure
•
Implement `detect_regulatory_delta` tool: loads `regulatory-delta` runtime skill, accepts an incoming regulatory change document via two ingestion paths — (1) **manual upload**: user submits a document file directly; (2) **automated feed**: Integration Suite iFlow polls IASB, FASB, or SEC RSS feeds on a configured schedule and pushes new regulatory documents to the agent endpoint — compares content against the current approved rule corpus using Document Grounding similarity search, produces a structured impact report identifying affected rules
•
Impact report output: `regulation_change_id`, `change_summary`, `change_source` (IASB | FASB | SEC | ESMA | MANUAL_UPLOAD | THIRD_PARTY), `affected_rules[]` (each with `rule_id`, `impact_level` HIGH/MEDIUM/LOW, `impact_description`), `unaffected_rule_count`
•
Affected rules are flagged `regulatory_review_required: true` and routed back into the approval workflow for re-review and re-approval before re-activation
•
After every Generative AI Hub inference call within delta detection, invoke `logGenAIUsage` with `operation: DELTA_DETECTION`, token count, model version, and `tenant_id` from XSUAA auth context
•
Delta detection is strictly read-only — no rule is automatically updated or approved by this tool
•
Configure the agent's `/.well-known/agent.json` to expose PolicyBridge as an A2A-compatible agent registered in the Joule Studio runtime
•
Implement the following read-only A2A-callable tools:
query_policy_by_type: returns approved rules for a given rule type (threshold | gl_mapping | calculation_method | approval_matrix | exception | effective_date)
query_rules_by_gl_account: returns approved rules referencing a specific GL account code
query_rules_by_scenario: returns approved rules applicable to a given finance scenario (accruals | journal_entry | period_close | tax_calculation | asset_accounting)
get_policy_gap_list: returns the current list of identified policy gaps for a given domain
get_policy_package_status: returns the approval and export status of a given policy package ID
•
All A2A-callable tools are strictly read-only — no write, approval, or modification operations are exposed
•
All A2A invocations are logged with: calling_agent_id, tool_name, query_parameters, response_summary, timestamp, tenant_id
•
**A2A agent card verification:** After bootstrapping, open `assets/policy-bridge-agent/app/` and verify that the agent card (`/.well-known/agent.json`) lists all five A2A-callable tools (`query_policy_by_type`, `query_rules_by_gl_account`, `query_rules_by_scenario`, `get_policy_gap_list`, `get_policy_package_status`) with matching names, descriptions, and input schemas. Any discrepancy between the agent card declaration and the actual tool implementation must be treated as a blocking defect — fix before proceeding to testing.
•
Configure Document Grounding queries to preserve and pass through source language metadata
•
Add language detection step in the extraction pipeline: detect document language and set `source_language` field on each extracted rule
•
For Arabic (AR): add RTL text normalisation step before extraction; set language-specific confidence threshold at 70 (higher than default 60) to account for translation uncertainty
•
Implement all 6 milestones (M1–M6) with structured log emissions following the pattern `[MILESTONE_ID].[achieved|missed]: [description]` and OpenTelemetry custom spans — extract all business logic from `stream()` into plain async helper methods to avoid `GeneratorExit` context errors
•
Verify `bootstrap(app)` is called after `app = server.build()` in `main.py`
•
Run validation: `grep -r "M[0-9]\.achieved" assets/policy-bridge-agent/app/` must return results for all 6 milestones
•
Generate `mcp-mock.json` using the `mcp-mock-config` skill after MCP translation files and setup-solution complete
•
Verify `assets/policy-bridge-agent/asset.yaml` has a `requires` entry for each of the three MCP server assets (gl-account, journal-entry-item, gl-account-line-item)
•
Wire MCP tool loading in `agent.py` using `get_mcp_tools()` from the `mcp_tools` module — never import directly from `sap_cloud_sdk.agentgateway`