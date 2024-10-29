import numpy as np
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Suppress INFO and WARNING messages
import tensorflow as tf


def imageClassifier(image_path):
    
    # LOAD IMAGE
    img = tf.keras.utils.load_img(
        image_path, target_size=(180, 180)
    )
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch

    # print(interpreter.get_signature_list()) # Print signature list 

    # SET UP MODEL
    TF_MODEL_FILE_PATH = 'Model/model.tflite' # The default path to the saved TensorFlow Lite model
    interpreter = tf.lite.Interpreter(model_path=TF_MODEL_FILE_PATH)
    classify_lite = interpreter.get_signature_runner('serving_default')
    predictions_lite = classify_lite(sequential_1_input=img_array)['outputs']
    score_lite = tf.nn.softmax(predictions_lite)
    
    # Alternative methods of displaying pieces0
    #class_names = ['black_bishop', 'black_king', 'black_knight', 'black_pawn', 'black_queen', 'black_rook', 'white_bishop', 'white_king', 'white_knight', 'white_pawn', 'white_queen', 'white_rook']
    #class_names = ['Bb', 'Bk', 'Bn', 'Bp', 'Bq', 'Br', 'Wb', 'Wk', 'Wn', 'Wp', 'Wq', 'Wr']
    class_names = ['b ', 'k ', 'n ', 'p ', 'q ', 'r ', 'B ', 'K ', 'N ', 'P ', 'Q ', 'R ']
    #class_names = ['Black Bishop', 'Black King', 'Black Knight', 'Black Pawn', 'Black Queen', 'Black Rook', 'White Bishop', 'White King', 'White Knight', 'White Pawn', 'White Queen', 'White Rook']
    # RETURN RESULT (class, confidence)
    return class_names[np.argmax(score_lite)], 100 * np.max(score_lite)


#piece, confidence = imageClassifier("image.png")
#confidence = "{:.2f}".format(confidence) #make it 2 decimal places

#print(f"This image is most likely a {piece} with a {confidence}% confidence.")