import datetime
import sqlite3
from flask import Flask, render_template, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_cors import CORS, cross_origin
import os
import json
from datetime import timedelta

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = 'passworddddddsaduihau'
app.config['SESSION_COOKIE_SECURE'] = True  # 開発環境ではFalse, 本番環境ではTrueに設定
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=3600)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'site.db')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['JSON_AS_ASCII'] = False


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    sex = db.Column(db.Integer(), unique=False, nullable=True)
    birthday = db.Column(db.DateTime(), unique=False, nullable=True)


class Sleep(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)


@app.after_request
def after_request(response):
    allowed_origins = ['http://127.0.0.1:5000/', 'http://localhost:3001/', 'http://127.0.0.1:3000/']
    origin = request.headers.get('Origin')
    if origin in allowed_origins:
        response.headers.add('Access-Control-Allow-Origin', origin)
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


@login_manager.user_loader
def load_user(user_id):
    print("soiadhoiashdioasjdi")
    print(User.query.get(int(user_id)))
    return User.query.get(int(user_id))


@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(email=data['email'], password=hashed_password, name=data['name'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)
        session.permanent = True
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Login unsuccessful'}), 401


@app.route('/logout', methods=['POST'])
@cross_origin()
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200


@app.route('/current_user', methods=['GET'])
@cross_origin()
@login_required
def get_current_user():
    return jsonify({'email': current_user.email, 'name': current_user.name}), 200


@app.route('/sleep/<id>')
@cross_origin()
def sleep_id(id):
    result = {}
    data = request.get_json()
    limit = data['limit']
    offset = data['offset']
    dbname = 'database.db'
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()
    cur.execute('select bed_time, wake_up_time, memo, score from data where id = ? limit ? offset ?',
                (id, limit, offset))

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
@cross_origin()
def ranking():
    #DBからスコア情報を取得
    limit = request.args['limit']
    offset = request.args['offset']
    return_dict = {}  #user:{id,name,birthday,sex} ,rank, limit, offset

    dbname = 'database.db'  #データベースの名前
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()

    cur.execute('select id, score from data order by score desc limit ? offset ?', (limit, offset))  #ランキング情報を取得するSQL文
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

    return json.dumps(return_dict)  #JSON形式で返す


@app.route('/')
@cross_origin()
def index():
    return render_template('index.html')


@app.route('/user/:id', methods=['GET'])
@cross_origin()
def userid():
    if request.method == 'GET':
        user_id = int(request.form['user_id'])
        name = request.form['name']
        birthday = request.form['birthday']
        sex = int(request.form['sex'])
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        cur.execute('insert into user (id, name, birthday, sex) values(?, ?, ?, ?)', (user_id, name, birthday,sex))
        conn.commit()
        cur.close()
        conn.close()
        return json.dumps({'id': user_id, 'name': name,
                           'birthday': datetime.datetime.fromtimestamp(int(birthday)).strftime("%Y-%m-%d"), 'sex': sex})


@app.route('/user/self', methods=['POST'])
@cross_origin()
def user():
    if request.method == 'POST':
        user_id = int(request.form['id'])
        name = request.form['name']
        birthday = request.form['birthday']
        sex = int(request.form['sex'])
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        cur.execute('update user set name = ? where id = ?', (name, user_id))
        conn.commit()
        cur.close()
        conn.close()
        return json.dumps({'id': user_id, 'name': name,
                           'birthday': datetime.datetime.fromtimestamp(int(birthday)).strftime("%Y-%m-%d"), 'sex': sex})

def score_calculate(bed_time,wake_up_time):

    bed_time_str = bed_time
    wake_time_str = wake_up_time
    bed_time_datetime = datetime.strptime(bed_time_str, '%Y-%m-%d %H:%M:%S')
    wake_time_datetime = datetime.strptime(wake_time_str, '%Y-%m-%d %H:%M:%S')
    ideal_time = 25200#7hours
    sleep_hours = (wake_time_datetime - bed_time_datetime).total_seconds()
    sleep_deficit = abs(sleep_hours - ideal_time) 
    score = max(0,((ideal_time - sleep_deficit) / ideal_time)*10000) 
    return float(score)
    
@app.route('/submit', methods=['POST'])
@cross_origin()
def submit():
    if request.method == 'POST':
        date = request.form['date']
        bed_time = request.form['bed_time']
        wake_up_time = request.form['wake_up_time']
        memo = request.form['memo']
        score = score_calculate(bed_time, wake_up_time)
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        cur.execute('insert into user (date, bed_time, wake_up_time, memo) values(?, ?, ?, ?)', (date, bed_time, wake_up_time, memo))
        conn.commit()
        cur.close()
        conn.close()
        return json.dumps({'date': datetime.datetime.fromtimestamp(int(date)).strftime("%Y-%m-%d"),
                           'bed_time': datetime.datetime.fromtimestamp(int(bed_time)).strftime("%H:%M:%S"),
                           'wake_up_time': datetime.datetime.fromtimestamp(int(wake_up_time)).strftime("%H:%M:%S"),
                           'memo': memo, 'score': score})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
