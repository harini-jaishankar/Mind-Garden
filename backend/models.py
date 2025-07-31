# models.py
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    moods = db.relationship('Mood', backref='user', lazy=True)  # Relationship

class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)  # Store date as string for now
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
