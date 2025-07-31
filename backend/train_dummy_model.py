import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

# Sample training data
texts = ["I am happy", "I feel great", "I am sad", "I am depressed", "I am excited", "I feel anxious"]
labels = ["happy", "happy", "sad", "sad", "happy", "sad"]

# Create a simple pipeline
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(texts, labels)

# Save the model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Dummy model saved as model.pkl")
