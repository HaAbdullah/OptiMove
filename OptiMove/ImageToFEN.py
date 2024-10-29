import cv2
import os
import numpy as np
from BoardDivider.splitter import splitter
from Model.imageClassifier import imageClassifier

boards = {
    "BLACK": {
        'h1': 'W ', 'g1': 'B ', 'f1': 'W ', 'e1': 'B ', 'd1': 'W ', 'c1': 'B ', 'b1': 'W ', 'a1': 'B ',
        'h2': 'B ', 'g2': 'W ', 'f2': 'B ', 'e2': 'W ', 'd2': 'B ', 'c2': 'W ', 'b2': 'B ', 'a2': 'W ',
        'h3': 'W ', 'g3': 'B ', 'f3': 'W ', 'e3': 'B ', 'd3': 'W ', 'c3': 'B ', 'b3': 'W ', 'a3': 'B ',
        'h4': 'B ', 'g4': 'W ', 'f4': 'B ', 'e4': 'W ', 'd4': 'B ', 'c4': 'W ', 'b4': 'B ', 'a4': 'W ',
        'h5': 'W ', 'g5': 'B ', 'f5': 'W ', 'e5': 'B ', 'd5': 'W ', 'c5': 'B ', 'b5': 'W ', 'a5': 'B ',
        'h6': 'B ', 'g6': 'W ', 'f6': 'B ', 'e6': 'W ', 'd6': 'B ', 'c6': 'W ', 'b6': 'B ', 'a6': 'W ',
        'h7': 'W ', 'g7': 'B ', 'f7': 'W ', 'e7': 'B ', 'd7': 'W ', 'c7': 'B ', 'b7': 'W ', 'a7': 'B ',
        'h8': 'B ', 'g8': 'W ', 'f8': 'B ', 'e8': 'W ', 'd8': 'B ', 'c8': 'W ', 'b8': 'B ', 'a8': 'W '
    },
    "WHITE": {
        'a8': 'W ', 'b8': 'B ', 'c8': 'W ', 'd8': 'B ', 'e8': 'W ', 'f8': 'B ', 'g8': 'W ', 'h8': 'B ',
        'a7': 'B ', 'b7': 'W ', 'c7': 'B ', 'd7': 'W ', 'e7': 'B ', 'f7': 'W ', 'g7': 'B ', 'h7': 'W ',
        'a6': 'W ', 'b6': 'B ', 'c6': 'W ', 'd6': 'B ', 'e6': 'W ', 'f6': 'B ', 'g6': 'W ', 'h6': 'B ',
        'a5': 'B ', 'b5': 'W ', 'c5': 'B ', 'd5': 'W ', 'e5': 'B ', 'f5': 'W ', 'g5': 'B ', 'h5': 'W ',
        'a4': 'W ', 'b4': 'B ', 'c4': 'W ', 'd4': 'B ', 'e4': 'W ', 'f4': 'B ', 'g4': 'W ', 'h4': 'B ',
        'a3': 'B ', 'b3': 'W ', 'c3': 'B ', 'd3': 'W ', 'e3': 'B ', 'f3': 'W ', 'g3': 'B ', 'h3': 'W ',
        'a2': 'W ', 'b2': 'B ', 'c2': 'W ', 'd2': 'B ', 'e2': 'W ', 'f2': 'B ', 'g2': 'W ', 'h2': 'B ',
        'a1': 'B ', 'b1': 'W ', 'c1': 'B ', 'd1': 'W ', 'e1': 'B ', 'f1': 'W ', 'g1': 'B ', 'h1': 'W '
    }
}

def isEmptyTile(imageLocation):
    image = cv2.imread(imageLocation)

    height, width = image.shape[:2]
    # Calculate the size of the square as 50% of the minimum dimension
    size = min(height, width) // 2

    # Calculate the coordinates of the square
    x1 = (width - size) // 2
    y1 = (height - size) // 2
    x2 = x1 + size
    y2 = y1 + size

    # Crop the image to the defined square
    cropped_image = image[y1:y2, x1:x2]
    gray = cv2.cvtColor(cropped_image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, threshold1=30, threshold2=100)

    white_pixel_found = False

    # Iterate over each pixel in the edge-detected image, break both loops if a white pixel is found
    for row in edges:
        for pixel in row:
            if pixel == 255:  # White pixel
                white_pixel_found = True
                break  
        if white_pixel_found:
            break  
    return white_pixel_found

