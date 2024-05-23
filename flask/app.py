from flask import Flask, render_template, request
import json
import sqlite3


app = Flask(__name__)


app.config['JSON_AS_ASCII'] = False


#/sleep/:id と /ranking

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




if __name__ == '__main__':
    app.run(debug=True)