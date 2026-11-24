name: Maître d'Œuvre

# Projet Québec: Construction Project Delivery Agent - Technical Context

> **Document Type**: Technical Context & Architecture Reference
> **Project ID**: MCPH-002-QC
> **Version**: 2.0
> **Last Updated**: November 8, 2026
> **Classification**: Internal / Partner Technical

---

## Executive Technical Summary

The Quebec Construction Agent is a **multi-agent orchestration platform** purpose-built for Quebec's construction industry, addressing the regulatory, linguistic, and operational complexities that SAP's standard offerings do not cover. This document defines the complete technical architecture spanning SAP landscape integration (ECC through S/4HANA Public Cloud), agent protocols (A2A, MCP), document intelligence, mobile delivery, and multi-tenant SaaS operations.

**Core Technical Thesis**: Construction project delivery requires tight integration between financial systems (SAP), field operations (mobile), regulatory compliance (CCQ/CNESST), and document workflows (contracts, change orders, lien waivers). No single SAP module addresses this end-to-end. Our agent platform orchestrates across these boundaries using SAP's native agent infrastructure (Joule, A2A) while extending into territory SAP won't prioritize.

---

## 1. SAP Landscape Compatibility Matrix

### 1.1 Supported SAP Backends

| SAP Edition | Version Range | Integration Method | Feature Parity | Notes |
|-------------|---------------|-------------------|----------------|-------|
| **SAP S/4HANA Public Cloud** | 2402+ | SAP Integration Suite + Event Mesh | 100% | Full A2A native, recommended |
| **SAP S/4HANA Private Cloud (PCE)** | 2021+ | Integration Suite or Direct OData | 100% | Requires Cloud Connector for on-prem data |
| **SAP S/4HANA On-Premise** | 1909–2023 | Cloud Connector + OData/RFC | 95% | Some Event Mesh features limited |
| **SAP ECC 6.0** | EHP 5–8 | Cloud Connector + RFC/BAPI/IDoc | 85% | No native A2A; requires adapter agents |
| **SAP Business One** | 10.0+ | Service Layer REST API | 60% | Limited PS functionality; SMB only |

### 1.2 ECC-Specific Considerations

SAP ECC remains dominant in Quebec construction (estimated 60%+ of SAP-using contractors). Our architecture must handle:

| ECC Challenge | Solution Approach |
|---------------|-------------------|
| **No OData by default** | Deploy SAP Gateway on ECC or use RFC-to-REST bridge via Integration Suite |
| **No Event Mesh** | Polling-based sync with configurable intervals; IDoc listeners for real-time where available |
| **No A2A runtime** | ECC Adapter Agent runs on BTP, translates A2A calls to RFC/BAPI sequences |
| **Custom tables (Z*)** | Discovery tool scans for construction-specific customizations; maps to canonical model |
| **Older PS module** | Support both classic PS (CN* transactions) and cProjects if deployed |

### 1.3 Module Dependencies by SAP Backend

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        SAP MODULE INTEGRATION MAP                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  S/4HANA Public Cloud                    ECC 6.0                                │
│  ┌─────────────────────────┐            ┌─────────────────────────┐             │
│  │ SAP S/4HANA for Projects│            │ Project System (PS)     │             │
│  │ (S4CPJ)                 │◄──────────►│ CN*, CJ*, KO* T-codes   │             │
│  └───────────┬─────────────┘            └───────────┬─────────────┘             │
│              │                                      │                            │
│  ┌───────────▼─────────────┐            ┌───────────▼─────────────┐             │
│  │ Materials Management    │            │ Materials Management    │             │
│  │ (MM - S4M)              │            │ (MM - ME*, MB* T-codes) │             │
│  └───────────┬─────────────┘            └───────────┬─────────────┘             │
│              │                                      │                            │
│  ┌───────────▼─────────────┐            ┌───────────▼─────────────┐             │
│  │ Financial Accounting    │            │ Financial Accounting    │             │
│  │ (FI - S4F)              │            │ (FI - FB*, F-* T-codes) │             │
│  └───────────┬─────────────┘            └───────────┬─────────────┘             │
│              │                                      │                            │
│  ┌───────────▼─────────────┐            ┌───────────▼─────────────┐             │
│  │ Controlling             │            │ Controlling             │             │
│  │ (CO - S4CO)             │            │ (CO - KS*, KP* T-codes) │             │
│  └─────────────────────────┘            └─────────────────────────┘             │
│                                                                                  │
│  ┌─────────────────────────┐            ┌─────────────────────────┐             │
│  │ Plant Maintenance       │            │ Plant Maintenance       │             │
│  │ (PM - S4PM)             │            │ (PM - IW*, IE* T-codes) │             │
│  │ [Equipment tracking]    │            │ [Equipment tracking]    │             │
│  └─────────────────────────┘            └─────────────────────────┘             │
│                                                                                  │
│  ┌─────────────────────────┐            ┌─────────────────────────┐             │
│  │ Human Capital Mgmt      │            │ Human Resources         │             │
│  │ (SuccessFactors EC/ECP) │            │ (HCM - PA*, PB* T-codes)│             │
│  │ [CCQ workforce data]    │            │ [CCQ workforce data]    │             │
│  └─────────────────────────┘            └─────────────────────────┘             │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Required SAP APIs by Module

| Module | S/4HANA API | ECC Equivalent | Purpose |
|--------|-------------|----------------|---------|
| **Project System** | `API_PROJECT_V2` | `BAPI_PROJECT_*`, `BAPI_PS_*` | Project structure, WBS, networks |
| **Billing** | `API_BILLING_DOCUMENT_SRV` | `BAPI_BILLINGDOC_*` | Progress billing, invoices |
| **Purchase Orders** | `API_PURCHASEORDER_PROCESS_SRV` | `BAPI_PO_*` | Subcontractor POs |
| **Goods Receipt** | `API_MATERIAL_DOCUMENT_SRV` | `BAPI_GOODSMVT_*` | Material receipts on site |
| **Cost Elements** | `API_COSTCENTER_SRV` | `BAPI_COSTCENTER_*` | Cost tracking by WBS |
| **Workforce** | SuccessFactors EC OData | `BAPI_EMPLOYEE_*` | CCQ-compliant worker data |
| **Equipment** | `API_EQUIPMENT_SRV` | `BAPI_EQUI_*` | Construction equipment tracking |
| **Vendor Master** | `API_BUSINESS_PARTNER` | `BAPI_VENDOR_*` | Subcontractor master data |

---

## 2. Agent Architecture

### 2.1 Multi-Agent Topology

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     PROJET QUÉBEC AGENT ORCHESTRATION                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│                         ┌───────────────────────┐                               │
│                         │   JOULE WORK ZONE     │                               │
│                         │  (SAP Fiori Launchpad │                               │
│                         │   or Mobile App)      │                               │
│                         └───────────┬───────────┘                               │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                    CONSTRUCTION ORCHESTRATOR AGENT                        │   │
│  │  • Intent classification (FR/EN)     • Agent routing                     │   │
│  │  • Context assembly                  • Response synthesis                │   │
│  │  • Conversation state management     • Bilingual output generation       │   │
│  │  Model: claude-sonnet-4-20250514 via SAP GenAI Hub                             │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│         ┌───────────────────────────┼───────────────────────────┐               │
│         │                           │                           │               │
│         ▼                           ▼                           ▼               │
│  ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐         │
│  │ BILLING AGENT   │      │ CHANGE ORDER    │      │ COMPLIANCE      │         │
│  │                 │      │ AGENT           │      │ AGENT           │         │
│  │ • Progress apps │      │ • Scope analysis│      │ • CCQ validation│         │
│  │ • Holdback calc │      │ • Cost impact   │      │ • CNESST safety │         │
│  │ • AIA G702/G703 │      │ • Schedule delta│      │ • Insurance exp │         │
│  │ • Retainage     │      │ • Client notify │      │ • Lien waivers  │         │
│  └────────┬────────┘      └────────┬────────┘      └────────┬────────┘         │
│           │                        │                        │                   │
│         ▼                           ▼                           ▼               │
│  ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐         │
│  │ SUBCONTRACTOR   │      │ DOCUMENT        │      │ WORKFORCE       │         │
│  │ AGENT           │      │ INTELLIGENCE    │      │ AGENT           │         │
│  │                 │      │ AGENT           │      │                 │         │
│  │ • Prequalify    │      │ • Contract OCR  │      │ • CCQ cards     │         │
│  │ • Performance   │      │ • CO extraction │      │ • Training hrs  │         │
│  │ • Payment apps  │      │ • Lien release  │      │ • Union dues    │         │
│  │ • Disputes      │      │ • RFI/Submittal │      │ • Scheduling    │         │
│  └────────┬────────┘      └────────┬────────┘      └────────┬────────┘         │
│           │                        │                        │                   │
│           └────────────────────────┼────────────────────────┘                   │
│                                    │                                            │
│                                    ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                         MCP SERVER LAYER                                  │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │   │
│  │  │ SAP PS MCP  │ │ SAP FI MCP  │ │ SAP MM MCP  │ │ SAP HCM MCP │        │   │
│  │  │ Server      │ │ Server      │ │ Server      │ │ Server      │        │   │
│  │  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘        │   │
│  │         │               │               │               │                │   │
│  │  ┌──────┴───────────────┴───────────────┴───────────────┴──────┐        │   │
│  │  │              SAP Integration Suite / Cloud Connector         │        │   │
│  │  └──────────────────────────────┬───────────────────────────────┘        │   │
│  └─────────────────────────────────┼────────────────────────────────────────┘   │
│                                    │                                            │
│                                    ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │   SAP S/4HANA (Public/Private/On-Prem) │ SAP ECC 6.0 │ SuccessFactors   │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Agent Specifications

#### 2.2.1 Construction Orchestrator Agent (Primary)

| Attribute | Specification |
|-----------|---------------|
| **Agent ID** | `qc-construction-orchestrator` |
| **Runtime** | SAP AI Core (Joule Studio) |
| **Model** | `claude-sonnet-4-20250514` via SAP GenAI Hub |
| **Summarization Model** | `claude-haiku-3` for context compression |
| **Languages** | French (primary), English (secondary) |
| **A2A Compliant** | Yes - publishes agent card at `/.well-known/agent.json` |
| **Context Window** | 200K tokens (Claude); uses summarization middleware |
| **State Management** | LangGraph checkpointer → SAP HANA Cloud |

**Orchestrator Responsibilities**:
1. **Intent Classification**: Determines which specialist agent handles the request
2. **Language Detection**: Routes to FR/EN response templates
3. **Context Assembly**: Gathers project context from SAP before agent invocation
4. **Multi-Turn Conversation**: Maintains dialog state across turns
5. **Response Synthesis**: Combines specialist outputs into coherent response

#### 2.2.2 Progress Billing Agent

| Attribute | Specification |
|-----------|---------------|
| **Agent ID** | `qc-progress-billing-agent` |
| **Primary MCP Servers** | `sap-ps-mcp`, `sap-fi-mcp` |
| **Document Output** | AIA G702/G703, CCDC 9A (Canadian standard) |
| **Calculations** | Quebec holdback (10%), GST/QST split, retention release |

**Tools (MCP)**:
- `get_project_budget` - Retrieve WBS budget from PS
- `get_completed_work` - Calculate % complete by cost code
- `calculate_holdback` - Apply Quebec Civil Code 10% retention
- `generate_progress_certificate` - Create AIA G702 or CCDC 9A
- `apply_change_orders` - Adjust contract value for approved COs
- `submit_billing_document` - Post to SAP FI

#### 2.2.3 Change Order Agent

| Attribute | Specification |
|-----------|---------------|
| **Agent ID** | `qc-change-order-agent` |
| **Primary MCP Servers** | `sap-ps-mcp`, `sap-mm-mcp`, `document-ai-mcp` |
| **Document Input** | Scanned change order requests (PDF/image) |
| **Analysis** | Cost impact, schedule impact, margin impact |

**Tools (MCP)**:
- `extract_change_order` - OCR + extraction from scanned CO (Document AI)
- `estimate_material_cost` - Price lookup from MM
- `estimate_labor_cost` - Hours × CCQ rates by trade
- `calculate_schedule_impact` - Network analysis in PS
- `generate_co_proposal` - Bilingual CO document
- `route_for_approval` - SAP workflow integration

#### 2.2.4 Compliance Agent

| Attribute | Specification |
|-----------|---------------|
| **Agent ID** | `qc-compliance-agent` |
| **Primary MCP Servers** | `ccq-api-mcp`, `cnesst-api-mcp`, `sap-hcm-mcp` |
| **External APIs** | CCQ web services, CNESST employer portal |
| **Validations** | Worker cards, training, insurance, safety |

**Tools (MCP)**:
- `validate_ccq_card` - Check worker competency card status
- `check_training_requirements` - Required courses by trade
- `calculate_union_dues` - CCQ contribution calculations
- `verify_cnesst_compliance` - Safety training verification
- `check_insurance_status` - Subcontractor insurance expiry
- `generate_compliance_report` - Regulatory submission package

#### 2.2.5 Document Intelligence Agent

