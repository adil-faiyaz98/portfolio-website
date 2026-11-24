

SAP BTP Mobile Access Platform

Unified SAP BTP-native platform replacing physical access cards with multi-modal mobile credentials across the full SAP enterprise landscape. The platform is composed of three integrated solution components: (1) a seven-agent AI suite handling credential lifecycle, visitor flows, security response, contractor access, amenity management, and compliance; (2) a company-branded mobile application for iOS and Android with NFC, biometric, facial scan, BLE, PIN, and QR credential modalities; and (3) a central admin portal with a CAP backend providing full RBAC policy management (profile → role → permission → time/zone/floor/building constraints). Covers HR lifecycle (SuccessFactors, S/4HANA all tiers), real estate lease lifecycle (SAP RE-FX), and contractor procurement (S/4HANA MM, Ariba, Fieldglass) — with a per-building SAP Advanced Event Mesh edge broker network for sub-10ms door decisions and reader-protocol abstraction across all hardware vendors.



Business Challenge

Enterprises managing physical access across multi-site, multi-system SAP landscapes rely on plastic access cards — a slow, costly, and insecure model with four distinct failure dimensions:





HR & Contractor Access Gap: When an employee is terminated or a contractor's PO closes, credential revocation takes hours or days via manual processes. Lost cards, cloning vulnerabilities, and lack of real-time audit trails create compliance exposure (Bill C-26, PIPEDA, ITAR).



Real Estate / PropTech Access Gap: When a lease is signed or ended in SAP RE-FX, physical building access for tenants is still set up manually — typically 3-5 days after lease activation. When a lease ends, former tenants frequently retain access due to lack of automated revocation.



Reader Hardware Fragmentation Gap: Enterprises run readers from HID, Wavelynx, Allegion, ASSA ABLOY, Suprema, Axis, and legacy Wiegand — each with different protocols (MQTT, OSDP, Wiegand, REST, BLE). No single system abstracts across all of them, forcing per-vendor integrations that multiply maintenance cost. Additionally, modern high-security deployments require multi-modal authentication: NFC tap, biometric fingerprint, facial recognition, PIN/security code, QR code scan, and BLE proximity — none of which are handled by a plastic card.



Administration & Policy Governance Gap: Access policy (who can enter which building, floor, zone, on which days, within which time windows, for how long, with what escort requirements) is managed manually in spreadsheets or siloed access control consoles — with no connection to the employee's organisational profile, role, or SAP HR data. Visitor access restrictions (specific day only, specific zones, max duration) are enforced manually at reception.

This platform resolves all four gaps with three integrated solution components deployed on SAP BTP: (1) a seven-agent AI suite handling credential lifecycle automation; (2) a company-branded mobile app supporting all authentication modalities; and (3) a central admin portal with a CAP backend providing full RBAC policy governance tied to the user's organisational profile in SAP. An edge broker network deployed per building ensures sub-10ms door decisions with 24-hour offline capability and full reader protocol abstraction.



Solution Components







#



Component



Type



Technology





1



AI Agent Suite



Pro-code Python AI agent (A2A)



SAP AI Core, SAP Advanced Event Mesh, 7 agents, 26+ MCP tools





2



Mobile Application



Native mobile app (iOS + Android)



React Native, CoreNFC, Android NFC API, Biometric SDK, BLE





3



Admin Portal + RBAC Engine



Web app + CAP backend



React + SAP UI5 Web Components, CAP Node.js, SAP HANA Cloud



Business Goals & Success Criteria







Metric



Baseline



Target



Timeline



Process / Capability



Source





Credential revocation time after employee termination



Hours / days (manual)



< 60 seconds



GA Q4 2027



Identity & Access Governance



user





Credential provisioning time for new hire



—



< 5 minutes (day-zero)



GA Q4 2027



Identity & Access Governance



user





Credential revocation time after lease end



3-5 days (manual)



< 60 seconds



GA Q4 2027



RE-FX Lease Lifecycle



user





Credential provisioning time after lease signed



3-5 days (manual)



< 5 minutes



GA Q4 2027



RE-FX Lease Lifecycle



user





Tap-to-unlock door decision (edge)



N/A (card swipe)



< 100ms



GA Q4 2027



Physical Access Control



user





Unauthorized access incidents



—



Measurable reduction



Q4 2027



Physical Security / Anomaly Detection



user





Audit compliance score



Manual, incomplete



Fully automated trail



Q4 2027



GRC / Compliance



user





Physical card program cost per user



~$20/user/year



Eliminated



Year 2+



Cost Reduction



user





Platform availability



—



99.9%



GA Q4 2027



Platform Operations



user





Edge offline operation



0 (no offline)



24 hours without WAN



GA Q4 2027



Physical Access Control



user





Admin policy change propagation time



Manual (hours)



