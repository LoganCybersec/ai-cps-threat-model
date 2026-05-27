/* ═══════════════════════════════════════════
   ROBOTICS THREAT MODEL — REALISTIC FILTERING
   ═══════════════════════════════════════════ */

// ── Category colors (match CSS vars) ──
const CAT_COLORS = [
    '#f97583','#d2a8ff','#79c0ff','#56d364','#ff7b72','#ffa657',
    '#d29922','#a5d6ff','#f0883e','#7ee787','#db61a2','#e3b341'
];

// ── THREAT DATA (Original but cleaned up) ──
const CATEGORIES = [
    {
        id: 1,
        name: 'Communication & Network',
        threats: [
            {
                name: 'Man-in-the-Middle & Message Tampering',
                desc: 'An attacker intercepts and potentially modifies messages between robot components or between the robot and external services (C2, cloud). Particularly dangerous with unencrypted ROS2 DDS traffic.',
                tags: ['wifi','cellular','internet-exposed','organized','nation-state','high',
                       'drone','autonomous-vehicle','agv-amr','service-robot','industrial-arm','cobot','medical-robot',
                       'defense','critical-infrastructure','maritime','factory','warehouse','healthcare','home']
            },
            {
                name: 'Message Spoofing & Replay',
                desc: 'Replaying or fabricating valid-looking messages to control or confuse the robot. Without proper nonce/timestamp verification, old commands can be replayed to cause unintended actions.',
                tags: ['wifi','cellular','internet-exposed','organized','nation-state','high',
                       'drone','autonomous-vehicle','agv-amr','industrial-arm','cobot','service-robot','medical-robot',
                       'defense','critical-infrastructure','maritime','factory','warehouse','healthcare','home']
            },
            {
                name: 'Unauthorized Node Joining',
                desc: 'Rogue nodes joining the robot\'s internal communication bus (e.g., ROS2 DDS network) without authentication, allowing injection of malicious topics or services.',
                tags: ['wifi','lan-only','insider','organized','high',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','maritime','public-space','defense','critical-infrastructure']
            },
            {
                name: 'Denial-of-Service on Comms Channels',
                desc: 'Flooding or disrupting communication channels (Wi-Fi, MQTT, DDS) to prevent the robot from receiving commands or sending telemetry.',
                tags: ['wifi','cellular','internet-exposed','low-skill','organized','medium',
                       'drone','autonomous-vehicle','agv-amr','industrial-arm','cobot','service-robot','medical-robot',
                       'factory','warehouse','public-space','defense','critical-infrastructure','maritime','healthcare','home']
            },
            {
                name: 'Network Scanning & Protocol Abuse',
                desc: 'Reconnaissance of robot network services, port scanning, and protocol-level exploitation (e.g., DDS discovery abuse, Bluetooth RCE vectors).',
                tags: ['wifi','lan-only','internet-exposed','low-skill','insider','organized','medium',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','public-space','maritime','defense','critical-infrastructure','home']
            },
            {
                name: 'API Abuse & Insecure Remote Interfaces',
                desc: 'Exploiting poorly secured APIs (REST, MQTT, WebSocket) exposed by the robot or its cloud backend. Includes missing rate limiting, broken auth, and injection attacks.',
                tags: ['internet-exposed','wifi','cellular','organized','low-skill','high',
                       'service-robot','autonomous-vehicle','drone','agv-amr','industrial-arm','cobot','medical-robot',
                       'public-space','healthcare','home','critical-infrastructure','maritime','factory','warehouse','defense']
            }
        ]
    },
    {
        id: 2,
        name: 'System & Control-Plane',
        threats: [
            {
                name: 'Unauthorized Parameter Changes',
                desc: 'Modifying robot configuration parameters (speed limits, safety zones, PID values) without authorization, potentially causing dangerous behavior.',
                tags: ['insider','organized','nation-state','critical',
                       'industrial-arm','cobot','autonomous-vehicle','agv-amr','drone','service-robot','medical-robot',
                       'factory','warehouse','healthcare','defense','critical-infrastructure','maritime','public-space','home']
            },
            {
                name: 'Node / Component Impersonation',
                desc: 'A malicious process masquerades as a legitimate robot component to inject false data or commands into the control pipeline.',
                tags: ['insider','organized','nation-state','high',
                       'industrial-arm','cobot','agv-amr','drone','autonomous-vehicle','service-robot','medical-robot',
                       'factory','warehouse','defense','maritime','healthcare','public-space','critical-infrastructure','home']
            },
            {
                name: 'Command / Control Injection',
                desc: 'Injecting malicious commands into the robot\'s control path — e.g., crafted ROS2 service calls, manipulated waypoints, or overridden safety parameters.',
                tags: ['wifi','lan-only','internet-exposed','organized','nation-state','critical',
                       'autonomous-vehicle','drone','industrial-arm','cobot','agv-amr','service-robot','medical-robot',
                       'factory','defense','critical-infrastructure','healthcare','maritime','warehouse','public-space','home']
            },
            {
                name: 'Runtime Process Manipulation',
                desc: 'Interfering with running processes on the robot\'s compute platform — memory corruption, privilege escalation, or injecting code into robot middleware.',
                tags: ['insider','organized','nation-state','critical',
                       'industrial-arm','cobot','autonomous-vehicle','drone','agv-amr','service-robot','medical-robot',
                       'factory','defense','critical-infrastructure','maritime','warehouse','healthcare','public-space','home']
            },
            {
                name: 'Compromised Actuator Control Path',
                desc: 'Gaining direct or indirect control over actuators (motors, servos, grippers) bypassing safety checks. Can cause physical harm or destruction.',
                tags: ['insider','organized','nation-state','critical',
                       'industrial-arm','cobot','autonomous-vehicle','drone','agv-amr','service-robot','medical-robot',
                       'factory','healthcare','defense','critical-infrastructure','maritime','warehouse','public-space','home']
            },
            {
                name: 'Insecure Plugin / Module Loading',
                desc: 'Loading untrusted or tampered plugins, ROS2 packages, or shared libraries into the robot\'s runtime without signature verification.',
                tags: ['insider','organized','supply-chain','high',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','maritime','healthcare','defense','critical-infrastructure','public-space','home']
            },
            {
                name: 'Unsafe Fallback / Fail-Open Behavior',
                desc: 'When errors occur, the system falls back to an unsafe state (e.g., continuing operation without sensor input, defaulting to permissive access).',
                tags: ['low-skill','insider','high',
                       'industrial-arm','cobot','autonomous-vehicle','drone','agv-amr','service-robot','medical-robot',
                       'factory','warehouse','healthcare','defense','critical-infrastructure','maritime','public-space','home']
            }
        ]
    },
    {
        id: 3,
        name: 'Sensor & Perception',
        threats: [
            {
                name: 'Sensor Spoofing & Falsified Readings',
                desc: 'Injecting false sensor data to deceive the robot\'s perception — e.g., GPS spoofing a drone, LiDAR point-cloud injection, or feeding fake camera frames.',
                tags: ['camera','lidar','gps','imu','ultrasonic','infrared','microphone',
                       'organized','nation-state','critical',
                       'drone','autonomous-vehicle','agv-amr','cobot','industrial-arm','service-robot','medical-robot',
                       'defense','public-space','critical-infrastructure','maritime','factory','warehouse','healthcare',
                       'computer-vision','classical-ml']
            },
            {
                name: 'Sensor Jamming / Blinding',
                desc: 'Disabling or degrading sensors through physical interference — bright light to blind cameras, acoustic noise to jam microphones, RF jamming for GPS/wireless.',
                tags: ['camera','lidar','gps','ultrasonic','infrared','microphone',
                       'low-skill','organized','high',
                       'drone','autonomous-vehicle','agv-amr','cobot','industrial-arm','service-robot',
                       'defense','public-space','critical-infrastructure','maritime','factory','warehouse','healthcare']
            },
            {
                name: 'Adversarial Perception Inputs',
                desc: 'Carefully crafted inputs that fool ML models — adversarial patches on stop signs, adversarial textures, or 3D-printed objects that cause misclassification.',
                tags: ['camera','lidar','computer-vision','classical-ml',
                       'organized','nation-state','critical',
                       'autonomous-vehicle','drone','cobot','industrial-arm','agv-amr','service-robot','medical-robot',
                       'public-space','defense','critical-infrastructure','maritime','factory','healthcare']
            },
            {
                name: 'Physical Environment Manipulation',
                desc: 'Altering the physical environment to mislead sensors — e.g., moving landmarks, placing reflective surfaces to confuse LiDAR, modifying road markings.',
                tags: ['camera','lidar','ultrasonic','infrared',
                       'computer-vision','classical-ml',
                       'organized','low-skill','high',
                       'autonomous-vehicle','agv-amr','drone','cobot','industrial-arm','service-robot',
                       'public-space','warehouse','factory','maritime','healthcare']
            },
            {
                name: 'GPS / GNSS Spoofing & Jamming',
                desc: 'Specifically targeting positioning systems to cause navigation errors. Iran\'s capture of the RQ-170 Sentinel drone is a prominent example of GPS-based attack.',
                tags: ['gps','organized','nation-state','critical',
                       'drone','autonomous-vehicle','agv-amr',
                       'defense','public-space','critical-infrastructure','maritime','warehouse']
            },
            {
                name: 'Camera: Visual Spoofing & QR Injection',
                desc: 'Targeting camera-based systems with fake visual inputs, adversarial patches, or malicious QR codes that trigger prompt injection when interpreted by AI systems.',
                tags: ['camera','computer-vision','llm-assistant','llm-agent',
                       'organized','low-skill','high',
                       'service-robot','autonomous-vehicle','drone','cobot','industrial-arm','medical-robot',
                       'public-space','healthcare','home','maritime','factory','warehouse']
            },
            {
                name: 'Microphone: Acoustic Command Injection',
                desc: 'Injecting inaudible or disguised voice commands via ultrasonic carriers or laser-based audio injection (e.g., LightCommands attack on voice assistants).',
                tags: ['microphone','speech-recognition',
                       'organized','nation-state','high',
                       'service-robot','drone','medical-robot','home',
                       'public-space','healthcare','maritime']
            },
            {
                name: 'IMU: Vibration-Based Disturbance',
                desc: 'Using acoustic resonance or physical vibration to manipulate IMU (accelerometer/gyroscope) readings, causing navigation or stabilization errors.',
                tags: ['imu','organized','nation-state','high',
                       'drone','autonomous-vehicle','cobot','industrial-arm','agv-amr',
                       'defense','critical-infrastructure','maritime','factory','warehouse']
            }
        ]
    },
    {
        id: 4,
        name: 'Cloud / API / Integration',
        threats: [
            {
                name: 'Broken Object-Level Authorization (BOLA)',
                desc: 'APIs that fail to verify whether the requesting identity is authorized for the specific resource — allowing access to other robots\' data or commands.',
                tags: ['internet-exposed','wifi','cellular',
                       'organized','insider','high',
                       'service-robot','agv-amr','drone','autonomous-vehicle','industrial-arm','cobot','medical-robot',
                       'healthcare','public-space','factory','warehouse','maritime','defense','critical-infrastructure','home']
            },
            {
                name: 'Insecure MQTT / Topic Permissions',
                desc: 'MQTT brokers or DDS topics with inadequate ACLs, allowing unauthorized subscribe/publish to control topics, sensor feeds, or command channels.',
                tags: ['wifi','lan-only','internet-exposed',
                       'insider','organized','high',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','maritime','public-space','defense','critical-infrastructure','home']
            },
            {
                name: 'Webhook / Event Spoofing',
                desc: 'Forging webhook callbacks or event messages to trigger robot actions, update configurations, or poison data queues.',
                tags: ['internet-exposed','organized','medium',
                       'service-robot','agv-amr','industrial-arm','cobot','drone','autonomous-vehicle','medical-robot',
                       'warehouse','public-space','healthcare','maritime','factory','defense','critical-infrastructure','home']
            },
            {
                name: 'Weak Nonce / Timestamp Checks',
                desc: 'Insufficient replay protection allowing captured API calls or commands to be resent, potentially repeating critical robot actions.',
                tags: ['wifi','internet-exposed','cellular',
                       'organized','nation-state','high',
                       'drone','autonomous-vehicle','agv-amr','industrial-arm','cobot','service-robot','medical-robot',
                       'defense','critical-infrastructure','maritime','factory','warehouse','healthcare','public-space','home']
            },
            {
                name: 'Shadow / Debug Interfaces in Production',
                desc: 'Development or debug endpoints (web consoles, debug ROS2 nodes, test APIs) left accessible in deployed robots, providing easy attack entry points.',
                tags: ['wifi','lan-only','internet-exposed',
                       'low-skill','insider','critical',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','public-space','maritime','defense','critical-infrastructure','home']
            },
            {
                name: 'Cloud Credential Exposure',
                desc: 'Hardcoded cloud credentials, API keys, or database connection strings embedded in robot firmware, extractable through reverse engineering or memory dumps.',
                tags: ['internet-exposed','wifi',
                       'low-skill','insider','organized','critical',
                       'service-robot','drone','agv-amr','autonomous-vehicle','industrial-arm','cobot','medical-robot',
                       'public-space','home','warehouse','healthcare','maritime','factory','defense','critical-infrastructure']
            }
        ]
    },
    {
        id: 5,
        name: 'AI / ML / LLM',
        threats: [
            {
                name: 'Training Data Poisoning',
                desc: 'Injecting malicious examples into training data to create backdoors or degrade model performance. A poisoned autonomous driving model could misclassify specific objects.',
                tags: ['computer-vision','classical-ml','llm-assistant','llm-agent',
                       'supply-chain','insider','nation-state','critical',
                       'autonomous-vehicle','drone','service-robot','medical-robot','industrial-arm','cobot','agv-amr',
                       'defense','healthcare','public-space','critical-infrastructure','maritime','factory','warehouse','home']
            },
            {
                name: 'Backdoored / Tampered Models',
                desc: 'Using pre-trained models from untrusted sources that contain hidden backdoor triggers activating malicious behavior under specific conditions.',
                tags: ['computer-vision','classical-ml','llm-assistant','llm-agent',
                       'supply-chain','nation-state','critical',
                       'autonomous-vehicle','drone','service-robot','industrial-arm','cobot','agv-amr','medical-robot',
                       'defense','critical-infrastructure','maritime','factory','warehouse','healthcare','public-space','home']
            },
            {
                name: 'Model Extraction & Inversion',
                desc: 'Querying a model repeatedly to reconstruct it (extraction) or to infer sensitive training data (inversion). Can leak proprietary algorithms or private information.',
                tags: ['computer-vision','classical-ml','llm-assistant','llm-agent',
                       'internet-exposed','organized','nation-state','high',
                       'service-robot','autonomous-vehicle','industrial-arm','cobot','drone','agv-amr','medical-robot',
                       'defense','healthcare','maritime','factory','warehouse','public-space','critical-infrastructure','home']
            },
            {
                name: 'Direct Prompt Injection',
                desc: 'Crafting inputs that cause LLM-based systems to override their instructions — e.g., commanding a service robot to ignore safety rules or reveal system prompts.',
                tags: ['llm-assistant','llm-agent','speech-recognition',
                       'low-skill','organized','critical',
                       'service-robot','medical-robot','autonomous-vehicle','drone','industrial-arm','cobot','agv-amr',
                       'public-space','healthcare','home','maritime','factory','warehouse','defense','critical-infrastructure']
            },
            {
                name: 'Indirect Prompt Injection',
                desc: 'Hidden instructions in external content (QR codes, documents, webpages) processed by the robot\'s AI, causing unintended actions without direct user interaction.',
                tags: ['llm-assistant','llm-agent','computer-vision','camera',
                       'organized','nation-state','critical',
                       'service-robot','autonomous-vehicle','drone','industrial-arm','cobot','agv-amr','medical-robot',
                       'public-space','healthcare','home','defense','maritime','factory','warehouse','critical-infrastructure']
            },
            {
                name: 'Retrieval / Context Poisoning',
                desc: 'Poisoning the knowledge base or retrieval pipeline (RAG) used by robot AI, injecting malicious instructions that get included in the model\'s context window.',
                tags: ['llm-assistant','llm-agent',
                       'internet-exposed','insider','organized','high',
                       'service-robot','medical-robot','autonomous-vehicle','drone','industrial-arm','cobot','agv-amr',
                       'healthcare','public-space','maritime','factory','warehouse','defense','critical-infrastructure','home']
            },
            {
                name: 'Unsafe Autonomous Actions',
                desc: 'LLM or AI system generating outputs that directly translate to dangerous physical actions — e.g., an LLM agent calling unsafe APIs, overriding speed limits, or disabling safety systems.',
                tags: ['llm-agent','llm-assistant',
                       'organized','nation-state','critical',
                       'autonomous-vehicle','drone','industrial-arm','cobot','agv-amr','service-robot','medical-robot',
                       'defense','healthcare','factory','critical-infrastructure','maritime','warehouse','public-space','home']
            },
            {
                name: 'Tool / Function Invocation Hijacking',
                desc: 'Manipulating tool-call arguments or invocation flow so an agent executes unintended high-impact actions on robot control or backend orchestration APIs.',
                tags: ['llm-agent','llm-assistant',
                       'internet-exposed','cellular','organized','nation-state','critical',
                       'autonomous-vehicle','drone','service-robot','agv-amr','medical-robot','industrial-arm','cobot',
                       'public-space','healthcare','warehouse','critical-infrastructure','maritime','factory','defense','home']
            },
            {
                name: 'Over-Permissioned Agent Tooling',
                desc: 'Agents are connected to tools with excessive privileges, allowing single-step abuse to perform destructive or unsafe operations beyond intended scope.',
                tags: ['llm-agent','llm-assistant',
                       'internet-exposed','lan-only','insider','organized','critical',
                       'industrial-arm','cobot','agv-amr','service-robot','medical-robot','autonomous-vehicle','drone',
                       'factory','warehouse','healthcare','critical-infrastructure','maritime','public-space','defense','home']
            },
            {
                name: 'Cross-Agent Privilege Escalation',
                desc: 'A lower-trust agent influences or chains into a higher-privilege agent workflow, bypassing intended separation of duties and control boundaries.',
                tags: ['llm-agent','llm-assistant',
                       'internet-exposed','lan-only','organized','supply-chain','nation-state','critical',
                       'industrial-arm','cobot','agv-amr','service-robot','autonomous-vehicle','drone','medical-robot',
                       'factory','warehouse','public-space','critical-infrastructure','maritime','healthcare','defense','home']
            },
            {
                name: 'Memory Poisoning (Short/Long-Term)',
                desc: 'Adversarial content is persisted into short-term context or long-term memory, causing recurring unsafe recommendations and policy drift across sessions.',
                tags: ['llm-agent','llm-assistant',
                       'internet-exposed','insider','organized','high',
                       'service-robot','medical-robot','autonomous-vehicle','agv-amr','industrial-arm','cobot','drone',
                       'healthcare','public-space','warehouse','home','maritime','factory','defense','critical-infrastructure']
            },
            {
                name: 'System Prompt / Policy Exfiltration',
                desc: 'Attackers induce disclosure of hidden system prompts, policy text, or internal guardrail instructions that can be reused to craft stronger follow-up attacks.',
                tags: ['llm-agent','llm-assistant','speech-recognition',
                       'internet-exposed','low-skill','organized','high',
                       'service-robot','medical-robot','autonomous-vehicle','industrial-arm','cobot','drone','agv-amr',
                       'public-space','healthcare','home','maritime','factory','warehouse','defense','critical-infrastructure']
            },
            {
                name: 'LLM Output Injection to Control APIs',
                desc: 'Unsafe LLM output is passed downstream into control APIs without strict validation, enabling unauthorized command construction and dangerous execution paths.',
                tags: ['llm-agent','llm-assistant',
                       'internet-exposed','lan-only','organized','nation-state','critical',
                       'industrial-arm','cobot','agv-amr','autonomous-vehicle','drone','service-robot','medical-robot',
                       'factory','warehouse','healthcare','critical-infrastructure','defense','maritime','public-space','home']
            },
            {
                name: 'Multimodal Prompt Injection (Image/Audio)',
                desc: 'Injected instructions hidden in visual or audio channels influence multimodal agent behavior, including camera and speech-driven robotic tasks.',
                tags: ['llm-agent','llm-assistant','computer-vision','speech-recognition','camera','microphone',
                       'internet-exposed','organized','nation-state','critical',
                       'service-robot','autonomous-vehicle','drone','medical-robot','industrial-arm','cobot','agv-amr',
                       'public-space','healthcare','home','defense','maritime','factory','warehouse','critical-infrastructure']
            },
            {
                name: 'Context Window Flooding / Token-Exhaustion Abuse',
                desc: 'Flooding agent context with oversized or adversarial inputs causes truncation of critical constraints, degraded reasoning quality, and denial of safe decision support.',
                tags: ['llm-agent','llm-assistant',
                       'internet-exposed','wifi','organized','high',
                       'service-robot','agv-amr','autonomous-vehicle','medical-robot','industrial-arm','cobot','drone',
                       'public-space','warehouse','healthcare','home','maritime','factory','defense','critical-infrastructure']
            },
            {
                name: 'Human-Override Suppression / Deceptive Agent Behavior',
                desc: 'Agent behavior steers operators away from safe override actions by producing misleading confidence or deceptive rationale during high-risk situations.',
                tags: ['llm-agent','llm-assistant','speech-recognition',
                       'organized','nation-state','critical',
                       'autonomous-vehicle','drone','industrial-arm','cobot','agv-amr','medical-robot','service-robot',
                       'public-space','healthcare','factory','critical-infrastructure','maritime','warehouse','defense','home']
            },
            {
                name: 'RAG Source Trust Bypass',
                desc: 'Untrusted retrieval sources are treated as high-trust context, allowing attackers to bypass source-trust controls and inject manipulative operational guidance.',
                tags: ['llm-agent','llm-assistant','computer-vision',
                       'internet-exposed','organized','supply-chain','high',
                       'service-robot','medical-robot','autonomous-vehicle','agv-amr','industrial-arm','cobot','drone',
                       'healthcare','public-space','warehouse','critical-infrastructure','maritime','factory','defense','home']
            }
        ]
    },
    {
        id: 6,
        name: 'Identity & Access',
        threats: [
            {
                name: 'Weak Auth & Default Credentials',
                desc: 'Robots shipped with default passwords, hardcoded keys, or no authentication — a trivial entry point especially for internet-exposed or Wi-Fi connected systems.',
                tags: ['wifi','internet-exposed','lan-only',
                       'low-skill','insider','critical',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','public-space','home','maritime','defense','critical-infrastructure']
            },
            {
                name: 'Missing / Weak Authorization (RBAC)',
                desc: 'Lack of role-based access control allowing any authenticated user to perform privileged operations like firmware updates, config changes, or emergency stops.',
                tags: ['wifi','lan-only','internet-exposed',
                       'insider','organized','high',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','maritime','public-space','defense','critical-infrastructure','home']
            },
            {
                name: 'Overprivileged Service Accounts',
                desc: 'Robot processes or cloud integrations running with excessive permissions — a compromised component gains access to everything instead of just what it needs.',
                tags: ['internet-exposed','wifi','lan-only',
                       'insider','organized','high',
                       'service-robot','agv-amr','drone','autonomous-vehicle','industrial-arm','cobot','medical-robot',
                       'factory','warehouse','healthcare','defense','maritime','public-space','critical-infrastructure','home']
            },
            {
                name: 'Session / Token Hijacking',
                desc: 'Stealing or replaying authentication tokens, session cookies, or API keys to impersonate legitimate users or services.',
                tags: ['wifi','internet-exposed','cellular',
                       'organized','insider','high',
                       'service-robot','agv-amr','drone','industrial-arm','cobot','autonomous-vehicle','medical-robot',
                       'public-space','warehouse','healthcare','maritime','factory','defense','critical-infrastructure','home']
            },
            {
                name: 'Insecure Remote Maintenance Auth',
                desc: 'Vendor remote support or OTA update channels with weak authentication, potentially allowing attackers to push malicious updates or access robot internals.',
                tags: ['internet-exposed','wifi','cellular',
                       'organized','supply-chain','critical',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','critical-infrastructure','maritime','public-space','defense','home']
            }
        ]
    },
    {
        id: 7,
        name: 'Software Supply Chain',
        threats: [
            {
                name: 'Dependency Hijacking & Package Confusion',
                desc: 'Attacks on the robot\'s software dependencies — typosquatting ROS2 packages, dependency confusion between internal and public repositories.',
                tags: ['supply-chain','organized','nation-state','high',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','defense','critical-infrastructure','maritime','healthcare','public-space','home']
            },
            {
                name: 'Malicious Third-Party Components',
                desc: 'Using unvetted sensors, libraries, or middleware components that contain backdoors or vulnerabilities. Includes compromised ROS2 packages from community repos.',
                tags: ['supply-chain','organized','nation-state','high',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','maritime','public-space','defense','critical-infrastructure','home']
            },
            {
                name: 'Build / CI Pipeline Compromise',
                desc: 'Compromising the robot\'s build infrastructure to inject malicious code during compilation or packaging, affecting all deployed units.',
                tags: ['supply-chain','nation-state','organized','critical',
                       'industrial-arm','cobot','autonomous-vehicle','drone','agv-amr','service-robot','medical-robot',
                       'defense','critical-infrastructure','factory','maritime','warehouse','healthcare','public-space','home']
            },
            {
                name: 'Unsigned / Unverified Updates',
                desc: 'Firmware or software updates delivered without cryptographic signature verification — allowing MitM or compromised update servers to push malicious code.',
                tags: ['wifi','internet-exposed','cellular',
                       'organized','supply-chain','critical',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','defense','critical-infrastructure','maritime','public-space','home']
            },
            {
                name: 'Tampered Artifacts',
                desc: 'Modified software packages, ML models, or container images distributed through legitimate channels. Includes poisoned model weights from model hubs.',
                tags: ['supply-chain','nation-state','organized','high',
                       'computer-vision','classical-ml','llm-assistant','llm-agent',
                       'autonomous-vehicle','drone','service-robot','industrial-arm','cobot','agv-amr','medical-robot',
                       'defense','critical-infrastructure','maritime','factory','warehouse','healthcare','public-space','home']
            }
        ]
    },
    {
        id: 8,
        name: 'Data Security & Privacy',
        threats: [
            {
                name: 'Sensitive Telemetry / Log Leakage',
                desc: 'Robot telemetry (location, camera feeds, sensor data) or logs containing sensitive information exposed through insecure channels or storage.',
                tags: ['wifi','internet-exposed','camera','gps','microphone',
                       'low-skill','insider','high',
                       'service-robot','autonomous-vehicle','drone','medical-robot','industrial-arm','cobot','agv-amr',
                       'healthcare','public-space','defense','home','maritime','factory','warehouse','critical-infrastructure']
            },
            {
                name: 'Data Interception & Exfiltration',
                desc: 'Active interception of data in transit between robot and cloud/backend, or malicious exfiltration of collected data by compromised components.',
                tags: ['wifi','internet-exposed','cellular',
                       'organized','nation-state','high',
                       'drone','autonomous-vehicle','service-robot','medical-robot','industrial-arm','cobot','agv-amr',
                       'defense','healthcare','critical-infrastructure','maritime','factory','warehouse','public-space','home']
            },
            {
                name: 'Insecure Storage & Backup Exposure',
                desc: 'Sensitive data stored unencrypted on the robot, in cloud storage, or in backups. Includes credentials, maps, patient data, or operational intelligence.',
                tags: ['low-skill','insider','organized','high',
                       'service-robot','autonomous-vehicle','medical-robot','drone','industrial-arm','cobot','agv-amr',
                       'healthcare','defense','home','public-space','maritime','factory','warehouse','critical-infrastructure']
            },
            {
                name: 'Log Tampering & Forensics Evasion',
                desc: 'Attackers modifying or deleting logs to cover their tracks, preventing incident investigation and regulatory compliance.',
                tags: ['insider','organized','nation-state','high',
                       'industrial-arm','cobot','autonomous-vehicle','drone','agv-amr','service-robot','medical-robot',
                       'factory','healthcare','defense','critical-infrastructure','maritime','warehouse','public-space','home']
            },
            {
                name: 'Excessive Personal Data Collection',
                desc: 'Robots collecting more data than necessary — facial recognition of bystanders, recording conversations, tracking movement patterns — violating GDPR/privacy regulations.',
                tags: ['camera','microphone','gps',
                       'computer-vision','speech-recognition',
                       'low-skill','medium',
                       'service-robot','autonomous-vehicle','drone','agv-amr','medical-robot','home',
                       'public-space','healthcare','maritime','factory','warehouse','defense','critical-infrastructure']
            }
        ]
    },
    {
        id: 9,
        name: 'Hardware & Physical',
        threats: [
            {
                name: 'Physical Tampering & Unauthorized Access',
                desc: 'Gaining physical access to the robot to install implants, extract data, modify components, or attach rogue devices.',
                tags: ['low-skill','insider','organized','high',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','public-space','home','maritime','healthcare']
            },
            {
                name: 'Debug Interface Abuse',
                desc: 'Exploiting exposed JTAG, UART, SSH, or serial debug interfaces to gain privileged access, extract firmware, or inject code.',
                tags: ['low-skill','insider','organized','critical',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','public-space','maritime','healthcare']
            },
            {
                name: 'Firmware Extraction & Reverse Engineering',
                desc: 'Dumping and analyzing robot firmware to discover vulnerabilities, extract credentials, or understand proprietary algorithms.',
                tags: ['insider','organized','nation-state','high',
                       'industrial-arm','cobot','drone','autonomous-vehicle','agv-amr','service-robot',
                       'defense','critical-infrastructure','factory','maritime','warehouse']
            },
            {
                name: 'Hardware Implants & Component Replacement',
                desc: 'Installing malicious hardware components — rogue network adapters, compromised sensors, or backdoored compute modules — during manufacturing or maintenance.',
                tags: ['supply-chain','nation-state','insider','critical',
                       'industrial-arm','cobot','agv-amr','service-robot','autonomous-vehicle','drone','medical-robot',
                       'defense','critical-infrastructure','healthcare','maritime','factory']
            },
            {
                name: 'Fault Injection & Side-Channel Attacks',
                desc: 'Using voltage glitching, EM emanation analysis, power analysis, or timing attacks to extract secrets or bypass security mechanisms.',
                tags: ['organized','nation-state','high',
                       'autonomous-vehicle','drone','industrial-arm','cobot',
                       'defense','critical-infrastructure','maritime','factory']
            }
        ]
    },
    {
        id: 10,
        name: 'Safety & Human-Interaction',
        threats: [
            {
                name: 'Safety Mechanism Bypass',
                desc: 'Disabling or circumventing safety systems — emergency stops, force/torque limits, speed restrictions, safety-rated monitored stop (per ISO 10218).',
                tags: ['insider','organized','nation-state','critical',
                       'industrial-arm','cobot','medical-robot','autonomous-vehicle','drone','agv-amr',
                       'factory','healthcare','defense','critical-infrastructure','maritime','warehouse','public-space']
            },
            {
                name: 'Unsafe Motion / Task Execution',
                desc: 'Causing the robot to execute movements outside safe parameters — excessive speed, force, or range — through manipulated commands or sensor data.',
                tags: ['organized','nation-state','critical',
                       'industrial-arm','cobot','autonomous-vehicle','drone','medical-robot','agv-amr',
                       'factory','healthcare','warehouse','maritime','defense','public-space']
            },
            {
                name: 'Collision-Avoidance Degradation',
                desc: 'Attacks targeting collision detection/avoidance systems — spoofing proximity sensors, blinding LiDAR, or manipulating safety-rated sensor data.',
                tags: ['camera','lidar','ultrasonic','infrared','imu',
                       'organized','nation-state','critical',
                       'autonomous-vehicle','agv-amr','cobot','drone','service-robot',
                       'factory','warehouse','public-space','defense','maritime','healthcare']
            },
            {
                name: 'Human-Zone Protection Bypass',
                desc: 'Defeating safety zones or collaborative workspace monitoring, allowing the robot to operate at full speed/force when humans are present.',
                tags: ['organized','insider','critical',
                       'industrial-arm','cobot','agv-amr','service-robot',
                       'factory','warehouse','healthcare','maritime','public-space']
            },
            {
                name: 'Latency Manipulation Causing Unsafe Decisions',
                desc: 'Introducing artificial delays in sensor data or command responses, causing the robot to make decisions based on stale information.',
                tags: ['wifi','lan-only','organized','nation-state','high',
                       'autonomous-vehicle','drone','cobot','industrial-arm','agv-amr',
                       'factory','defense','critical-infrastructure','maritime']
            }
        ]
    },
    {
        id: 11,
        name: 'Availability & Resilience',
        threats: [
            {
                name: 'Resource Exhaustion',
                desc: 'Depleting the robot\'s compute, memory, network bandwidth, or battery/power to prevent normal operation. Includes crypto-mining malware on robot compute.',
                tags: ['wifi','internet-exposed','low-skill','organized','high',
                       'industrial-arm','cobot','agv-amr','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','public-space','defense','maritime','healthcare']
            },
            {
                name: 'Fleet / Server Disruption & Ransomware',
                desc: 'Attacking fleet management servers or deploying ransomware to disable entire robot fleets simultaneously, causing massive operational disruption.',
                tags: ['internet-exposed','wifi','organized','nation-state','critical',
                       'agv-amr','industrial-arm','cobot','service-robot','drone','autonomous-vehicle','medical-robot',
                       'factory','warehouse','healthcare','critical-infrastructure','maritime','defense']
            },
            {
                name: 'Time Synchronization Disruption',
                desc: 'Manipulating NTP/PTP or other time sources to desynchronize robot components, causing coordination failures in multi-robot systems or safety timing violations.',
                tags: ['wifi','lan-only','organized','nation-state','high',
                       'industrial-arm','cobot','agv-amr','autonomous-vehicle','drone',
                       'factory','warehouse','defense','critical-infrastructure','maritime']
            },
            {
                name: 'Failover / Degraded-Mode Manipulation',
                desc: 'Deliberately triggering degraded mode and then exploiting reduced security controls or monitoring in that state.',
                tags: ['organized','nation-state','high',
                       'autonomous-vehicle','drone','industrial-arm','cobot','agv-amr','medical-robot',
                       'defense','critical-infrastructure','factory','maritime','healthcare']
            },
            {
                name: 'Recovery / Rollback Abuse',
                desc: 'Exploiting recovery mechanisms to rollback to a vulnerable firmware version, corrupt backup systems, or prevent legitimate recovery.',
                tags: ['insider','organized','supply-chain','high',
                       'industrial-arm','cobot','agv-amr','autonomous-vehicle','medical-robot',
                       'factory','defense','critical-infrastructure','maritime','healthcare']
            }
        ]
    },
    {
        id: 12,
        name: 'Governance & Compliance',
        threats: [
            {
                name: 'Lack of Explainability',
                desc: 'Robot AI making safety-critical or impactful decisions without the ability to explain reasoning — violating EU AI Act requirements and preventing incident investigation.',
                tags: ['llm-assistant','llm-agent','computer-vision','classical-ml',
                       'low-skill','medium',
                       'autonomous-vehicle','medical-robot','service-robot',
                       'healthcare','public-space','defense','maritime']
            },
            {
                name: 'Inadequate Auditability',
                desc: 'Insufficient logging, monitoring, or traceability of robot actions and decisions, preventing compliance verification and incident forensics.',
                tags: ['low-skill','insider','high',
                       'industrial-arm','cobot','autonomous-vehicle','medical-robot','agv-amr',
                       'factory','healthcare','defense','critical-infrastructure','maritime']
            },
            {
                name: 'Regulatory Non-Compliance',
                desc: 'Failing to meet GDPR, NIS2, ISO 27001, ISO 10218, or EU AI Act requirements — leading to legal liability, fines, and operational restrictions.',
                tags: ['low-skill','high',
                       'industrial-arm','cobot','autonomous-vehicle','medical-robot','service-robot','drone',
                       'factory','healthcare','public-space','defense','critical-infrastructure','maritime']
            },
            {
                name: 'Missing Control-to-Requirement Mapping',
                desc: 'Security controls are implemented without a traceable mapping to legal, regulatory, and standards requirements, causing audit failures and unmanaged obligations.',
                tags: ['low-skill','insider','high',
                       'industrial-arm','cobot','autonomous-vehicle','medical-robot','service-robot','drone','agv-amr',
                       'factory','warehouse','healthcare','public-space','home','defense','critical-infrastructure','maritime']
            },
            {
                name: 'Policy-to-Implementation Drift',
                desc: 'Governance policies exist on paper but are not consistently translated into technical and operational controls, creating a false sense of compliance.',
                tags: ['insider','organized','high',
                       'industrial-arm','cobot','autonomous-vehicle','medical-robot','service-robot','drone','agv-amr',
                       'factory','warehouse','healthcare','public-space','home','defense','critical-infrastructure','maritime']
            },
            {
                name: 'Incident Notification Governance Failure',
                desc: 'Missing or unclear incident classification, escalation, and notification processes lead to late reporting and breaches of mandatory disclosure obligations.',
                tags: ['low-skill','insider','high',
                       'industrial-arm','cobot','autonomous-vehicle','medical-robot','service-robot','drone','agv-amr',
                       'factory','warehouse','healthcare','public-space','home','defense','critical-infrastructure','maritime']
            },
            {
                name: 'Third-Party Assurance Gaps',
                desc: 'Supplier and integrator contracts lack enforceable security clauses, audit rights, or evidence obligations, increasing compliance and operational risk.',
                tags: ['supply-chain','organized','high',
                       'industrial-arm','cobot','autonomous-vehicle','medical-robot','service-robot','drone','agv-amr',
                       'factory','warehouse','healthcare','public-space','home','defense','critical-infrastructure','maritime']
            },
            {
                name: 'Behavioral Drift',
                desc: 'AI models gradually changing behavior through continuous learning or environmental changes, causing unsafe or unfair outcomes without obvious triggers.',
                tags: ['computer-vision','classical-ml','llm-assistant','llm-agent',
                       'insider','medium',
                       'autonomous-vehicle','service-robot','medical-robot',
                       'healthcare','public-space','maritime']
            }
        ]
    }
];

if (typeof window !== 'undefined' && window.THREAT_CONTENT && typeof window.THREAT_CONTENT.enrichCategories === 'function') {
    window.THREAT_CONTENT.enrichCategories(CATEGORIES);
}

// ── SMART THREAT SCORING ──
const CONTEXT_SCORES = {
    // Environment risk multipliers
    'defense': 2.0,
    'critical-infrastructure': 1.9,
    'healthcare': 1.7,
    'public-space': 1.4,
    'factory': 1.3,
    'warehouse': 1.1,
    'home': 1.0,

    // Attacker sophistication
    'nation-state': 2.0,
    'organized': 1.5,
    'supply-chain': 1.4,
    'insider': 1.3,
    'low-skill': 0.8,

    // Network exposure risk
    'internet-exposed': 1.8,
    'cellular': 1.5,
    'wifi': 1.3,
    'lan-only': 1.0,
    'air-gapped': 0.5,

    // Robot type risk (based on potential impact)
    'autonomous-vehicle': 1.9,
    'medical-robot': 1.8,
    'drone': 1.7,
    'industrial-arm': 1.6,
    'cobot': 1.5,
    'agv-amr': 1.3,
    'service-robot': 1.2,

    // AI complexity risk
    'llm-agent': 1.85,
    'llm-assistant': 1.65,
    'computer-vision': 1.4,
    'speech-recognition': 1.3,
    'classical-ml': 1.2,
    'none': 1.0
};

const SEVERITY_SCORES = {
    'critical': 10,
    'high': 7,
    'medium': 4,
    'low': 2
};

const TAG_DIMENSIONS = {
    robotType: new Set(['industrial-arm', 'cobot', 'drone', 'agv-amr', 'autonomous-vehicle', 'service-robot', 'medical-robot']),
    environment: new Set(['factory', 'warehouse', 'healthcare', 'public-space', 'home', 'defense', 'critical-infrastructure', 'maritime']),
    aiStack: new Set(['none', 'classical-ml', 'computer-vision', 'speech-recognition', 'llm-assistant', 'llm-agent']),
    sensors: new Set(['camera', 'lidar', 'gps', 'imu', 'ultrasonic', 'infrared', 'microphone']),
    network: new Set(['air-gapped', 'lan-only', 'wifi', 'cellular', 'internet-exposed']),
    attacker: new Set(['low-skill', 'insider', 'organized', 'supply-chain', 'nation-state']),
    severity: new Set(['low', 'medium', 'high', 'critical']),
    // NEW: Context-aware dimensions
    dataSensitivity: new Set(['public', 'internal', 'user-data', 'confidential', 'classified'])
};

const NETWORK_HIERARCHY = {
    'air-gapped': 1,
    'lan-only': 2,
    'wifi': 3,
    'cellular': 4,
    'internet-exposed': 5
};

const ATTACKER_HIERARCHY = {
    'low-skill': 1,
    'insider': 2,
    'organized': 3,
    'supply-chain': 4,
    'nation-state': 5
};

// ── THREAT FAMILY MAPPING ──
const CATEGORY_FAMILY_MAP = {
    'Communication & Network': 'network-remote',
    'System & Control-Plane': 'system-control',
    'Sensor & Perception': 'sensor-dependent',
    'Cloud / API / Integration': 'cloud-integration',
    'AI / ML / LLM': 'ai-dependent',
    'Identity & Access': 'identity-access',
    'Software Supply Chain': 'supply-chain',
    'Data Security & Privacy': 'data-governance',
    'Hardware & Physical': 'hardware-physical',
    'Safety & Human-Interaction': 'safety',
    'Availability & Resilience': 'resilience',
    'Governance & Compliance': 'governance'
};

const THREAT_CATEGORY_INDEX = new Map();
CATEGORIES.forEach(category => {
    category.threats.forEach(threat => {
        THREAT_CATEGORY_INDEX.set(threat.name, category.name);
    });
});

const UNMAPPED_THREAT_WARNED = new Set();

function inferFamilyFromTags(threat) {
    const tags = threat.tags || [];
    if (tags.some(tag => TAG_DIMENSIONS.aiStack.has(tag) && tag !== 'none')) return 'ai-dependent';
    if (tags.some(tag => TAG_DIMENSIONS.sensors.has(tag))) return 'sensor-dependent';
    if (tags.includes('supply-chain')) return 'supply-chain';
    if (tags.some(tag => TAG_DIMENSIONS.network.has(tag))) return 'network-remote';
    if (tags.some(tag => ['defense', 'critical-infrastructure', 'healthcare'].includes(tag))) return 'safety';
    return null;
}

function getThreatFamily(threat) {
    const categoryName = THREAT_CATEGORY_INDEX.get(threat.name);
    if (categoryName && CATEGORY_FAMILY_MAP[categoryName]) {
        return CATEGORY_FAMILY_MAP[categoryName];
    }

    const fallbackFamily = inferFamilyFromTags(threat);
    if (fallbackFamily) {
        return fallbackFamily;
    }

    if (typeof console !== 'undefined' && !UNMAPPED_THREAT_WARNED.has(threat.name)) {
        UNMAPPED_THREAT_WARNED.add(threat.name);
        console.warn(`[context-rules] No family mapping found for threat: ${threat.name}`);
    }

    return null;
}

function deriveComplianceObligations(selectedFilters) {
    const obligations = new Set();
    const environments = selectedFilters.environment || [];
    const sensitivity = selectedFilters.dataSensitivity || [];
    const aiStack = (selectedFilters.aiStack || []).filter(tag => tag !== 'none');

    const hasPersonalData = sensitivity.includes('user-data') || sensitivity.includes('confidential') || sensitivity.includes('classified');
    const hasHighlySensitiveData = sensitivity.includes('confidential') || sensitivity.includes('classified');

    if (environments.some(tag => ['factory', 'warehouse', 'healthcare', 'defense', 'critical-infrastructure', 'maritime'].includes(tag)) || hasHighlySensitiveData) {
        obligations.add('iso-27001');
    }
    if (environments.some(tag => ['healthcare', 'public-space', 'home'].includes(tag)) || hasPersonalData) {
        obligations.add('gdpr');
    }
    if (environments.some(tag => ['critical-infrastructure', 'defense', 'maritime'].includes(tag))) {
        obligations.add('nis2');
        obligations.add('imo-cybersecurity'); // International Maritime Organization
    }
    if (aiStack.length > 0 && (environments.some(tag => ['healthcare', 'public-space', 'critical-infrastructure', 'defense', 'maritime'].includes(tag)) || hasPersonalData)) {
        obligations.add('eu-ai-act');
    }

    return Array.from(obligations);
}

// ── CONTEXT-AWARE RULE PACK ──
// Priority-ordered rules for contextual scoring adjustments
const RULE_PACK_V1 = [
    // Rule 1: Air-gapped dramatically downscales network-remote threats
    {
        id: 'air-gapped-network-remote',
        priority: 1,
        family: 'network-remote',
        condition: (threat, filters) => {
            return filters.network.includes('air-gapped');
        },
        multiplier: 0.3,  // 70% reduction
        rationale: 'Network-remote threats are not feasible in air-gapped environments'
    },
    
    // Rule 2: Air-gapped + no insider = sensor/hardware threats drop to negligible
    {
        id: 'air-gapped-no-insider-sensor-hardware',
        priority: 2,
        families: ['sensor-dependent', 'hardware-physical'],
        condition: (threat, filters) => {
            const isAirGapped = filters.network.includes('air-gapped');
            const hasInsiderAttacker = filters.attacker.includes('insider') || filters.attacker.includes('supply-chain');
            return isAirGapped && !hasInsiderAttacker;
        },
        multiplier: 0.7,
        rationale: 'Isolated systems reduce many sensor/hardware remote vectors, but not to zero'
    },
    
    // Rule 3: Air-gapped + insider/supply-chain = sensor/hardware escalates back
    {
        id: 'air-gapped-insider-escalates',
        priority: 3,
        families: ['sensor-dependent', 'hardware-physical'],
        condition: (threat, filters) => {
            const isAirGapped = filters.network.includes('air-gapped');
            const hasInsiderAttacker = filters.attacker.includes('insider') || filters.attacker.includes('supply-chain');
            return isAirGapped && hasInsiderAttacker;
        },
        multiplier: 1.35,
        rationale: 'Insider or supply-chain threats regain relevance even in isolated systems'
    },
    
    // Rule 4: Internet-exposed + organized/nation-state = network-remote threats escalate sharply
    {
        id: 'internet-exposed-high-attacker',
        priority: 4,
        family: 'network-remote',
        condition: (threat, filters) => {
            const isInternetExposed = filters.network.includes('internet-exposed') || filters.network.includes('cellular');
            const hasHighAttacker = filters.attacker.includes('organized') || filters.attacker.includes('nation-state');
            return isInternetExposed && hasHighAttacker;
        },
        multiplier: 1.6,  // 60% boost
        rationale: 'High-capability attackers have significant attack surface over internet-exposed networks'
    },
    
    // Rule 5: Data classification (classified) amplifies data/governance threats
    {
        id: 'classified-data-boost',
        priority: 5,
        families: ['data-governance', 'governance'],
        condition: (threat, filters) => {
            return filters.dataSensitivity && filters.dataSensitivity.includes('classified');
        },
        multiplier: 1.5,  // 50% boost
        rationale: 'Classified data requires heightened security controls and regulatory scrutiny'
    },
    
    // Rule 6: GDPR/NIS2 compliance boosts data/governance threats
    {
        id: 'compliance-governance-boost',
        priority: 6,
        families: ['data-governance', 'governance'],
        condition: (threat, filters) => {
            const derived = deriveComplianceObligations(filters);
            return derived.includes('gdpr') || derived.includes('nis2') || derived.includes('iso-27001') || derived.includes('eu-ai-act');
        },
        multiplier: 1.35,  // 35% boost
        rationale: 'Regulatory obligations amplify impact of governance and data security failures'
    },
    
    // Rule 7: AI-dependent threats suppressed when AI stack = none
    {
        id: 'ai-none-suppresses-ai-threats',
        priority: 7,
        family: 'ai-dependent',
        condition: (threat, filters) => {
            const selectedAi = filters.aiStack || [];
            const selectedAiWithoutNone = selectedAi.filter(tag => tag !== 'none');
            const selectedNoneOnly = selectedAi.includes('none') && selectedAiWithoutNone.length === 0;
            return selectedNoneOnly;
        },
        multiplier: 0.0,  // Hard suppression
        rationale: 'AI-specific threats are inapplicable when no AI stack is present'
    },
    
    // Rule 8: LLM-agent contexts boost AI-dependent threats
    {
        id: 'llm-agent-ai-boost',
        priority: 8,
        family: 'ai-dependent',
        condition: (threat, filters) => {
            return filters.aiStack && filters.aiStack.includes('llm-agent');
        },
        multiplier: 1.4,  // 40% boost
        rationale: 'LLM-agents with tool/plugin capabilities have expanded attack surface'
    },
    
    // Rule 9: Healthcare + safety threats maintain floor (never suppressed)
    {
        id: 'healthcare-safety-floor',
        priority: 9,
        family: 'safety',
        condition: (threat, filters) => {
            return filters.environment && filters.environment.includes('healthcare');
        },
        floorValue: 5,  // Enforce minimum score of 5 (medium)
        rationale: 'Healthcare safety risks must maintain baseline vigilance regardless of other contexts'
    },
    
    // Rule 10: Defense/critical-infrastructure + safety = protected baseline
    {
        id: 'critical-safety-floor',
        priority: 10,
        family: 'safety',
        condition: (threat, filters) => {
            return filters.environment && (filters.environment.includes('defense') || filters.environment.includes('critical-infrastructure'));
        },
        floorValue: 5,  // Enforce minimum score of 5 (medium)
        rationale: 'Critical infrastructure safety must never drop below medium risk'
    },
    
    // Rule 11: Supply-chain threats never air-gap suppressed
    {
        id: 'supply-chain-persistent',
        priority: 11,
        family: 'supply-chain',
        condition: (threat, filters) => {
            return filters.attacker && filters.attacker.includes('supply-chain');
        },
        multiplier: 1.1,  // 10% boost to maintain relevance
        rationale: 'Supply-chain compromise is relevant even in isolated systems due to pre-compromise at manufacturing/deployment'
    }
];

// ── CONTEXT-AWARE RULE ENGINE ──

function lookupThreatFamilyRules(threat) {
    /**
     * Find all rules applicable to a threat based on its family mapping.
     * Returns array of applicable rule objects in priority order.
     */
    const family = getThreatFamily(threat);
    if (!family) return [];
    
    return RULE_PACK_V1.filter(rule => {
        if (rule.family === family) return true;
        if (rule.families && rule.families.includes(family)) return true;
        return false;
    }).sort((a, b) => a.priority - b.priority);
}

function applyContextRules(threat, baseScore, selectedFilters) {
    /**
     * Apply context-aware rules to modify threat score.
     * Uses capped stacking: multipliers are capped at 2.0 total to prevent score explosion.
     * Returns modified score or baseScore if no rules apply.
     */
    const applicableRules = lookupThreatFamilyRules(threat);
    if (applicableRules.length === 0) {
        return baseScore;  // No context rules, return base score
    }
    
    let modifiedScore = baseScore;
    let totalMultiplier = 1.0;
    
    for (const rule of applicableRules) {
        // Check if rule condition is met
        if (!rule.condition(threat, selectedFilters)) {
            continue;  // Rule doesn't apply to this context
        }
        
        // Handle hard suppression (multiplier = 0.0)
        if (rule.multiplier === 0.0) {
            return 0;  // Threat is suppressed in this context
        }
        
        // Handle floor values (minimum score enforcement)
        if (rule.floorValue !== undefined) {
            modifiedScore = Math.max(modifiedScore, rule.floorValue);
        }
        
        // Accumulate multipliers with cap at 2.0
        if (rule.multiplier !== undefined && rule.multiplier > 0) {
            totalMultiplier = Math.min(2.0, totalMultiplier * rule.multiplier);
        }
    }
    
    modifiedScore = baseScore * totalMultiplier;
    return modifiedScore;
}

function calculateScoreFloor(threat, baseScore, selectedFilters) {
    /**
     * Enforce minimum score for critical contexts (safety, healthcare, defense).
     * Safety threats must never drop below baseline in high-harm environments.
     */
    const threatFamily = getThreatFamily(threat);
    
    // Check if this is a safety threat in critical environment
    if (threatFamily === 'safety') {
        const environment = selectedFilters.environment || [];
        if (environment.includes('healthcare') || environment.includes('defense') || environment.includes('critical-infrastructure')) {
            return Math.max(baseScore, 5);  // Safety floor = medium (5)
        }
    }
    
    return baseScore;
}

function calculateScoreCeiling(threat, baseScore, selectedFilters) {
    /**
     * Cap maximum score to prevent unrealistic extremes while preserving critical escalations.
     * Ceiling varies by threat family and context.
     */
    // Most threats cap at 15 (1.5x critical severity of 10)
    const baseCeiling = 15;
    
    // Defense/critical-infrastructure safety and resilience threats can reach 18
    const threatFamily = getThreatFamily(threat);
    const environment = selectedFilters.environment || [];
    const inCritical = environment.includes('defense') || environment.includes('critical-infrastructure');
    
    if ((threatFamily === 'safety' || threatFamily === 'resilience') && inCritical) {
        return Math.min(baseScore, 18);
    }
    
    return Math.min(baseScore, baseCeiling);
}

function getActivatedRulesExplanation(threat, selectedFilters) {
    /**
     * Return a human-readable explanation of which context rules were activated for this threat.
     * Used for explainability and debugging.
     */
    const applicableRules = lookupThreatFamilyRules(threat);
    const activatedRules = [];
    
    for (const rule of applicableRules) {
        if (rule.condition(threat, selectedFilters)) {
            activatedRules.push({
                id: rule.id,
                rationale: rule.rationale,
                multiplier: rule.multiplier,
                floorValue: rule.floorValue
            });
        }
    }
    
    return activatedRules;
}

function buildExplainabilityString(threat, selectedFilters) {
    /**
     * Build a readable string explaining the context rules applied to a threat.
     * Format: "Rule 1 (70% reduction) · Rule 2 (floor=5) · No rules applied"
     */
    const rules = getActivatedRulesExplanation(threat, selectedFilters);
    
    if (rules.length === 0) {
        return 'No context rules applied';
    }
    
    return rules.map(rule => {
        let explanation = rule.id;
        if (rule.multiplier !== undefined && rule.multiplier !== 1.0) {
            const percent = Math.round((rule.multiplier - 1.0) * 100);
            const direction = percent > 0 ? '+' : '';
            explanation += ` (${direction}${percent}%)`;
        }
        if (rule.floorValue !== undefined) {
            explanation += ` (floor=${rule.floorValue})`;
        }
        return explanation;
    }).join(' · ');
}

function getThreatTagsForDimension(threat, dimensionName) {
    const allowedTags = TAG_DIMENSIONS[dimensionName];
    return threat.tags.filter(tag => allowedTags.has(tag));
}

function hasTagOverlap(leftTags, rightTags) {
    return leftTags.some(tag => rightTags.includes(tag));
}

function passesApplicabilityDimension(threat, selectedTags, dimensionName) {
    if (selectedTags.length === 0) {
        return true;
    }

    const threatDimensionTags = getThreatTagsForDimension(threat, dimensionName);
    if (threatDimensionTags.length === 0) {
        return true;
    }

    return hasTagOverlap(threatDimensionTags, selectedTags);
}

function getHighestSelectedLevel(selectedTags, hierarchy) {
    const levels = selectedTags
        .map(tag => hierarchy[tag])
        .filter(level => Number.isFinite(level));

    if (levels.length === 0) {
        return null;
    }

    return Math.max(...levels);
}

function getMinimumThreatLevel(threatTags, hierarchy) {
    const levels = threatTags
        .map(tag => hierarchy[tag])
        .filter(level => Number.isFinite(level));

    if (levels.length === 0) {
        return null;
    }

    return Math.min(...levels);
}

function passesHierarchicalDimension(threat, selectedTags, dimensionName, hierarchy) {
    if (selectedTags.length === 0) {
        return true;
    }

    const threatDimensionTags = getThreatTagsForDimension(threat, dimensionName);
    if (threatDimensionTags.length === 0) {
        return true;
    }

    const selectedCapability = getHighestSelectedLevel(selectedTags, hierarchy);
    const threatMinimumRequirement = getMinimumThreatLevel(threatDimensionTags, hierarchy);

    if (!selectedCapability || !threatMinimumRequirement) {
        return true;
    }

    return selectedCapability >= threatMinimumRequirement;
}

function passesSensorPolicy(threat, selectedSensors) {
    if (selectedSensors.length === 0) {
        return true;
    }

    const threatSensors = getThreatTagsForDimension(threat, 'sensors');
    if (threatSensors.length === 0) {
        return true;
    }

    return hasTagOverlap(threatSensors, selectedSensors);
}

function passesRobotTypePolicy(threat, selectedFilters) {
    const selectedRobotTypes = selectedFilters.robotType || [];
    if (selectedRobotTypes.length === 0) {
        return true;
    }

    const threatRobotTypes = getThreatTagsForDimension(threat, 'robotType');
    if (threatRobotTypes.length === 0) {
        return true;
    }

    if (hasTagOverlap(threatRobotTypes, selectedRobotTypes)) {
        return true;
    }

    const attackers = selectedFilters.attacker || [];
    const hasLocalAdversary = attackers.includes('insider') || attackers.includes('supply-chain');
    if (!hasLocalAdversary) {
        return false;
    }

    const hasSensorSurface = getThreatTagsForDimension(threat, 'sensors').length > 0;
    const localThreatTags = threat.tags.includes('insider') || threat.tags.includes('supply-chain');
    return hasSensorSurface || localThreatTags;
}



function passesAiPolicy(threat, selectedAiTags) {
    if (selectedAiTags.length === 0) {
        return true;
    }

    const selectedAiWithoutNone = selectedAiTags.filter(tag => tag !== 'none');
    const selectedNoneOnly = selectedAiTags.includes('none') && selectedAiWithoutNone.length === 0;
    const threatAiTags = getThreatTagsForDimension(threat, 'aiStack').filter(tag => tag !== 'none');

    if (selectedNoneOnly) {
        return threatAiTags.length === 0;
    }

    if (threatAiTags.length === 0 || selectedAiWithoutNone.length === 0) {
        return true;
    }

    // LLM tags are reasoning systems that unlock prompt/agent attack surfaces.
    // computer-vision and speech-recognition are input modalities — they are attack
    // *channels* into an LLM, not standalone reasoning targets for inference-time attacks.
    // Only classical-ml counts as a truly standalone (non-LLM) AI target.
    const LLM_TAGS = new Set(['llm-agent', 'llm-assistant']);
    const selectedHasLlm = selectedAiWithoutNone.some(t => LLM_TAGS.has(t));
    const threatHasLlm = threatAiTags.some(t => LLM_TAGS.has(t));
    const threatHasStandaloneAi = threatAiTags.includes('classical-ml');

    // LLM-only threats (prompt injection, tool hijacking, RAG attacks, etc.):
    // require the user to have selected llm-agent or llm-assistant.
    // Selecting only computer-vision or speech-recognition is not sufficient.
    if (threatHasLlm && !threatHasStandaloneAi) {
        return selectedHasLlm;
    }

    // Mixed threats (Training Data Poisoning, Backdoored Models, Model Extraction):
    // valid for both pure ML models and LLMs. Show if LLM selected OR if
    // the selected non-LLM AI tags overlap with the threat's non-LLM AI tags.
    if (threatHasLlm && threatHasStandaloneAi) {
        const nonLlmThreatTags = threatAiTags.filter(t => !LLM_TAGS.has(t));
        return selectedHasLlm || hasTagOverlap(nonLlmThreatTags, selectedAiWithoutNone);
    }

    // Pure non-LLM threats (Adversarial Perception, Behavioral Drift, etc.):
    // normal overlap logic.
    return hasTagOverlap(threatAiTags, selectedAiWithoutNone);
}

function getSeverityTag(tags) {
    if (tags.includes('critical')) return 'critical';
    if (tags.includes('high')) return 'high';
    if (tags.includes('medium')) return 'medium';
    if (tags.includes('low')) return 'low';
    return null;
}

function passesSeverityPolicy(threat, selectedSeverityTags) {
    if (selectedSeverityTags.length === 0) {
        return true;
    }

    const threatSeverity = getSeverityTag(threat.tags);
    if (!threatSeverity) {
        return true;
    }

    return selectedSeverityTags.includes(threatSeverity);
}

function calculateThreatScore(threat, selectedFilters) {
    if (!isRelevantThreat(threat, selectedFilters)) {
        return 0;
    }

    const baseScore = SEVERITY_SCORES[getSeverityTag(threat.tags)] || 1;
    let scoreMultiplier = 1;

    const scoredDimensions = ['robotType', 'environment', 'aiStack', 'sensors', 'severity', 'dataSensitivity'];
    scoredDimensions.forEach(dimensionName => {
        const selectedTags = selectedFilters[dimensionName];
        if (selectedTags.length === 0) {
            return;
        }

        const threatTags = getThreatTagsForDimension(threat, dimensionName);
        if (threatTags.length === 0) {
            scoreMultiplier += 0.06;
            return;
        }

        if (hasTagOverlap(threatTags, selectedTags)) {
            scoreMultiplier += 0.2;
        }
    });

    if (selectedFilters.network.length > 0) {
        const selectedNetworkLevel = getHighestSelectedLevel(selectedFilters.network, NETWORK_HIERARCHY);
        const threatNetworkTags = getThreatTagsForDimension(threat, 'network');

        if (threatNetworkTags.length === 0) {
            scoreMultiplier += 0.08;
        } else {
            const threatNetworkRequirement = getMinimumThreatLevel(threatNetworkTags, NETWORK_HIERARCHY);
            const capabilityGap = Math.max(0, selectedNetworkLevel - threatNetworkRequirement);
            scoreMultiplier += 0.25 + capabilityGap * 0.12;

            if (hasTagOverlap(threatNetworkTags, selectedFilters.network)) {
                scoreMultiplier += 0.15;
            }
        }
    }

    if (selectedFilters.attacker.length > 0) {
        const selectedAttackerLevel = getHighestSelectedLevel(selectedFilters.attacker, ATTACKER_HIERARCHY);
        const threatAttackerTags = getThreatTagsForDimension(threat, 'attacker');

        if (threatAttackerTags.length === 0) {
            scoreMultiplier += 0.05;
        } else {
            const threatAttackerRequirement = getMinimumThreatLevel(threatAttackerTags, ATTACKER_HIERARCHY);
            const capabilityGap = Math.max(0, selectedAttackerLevel - threatAttackerRequirement);
            scoreMultiplier += 0.22 + capabilityGap * 0.1;

            if (hasTagOverlap(threatAttackerTags, selectedFilters.attacker)) {
                scoreMultiplier += 0.12;
            }
        }
    }

    if (selectedFilters.sensors.length > 0) {
        const threatSensors = getThreatTagsForDimension(threat, 'sensors');
        if (threatSensors.length === 0) {
            scoreMultiplier += 0.06;
        } else if (hasTagOverlap(threatSensors, selectedFilters.sensors)) {
            scoreMultiplier += 0.2;
        }
    }

    const selectedAiWithoutNone = selectedFilters.aiStack.filter(tag => tag !== 'none');
    const threatAiTags = getThreatTagsForDimension(threat, 'aiStack').filter(tag => tag !== 'none');
    if (
        selectedAiWithoutNone.length > 0 &&
        threatAiTags.length > 0 &&
        hasTagOverlap(threatAiTags, selectedAiWithoutNone)
    ) {
        // Medium AI emphasis: noticeable lift in AI contexts without suppressing core non-AI risk dimensions.
        scoreMultiplier += 0.18;

        if (selectedAiWithoutNone.includes('llm-agent') && threatAiTags.includes('llm-agent')) {
            scoreMultiplier += 0.08;
        }

        if (selectedAiWithoutNone.includes('llm-assistant') && threatAiTags.includes('llm-assistant')) {
            scoreMultiplier += 0.05;
        }
    }

    // ── APPLY CONTEXT-AWARE RULES ──
    let contextualScore = baseScore * scoreMultiplier;
    
    // Apply context-aware rule engine (handles multipliers, hard suppressions, floor enforcement)
    contextualScore = applyContextRules(threat, contextualScore, selectedFilters);
    
    // Apply safety floor for critical contexts (never suppress safety in high-harm environments)
    contextualScore = calculateScoreFloor(threat, contextualScore, selectedFilters);
    
    // Apply ceiling to prevent unrealistic extremes
    contextualScore = calculateScoreCeiling(threat, contextualScore, selectedFilters);
    
    return contextualScore;
}

function getTopThreats(selectedFilters, topCount = 10) {
    const allThreats = [];

    // Collect all threats with scores
    CATEGORIES.forEach((cat, catIndex) => {
        cat.threats.forEach((threat, threatIndex) => {
            if (isRelevantThreat(threat, selectedFilters)) {
                const score = calculateThreatScore(threat, selectedFilters);
                allThreats.push({
                    threat,
                    category: cat,
                    catIndex,
                    threatIndex,
                    score
                });
            }
        });
    });

    // Sort by score and return top N
    return allThreats
        .sort((a, b) => b.score - a.score)
        .slice(0, topCount);
}
const matrix = document.getElementById('matrix');

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function encodeThreatKey(name) {
    return encodeURIComponent(String(name || ''));
}

const ENABLE_CONTEXTUAL_MITIGATIONS = false;

function renderMitigationItems(threat, selectedFilters = null, categoryName = '') {
    let mitigations = Array.isArray(threat.mitigations) ? threat.mitigations : [];

    if (
        ENABLE_CONTEXTUAL_MITIGATIONS &&
        typeof window !== 'undefined' &&
        window.THREAT_CONTENT &&
        typeof window.THREAT_CONTENT.getContextAwareMitigations === 'function'
    ) {
        const contextual = window.THREAT_CONTENT.getContextAwareMitigations(threat, categoryName, selectedFilters);
        if (Array.isArray(contextual) && contextual.length > 0) {
            mitigations = contextual;
        }
    }

    if (mitigations.length === 0) {
        return '<li>No mitigation guidance available yet.</li>';
    }

    return mitigations.map(item => `<li>${escapeHtml(item)}</li>`).join('');
}

function renderReferenceItems(threat) {
    const refs = Array.isArray(threat.references) ? threat.references : [];
    if (refs.length === 0) {
        return '<li>No external references available yet.</li>';
    }

    return refs.map(ref => {
        const title = escapeHtml(ref.title);
        const url = escapeHtml(ref.url);
        return `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></li>`;
    }).join('');
}

function expandThreatCardByKey(threatKey) {
    if (!threatKey) {
        return;
    }

    const selector = `.threat-card[data-threat-key="${threatKey}"]`;
    const card = matrix.querySelector(selector);
    if (!card) {
        return;
    }

    card.classList.add('expanded');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderMatrix() {
    matrix.innerHTML = '';

    const selectedFilters = getAllActiveFilters();
    const hasFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

    // Show Top Threats first if filters are applied
    if (hasFilters) {
        const topThreats = getTopThreats(selectedFilters, 8);
        if (topThreats.length > 0) {
            const topSection = document.createElement('div');
            topSection.className = 'top-threats-inline';
            topSection.innerHTML = `
                <div class="top-threats-header">
                    <h2>Top Relevante Threats</h2>
                    <p>Top prioriteiten voor jouw configuratie (gescoord op context en relevantie)</p>
                </div>
                <div class="top-threats-list">
                    ${topThreats.map((item, index) => `
                        <div class="top-threat-item" data-rank="${index + 1}" data-score="${item.score.toFixed(1)}" data-threat-key="${encodeThreatKey(item.threat.name)}">
                            <div class="top-threat-rank">#${index + 1}</div>
                            <div class="top-threat-info">
                                <div class="top-threat-name">${item.threat.name}</div>
                                <div class="top-threat-meta">
                                    <span class="top-threat-category">${item.category.name}</span>
                                    <span class="top-threat-score">Score: ${item.score.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            matrix.appendChild(topSection);
        }
    }

    // Then show regular categories
    CATEGORIES.forEach((cat, ci) => {
        const col = document.createElement('div');
        col.className = 'category';
        col.style.setProperty('--cat-color', CAT_COLORS[ci]);

        let visibleThreats = cat.threats;

        // Apply filtering if any filters are selected
        if (hasFilters) {
            visibleThreats = cat.threats.filter(threat => {
                return isRelevantThreat(threat, selectedFilters);
            });
        }

        const threatsHtml = visibleThreats.map((threat, ti) => `
            <div class="threat-card" data-cat="${ci}" data-idx="${ti}" data-tags="${threat.tags.join(',')}" data-threat-key="${encodeThreatKey(threat.name)}">
                <div class="threat-name">
                    ${threat.name}
                    <span class="chevron">▶</span>
                </div>
                <div class="threat-detail">
                    <p class="threat-summary">${escapeHtml(threat.summary || threat.desc)}</p>
                    <div class="threat-mitigations">
                        <div class="threat-section-title">Mitigations</div>
                        <ul>${renderMitigationItems(threat, selectedFilters, cat.name)}</ul>
                    </div>
                    <div class="threat-references">
                        <div class="threat-section-title">Sources</div>
                        <ul>${renderReferenceItems(threat)}</ul>
                    </div>
                </div>
            </div>
        `).join('');

        if (visibleThreats.length > 0) {
            col.innerHTML = `
                <div class="category-header">
                    <span class="category-num">${cat.id}</span>
                    <span class="category-title">${cat.name}</span>
                    <span class="category-count">${visibleThreats.length}</span>
                </div>
                <div class="threat-list">
                    ${threatsHtml}
                </div>
            `;
            matrix.appendChild(col);
        }
    });

    // Show filtering summary
    updateFilteringSummary(selectedFilters);
}

function renderTopThreats(selectedFilters) {
    const topThreats = getTopThreats(selectedFilters, 8);

    if (topThreats.length === 0) return;

    // Create top threats section
    const topSection = document.createElement('div');
    topSection.className = 'top-threats';
    topSection.innerHTML = `
        <div class="top-threats-header">
            <h2>🎯 Top Priority Threats</h2>
            <p>Top priorities for your configuration (scored by context and relevance)</p>
        </div>
        <div class="top-threats-grid">
            ${topThreats.map((item, index) => `
                <div class="top-threat-card" data-rank="${index + 1}" data-score="${item.score.toFixed(1)}">
                    <div class="top-threat-rank">#${index + 1}</div>
                    <div class="top-threat-content">
                        <div class="top-threat-category">${item.category.name}</div>
                        <div class="top-threat-name">${item.threat.name}</div>
                        <div class="top-threat-score">Risk Score: ${item.score.toFixed(1)}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    matrix.parentNode.insertBefore(topSection, matrix);
}

function isRelevantThreat(threat, selectedFilters) {
    return (
        passesRobotTypePolicy(threat, selectedFilters) &&
        passesApplicabilityDimension(threat, selectedFilters.environment, 'environment') &&
        passesAiPolicy(threat, selectedFilters.aiStack) &&
        passesSensorPolicy(threat, selectedFilters.sensors) &&
        passesHierarchicalDimension(threat, selectedFilters.network, 'network', NETWORK_HIERARCHY) &&
        passesHierarchicalDimension(threat, selectedFilters.attacker, 'attacker', ATTACKER_HIERARCHY) &&
        passesSeverityPolicy(threat, selectedFilters.severity)
    );
}

function isTagSelected(tag, selectedFilters) {
    for (const dimension of Object.values(selectedFilters)) {
        if (dimension.includes(tag)) return true;
    }
    return false;
}

function updateFilteringSummary(selectedFilters) {
    const hasFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

    // Remove existing summary
    document.querySelector('.filter-summary')?.remove();

    if (hasFilters) {
        let summary = "Filtered threats for: ";
        const filterParts = [];

        if (selectedFilters.robotType.length) {
            filterParts.push(selectedFilters.robotType.join(', '));
        }
        if (selectedFilters.environment.length) {
            filterParts.push(`in ${selectedFilters.environment.join(', ')}`);
        }
        if (selectedFilters.network.length) {
            filterParts.push(`with ${selectedFilters.network.join(', ')} connectivity`);
        }
        if (selectedFilters.attacker.length) {
            filterParts.push(`against ${selectedFilters.attacker.join(', ')} attackers`);
        }

        summary += filterParts.join(' ');

        // Add summary
        const summaryEl = document.createElement('div');
        summaryEl.className = 'filter-summary';
        summaryEl.textContent = summary;
        matrix.parentNode.insertBefore(summaryEl, matrix);
    }
}

renderMatrix();

// ── CARD EXPAND / COLLAPSE ──
matrix.addEventListener('click', e => {
    const sourceLink = e.target.closest('.threat-references a');
    if (sourceLink) {
        return;
    }

    const topThreatItem = e.target.closest('.top-threat-item');
    if (topThreatItem) {
        expandThreatCardByKey(topThreatItem.dataset.threatKey);
        return;
    }

    const card = e.target.closest('.threat-card');
    if (!card) return;
    card.classList.toggle('expanded');
});

// ── FILTERING ──
function getAllActiveFilters() {
    const filters = {
        robotType: [],
        environment: [],
        aiStack: [],
        sensors: [],
        network: [],
        attacker: [],
        severity: [],
        // NEW: Context-aware dimensions
        dataSensitivity: []
    };

    document.querySelectorAll('.pill.active').forEach(pill => {
        const tag = pill.dataset.tag;
        const dimension = pill.closest('.tag-pills').dataset.dimension;

        if (tag && dimension && filters[dimension] !== undefined) {
            filters[dimension].push(tag);
        }
    });

    return filters;
}

document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
        pill.classList.toggle('active');
        renderMatrix();
    });
});

document.getElementById('clearFilters').addEventListener('click', () => {
    document.querySelectorAll('.pill.active').forEach(p => p.classList.remove('active'));
    renderMatrix();
});