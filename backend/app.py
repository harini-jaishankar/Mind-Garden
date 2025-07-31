from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from models import db, User, Mood  # ✅ Ensure Mood includes `user_id`

# ------------------- App Setup -------------------
app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 🔐 Change in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SAMESITE'] = "None"
app.config['SESSION_COOKIE_SECURE'] = True  # Only use with HTTPS

# ------------------- CORS -------------------
CORS(app, supports_credentials=True)

# ------------------- DB + Login -------------------
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

# ------------------- JWT -------------------
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # 🔐 Change in production
jwt = JWTManager(app)

# ------------------- Load User -------------------
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ------------------- Flask-Login Auth -------------------

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify(message="User already exists"), 409

    hashed_pw = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully.")

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        login_user(user)
        return jsonify(message="Login successful.")
    return jsonify(message="Invalid credentials."), 401

@app.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify(message="Logged out successfully.")

@app.route('/submit', methods=['POST'])
@login_required
def submit_mood():
    data = request.json
    mood = data.get('mood')
    date = data.get('date')

    new_entry = Mood(mood=mood, date=date, user_id=current_user.id)
    db.session.add(new_entry)
    db.session.commit()
    return jsonify(message="Mood saved successfully.")

@app.route('/get_moods', methods=['GET'])
@login_required
def get_moods():
    moods = Mood.query.filter_by(user_id=current_user.id).all()
    return jsonify([{"mood": m.mood, "date": m.date} for m in moods])

# ------------------- JWT Auth -------------------

@app.route('/jwt_login', methods=['POST'])
def jwt_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(success=True, token=access_token)
    return jsonify(success=False, message="Invalid credentials"), 401

@app.route('/jwt_protected', methods=['GET'])
@jwt_required()
def jwt_protected():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(message="Access granted", user=user.username)

# ------------------- Init DB -------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