| Attribute | Specification |
|-----------|---------------|
| **Agent ID** | `qc-document-intelligence-agent` |
| **Primary MCP Servers** | `document-ai-mcp`, `sap-dms-mcp` |
| **Extraction Engine** | SAP Document AI Premium (primary) or LlamaExtract (fallback) |
| **Document Types** | Contracts, COs, lien waivers, RFIs, submittals, CCQ cards |

**Document AI vs LlamaExtract Decision Matrix**:

| Factor | SAP Document AI Premium | LlamaExtract |
|--------|------------------------|--------------|
| **SAP Integration** | Native BTP service | Requires custom adapter |
| **Pre-built Extractors** | Invoice, PO, delivery note | General-purpose |
| **Construction-Specific** | Needs custom training | Needs custom training |
| **French Language** | Supported | Supported |
| **Handwritten Text** | Premium feature | Limited |
| **Cost Model** | Per-page ($0.05-0.10) | Per-page ($0.01-0.03) |
| **Compliance** | SOC 2, ISO 27001 | SOC 2 |
| **Recommendation** | Primary for SAP-bound docs | Fallback for cost-sensitive |

**Hybrid Strategy**:
- **SAP Document AI Premium**: Contracts, change orders, AIA forms (high-value, legal weight)
- **LlamaExtract**: RFIs, daily reports, photos with text (high-volume, lower stakes)

#### 2.2.6 Subcontractor Agent

| Attribute | Specification |
|-----------|---------------|
| **Agent ID** | `qc-subcontractor-agent` |
| **Primary MCP Servers** | `sap-mm-mcp`, `sap-bp-mcp`, `compliance-mcp` |
| **Portal** | Self-service subcontractor portal (UI5) |
| **Integrations** | Insurance APIs, credit bureaus, CCQ |

**Tools (MCP)**:
- `prequalify_subcontractor` - Run qualification checklist
- `check_bonding_capacity` - Verify bonding availability
- `track_performance_metrics` - Historical delivery, quality, safety
- `process_payment_application` - Sub payment request workflow
- `generate_lien_waiver` - Conditional/unconditional waivers
- `manage_backcharges` - Deficiency tracking and deductions

#### 2.2.7 Workforce Agent

| Attribute | Specification |
|-----------|---------------|
| **Agent ID** | `qc-workforce-agent` |
| **Primary MCP Servers** | `sap-hcm-mcp`, `ccq-api-mcp`, `sf-ec-mcp` |
| **Data Sources** | SuccessFactors EC, SAP HCM, CCQ web services |
| **Mobile** | Worker time entry, safety check-in |

**Tools (MCP)**:
- `validate_worker_for_site` - CCQ card + safety training check
- `record_time_entry` - Hours by project/cost code
- `calculate_ccq_contributions` - Union dues, training fund
- `schedule_workforce` - Skill-based assignment
- `track_training_expiry` - Certification renewal alerts
- `generate_ccq_report` - Monthly regulatory submission

---

## 3. A2A Protocol Implementation

### 3.1 Agent Card Specification

Each agent publishes a discoverable agent card per the A2A protocol:

```json
{
  "name": "Projet Québec Construction Orchestrator",
  "description": "Orchestrates construction project delivery for Quebec contractors, handling progress billing, change orders, compliance, and subcontractor management in French and English.",
  "url": "https://qc-construction.sap-partner.cloud/api/agent",
  "version": "2.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true,
    "stateTransitionHistory": true
  },
  "authentication": {
    "schemes": ["oauth2", "apiKey"],
    "oauth2": {
      "authorizationUrl": "https://auth.sap-partner.cloud/oauth/authorize",
      "tokenUrl": "https://auth.sap-partner.cloud/oauth/token",
      "scopes": ["construction.read", "construction.write", "compliance.read"]
    }
  },
  "defaultInputModes": ["text", "file"],
  "defaultOutputModes": ["text", "file"],
  "skills": [
    {
      "id": "progress-billing",
      "name": "Progress Billing",
      "description": "Generate AIA G702/G703 or CCDC 9A progress billing applications",
      "tags": ["billing", "construction", "AIA", "CCDC"],
      "examples": [
        "Generate progress billing for Project 1234",
        "Préparer la demande de paiement pour le projet Centre-Ville"
      ]
    },
    {
      "id": "change-order-analysis",
      "name": "Change Order Analysis",
      "description": "Analyze change order impact on cost, schedule, and margin",
      "tags": ["change-order", "cost", "schedule"],
      "examples": [
        "Analyze the cost impact of adding 50 outlets to Phase 2",
        "Analyser l'impact du changement de fenêtres sur le budget"
      ]
    },
    {
      "id": "ccq-compliance",
      "name": "CCQ Compliance Check",
      "description": "Validate worker qualifications per CCQ regulations",
      "tags": ["compliance", "CCQ", "workforce"],
      "examples": [
        "Check if worker 12345 can work as an electrician",
        "Vérifier les cartes de compétence pour le chantier Laval"
      ]
    },
    {
      "id": "subcontractor-management",
      "name": "Subcontractor Management",
      "description": "Prequalify, track, and manage subcontractor relationships",
      "tags": ["subcontractor", "vendor", "compliance"],
      "examples": [
        "Prequalify ABC Electric for the hospital project",
        "Générer une quittance pour le sous-traitant Plomberie XYZ"
      ]
    }
  ],
  "localization": {
    "supportedLanguages": ["fr-CA", "en-CA"],
    "defaultLanguage": "fr-CA"
  }
}
```

### 3.2 A2A Message Flow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           A2A PROTOCOL FLOW                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  1. DISCOVERY                                                                    │
│  ┌──────────────┐         GET /.well-known/agent.json         ┌──────────────┐  │
│  │ Joule Work   │ ─────────────────────────────────────────► │ QC Constr.   │  │
│  │ Zone         │ ◄───────────────────────────────────────── │ Orchestrator │  │
│  └──────────────┘         Agent Card Response                 └──────────────┘  │
│                                                                                  │
│  2. TASK INITIATION                                                              │
│  ┌──────────────┐         POST /tasks/send                    ┌──────────────┐  │
│  │ Joule Work   │ ─────────────────────────────────────────► │ QC Constr.   │  │
│  │ Zone         │         {                                   │ Orchestrator │  │
│  │              │           "message": {                      │              │  │
│  │              │             "role": "user",                 │              │  │
│  │              │             "parts": [{                     │              │  │
│  │              │               "text": "Préparer la          │              │  │
│  │              │                 facturation pour P-2024-15" │              │  │
│  │              │             }]                              │              │  │
│  │              │           }                                 │              │  │
│  │              │         }                                   │              │  │
│  └──────────────┘                                             └──────────────┘  │
│                                                                                  │
│  3. STREAMING RESPONSE                                                           │
│  ┌──────────────┐         SSE: tasks/sendSubscribe            ┌──────────────┐  │
│  │ Joule Work   │ ◄───────────────────────────────────────── │ QC Constr.   │  │
│  │ Zone         │         event: message                      │ Orchestrator │  │
│  │              │         data: {"parts": [{"text": "..."}]}  │              │  │
│  │              │         ...                                 │              │  │
│  │              │         event: message                      │              │  │
│  │              │         data: {"parts": [{"file": {...}}]}  │              │  │
│  └──────────────┘                                             └──────────────┘  │
│                                                                                  │
│  4. TASK COMPLETION                                                              │
│  ┌──────────────┐         Final message with status           ┌──────────────┐  │
│  │ Joule Work   │ ◄───────────────────────────────────────── │ QC Constr.   │  │
│  │ Zone         │         {                                   │ Orchestrator │  │
│  │              │           "status": {                       │              │  │
│  │              │             "state": "completed"            │              │  │
│  │              │           },                                │              │  │
│  │              │           "artifacts": [{                   │              │  │
│  │              │             "name": "G702-P2024-15.pdf"     │              │  │
│  │              │           }]                                │              │  │
│  │              │         }                                   │              │  │
│  └──────────────┘                                             └──────────────┘  │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Inter-Agent Communication (Agent-to-Agent)

The orchestrator delegates to specialist agents using A2A:

```python
# Orchestrator delegating to Billing Agent
async def delegate_to_billing_agent(context: AgentContext, request: BillingRequest):
    billing_agent = await discover_agent("qc-progress-billing-agent")

    task = await billing_agent.send_task(
        message=Message(
            role="user",
            parts=[
                TextPart(text=f"Generate progress billing for project {request.project_id}"),
                DataPart(data=request.model_dump())
            ]
        ),
        metadata={
            "parent_task_id": context.task_id,
            "language": context.detected_language,
            "tenant_id": context.tenant_id
        }
    )

    async for event in billing_agent.subscribe(task.id):
        if event.type == "artifact":
            yield event.artifact
        elif event.status.state == "completed":
            return event.result
```

---

## 4. MCP Server Architecture

### 4.1 MCP Server Registry

| MCP Server | Purpose | SAP APIs Wrapped | Tools Count |
|------------|---------|------------------|-------------|
| `sap-ps-mcp` | Project System operations | `API_PROJECT_V2`, `BAPI_PROJECT_*` | 18 |
| `sap-fi-mcp` | Financial postings, billing | `API_BILLING_DOCUMENT_SRV`, `BAPI_ACC_*` | 14 |
| `sap-mm-mcp` | Materials, procurement | `API_PURCHASEORDER_*`, `BAPI_PO_*` | 16 |
| `sap-hcm-mcp` | Workforce, time management | SuccessFactors EC, `BAPI_EMPLOYEE_*` | 12 |
| `sap-pm-mcp` | Equipment management | `API_EQUIPMENT_SRV`, `BAPI_EQUI_*` | 8 |
| `sap-bp-mcp` | Business partners (subs) | `API_BUSINESS_PARTNER`, `BAPI_VENDOR_*` | 10 |
| `document-ai-mcp` | Document extraction | SAP Document AI Premium API | 6 |
| `ccq-api-mcp` | CCQ compliance services | CCQ web services | 8 |
| `cnesst-api-mcp` | CNESST safety services | CNESST employer portal API | 5 |
| `storage-mcp` | Document storage | SAP Document Management, S3 | 4 |

### 4.2 MCP Server Specification: `sap-ps-mcp`

```json
{
  "name": "sap-ps-mcp",
  "version": "1.0.0",
  "description": "MCP server for SAP Project System operations supporting construction project delivery",
  "tools": [
    {
      "name": "get_project_structure",
      "description": "Retrieve complete WBS hierarchy for a project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "project_id": {"type": "string", "description": "SAP Project Definition ID"},
          "include_networks": {"type": "boolean", "default": false},
          "include_activities": {"type": "boolean", "default": false}
        },
        "required": ["project_id"]
      }
    },
    {
      "name": "get_project_budget",
      "description": "Retrieve budget breakdown by WBS element and cost element",
      "inputSchema": {
        "type": "object",
        "properties": {
          "project_id": {"type": "string"},
          "wbs_element": {"type": "string", "description": "Optional filter to specific WBS"},
          "fiscal_year": {"type": "string"}
        },
        "required": ["project_id"]
      }
    },
    {
      "name": "get_actual_costs",
      "description": "Retrieve actual costs posted against project WBS elements",
      "inputSchema": {
        "type": "object",
        "properties": {
          "project_id": {"type": "string"},
          "period_from": {"type": "string", "format": "date"},
          "period_to": {"type": "string", "format": "date"},
          "cost_element_group": {"type": "string"}
        },
        "required": ["project_id"]
      }
    },
    {
      "name": "calculate_percent_complete",
      "description": "Calculate % complete by cost code using earned value method",
      "inputSchema": {
        "type": "object",
        "properties": {
          "project_id": {"type": "string"},
          "method": {
            "type": "string",
            "enum": ["cost_ratio", "units_complete", "milestone"],
            "default": "cost_ratio"
          },
          "as_of_date": {"type": "string", "format": "date"}
        },
        "required": ["project_id"]
      }
    },
    {
      "name": "get_change_orders",
      "description": "Retrieve approved and pending change orders for a project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "project_id": {"type": "string"},
          "status": {
            "type": "string",
            "enum": ["approved", "pending", "rejected", "all"],
            "default": "all"
          }
        },
        "required": ["project_id"]
      }
    },
    {
      "name": "create_change_order",
      "description": "Create a new change order against project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "project_id": {"type": "string"},
          "description": {"type": "string"},
          "description_fr": {"type": "string"},
          "amount": {"type": "number"},
          "schedule_impact_days": {"type": "integer"},
          "cost_breakdown": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "wbs_element": {"type": "string"},
                "cost_element": {"type": "string"},
                "amount": {"type": "number"}
              }
            }
          }
        },
        "required": ["project_id", "description", "amount"]
      }
    },
    {
      "name": "get_project_schedule",
      "description": "Retrieve project schedule from network activities",
      "inputSchema": {
        "type": "object",
        "properties": {
          "project_id": {"type": "string"},
          "include_milestones_only": {"type": "boolean", "default": false}
        },
        "required": ["project_id"]
      }
    },
    {
      "name": "update_activity_progress",
      "description": "Update % complete on network activity",
      "inputSchema": {
        "type": "object",
        "properties": {
          "activity_id": {"type": "string"},
          "percent_complete": {"type": "number", "minimum": 0, "maximum": 100},
          "actual_start": {"type": "string", "format": "date"},
          "actual_finish": {"type": "string", "format": "date"}
        },
        "required": ["activity_id", "percent_complete"]
      }
    }
  ],
  "resources": [
    {
      "uri": "sap-ps://projects",
      "name": "Project List",
      "description": "List of all construction projects",
      "mimeType": "application/json"
    },
    {
      "uri": "sap-ps://projects/{project_id}",
      "name": "Project Details",
      "description": "Complete project details including WBS, budget, actuals",
      "mimeType": "application/json"
    }
  ]
}
```

