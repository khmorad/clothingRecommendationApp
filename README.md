# Clothing Recommender

<img src="https://media.discordapp.net/attachments/1071334736787673188/1277778362319765544/DALLE_2024-08-26_16.54.14_-_A_logo_for_a_clothing_store_without_any_text_featuring_a_magnifying_glass_hovering_over_a_piece_of_womens_clothing._The_clothing_should_be_stylish_a.webp?ex=66d06195&is=66cf1015&hm=1df9c991b0c1436ab7ade847b94da952e25fad48b985a53c01cc70cbaac30a43&=&format=webp&width=993&height=993" alt="Clothing Store Logo" width="400"/>

## Demo

https://www.youtube.com/watch?v=q_1arGksb4A

## Introduction

Welcome to the Clothing Recommender project! This web application recommends clothing items similar to users' favorite clothes by analyzing user-uploaded images. The recommendations are based on feature extraction using the pre-trained CNN model, ResNet50.

## Project Overview

The Clothing Recommender is designed to help users discover clothing items that are similar to their favorite clothing items. We utilized a dataset of over 10,000 clothing items from Kaggle (VITON HD) and processed them using the ResNet50 model to extract features. These features are embedded in a vector space, and user-uploaded images are similarly processed to obtain the top 10 similar clothing items.

## Features

- **Image Upload**: Upload images of your favorite clothing items.
- **Clothing Recommendation**: Get recommendations for similar clothing items based on image analysis.
- **Interactive UI**: User-friendly interface built with React.

## Image Storage and Dataset Requirements

Currently, images for this project are stored locally. Please download the dataset from Kaggle:

- **[High-Resolution VITON Zalando Dataset](https://www.kaggle.com/datasets/marquis03/high-resolution-viton-zalando-dataset)**

### Setup Instructions

1. **Download the Dataset:**

   - Download the images from the [High-Resolution VITON Zalando Dataset](https://www.kaggle.com/datasets/marquis03/high-resolution-viton-zalando-dataset).
   - Save these images to the `front/public/assets/` directory in your project.

2. **Obtain Vector Embeddings (Optional):**

   **[Generate Embeddings with Google Colab](https://colab.research.google.com/drive/1NaUW0ZwhezbDh7SIIM5MiTNEw7H-qNpB?usp=sharing)**

   - If you are working with different images, generate the `embeddings.csv` file using our provided Colab notebook.
   - Upload the `embeddings.csv` file to a new repository you create.
   - Obtain the raw URL of the CSV file from the repository.
   - Replace the existing URL in `app.py` with the URL to your raw CSV data:

     ```python
     url = '<link to your raw csv data>'
     ```

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

## Work in Progress

This project is currently under development. Here’s what we’re working on:

- **Signup:** Adding user signup functionality.
- **Dashboard:** Developing dashboards for both employees and customers to manage and view relevant information.

## License

This project is licensed under the MIT License.
