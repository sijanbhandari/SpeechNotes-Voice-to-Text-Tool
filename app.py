import speech_recognition as sr
from flask import logging, Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = "KshitijBarnwal"

@app.route('/', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect(url_for('main'))
    return render_template('login.html', error=error)

@app.route('/main')
def main():
    flash("Press Start to start recording audio and press Stop to end recording audio")
    return render_template('main.html')

@app.route('/audio', methods=['POST'])
def audio():
    r = sr.Recognizer()
    with open('upload/audio.wav', 'wb') as f:
        f.write(request.data)
  
    with sr.AudioFile('upload/audio.wav') as source:
        audio_data = r.record(source)
        text = r.recognize_google(audio_data, language='en-IN', show_all=True)
        print(text)
        return_text = " Did you say : <br> "
        try:
            for num, texts in enumerate(text['alternative']):
                return_text += str(num+1) +") " + texts['transcript']  + " <br> "
        except:
            return_text = " Sorry!!!! Voice not Detected "
        
    return str(return_text)


if __name__ == "__main__":
    app.run(debug=True)