def predict_mood(text):
    # Dummy logic – Replace with ML model later
    if "happy" in text.lower():
        return "happy"
    elif "sad" in text.lower():
        return "sad"
    elif "angry" in text.lower():
        return "angry"
    else:
        return "neutral"
