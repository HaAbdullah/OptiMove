# OptiMove - Chess Move Suggestion Web Application

OptiMove is a web application that utilizes Optical Character Recognition (OCR) and web scraping technologies to analyze a chessboard image and provide a recommended move for the given chess position. The application is built using React for the frontend and Flask for the backend.

Live Demo: https://haabdullah.github.io/OptiMove/

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

OptiMove is a web-based tool designed to assist chess players in analyzing chessboard positions and receiving AI-generated recommendations for their next moves. The application combines computer vision (OCR) and web scraping techniques to interpret the chessboard from an uploaded image. The system then sends the position to a chess engine hosted on a remote server, which suggests the best move based on the given chess position.

## Technologies Used

The application is built using the following technologies:

- **Frontend**: React - A JavaScript library for building user interfaces, providing a dynamic and interactive user experience.

- **Backend**: Flask - A lightweight Python web framework used to create the server-side application.

- **Computer Vision**: Selenium - A powerful web automation tool used for interacting with web elements, enabling image uploading and web scraping.

- **Image Processing**: pyperclip - A Python module used to access the clipboard to extract chessboard positions from the web application.

- **Data Transfer**: Axios - A popular JavaScript library used for making asynchronous HTTP requests, used to communicate with the backend server.

## Features

1. **Upload Chessboard Image**: Users can upload a chessboard image representing the current chess position.

2. **Select Playing Color**: Users can specify if they are playing as "WHITE" or "BLACK" by clicking the corresponding buttons.

3. **Get Move Recommendation**: By clicking the "Show Move" button, the application processes the uploaded image, sends the data to the backend, and retrieves the AI-generated move recommendation.

4. **Display Move Recommendation**: The recommended move is displayed on the user interface, providing the best move based on the given chess position.

## Installation

To run the OptiMove application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/opti-move.git`
2. Navigate to the project directory: `cd opti-move`
3. Install frontend dependencies: `npm install`
4. Install backend dependencies: `pip install -r requirements.txt`
5. Start the React frontend server: `npm start`
6. Start the Flask backend server: `python main.py`

The application will be accessible at `http://localhost:3000/`.

## Usage

1. **Upload Chessboard Image**: Click on the "Choose File" button to select a chessboard image from your computer or device.

2. **Select Playing Color**: Click on either the "WHITE" or "BLACK" button to specify your playing color.

3. **Get Move Recommendation**: Click on the "Show Move" button to receive the AI-generated move recommendation.

4. **View Move Recommendation**: The recommended move will be displayed in the "Move" section of the application.

## Contributing

Contributions are welcome and encouraged! If you find a bug, have an idea for an enhancement, or want to contribute in any way, please feel free to submit a pull request.

## License

Open Source License - Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)

This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0). You are free to share and redistribute this project under the following conditions:

- Attribution: You must give appropriate credit, provide a link to the license, and indicate if changes were made. You must attribute the work to Abdullah Hasanjee.
- Non-Commercial: You may not use this work for commercial purposes.
- Derivatives: You may remix, transform, or build upon this work with proper attribution of original work.

For more details about the license, visit: https://creativecommons.org/licenses/by-nc-nd/4.0/


## Contact

For any inquiries or suggestions, please contact me at:

- Email: abdullah.hasanjee@gmail.com
- Website: [WebPortfolio](https://haabdullah.github.io/WebPortfolio/)