< 60 seconds to edge cache



GA Q4 2027



RBAC Policy Governance



user





Access modalities supported



1 (physical card)



6 (NFC, biometric, facial, PIN, QR, BLE)



GA Q4 2027



Multi-Modal Authentication



user





Reader hardware vendors supported



1-2 (siloed)



All major vendors via protocol abstraction



GA Q4 2027



Reader Hardware Abstraction



user



Key Milestones





Event Received — SAP backend event arrives via Event Mesh (any landscape tier); canonical normalisation layer maps it to internal schema



Profile Resolved — Employee, tenant, contractor, or visitor record fetched; RBAC policy evaluated (role → permissions → zone/floor/building/time constraints)



Credential Actioned — Mobile credential provisioned or revoked in HID Origo; pass delivered to mobile app and Apple/Google Wallet; edge broker cache synced within 30 seconds



Access Decision Made — Authentication event (any modality: NFC, biometric, facial, PIN, QR, BLE) evaluated by edge broker from local RBAC cache in < 100ms; result published to cloud broker



Access Request Handled — Natural language access request processed by Orchestrator; RBAC policy evaluated; credential updated or escalated



Anomaly Raised — Suspicious access pattern detected (including cross-modality and behavioural baseline deviation); lockout activated; SIEM alert and ServiceNow incident raised



Admin Policy Applied — Administrator change in portal (zone assignment, time window, role permission) propagated to edge broker cache within 60 seconds



Compliance Delivered — Audit report generated; access review completed; fire code occupancy manifest available in real time



Business Architecture (RBA)

End-to-End Processes

Primary: Governance → Manage Identity and Access Governance Secondary: Recruit to Retire (HR lifecycle), Source to Pay (contractor procurement), Acquire to Decommission (RE-FX real estate)

Process Hierarchy

Governance (E2E)
└── Manage Governance, Risk and Compliance
    └── Manage Identity and Access Governance (BPS-399)
        └── Manage access governance and authorisations
        └── Manage authentication
        └── Enforce physical access policy (custom)

Recruit to Retire (secondary)
└── Employee lifecycle events (hire, transfer, leave/start, leave/end, terminate)

Source to Pay (secondary)
└── Contractor PO lifecycle (created, released, closed)
└── Vendor validation (Ariba, Fieldglass)

Acquire to Decommission (secondary — RE-FX)
└── Manage Real Estate Leases
    └── Lease signed → provision tenant credential
    └── Lease amended → update zones
    └── Lease ended → revoke tenant credential
    └── Lease renewed → extend credential


Summary

The core process is BPS-399 (Manage Identity and Access Governance), triggered by three parallel lifecycle streams: employee events from Recruit to Retire, contractor PO events from Source to Pay, and lease lifecycle events from Acquire to Decommission (RE-FX). The agent suite enforces real-time physical access decisions as the runtime enforcement point for identity governance policy across all three streams.



Fit Gap Analysis







Requirement



Standard Asset(s) Found



API ORD ID



MCP Server ORD ID



MCP Server Version



Webhook API ORD ID



Gap?



Notes





User authentication & federation



SAP Cloud Identity Services (IAS)



—



—



—



—



No



SC1579 reuse; covers admin SSO and user federation





Identity provisioning / sync



Identity Provisioning (IPS)



—



—



—



—



Partial



SC1575 covers digital IDP sync; physical credential provisioning is custom





Access governance & risk



SAP Cloud Identity Access Governance



—



—



—



—



Partial



SC1569 covers digital access risk; physical zone policy is custom





Employee lifecycle events (SuccessFactors)



—



sap.sf:apiResource:EmployeeCentralEC:v1 (unavailable)



—



—



—



Yes



SF APIs unavailable; Event Mesh-driven integration required





Employee profile fetch



—



sap.sf:apiResource:ECEmploymentInformation:v1 (unavailable)



—



—



—



Yes



Custom MCP tool sf_get_employee required





Contractor PO events (S/4 MM)



—



—



—



—



—



Yes



Custom Event Mesh topic + s4_get_contractor_po MCP tool





RE-FX lease lifecycle events



—



—



—



—



—



Yes



Custom Event Mesh topics for lease signed/amended/ended/renewed





RE-FX lease details fetch



—



—



—



—



—



Yes



Custom MCP tool read_lease (RE-FX OData)





RE-FX tenant / space / zone data



—



—



—



—



—



Yes



Custom MCP tools read_tenant, read_space (RE-FX OData)





Visitor pre-registration & approval



—



—



—



—



—



Yes



Custom Visitor Agent + send_visitor_credential, notify_host MCP tools





Amenity booking & access



—



—



—



—



—



Yes



Custom Amenity Agent + book_amenity, access_package_room MCP tools





Mobile credential provisioning (HID Origo)



—



—



—



—



—



Yes



