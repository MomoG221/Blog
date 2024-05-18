# Blog Web Application

## Project Description
The goal of this project is to create a Blog web application using Node.js, Express.js, and EJS. The application will allow users to create, view, update, and delete blog posts. Posts will not persist between sessions as no database will be used in this version of the application.

## Features
1. **Post Creation**: Users can create new blog posts through a form.
2. **Post Viewing**: The home page displays all blog posts.
3. **Post Update/Delete**: Users can edit or delete existing posts.
4. **Styling**: The application is styled to be responsive and user-friendly on both desktop and mobile devices.

## Usage
1. **Installation**: 
   - Clone the repository to your local machine using `git clone <repository-url>`.
   - Navigate to the project directory.
2. **Run the Application**:
   - Open a terminal in the project directory.
   - Run `npm install` to install dependencies.
   - Start the API server with `nodemon index.js`.
   - Start the front-end server with `nodemon server.js`.
3. **Access the Application**: 
   - Open a web browser and go to `http://localhost:3000` to access the blog web application.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web application framework for Node.js, used to build the API.
- **EJS (Embedded JavaScript)**: Templating engine used to generate HTML with embedded JavaScript.
- **CSS**: For styling the application.

## API Endpoints

### index.js (API Server)
- **GET /posts**: Fetches all blog posts.
- **GET /posts/:id**: Fetches a specific blog post by its ID.
- **POST /posts**: Creates a new blog post.
- **PATCH /posts/:id**: Updates a specific blog post.
- **DELETE /posts/:id**: Deletes a specific blog post.