# AI-CPS Threat Modeling Tool

Interactive threat model for robotic and autonomous cyber-physical systems, covering AI/LLM, sensor, network, and physical attack surfaces. Built as part of a bachelor thesis (UHasselt / KU Leuven, 2026).

Threats are organized in a MITRE-style matrix across 12 categories. Users filter by 8 context dimensions to narrow the matrix to threats relevant for their specific system.

## Status

This is a research prototype, not a production-ready threat catalogue. The threat list is illustrative rather than exhaustive, and the tag assignments behind each threat are based on best-effort mapping from the underlying literature — some tag/threat combinations may need refinement based on real-world deployment context. The tool is intended as a starting point for discussion and exploration, not as an authoritative reference.

## Filter dimensions

- **Robot Type** — industrial arm, cobot, drone, AGV/AMR, autonomous vehicle, service robot, medical robot
- **Environment** — factory, warehouse, healthcare, public space, home, defense, critical infrastructure, maritime
- **AI Stack** — none, classical ML, computer vision, speech recognition, LLM assistant, LLM agent
- **Sensors** — camera, LiDAR, GPS, IMU, ultrasonic, infrared, microphone
- **Network** — air-gapped, LAN-only, Wi-Fi, 4G/5G, internet-exposed
- **Attacker** — low-skill, insider, organized, nation-state, supply-chain
- **Severity** — low, medium, high, critical
- **Data Sensitivity** — public, internal, user data, confidential, classified

## Running

Pure static HTML/CSS/JS — no build step, no dependencies.

Open `website/index.html` directly in a browser, or serve the folder with any static server:

```
cd website
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files

- `website/index.html` — markup and filter UI
- `website/index.css` — styling
- `website/index.js` — filter logic and matrix rendering
- `website/threat-content.js` — threat catalogue (descriptions, mitigations, tags)
- `website/threat-static-references.js` — external reference links per threat
