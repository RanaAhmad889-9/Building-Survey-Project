# -*- coding: utf-8 -*-
"""Unet24dec.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/174l6VXqDjLd8PeYM0Jz7LARp57bkjo--
"""

from google.colab import drive
drive.mount('/content/drive')

# !pip install tensorflow
# !pip install matplotlib

import os
import numpy as np
import cv2
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# Define the base path where your folder "newpng1" is located
base_path = '/content/drive/MyDrive/newpng2/'  # Change this if the path is different
images_path = os.path.join(base_path, 'images')
masks_path = os.path.join(base_path, 'masks')

# Get the list of image files and mask folders
image_files = sorted(os.listdir(images_path))
mask_folders = sorted(os.listdir(masks_path))

# Function to load images and masks
def load_data(image_files, mask_folders, images_path, masks_path):
    images = []
    masks = []

    for img_file, mask_folder in zip(image_files, mask_folders):
        # Load the image
        img = load_img(os.path.join(images_path, img_file), target_size=(256, 256))
        img = img_to_array(img) / 255.0  # Normalize image
        images.append(img)

        # Prepare the mask for the corresponding image
        mask_folder_path = os.path.join(masks_path, mask_folder)
        mask = np.zeros((256, 256, 1))  # Initialize empty mask (assuming single-channel mask)

        # Combine all the individual masks for the buildings in the folder
        for mask_file in os.listdir(mask_folder_path):
            m = cv2.imread(os.path.join(mask_folder_path, mask_file), cv2.IMREAD_GRAYSCALE)
            m = cv2.resize(m, (256, 256))  # Resize the mask to match the image size
            mask = np.maximum(mask, np.expand_dims(m, axis=-1))  # Combine multiple masks into one

        masks.append(mask / 255.0)  # Normalize mask values to [0, 1]

    return np.array(images), np.array(masks)

# Load images and masks
images, masks = load_data(image_files, mask_folders, images_path, masks_path)

# Split the data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(images, masks, test_size=0.2, random_state=42)

import tensorflow as tf
from tensorflow.keras import layers, models

def build_unet(input_size=(256, 256, 3)):
    inputs = layers.Input(input_size)

    # Encoder
    c1 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(inputs)
    c1 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(c1)
    p1 = layers.MaxPooling2D((2, 2))(c1)

    c2 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(p1)
    c2 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(c2)
    p2 = layers.MaxPooling2D((2, 2))(c2)

    c3 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(p2)
    c3 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(c3)
    p3 = layers.MaxPooling2D((2, 2))(c3)

    c4 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(p3)
    c4 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(c4)
    p4 = layers.MaxPooling2D((2, 2))(c4)

    # Bottleneck
    c5 = layers.Conv2D(1024, (3, 3), activation='relu', padding='same')(p4)
    c5 = layers.Conv2D(1024, (3, 3), activation='relu', padding='same')(c5)

    # Decoder
    u6 = layers.Conv2DTranspose(512, (3, 3), strides=(2, 2), padding='same')(c5)
    u6 = layers.concatenate([u6, c4])
    c6 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(u6)
    c6 = layers.Conv2D(512, (3, 3), activation='relu', padding='same')(c6)

    u7 = layers.Conv2DTranspose(256, (3, 3), strides=(2, 2), padding='same')(c6)
    u7 = layers.concatenate([u7, c3])
    c7 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(u7)
    c7 = layers.Conv2D(256, (3, 3), activation='relu', padding='same')(c7)

    u8 = layers.Conv2DTranspose(128, (3, 3), strides=(2, 2), padding='same')(c7)
    u8 = layers.concatenate([u8, c2])
    c8 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(u8)
    c8 = layers.Conv2D(128, (3, 3), activation='relu', padding='same')(c8)

    u9 = layers.Conv2DTranspose(64, (3, 3), strides=(2, 2), padding='same')(c8)
    u9 = layers.concatenate([u9, c1])
    c9 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(u9)
    c9 = layers.Conv2D(64, (3, 3), activation='relu', padding='same')(c9)

    outputs = layers.Conv2D(1, (1, 1), activation='sigmoid')(c9)

    model = models.Model(inputs, outputs)

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    return model

# Build the model
model = build_unet()
model.summary()

history = model.fit(X_train, y_train, validation_data=(X_val, y_val), batch_size=1, epochs=40)

loss, accuracy = model.evaluate(X_val, y_val)
print(f"Validation Loss: {loss}")
print(f"Validation Accuracy: {accuracy}")

