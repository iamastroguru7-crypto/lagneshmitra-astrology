import os
from openai import OpenAI

# API Key runtime ke environment variables se uthayega
# Isko GitHub par push karte waqt key mat likhna!
client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = os.getenv("NVIDIA_API_KEY") 
)

def get_astrology_verdict(user_input):
    completion = client.chat.completions.create(
      model="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
      messages=[{"role":"user","content": user_input}],
      temperature=0.6,
      top_p=0.95,
      max_tokens=4096,
      extra_body={
          "chat_template_kwargs": {"enable_thinking": True},
          "reasoning_budget": 1024
      },
      stream=False
    )
    
    # Reasoning aur Final Answer dono fetch kar rahe hain
    reasoning = getattr(completion.choices[0].message, "reasoning_content", None)
    answer = completion.choices[0].message.content
    
    return reasoning, answer

# Testing ke liye (Runtime pe ye part tumhare UI se connect hoga)
if __name__ == "__main__":
    query = "Kundali mein Mangal Dosh ka prabhav kya hai?"
    think, ans = get_astrology_verdict(query)
    
    if think:
        print("--- Soch (Reasoning) ---\n", think)
    print("\n--- Verdict ---\n", ans)
  
