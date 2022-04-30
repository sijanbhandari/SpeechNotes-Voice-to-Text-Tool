# [SpeechNotes Voice-to-Text Tool](https://speechnotes-voice-to-text.herokuapp.com/)

SpeechNotes is a type of speech recognition program that converts spoken to written language in form of notes. Speech recognition is a capability which enables a program to process human speech into a written format. A wide number of industries are utilizing different applications of speech technology today, helping businesses and consumers save time and even lives such as automative, technology, healthcare, sales and security. 

The main objective of our project is to encourage the use of our native language and to help illiterate people for the easy typing of the text. The concept involves the recognition of voice through a microphone. With considerable advances in voice technologies, the users will now need to spend less time to conduct lengthy searches or to transcribe huge voice data to text transcripts. It is imperative that this new technology will also establish a new mark in building a brand through new age AI-enabled voice dynamics.

## 🛠 Languages Used
- HTML/CSS
- Javascript
- Bootstrap
- Python
- Flask
- Heroku

## Healthy Practice : Setting Up a Virtual Environment
In order to avoid collisions during imports and other situations created due to different version requirements for different projects , it is often essential to build / create a virtual environment before trying to install project dependencies. You can easily do this using `pip` as :

```bash
  pip install venv
```

Once `venv` is installed on your computer you can go forward to create a virtual environment for your project by executing the following command :

```bash
  python -m venv venv
```

This command will create a folder named `venv` containing all the necessary scripts . The same folder is also going to store all our dependencies used in the project. Once the virtual environment is setup , you need to activate it . . .

`cd` into the `venv` folder followed by the `Scripts` folder. And then use the `activate` command inside the `Scripts` folder.

```bash
  python cd venv/Scripts
```

Once you are inside the Scripts folder , `activate` the virtual environment :

```bash
  /venv/Scripts/ > activate
```

Or `deactivate` the virtual environment :

```bash
  /venv/Scripts/ > deactivate
```

## Installing directly from `requirements.txt`

You can directly install all the required dependencies using the `requirements.txt` file in the repository. Run the following command :

**Note : If you have decided to use a Virtual Environment for your project , make sure you activate it before running the command given below**

```bash
  pip install -r requirements.txt
```

The `requirements.txt` file in this repository has been created using the latest python version : `python 3.9.0`

Although backward compatibility is present in python , in case of any error during installation from the `requirements.txt` file , you can always install standalone modules separately from the `Installing modules individually` section given below .

## Getting Started

Drop a ⭐ on the Github Repository.

Clone the project

```bash
  git clone https://github.com/kshibarn/SpeechNotes-Voice-to-Text-Tool.git
```

Go to the project directory

```bash
  cd my-project
```

Install Python Packages

```bash
  pip install -r requirements.txt
```

Start Up the Application

```bash
  python app.py
```
or
```bash
  python3 app.py
```

## Tech Stack

## ([Flask](https://github.com/pallets/flask) + [Heroku](https://www.heroku.com/) + [SpeechRecognition](https://pypi.org/project/SpeechRecognition/) + [Recorderjs](https://github.com/mattdiamond/Recorderjs))

**Flask:** Flask is a microframework for Python based on Werkzeug, Jinja2 and good intentions. It is designed to get you started quickly but it is not the best way to build large applications. Flask is a good choice for small projects and is easy to extend.

**SpeechRecognition:** SpeechRecognition is a library that allows you to convert speech to text. It is a Python library that uses the Google Speech Recognition API to convert speech to text. SpeechRecognition Library for performing speech recognition, with support for several engines and APIs, online and offline.

**Heroku** : Heroku is a platform for deploying and scaling web apps. It is a cloud-based platform that allows you to deploy and scale your web apps easily. Heroku is a great way to get started with web development.

**Recorderjs:** Recorderjs is a library that allows you to record audio from your browser. It is a JavaScript library that uses the Web Audio API to record audio from your browser. It is a great way to get started with web development.

## Screen Shots

<img width="949" alt="2022-04-22" src="https://user-images.githubusercontent.com/73215352/164711085-945c7f2a-53ab-4438-8121-2df94a4a98e1.png">

<img width="947" alt="2022-04-22 (1)" src="https://user-images.githubusercontent.com/73215352/164711151-c30c5ae8-1d8d-40a1-ae4a-1ea879c6c339.png">

<img width="960" alt="2022-04-27 (2)" src="https://user-images.githubusercontent.com/73215352/165520208-ad26ddfe-7473-4b2b-a40a-fecd8afc50d2.png">

### Flowchart
<img width="163" alt="FlowChart" src="https://user-images.githubusercontent.com/73215352/165590186-12cc0fca-caa0-4473-98bf-1aa0656fbdd3.png">
