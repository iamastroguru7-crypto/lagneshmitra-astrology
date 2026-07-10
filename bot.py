import os
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# API Key aur URL configuration
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY")
# NVIDIA ka standard endpoint format
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

    system_prompt = """You are an expert Vedic Astrologer. 
    Provide a standard, concise, and highly structured astrological report.
    Structure:
    1. Core Summary.
    2. Active Dasha Analysis.
    3. Marriage & Partnership Outlook.
    4. Partner Traits.
    5. Actionable Remedial Guidance.
    Keep it clear and focused (max 400 words)."""

    headers = {
        "Authorization": f"Bearer {NVIDIA_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    # Model ko clean rakha hai, endpoint handle karega
    payload = {
        "model": "nvidia/nemotron-4-340b-instruct",
        "messages": [
            {"role": "system", "content": system_prompt}, 
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 800,
        "stream": False
    }

    try:
        response = requests.post(NVIDIA_API_URL, headers=headers, json=payload, timeout=60)
        
        if response.status_code == 200:
            response_data = response.json()
            report = response_data['choices'][0]['message']['content']
            return jsonify({'report': report})
        else:
            # Error details log karne ke liye
            print(f"API Error Response: {response.text}")
            return jsonify({'error': f'API Error {response.status_code}: Check your API Key or Endpoint.'}), response.status_code
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
