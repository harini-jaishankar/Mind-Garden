from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app = Flask(__name__)

@app.route('/')
def home():
    return "Flask server is running."

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get("text", "")
    return jsonify({"prediction": f"Dummy response for: {text}"})

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
