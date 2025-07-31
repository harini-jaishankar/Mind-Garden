from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS so React frontend can communicate

# Configure SQLite database
import os
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'mood_predictions.db')}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define the MoodEntry model
class MoodEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    prediction = db.Column(db.String(50), nullable=False)

# Create database tables (only runs once)
with app.app_context():
    db.create_all()
    print("✅ Database tables created")

# Define prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    user_text = data.get('text', '')

    # Simple dummy logic for mood prediction
    if "happy" in user_text.lower():
        predicted_mood = "Happy 😊"
    elif "sad" in user_text.lower():
        predicted_mood = "Sad 😢"
    else:
        predicted_mood = "Neutral 😐"

    # Save prediction to the database
    entry = MoodEntry(text=user_text, prediction=predicted_mood)
    db.session.add(entry)
    db.session.commit()
    print("✅ Entry saved to DB")

    return jsonify({'prediction': predicted_mood})

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

