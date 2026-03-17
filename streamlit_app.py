import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime

# --- SETTINGS ---
st.set_page_config(page_title="Intelligence Assistant Dashboard", layout="wide", initial_sidebar_state="collapsed")

# --- MOCK DATA (Python Port) ---
MOCK_PROJECTS = [
    {"id": "p1", "name": "Customer Portal Redesign", "status": "active", "percent_complete": 65, "owner_name": "Frank Brown", "start_date": "01-15-2026", "end_date": "03-31-2026"},
    {"id": "p2", "name": "Mobile App v2.0", "status": "active", "percent_complete": 40, "owner_name": "Frank Brown", "start_date": "02-01-2026", "end_date": "03-16-2026"},
    {"id": "p3", "name": "Data Analytics Platform", "status": "active", "percent_complete": 30, "owner_name": "Alice Johnson", "start_date": "01-01-2026", "end_date": "04-30-2026"},
    {"id": "p4", "name": "API Gateway Migration", "status": "onhold", "percent_complete": 10, "owner_name": "Henry Taylor", "start_date": "03-01-2026", "end_date": "05-31-2026"},
    {"id": "p5", "name": "Brand Refresh Campaign", "status": "active", "percent_complete": 80, "owner_name": "David Lee", "start_date": "02-15-2026", "end_date": "03-20-2026"}
]

SAP_PROJECTS = [
    {"id": "sap_01", "name": "ERP System Migration", "status": "In-Progress", "owner_name": "Alice Johnson", "start_date": "01-10-2026", "end_date": "04-15-2026", "percent_complete": 45, "team": "Finance"},
    {"id": "sap_02", "name": "Supply Chain Optimization", "status": "Planning", "owner_name": "Bob Martinez", "start_date": "02-20-2026", "end_date": "06-30-2026", "percent_complete": 15, "team": "Logistics"}
]

UTILIZATION = [
    {"team": "Engineering", "avgUtilization": 85},
    {"team": "Design", "avgUtilization": 70},
    {"team": "QA", "avgUtilization": 90},
    {"team": "Management", "avgUtilization": 50}
]

# --- CONFIGURATION ---
if "projects" not in st.session_state:
    st.session_state.projects = MOCK_PROJECTS
if "sap_projects" not in st.session_state:
    st.session_state.sap_projects = SAP_PROJECTS
if "utilization" not in st.session_state:
    st.session_state.utilization = UTILIZATION

# --- UI STYLING ---
st.markdown("""
    <style>
    .main { background-color: #f8fafc; }
    .stApp { background: #f8fafc; color: #0f172a; }
    div[data-testid="stMetricValue"] { color: #0ea5e9; font-weight: 700; }
    .stButton>button { background-color: #0ea5e9; color: white; border-radius: 10px; border: none; width: 100%; transition: all 0.3s; }
    .stButton>button:hover { background-color: #0284c7; transform: translateY(-2px); }
    .card { background: white; padding: 20px; border-radius: 15px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    /* Fix text colors for light mode */
    .stMarkdown, p, h1, h2, h3, h4 { color: #0f172a !important; }
    .stRadio > label { color: #0f172a !important; }
    </style>
    """, unsafe_allow_html=True)

# --- HEADER ---
st.title("🤖 Intelligence Assistant Dashboard")
st.markdown("### Powered by Zoho Projects & SAP Integration <span style='font-size: 0.8rem; background: #38bdf8; color: #020617; padding: 2px 8px; border-radius: 5px;'>V2.0 ACTIVE</span>", unsafe_allow_html=True)

# --- PLATFORM SELECTOR ---
platform = st.radio("Select Integration Platform", ["Zoho Projects", "SAP S/4HANA"], horizontal=True)

# --- AI COMMAND SEARCH ---
st.divider()
st.markdown("### 🔍 AI Smart Search (Command Bar)")
query = st.text_input("Ask AI: 'list all tasks', 'show team utilization'...", placeholder="Type your natural language query here...")

def python_fallback_query(q):
    """Simple keyword-based fallback for Streamlit Cloud."""
    q = q.lower()
    if "task" in q:
        return "Fetched active tasks (Local Fallback)", st.session_state.projects
    if "utilization" in q or "busy" in q:
        return "Fetched team utilization metrics (Local Fallback)", st.session_state.utilization
    if "sap" in q:
        return "Fetched active SAP projects (Local Fallback)", st.session_state.sap_projects
    return "AI Engine is offline. Try keywords like 'tasks', 'utilization', or 'sap'.", None

