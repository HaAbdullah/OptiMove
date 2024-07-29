from ImageToFEN import nameAllTiles, convert_to_FEN, printAllTiles
from FENtoMove import FENtoMove
import os

# Ask the user for viewing side and active color
user_input_side = "WHITE"
user_input_color = "w"  # or "b" for black's turn

board = nameAllTiles(user_input_side, r"Inputs/input1.png")
printAllTiles(board)
fen = convert_to_FEN(board, user_input_color)
move = FENtoMove(fen)

print(f"FEN: {fen}")
print("The best move is: " + move)

