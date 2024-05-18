import datetime

from flask import Flask, render_template, request
import json
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/user/self', methods=['POST'])
def user():
    if request.method == 'POST':
        user_id = int(request.form['id'])
        name = request.form['name']
        birthday = request.form['birthday']
        sex = int(request.form['sex'])

        return json.dumps({'id': user_id, 'name': name, 'birthday': datetime.datetime.fromtimestamp(int(birthday)).strftime("%Y-%m-%D"), 'sex': sex})


@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        date = request.form['date']
        bed_time = request.form['bed_time']
        wake_up_time = request.form['wake_up_time']
        memo = request.form['memo']

        return json.dumps({'date': datetime.datetime.fromtimestamp(int(date)).strftime("%Y-%m-%D"), 'bed_time': datetime.datetime.fromtimestamp(int(bed_time)).strftime("%H:%M:%S"), 'wake_up_time': datetime.datetime.fromtimestamp(int(wake_up_time)).strftime("%H:%M:%S"), 'memo': memo})


if __name__ == '__main__':
    app.run(debug=True)
