# OptiMove2
For a demo of the application with 3 inputs, visit: https://haabdullah.github.io/OptiMove/  
To try the full application with any image, please continue to the following steps:
## Quick Start

1. **Pull the Docker Image**: Begin by pulling the latest version of the OptiMove2 Docker image from Docker Hub:
   ```bash
   docker pull haabdullah/optimove2:latest
   ```
2. **Create a Directory for Images**: Create a local directory where you will place your chessboard images:
   ```bash
   mkdir chess-images
   ```
3. **Run the Docker Container**: Launch the Docker container, mounting the local images directory to the container:
   ```bash
   docker run -it -v ${PWD}/chess-images:/app/images optimove2
   ```
4. **Place an Image**: Add your chessboard images to the chess-images directory you created earlier.

5. **Access the Application**: Follow the terminal instructions within the Docker container to utilize the application and get chess move recommendations.

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

## Design Files
Figma file: https://www.figma.com/design/v556gxHBi8vJGHHk6tckTj/OptiMove?node-id=0-1&t=m4QAiG5vqnLVqGIq-1
