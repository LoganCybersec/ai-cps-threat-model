(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }
    if (root) {
        root.THREAT_CONTENT = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    const REFERENCE_LIBRARY = Object.freeze({
        ros2_tm: {
            title: 'ROS 2 Robotic Systems Threat Model',
            url: 'https://design.ros2.org/articles/ros2_threat_model.html'
        },
        ros2_security: {
            title: 'ROS 2 Security Overview',
            url: 'https://docs.ros.org/en/rolling/Tutorials/Advanced/Security/Introducing-ros2-security.html'
        },
        rsf: {
            title: 'Robot Security Framework (RSF)',
            url: 'https://arxiv.org/abs/1806.04042'
        },
        rvss: {
            title: 'Robot Vulnerability Scoring System (RVSS)',
            url: 'https://arxiv.org/abs/1807.10357'
        },
        owasp_risk: {
            title: 'OWASP Risk Rating Methodology',
            url: 'https://owasp.org/www-community/OWASP_Risk_Rating_Methodology'
        },
        owasp_api_top10: {
            title: 'OWASP API Security Top 10',
            url: 'https://owasp.org/API-Security/'
        },
        owasp_api_bola: {
            title: 'OWASP API1:2023 Broken Object Level Authorization',
            url: 'https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/'
        },
        owasp_api_auth: {
            title: 'OWASP API2:2023 Broken Authentication',
            url: 'https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/'
        },
        owasp_api_resource: {
            title: 'OWASP API4:2023 Unrestricted Resource Consumption',
            url: 'https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/'
        },
        owasp_api_misconfig: {
            title: 'OWASP API8:2023 Security Misconfiguration',
            url: 'https://owasp.org/API-Security/editions/2023/en/0xa8-security-misconfiguration/'
        },
        owasp_api_inventory: {
            title: 'OWASP API9:2023 Improper Inventory Management',
            url: 'https://owasp.org/API-Security/editions/2023/en/0xa9-improper-inventory-management/'
        },
        owasp_rest_cheat: {
            title: 'OWASP REST Security Cheat Sheet',
            url: 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html'
        },
        owasp_auth_cheat: {
            title: 'OWASP Authentication Cheat Sheet',
            url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'
        },
        owasp_secrets_cheat: {
            title: 'OWASP Secrets Management Cheat Sheet',
            url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html'
        },
        owasp_logging_cheat: {
            title: 'OWASP Logging Cheat Sheet',
            url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html'
        },
        owasp_llm_top10: {
            title: 'OWASP Top 10 for LLM Applications',
            url: 'https://genai.owasp.org/llm-top-10/'
        },
        owasp_llm01: {
            title: 'OWASP LLM01: Prompt Injection',
            url: 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/'
        },
        owasp_llm02: {
            title: 'OWASP LLM02: Sensitive Information Disclosure',
            url: 'https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/'
        },
        owasp_llm03: {
            title: 'OWASP LLM03: Supply Chain',
            url: 'https://genai.owasp.org/llmrisk/llm032025-supply-chain/'
        },
        owasp_llm04: {
            title: 'OWASP LLM04: Data and Model Poisoning',
            url: 'https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/'
        },
        owasp_llm05: {
            title: 'OWASP LLM05: Improper Output Handling',
            url: 'https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/'
        },
        owasp_llm06: {
            title: 'OWASP LLM06: Excessive Agency',
            url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/'
        },
        owasp_llm08: {
            title: 'OWASP LLM08: Vector and Embedding Weaknesses',
            url: 'https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/'
        },
        mitre_atlas: {
            title: 'MITRE ATLAS Threat Matrix',
            url: 'https://atlas.mitre.org/matrices/ATLAS'
        },
        mitre_attack_ics: {
            title: 'MITRE ATT&CK for ICS Matrix',
            url: 'https://attack.mitre.org/matrices/ics/'
        },
        cisa_ics: {
            title: 'CISA ICS Advisories',
            url: 'https://www.cisa.gov/news-events/ics-advisories'
        },
        cisa_kev: {
            title: 'CISA Known Exploited Vulnerabilities Catalog',
            url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'
        },
        cisa_stop_ransomware: {
            title: 'CISA Stop Ransomware',
            url: 'https://www.cisa.gov/stopransomware'
        },
        nist_csf: {
            title: 'NIST Cybersecurity Framework',
            url: 'https://www.nist.gov/cyberframework'
        },
        nist_ai_rmf: {
            title: 'NIST AI Risk Management Framework',
            url: 'https://www.nist.gov/itl/ai-risk-management-framework'
        },
        nist_ssdf: {
            title: 'NIST Secure Software Development Framework (SSDF)',
            url: 'https://csrc.nist.gov/Projects/ssdf'
        },
        cwe_top25: {
            title: 'MITRE CWE Top 25',
            url: 'https://cwe.mitre.org/top25/'
        }
    });

    const STATIC_REFERENCES_BY_THREAT = Object.freeze(
        (typeof globalThis !== 'undefined' && globalThis.THREAT_STATIC_REFERENCES && typeof globalThis.THREAT_STATIC_REFERENCES === 'object')
            ? globalThis.THREAT_STATIC_REFERENCES
            : {}
    );

    const CATEGORY_DEFAULT_REFERENCES = Object.freeze({
        'Communication & Network': ['ros2_tm', 'rsf'],
        'System & Control-Plane': ['ros2_tm', 'rsf'],
        'Sensor & Perception': ['ros2_tm', 'rvss'],
        'Cloud / API / Integration': ['owasp_api_top10', 'owasp_rest_cheat'],
        'AI / ML / LLM': ['owasp_llm_top10', 'mitre_atlas'],
        'Identity & Access': ['owasp_auth_cheat', 'owasp_api_top10'],
        'Software Supply Chain': ['nist_ssdf', 'cisa_kev'],
        'Data Security & Privacy': ['owasp_risk', 'nist_csf'],
        'Hardware & Physical': ['rsf', 'mitre_attack_ics'],
        'Safety & Human-Interaction': ['rvss', 'ros2_tm'],
        'Availability & Resilience': ['nist_csf', 'cisa_stop_ransomware'],
        'Governance & Compliance': ['owasp_risk', 'nist_ai_rmf']
    });

    const CATEGORY_DEFAULT_MITIGATIONS = Object.freeze({
        'Communication & Network': [
            'Use mutual authentication and encrypted transport for robot communications.',
            'Segment robot networks from enterprise and internet-facing services.',
            'Apply replay protection and rate limiting on command and telemetry channels.'
        ],
        'System & Control-Plane': [
            'Enforce strict RBAC and signed configuration or command changes.',
            'Run control components with least privilege and process isolation.',
            'Log control-plane changes with tamper-evident audit trails.'
        ],
        'Sensor & Perception': [
            'Implement Physical-layer Plausibility validation via multi-sensor cross-checking.',
            'Detect spoofing or jamming patterns and switch to safe degraded mode.',
            'Continuously monitor sensor integrity and calibration drift.'
        ],
        'Cloud / API / Integration': [
            'Enforce strong authentication and object-level authorization in APIs.',
            'Protect integration endpoints with signature checks and replay defenses.',
            'Inventory and disable unused debug, test, and shadow interfaces.'
        ],
        'AI / ML / LLM': [
            'Isolate model inputs and retrieval sources with trust boundaries.',
            'Gate high-impact tool or actuator actions behind policy and approval checks.',
            'Continuously monitor model behavior, drift, and unsafe outputs.'
        ],
        'Identity & Access': [
            'Remove default credentials and enforce strong authentication.',
            'Apply least privilege for users, services, and automation accounts.',
            'Rotate and revoke tokens quickly when compromise is suspected.'
        ],
        'Software Supply Chain': [
            'Use trusted repositories, pinned dependencies, and signature verification.',
            'Harden CI/CD pipelines and protect build credentials.',
            'Validate update provenance and block unsafe rollbacks.'
        ],
        'Data Security & Privacy': [
            'Minimize sensitive data collection and enforce retention limits.',
            'Encrypt sensitive data in transit and at rest with proper key management.',
            'Use immutable centralized logging for forensics and incident response.'
        ],
        'Hardware & Physical': [
            'Harden physical access with tamper controls and secure maintenance procedures.',
            'Disable or lock debug interfaces in production hardware.',
            'Use component attestation and trusted supply chains for critical modules.'
        ],
        'Safety & Human-Interaction': [
            'Keep independent safety interlocks outside normal software control paths.',
            'Enforce motion and force safety envelopes at runtime.',
            'Trigger fail-safe behavior when timing, sensing, or control integrity degrades.'
        ],
        'Availability & Resilience': [
            'Apply resource quotas, watchdogs, and service health probes.',
            'Prepare tested recovery plans with immutable backups.',
            'Protect time sync and failover paths against manipulation.'
        ],
        'Governance & Compliance': [
            'Map controls to compliance obligations and review regularly.',
            'Maintain high-quality audit evidence and decision traceability.',
            'Use periodic risk reassessment for changing models and environments.'
        ]
    });

    const NETWORK_HIERARCHY = Object.freeze({
        'air-gapped': 1,
        'lan-only': 2,
        'wifi': 3,
        'cellular': 4,
        'internet-exposed': 5
    });

    const ATTACKER_HIERARCHY = Object.freeze({
        'low-skill': 1,
        insider: 2,
        organized: 3,
        'supply-chain': 4,
        'nation-state': 5
    });

    const DYNAMIC_PROFILE_RULES = [
        {
            id: 'mobility-remote',
            when: ctx => hasSelected(ctx.robotType, 'autonomous-vehicle') &&
                hasSelected(ctx.environment, 'public-space') &&
                isAtLeastLevel(ctx.network, NETWORK_HIERARCHY, 'internet-exposed') &&
                isAtLeastLevel(ctx.attacker, ATTACKER_HIERARCHY, 'organized'),
            controls: [
                'Require signed high-impact remote commands with strict nonce and freshness checks.',
                'Enforce Inertial Cross-Checking (verify GPS trajectory against independent inertial data).'
            ]
        },
        {
            id: 'drone-safety',
            when: ctx => hasSelected(ctx.robotType, 'drone') &&
                hasAnySelected(ctx.environment, ['public-space', 'defense']) &&
                isAtLeastLevel(ctx.attacker, ATTACKER_HIERARCHY, 'organized'),
            controls: [
                'Harden C2 links with mutual authentication and fail-safe loss-of-link behavior.',
                'Use GNSS spoofing detection with forced safe-mode landing when confidence drops.'
            ]
        },
        {
            id: 'ics-apt',
            when: ctx => hasSelected(ctx.robotType, 'industrial-arm') &&
                hasAnySelected(ctx.environment, ['critical-infrastructure', 'defense', 'public-space']) &&
                isAtLeastLevel(ctx.attacker, ATTACKER_HIERARCHY, 'nation-state') &&
                isAtLeastLevel(ctx.network, NETWORK_HIERARCHY, 'lan-only'),
            controls: [
                'Enforce hardware-rooted integrity checks for controllers and engineering workstations.',
                'Use strict jump-host workflows with session recording for privileged operational actions.'
            ]
        },
        {
            id: 'factory-ransomware',
            when: ctx => hasSelected(ctx.robotType, 'industrial-arm') &&
                hasSelected(ctx.environment, 'factory') &&
                isAtLeastLevel(ctx.attacker, ATTACKER_HIERARCHY, 'organized') &&
                isAtLeastLevel(ctx.network, NETWORK_HIERARCHY, 'internet-exposed'),
            controls: [
                'Keep offline immutable backups of PLC and robot-cell configurations with tested restore drills.',
                'Segment OT runtime zones from enterprise IT and block direct lateral movement paths.'
            ]
        },
        {
            id: 'healthcare-device',
            when: ctx => hasSelected(ctx.robotType, 'medical-robot') &&
                hasSelected(ctx.environment, 'healthcare') &&
                isAtLeastLevel(ctx.attacker, ATTACKER_HIERARCHY, 'organized') &&
                isAtLeastLevel(ctx.network, NETWORK_HIERARCHY, 'internet-exposed') &&
                hasAnySelected(ctx.severity, ['critical']),
            controls: [
                'Require dual-approval and signed policy checks for therapy-impacting parameter changes.',
                'Guarantee safe local operation if cloud orchestration or telemetry links fail.'
            ]
        },
        {
            id: 'healthcare-operations',
            when: ctx => hasAnySelected(ctx.robotType, ['service-robot', 'autonomous-vehicle']) &&
                hasSelected(ctx.environment, 'healthcare') &&
                isAtLeastLevel(ctx.attacker, ATTACKER_HIERARCHY, 'organized') &&
                isAtLeastLevel(ctx.network, NETWORK_HIERARCHY, 'internet-exposed'),
            controls: [
                'Apply strict clinical-network segmentation with allowlisted east-west communications only.',
                'Maintain downtime workflows that preserve patient-safe operations during cyber incidents.'
            ]
        },
        {
            id: 'consumer-iot',
            when: ctx => hasSelected(ctx.robotType, 'service-robot') &&
                hasSelected(ctx.environment, 'home') &&
                isAtLeastLevel(ctx.attacker, ATTACKER_HIERARCHY, 'organized') &&
                isAtLeastLevel(ctx.network, NETWORK_HIERARCHY, 'internet-exposed'),
            controls: [
                'Enforce multi-factor authentication and suspicious login anomaly detection by default.',
                'Provide physical privacy controls for camera and microphone capture paths.'
            ]
        },
        {
            id: 'supply-chain',
            when: ctx => hasSelected(ctx.attacker, 'supply-chain') &&
                hasSelected(ctx.environment, 'public-space') &&
                isAtLeastLevel(ctx.network, NETWORK_HIERARCHY, 'internet-exposed'),
            controls: [
                'Require signed SBOM-backed releases and provenance attestations before rollout.',
                'Use canary deployment rings with auto-rollback on integrity or behavior anomalies.'
            ]
        }
    ];

    const ATTACKER_OVERLAYS = Object.freeze({
        'nation-state': [
            'Adopt threat-hunting for stealthy persistence, credential abuse, and living-off-the-land behavior.'
        ],
        'supply-chain': [
            'Harden build identities and enforce two-party approval for release signing operations.'
        ],
        organized: [
            'Deploy ransomware-focused detections and isolate high-value orchestration assets from user domains.'
        ],
        insider: [
            'Use just-in-time privilege elevation and tamper-evident logging for sensitive maintenance actions.'
        ],
        'low-skill': [
            'Prioritize secure defaults, credential hygiene, and exposure minimization of remote interfaces.'
        ]
    });

    const NETWORK_OVERLAYS = Object.freeze({
        'internet-exposed': [
            'Put all external robot-facing APIs behind strict gateway policy, abuse detection, and rate controls.'
        ],
        cellular: [
            'Bind device identities to network sessions and monitor anomalous roaming or SIM misuse patterns.'
        ],
        wifi: [
            'Use enterprise-grade wireless segmentation and rotate credentials tied to robot fleet identity.'
        ],
        'lan-only': [
            'Restrict east-west traffic to allowlisted service flows and continuously verify segmentation rules.'
        ],
        'air-gapped': [
            'Control removable media and maintenance transfer paths with strict approval and malware scanning.'
        ]
    });

    const ENVIRONMENT_OVERLAYS = Object.freeze({
        healthcare: [
            'Pair cyber controls with patient-safety escalation procedures and clinically approved fallback modes.'
        ],
        defense: [
            'Apply mission-resilience controls with offline operation capability and hardened trust anchors.'
        ],
        'critical-infrastructure': [
            'Protect continuity-critical services with tested black-start or manual fallback operational procedures.'
        ]
    });

    const SEVERITY_OVERLAYS = Object.freeze({
        critical: [
            'Require independent safety interlocks that remain effective during cyber compromise scenarios.'
        ],
        high: [
            'Add crisis runbooks with explicit recovery RTO targets and periodic tabletop validation.'
        ]
    });

    const RULES = [
        {
            pattern: /man-in-the-middle|message tampering/i,
            refs: ['ros2_security', 'mitre_attack_ics'],
            mitigations: ['Sign and verify command messages end-to-end to prevent in-flight modification.']
        },
        {
            pattern: /message spoofing|replay/i,
            refs: ['owasp_rest_cheat', 'ros2_tm'],
            mitigations: ['Use nonces, sequence numbers, and strict timestamp validation for command freshness.']
        },
        {
            pattern: /unauthorized node joining|impersonation/i,
            refs: ['ros2_security', 'rsf'],
            mitigations: ['Restrict node enrollment to trusted identities with explicit allowlists.']
        },
        {
            pattern: /denial-of-service|resource exhaustion/i,
            refs: ['owasp_api_resource', 'rvss'],
            mitigations: ['Rate-limit high-risk channels and enforce per-component CPU, memory, and queue budgets.']
        },
        {
            pattern: /api abuse|remote interfaces|bola|authorization/i,
            refs: ['owasp_api_bola', 'owasp_api_top10'],
            mitigations: ['Apply per-object and per-function authorization checks on every API request.']
        },
        {
            pattern: /mqtt|topic permissions/i,
            refs: ['owasp_api_misconfig', 'owasp_api_top10'],
            mitigations: ['Use per-topic ACLs and isolate critical command topics from broad subscribers.']
        },
        {
            pattern: /webhook|event spoofing/i,
            refs: ['owasp_rest_cheat', 'owasp_api_auth'],
            mitigations: ['Require signed webhooks and reject callbacks outside strict time windows.']
        },
        {
            pattern: /nonce|timestamp|replay/i,
            refs: ['owasp_rest_cheat', 'owasp_api_auth'],
            mitigations: ['Implement replay caches and monotonic time checks for signed requests.']
        },
        {
            pattern: /shadow|debug interfaces|debug interface/i,
            refs: ['owasp_api_inventory', 'cisa_ics'],
            mitigations: ['Remove debug services from production images and block maintenance ports by default.']
        },
        {
            pattern: /credential exposure|default credentials|token hijacking|authentication/i,
            refs: ['owasp_secrets_cheat', 'owasp_auth_cheat'],
            mitigations: ['Store secrets in a vault-backed flow and rotate credentials on a fixed schedule.']
        },
        {
            pattern: /training data poisoning/i,
            refs: ['owasp_llm04', 'mitre_atlas'],
            mitigations: ['Track data provenance and quarantine suspicious training samples before retraining.']
        },
        {
            pattern: /backdoored|tampered models/i,
            refs: ['owasp_llm03', 'mitre_atlas'],
            mitigations: ['Verify model artifacts with signatures and approved provenance before deployment.']
        },
        {
            pattern: /model extraction|inversion/i,
            refs: ['owasp_llm02', 'mitre_atlas'],
            mitigations: ['Limit high-volume query patterns and reduce sensitive detail in model responses.']
        },
        {
            pattern: /direct prompt injection|indirect prompt injection/i,
            refs: ['owasp_llm01', 'mitre_atlas'],
            mitigations: ['Isolate untrusted content from system instructions and gate high-risk tool calls.']
        },
        {
            pattern: /retrieval|context poisoning|embedding/i,
            refs: ['owasp_llm08', 'mitre_atlas'],
            mitigations: ['Validate retrieved context sources and block unsafe context from action pipelines.']
        },
        {
            pattern: /unsafe autonomous actions|excessive agency/i,
            refs: ['owasp_llm06', 'nist_ai_rmf'],
            mitigations: ['Require policy checks and human approval for safety-critical autonomous actions.']
        },
        {
            pattern: /tool \/ function invocation hijacking|tool invocation hijacking|function invocation hijacking/i,
            refs: ['owasp_llm06', 'mitre_atlas'],
            mitigations: ['Strictly validate tool-call schemas and enforce allowlisted function arguments before execution.']
        },
        {
            pattern: /over-permissioned agent tooling|over-permissioned/i,
            refs: ['owasp_llm06', 'nist_ai_rmf'],
            mitigations: ['Scope agent tool permissions to least privilege and require step-up approval for high-impact operations.']
        },
        {
            pattern: /cross-agent privilege escalation/i,
            refs: ['owasp_llm06', 'mitre_atlas'],
            mitigations: ['Isolate agent trust domains and block privilege inheritance across agent-to-agent handoffs.']
        },
        {
            pattern: /memory poisoning|short\/long-term memory/i,
            refs: ['owasp_llm04', 'mitre_atlas'],
            mitigations: ['Apply trust scoring and moderation before persisting memory and support rollback of suspicious memory entries.']
        },
        {
            pattern: /system prompt \/ policy exfiltration|system prompt|policy exfiltration/i,
            refs: ['owasp_llm02', 'owasp_llm01'],
            mitigations: ['Keep system policies outside user-visible context and block reflective prompt requests that expose internal instructions.']
        },
        {
            pattern: /llm output injection to control apis|improper output handling|output injection/i,
            refs: ['owasp_llm05', 'owasp_llm06'],
            mitigations: ['Insert a deterministic policy gate between model output and control APIs with strict command validation.']
        },
        {
            pattern: /multimodal prompt injection/i,
            refs: ['owasp_llm01', 'mitre_atlas'],
            mitigations: ['Sanitize image and audio-derived instructions before they reach planning or control toolchains.']
        },
        {
            pattern: /context window flooding|token-exhaustion abuse|token exhaustion/i,
            refs: ['owasp_api_resource', 'owasp_llm06'],
            mitigations: ['Enforce context-size budgets and reject oversized prompts that truncate safety constraints.']
        },
        {
            pattern: /human-override suppression|deceptive agent behavior/i,
            refs: ['nist_ai_rmf', 'owasp_llm06'],
            mitigations: ['Require independent operator confirmation channels for safety overrides and audit high-confidence agent claims.']
        },
        {
            pattern: /rag source trust bypass/i,
            refs: ['owasp_llm08', 'mitre_atlas'],
            mitigations: ['Apply source trust policy to retrieved context and block low-trust content from autonomous action paths.']
        },
        {
            pattern: /sensor spoofing|falsified readings|jamming|blinding|adversarial perception|gps|gnss|imu|acoustic|camera/i,
            refs: ['ros2_tm', 'cisa_ics'],
            mitigations: ['Use anomaly detection across sensing channels and enforce safe fallback behavior.']
        },
        {
            pattern: /build \/ ci pipeline|dependency|package confusion|third-party|unsigned|unverified updates|tampered artifacts|supply chain/i,
            refs: ['nist_ssdf', 'cisa_kev'],
            mitigations: ['Adopt signed builds, provenance attestations, and hardened dependency intake workflows.']
        },
        {
            pattern: /log tampering|forensics|telemetry|data interception|storage|privacy|personal data/i,
            refs: ['owasp_logging_cheat', 'owasp_risk'],
            mitigations: ['Centralize immutable logs and minimize sensitive telemetry fields by design.']
        },
        {
            pattern: /physical tampering|firmware extraction|hardware implants|fault injection|side-channel/i,
            refs: ['mitre_attack_ics', 'rsf'],
            mitigations: ['Use tamper detection, secure boot, and hardware attestation for critical components.']
        },
        {
            pattern: /safety mechanism|unsafe motion|collision-avoidance|human-zone|latency manipulation/i,
            refs: ['rvss', 'ros2_tm'],
            mitigations: ['Enforce independent safety interlocks and reject stale control or sensing data.']
        },
        {
            pattern: /fleet \/ server disruption|ransomware|recovery|rollback|failover|degraded-mode|time synchronization/i,
            refs: ['cisa_stop_ransomware', 'nist_csf'],
            mitigations: ['Exercise restore playbooks regularly and harden recovery, failover, and time services.']
        },
        {
            pattern: /explainability|auditability|regulatory|behavioral drift|compliance/i,
            refs: ['nist_ai_rmf', 'owasp_risk'],
            mitigations: ['Maintain auditable decision and control traces, and run periodic governance reviews against applicable obligations.']
        }
    ];

    function findRule(threatName) {
        return RULES.find(rule => rule.pattern.test(threatName)) || null;
    }

    function ensureSentence(text) {
        const trimmed = String(text || '').trim();
        if (!trimmed) {
            return '';
        }
        return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
    }

    function buildSummary(threat, rule) {
        if (rule && rule.summary) {
            return ensureSentence(rule.summary);
        }

        const desc = String(threat.desc || '').trim();
        if (!desc) {
            return `This threat can affect robot operations, safety, or data integrity in this context.`;
        }

        const firstSentenceMatch = desc.match(/(.+?[.!?])(\s|$)/);
        const sentence = firstSentenceMatch ? firstSentenceMatch[1] : desc;
        return ensureSentence(sentence);
    }

    function uniqueList(items) {
        const out = [];
        const seen = new Set();
        for (const item of items) {
            const value = String(item || '').trim();
            if (!value || seen.has(value)) {
                continue;
            }
            seen.add(value);
            out.push(value);
        }
        return out;
    }

    function normalizeSelectedFilters(selectedFilters) {
        const input = selectedFilters && typeof selectedFilters === 'object' ? selectedFilters : {};
        const safeArray = value => Array.isArray(value) ? value.map(v => String(v || '').trim()).filter(Boolean) : [];
        return {
            robotType: safeArray(input.robotType),
            environment: safeArray(input.environment),
            aiStack: safeArray(input.aiStack),
            sensors: safeArray(input.sensors),
            network: safeArray(input.network),
            attacker: safeArray(input.attacker),
            severity: safeArray(input.severity)
        };
    }

    function hasSelected(selectedTags, tag) {
        return Array.isArray(selectedTags) && selectedTags.includes(tag);
    }

    function hasAnySelected(selectedTags, tags) {
        if (!Array.isArray(selectedTags) || selectedTags.length === 0) {
            return false;
        }
        return tags.some(tag => selectedTags.includes(tag));
    }

    function getHighestSelectedLevel(selectedTags, hierarchy) {
        if (!Array.isArray(selectedTags) || selectedTags.length === 0) {
            return null;
        }
        const levels = selectedTags
            .map(tag => hierarchy[tag])
            .filter(level => Number.isFinite(level));
        return levels.length > 0 ? Math.max(...levels) : null;
    }

    function isAtLeastLevel(selectedTags, hierarchy, requiredTag) {
        const selectedLevel = getHighestSelectedLevel(selectedTags, hierarchy);
        const requiredLevel = hierarchy[requiredTag];
        if (!Number.isFinite(selectedLevel) || !Number.isFinite(requiredLevel)) {
            return false;
        }
        return selectedLevel >= requiredLevel;
    }

    function getHighestTagByHierarchy(selectedTags, hierarchy) {
        const level = getHighestSelectedLevel(selectedTags, hierarchy);
        if (!Number.isFinite(level)) {
            return null;
        }
        return Object.keys(hierarchy).find(tag => hierarchy[tag] === level) || null;
    }

    function getHighestSeverityTag(selectedSeverityTags) {
        const order = { low: 1, medium: 2, high: 3, critical: 4 };
        const highest = getHighestSelectedLevel(selectedSeverityTags, order);
        if (!Number.isFinite(highest)) {
            return null;
        }
        return Object.keys(order).find(tag => order[tag] === highest) || null;
    }

    function getContextAwareMitigations(threat, categoryName, selectedFilters) {
        const baseMitigations = Array.isArray(threat && threat.mitigations)
            ? threat.mitigations
            : [];

        const selected = normalizeSelectedFilters(selectedFilters);
        const hasAnySelection = Object.values(selected).some(values => values.length > 0);
        if (!hasAnySelection) {
            return baseMitigations;
        }

        const dynamicControls = [];

        for (const profile of DYNAMIC_PROFILE_RULES) {
            if (profile.when(selected)) {
                dynamicControls.push(...profile.controls);
            }
        }

        const topAttacker = getHighestTagByHierarchy(selected.attacker, ATTACKER_HIERARCHY);
        if (topAttacker && Array.isArray(ATTACKER_OVERLAYS[topAttacker])) {
            dynamicControls.push(...ATTACKER_OVERLAYS[topAttacker]);
        }

        const topNetwork = getHighestTagByHierarchy(selected.network, NETWORK_HIERARCHY);
        if (topNetwork && Array.isArray(NETWORK_OVERLAYS[topNetwork])) {
            dynamicControls.push(...NETWORK_OVERLAYS[topNetwork]);
        }

        for (const env of selected.environment) {
            if (Array.isArray(ENVIRONMENT_OVERLAYS[env])) {
                dynamicControls.push(...ENVIRONMENT_OVERLAYS[env]);
            }
        }

        const topSeverity = getHighestSeverityTag(selected.severity);
        if (topSeverity && Array.isArray(SEVERITY_OVERLAYS[topSeverity])) {
            dynamicControls.push(...SEVERITY_OVERLAYS[topSeverity]);
        }

        if (categoryName === 'Safety & Human-Interaction' && topSeverity === 'critical') {
            dynamicControls.push('Require periodic end-to-end fail-safe testing under realistic degraded network and sensor conditions.');
        }

        const combined = uniqueList([
            ...dynamicControls,
            ...baseMitigations
        ]).map(ensureSentence);

        return combined.slice(0, 4);
    }

    function buildMitigations(categoryName, rule) {
        const combined = [];
        if (rule && Array.isArray(rule.mitigations)) {
            combined.push(...rule.mitigations);
        }
        if (Array.isArray(CATEGORY_DEFAULT_MITIGATIONS[categoryName])) {
            combined.push(...CATEGORY_DEFAULT_MITIGATIONS[categoryName]);
        }

        const normalized = uniqueList(combined).map(ensureSentence);
        return normalized.slice(0, 4);
    }

    function isExternalHttps(url) {
        if (!/^https:\/\//i.test(url)) {
            return false;
        }
        try {
            const parsed = new URL(url);
            const host = parsed.hostname.toLowerCase();
            if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0') {
                return false;
            }
            return true;
        } catch (_error) {
            return false;
        }
    }

    function normalizeStaticRefs(refs) {
        const out = [];
        const seen = new Set();

        for (const ref of refs || []) {
            const title = String(ref && ref.title ? ref.title : '').trim();
            const url = String(ref && ref.url ? ref.url : '').trim();
            if (!title || !isExternalHttps(url) || seen.has(url)) {
                continue;
            }
            seen.add(url);
            out.push({ title, url });
            if (out.length === 2) {
                break;
            }
        }

        return out;
    }

    function buildReferences(threatName) {
        const staticRefs = normalizeStaticRefs(STATIC_REFERENCES_BY_THREAT[threatName]);
        if (staticRefs.length === 2) {
            return staticRefs;
        }

        const fallbackKeys = ['owasp_risk', 'nist_csf'];
        const fallbackRefs = fallbackKeys
            .map(key => REFERENCE_LIBRARY[key])
            .filter(ref => ref && isExternalHttps(ref.url));

        return normalizeStaticRefs(fallbackRefs).slice(0, 2);
    }

    function enrichThreat(threat, categoryName) {
        const rule = findRule(threat.name);
        threat.summary = buildSummary(threat, rule);
        threat.mitigations = buildMitigations(categoryName, rule);
        threat.references = buildReferences(threat.name);
        return threat;
    }

    function enrichCategories(categories) {
        categories.forEach(category => {
            category.threats.forEach(threat => {
                enrichThreat(threat, category.name);
            });
        });
        return categories;
    }

    function validateCategories(categories) {
        const errors = [];
        let totalThreats = 0;

        categories.forEach(category => {
            category.threats.forEach(threat => {
                totalThreats += 1;
                if (!String(threat.summary || '').trim()) {
                    errors.push(`${threat.name}: missing summary`);
                }
                if (!Array.isArray(threat.mitigations) || threat.mitigations.length === 0) {
                    errors.push(`${threat.name}: missing mitigations`);
                }
                if (!Array.isArray(threat.references) || threat.references.length !== 2) {
                    errors.push(`${threat.name}: references must contain exactly 2 items`);
                }

                if (!Array.isArray(STATIC_REFERENCES_BY_THREAT[threat.name])) {
                    errors.push(`${threat.name}: missing static reference mapping`);
                }

                const seenUrls = new Set();
                (threat.references || []).forEach((ref, index) => {
                    if (!ref || !String(ref.title || '').trim()) {
                        errors.push(`${threat.name}: reference ${index + 1} missing title`);
                    }
                    if (!ref || !isExternalHttps(String(ref.url || ''))) {
                        errors.push(`${threat.name}: reference ${index + 1} must be external https`);
                    }
                    if (ref && ref.url) {
                        if (seenUrls.has(ref.url)) {
                            errors.push(`${threat.name}: duplicate reference URL`);
                        }
                        seenUrls.add(ref.url);
                    }
                });
            });
        });

        return {
            totalThreats,
            errors
        };
    }

    return {
        REFERENCE_LIBRARY,
        enrichThreat,
        enrichCategories,
        getContextAwareMitigations,
        validateCategories
    };
});
