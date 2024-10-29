# FIXME ENSURE YOU ARE ON BoardDivider Directory

import cropper
import cv2
import os

# Holds how many of each piece has been counted thus far
pieces = {
    "white_pawn": 0,
    "white_rook": 0,
    "white_knight": 0,
    "white_bishop": 0,
    "white_king": 0,
    "white_queen": 0,
    "black_pawn": 0,
    "black_rook": 0,
    "black_knight": 0,
    "black_bishop": 0,
    "black_king": 0,
    "black_queen": 0,
    "white_tiles": 0,
    "black_tiles": 0,
}

def organize_image_into_folders(path):
    
    cropper.cropper(path)
    img = cv2.imread('output_board/output.jpg')
    # shape = (width, height, channel)
    width = img.shape[0]
    height = img.shape[1]
    block_width = int(width/8)
    block_height = int(height/8)

    starting_letter = 97
    starting_number = 8
    
    ending_letter = 105
    ending_number = 0
    iteration = -1
    
    # iterate 8,8 array and split image into tiles from top left -> top right and then move on to next line
    # Counter for tile in y direction
    yCounter = 0
    for number in range(starting_number, ending_number, iteration):
        # Counter for current tile in x direction 
        xCounter = 0
        
        for letter in range(starting_letter, ending_letter, -iteration):
            # [y:y+h, x:x+w]
            cropped_image = img[block_height * yCounter:block_height + block_height * yCounter, block_width * xCounter:block_width+block_width * xCounter]
            
            xCounter += 1
            
            if number == 1:
                if letter == 97 or letter == 104:  # White Rook position
                    pieces["white_rook"] += 1
                    cv2.imwrite(f"data_set/training/white_rook/{pieces['white_rook']}.png", cropped_image)
                elif letter == 98 or letter == 103:  # White Knight position
                    pieces["white_knight"] += 1
                    cv2.imwrite(f"data_set/training/white_knight/{pieces['white_knight']}.png", cropped_image)
                elif letter == 99 or letter == 102:  # White Bishop position
                    pieces["white_bishop"] += 1
                    cv2.imwrite(f"data_set/training/white_bishop/{pieces['white_bishop']}.png", cropped_image)
                elif letter == 100:  # White Queen position
                    pieces["white_queen"] += 1
                    cv2.imwrite(f"data_set/training/white_queen/{pieces['white_queen']}.png", cropped_image)
                elif letter == 101:  # White King position
                    pieces["white_king"] += 1
                    cv2.imwrite(f"data_set/training/white_king/{pieces['white_king']}.png", cropped_image)
            elif number == 8 :
                if letter == 97 or letter == 104:  # Black Rook position
                    pieces["black_rook"] += 1
                    cv2.imwrite(f"data_set/training/black_rook/{pieces['black_rook']}.png", cropped_image)
                elif letter == 98 or letter == 103:  # Black Knight position
                    pieces["black_knight"] += 1
                    cv2.imwrite(f"data_set/training/black_knight/{pieces['black_knight']}.png", cropped_image)
                elif letter == 99 or letter == 102:  # Black Bishop position
                    pieces["black_bishop"] += 1
                    cv2.imwrite(f"data_set/training/black_bishop/{pieces['black_bishop']}.png", cropped_image)
                elif letter == 100:  # Black Queen position
                    pieces["black_queen"] += 1
                    cv2.imwrite(f"data_set/training/black_queen/{pieces['black_queen']}.png", cropped_image)
                elif letter == 101:  # Black King position
                    pieces["black_king"] += 1
                    cv2.imwrite(f"data_set/training/black_king/{pieces['black_king']}.png", cropped_image)
            elif number == 2 and (letter == 97 or letter == 98): # White Pawn position
                pieces["white_pawn"] += 1
                cv2.imwrite(f"data_set/training/white_pawn/{pieces['white_pawn']}.png", cropped_image)
            elif number == 7 and (letter == 97 or letter == 98): # Black Pawn position
                pieces["black_pawn"] += 1
                cv2.imwrite(f"data_set/training/black_pawn/{pieces['black_pawn']}.png", cropped_image)
            elif (3 <= number <= 4) and (letter == 97 or letter == 98) :  # Empty tiles
                if (number + letter) % 2 == 0:  # Even sum for white tiles
                    pieces["black_tiles"] += 1
                    cv2.imwrite(f"data_set/training/black_tiles/{pieces['black_tiles']}.png", cropped_image)
                else:  # Odd sum for black tiles
                    pieces["white_tiles"] += 1
                    cv2.imwrite(f"data_set/training/white_tiles/{pieces['white_tiles']}.png", cropped_image)
        yCounter += 1
        
        
        
def organize_folder_of_images(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(".png") or filename.endswith(".jpg"):
            image_path = os.path.join(folder_path, filename)
            organize_image_into_folders(image_path)
        else:
            continue

organize_folder_of_images("training_images")