from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load your ML model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# Create the SQLite database and table if not exists
def init_db():
    conn = sqlite3.connect('mood_predictions.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS mood_logs
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  text TEXT,
                  mood TEXT,
                  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

init_db()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']

    # Predict the mood
    prediction = model.predict([text])[0]

    # Store in database
    conn = sqlite3.connect('mood_predictions.db')
    c = conn.cursor()
    c.execute("INSERT INTO mood_logs (text, mood) VALUES (?, ?)", (text, prediction))
    conn.commit()
    conn.close()

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