Custom MCP tool hid_provision_credential





Mobile credential revocation (HID Origo)



—



—



—



—



—



Yes



Custom MCP tool hid_revoke_credential





Edge broker credential cache sync



—



—



—



—



—



Yes



Custom sync_to_edge MCP tool; SAP Advanced Event Mesh edge broker





Apple Wallet pass delivery



—



—



—



—



—



Yes



Custom MCP tool apple_wallet_push (PKPass + APN)





Google Wallet pass delivery



—



—



—



—



—



Yes



Custom MCP tool google_wallet_push (Google Pay API)





Zone access policy evaluation



—



—



—



—



—



Yes



Custom MCP tool evaluate_zone_access





Anomaly detection



SAP AI Core (P1)



—



—



—



—



Partial



AI Core for model hosting; detection patterns are custom





Audit logging & compliance



SAP HANA Cloud



—



—



—



—



Partial



HANA Cloud as audit store; GRC integration is custom





Long-term audit analytics



SAP Datasphere / DWC



—



—



—



—



Partial



iFlow AccessEventToAudit feeds Datasphere





Legacy connectivity (ECC, on-prem)



SAP Integration Suite



—



—



—



—



Partial



iFlow templates required; agent core is landscape-agnostic





Security event forwarding (SIEM)



—



—



—



—



—



Yes



Custom syslog / REST adapter (Splunk / Microsoft Sentinel)





Incident & request management



ServiceNow



—



—



—



—



Yes



Custom REST integration





Compliance dashboards



SAP Analytics Cloud



—



—



—



—



Partial



SAC for reporting; data pipelines custom





A2A / Joule integration



SAP Joule (via A2A protocol)



—



—



—



—



Partial



Agent cards published via Integration Suite API Management; Joule chat interface





Mobile application (iOS + Android)



—



—



—



—



—



Yes



Full custom: React Native, CoreNFC, Android NFC, biometric SDK, BLE, company branding





Multi-modal authentication (biometric, facial, PIN, QR, BLE)



—



—



—



—



—



Yes



Custom modality normaliser on edge broker; reader hardware SDK integrations





Reader protocol abstraction (MQTT, OSDP, Wiegand, REST, BLE)



—



—



—



—



—



Yes



Custom edge broker protocol adapters per vendor; canonical tap event schema





RBAC policy engine (profile → role → permission → constraints)



—



—



—



—



—



Yes



Custom CAP Node.js service + HANA Cloud data model; no SAP standard covers physical zone RBAC





Admin portal (web UI for policy management)



SAP Build Apps (partial)



—



—



—



—



Partial



SAP Build Apps could scaffold UI but RBAC domain logic and CAP backend are custom





Behavioural baseline anomaly detection



SAP AI Core (partial)



—



—



—



—



Partial



AI Core hosts model; per-user baseline learning and access pattern analytics are custom





Access pattern analytics (heatmaps, velocity scoring)



SAP Analytics Cloud



—



—



—



—



Partial



SAC for visualisation; access pattern data pipeline is custom

Key Findings





SAP Cloud Identity Services (IAS/IPS) and SAP Cloud Identity Access Governance are reusable for authentication and digital access governance; physical credential management and RE-FX lease-driven access are full custom builds.



All SuccessFactors APIs are unavailable in the current environment — HR integration must be entirely Event Mesh-driven with canonical normalisation.



SAP RE-FX lease lifecycle events (signed, amended, ended, renewed) are the second major event stream — no standard MCP server exists; full custom integration required.



SAP Advanced Event Mesh (not standard Event Mesh) is required for edge broker deployment, MQTT 5.0 support, and sub-10ms door decision latency.



Six specialised agents (Orchestrator, Credential, Visitor, Security, Contractor, Amenity, Compliance = 7 total) coordinate via A2A protocol and expose agent cards through SAP Integration Suite API Management for Joule integration.



All SAP landscape tiers are in scope for this release — no phasing: S/4HANA Public Cloud, Private Cloud/RISE, On-Premise, SAP ECC, SAP Ariba, SAP Fieldglass, SAP RE-FX.



Three new components added to this release: Mobile Application (React Native, full multi-modal auth), Admin Portal + RBAC Engine (CAP Node.js + HANA Cloud), and Reader Protocol Abstraction Layer (edge broker adapters for MQTT, OSDP, Wiegand, REST, BLE).



The RBAC engine is the authoritative policy store: profile → role → role permissions → access constraints (building, floor, zone, time window, day-of-week, max duration, escort required). The evaluate_zone_access MCP tool queries the RBAC engine, not a hardcoded rule set.



Multi-modal authentication events (NFC, biometric, fingerprint, facial, PIN, QR, BLE) are normalised at the edge broker into the canonical ACCESS_AUTH_EVENT schema with a modality field before cloud processing — the agent never branches on modality type.



