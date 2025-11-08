from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
app = Flask(__name__)
CORS(app)
api_key = ''

GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"

def get_llm_response(prompt):
    headers = {
        "Content-Type": "application/json"
    }

    data = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    response = requests.post(GEMINI_URL, headers=headers, json=data)

    if response.status_code == 200:
        result = response.json()
        return (
            result.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )
    else:
        return f"Error {response.status_code}: {response.text}"

@app.route("/querydeptprocess", methods=["POST"])
def process_query():
    print(125)
    depts=['academic-ece','academic-cse','academic-se','academic-it','academic-me','academic-mce','academic-ee','academic-ep','hostel','finance','student-affairs','healthcentre']
    data = request.json
    query = data.get("query", "")
    finalquery = f"Tell me in one word of these departments {depts} does this query belong to and that word should be the one in the list : {query}"
    print(finalquery)
    answer = get_llm_response(finalquery)
    print(answer)
    return jsonify({"reply": answer})

if __name__ == "__main__":
    app.run(port=5000, debug=True)

