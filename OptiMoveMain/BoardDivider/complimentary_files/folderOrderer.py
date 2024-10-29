# TODO: Order all pieces and also make them all into the same file type, what ever works for the CNNimport os
import os
from PIL import Image

# Path to the trainingtest folder
folder_path = r'C:\Users\abdul\All\OptiMove2\BoardDivider\data_set\trainingtest'

# List all piece folder within the trainingtest folder
piecesFolders = [subdir for subdir in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, subdir))]

for pieceFolder in piecesFolders:
    pieceNumber = 0
    print(f"Current piece: {pieceFolder}")
    
    complete_pieceFolderPath = os.path.join(folder_path, pieceFolder)

    chessPieces = os.listdir(complete_pieceFolderPath)

    for piece in chessPieces:
        # Load the image using Pillow
        image_path = os.path.join(complete_pieceFolderPath, piece)
        
        # Check if the image is already in PNG format
        if piece.lower().endswith('.png'):
            new_image_path = os.path.join(complete_pieceFolderPath, f"{pieceNumber}.png")
            os.rename(image_path, new_image_path)
        else:
            image = Image.open(image_path)
            
            # Convert the image to PNG format and rename it
            new_image_path = os.path.join(complete_pieceFolderPath, f"{pieceNumber}.png")
            image.save(new_image_path, "PNG")
            
            # Remove the original image file
            os.remove(image_path)
        
        # Increment piece number
        pieceNumber += 1

        print(f"    Converted {piece} to {pieceNumber}.png")

print("Conversion and renaming completed successfully.")