Idempotency (dedup by correlation ID), HSM-bound credential keys, async event processing, multi-tenant SaaS design, and 24-hour edge offline operation are locked-in architectural constraints.



Recommendations

SAP BTP Mobile Access Platform — Full Enterprise Coverage, Single Release

Executive Summary

Pro-code Python AI agent suite (A2A protocol) on SAP BTP with edge broker network, covering HR, procurement, and real estate lifecycle in one release.

Recommended Solution

A pro-code Python AI agent suite (A2A protocol) deployed on SAP AI Core / SAP BTP, composed of seven specialised agents coordinated by an Orchestrator, backed by SAP Advanced Event Mesh with per-building edge brokers.

Agent Suite:





Orchestrator Agent (proptech-orchestrator) — Routes natural language requests from Joule or direct API to the correct specialist agent. Maintains conversation context. Escalates to human when confidence is below threshold. Publishes A2A agent card via Integration Suite.



Credential Agent (proptech-credential) — Manages the full credential lifecycle triggered by HR events (SuccessFactors, all S/4HANA tiers, ECC) and RE-FX lease events. Provisions and revokes NFC credentials in HID Origo, delivers passes to Apple/Google Wallet, syncs credential cache to edge brokers. SLA: < 5 min provision, < 60 sec revoke.



Visitor Agent (proptech-visitor) — Pre-registers visitors on behalf of tenants, manages approval workflows, issues time-bound credentials, notifies hosts on arrival, and handles walk-in registration. Triggered by tenant request via Joule or mobile app.



Security Agent (proptech-security) — Detects anomalous access patterns (after-hours, impossible travel, excessive denials, expired lease attempts), activates temporary lockouts, investigates anomalies, publishes security alerts to SIEM, and handles emergency lockout/unlock flows.



Contractor Agent (proptech-contractor) — Grants PO-linked temporary access for vendors and contractors. Validates PO and vendor status in S/4HANA MM. Auto-expires access when PO closes. Communicates with SAP Procurement Agent via A2A.



Amenity Agent (proptech-amenity) — Manages building amenity access (gym, pool, conference rooms, package room, parking, rooftop). Books amenities with integrated access grant. Tracks usage for billing via RE-FX.



Compliance Agent (proptech-compliance) — Generates access audit reports (all_access, denied, after_hours, visitor, contractor), runs quarterly access reviews, detects orphaned credentials, tracks real-time occupancy for fire code compliance, and communicates with SAP Audit Agent via A2A.

Edge Architecture:





SAP Advanced Event Mesh edge broker deployed per building (containerised Solace PubSub+, 4 vCPU / 8GB RAM, HA active-standby)



Local credential cache refreshed every 5 minutes or on credential change event



Door readers connect via MQTT 5.0 (port 8883 TLS); cloud broker via AMQP 1.0 over TLS



Edge decision flow: MQTT tap → local cache lookup → zone + time rule evaluation → GRANT/DENY to reader — all in < 10ms



24-hour offline operation: events buffered locally and delivered to cloud on WAN recovery

SAP Platform Services (all in scope): SAP Advanced Event Mesh (P0), SAP Cloud Identity Services (P0), SAP HANA Cloud (P0), SAP Integration Suite (P0 — iFlows + API Management), SAP AI Core (P1), SAP Analytics Cloud / Datasphere (P2).

External Integrations (all in scope): HID Origo REST API, Apple PassKit + APN, Google Wallet API, HID Signo / Wavelynx / Allegion / ASSA ABLOY door readers (via HID Origo OSDP/Wiegand/MQTT), SIEM (Splunk / Microsoft Sentinel), SAP GRC, ServiceNow.

Problem Statement

Two parallel manual processes create physical security gaps in SAP-managed enterprises: (1) HR and contractor credential management is batch-driven, leaving terminated employees with active access for hours or days; (2) RE-FX lease management has no automated bridge to building access control, creating 3-5 day provisioning delays and persistent access after lease end. No existing vendor offers a unified, SAP-native solution addressing both gaps with real-time automation.

Affected User Roles





Facilities / Physical Security Manager



Property Manager (RE-FX lease owner)



IT Security / CISO



HR Administrator (SuccessFactors)



Contractor / Procurement Manager (S/4HANA MM)



Compliance / GRC Officer



Building Tenant (company or individual — mobile credential holder)



Employee (mobile credential holder)



Contractor / Vendor (temporary credential holder)



Visitor (time-bound credential holder)

Important Factors

Landscape-Agnostic Abstraction Layer

All inbound events — regardless of source (SuccessFactors, S/4 Public/Private/On-Premise, ECC, Ariba, Fieldglass, RE-FX) — are normalised to a canonical internal schema before reaching agent reasoning. Agent core logic never changes based on the customer's SAP deployment tier.

