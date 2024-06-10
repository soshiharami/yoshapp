import sqlite3
from flask import Flask, render_template, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_cors import CORS, cross_origin
import os
import json
from datetime import timedelta
from datetime import datetime

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
    date = db.Column(db.String(100), nullable=False)
    bed_time = db.Column(db.String(100), nullable=False)
    wake_up_time = db.Column(db.String(100), nullable=False)
    memo = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Float(), nullable=False)


@app.after_request
def after_request(response):
    allowed_origins = ['http://localhost:3001/']
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
    return jsonify({'email': current_user.email, 'name': current_user.name, 'id': current_user.id}), 200


@app.route('/sleep/<id>', methods=['POST', 'OPTIONS'])
@cross_origin()
@login_required
def sleep_id(id):
    result = {}
    data = request.get_json()
    limit = data['limit']
    offset = data['offset']
    dbname = 'site.db'
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()
    cur.execute('select bed_time, wake_up_time, memo, score, date from sleep where user_id = ? limit ? offset ?',
                (id, limit, offset))

    sleep_list = []
    for row in cur:
        dict = {}
        dict['bed_time'] = row[0]
        dict['wake_up_time'] = row[1]
        dict['memo'] = row[2]
        dict['score'] = row[3]
        dict['date'] = row[4]
        sleep_list.append(dict)

    result['sleep'] = sleep_list
    result['limit'] = limit
    result['offset'] = offset

    cur.close()
    conn.close()
    return json.dumps(result)


@app.route('/ranking', methods=['OPTIONS', 'GET'])
@cross_origin()
def ranking():
    limit = request.args.get('limit', type=int, default=10)
    offset = request.args.get('offset', type=int, default=0)
    return_dict = {}  # user: {id, name, birthday, sex}, rank, limit, offset

    dbname = 'site.db'  # データベースの名前
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()

    # ユーザーごとの平均スコアを取得するSQLクエリ
    cur.execute('''
        SELECT s.user_id, AVG(s.score) as avg_score, u.name, u.birthday, u.sex
        FROM sleep s
        JOIN user u ON s.user_id = u.id
        GROUP BY s.user_id
        ORDER BY avg_score DESC
        LIMIT ? OFFSET ?
    ''', (limit, offset))

    users = []
    rank = offset + 1  # ランクはオフセットに基づいて開始

    for row in cur:
        user_dict = {
            'id': row[0],
            'rank': rank,
            'avg_score': row[1],
            'name': row[2],
            'birthday': row[3],
            'sex': row[4]
        }
        users.append(user_dict)
        rank += 1

    cur.close()
    conn.close()

    return_dict['users'] = users
    return_dict['limit'] = limit
    return_dict['offset'] = offset

    return json.dumps(return_dict) 


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

def score_calculate(bet_time, wake_up_time):
    bed_time_str = bet_time
    wake_time_str = wake_up_time
    bed_time = datetime.strptime(bed_time_str, '%H:%M')
    wake_time = datetime.strptime(wake_time_str, '%H:%M')

    # 日付を跨いだ場合を考慮
    if wake_time <= bed_time:
        wake_time += timedelta(days=1)

    ideal_time = 25200  # 7 hours in seconds
    sleep_hours = (wake_time - bed_time).total_seconds()
    sleep_deficit = abs(sleep_hours - ideal_time)
    score = max(0, ((ideal_time - sleep_deficit) / ideal_time) * 10000)
    return float(score)

    

@app.route('/submit', methods=['POST'])
@cross_origin()
def submit():
    user = current_user
    print(user.id)
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        date = data['date']
        bed_time = data['bed_time']
        wake_up_time = data['wake_up_time']
        memo = data['memo']
        score = score_calculate(bed_time, wake_up_time)
        conn = sqlite3.connect('site.db')
        cur = conn.cursor()
        cur.execute('insert into sleep (date, user_id ,bed_time, wake_up_time, memo, score) values(?, ?, ?, ?, ?, ?)', (date, user.id ,bed_time, wake_up_time, memo, score))
        conn.commit()
        cur.close()
        conn.close()
        return json.dumps({'date': date,
                           'bed_time': bed_time,
                           'wake_up_time': wake_up_time,
                           'memo': memo, 'score': score})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
