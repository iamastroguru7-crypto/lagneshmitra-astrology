import os
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY")
NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-report', methods=['POST'])
def get_report():
    data = request.json
    user_prompt = data.get('prompt', '')

    if not user_prompt:
        return jsonify({'error': 'Birth details required'}), 400

    # Prompt ko thoda concise kiya taaki output chhota aur fast bane
    system_prompt = """You are a master Vedic Astrologer. 
    Provide a highly structured, analytical report.
    Structure:
    1. Summary (Brief personality insight).
    2. Dasha Analysis (Timeline of key events).
    3. Marriage/Partnership Logic (Key dates).
    4. Partner Profile (Traits).
    5. Remedial Guidance (Specific rituals).
    Keep the response concise and focused (max 350 words). Focus on accuracy."""

    headers = {"Authorization": f"Bearer {NVIDIA_API_KEY}", "Content-Type": "application/json"}
    
    # Memory limit ke liye max_tokens kam rakha hai
    payload = {
        "model": "nvidia/nemotron-4-340b-instruct",
        "messages": [{"role": "system", "content": system_prompt}, {"role": "user", "content": user_prompt}],
        "temperature": 0.7,
        "max_tokens": 800 
    }

    try:
        response = requests.post(NVIDIA_API_URL, headers=headers, json=payload, timeout=60)
        report = response.json()['choices'][0]['message']['content']
        return jsonify({'report': report})
    except Exception as e:
        return jsonify({'error': 'Server overload. Try again.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
