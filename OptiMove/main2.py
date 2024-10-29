
from flask import Flask, request, render_template, jsonify
from ImageToFEN import nameAllTiles, convert_to_FEN, returnAllTiles
from FENtoMove import FENtoMove
import os

app = Flask(__name__)

# these the user will provide:
user_image = ""
user_turn_color = ""
user_viewing_side = ""

# these will be given by my code:
fen = ""
fenOutput = ""
moveOutput = ""
board={}
letterBoard = "" #output
errMessage = None

@app.route("/", methods=['GET', 'POST'])   
def index():
    return render_template('input2.html')
        
@app.route("/api/tiles", methods=['GET', 'POST'])   
def getTiles():
    global board, user_turn_color, letterBoard  # Declare globals
    
    if request.method=="POST":
        user_viewing_side = request.form['usrPOV']
        user_turn_color = request.form['usrTurn']
        user_image = request.files['usrImg']

        if user_image:
            
            print(f"Received file: {user_image.filename}\n\n\n\n\n")  # Debugging line
            
            
            
            user_image.save(f'static/uploads/input.png')
            board = nameAllTiles(user_viewing_side, f"static/uploads/input.png")
            print(board)
            letterBoard = returnAllTiles(board)
            
            return jsonify({
                'letters': letterBoard
            })
@app.route("/api/fen", methods=['GET', 'POST'])  
def getFEN():
    global fen  # Declare global
    fen = convert_to_FEN(board, user_turn_color)
    fenOutput = f"FEN: {fen}"
    return jsonify({"fen": fenOutput})
@app.route("/api/move", methods=['GET', 'POST'])  
def getMove():
    move = FENtoMove(fen)
    moveOutput = f"The best move is: {move}"
    return jsonify({"move": moveOutput})
if __name__ == '__main__':
    app.run(debug=True)