SAP Advanced Event Mesh — Edge + Cloud Topology

Standard SAP Event Mesh (cloud-only, ~100-500ms) is insufficient for door decisions. SAP Advanced Event Mesh provides: edge broker deployment (sub-10ms local decisions), MQTT 5.0 for IoT devices, 100,000+ events/sec throughput, full event replay, and 24-hour offline edge operation. This is a non-negotiable architectural choice.

Sub-60-Second Revocation + Sub-5-Minute Provisioning SLAs

Both SLAs are market differentiators. Async event processing ensures SAP transactions are never blocked. Idempotency via correlation ID deduplication handles duplicate events gracefully. Edge cache sync (< 30 sec) ensures revocations propagate before the next tap.

RE-FX Lease Lifecycle as First-Class Event Stream

SAP RE-FX lease events (signed, amended, ended, renewed) are treated as equal-priority event triggers alongside HR events. The Credential Agent maps lease space assignments to building zones for automatic zone entitlement.

A2A Protocol and Joule Integration

All seven agents publish A2A agent cards via SAP Integration Suite API Management (GET /agents/.well-known/agent.json). The Orchestrator accepts requests from the Joule chat interface and routes to specialist agents. Inter-agent communication (e.g. Contractor Agent ↔ SAP Procurement Agent, Compliance Agent ↔ SAP Audit Agent) follows the A2A protocol.

Multi-Tenant SaaS from Day One

Tenant isolation in HANA Cloud schemas, per-tenant Event Mesh namespaces, and per-tenant HID Origo configuration. Data residency starts in Canada (PIPEDA / Bill C-26) with design for international expansion. Commercial tiers: Starter / Professional / Enterprise / Critical Infrastructure.

Full SAP Landscape Coverage in Single Release

All SAP source system tiers in scope: S/4HANA Public Cloud (Event Mesh native), S/4HANA Private Cloud/RISE (Cloud Connector), S/4HANA On-Premise and SAP ECC (Integration Suite iFlows + Cloud Connector), SAP Ariba and SAP Fieldglass (Event Mesh), SAP RE-FX (all deployment models).

Potential Risks

Apple / Google Platform Policy Changes

Wallet APIs controlled by Apple and Google. Mitigation: support both ecosystems; HID Origo is credential authority, not wallet provider.

SAP Advanced Event Mesh Edge Deployment Complexity

Edge broker requires on-premise appliance or VM per building. Mitigation: managed edge service offering; cloud-only fallback option (higher latency, reduced SLA).

Legacy SAP Landscape (ECC / On-Prem) Integration Variance

iFlow templates and Cloud Connector configuration vary per customer. Mitigation: certified iFlow templates + landscape assessment playbook as implementation service deliverable.

HSM Procurement and Key Management

Credential private keys in HSM — customers must provision compatible infrastructure. Mitigation: document supported options (SAP Data Custodian, AWS CloudHSM, Azure Dedicated HSM) in pre-sales.

Privacy, Union, and PIPEDA Concerns

Real-time zone tracking raises employee monitoring concerns. Mitigation: privacy-by-design (data minimisation, configurable retention), PIPEDA certification, union engagement guide.

SAP Builds Competing Solution

SAP already uses Apple Wallet internally (Waldorf campus). Risk SAP productises this. Mitigation: speed to market (Q4 2027 GA), deep RE-FX integration (SAP does not currently expose RE-FX as a product in this space), design partner lock-in.

Recommended Solution Category

AI Agent, Mobile Application, CAP Application (Admin Portal + RBAC Engine)

Intent Fit

99%





Appendix A: Agent Inventory







Agent ID



Agent Name



Primary Responsibility



SAP Integration



A2A Peers





proptech-orchestrator



Orchestrator



Route NL requests, aggregate responses, Joule interface



All systems



All agents





proptech-credential



Credential Agent



Full credential lifecycle (provision, revoke, extend, recover)



RE-FX, SuccessFactors, S/4 MM



Orchestrator





proptech-visitor



Visitor Agent



Pre-registration, approval workflows, time-bound access



RE-FX (tenant lookup)



Orchestrator





proptech-security



Security Agent



Anomaly detection, lockouts, security alerts, SIEM



All systems



Orchestrator, Credential





proptech-contractor



Contractor Agent



PO-linked access, vendor validation, auto-expiry



S/4HANA MM, Ariba, Fieldglass



Orchestrator, SAP Procurement Agent





proptech-amenity



Amenity Agent



Amenity booking + access, usage billing



RE-FX, S/4 Billing



Orchestrator





proptech-compliance



Compliance Agent



Audit reports, access reviews, fire code, occupancy



All systems



Orchestrator, SAP Audit Agent



Appendix B: Event Mesh Topics (Full)







Direction



Topic



Trigger



Consumer Agent





