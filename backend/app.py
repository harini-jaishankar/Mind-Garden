from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory list to store mood history
mood_history = []

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']

    # Dummy mood prediction logic (replace with ML model later)
    if 'happy' in text.lower():
        prediction = 'Happy'
    elif 'sad' in text.lower():
        prediction = 'Sad'
    else:
        prediction = 'Neutral'

    # Store prediction with timestamp
    mood_entry = {
        'text': text,
        'prediction': prediction,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    mood_history.append(mood_entry)

    return jsonify({'prediction': prediction})

@app.route('/history', methods=['GET'])
def history():
    return jsonify(mood_history)

if __name__ == '__main__':
    app.run(debug=True)
