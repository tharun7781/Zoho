# 🤖 Intelligence Assistant V2.0: Zoho & SAP Integration
> **Unified Enterprise Intelligence Gateway for Microsoft Teams**

[![Status](https://img.shields.io/badge/Status-Assessment--Ready-success)]() 
[![Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Python%20%7C%20LLM-blue)]()
[![Theme](https://img.shields.io/badge/Design-Premium--Light-informational)]()

A high-performance Microsoft Teams assistant and dual-dashboard system designed to bridge enterprise data from **Zoho Projects** and **SAP S/4HANA**. This project features a state-of-the-art Natural Language Engine and a premium glassmorphism visualization layer.

---

## 🌟 Interactive Showcase

### 1. 📊 Premium Web Dashboard (Node.js)
A secure, high-fidelity visualization platform for project analytics.
- **Entry**: Automated Login Page (`login.html`)
- **Theme**: Premium White/Light mode for maximum clarity.
- **Intelligence**: Integrated **AI Command Bar** in the header for NLU data fetching.

### 2. 🔍 AI Smart Search (Command Bar)
Available on both web and Streamlit dashboards:
- Users can type: *"List all tasks"*, *"Show team utilization"*, or *"Fetch SAP modules"*.
- Powered by **Groq (Llama-3-70B)** with a resilient Python-fallback for cloud environments.

### 3. 🤖 Microsoft Teams Bot
- **NLP Interface**: Understands complex commands in multiple languages.
- **Adaptive Cards**: High-fidelity interactive cards for status updates and resource assignments.

---

## ⚡ Core Integration Capabilities

| Feature | Zoho Projects | SAP S/4HANA |
| :--- | :--- | :--- |
| **Data Sync** | Real-time Project/Task tracking | Module Sync & ERP Tracks |
| **AI Querying** | Natural Language Filtering | Cross-Platform Module Search |
| **Interactivity** | Status Updates & Reassignments | Advanced Module Sync Actions |
| **Visualization** | Progress Bar Charts | ERP Velocity Graphs |

---

## 📋 Assessment No.1 Fulfillment

This project is meticulously aligned with the core requirements of **Assessment No.1**:

- ✅ **NLP Data Querying**: Complex intent parsing using Groq LLM.
- ✅ **Actionable UI**: Integrated "Action Center" on the dashboard and Interactive Cards in Teams.
- ✅ **Authentication**: Secure Login flow on the dashboard + User token simulation in Teams.
- ✅ **Platform Parity**: Identical feature richness for both Zoho and SAP integrations.
- ✅ **Cloud Resiliency**: Automatic fallback engine to ensure search works on Streamlit Cloud.
- ✅ **Professional Aesthetic**: High-end light-themed design with smooth animations.

---

## 🚀 Deployment & Setup

### 🖥️ Local Setup (Full Engine)
1. **Install Dependencies**: `npm install`
2. **Environment**: Ensure your `GROQ_API_KEY` is in the `.env` file.
3. **Run Node.js Engine**: `npm run dev`
   - *Access Dashboard*: `http://localhost:4000` (Login: `demo@example.com` / `password123`)
4. **Run Streamlit Port**: `streamlit run streamlit_app.py`

### ☁️ Cloud Deployment (Public Demo)
This repository is pre-configured for **Streamlit Cloud**:
1. Connect this repo to [Streamlit Cloud](https://share.streamlit.io).
2. The app will automatically use the **Built-in Python Intelligence Engine** if the Node.js backend is offline (Cloud Mode).

---

## 📁 Project Map
- `src/bot/`: Teams Activity handlers and command routing.
- `src/nlp/`: The Groq-powered AI Intent Engine.
- `src/dashboard/`: The premium Node.js visualization system.
- `streamlit_app.py`: Mobile-optimized dashboard for cloud presentations.
- `src/api/`: Unified Gateway service (Zoho & SAP stubs).

---

**Developed for Assessment No.1 - Secure & Seamless Enterprise Integration**