def visualize_prediction(image, mask, prediction):
    plt.figure(figsize=(12, 6))
    plt.subplot(1, 3, 1)
    plt.imshow(image)
    plt.title("Original Image")

    plt.subplot(1, 3, 2)
    plt.imshow(mask.squeeze(), cmap='gray')
    plt.title("Ground Truth Mask")

    plt.subplot(1, 3, 3)
    plt.imshow(prediction.squeeze(), cmap='gray')
    plt.title("Predicted Mask")

    plt.show()

# Make predictions on the validation set
predictions = model.predict(X_val)

# Visualize a sample
visualize_prediction(X_val[0], y_val[0], predictions[0])

def count_buildings(prediction):
    _, labels = cv2.connectedComponents((prediction > 0.5).astype(np.uint8))
    return len(np.unique(labels)) - 1  # Subtract 1 to ignore the background

# Count buildings in a sample prediction
building_count = count_buildings(predictions[0])
print(f"Number of buildings: {building_count}")

from google.colab import files
import numpy as np
import cv2
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import matplotlib.pyplot as plt

# Function to preprocess the input image
def preprocess_image(image_path, target_size=(256, 256)):
    """
    Preprocess the input image for prediction.
    Resizes the image and normalizes pixel values.
    """
    img = load_img(image_path, target_size=target_size)  # Load and resize the image
    img = img_to_array(img) / 255.0  # Normalize image to [0, 1]
    return np.expand_dims(img, axis=0)  # Add batch dimension

# Function to count buildings based on the model's prediction
def count_buildings_from_model(prediction, threshold=0.5):
    """
    Count buildings based on the predicted output by thresholding.
    """
    # Threshold the prediction to create a binary image (1 for building, 0 for background)
    binary_mask = (prediction > threshold).astype(np.uint8)

    # Use morphological operations to clean the image (remove noise, close gaps)
    kernel = np.ones((5, 5), np.uint8)  # Larger kernel for better closing of gaps
    binary_mask = cv2.morphologyEx(binary_mask, cv2.MORPH_CLOSE, kernel)

    # Find contours in the binary mask (connected components)
    num_labels, labels = cv2.connectedComponents(binary_mask)

    # The number of buildings corresponds to the number of distinct regions (excluding the background)
    return num_labels - 1  # Subtract 1 for the background label

# Allow the user to upload an image
print("Please upload a building image:")
uploaded = files.upload()  # Opens a file upload dialog in Colab

# Get the uploaded file's name
image_path = next(iter(uploaded.keys()))  # Get the file name from the uploaded files

# Preprocess the uploaded image for prediction
preprocessed_image = preprocess_image(image_path)

# Get the predicted output from the model
prediction = model.predict(preprocessed_image)[0]  # Remove batch dimension

# Count the number of buildings based on the predicted output
building_count = count_buildings_from_model(prediction)

# Display the original image and building count
original_img = load_img(image_path)
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.imshow(original_img)
plt.title("Original Image")
plt.axis("off")

# Visualize the predicted output as a mask (for understanding the model's perception)
plt.subplot(1, 2, 2)
plt.imshow(prediction.squeeze(), cmap="gray")  # For debugging and understanding how the model sees the image
plt.title(f"Buildings Count: {building_count}")
plt.axis("off")
plt.show()

# Print the building count
print(f"Number of buildings in the image: {building_count}")

from tensorflow.keras.callbacks import ModelCheckpoint

# Define the callback to save the model at the best epoch based on validation accuracy
checkpoint_callback = ModelCheckpoint(
    '/content/drive/MyDrive/best_model.keras',  # Path to save the best model with .keras extension
    monitor='val_loss',  # Monitor validation loss or accuracy
    save_best_only=True,  # Save only the best model
    save_weights_only=False,  # Save the full model (architecture + weights)
    verbose=1  # Show logs when saving
)

# Train the model and include the checkpoint callback
history = model.fit(X_train, y_train, validation_data=(X_val, y_val), batch_size=1, epochs=10, callbacks=[checkpoint_callback])

# After training, save the final model manually
# model.save('/content/drive/MyDrive/final_model.keras')  # Save the final model at the end of training
model.save("model.h5")

from tensorflow.keras.models import load_model

# Load the best model (if you saved with checkpoints)
best_model = load_model('/content/drive/MyDrive/best_model.keras')

# If you want to load the final model (after all epochs)
final_model = load_model('/content/drive/MyDrive/final_model.keras')