### 4.3 MCP Server: `ccq-api-mcp`

```json
{
  "name": "ccq-api-mcp",
  "version": "1.0.0",
  "description": "MCP server for Commission de la construction du Québec compliance services",
  "tools": [
    {
      "name": "validate_competency_card",
      "description": "Validate a worker's CCQ competency card status",
      "inputSchema": {
        "type": "object",
        "properties": {
          "card_number": {"type": "string"},
          "trade_code": {
            "type": "string",
            "description": "CCQ trade classification code (e.g., 'ELEC' for electrician)"
          },
          "as_of_date": {"type": "string", "format": "date"}
        },
        "required": ["card_number"]
      }
    },
    {
      "name": "get_required_training",
      "description": "Get required training courses for a trade classification",
      "inputSchema": {
        "type": "object",
        "properties": {
          "trade_code": {"type": "string"},
          "apprentice_level": {"type": "integer", "minimum": 1, "maximum": 5}
        },
        "required": ["trade_code"]
      }
    },
    {
      "name": "calculate_contributions",
      "description": "Calculate CCQ contributions (union dues, training fund, etc.)",
      "inputSchema": {
        "type": "object",
        "properties": {
          "trade_code": {"type": "string"},
          "hours_worked": {"type": "number"},
          "hourly_rate": {"type": "number"},
          "period": {"type": "string", "format": "date"}
        },
        "required": ["trade_code", "hours_worked", "hourly_rate"]
      }
    },
    {
      "name": "verify_employer_registration",
      "description": "Verify employer's CCQ registration status",
      "inputSchema": {
        "type": "object",
        "properties": {
          "employer_neq": {"type": "string", "description": "Quebec enterprise number (NEQ)"}
        },
        "required": ["employer_neq"]
      }
    },
    {
      "name": "get_trade_classifications",
      "description": "List all CCQ trade classifications with codes",
      "inputSchema": {
        "type": "object",
        "properties": {
          "sector": {
            "type": "string",
            "enum": ["residential", "institutional_commercial", "industrial", "civil_engineering"],
            "description": "Construction sector filter"
          }
        }
      }
    },
    {
      "name": "generate_monthly_report",
      "description": "Generate CCQ monthly compliance report for submission",
      "inputSchema": {
        "type": "object",
        "properties": {
          "employer_neq": {"type": "string"},
          "period_month": {"type": "string", "format": "date"},
          "worker_hours": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "card_number": {"type": "string"},
                "trade_code": {"type": "string"},
                "hours": {"type": "number"},
                "project_id": {"type": "string"}
              }
            }
          }
        },
        "required": ["employer_neq", "period_month", "worker_hours"]
      }
    }
  ]
}
```

---

## 5. Document Intelligence Architecture

### 5.1 Document Processing Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    DOCUMENT INTELLIGENCE PIPELINE                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  INPUT SOURCES                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Email        │  │ Mobile       │  │ Subcontractor│  │ Fax/Scanner  │        │
│  │ Attachments  │  │ Camera       │  │ Portal Upload│  │ Integration  │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                 │                 │                 │                 │
│         └─────────────────┴────────┬────────┴─────────────────┘                 │
│                                    │                                            │
│                                    ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      DOCUMENT CLASSIFIER                                  │   │
│  │  • File type detection (PDF, TIFF, JPEG, PNG)                            │   │
│  │  • Language detection (FR/EN)                                            │   │
│  │  • Document type classification (contract, CO, lien, RFI, etc.)          │   │
│  │  • Quality assessment (resolution, skew, contrast)                       │   │
│  └──────────────────────────────────┬───────────────────────────────────────┘   │
│                                     │                                            │
│         ┌───────────────────────────┼───────────────────────────────┐           │
│         │                           │                               │           │
│         ▼                           ▼                               ▼           │
│  ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐         │
│  │ SAP Document AI │      │ SAP Document AI │      │ LlamaExtract    │         │
│  │ Premium         │      │ Standard        │      │ (Cost-Optimized)│         │
│  │                 │      │                 │      │                 │         │
│  │ HIGH VALUE:     │      │ STRUCTURED:     │      │ HIGH VOLUME:    │         │
│  │ • Contracts     │      │ • Invoices      │      │ • RFIs          │         │
│  │ • Change orders │      │ • POs           │      │ • Daily reports │         │
│  │ • Lien waivers  │      │ • Delivery notes│      │ • Site photos   │         │
│  │ • AIA forms     │      │                 │      │ • Meeting notes │         │
│  │ • CCQ cards     │      │                 │      │                 │         │
│  └────────┬────────┘      └────────┬────────┘      └────────┬────────┘         │
│           │                        │                        │                   │
│           └────────────────────────┼────────────────────────┘                   │
│                                    │                                            │
│                                    ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      EXTRACTION SCHEMA MAPPER                             │   │
│  │  • Map extracted fields to canonical construction data model             │   │
│  │  • Validate against SAP master data (project IDs, vendor IDs, etc.)     │   │
│  │  • Flag confidence scores below threshold for human review              │   │
│  │  • Handle bilingual extraction (FR fields → EN canonical)                │   │
│  └──────────────────────────────────┬───────────────────────────────────────┘   │
│                                     │                                            │
│                    ┌────────────────┼────────────────┐                          │
│                    │                │                │                          │
│                    ▼                ▼                ▼                          │
│  ┌─────────────────────┐  ┌─────────────────┐  ┌─────────────────────┐         │
│  │ AUTO-PROCESS        │  │ HUMAN REVIEW    │  │ REJECTION           │         │
│  │ (Confidence > 90%)  │  │ (70-90%)        │  │ (< 70% or invalid)  │         │
│  │                     │  │                 │  │                     │         │
│  │ → Post to SAP       │  │ → Review queue  │  │ → Notify submitter  │         │
│  │ → Trigger workflow  │  │ → Correction UI │  │ → Request rescan    │         │
│  └─────────────────────┘  └─────────────────┘  └─────────────────────┘         │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Document Type Extraction Schemas

#### 5.2.1 Change Order Extraction

```json
{
  "document_type": "change_order",
  "extraction_schema": {
    "header": {
      "co_number": {"type": "string", "confidence_threshold": 0.95},
      "project_id": {"type": "string", "sap_validation": "project_exists"},
      "date": {"type": "date", "formats": ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]},
      "owner_name": {"type": "string"},
      "contractor_name": {"type": "string", "sap_validation": "vendor_exists"}
    },
    "description": {
      "scope_text_en": {"type": "string", "max_length": 5000},
      "scope_text_fr": {"type": "string", "max_length": 5000},
      "reason_code": {"type": "enum", "values": ["owner_request", "design_error", "unforeseen_condition", "code_change"]}
    },
    "financials": {
      "original_contract_value": {"type": "currency", "currency": "CAD"},
      "previous_cos_total": {"type": "currency"},
      "this_co_amount": {"type": "currency", "confidence_threshold": 0.98},
      "new_contract_value": {"type": "currency"}
    },
    "schedule": {
      "time_extension_days": {"type": "integer"},
      "revised_completion_date": {"type": "date"}
    },
    "approvals": {
      "signatures": {
        "type": "array",
        "items": {
          "name": {"type": "string"},
          "title": {"type": "string"},
          "date": {"type": "date"},
          "signature_present": {"type": "boolean"}
        }
      }
    }
  }
}
```

#### 5.2.2 AIA G702/G703 Extraction

```json
{
  "document_type": "aia_g702_g703",
  "extraction_schema": {
    "g702_header": {
      "application_number": {"type": "integer"},
      "period_to": {"type": "date"},
      "project_name": {"type": "string"},
      "project_number": {"type": "string", "sap_validation": "project_exists"},
      "contract_for": {"type": "string"},
      "contractor": {"type": "string"}
    },
    "g702_summary": {
      "original_contract_sum": {"type": "currency"},
      "net_change_by_cos": {"type": "currency"},
      "contract_sum_to_date": {"type": "currency"},
      "total_completed_stored": {"type": "currency"},
      "retainage": {"type": "currency"},
      "total_earned_less_retainage": {"type": "currency"},
      "less_previous_certificates": {"type": "currency"},
      "current_payment_due": {"type": "currency", "confidence_threshold": 0.98},
      "balance_to_finish": {"type": "currency"}
    },
    "g703_schedule": {
      "line_items": {
        "type": "array",
        "items": {
          "item_number": {"type": "string"},
          "description": {"type": "string"},
          "scheduled_value": {"type": "currency"},
          "previous_applications": {"type": "currency"},
          "this_period": {"type": "currency"},
          "materials_stored": {"type": "currency"},
          "total_completed": {"type": "currency"},
          "percent_complete": {"type": "percentage"},
          "balance_to_finish": {"type": "currency"},
          "retainage": {"type": "currency"}
        }
      }
    }
  }
}
```

#### 5.2.3 CCQ Competency Card Extraction

```json
{
  "document_type": "ccq_competency_card",
  "extraction_schema": {
    "card_info": {
      "card_number": {"type": "string", "pattern": "^[0-9]{8}$", "confidence_threshold": 0.99},
      "issue_date": {"type": "date"},
      "expiry_date": {"type": "date"}
    },
    "holder": {
      "last_name": {"type": "string"},
      "first_name": {"type": "string"},
      "date_of_birth": {"type": "date"},
      "photo_present": {"type": "boolean"}
    },
    "qualifications": {
      "trade_code": {"type": "string", "ccq_validation": "trade_exists"},
      "trade_name_fr": {"type": "string"},
      "classification": {"type": "enum", "values": ["apprentice_1", "apprentice_2", "apprentice_3", "apprentice_4", "journeyman", "occupation"]},
      "sectors": {
        "type": "array",
        "items": {"type": "enum", "values": ["residential", "institutional_commercial", "industrial", "civil_engineering"]}
      }
    },
    "endorsements": {
      "type": "array",
      "items": {
        "code": {"type": "string"},
        "description": {"type": "string"},
        "date_obtained": {"type": "date"}
      }
    }
  }
}
```

### 5.3 SAP Document AI Premium Configuration

```yaml
# SAP Document AI Premium - Construction Document Schemas
document_ai_config:
  service_key: "${DOCUMENT_AI_SERVICE_KEY}"
  region: "cf-ca10"  # Canada region for data residency

  custom_schemas:
    - name: "quebec_change_order"
      base_schema: "custom"
      training_documents: 500
      languages: ["fr-CA", "en-CA"]
      fields:
        - name: "co_number"
          type: "string"
          required: true
        - name: "amount"
          type: "currency"
          required: true
          currency_code: "CAD"
        # ... additional fields

    - name: "aia_g702"
      base_schema: "custom"
      training_documents: 300
      languages: ["en-US", "en-CA"]
      # ... schema definition

    - name: "ccdc_9a"
      base_schema: "custom"
      training_documents: 200
      languages: ["en-CA", "fr-CA"]
      # ... schema definition (Canadian Construction Documents Committee format)

    - name: "ccq_card"
      base_schema: "id_document"
      training_documents: 1000
      languages: ["fr-CA"]
      # ... schema definition

  processing_rules:
    - document_type: "change_order"
      extraction_engine: "premium"
      confidence_threshold: 0.90
      human_review_below: 0.85

    - document_type: "rfi"
      extraction_engine: "llamaextract"  # Cost optimization
      confidence_threshold: 0.80
```

---

## 6. Multi-Tenant SaaS Architecture

### 6.1 Tenant Isolation Model

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    MULTI-TENANT SAAS ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                        SHARED SERVICES LAYER                              │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │   │
│  │  │ API Gateway │  │ Auth (XSUAA)│  │ Agent       │  │ MCP Server  │     │   │
│  │  │ (Kong/SAP)  │  │ + IAS       │  │ Registry    │  │ Registry    │     │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                     TENANT ROUTING LAYER                                  │   │
│  │  • Tenant ID extraction from JWT                                         │   │
│  │  • Route to tenant-specific resources                                    │   │
│  │  • Enforce tenant isolation                                              │   │
│  └──────────────────────────────────┬───────────────────────────────────────┘   │
│                                     │                                            │
│         ┌───────────────────────────┼───────────────────────────────────────┐   │
│         │                           │                                       │   │
│         ▼                           ▼                                       ▼   │
│  ┌─────────────────┐      ┌─────────────────┐              ┌─────────────────┐ │
│  │ TENANT A        │      │ TENANT B        │              │ TENANT N        │ │
│  │ (Pomerleau)     │      │ (EBC Inc.)      │              │ (...)           │ │
│  │                 │      │                 │              │                 │ │
│  │ ┌─────────────┐ │      │ ┌─────────────┐ │              │ ┌─────────────┐ │ │
│  │ │ HANA Schema │ │      │ │ HANA Schema │ │              │ │ HANA Schema │ │ │
│  │ │ tenant_a_*  │ │      │ │ tenant_b_*  │ │              │ │ tenant_n_*  │ │ │
│  │ └─────────────┘ │      │ └─────────────┘ │              │ └─────────────┘ │ │
│  │                 │      │                 │              │                 │ │
│  │ ┌─────────────┐ │      │ ┌─────────────┐ │              │ ┌─────────────┐ │ │
│  │ │ Object Store│ │      │ │ Object Store│ │              │ │ Object Store│ │ │
│  │ │ /tenant_a/  │ │      │ │ /tenant_b/  │ │              │ │ /tenant_n/  │ │ │
│  │ └─────────────┘ │      │ └─────────────┘ │              │ └─────────────┘ │ │
│  │                 │      │                 │              │                 │ │
│  │ ┌─────────────┐ │      │ ┌─────────────┐ │              │ ┌─────────────┐ │ │
│  │ │ SAP Backend │ │      │ │ SAP Backend │ │              │ │ SAP Backend │ │ │
│  │ │ S/4 Public  │ │      │ │ ECC 6.0     │ │              │ │ S/4 On-Prem │ │ │
│  │ └─────────────┘ │      │ └─────────────┘ │              │ └─────────────┘ │ │
│  │                 │      │                 │              │                 │ │
│  └─────────────────┘      └─────────────────┘              └─────────────────┘ │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Tenant Configuration Model

