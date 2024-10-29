import cv2
import numpy as np


def cropper(path):
    """
    Crop the chessboard from the given image and save it to 'output_board/output.jpg'.

    Parameters:
        path (str): The path to the input image file.

    Returns:
        None

    Saves:
        The cropped chessboard image to the 'output_board' directory as 'output.jpg'.

    Note:
        This function applies image preprocessing techniques such as converting to grayscale, applying Gaussian blur,
        and adaptive thresholding to detect the chessboard borders.
        It then finds the contour with the maximum area (assuming it's the chessboard) and crops the image accordingly.
        The cropped image is resized to a perfect square with dimensions 512x512.
    """
    image = cv2.imread(path)
    
    if image is None:
        print("Error: Image not found or unable to load.")
    else:
        # Convert the image to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Apply Gaussian blur: basically blurs it a bit to help with edge detection 
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)

        # Apply adaptive thresholding: second line parameter is the line thickness of each border
        thresh = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 5, 2)

        # Find contours in the thresholded image (border lines)
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # Draw contours on image
        contour_image = np.copy(image)
        cv2.drawContours(contour_image, contours, -1, (0, 255, 0), 2)

        # Find the contour with maximum area (assuming it's the chessboard)
        max_contour = max(contours, key=cv2.contourArea)

        # Get the bounding rectangle of the contour
        x, y, w, h = cv2.boundingRect(max_contour)

        # Crop the image using the bounding rectangle
        cropped_image = image[y:y+h, x:x+w]
        
        # resize image to be perfect square
        cropped_image = cv2.resize(cropped_image, (512, 512))
        cv2.imwrite('Outputs/detected-chess-board.jpg', cropped_image)
        
        # # Display images at different steps
        # cv2.imshow('Grayscale Image', gray)
        # cv2.waitKey(0)
        # cv2.imshow('Blurred Image', blurred)
        # cv2.waitKey(0)
        # cv2.imshow('Thresholded Image', thresh)
        # cv2.waitKey(0)
        # cv2.imshow('Contours', contour_image)
        # cv2.waitKey(0)
        # cv2.imshow('Cropped Image', cropped_image)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
        
        print("cropping complete!")
        
        
        