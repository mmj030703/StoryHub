# **Story Hub - Post Management System**

Welcome to **Story Hub**, a platform for managing and sharing your stories. Built using the MERN stack, this application provides a user-friendly interface for creating, reading, updating, and deleting posts. It emphasizes a smooth user experience with features like lazy loading, shimmer UI, and informative toast messages.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Project Structure](#project-structure)
7. [Technologies Used](#technologies-used)
8. [License](#license)

## Project Overview

Story Hub is a **MERN-based Post Management System** that allows users to create, read, update, and delete posts. The application prioritizes a positive user experience through responsive design, optimized performance with lazy loading, visual feedback with shimmer UI, and clear communication using toast messages.

### Live Demo

_[Link to Demo](https://story-hub-6vd5.onrender.com)_

---

## Features

- **CRUD Operations:** Create, Read, Update, and Delete posts with ease.
- **Image Upload:** Upload images to accompany your stories.
- **Responsive Design:** Optimized for viewing on various devices.
- **Lazy Loading:** Improves initial load time and performance by loading content as needed.
- **Shimmer UI:** Provides a visual loading indicator while content is fetching, enhancing the user experience.
- **Toast Messages:** Clear and concise messages inform the user about the status of their actions (success, errors, etc.).

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or hosted instance)
- An [Imagekit Account](https://imagekit.io)

---

### Backend Setup

1. Clone the repository:

```bash
   git clone https://github.com/mmj030703/StoryHub.git
   cd backend
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env` file and add the following:

```env
    PORT=3000
    DATABASE_NAME=<db_name>
    MONGODB_URI=<mongodb_uri>
    IMAGEKIT_PUBLIC_KEY=<imagekit_publickey>
    IMAGEKIT_PRIVATE_KEY=<imagekit_privatekey>
    IMAGEKIT_URL_ENDPOINT=<imagekit_url_endpoint>
       
```

4. Start the server:

`bash
   npm start
   `

The backend will run on `http://localhost:3000`.

---

### Frontend Setup

1. Navigate to the frontend repository:

```bash
   git clone https://github.com/mmj030703/StoryHub.git
   cd frontend
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## Usage

1. **Create Post:** Navigate to the "Add Post" page to create a new story. Fill in the title, description, and upload an image.
2. **View Posts:** The homepage displays all the posts.
3. **Update Post:** Click on a post to view its details and access the update form.
4. **Delete Post:** Delete posts from the post details page.

---

## API Endpoints

#### Base URL

https://storyhub-n1ne.onrender.com/api/v1

### Posts

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/posts/all-posts`  | Get all posts       |
| GET    | `/posts/post/:id`   | Get a post by ID    |
| POST   | `/posts/add`        | Add a new post      |
| PATCH  | `/posts/update/:id` | Update a post by ID |
| DELETE | `/posts/delete/:id` | Delete a post by ID |

---

## Project Structure

```plaintext
story-hub/
├── backend/
│   ├── public/            # Temporary files
│   ├── .env                # Environment variables
│   ├── .env.sample    # Sample Environment variables
│   ├── src/                 # Source Directory
│       ├── config/            # Configuration files
│       ├── controllers/       # Backend logic
│       ├── db/       # Database files
│       ├── middlewares/            # Backend API middlewares
│       ├── models/            # Mongoose models
│       ├── routes/            # Backend API routes
│       ├── utils/            # Utility files
│       ├── app.js          # Backend application file
│       └── index.js          # Backend entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/    # Utility files
│   │       ├── ...
│   │   ├── pages/         # Pages for the app
│   │   ├── App.jsx        # Application component
│   │   └── main.jsx        # Frontend entry point
```

## Technologies Used

- **Backend**:

  - Node.js, Express, MongoDB, Mongoose, Multer, Imagekit.

- **Frontend**:
  - React, Tailwind CSS, React Router.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