```json
{
  "tenant_id": "pomerleau-qc",
  "tenant_name": "Pomerleau Inc.",
  "subscription_tier": "enterprise",
  "created_at": "2027-01-15T00:00:00Z",

  "sap_backend": {
    "type": "s4hana_public_cloud",
    "api_url": "https://pomerleau.s4hana.ondemand.com",
    "authentication": {
      "type": "oauth2",
      "client_id": "${VAULT:pomerleau_sap_client_id}",
      "client_secret": "${VAULT:pomerleau_sap_client_secret}",
      "token_url": "https://pomerleau.authentication.ca10.hana.ondemand.com/oauth/token"
    },
    "enabled_modules": ["PS", "FI", "MM", "PM"],
    "custom_fields": {
      "project_definition": ["ZZ_QC_LICENSE", "ZZ_CCQ_SECTOR"]
    }
  },

  "successfactors": {
    "enabled": true,
    "api_url": "https://api15.successfactors.com",
    "company_id": "pomelreauT"
  },

  "localization": {
    "default_language": "fr-CA",
    "supported_languages": ["fr-CA", "en-CA"],
    "timezone": "America/Toronto",
    "currency": "CAD",
    "date_format": "YYYY-MM-DD"
  },

  "compliance": {
    "ccq_employer_neq": "1234567890",
    "cnesst_employer_id": "CNESST-98765",
    "rbq_license": "8765-4321-01"
  },

  "document_processing": {
    "engine": "sap_document_ai_premium",
    "fallback_engine": "llamaextract",
    "confidence_threshold": 0.90,
    "human_review_enabled": true
  },

  "feature_flags": {
    "mobile_app_enabled": true,
    "subcontractor_portal_enabled": true,
    "public_chain_anchoring": false,
    "ai_change_order_estimation": true
  },

  "data_residency": {
    "region": "ca-central-1",
    "hana_instance": "hana-ca10-shared",
    "object_store_bucket": "qc-construction-docs-ca"
  }
}
```

### 6.3 Deployment Models

| Model | Description | Use Case | Isolation Level |
|-------|-------------|----------|-----------------|
| **Shared SaaS** | Multi-tenant on shared BTP subaccount | SMB contractors <$50M | Schema-level |
| **Dedicated SaaS** | Tenant-specific BTP subaccount | Enterprise >$50M | Subaccount-level |
| **Private Cloud** | Customer's own BTP with our agents | Regulated (banks, govt) | Full |
| **On-Premise** | Agent runtime on customer K8s | Air-gapped/sovereign | Full |

### 6.4 BTP Services Consumption by Tier

| BTP Service | Shared SaaS | Dedicated SaaS | Private Cloud |
|-------------|-------------|----------------|---------------|
| SAP AI Core | Shared capacity | Dedicated capacity | Customer-provided |
| HANA Cloud | Shared HDI container | Dedicated instance | Customer-provided |
| Integration Suite | Shared tenant | Dedicated tenant | Customer-provided |
| Document AI | Per-page metered | Per-page metered | Customer license |
| Event Mesh | Shared namespace | Dedicated namespace | Customer-provided |
| Object Store | Shared bucket (prefixed) | Dedicated bucket | Customer-provided |
| XSUAA | Shared IAS tenant | Dedicated IAS tenant | Customer IDP |

---

## 7. Mobile Application Architecture

### 7.1 Mobile App Scope

| Persona | Primary Functions | Platform |
|---------|-------------------|----------|
| **Site Superintendent** | Daily reports, time entry, safety check, photos | iOS/Android native |
| **Foreman** | Crew time, material receipts, equipment logs | iOS/Android native |
| **Project Manager** | Approvals, dashboards, alerts | iOS/Android + Web |
| **Subcontractor** | Payment apps, compliance docs, lien waivers | Web portal (responsive) |
| **Worker** | Time punch, safety acknowledgment, CCQ card scan | iOS/Android (simplified) |

### 7.2 Mobile Technology Stack

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      MOBILE APPLICATION ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                         MOBILE CLIENTS                                    │   │
│  │                                                                           │   │
│  │   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │   │
│  │   │ iOS App         │    │ Android App     │    │ Web App (PWA)   │     │   │
│  │   │ (Swift/SwiftUI) │    │ (Kotlin/Compose)│    │ (React/UI5)     │     │   │
│  │   │                 │    │                 │    │                 │     │   │
│  │   │ SAP Mobile SDK  │    │ SAP Mobile SDK  │    │ SAP Fiori       │     │   │
│  │   │ for iOS         │    │ for Android     │    │ Elements        │     │   │
│  │   └─────────────────┘    └─────────────────┘    └─────────────────┘     │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      SAP MOBILE SERVICES                                  │   │
│  │  • Push notifications          • Offline data sync                       │   │
│  │  • App configuration           • Usage analytics                         │   │
│  │  • Authentication (XSUAA)      • App update management                   │   │
│  └──────────────────────────────────┬───────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      MOBILE BACKEND (CAP)                                 │   │
│  │                                                                           │   │
│  │   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │   │
│  │   │ Time Entry API  │    │ Daily Report API│    │ Document Upload │     │   │
│  │   │                 │    │                 │    │ API             │     │   │
│  │   │ • Clock in/out  │    │ • Weather       │    │ • Photo capture │     │   │
│  │   │ • GPS location  │    │ • Crew count    │    │ • OCR trigger   │     │   │
│  │   │ • Project/WBS   │    │ • Work done     │    │ • Offline queue │     │   │
│  │   │ • CCQ validation│    │ • Safety issues │    │                 │     │   │
│  │   └─────────────────┘    └─────────────────┘    └─────────────────┘     │   │
│  │                                                                           │   │
│  │   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │   │
│  │   │ Approval API    │    │ Equipment API   │    │ Safety API      │     │   │
│  │   │                 │    │                 │    │                 │     │   │
│  │   │ • CO approval   │    │ • Check out/in  │    │ • Hazard report │     │   │
│  │   │ • Payment app   │    │ • Hours logging │    │ • Incident log  │     │   │
│  │   │ • Timesheet     │    │ • Maintenance   │    │ • Toolbox talk  │     │   │
│  │   └─────────────────┘    └─────────────────┘    └─────────────────┘     │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      AGENT ORCHESTRATION                                  │   │
│  │                      (via A2A protocol)                                   │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Offline Capabilities

| Function | Offline Support | Sync Strategy |
|----------|-----------------|---------------|
| Time entry | Full | Queue → sync on connectivity |
| Daily reports | Full | Queue → sync on connectivity |
| Photo capture | Full | Upload queue with compression |
| Approvals | Read-only cache | Require connectivity for action |
| CCQ card scan | Cached validation | Periodic sync of card database |
| Safety forms | Full | Queue → sync on connectivity |
| Document viewing | Downloaded cache | On-demand download |

### 7.4 Mobile-Specific Agent Interactions

```python
# Mobile-optimized agent interaction
class MobileAgentClient:
    """
    Lightweight agent client for mobile with:
    - Compressed payloads
    - Offline queuing
    - Push notification responses
    """

    async def submit_time_entry(self, entry: TimeEntry) -> str:
        """Submit time entry with CCQ validation."""

        # Quick local validation
        if not self._validate_offline(entry):
            raise ValidationError("Invalid entry")

        # Queue for sync if offline
        if not self._is_connected():
            return await self._queue_for_sync(entry)

        # Online: Submit to agent
        response = await self.agent_client.send_task(
            message=Message(
                role="user",
                parts=[
                    TextPart(text="Record time entry"),
                    DataPart(data=entry.model_dump())
                ]
            ),
            metadata={
                "source": "mobile",
                "device_id": self.device_id,
                "gps_coords": entry.location
            }
        )

        # Agent validates CCQ, posts to SAP, returns confirmation
        return response.task_id
```

---

## 8. Bilingual Architecture (French/English)

### 8.1 Language Handling Strategy

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      BILINGUAL PROCESSING PIPELINE                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  INPUT                                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │  User message (French or English, possibly mixed)                        │   │
│  │  "Prépare la facturation for project Centre-Ville"                       │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      LANGUAGE DETECTION                                   │   │
│  │  • Primary language: fr-CA                                               │   │
│  │  • Secondary tokens: en (project names allowed in English)               │   │
│  │  • Response language: fr-CA                                              │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      INTENT PROCESSING                                    │   │
│  │  • Intent extracted in language-agnostic form                            │   │
│  │  • Entities normalized to canonical IDs                                  │   │
│  │  • Intent: GENERATE_PROGRESS_BILLING                                     │   │
│  │  • Entity: project_id = "P-CENTREVILLE-2024"                            │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      AGENT EXECUTION                                      │   │
│  │  • Internal processing in English (SAP APIs)                             │   │
│  │  • Data labels from SAP may be EN or FR depending on config              │   │
│  │  • Calculations are language-neutral                                     │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      RESPONSE GENERATION                                  │   │
│  │  • Response template selected for fr-CA                                  │   │
│  │  • Dynamic content inserted                                              │   │
│  │  • Document artifacts generated in fr-CA                                 │   │
│  │  • Option to generate parallel EN version                                │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  OUTPUT                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │  "Voici la demande de paiement pour le projet Centre-Ville:              │   │
│  │   - Valeur du contrat: 2 450 000,00 $                                    │   │
│  │   - Travaux complétés: 1 225 000,00 $ (50%)                             │   │
│  │   - Retenue: 122 500,00 $ (10%)                                          │   │
│  │   - Montant dû: 1 102 500,00 $                                           │   │
│  │                                                                           │   │
│  │   📎 Pièce jointe: G702-CentreVille-2024-03.pdf"                        │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Bilingual Content Management

| Content Type | Storage | Generation |
|--------------|---------|------------|
| **UI Labels** | i18n resource bundles (SAP UI5) | Build-time |
| **Error Messages** | Message class (SE91) or i18n | Build-time |
| **Document Templates** | Dual templates (FR/EN) | Runtime selection |
| **Agent Responses** | Prompt templates per language | Runtime LLM |
| **SAP Master Data** | Depends on customer config | Pass-through |
| **Regulatory Forms** | Fixed templates (CCQ = FR only) | Runtime fill |

### 8.3 Quebec French Considerations

| Aspect | Implementation |
|--------|----------------|
| **Locale** | `fr-CA` (not `fr-FR`) for proper formatting |
| **Currency** | `1 234,56 $` (space as thousand separator, comma decimal, $ after) |
| **Date** | `2027-01-15` or `15 janvier 2027` |
| **Legal Terms** | Quebec Civil Code terminology, not France |
| **Industry Terms** | CCQ trade names in French (e.g., "électricien" not "electrician") |
| **Bilingual Docs** | Some contracts require both FR and EN (per customer policy) |

---

## 9. Security Architecture

### 9.1 Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      SECURITY ARCHITECTURE                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      IDENTITY LAYER                                       │   │
│  │                                                                           │   │
│  │   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │   │
│  │   │ SAP IAS         │    │ Customer IDP    │    │ Social (B2C)    │     │   │
│  │   │ (Primary)       │    │ (Federation)    │    │ (Subs Portal)   │     │   │
│  │   │                 │    │                 │    │                 │     │   │
│  │   │ • Employee SSO  │    │ • Azure AD      │    │ • Google        │     │   │
│  │   │ • MFA enforced  │    │ • Okta          │    │ • Microsoft     │     │   │
│  │   │ • SCIM sync     │    │ • Ping          │    │ • Apple         │     │   │
│  │   └─────────────────┘    └─────────────────┘    └─────────────────┘     │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      XSUAA (Authorization)                                │   │
│  │                                                                           │   │
│  │   Scopes:                        Roles:                                  │   │
│  │   • construction.project.read    • ProjectManager                        │   │
│  │   • construction.project.write   • SiteSuperintendent                    │   │
│  │   • construction.billing.create  • Foreman                               │   │
│  │   • construction.compliance.read • Accountant                            │   │
│  │   • construction.compliance.admin • ComplianceOfficer                    │   │
│  │   • construction.subcontractor.* • SubcontractorUser                     │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                     │                                            │
│                                     ▼                                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      AGENT AUTHORIZATION                                  │   │
│  │                                                                           │   │
│  │   • Agent inherits user's scopes (no privilege escalation)               │   │
│  │   • Tool execution gated by scope check                                  │   │
│  │   • Audit log of all agent actions with user context                     │   │
│  │   • Sensitive operations require explicit confirmation                    │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Data Protection