Inbound



sap/successfactors/employee/hired



New employee



Credential Agent





Inbound



sap/successfactors/employee/terminated



Termination → revoke < 60s



Credential Agent





Inbound



sap/successfactors/employee/transferred



Transfer → re-evaluate zones



Credential Agent





Inbound



sap/successfactors/employee/leave/start



Leave → suspend credential



Credential Agent





Inbound



sap/successfactors/employee/leave/end



Return → reinstate credential



Credential Agent





Inbound



sap/s4/mm/purchaseorder/created



Contractor PO → provisional access



Contractor Agent





Inbound



sap/s4/mm/purchaseorder/released



PO approved → activate access



Contractor Agent





Inbound



sap/s4/mm/purchaseorder/closed



PO closed → revoke contractor



Contractor Agent





Inbound



sap/refx/lease/signed



Lease signed → provision tenant



Credential Agent





Inbound



sap/refx/lease/amended



Lease amended → update zones



Credential Agent





Inbound



sap/refx/lease/ended



Lease ended → revoke tenant < 60s



Credential Agent





Inbound



sap/refx/lease/renewed



Lease renewed → extend credential



Credential Agent





Inbound



sap/sf/employee/hired



SF alternative topic



Credential Agent





Inbound



sap/sf/employee/terminated



SF alternative topic



Credential Agent





Inbound



proptech/+/access/tap



All NFC tap events



Security Agent, Compliance Agent





Inbound



proptech/+/access/denied



Failed access attempt



Security Agent





Inbound



proptech/+/package/delivered



Package delivered → notify tenant



Amenity Agent





Outbound



mobile-access/credential/provisioned



Confirmation to downstream



All consumers





Outbound



mobile-access/credential/revoked



Audit trail event



All consumers





Outbound



mobile-access/anomaly/detected



Alert security dashboard + SIEM



Security Dashboard





Outbound



proptech/{buildingId}/credential/provisioned



Building-scoped confirmation



Compliance Agent





Outbound



proptech/{buildingId}/credential/revoked



Building-scoped revocation



Compliance Agent





Outbound



proptech/{buildingId}/visitor/registered



Visitor registered



Visitor Agent





Outbound



proptech/{buildingId}/visitor/arrived



Host notification



Visitor Agent





Outbound



proptech/{buildingId}/anomaly/detected



Security alert



Security Agent





Outbound



proptech/{buildingId}/lockout/activated



Lockout event



Security Agent





Outbound



proptech/{buildingId}/contractor/access-granted



Contractor access



Contractor Agent





Outbound



proptech/{buildingId}/contractor/access-revoked



Contractor revocation



Contractor Agent





Outbound



proptech/{buildingId}/amenity/booked



Booking confirmation



Amenity Agent





Outbound



proptech/{buildingId}/amenity/usage



Billing data



Amenity Agent





Outbound



proptech/{buildingId}/compliance/review-completed



Review done



Compliance Agent





Outbound



proptech/{buildingId}/compliance/violation-detected



Policy violation



Compliance Agent





Outbound



proptech/{buildingId}/compliance/occupancy-alert



Fire code alert



Compliance Agent



Appendix C: MCP Tool Contracts (Full)







Tool



Agent



Purpose



Key Inputs



Key Outputs





hid_provision_credential



Credential



Create credential in HID Origo



user_id, zone_ids, valid_from, valid_to, credential_type



credential_id, status





hid_revoke_credential



Credential



Instant revocation



credential_id, reason, revoked_by



revocation_timestamp, status





apple_wallet_push



Credential



Deliver PKPass to Apple Wallet



credential_id, device_token, pass_template



pass_serial, delivery_status





google_wallet_push



Credential



Deliver pass to Google Wallet



credential_id, google_account, pass_class



pass_id, delivery_status





sync_to_edge



Credential



Sync credential to edge broker cache



credential_id, building_id



sync_status, edge_broker_id





sf_get_employee



Credential



Fetch employee from SuccessFactors



employee_id



name, role, department, manager, status





s4_get_contractor_po



Contractor



Get contractor PO from S/4HANA MM



po_number



contractor_id, valid_from, valid_to, site_ids, status





read_lease



Credential



Read lease details from RE-FX



lease_id



tenant_id, building_id, zones, valid_from, valid_to





read_tenant



Credential / Visitor



Read tenant master from RE-FX



tenant_id



name, contact, unit, building_id





read_space



Credential



Read space / zone assignments from RE-FX



space_id



zone_ids, building_id, floor, access_profile





evaluate_zone_access



Authorization



Policy engine — user-to-zone check



user_id, zone_id, timestamp



allowed (bool), reason, risk_score





validate_po



Contractor



Verify PO is active and valid



po_id



valid (bool), status, expiry





validate_vendor



Contractor



Check vendor is approved and not blocked



