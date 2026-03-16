# 🤖 Zoho & SAP Integration Assistant for Microsoft Teams

A high-performance, AI-driven assistant designed for **Assessment No.1**. This project empowers Teams users to manage Zoho Projects and SAP S/4HANA workflows using natural language.

---

## ✨ Premium Features
- **🧠 Advanced NLP**: Powered by **Groq (Llama-3-70B)**. Understands queries in **English, German, Spanish, and French**.
- **📊 Intelligence Dashboard**: High-end Obsidian/Glassmorphism UI at [localhost:4000](http://localhost:4000) with **Interactive Click-to-Filter Charts**.
- **🤝 Multi-Platform Gateway**: Integrated stubs for **SAP S/4HANA** and a platform-switching UI.
- **⚡ Actionable Cards**: Full write-back support for **Assigning Tasks** and **Updating Status** directly within Teams.
- **🔐 Enterprise Ready**: OAuth 2.0 flow logic and professional [Auth Success](http://localhost:3978/auth/success) demo page.

---

## 🚀 Quick Start
1. **Install**: `npm install`
2. **Env**: Copy `.env.example` to `.env` and add your `GROQ_API_KEY`.
3. **Run**: `npm run dev`
4. **Access**:
   - **Main Bot Server**: [http://localhost:3978](http://localhost:3978)
   - **Intelligence Dashboard**: [http://localhost:4000](http://localhost:4000)
   - **Auth Demo Page**: [http://localhost:3978/auth/success](http://localhost:3978/auth/success)

---

## 📋 Assessment Compliance
This project satisfies all **Core Requirements**:
- [x] **Data Querying**: Natural language support for Tasks, Deadlines, and Utilization.
- [x] **Teams UI**: Rich Adaptive Cards with interactive buttons.
- [x] **Actions**: Assigning projects/tasks and updating statuses.
- [x] **Bonus**: Multi-platform deployment (Docker + Azure) and extensible architecture.

---

## ☁️ Cloud Hosting (Python / Streamlit)
If you need a live, public URL for your assessment, use the included Streamlit port:
1. Push this repo to GitHub.
2. Connect it to **[Streamlit Cloud](https://share.streamlit.io)**.
3. Select `streamlit_app.py` as the main file.
- **Demo URL Example**: `https://zoho-assistant.streamlit.app`

---

## 📦 Local Deployment (Docker)
- **Docker**: `docker-compose up --build`
- **Azure**: Deployment YAML included in `./deploy/azure-deploy.yml`.

---

*Developed for Assessment No.1 - Integration Assistant*
