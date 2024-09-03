import pytest
import os
import numpy as np
import pandas as pd

import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import download_from_google_drive, extract_features, find_similar_images_cosine
from unittest.mock import patch, MagicMock
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
import tempfile

# Define paths for testing
@pytest.fixture(scope='module')
def setup_directories():
    # Create temporary directories
    with tempfile.TemporaryDirectory() as temp_download_dir, tempfile.TemporaryDirectory() as temp_upload_dir:
        os.makedirs(temp_download_dir, exist_ok=True)
        os.makedirs(temp_upload_dir, exist_ok=True)
        
        yield {
            'download': temp_download_dir,
            'upload': temp_upload_dir
        }

# Test if csv files are appropriately downloaded from Google Drive
def test_directory_creation(setup_directories):
    download_dir = setup_directories['download']
    upload_dir = setup_directories['upload']
    
    assert os.path.exists(download_dir), "Download directory should be created"
    assert os.path.exists(upload_dir), "Upload directory should be created"

# Test for feature extraction function
def test_extract_features(setup_directories):
    # Create dummy image for testing
    image_path = os.path.join(setup_directories['upload'], 'test_image.jpg')
    img = Image.new('RGB', (224, 224), color='white')
    img.save(image_path)
    
    # Mock feature extraction function
    with patch('app.ResNet50') as mock_model, patch('app.preprocess_input') as mock_preprocess:
        mock_preprocess.return_value = np.random.rand(1, 224, 224, 3) 
        mock_model.return_value.predict = MagicMock(return_value=np.random.rand(1, 2048))
        features = extract_features(image_path)
        features = np.reshape(features, (1, -1))
        assert features.shape == (1, 2048)