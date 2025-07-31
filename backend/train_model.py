# backend/train_model.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib

# Sample dataset (replace later with real dataset)
data = {
    'text': ['I feel happy', 'I am sad', 'I am angry', 'I am excited', 'I feel terrible'],
    'label': ['positive', 'negative', 'negative', 'positive', 'negative']
}
df = pd.DataFrame(data)

# Build a pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression())
])

model.fit(df['text'], df['label'])

# Save model
joblib.dump(model, 'model.pkl')

print("✅ Model trained and saved as model.pkl")

