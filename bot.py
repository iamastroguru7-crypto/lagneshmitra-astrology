import os
from flask import Flask, render_template, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# Client setup
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API_KEY")
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

    try:
        completion = client.chat.completions.create(
            model="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
            messages=[{"role": "user", "content": user_prompt}],
            temperature=0.6,
            top_p=0.95,
            max_tokens=2048, # Max tokens reduce kiye hain kyunki 65k bahut zyada hai render ke liye
            extra_body={
                "chat_template_kwargs": {"enable_thinking": True},
                "reasoning_budget": 1024
            },
            stream=False
        )
        
        # Reasoning aur Content dono combine kar lo
        reasoning = getattr(completion.choices[0].message, "reasoning_content", "")
        content = completion.choices[0].message.content
        
        full_response = f"**Thinking Process:**\n{reasoning}\n\n**Report:**\n{content}"
        return jsonify({'report': full_response})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
