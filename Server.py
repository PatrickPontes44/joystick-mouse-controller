
from flask import Flask, render_template, flash, request, jsonify, Response
from flask_cors import CORS, cross_origin
from pynput.mouse import Button, Controller
from pynput.keyboard import Key, Controller as KeyboardController
import json


app = Flask(__name__)
CORS(app, support_credentials=True)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/", methods=['GET','POST'])
def index():
    return 'nothing here yet'

@app.route("/mouse", methods=['GET','POST'])
def cursorMove():
    try:
        def move_mouse(direcao, mouse = Controller()):
            distance = 30
            x, y = mouse.position
            if direcao == 'up':
                y-=distance
            elif direcao == 'down':
                y+=distance
            elif direcao == 'right':
                x+=distance
            elif direcao == 'left':
                x-=distance
                
            mouse.position = (x,y)
            
        direction = str(request.get_json(force=True))
        
        resp = Response(move_mouse(direction),mimetype='text/plain')
            
        resp.headers['Access-Control-Allow-Origin'] = '*'
        
        return resp
    except:
        return "bad request"


@app.route("/keyboard", methods=['GET','POST'])
def keyboard():
    try:
        def move_key(direcao, keyboard = KeyboardController()):
            if direcao == 'up':
                keyboard.press(Key.up)
                keyboard.release(Key.up)
            elif direcao == 'down':
                keyboard.press(Key.down)
                keyboard.release(Key.down)
            elif direcao == 'left':
                keyboard.press(Key.left)
                keyboard.release(Key.left)
            elif direcao == 'right':
                keyboard.press(Key.right)
                keyboard.release(Key.right)
            
            
        direction = str(request.get_json(force=True))
        
        resp = Response(move_key(direction),mimetype='text/plain')
            
        resp.headers['Access-Control-Allow-Origin'] = '*'
        
        return resp
    except:
        return "bad request"


@app.route("/left-click", methods=['GET','POST'])
def left():
    try:
        def mouse_l_press(mouse = Controller()):
            mouse.press(Button.left)
            mouse.release(Button.left)
        resp = Response(mouse_l_press(),mimetype='text/plain')
                
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    except:
        return "bad request"

@app.route("/right-click", methods=['GET','POST'])
def right():
    try:
        def mouse_r_press(mouse = Controller()):
            mouse.press(Button.right)
            mouse.release(Button.right)
        resp = Response(mouse_r_press(),mimetype='text/plain')
                
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    except:
        return "bad request"

@app.route("/page-up", methods=['GET','POST'])
def movePageUp():
    try:
        def pageUp(keyboard = KeyboardController()):
            keyboard.press(Key.page_up)
            keyboard.release(Key.page_up)

        resp = Response(pageUp(),mimetype='text/plain')    
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    except:
        return "bad request"

@app.route("/page-down", methods=['GET','POST'])
def movePageDown():
    try:
        def pageDown(keyboard = KeyboardController()):
            keyboard.press(Key.page_down)
            keyboard.release(Key.page_down)

        resp = Response(pageDown(),mimetype='text/plain')    
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    except:
        return "bad request"


@app.route("/command", methods=['GET','POST'])
def command():
    try:
        cmd = str(request.get_json(force=True))
        def keypress(msg, keyboard = KeyboardController()):
            keyboard.type(msg)

        resp = Response(keypress(cmd),mimetype='text/plain')    
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    except:
        return "bad request"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False)
    #app.run(debug=True)
