#!/usr/bin/python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def cover():
    return render_template('index.html')

# @app.route('/chapter1')
# def chapter1(**kwa):
#     return render_template('chapter1.html')

# @app.route('/context')
# def context(**kwa):
#     return render_template('context.html')

# @app.route('/plot')
# def plot(**kwa):
#     return render_template('plot.html')

# @app.route('/characters')
# def character(**kwa):
#     return render_template('characters.html')

# @app.route('/games')
# def games(**kwa):
#     return render_template('games.html')

if __name__ == '__main__':
    app.run(debug=True)