| Data Category | Protection Measure |
|---------------|-------------------|
| **PII (Worker data)** | Encrypted at rest (HANA), TLS 1.3 in transit |
| **Financial data** | Tenant isolation, audit logging |
| **Documents** | Object store encryption, signed URLs (time-limited) |
| **CCQ card numbers** | Tokenized storage, masked display |
| **API credentials** | SAP Credential Store, never in config |
| **Conversation logs** | 90-day retention, anonymization option |

### 9.3 Compliance Certifications

| Certification | Status | Relevance |
|---------------|--------|-----------|
| **SOC 2 Type II** | Required | General security controls |
| **ISO 27001** | Required | Information security management |
| **PIPEDA** | Compliant | Canadian privacy law |
| **Quebec Law 25** | Compliant | Quebec privacy law (stricter than PIPEDA) |
| **CSA STAR** | Target | Cloud security |

---

## 10. Integration Patterns

### 10.1 SAP Integration Suite Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| **Cloud Connector** | ECC on-premise access | TCP tunnel, no inbound firewall |
| **OData Provisioning** | S/4 Public Cloud APIs | Direct HTTPS |
| **Event Mesh** | Real-time events from S/4 | Webhook subscriptions |
| **API Management** | Rate limiting, analytics | Kong or SAP API Mgmt |
| **Open Connectors** | Third-party SaaS | Pre-built connectors |

### 10.2 External System Integrations

| System | Integration Method | Purpose |
|--------|-------------------|---------|
| **CCQ Web Services** | REST API (OAuth 2.0) | Card validation, reporting |
| **CNESST Portal** | REST API + SFTP | Safety compliance, claims |
| **RBQ (Régie du bâtiment)** | Web scraping (structured) | License verification |
| **Canada Revenue Agency** | CRA API (GST/QST filing) | Tax remittance |
| **Insurance Providers** | ACORD XML / API | Certificate verification |
| **Credit Bureaus** | Equifax/TransUnion API | Subcontractor credit check |
| **Weather Services** | Environment Canada API | Site condition logging |
| **Procore** | Procore API | Field data (if customer uses) |

### 10.3 Event-Driven Architecture

```yaml
# SAP Event Mesh Topics
event_mesh_config:
  namespace: "qc-construction"

  subscriptions:
    # S/4HANA events we subscribe to
    - topic: "sap/s4/beh/project/v1/Project/Created/v1"
      handler: "project_created_handler"

    - topic: "sap/s4/beh/purchaseorder/v1/PurchaseOrder/Changed/v1"
      handler: "po_changed_handler"

    - topic: "sap/s4/beh/billingdocument/v1/BillingDocument/Created/v1"
      handler: "billing_created_handler"

  publications:
    # Events we publish
    - topic: "qc-construction/compliance/ccq/validation/completed"
      schema: "ccq_validation_result_v1"

    - topic: "qc-construction/billing/progress/generated"
      schema: "progress_billing_v1"

    - topic: "qc-construction/changeorder/approved"
      schema: "change_order_v1"
```

---

## 11. Performance & Scalability

### 11.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Agent response time (p50)** | < 3 seconds | Intent to first token |
| **Agent response time (p99)** | < 10 seconds | Intent to complete response |
| **Document extraction** | < 30 seconds | Upload to extracted data |
| **SAP API latency (p50)** | < 500ms | OData call round-trip |
| **Mobile sync** | < 5 seconds | Offline queue flush |
| **Concurrent users** | 500 per tenant | Active sessions |

### 11.2 Scalability Architecture

| Component | Scaling Strategy | Limit |
|-----------|------------------|-------|
| **Agent Runtime** | Horizontal (AI Core replicas) | Auto-scale 1-20 |
| **MCP Servers** | Horizontal (K8s pods) | Auto-scale 2-50 |
| **HANA** | Vertical (memory/compute tiers) | Per-tenant sizing |
| **Document AI** | SAP-managed (pay-per-use) | Unlimited |
| **Object Store** | SAP-managed (S3-compatible) | Unlimited |
| **Event Mesh** | SAP-managed | 10K msg/sec per namespace |

---

## 12. Observability

### 12.1 Monitoring Stack

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      OBSERVABILITY ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      SAP CLOUD LOGGING                                    │   │
│  │  • Application logs (structured JSON)                                    │   │
│  │  • Agent conversation logs (anonymized)                                  │   │
│  │  • Audit logs (immutable)                                               │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      DYNATRACE (APM)                                      │   │
│  │  • Distributed tracing (OpenTelemetry)                                   │   │
│  │  • Agent execution spans                                                 │   │
│  │  • SAP API call monitoring                                              │   │
│  │  • Anomaly detection                                                     │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      CUSTOM DASHBOARDS                                    │   │
│  │  • Agent usage metrics (by tenant, agent, skill)                         │   │
│  │  • Document processing SLAs                                              │   │
│  │  • Compliance check pass rates                                           │   │
│  │  • Cost tracking (AI tokens, API calls)                                  │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 12.2 Key Metrics

| Category | Metric | Alert Threshold |
|----------|--------|-----------------|
| **Availability** | Agent uptime | < 99.5% |
| **Performance** | p99 response time | > 15 seconds |
| **Errors** | Agent error rate | > 2% |
| **Business** | Document extraction accuracy | < 90% |
| **Business** | CCQ validation success rate | < 95% |
| **Cost** | AI token usage | > 120% of budget |

---

## 13. Deployment & Operations

### 13.1 CI/CD Pipeline

```yaml
# Azure DevOps / GitHub Actions pipeline
stages:
  - name: Build
    jobs:
      - build_agents
      - build_mcp_servers
      - build_mobile_apps
      - build_web_app

  - name: Test
    jobs:
      - unit_tests
      - integration_tests
      - agent_evaluation  # LLM response quality
      - security_scan

  - name: Deploy_Dev
    environment: development
    approval: automatic

  - name: Deploy_QA
    environment: qa
    approval: automatic
    tests:
      - e2e_tests
      - performance_tests

  - name: Deploy_Staging
    environment: staging
    approval: manual
    tests:
      - uat_tests
      - penetration_test

  - name: Deploy_Production
    environment: production
    approval: manual
    strategy: blue_green
    rollback: automatic_on_failure
```

### 13.2 Release Management

| Environment | Purpose | Refresh Cycle |
|-------------|---------|---------------|
| **Development** | Feature development | Continuous |
| **QA** | Integration testing | Daily |
| **Staging** | UAT, performance | Weekly |
| **Production** | Live customers | Bi-weekly releases |

---

## Appendix A: CCQ Trade Classification Reference

| Code | Trade (French) | Trade (English) | Sector Applicability |
|------|----------------|-----------------|---------------------|
| ELEC | Électricien | Electrician | All |
| PLOM | Plombier | Plumber | All |
| CHAU | Chaudronnier | Boilermaker | Industrial |
| FERR | Ferblantier | Sheet Metal Worker | All |
| CALO | Calorifugeur | Insulator | All |
| MECA | Mécanicien de machines lourdes | Heavy Equipment Mechanic | Civil, Industrial |
| GRUE | Grutier | Crane Operator | All |
| CHAR | Charpentier-menuisier | Carpenter | All |
| BRIC | Briqueteur-maçon | Bricklayer-Mason | All |
| PEIN | Peintre | Painter | All |
| ... | (26 total trades) | ... | ... |

---

## Appendix B: SAP API Version Compatibility

| API | S/4 2402 | S/4 2021 | ECC EHP8 | ECC EHP5 |
|-----|----------|----------|----------|----------|
| API_PROJECT_V2 | ✅ | ✅ | ❌ (use BAPI) | ❌ (use BAPI) |
| API_BILLING_DOCUMENT_SRV | ✅ | ✅ | ✅ (limited) | ❌ (use BAPI) |
| API_PURCHASEORDER_PROCESS_SRV | ✅ | ✅ | ✅ | ✅ (limited) |
| BAPI_PROJECT_* | ✅ | ✅ | ✅ | ✅ |
| Event Mesh Integration | ✅ | ✅ | ❌ | ❌ |

---

*Document Version: 2.0*
*Last Updated: November 8, 2026*
*Classification: Internal / Partner Technical*

# Projet Québec: Construction Project Delivery Agent - Intent Document

> **Document Type**: Product Intent & Business Requirements
> **Project ID**: MCPH-002-QC
> **Version**: 2.0
> **Last Updated**: November 8, 2026
> **Classification**: Internal / Partner Business

---

## 1. Executive Summary

### 1.1 Vision Statement

**Build the definitive AI-powered construction project delivery platform for Quebec contractors**, filling the gap SAP left when excluding construction from Autonomous Project Delivery's launch industries. By combining deep Quebec regulatory expertise (CCQ, CNESST, RBQ) with SAP's agent infrastructure (Joule, A2A, MCP), we create an unassailable competitive moat that global vendors cannot replicate and local competitors cannot match technically.

### 1.2 Strategic Opportunity

| Factor | Current State | Opportunity |
|--------|---------------|-------------|
| **SAP Gap** | Autonomous Project Delivery excludes construction | 24-36 month first-mover window |
| **Quebec Moat** | No solution addresses CCQ/CNESST/bilingual | Regulatory lock-in for Quebec market |
| **Pain Severity** | 3-8% revenue leakage on change orders | Quantifiable ROI drives sales |
| **Market Size** | 500+ Quebec subcontractors >$10M need SAP integration | $50M+ TAM in Quebec alone |
| **Reference Power** | Land one Tier 1 GC → mid-market follows | Pomerleau/EBC reference unlocks market |

### 1.3 Solution Summary

A **multi-agent orchestration platform** delivered as multi-tenant SaaS on SAP BTP, featuring:

- **7 specialized AI agents** for billing, change orders, compliance, documents, subcontractors, workforce, and field operations
- **Full SAP landscape support** from ECC 6.0 through S/4HANA Public Cloud
- **Native Quebec compliance** with CCQ, CNESST, RBQ, and Quebec tax regulations
- **Complete bilingual operation** in French (primary) and English
- **Mobile-first field operations** with offline capability
- **Document AI integration** for automated extraction of construction documents
- **A2A protocol compliance** for SAP Joule ecosystem integration

---

## 2. Problem Statement

### 2.1 The Industry Gap

SAP's **Autonomous Project Delivery** announcement at Sapphire 2026 explicitly prioritizes:
1. Professional Services (launch)
2. Industrial Manufacturing (launch)
3. **Construction** (future expansion—no timeline)

Meanwhile, construction represents:
- **$200B+ annual value** in Canada
- **200,000+ workers** in Quebec alone (4th largest industry)
- **1,086 construction companies** globally using SAP ERP

**The gap**: No AI-powered construction agent exists in the SAP ecosystem. Contractors using SAP are stuck with manual processes, Excel workarounds, and point solutions that don't integrate.

### 2.2 Quebec-Specific Challenges

| Challenge | Description | Business Impact |
|-----------|-------------|-----------------|
| **CCQ Compliance** | Commission de la construction du Québec mandates specific labor classifications, training, union dues, and reporting for all construction workers | Fines up to $10K per violation; project shutdowns |
| **CNESST Safety** | Quebec workplace safety requirements differ from rest-of-Canada; incident reporting, prevention programs, training validation | Liability exposure; site closures |
| **Bilingual Requirements** | All contracts, safety documents, regulatory filings must be in French; some clients need English | 15% admin overhead for translation/rework |
| **QST/GST Complexity** | Quebec's 9.975% QST + 5% GST with different filing requirements | Tax errors; audit exposure |
| **Progress Billing** | AIA G702/G703 (US standard) vs. CCDC 9A (Canadian standard); 10% Quebec holdback laws | Delayed payments; cash flow crunch |
| **Change Order Chaos** | Scope changes are endemic to construction; most tracked in email/Excel | 3-8% revenue leakage per project |

### 2.3 Persona Pain Points

#### 2.3.1 Project Manager (Jean-François, Pomerleau)

> "I spend 2 days every month preparing progress billing. I have to pull data from SAP, cross-reference with change orders in our SharePoint, calculate holdbacks manually, and generate the AIA form in Word. Then translate it to French for some clients. If there's an error, the payment gets delayed another 30 days."

**Pain Quantified**:
- 16 hours/month on billing admin per project
- 15-30 day DSO increase from errors
- $50K+ per year in recovered change orders if tracked properly

#### 2.3.2 Site Superintendent (Marie, EBC Inc.)

> "Every morning I have to verify CCQ cards for any new workers. I check expiry dates, trade classifications, and whether their training is current. It's all manual—I have a binder of photocopied cards. If I miss something and CCQ shows up, we get fined and the worker gets sent home."

**Pain Quantified**:
- 30 minutes/day on CCQ verification
- $5K-$10K fines per violation
- Project delays when workers are rejected

