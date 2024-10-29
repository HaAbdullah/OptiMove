# ONE TIME USE PYTHON FILE

import cv2

img = cv2.imread('output_tiles/test.jpg')


for letter in range(97, 105, 1):
    for number in range(8, 0, -1):
        cv2.imwrite(f"output_tiles/{chr(letter)}-{number}.jpg", img)