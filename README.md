# 🤖 Integration Assistant for Microsoft Teams (Zoho & SAP)

[![Status](https://img.shields.io/badge/Status-Project--Complete-success)]() 
[![Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Python%20%7C%20LLM-blue)]()

A seamless, AI-powered Microsoft Teams assistant designed to bridge enterprise data with team collaboration. This project empowers users to query, view, and act upon project data from **Zoho Projects** and **SAP S/4HANA** directly within Teams using natural language.

---

## 🌟 Key Features

### 1. 🧠 Intelligent NLP Interaction
Powered by **Groq (Llama-3-70B)**, the assistant understands complex natural language commands.
- **Multi-Language Support**: Queries can be made in English, German, Spanish, French, and more.
- **Context Awareness**: Extracts project IDs, user names, and dates automatically.

### 2. ⚡ Actionable Adaptive Cards
Interactive UI elements inside Teams that allow users to:
- **Assign Tasks**: Using a built-in user selection picker.
- **Update Status**: Fast-track progress from "Open" to "Closed" with a single click.
- **View Utilization**: Dynamic bar charts showing team bandwidth.

### 3. 📊 Dual Intelligence Dashboards
- **Premium Web Dashboard**: A high-end Obsidian/Glassmorphism interface for deep project analytics (Node.js/Express).
- **Public Cloud Dashboard**: A mobile-responsive Streamlit port for instant public demoing.

### 4. 🤝 Enterprise Extensibility
The architecture is designed to be **Platform-Agnostic**. It includes built-in stubs and UI support for **SAP S/4HANA**, allowing it to scale as a unified gateway for multiple ERP systems.

---

## 📋 Assessment No.1 Requirements Mapping

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **Data Querying** | Natural language support for Tasks, Deadlines, and Utilization. | ✅ |
| **User Interaction** | Query results displayed via rich **Adaptive Cards**. | ✅ |
| **Actionable Messages** | Support for **Assign**, **Update**, and **Review** actions. | ✅ |
| **RBAC / Security** | Simulated Role-Based Access Control and OAuth 2.0 structure. | ✅ |
| **Multi-Platform** | Local Docker support + Azure Deployment configurations. | ✅ |
| **Extensibility (Bonus)** | Design handles both Zoho and SAP integration seamlessly. | ✅ |
| **Cloud Hosting (Bonus)** | Dedicated Streamlit version for public cloud availability. | ✅ |

---

## 🚀 Quick Start Guide

### Local Development (Node.js)
1.  **Installation**: `npm install`
2.  **Environment**: Copy `.env.example` to `.env` and add your `GROQ_API_KEY`.
3.  **Run Application**: `npm run dev`
4.  **Access Bot**: [http://localhost:3978](http://localhost:3978)
5.  **Access Dashboard**: [http://localhost:4000](http://localhost:4000)

### Cloud Hosting (Streamlit)
For a live public demo, we have provided a Python port:
1.  Connect this GitHub repo to **[Streamlit Cloud](https://share.streamlit.io)**.
2.  Deploy using `streamlit_app.py` as the entry point.

---

## 📁 Project Structure
- `src/bot/`: Core Teams Activity Handler and NLP routing.
- `src/api/`: Service layer for Zoho and SAP (Mock/Real wrapper).
- `src/cards/`: Templates for high-fidelity Adaptive Cards.
- `src/dashboard/`: Frontend/Backend for the premium web intelligence UI.
- `streamlit_app.py`: Dedicated port for cloud-hosted visualization.

---

## 📦 Deployment
- **Docker**: `docker-compose up --build`
- **Azure**: Deployment configurations in `./deploy/azure-deploy.yml`.

---

**Developed for Assessment No.1 - Secure & Seamless Enterprise Integration**