#### 2.3.3 Accounts Payable (Sophie, Groupe Canam)

> "Subcontractors send invoices in all formats—some are PDFs of handwritten notes, some are formal AIA forms, some are just emails with numbers. I have to manually enter everything into SAP, check if their insurance is current, verify the lien waiver status, and make sure we're not overpaying. It takes forever."

**Pain Quantified**:
- 4 hours per subcontractor payment application
- 5% of invoices have errors caught late
- Insurance gaps create liability exposure

#### 2.3.4 Compliance Officer (Ahmed, Dallaire)

> "Preparing for a CCQ audit is a nightmare. I have to pull reports from SAP for hours worked, cross-reference with our time sheets, calculate union contributions, and generate the monthly submission. If the numbers don't match, we get audited. If we underpaid contributions, we get fined."

**Pain Quantified**:
- 40 hours per CCQ audit preparation
- $10K+ fines for contribution discrepancies
- Reputation damage with CCQ

---

## 3. Solution Overview

### 3.1 Agent Portfolio

| Agent | Primary Function | Key Automations |
|-------|------------------|-----------------|
| **Construction Orchestrator** | Natural language interface, intent routing, bilingual conversation | Language detection, context assembly, multi-agent coordination |
| **Progress Billing Agent** | Generate progress payment applications | AIA G702/G703, CCDC 9A, holdback calculations, change order integration |
| **Change Order Agent** | Analyze and process scope changes | Cost impact analysis, schedule impact, document generation, approval workflow |
| **Compliance Agent** | Quebec regulatory compliance | CCQ card validation, CNESST safety, insurance tracking, regulatory reporting |
| **Document Intelligence Agent** | Extract data from construction documents | OCR, field extraction, validation, SAP posting |
| **Subcontractor Agent** | Manage subcontractor lifecycle | Prequalification, performance tracking, payment applications, lien waivers |
| **Workforce Agent** | CCQ-compliant workforce management | Card validation, training tracking, union dues, scheduling |
| **Field Operations Agent** | Mobile field data capture | Time entry, daily reports, safety logs, equipment tracking |

### 3.2 Capability Matrix by SAP Backend

| Capability | S/4 Public | S/4 Private | S/4 On-Prem | ECC 6.0 |
|------------|------------|-------------|-------------|---------|
| Progress Billing | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Change Orders | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| CCQ Compliance | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Document AI | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Event-Driven | ✅ Native | ✅ Native | ⚠️ Polling | ⚠️ Polling |
| A2A Native | ✅ Yes | ✅ Yes | ✅ Yes | ⚠️ Adapter |
| Mobile Offline | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Real-time Dashboards | ✅ Native | ✅ Native | ⚠️ Refresh | ⚠️ Refresh |

### 3.3 Deployment Models

| Model | Description | Target Customer | Pricing Tier |
|-------|-------------|-----------------|--------------|
| **Shared SaaS** | Multi-tenant on shared BTP infrastructure | SMB contractors <$50M revenue | Essentials, Professional |
| **Dedicated SaaS** | Tenant-specific BTP subaccount | Enterprise >$50M revenue | Enterprise |
| **Private Cloud** | Customer's own BTP, our agents | Regulated customers (banks, govt contractors) | Custom |
| **On-Premise** | Agent runtime on customer Kubernetes | Air-gapped/sovereign requirements | Custom |

---

## 4. Functional Requirements

### 4.1 Progress Billing Agent (FR-BILL)

#### FR-BILL-001: Generate AIA G702 Application for Payment

**Description**: Generate a complete AIA G702 Application and Certificate for Payment based on current project status in SAP PS.

**Acceptance Criteria**:
- [ ] Retrieve project budget from SAP PS by WBS element
- [ ] Calculate completed work by cost code using earned value method
- [ ] Apply approved change orders to adjust contract value
- [ ] Calculate 10% Quebec holdback per Civil Code requirements
- [ ] Generate PDF matching AIA G702 format exactly
- [ ] Support both French and English output
- [ ] Include digital signature fields

**User Story**: "As a Project Manager, I want to generate a progress billing application by asking the agent in natural language, so that I can reduce billing preparation from 2 days to 2 hours."

#### FR-BILL-002: Generate AIA G703 Continuation Sheet

**Description**: Generate itemized continuation sheet showing work completed by schedule of values line item.

**Acceptance Criteria**:
- [ ] Pull schedule of values from SAP PS WBS structure
- [ ] Calculate % complete per line item
- [ ] Show previous billing, current period, and cumulative
- [ ] Calculate retainage per line
- [ ] Handle stored materials separately
- [ ] Generate PDF matching AIA G703 format

#### FR-BILL-003: Generate CCDC 9A (Canadian Standard)

**Description**: Generate CCDC Document 9A - Statutory Declaration of Progress Payment Distribution for Canadian projects.

**Acceptance Criteria**:
- [ ] Support CCDC 9A format alongside AIA formats
- [ ] Include statutory declaration language per Canadian requirements
- [ ] Track lien holdback separately from performance holdback
- [ ] Generate in English and French (CCDC 9A is bilingual)

#### FR-BILL-004: Holdback Release Processing

**Description**: Process holdback release at substantial completion per Quebec Civil Code.

**Acceptance Criteria**:
- [ ] Identify projects at substantial completion milestone
- [ ] Calculate 45-day holdback release period
- [ ] Verify no liens registered against project
- [ ] Generate holdback release certificate (French)
- [ ] Post release to SAP FI when approved

#### FR-BILL-005: Change Order Integration

**Description**: Automatically adjust billing to reflect approved change orders.

**Acceptance Criteria**:
- [ ] Pull approved COs from SAP PS
- [ ] Adjust original contract value in billing calculation
- [ ] Show CO summary on billing application
- [ ] Handle both additive and deductive COs
- [ ] Support CO billing in current period or spread over time

### 4.2 Change Order Agent (FR-CO)

#### FR-CO-001: Extract Change Order from Document

**Description**: Extract structured data from scanned or uploaded change order documents.

**Acceptance Criteria**:
- [ ] Accept PDF, TIFF, JPEG, PNG uploads
- [ ] Extract: CO number, date, scope description, amount, schedule impact
- [ ] Support both English and French documents
- [ ] Handle handwritten annotations
- [ ] Confidence scoring with human review queue for low-confidence extractions
- [ ] Map extracted data to SAP PS change order structure

**Document AI Decision**:
- **SAP Document AI Premium** for change orders (high-value, legal weight)
- Requires custom schema training on construction CO formats
- Fallback to manual entry if confidence < 85%

#### FR-CO-002: Estimate Cost Impact

**Description**: Analyze a change order request and estimate cost impact.

**Acceptance Criteria**:
- [ ] Parse scope description (NLP)
- [ ] Identify affected WBS elements
- [ ] Estimate material costs from SAP MM pricing
- [ ] Estimate labor costs using CCQ trade rates
- [ ] Calculate equipment costs if applicable
- [ ] Apply contractor markup (configurable %)
- [ ] Generate itemized cost breakdown

#### FR-CO-003: Estimate Schedule Impact

**Description**: Analyze change order impact on project schedule.

**Acceptance Criteria**:
- [ ] Identify affected network activities in SAP PS
- [ ] Calculate duration extension based on scope
- [ ] Identify critical path impact
- [ ] Generate revised milestone dates
- [ ] Support "time extension only" vs. "concurrent work" options

#### FR-CO-004: Generate Change Order Proposal

**Description**: Generate a formal change order proposal document for client approval.

**Acceptance Criteria**:
- [ ] Generate bilingual document (FR/EN)
- [ ] Include scope description, cost breakdown, schedule impact
- [ ] Include required signatures section
- [ ] Apply company letterhead template
- [ ] Support multiple revision tracking
- [ ] Generate PDF for client delivery

#### FR-CO-005: Route for Approval

**Description**: Route change order through configurable approval workflow.

**Acceptance Criteria**:
- [ ] Support multi-level approval based on amount thresholds
- [ ] Integrate with SAP Workflow or custom workflow engine
- [ ] Send notifications (email, mobile push)
- [ ] Track approval history and timestamps
- [ ] Support delegation and escalation
- [ ] Post approved CO to SAP PS

### 4.3 Compliance Agent (FR-COMP)

#### FR-COMP-001: Validate CCQ Competency Card

**Description**: Validate a worker's CCQ competency card for site access.

**Acceptance Criteria**:
- [ ] Accept card number input or scan CCQ card image
- [ ] Call CCQ web services to validate card status
- [ ] Verify card not expired
- [ ] Verify trade classification matches required work
- [ ] Verify sector authorization (residential, commercial, industrial, civil)
- [ ] Return pass/fail with detailed reason in French
- [ ] Log validation attempt for audit trail

#### FR-COMP-002: Check Training Requirements

**Description**: Verify worker has required training certifications for their trade and site.

**Acceptance Criteria**:
- [ ] Retrieve required courses for trade classification from CCQ
- [ ] Check worker's training record
- [ ] Identify expired or missing certifications
- [ ] Generate training gap report
- [ ] Support CNESST safety training requirements separately
- [ ] Alert before certifications expire (30-day warning)

#### FR-COMP-003: Calculate CCQ Contributions

**Description**: Calculate employer CCQ contributions for payroll processing.

**Acceptance Criteria**:
- [ ] Calculate by trade classification and hours worked
- [ ] Include union dues, training fund, pension, vacation
- [ ] Apply correct rates by sector and region
- [ ] Generate contribution summary by worker
- [ ] Support batch calculation for payroll period
- [ ] Export format compatible with CCQ submission

#### FR-COMP-004: Generate CCQ Monthly Report

**Description**: Generate monthly employer report for CCQ submission.

**Acceptance Criteria**:
- [ ] Compile hours worked by trade and project
- [ ] Calculate contribution totals
- [ ] Validate against SAP payroll data
- [ ] Generate in CCQ-required format
- [ ] Support electronic submission via CCQ portal API
- [ ] Maintain submission history and confirmations

#### FR-COMP-005: CNESST Safety Compliance

**Description**: Track and report workplace safety per CNESST requirements.

**Acceptance Criteria**:
- [ ] Log safety incidents with required fields
- [ ] Generate incident reports in French
- [ ] Track prevention program completion
- [ ] Verify site safety inspections completed
- [ ] Generate CNESST annual report
- [ ] Alert on reporting deadlines

#### FR-COMP-006: Insurance Certificate Tracking

**Description**: Track subcontractor insurance certificates and expiry dates.

**Acceptance Criteria**:
- [ ] Store insurance certificates with metadata
- [ ] Track expiry dates and coverage limits
- [ ] Alert before expiry (30, 14, 7 days)
- [ ] Block payment processing if insurance expired
- [ ] Verify coverage meets contract requirements
- [ ] Extract certificate data via Document AI

#### FR-COMP-007: RBQ License Verification

**Description**: Verify contractor RBQ (Régie du bâtiment du Québec) license status.

**Acceptance Criteria**:
- [ ] Query RBQ public registry
- [ ] Verify license active and not suspended
- [ ] Verify license category matches contracted work
- [ ] Alert on license status changes
- [ ] Log verification for audit trail

### 4.4 Document Intelligence Agent (FR-DOC)

#### FR-DOC-001: Document Classification

**Description**: Automatically classify uploaded construction documents.

**Acceptance Criteria**:
- [ ] Classify into: contract, change order, RFI, submittal, invoice, lien waiver, insurance certificate, CCQ card, daily report, safety report, other
- [ ] Support PDF, TIFF, JPEG, PNG, HEIC formats
- [ ] Detect document language (French/English)
- [ ] Assess document quality (resolution, skew, contrast)
- [ ] Route to appropriate extraction pipeline

#### FR-DOC-002: Contract Data Extraction

**Description**: Extract key data from construction contracts.

**Acceptance Criteria**:
- [ ] Extract: parties, contract value, scope summary, key dates, payment terms
- [ ] Handle multi-page documents
- [ ] Support standard forms (CCDC 2, AIA A101) and custom contracts
- [ ] Extract bilingual content correctly
- [ ] Map to SAP project/vendor master data
- [ ] Flag missing required clauses

#### FR-DOC-003: Lien Waiver Processing

**Description**: Extract and validate lien waivers from subcontractors.

**Acceptance Criteria**:
- [ ] Classify waiver type: conditional, unconditional, partial, final
- [ ] Extract: amount, date, project, subcontractor
- [ ] Validate signature present
- [ ] Match to outstanding payment application
- [ ] Block payment if required waiver missing
- [ ] Store for legal compliance

#### FR-DOC-004: RFI/Submittal Extraction

**Description**: Extract data from RFIs (Request for Information) and submittals.

**Acceptance Criteria**:
- [ ] Extract: RFI number, date, from, subject, question/response
- [ ] Track RFI status (open, answered, closed)
- [ ] Link to relevant project and specification section
- [ ] Generate RFI log report
- [ ] Support image attachments

#### FR-DOC-005: CCQ Card OCR

**Description**: Extract data from photographed CCQ competency cards.

**Acceptance Criteria**:
- [ ] Extract: card number, name, trade, classification, expiry
- [ ] Handle card wear and poor photo quality
- [ ] Validate extracted number against CCQ registry
- [ ] Store card image securely (privacy considerations)
- [ ] Support bulk scanning for site check-in

