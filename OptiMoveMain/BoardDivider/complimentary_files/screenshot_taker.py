# TODO: RUN THIS PROGRAM FOR OPTIMOVE2, OR JUST PRESS RUN BUTTON (2nd is a safer choice)

import pyautogui

# Define the coordinates and dimensions for each chess piece
piece_coordinates = {
    'black_queen': (672, 313, 93, 93),
    'white_queen': (674, 764, 93, 93),
    'black_king': (762, 314, 93, 93),
    'white_king': (763, 763, 93, 93)
}

# Load the current screenshot number
with open('BoardDivider/complimentary_files/currentSSnumber.txt', 'r') as file:
    current_number = int(file.read())
 
# Take screenshots of each chess piece and save them
for piece_name, (left, top, width, height) in piece_coordinates.items():
    screenshot = pyautogui.screenshot(region=(left, top, width, height))
    folder_path = f"BoardDivider/data_set/training/{piece_name}"
    screenshot.save(f'{folder_path}/{current_number}.png')
    print(f'Screenshot of {piece_name} saved as {current_number}.png')

# Increment the counter and save it back to the file
current_number += 1
with open('BoardDivider/complimentary_files/currentSSnumber.txt', 'w') as file:
    file.write(str(current_number))
