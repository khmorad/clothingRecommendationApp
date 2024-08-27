
# Clothing Recommender

Welcome to the Clothing Recommender project! This web application recommends clothing items similar to users' favorite clothes by analyzing user-uploaded images. The recommendations are based on feature extraction using the pre-trained CNN model, ResNet50.

## Project Overview

The Clothing Recommender is designed to help users discover clothing items that are similar to their favorite pieces. We utilized a dataset of over 10,000 clothing items from Kaggle (VITON HD) and processed them using the ResNet50 model to extract features. These features are embedded in a vector space, and user-uploaded images are similarly processed to obtain the top 10 similar clothing items.

## Features

- **Image Upload**: Upload images of your favorite clothing items.
- **Clothing Recommendation**: Get recommendations for similar clothing items based on image analysis.
- **Interactive UI**: User-friendly interface built with React.

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
- **APIs**: OpenAI API (optional for extended features)

## Team Members

- **Yar Moradpour**
- **Shizuka Takao**

## License

This project is licensed under the MIT License.
