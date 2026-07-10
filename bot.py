import os
from flask import Flask, render_template, request, jsonify
from openai import OpenAI

app = Flask(__name__)

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.environ.get("NVIDIA_API_KEY")
)

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
    Provide a professional, clear, and empathetic astrological report.
    Structure:
    1. Core Summary.
    2. Active Dasha Analysis.
    3. Marriage & Partnership Outlook (with focus on mature alignment).
    4. Partner Traits.
    5. Actionable Remedial Guidance.
    Keep the tone grounding, optimistic, and structured. Max 400 words."""

    try:
        completion = client.chat.completions.create(
            model="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7
        )
        
        # Sirf main report return hogi
        return jsonify({'report': completion.choices[0].message.content})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
