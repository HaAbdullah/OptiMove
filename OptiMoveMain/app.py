
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import os
import json
from ImageToFEN import nameAllTiles, convert_to_FEN, returnAllTiles
from FENtoMove import FENtoMove


app = Flask(__name__)
CORS(app)
# these the user will provide:
user_image = ""
user_turn_color = ""
user_viewing_side = ""

# these will be given by my code:
fen = ""
fenOutput = ""
moveOutput = ""
board={}
letterBoard = "" 
errMessage = None
#app data 



@app.route("/api/saveImage", methods=['POST'])   
def uploadImage():
    print("Received a request at /api/saveImage")
    global user_image
    if request.method=="POST":
        user_image = request.files['usrImg']
        print(f"Received file: {user_image.filename}\n\n\n\n\n")  # Debugging line
        user_image.save(f'OptiMoveWeb/src/img/input.png')
        user_image.save(f"static/uploads/input.png")
        return jsonify({
            'message': "Image Uploaded Successfully"}
                )
    



@app.route("/api/tiles", methods=['GET', 'POST'])   
def getTiles():
    global board, user_turn_color, letterBoard  
    
    if request.method == "POST":
            user_viewing_side = request.form['usrPOV']
            image_path = f'OptiMoveWeb/src/img/input.png'

            # Check if the image exists at the specified location
            if os.path.exists(image_path):
                board = nameAllTiles(user_viewing_side, image_path)
                letterBoard = returnAllTiles(board)
                print(letterBoard)
                return jsonify({
                    'letters': letterBoard
                })
            else:
                return jsonify({'error': 'Image not found or unable to load!.'}), 404
            
            

@app.route("/api/fen", methods=['GET', 'POST'])  
def getFEN():
    global fen  # Declare global: never make this mistake again
    user_turn_color = request.form['usrTurn']
    fen = convert_to_FEN(board, user_turn_color)
    return jsonify({"fen": fen})


@app.route("/api/move", methods=['GET'])  
def getMove():
    move = FENtoMove(fen)
    return jsonify({"move": move})


if __name__ == '__main__':
    app.run(debug=True)