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

    # System prompt ko normal/standard mode par set kiya hai
    # Isse engine har normal user ke liye standard, concise aur clear report generate karega
    system_prompt = """You are an expert Vedic Astrologer. 
    Provide a standard, concise, and highly structured astrological report based on the provided birth details.
    
    Structure your response with these exact points:
    1. Core Summary (Brief personality and mental outlook).
    2. Active Dasha Analysis (Timeline of current and upcoming planetary periods).
    3. Marriage & Partnership Outlook (Key timelines and relationship indicators).
    4. Partner Traits (General profile of the spouse/partner).
    5. Actionable Remedial Guidance (Simple, specific rituals or remedies).
    
    Keep the response clear, easy to understand, and strictly focused on the provided user details (maximum 350-400 words). Do not use overlaying advanced technical complexities unless explicitly requested by the user."""

    headers = {
        "Authorization": f"Bearer {NVIDIA_API_KEY}", 
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "nvidia/nemotron-4-340b-instruct",
        "messages": [
            {"role": "system", "content": system_prompt}, 
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 800 
    }

    try:
        response = requests.post(NVIDIA_API_URL, headers=headers, json=payload, timeout=60)
        
        # Checking if response is valid JSON and has the expected keys
        if response.status_code == 200:
            response_data = response.json()
            if 'choices' in response_data and len(response_data['choices']) > 0:
                report = response_data['choices'][0]['message']['content']
                return jsonify({'report': report})
            else:
                return jsonify({'error': 'Unexpected response format from AI engine.'}), 500
        else:
            return jsonify({'error': f'API error with status code {response.status_code}'}), 500
            
    except Exception as e:
        return jsonify({'error': 'Server overload or connection timeout. Please try again.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
