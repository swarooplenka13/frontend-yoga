import pdfplumber
from flask import Flask, jsonify
from help import download
from flask_cors import CORS
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import string
import matplotlib.pyplot as plt
from collections import Counter


app = Flask(__name__)
CORS(app)


@app.route("/getemotions/<string:r>")
def get_match(r):
    local1 = str(r)
    local1 =download(local1)
    resume = ""
    with pdfplumber.open(local1) as pdf:
        page = pdf.pages[0]
        t = page.extract_text(x_tolerance=2)
        resume += t   
    text=resume
    text=text.lower()
    text=text.replace("\n","")
    text=text.translate(str.maketrans("","",string.punctuation))
    tokenize_words=word_tokenize(text)
    clean_words=[]
    for i in tokenize_words:
        if i not in stopwords.words("english"):
            clean_words.append(i)
    emotions=[]
    with open(r'C:\Users\SWAROOPLENKA\Desktop\Recruit\seanalysis\emotion.txt',"r") as file:
        for i in file:
            # now we have to modify the emotions
            text1=i.replace("\n","")
            text1=text1.strip()
            text1=text1.replace(" ","")
            text1=text1.replace(",","")
            text1=text1.replace("'","")
            word,emotion=text1.split(":")
            if word in clean_words:
                emotions.append(emotion)
    def sentimentanalysis(text):
        return SentimentIntensityAnalyzer().polarity_scores(text)
    sentiments=sentimentanalysis(text)
    emotions_counter=Counter(emotions)
    em= list(emotions_counter)
    happy,hated,entitled,attached,attracted,alone,loved,free=0,0,0,0,0,0,0,0
    if 'happy' in em:
        happy=1
    else:
        happy=0 
    if 'hated' in em:
        hated=1
    else:
        hated=0
    if 'entitled' in em:
        entitled=1
    else:
        entitled=0 
    if 'attached' in em:
        attached=1
    else:
       attached=0 
    if 'attracted' in em:
        attracted=1
    else:
        attracted=0 
    if 'alone' in em:
        alone=1
    else:
        alone=0 
    if 'free' in em:
        free=1
    else:
        free=0 
    if 'loved' in em:
        loved=1
    else:
        loved=0                                         
    result = {
        "negative":round(sentiments['neg']*100,2),
        "positive":round(sentiments['pos']*100,2),
        "neutral":round(sentiments['neu']*100,2),
        "compound":round(sentiments['compound']*100,2),
         "happy":happy,
         "hated":hated,
         "entitled":entitled,
         "attached":attached,
         "attracted":attracted,
         "alone":alone,
         "loved":loved,
         "free":free
    }
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5501)