vendor_id



approved (bool), risk_level





send_contractor_credential



Contractor



Send time-restricted credential



contractor_id, building_id, zones, valid_from, valid_to



credential_id, delivery_status





lookup_tenant



Visitor



Find tenant by name or unit



name or unit_id



tenant_id, contact





send_visitor_credential



Visitor



Send temporary credential via email/SMS



visitor_email, valid_from, valid_to, zones



credential_id, delivery_status





notify_host



Visitor



Notify tenant that visitor has arrived



tenant_id, visitor_name, location



notification_status





book_amenity



Amenity



Reserve amenity with access grant



tenant_id, amenity_type, date, start_time, duration



booking_id, credential_id





access_package_room



Amenity



One-time access for package retrieval



tenant_id, package_id, locker_number



access_token, valid_until





generate_audit_report



Compliance



Generate compliance report



building_id, report_type, start_date, end_date, format



report_url, record_count





run_access_review



Compliance



Identify orphaned / incorrect credentials



building_id, review_scope



orphaned_count, violations, review_id





route_to_agent



Orchestrator



Route NL request to specialist agent



request_text, context



agent_id, routed_request





aggregate_responses



Orchestrator



Combine multi-agent responses



agent_responses[]



unified_response





escalate_to_human



Orchestrator



Flag request for human review



request_id, reason, confidence



escalation_id, assigned_to





emergency_lockout



Security



Revoke all credentials for a person



person_id, reason, scope



lockout_id, credentials_revoked





investigate_anomaly



Security



Analyse unusual access pattern



anomaly_id, credential_id, building_id



findings, risk_level, recommended_action





unlock_lockout



Security



Restore access after investigation



person_id, investigation_notes



unlock_status, credential_id



Appendix D: Integration Suite iFlows







iFlow



Source Topic



Target



Purpose





LeaseToCredential



sap/refx/lease/signed



Credential Agent (provision-credential skill)



Map lease fields to credential request





LeaseEndedToRevoke



sap/refx/lease/ended



Credential Agent (revoke-credential skill)



SLA < 60 seconds





LeaseAmendedToUpdate



sap/refx/lease/amended



Credential Agent



Zone update





POToContractorAccess



sap/s4/po/approved



Contractor Agent (grant-contractor-access skill)



Filter: PO category = SERVICE AND building_access = true





TerminationToRevoke



sap/sf/employee/terminated



Credential Agent (revoke-credential skill)



SLA < 60 seconds





AccessEventToAudit



proptech/+/access/+



SAP Datasphere / DWC



Long-term audit storage and analytics





ECCHiringEvent



RFC/BAPI via Cloud Connector



Event Mesh (normalised to sap/successfactors/employee/hired)



ECC HCM on-premise → canonical event





ECCTerminationEvent



RFC/BAPI via Cloud Connector



Event Mesh (normalised to sap/successfactors/employee/terminated)



ECC HCM on-premise → canonical event



Appendix E: Non-Negotiable Architectural Constraints







Constraint



Value



Rationale





Revocation SLA



< 60 seconds end-to-end



Primary market differentiator





Provisioning SLA



< 5 minutes day-zero



Day-zero access promise





Door decision latency (edge)



< 100ms (< 10ms edge target)



User experience at door





Offline NFC credential



Device-bound (Secure Element)



Works without network





Credential key storage



HSM only — never in BTP



Security non-negotiable





Edge offline operation



24 hours



Business continuity





Data residency



Canada initially



PIPEDA / Bill C-26





Event processing



Async — never blocks SAP transactions



SAP system integrity





Idempotency



Dedup by correlation ID



Handles duplicate events gracefully





Multi-tenancy



Tenant isolation from day one



SaaS commercial model





Landscape abstraction



Canonical event normalisation layer



Agent core is landscape-agnostic





Event Mesh tier



SAP Advanced Event Mesh (not standard)



Edge broker + MQTT + sub-10ms latency





A2A protocol



All agents publish agent cards



Joule integration + inter-agent communication



Appendix F: Reader Hardware & Protocol Abstraction Matrix







Vendor



Product Line



Protocol



Modalities Supported



Priority





HID Global



Signo R10/R40



MQTT 5.0, OSDP v2



NFC, Biometric (R40), BLE



P1





Wavelynx



Ethos



MQTT 5.0



NFC, BLE



P1





Suprema



BioEntry W3



OSDP v2, TCP/IP



Biometric (fingerprint + face)



P1





Axis Communications



A1610



REST / VAPIX



Facial recognition, QR, PIN



P1





Allegion



Schlage AD-400



MQTT, OSDP v2



NFC, PIN



P2





ASSA ABLOY



Aperio



MQTT



NFC, BLE



P2





Legacy readers



Any Wiegand



Wiegand (bridged via OSDP converter)



Card / PIN



