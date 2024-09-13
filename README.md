# Clothing Recommender

<img src="https://github.com/khmorad/csvStore/blob/main/clothingIcon.png" alt="Clothing Store Logo" width="400"/>

## Demo

https://www.youtube.com/watch?v=P2Y8-JbCPIk

## Introduction

Welcome to the Clothing Recommender project! This web application recommends clothing items similar to users' favorite clothes by analyzing user-uploaded images. The recommendations are based on feature extraction using the pre-trained CNN model, ResNet50.

## Project Overview

The Clothing Recommender is designed to help users discover clothing items that are similar to their favorite clothing items. We utilized a dataset of over 10,000 clothing items from Kaggle (VITON HD) and processed them using the ResNet50 model to extract features. These features are embedded in a vector space, and user-uploaded images are similarly processed to obtain the top 10 similar clothing items.

## Features

- **Image Upload**: Upload images of your favorite clothing items.
- **Clothing Recommendation**: Get recommendations for similar clothing items based on image analysis.
- **Interactive UI**: User-friendly interface built with React.

## Image Storage and Dataset Requirements

Currently, images for this project are stored in Google Cloud Services. 
The images used for this project can be found below. In the provided embeddings.csv and uploaded_images csv, the train/cloth images were used. 

- **[High-Resolution VITON Zalando Dataset](https://www.kaggle.com/datasets/marquis03/high-resolution-viton-zalando-dataset)**

**Obtain Vector Embeddings (Optional):**
   **[Generate Embeddings with Google Colab](https://colab.research.google.com/drive/1NaUW0ZwhezbDh7SIIM5MiTNEw7H-qNpB?usp=sharing)**

   - If you are working with different images, generate the `embeddings.csv` file using our provided Colab notebook.
   - Upload the `embeddings.csv` to Google Drive and obtain the file ID.
   - In back/app.py replace the existing file ID with the new ID:

     ```python
     EMBEDDINGS_FILE_ID = '<file ID>'
     ```
     Feel free to make a copy of the notebooks for your own use, and don’t hesitate to contact me at shizukat@uci.edu if you encounter any issues or have questions.

## Installation

### Prerequisites

- Python 3.7+
- Node.js
- Flask
- React

### Clone the Repository

```bash
git clone https://github.com/khmorad/clothingRecommendationApp.git
cd clothingRecommendationApp
```

### Backend Setup

1. Create a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

2. Install the required Python packages:

```bash
pip install -r requirements.txt
```

3. Run the Flask server:

```bash
flask run
```

### Frontend Setup

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install the required Node.js packages:

```bash
npm install
```

3. Run the React development server:

```bash
npm start
```

## Usage

1. Start the Flask backend server.
2. Start the React frontend development server.
3. Open your web browser and go to `http://localhost:3000`.
4. Upload an image of a clothing item to receive recommendations.

## Technology Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Flask, Python
- **Machine Learning**: TensorFlow, ResNet50

## Team Members

- **Yar Moradpour**
- **Shizuka Takao**

## Known Limitations

- **Image Recognition Constraints**: The app only accurately recognizes images where the clothing item is shown from the front in a straight manner. Sideways or angled images may lead to inaccurate results.
- **Female Clothing Only**: Currently, the app is designed to recognize and recommend only female clothing items.
- **Limited to Tops**: The application is limited to identifying and recommending tops only. It does not support pants, dresses, or accessories.

## License

This project is licensed under the MIT License.