### 4.5 Subcontractor Agent (FR-SUB)

#### FR-SUB-001: Subcontractor Prequalification

**Description**: Evaluate and prequalify subcontractors for project bidding.

**Acceptance Criteria**:
- [ ] Collect prequalification data via portal or forms
- [ ] Verify CCQ/RBQ registration
- [ ] Check insurance certificates and bonding capacity
- [ ] Review safety record (CNESST experience rating)
- [ ] Check credit score (Equifax/TransUnion integration)
- [ ] Generate prequalification score and report
- [ ] Maintain approved subcontractor list

#### FR-SUB-002: Subcontractor Performance Tracking

**Description**: Track subcontractor performance across projects.

**Acceptance Criteria**:
- [ ] Record quality incidents and deficiencies
- [ ] Track schedule adherence (milestones met/missed)
- [ ] Track safety incidents attributed to subcontractor
- [ ] Calculate performance score over time
- [ ] Generate performance report for contract negotiations
- [ ] Alert on performance degradation

#### FR-SUB-003: Process Subcontractor Payment Application

**Description**: Process payment applications received from subcontractors.

**Acceptance Criteria**:
- [ ] Accept payment application documents (various formats)
- [ ] Extract application data via Document AI
- [ ] Validate against contract and completed work
- [ ] Check insurance and lien waiver status
- [ ] Apply retainage per contract terms
- [ ] Route for approval
- [ ] Generate payment authorization for SAP AP

#### FR-SUB-004: Generate Lien Waiver Request

**Description**: Generate and track lien waiver requests to subcontractors.

**Acceptance Criteria**:
- [ ] Generate conditional waiver with payment application
- [ ] Generate unconditional waiver upon payment
- [ ] Support Quebec Civil Code lien requirements
- [ ] Track outstanding waivers by subcontractor
- [ ] Block subsequent payments if prior waivers missing
- [ ] Generate in French (legal requirement)

#### FR-SUB-005: Manage Backcharges

**Description**: Track and process backcharges against subcontractors.

**Acceptance Criteria**:
- [ ] Log deficiency with supporting documentation
- [ ] Estimate correction cost
- [ ] Notify subcontractor of pending backcharge
- [ ] Track dispute/resolution status
- [ ] Deduct from payment application when approved
- [ ] Generate backcharge report by subcontractor

### 4.6 Workforce Agent (FR-WORK)

#### FR-WORK-001: Worker Site Check-In

**Description**: Validate worker eligibility and record site check-in.

**Acceptance Criteria**:
- [ ] Accept CCQ card scan or manual entry
- [ ] Validate card status via CCQ API
- [ ] Verify trade matches assigned work
- [ ] Verify required training current
- [ ] Record check-in time and location (GPS)
- [ ] Deny access if validation fails, with reason
- [ ] Support mobile and kiosk interfaces

#### FR-WORK-002: Time Entry

**Description**: Record worker time against project cost codes.

**Acceptance Criteria**:
- [ ] Capture: worker, date, project, WBS element, hours, trade code
- [ ] Support mobile entry with offline capability
- [ ] Validate hours against project assignment
- [ ] Support multiple projects per day
- [ ] Calculate overtime per CCQ rules
- [ ] Export to SAP PS for cost posting

#### FR-WORK-003: CCQ Contribution Calculation

**Description**: Calculate CCQ contributions for time entered.

**Acceptance Criteria**:
- [ ] Apply correct rates by trade, sector, and classification
- [ ] Calculate employer and employee portions
- [ ] Handle apprentice rate variations
- [ ] Generate contribution register by pay period
- [ ] Reconcile with payroll system
- [ ] Export for CCQ monthly reporting

#### FR-WORK-004: Training Expiry Alerts

**Description**: Alert on upcoming training certification expirations.

**Acceptance Criteria**:
- [ ] Track all certifications by worker
- [ ] Alert at 90, 60, 30, 14, 7 days before expiry
- [ ] Notify worker, supervisor, and compliance officer
- [ ] Generate training renewal report
- [ ] Track training completion and update records
- [ ] Block site access when critical certifications expire

#### FR-WORK-005: Crew Scheduling

**Description**: Assign workers to projects based on skills and availability.

**Acceptance Criteria**:
- [ ] Maintain worker skills and certifications
- [ ] Match required trades to project needs
- [ ] Respect CCQ sector restrictions
- [ ] Optimize for travel time and equipment
- [ ] Handle absence and vacation
- [ ] Generate crew schedule by project and week

### 4.7 Field Operations Agent (FR-FIELD)

#### FR-FIELD-001: Daily Report Generation

**Description**: Generate construction daily report capturing site conditions and progress.

**Acceptance Criteria**:
- [ ] Capture: date, weather, temperature, crew count by trade
- [ ] Record work performed by area/specification
- [ ] Log visitors and inspections
- [ ] Record equipment on site
- [ ] Note delays and issues
- [ ] Attach photos
- [ ] Support voice-to-text entry
- [ ] Generate PDF report in French or English

#### FR-FIELD-002: Safety Check-In

**Description**: Record daily safety check-in and toolbox talk completion.

**Acceptance Criteria**:
- [ ] Record toolbox talk topic and attendees
- [ ] Capture safety hazard observations
- [ ] Log PPE compliance observations
- [ ] Record near-miss incidents
- [ ] Generate CNESST-compliant safety log
- [ ] Alert on unreported safety items

#### FR-FIELD-003: Equipment Logging

**Description**: Track construction equipment usage by project.

**Acceptance Criteria**:
- [ ] Check out equipment to project
- [ ] Record daily hours of operation
- [ ] Track fuel consumption
- [ ] Log maintenance events
- [ ] Post equipment costs to project in SAP PM
- [ ] Alert on maintenance schedules

#### FR-FIELD-004: Material Receipt

**Description**: Record material deliveries on site.

**Acceptance Criteria**:
- [ ] Scan or enter PO number
- [ ] Record quantity received
- [ ] Note any damage or discrepancies
- [ ] Capture photo of delivery ticket
- [ ] Post goods receipt to SAP MM
- [ ] Trigger inspection workflow if required

#### FR-FIELD-005: Photo Documentation

**Description**: Capture and organize site photos.

**Acceptance Criteria**:
- [ ] Capture photo with metadata (GPS, timestamp)
- [ ] Tag by project, location, specification section
- [ ] Add annotations and notes
- [ ] Store in document management system
- [ ] Link to daily reports and issues
- [ ] Support offline capture with batch upload

---

## 5. Non-Functional Requirements

### 5.1 Performance (NFR-PERF)

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| NFR-PERF-001 | Agent response time (p50) < 3 seconds | Time from user input to first response token |
| NFR-PERF-002 | Agent response time (p99) < 10 seconds | Time from user input to complete response |
| NFR-PERF-003 | Document extraction < 30 seconds | Time from upload to extracted data |
| NFR-PERF-004 | Mobile sync < 5 seconds | Time to sync offline queue |
| NFR-PERF-005 | SAP API latency (p50) < 500ms | OData call round-trip |
| NFR-PERF-006 | Support 500 concurrent users per tenant | Active agent sessions |

### 5.2 Availability (NFR-AVAIL)

| Requirement | Target | Notes |
|-------------|--------|-------|
| NFR-AVAIL-001 | 99.5% uptime (monthly) | Excludes planned maintenance |
| NFR-AVAIL-002 | Planned maintenance < 4 hours/month | Weekends only, with notice |
| NFR-AVAIL-003 | RTO < 4 hours | Recovery time objective |
| NFR-AVAIL-004 | RPO < 1 hour | Recovery point objective |
| NFR-AVAIL-005 | Mobile offline capability | Full function for time, reports, photos |

### 5.3 Security (NFR-SEC)

| Requirement | Description |
|-------------|-------------|
| NFR-SEC-001 | All data encrypted at rest (AES-256) |
| NFR-SEC-002 | All data encrypted in transit (TLS 1.3) |
| NFR-SEC-003 | Multi-factor authentication required |
| NFR-SEC-004 | Role-based access control (RBAC) |
| NFR-SEC-005 | Audit logging of all data access |
| NFR-SEC-006 | SOC 2 Type II certification |
| NFR-SEC-007 | Annual penetration testing |
| NFR-SEC-008 | No PII in logs |

### 5.4 Compliance (NFR-COMP)

| Requirement | Description |
|-------------|-------------|
| NFR-COMP-001 | PIPEDA compliant (Canadian privacy) |
| NFR-COMP-002 | Quebec Law 25 compliant (Quebec privacy) |
| NFR-COMP-003 | Data residency in Canada (ca-central-1) |
| NFR-COMP-004 | CCQ reporting format compliance |
| NFR-COMP-005 | CNESST reporting format compliance |
| NFR-COMP-006 | CRA tax reporting format compliance |

### 5.5 Scalability (NFR-SCALE)

| Requirement | Target |
|-------------|--------|
| NFR-SCALE-001 | Support 100 tenants on shared SaaS |
| NFR-SCALE-002 | Support 10,000 projects per tenant |
| NFR-SCALE-003 | Support 50,000 workers per tenant |
| NFR-SCALE-004 | Support 1M documents per tenant per year |
| NFR-SCALE-005 | Horizontal scaling of agent runtime |

### 5.6 Localization (NFR-L10N)

| Requirement | Description |
|-------------|-------------|
| NFR-L10N-001 | French (fr-CA) as primary language |
| NFR-L10N-002 | English (en-CA) as secondary language |
| NFR-L10N-003 | User language preference stored |
| NFR-L10N-004 | All UI labels localized |
| NFR-L10N-005 | All agent responses in user's language |
| NFR-L10N-006 | Documents generated in selected language |
| NFR-L10N-007 | Currency format: 1 234,56 $ (Quebec) |
| NFR-L10N-008 | Date format: YYYY-MM-DD or configurable |

### 5.7 Integration (NFR-INT)

| Requirement | Description |
|-------------|-------------|
| NFR-INT-001 | A2A protocol compliant agent cards |
| NFR-INT-002 | MCP server standard compliant tools |
| NFR-INT-003 | OData V4 for S/4HANA integration |
| NFR-INT-004 | RFC/BAPI support for ECC integration |
| NFR-INT-005 | REST API for external integrations |
| NFR-INT-006 | Webhook support for event notifications |

---

## 6. User Experience Requirements

### 6.1 Conversational Interface

#### UX-CONV-001: Natural Language Understanding

**Description**: Users interact with agents using natural language in French or English.

**Requirements**:
- Support conversational queries ("Prépare la facturation pour le projet Centre-Ville")
- Understand construction industry terminology in both languages
- Handle code-switching (mixing French and English in one sentence)
- Clarify ambiguous requests before executing
- Maintain context across multi-turn conversations

#### UX-CONV-002: Proactive Assistance

**Description**: Agents proactively surface relevant information and actions.

**Requirements**:
- Alert on upcoming deadlines (billing due, insurance expiry, training renewal)
- Suggest next actions based on context
- Highlight anomalies (cost overruns, schedule delays, compliance gaps)
- Summarize key metrics on request

### 6.2 Mobile Experience

#### UX-MOB-001: Offline-First Design

**Description**: Mobile app functions fully without connectivity.

**Requirements**:
- All field data entry works offline
- Data syncs automatically when connectivity restored
- Conflict resolution for concurrent edits
- Clear indication of sync status
- Queue management for pending uploads

#### UX-MOB-002: Field-Optimized Interface

**Description**: Mobile interface designed for construction site conditions.

**Requirements**:
- Large touch targets (glove-friendly)
- High contrast for outdoor visibility
- Voice input support for hands-free operation
- Quick photo capture with automatic tagging
- Minimal typing required (dropdowns, buttons, voice)

### 6.3 Web Portal

#### UX-WEB-001: SAP Fiori Design System

**Description**: Web interface follows SAP Fiori design principles.

**Requirements**:
- Consistent with SAP Fiori Launchpad experience
- Responsive design for desktop and tablet
- Role-based home pages
- Searchable and filterable lists
- Inline editing where appropriate

#### UX-WEB-002: Subcontractor Portal

**Description**: Self-service portal for subcontractors.

**Requirements**:
- Simple registration and onboarding
- Upload compliance documents
- Submit payment applications
- View payment status
- Access project information (limited)
- Available in French and English

---

## 7. Business Model

### 7.1 Pricing Tiers

| Tier | Monthly Base | Included Volume | Overage | Target Customer |
|------|--------------|-----------------|---------|-----------------|
| **Essentials** | $4,500 | 10 active projects, 100 users | $200/project, $20/user | Subcontractors <$20M |
| **Professional** | $9,500 | 30 active projects, 300 users | $150/project, $15/user | Mid-market $20-100M |
| **Enterprise** | $18,000 | 100 active projects, 1,000 users | $100/project, $10/user | Large GCs >$100M |
| **Regulated** | $35,000 | Unlimited | N/A | Banks, government contractors |

### 7.2 Add-On Modules

| Module | Monthly Price | Description |
|--------|---------------|-------------|
| Mobile Field Ops | $2,000 | iOS/Android apps for field crews |
| Subcontractor Portal | $1,500 | Self-service portal for subs |
| Document AI Premium | $0.08/page | High-accuracy extraction (vs. $0.03 standard) |
| Advanced Analytics | $2,500 | BI dashboards, predictive insights |
| Public Chain Anchoring | $1,000 | Blockchain audit trail (optional) |