if st.button("Query AI Intelligence"):
    if query:
        import requests
        try:
            # Try connecting to Node.js backend (works locally)
            res = requests.post("http://localhost:4000/api/query", json={"query": query}, timeout=2)
            result = res.json()
            if result.get("success"):
                st.info(f"🤖 AI Assistant: {result['message']}")
                if result.get("data"):
                    st.dataframe(pd.DataFrame(result["data"]), use_container_width=True)
            else:
                st.error("AI was unable to process this specific request.")
        except Exception:
            # Fallback for Streamlit Cloud deployment
            msg, data = python_fallback_query(query)
            st.warning(f"🌐 Cloud Mode: Using built-in intelligence engine.")
            st.info(f"🤖 AI Assistant (Local): {msg}")
            if data:
                st.dataframe(pd.DataFrame(data), use_container_width=True)

st.divider()
# --- METRICS ---
col1, col2, col3 = st.columns(3)
if platform == "Zoho Projects":
    current_data = st.session_state.projects
    col1.metric("Active Workstreams", len(st.session_state.projects), "+12%")
    col2.metric("Pending Actions", "12", "High Priority")
    col3.metric("System Health", "Optimal", "100%")
else:
    current_data = st.session_state.sap_projects
    col1.metric("SAP Modules", len(st.session_state.sap_projects), "Stable")
    col2.metric("ERP Sync Status", "Synced", "0s ago")
    col3.metric("Gateway Status", "Connected", "S/4HANA")

# --- INTERACTIVE ACTION CENTER (TOP PRIORITY) ---
st.divider()
st.markdown("### ⚡ AI Action Intelligence Center (Interactive)")
act_col1, act_col2 = st.columns(2)

with act_col1:
    st.markdown("#### Update Task Status")
    with st.container():
        selected_task = st.selectbox("Select Task to Update", [p["name"] for p in current_data])
        new_status = st.selectbox("New Status", ["Active", "On-Hold", "Completed", "Testing"])
        if st.button("Update Status"):
            for p in current_data:
                if p["name"] == selected_task:
                    p["status"] = new_status.lower()
                    if new_status == "Completed": p["percent_complete"] = 100
            st.success(f"Updated {selected_task} to {new_status}")
            st.rerun()

with act_col2:
    st.markdown("#### Assign Resource")
    with st.container():
        task_to_assign = st.selectbox("Select Task to Assign", [p["name"] for p in current_data], key="assign_task")
        new_owner = st.selectbox("Assign to Owner", ["Alice Johnson", "Bob Martinez", "David Lee", "Frank Brown", "Emma Wilson"])
        if st.button("Confirm Assignment"):
            for p in current_data:
                if p["name"] == task_to_assign:
                    p["owner_name"] = new_owner
            st.success(f"Assigned {task_to_assign} to {new_owner}")
            st.rerun()

st.divider()

# --- CHARTS ---
c1, c2 = st.columns([2, 1])

with c1:
    st.markdown(f"#### {platform} Progression")
    df = pd.DataFrame(current_data)
    fig = px.bar(df, x="name", y="percent_complete", color_discrete_sequence=['#38bdf8' if platform == "Zoho Projects" else '#a855f7'])
    fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font_color="white", margin=dict(t=20, b=20, l=0, r=0))
    st.plotly_chart(fig, use_container_width=True)

with c2:
    st.markdown("#### Resource Allocation")
    df_util = pd.DataFrame(st.session_state.utilization)
    fig_pie = px.pie(df_util, values='avgUtilization', names='team', hole=0.7, color_discrete_sequence=['#38bdf8', '#818cf8', '#fb7185', '#a855f7'])
    fig_pie.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font_color="white", showlegend=False, margin=dict(t=0, b=0, l=0, r=0))
    st.plotly_chart(fig_pie, use_container_width=True)

# --- DATA TABLE ---
st.divider()
st.markdown("#### Detailed Analysis")
df_display = pd.DataFrame(current_data)
st.dataframe(df_display, use_container_width=True)

st.info("💡 AI Insight: Team QA is currently at high capacity (90%). Consider reassigning upcoming API tasks to Engineering.")
