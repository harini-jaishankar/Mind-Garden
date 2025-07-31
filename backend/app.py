from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS so React can communicate

# SQLite database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mood_predictions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the database model
class MoodEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    prediction = db.Column(db.String(50), nullable=False)

# Create DB tables (only run once)
with app.app_context():
    db.create_all()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    user_text = data.get('text', '')

    # Dummy ML logic — replace with your real model later
    if "happy" in user_text.lower():
        predicted_mood = "Happy 😊"
    elif "sad" in user_text.lower():
        predicted_mood = "Sad 😢"
    else:
        predicted_mood = "Neutral 😐"

    # Save to DB
    entry = MoodEntry(text=user_text, prediction=predicted_mood)
    db.session.add(entry)
    db.session.commit()

    return jsonify({'prediction': predicted_mood})

if __name__ == '__main__':
    app.run(debug=True)