### 7.3 Implementation Services

| Service | Duration | Price Range | Description |
|---------|----------|-------------|-------------|
| Assessment & Design | 3-4 weeks | $35,000 - $55,000 | Requirements, architecture, integration design |
| Pilot Implementation | 8-10 weeks | $75,000 - $120,000 | Single project deployment, training |
| Enterprise Rollout | 16-24 weeks | $150,000 - $350,000 | Multi-project, full integration, change management |
| Custom Development | Variable | $200/hour | Custom agents, integrations, reports |

### 7.4 Revenue Projections (Quebec Market)

| Year | Customers | ARR | Services | Total Revenue |
|------|-----------|-----|----------|---------------|
| 2027 | 8 | $900K | $480K | $1.38M |
| 2028 | 22 | $3.2M | $1.1M | $4.3M |
| 2029 | 45 | $7.5M | $2.1M | $9.6M |
| 2030 | 75 | $14.2M | $3.5M | $17.7M |

---

## 8. Go-to-Market Strategy

### 8.1 Target Account Prioritization

#### Tier 1 - Lighthouse Accounts (2027 Focus)

| Account | Revenue | SAP Status | Why First |
|---------|---------|------------|-----------|
| **Pomerleau** | $3B+ | S/4HANA | Largest GC in Quebec, innovation leader |
| **EBC Inc.** | $1B+ | ECC/S4 | Major infrastructure, government work |
| **Groupe Canam** | $1.5B | S/4HANA | Steel fabrication, ETO complexity |

**Strategy**: Land one lighthouse account with significant pilot investment; use as reference for rest of market.

#### Tier 2 - Fast Followers (2027-2028)

| Segment | # Targets | Characteristics |
|---------|-----------|-----------------|
| Mid-market GCs | 15-20 | $50-200M revenue, SAP or SAP-adjacent |
| Specialty Subcontractors | 30-40 | Electrical, mechanical, steel; must integrate with GC's SAP |
| Engineering Firms | 10-15 | Project delivery with ETO needs |

#### Tier 3 - Long-Tail (2028+)

| Segment | # Targets | Approach |
|---------|-----------|----------|
| Small Contractors | 200+ | Self-service onboarding, partner channel |
| Out-of-Quebec | 50+ | Ontario, Atlantic Canada expansion |

### 8.2 Sales Motion

1. **Lead with Pain**: "How much did you lose on change orders last year?" → Quantify the problem
2. **Demo the Agent**: Live demonstration of bilingual billing generation, CCQ validation
3. **Reference Hydro-Québec**: Large SAP customer that contractors must integrate with
4. **Pilot Proposal**: 3-month pilot on single project with success metrics
5. **Expand on Success**: Add modules, roll out to additional projects

### 8.3 Channel Strategy

| Channel | Role | Target Segment |
|---------|------|----------------|
| **Direct Sales** | Lighthouse accounts, enterprise | >$100M revenue |
| **SAP Partner Referral** | Lead generation, co-sell | All segments |
| **Implementation Partners** | Delivery, custom development | Enterprise |
| **Self-Service** | Essentials tier onboarding | <$50M revenue |

### 8.4 Marketing Approach

| Activity | Description | Investment |
|----------|-------------|------------|
| **CCQ Compliance Webinars** | Monthly webinars on CCQ compliance automation | $2K/month |
| **Construction Industry Events** | APCHQ, ACQ, CCA conferences | $25K/year |
| **SAP Events** | SAP NOW Toronto, SAP TechEd | $15K/year |
| **Content Marketing** | French-language blog, case studies, ROI calculators | $5K/month |
| **Reference Program** | Customer success stories, site visits | $10K/year |

---

## 9. Competitive Analysis

### 9.1 Direct Competitors

| Competitor | Strengths | Weaknesses | Our Advantage |
|------------|-----------|------------|---------------|
| **Procore** | Market leader, field ops | No SAP integration, no French UI, no CCQ | SAP native, Quebec compliance |
| **Sage 300 CRE** | Construction accounting | Legacy, no AI, no Joule | Modern AI agents, SAP ecosystem |
| **Oracle Primavera** | Enterprise scheduling | Complex, expensive, no Quebec features | Simpler, Quebec-focused |
| **Viewpoint Vista** | Mid-market construction | No SAP, no Quebec compliance | SAP integration, CCQ/CNESST |

### 9.2 Indirect Competitors

| Competitor | Threat Level | Mitigation |
|------------|--------------|------------|
| **SAP (future)** | High (2-3 years) | Build Quebec moat, establish references before SAP enters |
| **Custom Development** | Medium | Faster time to value, lower TCO, maintained product |
| **Status Quo (Excel)** | High | Quantify pain, show ROI |

### 9.3 Competitive Positioning

**Positioning Statement**:
> "For Quebec construction contractors who need to automate project delivery while maintaining CCQ and CNESST compliance, the Projet Québec Construction Agent is a bilingual AI platform that integrates natively with SAP. Unlike Procore or custom solutions, we combine construction industry expertise with SAP's enterprise infrastructure and Quebec regulatory knowledge."

---

## 10. Risk Assessment

### 10.1 Market Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| SAP releases competing agent | Medium (2-3 years) | High | Establish Quebec moat, lock in references |
| Economic downturn slows construction | Medium | Medium | Focus on ROI messaging, compliance value |
| Slow enterprise sales cycle | High | Medium | Start with mid-market, prove value quickly |

### 10.2 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Document AI accuracy insufficient | Medium | High | Hybrid approach (premium + human review) |
| CCQ/CNESST API changes | Medium | Medium | Dedicated compliance team, monitoring |
| ECC integration complexity | Medium | Medium | Extensive testing, adapter patterns |

### 10.3 Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Talent shortage (blockchain/AI/SAP) | High | Medium | Partner augmentation, training |
| Customer support scaling | Medium | Medium | Self-service tools, tiered support |
| Data residency compliance | Low | High | Canada-only infrastructure |

---

## 11. Success Metrics

### 11.1 Business Metrics

| Metric | Year 1 Target | Year 2 Target | Year 3 Target |
|--------|---------------|---------------|---------------|
| Customers Acquired | 8 | 22 | 45 |
| Annual Recurring Revenue | $900K | $3.2M | $7.5M |
| Net Revenue Retention | >100% | >110% | >115% |
| Customer Acquisition Cost | <$50K | <$40K | <$35K |
| Gross Margin | >70% | >75% | >80% |

### 11.2 Product Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Agent Accuracy | >95% | Correct response rate |
| Document Extraction Accuracy | >90% | Field-level accuracy |
| CCQ Validation Success Rate | >98% | Valid cards correctly identified |
| User Adoption | >80% | Monthly active users / licensed users |
| NPS | >50 | Quarterly survey |

### 11.3 Operational Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Uptime | >99.5% | Monthly availability |
| Support Response Time | <4 hours | First response (business hours) |
| Implementation Time (Pilot) | <10 weeks | Contract to go-live |
| Time to Value | <90 days | Contract to first measurable ROI |

---

## 12. Implementation Roadmap

### 12.1 Phase 1: Foundation (Q1-Q2 2027)

**Deliverables**:
- [ ] Core orchestrator agent with bilingual support
- [ ] Progress Billing Agent (AIA G702/G703)
- [ ] SAP PS MCP server (S/4HANA Public Cloud)
- [ ] SAP FI MCP server
- [ ] Basic web UI (Fiori Elements)
- [ ] Single-tenant deployment

**Milestone**: First pilot customer live on billing automation

### 12.2 Phase 2: Compliance & Documents (Q3 2027)

**Deliverables**:
- [ ] Compliance Agent (CCQ validation, CNESST basics)
- [ ] Document Intelligence Agent (change orders, contracts)
- [ ] Change Order Agent
- [ ] CCQ API integration
- [ ] Document AI Premium integration
- [ ] ECC adapter (BAPI/RFC)

**Milestone**: CCQ compliance automation live with pilot customer

### 12.3 Phase 3: Subcontractors & Mobile (Q4 2027)

**Deliverables**:
- [ ] Subcontractor Agent
- [ ] Subcontractor Portal (web)
- [ ] Mobile app (iOS/Android)
- [ ] Workforce Agent (time entry, CCQ cards)
- [ ] Offline capability
- [ ] Multi-tenant SaaS deployment

**Milestone**: Full platform GA release

### 12.4 Phase 4: Scale & Expand (2028)

**Deliverables**:
- [ ] Field Operations Agent
- [ ] Advanced analytics and dashboards
- [ ] SuccessFactors integration
- [ ] Additional document types (RFI, submittal, lien waiver)
- [ ] Partner certification program
- [ ] Ontario market expansion

**Milestone**: 20+ customers, $3M+ ARR

---

## 13. Team Requirements

### 13.1 Core Team (Phase 1-2)

| Role | Count | Key Skills |
|------|-------|------------|
| Product Manager | 1 | Construction industry, SAP, Quebec market |
| Tech Lead | 1 | Python, LangGraph, SAP BTP, A2A/MCP |
| Agent Developer | 2 | Python, LLM prompt engineering, Claude |
| SAP Integration Developer | 2 | ABAP, OData, Integration Suite, CAP |
| Full Stack Developer | 1 | UI5, React, TypeScript, CAP |
| QA Engineer | 1 | Test automation, construction domain |
| DevOps Engineer | 1 | SAP BTP, Kyma, CI/CD |

### 13.2 Extended Team (Phase 3-4)

| Role | Count | Key Skills |
|------|-------|------------|
| Mobile Developer | 1 | iOS (Swift), Android (Kotlin), SAP Mobile SDK |
| Document AI Specialist | 1 | OCR, ML, SAP Document AI |
| Compliance Specialist | 1 | CCQ, CNESST, Quebec construction law |
| Customer Success | 2 | Construction industry, SAP |
| Solution Architect | 1 | Enterprise architecture, SAP |
| Sales Engineer | 1 | Demo, POC, technical sales |

### 13.3 Partner Augmentation

| Capability | Partner Type | Purpose |
|------------|--------------|---------|
| SAP Integration | SAP Partner (Syntax, Talan) | Complex ECC integrations |
| Document AI Training | ML consultancy | Custom schema training |
| Legal/Compliance | Quebec construction lawyer | CCQ/CNESST compliance validation |
| French Content | Quebec translation firm | UI/document localization |

---

## 14. Appendices

### Appendix A: CCQ Trade Classifications

| Code | Trade (French) | Trade (English) | Hourly Rate (2026) |
|------|----------------|-----------------|-------------------|
| ELEC | Électricien | Electrician | $45.73 |
| PLOM | Plombier | Plumber | $46.21 |
| CHAU | Chaudronnier | Boilermaker | $47.84 |
| FERR | Ferblantier | Sheet Metal Worker | $44.92 |
| CHAR | Charpentier-menuisier | Carpenter | $42.15 |
| BRIC | Briqueteur-maçon | Bricklayer-Mason | $43.67 |
| PEIN | Peintre | Painter | $38.94 |
| GRUE | Grutier | Crane Operator | $48.52 |
| MECA | Mécanicien de machines lourdes | Heavy Equipment Mechanic | $46.78 |

*Note: Rates include base wage; employer contributions (pension, training, vacation, union) add ~35%*

### Appendix B: Quebec Holdback Rules

**Source**: Quebec Civil Code, Articles 2724-2728 (Construction Hypothec)

| Rule | Requirement |
|------|-------------|
| **Holdback Amount** | 10% of each progress payment |
| **Release Timing** | 45 days after substantial completion |
| **Lien Period** | 30 days after substantial completion to register |
| **Discharge** | Holdback released if no liens registered after 45 days |
| **Subcontractor Rights** | Subs can register hypothec directly against owner |

### Appendix C: CNESST Safety Requirements

**Key Reporting Requirements**:

| Report | Frequency | Due Date | Content |
|--------|-----------|----------|---------|
| Accident Report | Per incident | Within 24 hours | Injury details, cause, witnesses |
| Monthly Summary | Monthly | 15th of following month | Hours worked, incidents, near-misses |
| Annual Prevention Plan | Annual | January 31 | Risk assessment, training plan |
| Workplace Inspection | Per project | Before work starts | Hazard identification checklist |

### Appendix D: Document AI Schema Examples

**Change Order Extraction Schema (SAP Document AI Premium)**:

```json
{
  "schemaId": "qc-construction-change-order-v1",
  "fields": [
    {"name": "co_number", "type": "string", "required": true},
    {"name": "project_name", "type": "string", "required": true},
    {"name": "date", "type": "date", "required": true},
    {"name": "description_fr", "type": "text", "required": false},
    {"name": "description_en", "type": "text", "required": false},
    {"name": "amount", "type": "currency", "required": true},
    {"name": "time_extension_days", "type": "integer", "required": false},
    {"name": "contractor_signature", "type": "signature", "required": false},
    {"name": "owner_signature", "type": "signature", "required": false}
  ]
}
```

---

*Document Version: 2.0*
*Last Updated: November 8, 2026*
*Classification: Internal / Partner Business*
*Next Review: December 15, 2026*