def nameAllTiles(viewing_side, image_path):
    """
    Classify and print the names of all tiles in the chessboard.

    Parameters:
        viewing_side (str): The viewing side of the chessboard. 
            Specify "WHITE" if viewing from the white side (a-h from left to right, 8-1 from top to bottom).
            Specify "BLACK" if viewing from the black side (h-a from left to right, 1-8 from top to bottom).

    Returns:
        dict: A dictionary representation of the chessboard with piece positions.
    """
    
    viewing_side = viewing_side.upper()
    viewing_board = boards[viewing_side]
    # Call the splitter function
    current_directory = os.path.dirname(__file__)
    # print("Looking for image at " + current_directory + "/" +image_path)
    # Join the current directory with the filename to get the full path
    image_path = os.path.join(current_directory, image_path)
    splitter(image_path, viewing_side)

    # Iterate over output_tiles directory and classify each image
    output_tiles_dir = os.path.join("BoardDivider", "output_tiles")
    for file in os.listdir(output_tiles_dir):
        if file.endswith(".png"):
            image_path = os.path.join(output_tiles_dir, file)
            piece, confidence = imageClassifier(image_path)
            confidence = "{:.2f}".format(confidence)  # make it 2 decimal places
            
            if isEmptyTile(image_path):
                parts = file.split('-')
                column = parts[0]
                row = int(parts[1].split('.')[0])   
                viewing_board[column + str(row)] = piece
                #print(column + " " + str(row) + ": " + piece + " has piece: " + str(isEmptyTile(image_path)))
            
    return viewing_board

def convert_to_FEN(viewing_board, active_color):
    # piece_mapping = {
    #     'Wr': 'R', 'Wn': 'N', 'Wb': 'B', 'Wq': 'Q', 'Wk': 'K', 'Wp': 'P',
    #     'Br': 'r', 'Bn': 'n', 'Bb': 'b', 'Bq': 'q', 'Bk': 'k', 'Bp': 'p',
    #     'W': '1', 'B': '1'
    # }
    # print(viewing_board) #DEBUGGNG
    
    piece_mapping = {
    'R': 'R', 'N': 'N', 'B': 'B', 'Q': 'Q', 'K': 'K', 'P': 'P',
    'r': 'r', 'n': 'n', 'b': 'b', 'q': 'q', 'k': 'k', 'p': 'p',
    'W': '1', 'B': '1'
    }
    # Create a 2D array for the board
    board_2d = [['']*8 for _ in range(8)]
    
    for key, value in viewing_board.items():
        column = ord(key[0]) - ord('a')
        row = 8 - int(key[1])
        board_2d[row][column] = value.strip()
    
    fen_rows = []
    for row in board_2d:
        fen_row = ''
        empty_count = 0
        for cell in row:
            if cell in piece_mapping:
                if piece_mapping[cell] == '1':
                    empty_count += 1
                else:
                    if empty_count > 0:
                        fen_row += str(empty_count)
                        empty_count = 0
                    fen_row += piece_mapping[cell]
            else:
                if empty_count > 0:
                    fen_row += str(empty_count)
                    empty_count = 0
                fen_row += cell
        if empty_count > 0:
            fen_row += str(empty_count)
        fen_rows.append(fen_row)
    
    fen = '/'.join(fen_rows)
    active_color = "w" if active_color == "white" else "b"
    # Add active color, no castling rights, no en passant target, no halfmove clock, and first move
    fen += f' {active_color} - - 0 1'
    
    return fen

def returnAllTiles(board):
    myTiles = []
    numOfTiles = 0
    for key in board:
        print(board[key], end=' ')
        myTiles.append(board[key])
        numOfTiles += 1
        if numOfTiles == 8:
            print()
            numOfTiles = 0
    return myTiles
    # Print array of all tiles
    # print("[", end='')
    # for key in board:
    #     print(" \" " + board[key].strip() + "\"" , end=',')
    # print("]")


