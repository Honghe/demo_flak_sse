import json
import time

from flask import Flask
from flask import Response
from flask import render_template

app = Flask(__name__)


def get_message():
    """this could be any function that blocks until data is ready"""
    time.sleep(1)
    s = time.ctime(time.time())
    return json.dumps(['中' + s+'文', 'a'], ensure_ascii=False)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/stream')
def stream():
    def eventStream():
        while True:
            # wait for source data to be available, then push it
            yield 'data: {}\n\n'.format(get_message())

    return Response(eventStream(), mimetype="text/event-stream")


if __name__ == '__main__':
    app.run()
