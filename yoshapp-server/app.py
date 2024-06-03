import datetime
import sqlite3
from flask import Flask, render_template, request
import json
app = Flask(__name__)

app.config['JSON_AS_ASCII'] = False


@app.route('/sleep/<id>')
def sleep_id(id):
    result = {}
    limit = request.args['limit']
    offset = request.args['offset']
    dbname = 'database.db'
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()
    cur.execute('select bed_time, wake_up_time, memo, score from data where id = ? limit ? offset ?', (id,limit,offset))

    sleep_list = []
    for row in cur:
        dict = {}
        dict['bed_time'] = row[0]
        dict['wake_up_time'] = row[1]
        dict['memo'] = row[2]
        dict['score'] = row[3]
        sleep_list.append(dict)

    result['sleep'] = sleep_list
    result['limit'] = limit
    result['offset'] = offset


    cur.close()
    conn.close()
    return json.dumps(result)

@app.route('/ranking')
def ranking():
    #DBからスコア情報を取得
    limit = request.args['limit']
    offset = request.args['offset']
    return_dict = {} #user:{id,name,birthday,sex} ,rank, limit, offset

    dbname = 'database.db' #データベースの名前
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()

    cur.execute('select id, score from data order by score desc limit ? offset ?', (limit, offset))     #ランキング情報を取得するSQL文
    n = 1
    users = []
    for row in cur:
        #ランキングを決める
        user_dict = {}
        user_dict['id'] = row[0]
        user_dict['rank'] = n

        users.append(user_dict)
        n += 1


    for n in range(len(users)):
        #users[n] = user_dict
        cur.execute('select name, birthday, sex from user where id = ?', (users[n]['id'],))
        print()
        for row in cur:
            users[n]['name'] = row[0]
            users[n]['birthday'] = row[1]
            users[n]['sex'] = row[2]

    cur.close()
    conn.close()

    return_dict['user'] = users
    return_dict['limit'] = limit
    return_dict['offset'] = offset

    return json.dumps(return_dict)    #JSON形式で返す

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/user/:id', methods=['GET'])
def userid():
    if request.method == 'GET':
        user_id = int(request.form['user_id'])
        name = request.form['name']
        birthday = request.form['birthday']
        sex = int(request.form['sex'])

        return json.dumps({'id': user_id, 'name': name,
                           'birthday': datetime.datetime.fromtimestamp(int(birthday)).strftime("%Y-%M-%D"), 'sex': sex})


@app.route('/user/self', methods=['POST'])
def user():
    if request.method == 'POST':
        user_id = int(request.form['id'])
        name = request.form['name']
        birthday = request.form['birthday']
        sex = int(request.form['sex'])

        return json.dumps({'id': user_id, 'name': name,
                           'birthday': datetime.datetime.fromtimestamp(int(birthday)).strftime("%Y-%M-%D"), 'sex': sex})


@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        date = request.form['date']
        bed_time = request.form['bed_time']
        wake_up_time = request.form['wake_up_time']
        memo = request.form['memo']
        score = score_calculate(bed_time, wake_up_time)

        return json.dumps({'date': datetime.datetime.fromtimestamp(int(date)).strftime("%Y-%m-%D"), 'bed_time': datetime.datetime.fromtimestamp(int(bed_time)).strftime("%H:%M:%S"), 'wake_up_time': datetime.datetime.fromtimestamp(int(wake_up_time)).strftime("%H:%M:%S"), 'memo': memo, 'score': score})


if __name__ == '__main__':
    app.run(debug=True)