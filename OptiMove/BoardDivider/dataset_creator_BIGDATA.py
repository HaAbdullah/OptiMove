import os
import pandas as pd
from PIL import Image

# Paths
annotation_file = r"C:\Users\abdul\All\OptiMove2\hugeDataSet\train\_annotations.csv"
images_dir = r'C:\Users\abdul\All\OptiMove2\hugeDataSet\train'
output_dir = r'C:\Users\abdul\All\OptiMove2\hugeDataSet\sorted_pieces'

# Create output directories for each class
classes = ['white_knight', 'white_rook', 'white_king', 'white_pawn', 'white_queen', 'white_rook', 'black_bishop', 'black_rook', 'board', 'black_king', 'black_knight', 'black_pawn', 'black_queen', 'white_bishop']  # Add more classes as needed
for chess_class in classes:
    os.makedirs(os.path.join(output_dir, chess_class), exist_ok=True)

# Read the annotations
annotations = pd.read_csv(annotation_file)

# Process each annotation
for index, row in annotations.iterrows():
    filename = row['filename']
    width, height = row['width'], row['height']
    chess_class = row['class']
    xmin, ymin, xmax, ymax = row['xmin'], row['ymin'], row['xmax'], row['ymax']
    
    image_path = os.path.join(images_dir, filename)
    if os.path.exists(image_path):
        # Open the image
        with Image.open(image_path) as img:
            # Crop the piece
            piece = img.crop((xmin, ymin, xmax, ymax))
            # Save the piece in the corresponding class folder
            piece_filename = f"{os.path.splitext(filename)[0]}_{index}.png"
            piece.save(os.path.join(output_dir, chess_class, piece_filename))
    else:
        print(f"Image {filename} not found in {images_dir}")

print("Extraction and sorting completed.")
