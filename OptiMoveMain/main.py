
from flask import Flask, request, render_template, url_for
from ImageToFEN import nameAllTiles, convert_to_FEN, returnAllTiles
from FENtoMove import FENtoMove
import os

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def main():
    # these the user will provide:
    user_image = ""
    user_turn_color = ""
    user_viewing_side = ""
    # these will be given by my code:
    fenOutput = ""
    moveOutput = ""
    letterBoard = ""
    errMessage = None
    
    if request.method=="POST":
        user_viewing_side = request.form['usrPOV']
        user_turn_color = request.form['usrTurn']
        user_image = request.files['usrImg']

        if user_image:
            
            print(f"Received file: {user_image.filename}\n\n\n\n\n")  # Debugging line
            
            
            
            user_image.save(f'static/uploads/input.png')
            board = nameAllTiles(user_viewing_side, f"static/uploads/input.png")
            letterBoard = returnAllTiles(board)
            fen = convert_to_FEN(board, user_turn_color)
            move = FENtoMove(fen)
            # print(f"FEN: {fen}")
            # print("The best move is: " + move)
            fenOutput = f"FEN: {fen}"
            moveOutput = f"The best move is: {move}"
            print(fen, move)
            return render_template('input.html', fen=fenOutput, move=moveOutput, errMessage=errMessage, letterBoard=letterBoard )
        
        
        
    

# board = nameAllTiles(user_viewing_side, r"img/input3.png")
# printAllTiles(board)
# fen = convert_to_FEN(board, user_turn_color)
# move = FENtoMove(fen)

# print(f"FEN: {fen}")
# print("The best move is: " + move)

if __name__ == '__main__':
    app.run(debug=True)