P3





Brivo



Smart Readers



REST



NFC, PIN, QR



P3

Edge Broker Protocol Adapters (all normalise to canonical ACCESS_AUTH_EVENT):







Protocol



Adapter



Reader Vendors





MQTT 5.0



Native SAP AEM MQTT listener



HID Signo, Wavelynx, Allegion





OSDP v2



OSDP-to-MQTT bridge on edge broker



HID Signo, Suprema, Allegion





Wiegand



Wiegand-to-OSDP converter → OSDP adapter



All legacy readers





REST / HTTP



Edge broker REST ingestion endpoint



Axis, Brivo





BLE



BLE-to-MQTT gateway



HID Signo, Wavelynx, ASSA ABLOY



Appendix G: Multi-Modal Authentication Schema

All authentication events, regardless of modality, are normalised to:

{
  "eventId": "uuid",
  "eventType": "access.auth.granted | access.auth.denied",
  "modality": "nfc | biometric_fingerprint | facial | pin | qr | ble | nfc+biometric | nfc+facial",
  "timestamp": "ISO 8601",
  "building": { "id": "string", "name": "string" },
  "reader": { "id": "string", "zone": "string", "type": "door|elevator|parking|amenity|turnstile" },
  "credential": { "id": "string", "type": "employee|contractor|tenant|visitor", "holderId": "string" },
  "decision": { "result": "granted|denied", "reason": "string", "processingTimeMs": 0, "decisionSource": "edge-cache|cloud-lookup" },
  "biometricConfidence": 0.0,
  "faceMatchScore": 0.0
}


Zone policy can require multi-factor modality combinations (e.g. critical infrastructure zones require nfc+biometric or nfc+facial).



Appendix H: RBAC Data Model

UserProfile (from SAP HR / SuccessFactors / RE-FX)
└── assigned_roles: [Role]

Role
├── role_id: string
├── role_name: string (e.g. "Engineer - Level 2", "Contractor - Vendor A", "Tenant - Suite 3A")
├── role_type: employee | contractor | tenant | visitor
└── permissions: [RolePermission]

RolePermission
├── permission_id: string
├── building_ids: [string]           # allowed buildings
├── floor_ids: [string]              # allowed floors within buildings
├── zone_ids: [string]               # allowed zones (granular)
├── denied_zone_ids: [string]        # explicit deny (overrides allow)
├── time_windows: [TimeWindow]       # allowed time ranges
├── day_of_week: [Mon|Tue|Wed|Thu|Fri|Sat|Sun]
├── valid_from: ISO 8601
├── valid_to: ISO 8601
├── max_duration_minutes: int | null  # visitor / contractor max stay
├── requires_escort: bool            # critical zones
├── required_modality: string        # e.g. "nfc+biometric" for labs
└── special_flags: [string]          # e.g. "after_hours_approved", "itar_cleared"

TimeWindow
├── start_time: HH:MM
└── end_time: HH:MM




Appendix I: Admin Portal Key Features







Feature



Description





User Management



Search users by employee ID, name, or role; view active credentials and access history





Role Management



Create/edit roles with full permission constraint sets





Zone Assignment



Drag-and-drop building floor plan with zone mapping; assign zones to roles





Time & Day Policy



Configure time windows and day-of-week constraints per role/zone combination





Visitor Policy



Per-visitor or per-tenant template: allowed zones, max duration, specific date only





Real-Time Dashboard



Who is in which zone now; active credentials count; anomaly alerts; SLA performance





Access Pattern Analytics



Heatmaps per zone/floor/building; access velocity; unusual pattern highlights





Bulk Operations



Mass role update, mass revocation (requires CISO approval for > 50 users)





Policy Change Log



Immutable audit trail of every admin action with before/after state





Edge Sync Status



Per-building cache freshness, offline status, last sync timestamp



Appendix J: Mobile Application Key Features







Feature



Platform



Description





NFC Digital Badge



iOS + Android



Company-branded NFC credential; tap to enter at any compatible reader





Biometric Auth



iOS (Face ID / Touch ID) + Android



Biometric unlock for high-security zone entry combined with NFC





Facial Scan



iOS + Android



Camera-based facial recognition for readers equipped with facial scan capability





BLE Proximity



iOS + Android



Hands-free door unlock via Bluetooth Low Energy for enrolled users





PIN / Security Code



iOS + Android



Fallback authentication when biometric unavailable





QR Code Fallback



iOS + Android



QR display for readers without NFC (visitor fallback, legacy readers)





Credential Status



iOS + Android



View all active credentials, zones, valid dates, and assigned buildings





Access Notifications



iOS + Android



Push notification on entry grant, denial, and anomaly alerts





Self-Service



iOS + Android



Report lost device (triggers immediate credential suspension), request access





Visitor Pass Sharing



iOS + 