#!venv/bin/python
from flask import Flask, render_template, send_from_directory
from flask.ext.bootstrap import Bootstrap
from flask.ext.script import Manager
from flask.ext.moment import Moment

app = Flask(__name__, static_folder='static', static_url_path='/static')
Bootstrap(app)
Moment(app)
manager = Manager(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/2048')
def game_2048():
    return render_template("2048_templates/index.html")

@app.route("/shooter")
def game_shooter():
    return render_template("shooter_templates/index.html")

@app.route("/snake")
def game_snake():
    return render_template("snake_templates/index.html")

@app.route('/blog')
def blog():
    return render_template('blog_templates/index.html')

@app.route('/blog/about')
def blog_about():
    return render_template('blog_templates/about.html')

@app.route('/blog/post')
def blog_post():
    return render_template('blog_templates/PCA.html')

@app.route('/blog/contact')
def blog_contract():
    return render_template('blog_templates/contact.html')

@app.route('/blog/mail/contact_me.php', methods = ['POST'])
def run_php():
    return send_from_directory(app.static_folder, 'blog_static/mail/contact_me.php')

@app.route('/googlee07c61c8e4157065.html')
def google_crawl():
    return render_template('googlee07c61c8e4157065.html')

if __name__ == '__main__':
    manager.run()
