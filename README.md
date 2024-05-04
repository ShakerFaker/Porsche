# Porsche Website

## Project Overview

This repository contains the source code for a Porsche website developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The website serves as a platform for browsing Porsche products, managing customer accounts, placing orders, and administering the site.

## Stack Used

- MongoDB and MongoDB Atlas for database management.
- Node.js and Express.js for the backend.
- React.js for the frontend.

## Database Schema

The database schema consists of four entities: `product`, `customer`, `order`, and `admin`. To ensure integrity, all passwords are hashed. Our database is hosted on the cloud, using Atlas. Below is the schema visualization:


![Database Schema](https://github.com/MohamedHossam2004/Porsche/assets/142936159/ca11c0dc-8a4a-4907-8918-cbf7ad5fc03c)



## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MohamedHossam2004/Porsche.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repository
   ```

3. Install dependencies for both the server and client:

   ```bash
   cd server && npm install i
   ```

4. Create a `.env` file in the `server` directory with the following variables:

   ```plaintext
   PORT=5555;
   mongoDB=your-mongodb-connection-string;
   SECRET_KEY=your-secret-key;
   ```

   Note: The `.env` file is not included in the repository for security reasons. Ensure you create your own `.env` file with the appropriate values.

5. Start the server:

   ```bash
   cd server && npm start
   ```



## APIs

The backend provides both public and private APIs for various functionalities, including searching, browsing, authentication, managing orders, and products. JWT authentication with hashing is implemented for secure access.

## Usage

You can browse and search for products on the website. In order to purchase a product, you need to be registered and logged in. Afterwards, you can view your orders, make a new purchase and much more.

## Contributing

Porsche is open source. Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.


## License

No license at the moment. 
