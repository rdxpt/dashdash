import os
import base64
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError(" ERROR: GROQ_API_KEY is not set in environment variables.")


def encode_image(image_path):   
    try:
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    except FileNotFoundError:
        print(" ERROR: Image file not found! Check the path.")
        return None
    except Exception as e:
        print(f" ERROR: Unable to encode image - {e}")
        return None


def analyze_image_with_query(query, encoded_image, model="llama-3.2-11b-vision-preview"):
    try:
        print(" Initializing Groq client...")
        client = Groq(api_key=GROQ_API_KEY)  

        if not encoded_image:
            return " ERROR: Image encoding failed."

        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": query},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{encoded_image}"}},
                ],
            }
        ]

        print(" Sending request to AI model...")
        chat_completion = client.chat.completions.create(
            messages=messages, 
            model=model, 
            max_tokens=300,
            temperature=0.7
        )

        print(" AI response received!")
        return chat_completion.choices[0].message.content

    except Exception as e:
        print(f" ERROR details: {e}")
        return f" ERROR: {e}"


if __name__ == "__main__":
    query = "Is there something wrong with my face?"
    image_path = "acne.jpg"  

    print(" Encoding image...")
    encoded_image = encode_image(image_path)

    if not encoded_image:
        raise ValueError("Exiting due to image encoding failure.")

    print(" Image encoded successfully!")

    response = analyze_image_with_query(query, encoded_image)

    if response:
        print(" AI Response:", response)
    else:
        print(" No response received.")