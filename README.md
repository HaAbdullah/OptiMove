﻿# OptiMove2
For a demo of the application with 3 inputs, visit: https://haabdullah.github.io/OptiMove/  
To try the full application with any image, please continue to the following steps:
## Quick Start

[Docker container installation link coming soon]

### Start without Docker

1. **Download the repository** to your local machine. You can do this by clicking on the green "Code" button and selecting "Download ZIP" or using `git clone` in your terminal:
   ```bash
   git clone https://github.com/HaAbdullah/OptiMove
   ```
2. Navigate to the repository directory in your terminal and change directory to subfolder:
  ```bash
  cd OptiMove2
  ```
3. Install the required packages:
  ```bash
  pip install --no-cache-dir -r requirements.txt
  ```
4. Place an image containing a chess board in the current directory.

5. Run the program:
  ```bash
  python main.py
  ```

### What is OptiMove?

**OptiMove** is an innovative chess move recommendation system that harnesses the power of computer vision and machine learning to enhance your chess-playing experience. This application detects chessboards in images, extracts them from their backgrounds, and accurately identifies the chess pieces and their positions.

## Key Features:
- **Chessboard Detection**: Utilizes advanced computer vision techniques to recognize chessboards in various images.
- **Piece Identification**: Employs a Convolutional Neural Network (CNN) built with TensorFlow to achieve 92% accuracy in identifying chess pieces.
- **FEN Generation**: Automatically generates Forsyth-Edwards Notation (FEN) for the detected chess position.
- **Move Calculation**: Calculates the best possible move based on the current board position.

## Technologies Used:
- **Backend**: Python with OpenCV, NumPy, Flask, and Pandas
- **Frontend**: HTML/CSS and React
- **Machine Learning**: TensorFlow, Jupyter, and Pillow

