# User Management System

This project is a User Management System built with a full-stack architecture. It includes a backend using Node.js (Express.js) with MongoDB for database integration, and a frontend using React and react-flow for interactive user visualization.

## Technologies Used

- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework to build the API.
- **MongoDb**: NoSQL database for storing user data..
- **Cluster API**: For load balancing and scaling.
- **dotenv**: Loads environment variables from a `.env` file.
- **React**: Library for building user interfaces.
- **TypeScript**: For robust and scalable code.
- **react-flow**: For visualizing users and hobbies as draggable and interactive nodes.
- **CSS Modules**: For styling components.


## Backend Features

- CRUD API for user and hobby management.
- Proper error handling with custom middleware.
- Load balancer implementation using Node.js Cluster API.
- Connection to MongoDB with environment variable configuration.
- Endpoint testing for critical scenarios.

## Frontend Features

### Main Visualization Area:

- Display users as nodes with username and age.
- Show connected hobbies as child nodes.
- Allow dragging and dropping hobbies onto user nodes to associate them.

### Interactive Sidebar:

- List of available hobby categories.
- Draggable hobbies for interaction.
- User Management:
- Forms for creating and editing users.
- Validation for required fields.
- Success/error notifications.
- Confirmation dialogues for deletions.

## State Management:

- Consistent syncing between backend and frontend.
- Loading and error states for smooth UI experience.

## Installation

### Backend

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/abhayrajgupta128/user-management-system.git
2. Install the dependencies: yarn install
3. Create a .env file in the root of the backend directory with the following variables:
   PORT=4000
   MONGO_URL=mongodb+srv://abhayrajgupta128:mbHqyH190fOtlGwX@cluster0.uvmi6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
4. Start the server: yarn start:dev.

The server will now be running on http://localhost:4000.

### frontend

1. Navigate to the frontend directory: cd client
2. Install the dependencies: yarn install
3. Start the React development server: yarn start