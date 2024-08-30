import os
import numpy as np
import pandas as pd
import gdown
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# File IDs from Google Drive
EMBEDDINGS_FILE_ID = '1c2qdQkoW_kQaneafXCORiFMfvaf28MIV'
IMAGE_URLS_FILE_ID = '1-Mqik7pGLYCft3ugUQagqDQ8cP1LboaZ'

# Directory to save downloaded files
DOWNLOAD_DIRECTORY = os.path.join(os.path.dirname(__file__), 'downloads')
if not os.path.exists(DOWNLOAD_DIRECTORY):
    os.makedirs(DOWNLOAD_DIRECTORY)
    logging.debug(f"Download directory created at {DOWNLOAD_DIRECTORY}")

# Download file from Google Drive
def download_from_google_drive(file_id, destination):
    url = f"https://drive.google.com/uc?id={file_id}"
    gdown.download(url, destination, quiet=False)

# Load the ResNet50 model
try:
    model = ResNet50(weights='imagenet', include_top=False, pooling='avg')
    logging.debug("ResNet50 model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading ResNet50 model: {str(e)}")

# Download and load the embeddings from Google Drive
try:
    embeddings_path = os.path.join(DOWNLOAD_DIRECTORY, 'embeddings.csv')
    download_from_google_drive(EMBEDDINGS_FILE_ID, embeddings_path)
    embeddings_df = pd.read_csv(embeddings_path, index_col=0)
    embeddings_array = embeddings_df.values
    image_names_embeddings = embeddings_df.index.tolist()
    logging.debug(f"Embeddings loaded successfully. Shape: {embeddings_array.shape}")
except Exception as e:
    logging.error(f"Error loading embeddings from CSV: {str(e)}")

# Download and load the CSV containing image names and URLs from Google Drive
try:
    image_url_path = os.path.join(DOWNLOAD_DIRECTORY, 'uploaded_images.csv')
    download_from_google_drive(IMAGE_URLS_FILE_ID, image_url_path)
    image_urls_df = pd.read_csv(image_url_path, index_col=0)
    image_urls_df.index = image_urls_df.index.str.replace('.jpg', '')
    logging.debug(f"Image URLs loaded successfully. Total images: {len(image_urls_df)}")
except Exception as e:
    logging.error(f"Error loading image URLs from CSV: {str(e)}")
    image_urls_df = pd.DataFrame() 

# Directory to save uploaded images
UPLOAD_DIRECTORY = os.path.join(os.path.dirname(__file__), 'uploads')
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)
    logging.debug(f"Upload directory created at {UPLOAD_DIRECTORY}")

# Extract features from an image
def extract_features(image_path):
    try:
        logging.debug(f"Extracting features from image: {image_path}")
        
        img = Image.open(image_path)
        logging.debug(f"Original image mode: {img.mode}")
        
        # Ensure image is in RGB format
        if img.mode != 'RGB':
            img = img.convert('RGB')
            logging.debug(f"Image converted to RGB mode: {img.mode}")
        
        img = img.resize((224, 224))
        img_array = image.img_to_array(img)
        logging.debug(f"Image array shape after conversion to array: {img_array.shape}")  

        # Check if the image is in grayscale despite the conversion, and expand the channels if needed
        if img_array.shape[-1] == 1:
            img_array = np.repeat(img_array, 3, axis=-1)
            logging.debug(f"Image array expanded to 3 channels: {img_array.shape}")

        img_array = np.expand_dims(img_array, axis=0)
        logging.debug(f"Image array shape after adding batch dimension: {img_array.shape}")  
        
        img_array = preprocess_input(img_array)
        features = model.predict(img_array)
        logging.debug(f"Features extracted: {features.shape}")
        return features.flatten()
    except Exception as e:
        logging.error(f"Error extracting features: {str(e)}")
        raise

# Find similar images using cosine similarity
def find_similar_images_cosine(user_image_features, dataset_embeddings):
    try:
        logging.debug(f"Finding similar images.")
        similarities = cosine_similarity(user_image_features, dataset_embeddings)
        similar_indices = np.argsort(similarities[0])[::-1]
        logging.debug(f"Similar images found. Indices: {similar_indices[:10]} similarity{similarities}")
        return similar_indices, similarities
    except Exception as e:
        logging.error(f"Error finding similar images: {str(e)}")
        raise

@app.route('/upload', methods=['POST'])
def upload_image():
    logging.debug("Received a POST request to /upload")
    if 'file' not in request.files:
        logging.error("No file part in the request.")
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        logging.error("No file selected.")
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_DIRECTORY, filename)
    logging.debug(f"Saving uploaded file to: {filepath}")
    file.save(filepath)

    try:
        user_image_features = extract_features(filepath).reshape(1, -1)
        logging.debug(f"User image features shape: {user_image_features.shape}")
        
        # Find similar images
        indices, similarities = find_similar_images_cosine(user_image_features, embeddings_array)

        top_n = 10
        similar_images = []
        for i in indices[:top_n]:
            image_name = image_names_embeddings[i]
            similarity = float(similarities[0][i])
            image_url = image_urls_df.loc[image_name]['image_url']
            similar_images.append({"image_name": image_name, "similarity": similarity, "image_url": image_url})

        logging.debug(f"Similar images: {similar_images}")
        return jsonify(similar_images)

    except Exception as e:
        logging.error(f"Error processing image: {str(e)}")
        return jsonify({'error': 'Error processing image'}), 500

@app.route('/assets/<path:filename>')
def serve_image(filename):
    try:
        assets_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'uploads'))
        logging.debug(f"Serving image from: {assets_path}/{filename}")
        return send_from_directory(assets_path, filename)
    except Exception as e:
        logging.error(f"Error serving image: {str(e)}")
        return jsonify({'error': 'Image not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
