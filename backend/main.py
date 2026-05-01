from openai import OpenAI
from fastapi import FastAPI,Body
from model.chatrequest import ChatRequest
from collections import defaultdict
from dotenv import load_dotenv
import os

load_dotenv()
# To store sessions and messages
chat_sessions = defaultdict(list)
app=FastAPI()

client=OpenAI(
    api_key=os.getenv("GEMINI_KEY"),
     base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

SYSTEM_PROMPT="""
You are a helpful AI assistant.

Rules:
- Maintain conversational context
- Reason step-by-step internally
- Give clear concise answers
- Ask follow-up questions if needed
"""
@app.post("/chat")
def chat(req:ChatRequest):
    if len(chat_sessions[req.session_id])==0:
        chat_sessions[req.session_id].append(
            {"role":"system","content":SYSTEM_PROMPT}
        )
    chat_sessions[req.session_id].append(
            {"role":"user","content":req.message}
        )
    response=client.chat.completions.create(
        model="gemini-2.5-flash",
        messages=chat_sessions[req.session_id]
    )
    assistant_reply=response.choices[0].message.content
    chat_sessions[req.session_id].append(
        {"role":"assistant","content":assistant_reply}
    )
    return assistant_reply

