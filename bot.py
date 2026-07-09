from flask import Flask, request, jsonify, render_template
import os
from openai import OpenAI

# Flask ko bataya ki templates folder isi directory mein hai
app = Flask(__name__, template_folder='templates')

# NVIDIA API setup
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API_KEY")
)

@app.route('/')
def home():
    # Root folder ke andar 'templates/index.html' load karega
    return render_template('index.html')

@app.route('/get-report', methods=['POST'])
def get_report():
    data = request.json
    user_input = data.get("prompt", "")
    
    if not user_input:
        return jsonify({"error": "No prompt provided"}), 400

    system_prompt = """You are a professional astrologer. 
    Format the response in this exact style:
    ### 📜 ASTROLOGY REPORT: NEETHU PHILLIPS
    ---
    **1. Astrological Summary:** [Summary here]
    **2. Second Marriage Window:** [Timing here]
    **3. Partner Characteristics:** [Traits here]
    **4. Life Journey:** [Predictions here]
    **5. Remedial Guidance:** [Tips here]
    """

    try:
        completion = client.chat.completions.create(
            model="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input}
            ],
            temperature=0.6,
            extra_body={"chat_template_kwargs": {"enable_thinking": True}}
        )
        report = completion.choices[0].message.content
        return jsonify({"report": report})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
