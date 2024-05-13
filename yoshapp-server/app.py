from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data0 = request.form['data0']
        data1 = request.form['data1']
        data2 = request.form['data2']
        data3 = request.form['data3']
        data4 = request.form['data4']
        data5 = request.form['data5']
        data6 = request.form['data6']
        data7 = request.form['data7']
        data8 = request.form['data8']
        data9 = request.form['data9']
        data10 = request.form['data10']
        data11 = request.form['data11']
        data12 = request.form['data12']
        data13 = request.form['data13']
        data14 = request.form['data14']
        data15 = request.form['data15']
        data16 = request.form['data16']
        data17 = request.form['data17']
        data18 = request.form['data18']
        data19 = request.form['data19']
        data20 = request.form['data20']

        return f'Data from form: {data0}, {data1}, {data2}, {data3}, {data4}, {data5}, {data6}, {data7}, {data8}, {data9}, {data10}, {data11}, {data12}, {data13}, {data14}, {data15}, {data16}, {data17}, {data18}, {data19}, {data20}'

if __name__ == '__main__':
    app.run(debug=True)
