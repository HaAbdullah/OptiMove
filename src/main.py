import time
import json
from flask import Flask, jsonify
from flask_cors import CORS

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import pyperclip

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/get-move')
def get_move():
    toMove = "white"

    def image_to_fen():
        driver = webdriver.Chrome()
        driver.get("https://helpman.komtera.lt/chessocr/")
        image_path = "C:/Users/abdul/All/Chess/ChessBoard.png"

        # Find the file upload element and upload the picture
        file_upload_element = driver.find_element(By.CLASS_NAME, 'drop-zone__input')
        file_upload_element.send_keys(image_path)
        time.sleep(3.4)

        # Get FEN
        fen_element = driver.find_element(By.ID, 'copy-fen-button')
        actions = ActionChains(driver)
        actions.double_click(fen_element)
        actions.perform()
        FEN = pyperclip.paste()
        driver.quit()

        return FEN

    FEN = image_to_fen()

    def FEN_to_move(FEN):
        driver = webdriver.Chrome()
        driver.get("https://chesssuggest.com/")
        
        button = driver.find_element(By.XPATH, "//button[@onclick=\"jQuery('#FEN').css('display', 'flex');\"]")
        actions = ActionChains(driver)
        actions.double_click(button)
        actions.perform()

        enterFEN = driver.find_element(By.ID, 'fenInput').send_keys(FEN)

        Enter_Button = driver.find_element(By.ID, 'enterFen')
        actions = ActionChains(driver)
        actions.click(Enter_Button)
        actions.perform()

        if toMove == "white":
            white_Button = driver.find_element(By.ID, 'wMove')
            actions = ActionChains(driver)
            actions.click(white_Button)
            actions.perform()
        elif toMove == "black":
            black_button = driver.find_element(By.ID, 'bMove')
            actions = ActionChains(driver)
            actions.click(black_button)
            actions.perform()
        time.sleep(1)

        move_box = driver.find_element(By.ID, 'answer')
        move = move_box.text
        print(move)

        driver.quit()

        return move

    move = FEN_to_move(FEN)

    # Save move to a JSON file
    move_data = {'move': move}
    with open('move.json', 'w') as file:
        json.dump(move_data, file)

    return jsonify(move=move)

if __name__ == '__main__':
    app.run()
