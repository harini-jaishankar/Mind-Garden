# backend/app.py

from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load("model.pkl")

# Default homepage route (for browser)
@app.route('/')
def home():
    return "<h2>🌱 Welcome to MindGarden Backend</h2><p>Use <code>/predict</code> with a POST request to get mood prediction.</p>"

# Mood prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data['text']
        prediction = model.predict([text])[0]
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

