**React & Firebase E-Commerce Store**


This is a full-featured online storefront built from the ground up using a modern, serverless technology stack. The application provides a dynamic and responsive user interface for customers to browse products, search, and manage a shopping cart.

Features
Dynamic Homepage: Features a hero section and horizontally scrolling carousels that automatically group products by category.

Product Catalog: A dedicated "Shop" page displaying all products in a grid layout.

Detailed Product Pages: Users can click on any product to see a detailed view with a description, price, and an "Add to Cart" button.

Advanced Search: A comprehensive search bar in the navigation allows users to search by keyword. Results are displayed on a dedicated search results page.

Dynamic Shopping Cart: A fully functional, client-side cart where users can add, remove, and update the quantity of items. The state is managed globally using React's Context API.

User Authentication UI: A clean, toggleable form for user Login and Registration.

Responsive Design: The entire application is designed to be fully responsive, providing a seamless experience on desktops, tablets, and mobile devices.

**Technologies Used:**

Frontend: React (with Vite), React Router DOM

Styling: Plain CSS with Flexbox, Grid, and Media Queries

State Management: React Context API

Backend & Database: Firebase (Firestore)

Icons: React Icons

**_Setup and Installation_**

**_Follow these steps to get the project running on your local machine._**


**Clone the Repository**

_git clone https://github.com/Akshat1003-ctrl/react-firebase-online-store.git_

_cd react-firebase-online-store_


**Install Dependencies**

This will install all the necessary packages for the project.

_npm install_


**Set Up Firebase**

1. Go to the Firebase Console and create a new project.
2. In your new project, go to Project Settings (click the gear icon ⚙️) > Your apps.
3. Click the web icon (</>) to register a new web app.
4. Firebase will give you a configuration object with your project keys.


**Configure Environment Variables**

For security, your Firebase keys should not be committed to your repository.

Create a file named .env.local in the root of your project:

_touch .env.local_


**Add your Firebase configuration keys to this file, prefixed with VITE_:**

_VITE_FIREBASE_API_KEY="YOUR_API_KEY_HERE"_

_VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN_HERE"_

_VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID_HERE"_

_VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET_HERE"_

_VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID_HERE"_

_VITE_FIREBASE_APP_ID="YOUR_APP_ID_HERE"_


**Important: Modify the _src/firebaseConfig.js_ file to use these environment variables.**

JavaScript

_// src/firebaseConfig.js_

_import { initializeApp } from "firebase/app";_

_import { getFirestore } from "firebase/firestore";_

_const firebaseConfig = {_

apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  
storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  
messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  
appId: import.meta.env.VITE_FIREBASE_APP_ID
  
_};_

_const app = initializeApp(firebaseConfig);_

_export const db = getFirestore(app);_


**Populate the Database**

In the Firebase Console, navigate to Firestore Database and create a database. Start in test mode for development.

Create a collection named products.

Add documents to this collection for each product. Each document must have the following fields:

_name (string)_
_description (string)_
_price (number)_
_category (string)_
_stock (number)_
_imageUrl (string)_


**Run the Application**

Once the setup is complete, you can start the development server.

_npm run dev_

The application will be available at **http://localhost:5173.**


**Available Scripts**

In the project directory, you can run:

_npm run dev: Runs the app in development mode._
_npm run build: Builds the app for production to the dist folder._
_npm run preview: Serves the production build locally to preview it._
_npm run lint: Runs the ESLint checker on the project files._
