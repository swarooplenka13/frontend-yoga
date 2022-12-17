import pdfplumber
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, jsonify
from help import download
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/getdata/<string:r>")
def get_match(r):
    r = r.split(".")
    local1 = str(r[0])
    local2 = str(r[1])
    local1 =download(local1)
    local2 =download(local2)
    resume = ""
    jobdescription = ""
    with pdfplumber.open(local1) as pdf:
        page = pdf.pages[0]
        t = page.extract_text(x_tolerance=2)
        resume += t   
    with pdfplumber.open(local2) as pd:
        page = pd.pages[0]
        t = page.extract_text(x_tolerance=2)
        jobdescription += t 
    lis = [resume, jobdescription]
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(lis)
    similar = cosine_similarity(count_matrix)[0][1]*100   
    similar = round(similar,2) 
    resume=resume.replace('\n','')   
    result = {
        "match": similar,
        "resume":resume
    }
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5500)