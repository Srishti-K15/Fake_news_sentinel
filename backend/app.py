from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
import string

app = Flask(__name__)
CORS(app)  

model = pickle.load(open('logistic_regression_model.pkl', 'rb'))
vectorizer = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))

def clean_text(text):
    text = text.lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub("\\W", " ", text)
    return text

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    raw_text = data.get('text', '')
    
    # 1. Clean the incoming news
    processed_text = clean_text(raw_text)
    
    # 2. Vectorize the text using your saved TF-IDF
    vectorized_input = vectorizer.transform([processed_text])
    
    # 3. Predict
    prediction = model.predict(vectorized_input)
    status = "Genuine" if prediction[0] == 1 else "Fake"
    
    return jsonify({"prediction": status})

if __name__ == '__main__':
    app.run(port=5000, debug=True)