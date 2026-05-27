(function (root, factory) {
    const refs = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = refs;
    }
    if (root) {
        root.THREAT_STATIC_REFERENCES = refs;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    return {
    "Man-in-the-Middle & Message Tampering": [
        {
            "title": "ROS 2 Security Overview",
            "url": "https://docs.ros.org/en/rolling/Tutorials/Advanced/Security/Introducing-ros2-security.html"
        },
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        }
    ],
    "Message Spoofing & Replay": [
        {
            "title": "OWASP REST Security Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html"
        },
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        }
    ],
    "Unauthorized Node Joining": [
        {
            "title": "ROS 2 Security Overview",
            "url": "https://docs.ros.org/en/rolling/Tutorials/Advanced/Security/Introducing-ros2-security.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Denial-of-Service on Comms Channels": [
        {
            "title": "OWASP API4:2023 Unrestricted Resource Consumption",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/"
        },
        {
            "title": "Robot Vulnerability Scoring System (RVSS)",
            "url": "https://arxiv.org/abs/1807.10357"
        }
    ],
    "Network Scanning & Protocol Abuse": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "API Abuse & Insecure Remote Interfaces": [
        {
            "title": "OWASP API1:2023 Broken Object Level Authorization",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/"
        },
        {
            "title": "OWASP API Security Top 10",
            "url": "https://owasp.org/API-Security/"
        }
    ],
    "Unauthorized Parameter Changes": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Node / Component Impersonation": [
        {
            "title": "ROS 2 Security Overview",
            "url": "https://docs.ros.org/en/rolling/Tutorials/Advanced/Security/Introducing-ros2-security.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Command / Control Injection": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Runtime Process Manipulation": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Compromised Actuator Control Path": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Insecure Plugin / Module Loading": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Unsafe Fallback / Fail-Open Behavior": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Sensor Spoofing & Falsified Readings": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "A Systematic Review of Sensor Vulnerabilities and Cyber-Physical Threats in Industrial Robotic Systems (2025)",
            "url": "https://ietresearch.onlinelibrary.wiley.com/doi/abs/10.1049/cps2.70023"
        }
    ],
    "Sensor Jamming / Blinding": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "A Systematic Review of Sensor Vulnerabilities and Cyber-Physical Threats in Industrial Robotic Systems (2025)",
            "url": "https://ietresearch.onlinelibrary.wiley.com/doi/abs/10.1049/cps2.70023"
        }
    ],
    "Adversarial Perception Inputs": [
        {
            "title": "Explaining and Harnessing Adversarial Examples (2015)",
            "url": "https://arxiv.org/abs/1412.6572"
        },
        {
            "title": "Adversarial Examples in the Physical World (2016)",
            "url": "https://arxiv.org/abs/1607.02533"
        }
    ],
    "Physical Environment Manipulation": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "Robot Vulnerability Scoring System (RVSS)",
            "url": "https://arxiv.org/abs/1807.10357"
        }
    ],
    "GPS / GNSS Spoofing & Jamming": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "A Systematic Review of Sensor Vulnerabilities and Cyber-Physical Threats in Industrial Robotic Systems (2025)",
            "url": "https://ietresearch.onlinelibrary.wiley.com/doi/abs/10.1049/cps2.70023"
        }
    ],
    "Camera: Visual Spoofing & QR Injection": [
        {
            "title": "Manipulating Multimodal Agents via Cross-Modal Prompt Injection (2025)",
            "url": "https://dl.acm.org/doi/abs/10.1145/3746027.3755211"
        },
        {
            "title": "Adversarial Examples in the Physical World (2016)",
            "url": "https://arxiv.org/abs/1607.02533"
        }
    ],
    "Microphone: Acoustic Command Injection": [
        {
            "title": "Hijacking Large Audio-Language Models via Context-Agnostic and Imperceptible Auditory Prompt Injection (2026)",
            "url": "https://arxiv.org/abs/2604.14604"
        },
        {
            "title": "A Study on Prompt Injection Attack Against LLM-Integrated Mobile Robotic Systems (2024)",
            "url": "https://ieeexplore.ieee.org/abstract/document/10771340/"
        }
    ],
    "IMU: Vibration-Based Disturbance": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "A Systematic Review of Sensor Vulnerabilities and Cyber-Physical Threats in Industrial Robotic Systems (2025)",
            "url": "https://ietresearch.onlinelibrary.wiley.com/doi/abs/10.1049/cps2.70023"
        }
    ],
    "Broken Object-Level Authorization (BOLA)": [
        {
            "title": "OWASP API1:2023 Broken Object Level Authorization",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/"
        },
        {
            "title": "OWASP API Security Top 10",
            "url": "https://owasp.org/API-Security/"
        }
    ],
    "Insecure MQTT / Topic Permissions": [
        {
            "title": "OWASP API8:2023 Security Misconfiguration",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa8-security-misconfiguration/"
        },
        {
            "title": "OWASP API Security Top 10",
            "url": "https://owasp.org/API-Security/"
        }
    ],
    "Webhook / Event Spoofing": [
        {
            "title": "OWASP REST Security Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html"
        },
        {
            "title": "OWASP API2:2023 Broken Authentication",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/"
        }
    ],
    "Weak Nonce / Timestamp Checks": [
        {
            "title": "OWASP REST Security Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html"
        },
        {
            "title": "OWASP API2:2023 Broken Authentication",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/"
        }
    ],
    "Shadow / Debug Interfaces in Production": [
        {
            "title": "OWASP API9:2023 Improper Inventory Management",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa9-improper-inventory-management/"
        },
        {
            "title": "CISA ICS Advisories",
            "url": "https://www.cisa.gov/news-events/ics-advisories"
        }
    ],
    "Cloud Credential Exposure": [
        {
            "title": "OWASP Secrets Management Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
        },
        {
            "title": "OWASP Authentication Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
        }
    ],
    "Training Data Poisoning": [
        {
            "title": "Trojan Attacks on Neural Network Controllers for Robotic Systems (2026)",
            "url": "https://arxiv.org/abs/2602.05121"
        },
        {
            "title": "Robot Collapse: Supply Chain Backdoor Attacks Against VLM-based Robotic Manipulation (2024)",
            "url": "https://arxiv.org/abs/2411.11683"
        }
    ],
    "Backdoored / Tampered Models": [
        {
            "title": "Trojan Attacks on Neural Network Controllers for Robotic Systems (2026)",
            "url": "https://arxiv.org/abs/2602.05121"
        },
        {
            "title": "Robot Collapse: Supply Chain Backdoor Attacks Against VLM-based Robotic Manipulation (2024)",
            "url": "https://arxiv.org/abs/2411.11683"
        }
    ],
    "Model Extraction & Inversion": [
        {
            "title": "Stealing Machine Learning Models via Prediction APIs (2016)",
            "url": "https://arxiv.org/abs/1609.02943"
        },
        {
            "title": "A Survey on Model Extraction Attacks and Defenses for Large Language Models (2025)",
            "url": "https://arxiv.org/abs/2506.22521"
        }
    ],
    "Direct Prompt Injection": [
        {
            "title": "A Study on Prompt Injection Attack Against LLM-Integrated Mobile Robotic Systems (2024)",
            "url": "https://ieeexplore.ieee.org/abstract/document/10771340/"
        },
        {
            "title": "OWASP LLM01: Prompt Injection",
            "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"
        }
    ],
    "Indirect Prompt Injection": [
        {
            "title": "Manipulating Multimodal Agents via Cross-Modal Prompt Injection (2025)",
            "url": "https://dl.acm.org/doi/abs/10.1145/3746027.3755211"
        },
        {
            "title": "OWASP LLM01: Prompt Injection",
            "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"
        }
    ],
    "Retrieval / Context Poisoning": [
        {
            "title": "Securing Retrieval-Augmented Generation: A Taxonomy of Attacks, Defenses, and Future Directions (2026)",
            "url": "https://arxiv.org/abs/2604.08304"
        },
        {
            "title": "RefineRAG: Word-Level Poisoning Attacks via Retriever-Guided Text Refinement (2026)",
            "url": "https://arxiv.org/abs/2604.07403"
        }
    ],
    "Unsafe Autonomous Actions": [
        {
            "title": "SoK: The Attack Surface of Agentic AI - Tools, and Autonomy (2026)",
            "url": "https://arxiv.org/abs/2603.22928"
        },
        {
            "title": "STARS: Skill-Triggered Audit for Request-Conditioned Invocation Safety in Agent Systems (2026)",
            "url": "https://arxiv.org/abs/2604.10286"
        }
    ],
    "Tool / Function Invocation Hijacking": [
        {
            "title": "SoK: The Attack Surface of Agentic AI - Tools, and Autonomy (2026)",
            "url": "https://arxiv.org/abs/2603.22928"
        },
        {
            "title": "STARS: Skill-Triggered Audit for Request-Conditioned Invocation Safety in Agent Systems (2026)",
            "url": "https://arxiv.org/abs/2604.10286"
        }
    ],
    "Over-Permissioned Agent Tooling": [
        {
            "title": "SoK: The Attack Surface of Agentic AI - Tools, and Autonomy (2026)",
            "url": "https://arxiv.org/abs/2603.22928"
        },
        {
            "title": "OWASP LLM06: Excessive Agency",
            "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
        }
    ],
    "Cross-Agent Privilege Escalation": [
        {
            "title": "SoK: The Attack Surface of Agentic AI - Tools, and Autonomy (2026)",
            "url": "https://arxiv.org/abs/2603.22928"
        },
        {
            "title": "STARS: Skill-Triggered Audit for Request-Conditioned Invocation Safety in Agent Systems (2026)",
            "url": "https://arxiv.org/abs/2604.10286"
        }
    ],
    "Memory Poisoning (Short/Long-Term)": [
        {
            "title": "OWASP LLM04: Data and Model Poisoning",
            "url": "https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/"
        },
        {
            "title": "MITRE ATLAS Threat Matrix",
            "url": "https://atlas.mitre.org/matrices/ATLAS"
        }
    ],
    "System Prompt / Policy Exfiltration": [
        {
            "title": "OWASP LLM02: Sensitive Information Disclosure",
            "url": "https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/"
        },
        {
            "title": "OWASP LLM01: Prompt Injection",
            "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"
        }
    ],
    "LLM Output Injection to Control APIs": [
        {
            "title": "OWASP LLM05: Improper Output Handling",
            "url": "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/"
        },
        {
            "title": "SoK: The Attack Surface of Agentic AI - Tools, and Autonomy (2026)",
            "url": "https://arxiv.org/abs/2603.22928"
        }
    ],
    "Multimodal Prompt Injection (Image/Audio)": [
        {
            "title": "Manipulating Multimodal Agents via Cross-Modal Prompt Injection (2025)",
            "url": "https://dl.acm.org/doi/abs/10.1145/3746027.3755211"
        },
        {
            "title": "Hijacking Large Audio-Language Models via Context-Agnostic and Imperceptible Auditory Prompt Injection (2026)",
            "url": "https://arxiv.org/abs/2604.14604"
        }
    ],
    "Context Window Flooding / Token-Exhaustion Abuse": [
        {
            "title": "OWASP API4:2023 Unrestricted Resource Consumption",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/"
        },
        {
            "title": "OWASP LLM06: Excessive Agency",
            "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
        }
    ],
    "Human-Override Suppression / Deceptive Agent Behavior": [
        {
            "title": "NIST AI Risk Management Framework",
            "url": "https://www.nist.gov/itl/ai-risk-management-framework"
        },
        {
            "title": "STARS: Skill-Triggered Audit for Request-Conditioned Invocation Safety in Agent Systems (2026)",
            "url": "https://arxiv.org/abs/2604.10286"
        }
    ],
    "RAG Source Trust Bypass": [
        {
            "title": "Securing Retrieval-Augmented Generation: A Taxonomy of Attacks, Defenses, and Future Directions (2026)",
            "url": "https://arxiv.org/abs/2604.08304"
        },
        {
            "title": "RefineRAG: Word-Level Poisoning Attacks via Retriever-Guided Text Refinement (2026)",
            "url": "https://arxiv.org/abs/2604.07403"
        }
    ],
    "Weak Auth & Default Credentials": [
        {
            "title": "OWASP Secrets Management Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
        },
        {
            "title": "OWASP Authentication Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
        }
    ],
    "Missing / Weak Authorization (RBAC)": [
        {
            "title": "OWASP API1:2023 Broken Object Level Authorization",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/"
        },
        {
            "title": "OWASP API Security Top 10",
            "url": "https://owasp.org/API-Security/"
        }
    ],
    "Overprivileged Service Accounts": [
        {
            "title": "OWASP Authentication Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
        },
        {
            "title": "OWASP API Security Top 10",
            "url": "https://owasp.org/API-Security/"
        }
    ],
    "Session / Token Hijacking": [
        {
            "title": "OWASP Secrets Management Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
        },
        {
            "title": "OWASP Authentication Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
        }
    ],
    "Insecure Remote Maintenance Auth": [
        {
            "title": "OWASP Authentication Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
        },
        {
            "title": "OWASP API Security Top 10",
            "url": "https://owasp.org/API-Security/"
        }
    ],
    "Dependency Hijacking & Package Confusion": [
        {
            "title": "NIST SP 800-218 Secure Software Development Framework",
            "url": "https://csrc.nist.gov/pubs/sp/800/218/final"
        },
        {
            "title": "NIST SP 800-161 Rev. 1 Cybersecurity Supply Chain Risk Management",
            "url": "https://csrc.nist.gov/pubs/sp/800/161/r1/final"
        }
    ],
    "Malicious Third-Party Components": [
        {
            "title": "Robot Collapse: Supply Chain Backdoor Attacks Against VLM-based Robotic Manipulation (2024)",
            "url": "https://arxiv.org/abs/2411.11683"
        },
        {
            "title": "Supply Chain Exploitation of Secure ROS 2 Systems (2025)",
            "url": "https://arxiv.org/abs/2511.00140"
        }
    ],
    "Build / CI Pipeline Compromise": [
        {
            "title": "NIST SP 800-218 Secure Software Development Framework",
            "url": "https://csrc.nist.gov/pubs/sp/800/218/final"
        },
        {
            "title": "NIST SP 800-161 Rev. 1 Cybersecurity Supply Chain Risk Management",
            "url": "https://csrc.nist.gov/pubs/sp/800/161/r1/final"
        }
    ],
    "Unsigned / Unverified Updates": [
        {
            "title": "Supply Chain Exploitation of Secure ROS 2 Systems (2025)",
            "url": "https://arxiv.org/abs/2511.00140"
        },
        {
            "title": "NIST SP 800-218 Secure Software Development Framework",
            "url": "https://csrc.nist.gov/pubs/sp/800/218/final"
        }
    ],
    "Tampered Artifacts": [
        {
            "title": "Supply Chain Exploitation of Secure ROS 2 Systems (2025)",
            "url": "https://arxiv.org/abs/2511.00140"
        },
        {
            "title": "NIST SP 800-218 Secure Software Development Framework",
            "url": "https://csrc.nist.gov/pubs/sp/800/218/final"
        }
    ],
    "Sensitive Telemetry / Log Leakage": [
        {
            "title": "NIST SP 800-53 Rev. 5",
            "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        },
        {
            "title": "ENISA Threat Landscape 2025",
            "url": "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025"
        }
    ],
    "Data Interception & Exfiltration": [
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        },
        {
            "title": "NIST SP 800-53 Rev. 5",
            "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        }
    ],
    "Insecure Storage & Backup Exposure": [
        {
            "title": "NIST SP 800-53 Rev. 5",
            "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        },
        {
            "title": "NIST Cybersecurity Framework 2.0",
            "url": "https://csrc.nist.gov/pubs/cswp/29/final"
        }
    ],
    "Log Tampering & Forensics Evasion": [
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        },
        {
            "title": "NIST SP 800-53 Rev. 5",
            "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        }
    ],
    "Excessive Personal Data Collection": [
        {
            "title": "EU AI Act Policy Page",
            "url": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
        },
        {
            "title": "EU NIS2 Directive Policy Page",
            "url": "https://digital-strategy.ec.europa.eu/en/policies/nis2-directive"
        }
    ],
    "Physical Tampering & Unauthorized Access": [
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Debug Interface Abuse": [
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        },
        {
            "title": "NIST SP 800-160 Systems Security Engineering",
            "url": "https://csrc.nist.gov/pubs/sp/800/160/v1/upd2/final"
        }
    ],
    "Firmware Extraction & Reverse Engineering": [
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Hardware Implants & Component Replacement": [
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Fault Injection & Side-Channel Attacks": [
        {
            "title": "NIST SP 800-160 Systems Security Engineering",
            "url": "https://csrc.nist.gov/pubs/sp/800/160/v1/upd2/final"
        },
        {
            "title": "Robot Security Framework (RSF)",
            "url": "https://arxiv.org/abs/1806.04042"
        }
    ],
    "Safety Mechanism Bypass": [
        {
            "title": "Robot Vulnerability Scoring System (RVSS)",
            "url": "https://arxiv.org/abs/1807.10357"
        },
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        }
    ],
    "Unsafe Motion / Task Execution": [
        {
            "title": "Robot Vulnerability Scoring System (RVSS)",
            "url": "https://arxiv.org/abs/1807.10357"
        },
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        }
    ],
    "Collision-Avoidance Degradation": [
        {
            "title": "Robot Vulnerability Scoring System (RVSS)",
            "url": "https://arxiv.org/abs/1807.10357"
        },
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        }
    ],
    "Human-Zone Protection Bypass": [
        {
            "title": "Robot Vulnerability Scoring System (RVSS)",
            "url": "https://arxiv.org/abs/1807.10357"
        },
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        }
    ],
    "Latency Manipulation Causing Unsafe Decisions": [
        {
            "title": "Robot Vulnerability Scoring System (RVSS)",
            "url": "https://arxiv.org/abs/1807.10357"
        },
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        }
    ],
    "Resource Exhaustion": [
        {
            "title": "OWASP API4:2023 Unrestricted Resource Consumption",
            "url": "https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/"
        },
        {
            "title": "Robot Vulnerability Scoring System (RVSS)",
            "url": "https://arxiv.org/abs/1807.10357"
        }
    ],
    "Fleet / Server Disruption & Ransomware": [
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        },
        {
            "title": "NIST Cybersecurity Framework 2.0",
            "url": "https://csrc.nist.gov/pubs/cswp/29/final"
        }
    ],
    "Time Synchronization Disruption": [
        {
            "title": "ROS 2 Robotic Systems Threat Model",
            "url": "https://design.ros2.org/articles/ros2_threat_model.html"
        },
        {
            "title": "MITRE ATT&CK for ICS Matrix",
            "url": "https://attack.mitre.org/matrices/ics/"
        }
    ],
    "Failover / Degraded-Mode Manipulation": [
        {
            "title": "NIST SP 800-160 Systems Security Engineering",
            "url": "https://csrc.nist.gov/pubs/sp/800/160/v1/upd2/final"
        },
        {
            "title": "NIST Cybersecurity Framework 2.0",
            "url": "https://csrc.nist.gov/pubs/cswp/29/final"
        }
    ],
    "Recovery / Rollback Abuse": [
        {
            "title": "NIST SP 800-218 Secure Software Development Framework",
            "url": "https://csrc.nist.gov/pubs/sp/800/218/final"
        },
        {
            "title": "NIST Cybersecurity Framework 2.0",
            "url": "https://csrc.nist.gov/pubs/cswp/29/final"
        }
    ],
    "Lack of Explainability": [
        {
            "title": "NIST AI 600-1 Generative AI Profile",
            "url": "https://doi.org/10.6028/NIST.AI.600-1"
        },
        {
            "title": "NIST AI Risk Management Framework",
            "url": "https://www.nist.gov/itl/ai-risk-management-framework"
        }
    ],
    "Inadequate Auditability": [
        {
            "title": "NIST Cybersecurity Framework 2.0",
            "url": "https://csrc.nist.gov/pubs/cswp/29/final"
        },
        {
            "title": "NIST SP 800-53 Rev. 5",
            "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        }
    ],
    "Regulatory Non-Compliance": [
        {
            "title": "EU NIS2 Directive Policy Page",
            "url": "https://digital-strategy.ec.europa.eu/en/policies/nis2-directive"
        },
        {
            "title": "ENISA NIS2 Technical Implementation Guidance",
            "url": "https://www.enisa.europa.eu/publications/nis2-technical-implementation-guidance"
        }
    ],
    "Missing Control-to-Requirement Mapping": [
        {
            "title": "NIST Cybersecurity Framework 2.0",
            "url": "https://csrc.nist.gov/pubs/cswp/29/final"
        },
        {
            "title": "ENISA NIS2 Technical Implementation Guidance",
            "url": "https://www.enisa.europa.eu/publications/nis2-technical-implementation-guidance"
        }
    ],
    "Policy-to-Implementation Drift": [
        {
            "title": "NIST SP 800-53 Rev. 5",
            "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
        },
        {
            "title": "NIST Cybersecurity Framework 2.0",
            "url": "https://csrc.nist.gov/pubs/cswp/29/final"
        }
    ],
    "Incident Notification Governance Failure": [
        {
            "title": "EU NIS2 Directive Policy Page",
            "url": "https://digital-strategy.ec.europa.eu/en/policies/nis2-directive"
        },
        {
            "title": "ENISA NIS2 Technical Implementation Guidance",
            "url": "https://www.enisa.europa.eu/publications/nis2-technical-implementation-guidance"
        }
    ],
    "Third-Party Assurance Gaps": [
        {
            "title": "NIST SP 800-161 Rev. 1 Cybersecurity Supply Chain Risk Management",
            "url": "https://csrc.nist.gov/pubs/sp/800/161/r1/final"
        },
        {
            "title": "NIST Cybersecurity Framework 2.0",
            "url": "https://csrc.nist.gov/pubs/cswp/29/final"
        }
    ],
    "Behavioral Drift": [
        {
            "title": "NIST AI Risk Management Framework",
            "url": "https://www.nist.gov/itl/ai-risk-management-framework"
        },
        {
            "title": "NIST AI 600-1 Generative AI Profile",
            "url": "https://doi.org/10.6028/NIST.AI.600-1"
        }
    ]
};
});
