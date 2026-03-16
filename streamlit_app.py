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
    {"id": "sap_01", "name": "ERP System Migration", "status": "In-Progress", "percent_complete": 45},
    {"id": "sap_02", "name": "Supply Chain Optimization", "status": "Planning", "percent_complete": 15}
]

UTILIZATION = [
    {"team": "Engineering", "avgUtilization": 85},
    {"team": "Design", "avgUtilization": 70},
    {"team": "QA", "avgUtilization": 90},
    {"team": "Management", "avgUtilization": 50}
]

# --- UI STYLING ---
st.markdown("""
    <style>
    .main { background-color: #020617; }
    .stApp { background: radial-gradient(circle at 0% 0%, #1e1b4b 0%, #020617 100%); color: white; }
    div[data-testid="stMetricValue"] { color: #38bdf8; font-weight: 700; }
    .stButton>button { background-color: #38bdf8; color: #020617; border-radius: 10px; }
    </style>
    """, unsafe_allow_html=True)

# --- HEADER ---
st.title("🤖 Intelligence Assistant Dashboard")
st.markdown("### Powered by Zoho Projects & SAP Integration")

# --- PLATFORM SELECTOR ---
platform = st.radio("Select Integration Platform", ["Zoho Projects", "SAP S/4HANA"], horizontal=True)

# --- METRICS ---
col1, col2, col3 = st.columns(3)
if platform == "Zoho Projects":
    current_data = MOCK_PROJECTS
    col1.metric("Active Workstreams", len(MOCK_PROJECTS), "+12%")
    col2.metric("Pending Actions", "12", "High Priority")
    col3.metric("System Health", "Optimal", "100%")
else:
    current_data = SAP_PROJECTS
    col1.metric("SAP Modules", len(SAP_PROJECTS), "Stable")
    col2.metric("ERP Sync Status", "Synced", "0s ago")
    col3.metric("Gateway Status", "Connected", "S/4HANA")

st.divider()

# --- CHARTS ---
c1, c2 = st.columns([2, 1])

with c1:
    st.markdown(f"#### {platform} Progression")
    df = pd.DataFrame(current_data)
    fig = px.bar(df, x="name", y="percent_complete", color_discrete_sequence=['#38bdf8' if platform == "Zoho Projects" else '#a855f7'])
    fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font_color="white")
    st.plotly_chart(fig, use_container_width=True)

with c2:
    st.markdown("#### Resource Allocation")
    df_util = pd.DataFrame(UTILIZATION)
    fig_pie = px.pie(df_util, values='avgUtilization', names='team', hole=0.7, color_discrete_sequence=['#38bdf8', '#818cf8', '#fb7185', '#a855f7'])
    fig_pie.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font_color="white", showlegend=False)
    st.plotly_chart(fig_pie, use_container_width=True)

# --- DATA TABLE ---
st.markdown("#### Detailed Analysis")
df_display = pd.DataFrame(current_data)
st.dataframe(df_display, use_container_width=True)

st.info("💡 AI Insight: Team QA is currently at high capacity (90%). Consider reassigning upcoming API tasks to Engineering.")
