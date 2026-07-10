import os
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# API Configuration
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY")
# Ensure URL is exactly this, no trailing slashes or extra paths
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

    system_prompt = "You are an expert Vedic Astrologer. Provide a concise, structured report: 1. Summary, 2. Dasha, 3. Marriage, 4. Traits, 5. Remedies. Max 400 words."

    headers = {
        "Authorization": f"Bearer {NVIDIA_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # NVIDIA API often requires specific model naming conventions
    payload = {
        "model": "nemotron-4-340b-instruct",
        "messages": [
            {"role": "system", "content": system_prompt}, 
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 800
    }

    try:
        # Debugging step: Print to logs to see if request is actually firing
        response = requests.post(NVIDIA_API_URL, headers=headers, json=payload, timeout=60)
        
        if response.status_code == 200:
            return jsonify({'report': response.json()['choices'][0]['message']['content']})
        else:
            # This will show the actual error message in the browser console/result
            error_msg = f"API Error {response.status_code}: {response.text}"
            return jsonify({'error': error_msg}), response.status_code
            
    except Exception as e:
        return jsonify({'error': f"Connection Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
