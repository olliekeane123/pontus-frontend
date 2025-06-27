# Pontus

Pontus is a React-based frontend application for exploring and curating artworks. It connects to a backend API that serves artwork data from multiple sources. This project is designed to work together with the [Pontus backend](https://github.com/olliekeane123/pontus-backend) repository.

A live hosted version of Pontus is available at:  
https://pontus-curation.netlify.app/

Frontend endpoints include:  
- Home: https://pontus-curation.netlify.app/  
- Explore: https://pontus-curation.netlify.app/explore  
- Collection: https://pontus-curation.netlify.app/collection  

---

## What is Pontus?

Pontus provides a user-friendly interface to browse, search, and collect artworks. It fetches data from a backend API that aggregates artwork information, enabling users to explore art collections from various sources and manage their personal collection within the app.

---

## How it works

- The frontend is built with React, TypeScript, TailwindCSS, and uses Axios to fetch data.
- It calls the backend API to retrieve artworks, with pagination and search support.
- Artworks can be explored by source and added to a personal collection stored in session storage.
- The frontend expects the backend API to be available at runtime; without the backend, the app cannot fetch or display artworks.

---

## Setup Instructions for Local Development

### Prerequisites

- Node.js and npm/yarn installed
- Git installed

### Backend Setup

1. Clone the backend repo:

       git clone https://github.com/olliekeane123/pontus-backend.git
       cd pontus-backend

2. Install backend dependencies:

       npm install

3. Start the backend server locally (default port: 8000):

       npm run start

4. Confirm the backend is running by visiting:

       http://localhost:8000/api/artworks/aic?page=1

   You should see a JSON response or a valid API response.

---

### Frontend Setup

1. Clone this frontend repo (Pontus):

       git clone https://github.com/olliekeane123/pontus-frontend.git
       cd pontus-frontend

2. Install frontend dependencies:

       npm install

3. Update the backend base URL in `src/api/getArtworks.ts` if necessary:

       const backendBaseUrl = "http://localhost:8000";  // make sure it points to your local backend

4. Start the frontend development server:

       npm run dev

5. Open your browser and navigate to:

       http://localhost:5173/

6. You should now be able to explore artworks with the backend running locally.

---

## Notes

- The frontend uses session storage to manage the user's collection; data is cleared if the browser session ends.
- Make sure the backend and frontend ports do not conflict and that CORS is enabled on the backend to accept requests from `http://localhost:5173` (the frontend dev server).
- For production, the frontend points to the [live backend](https://pontus-backend.onrender.com/api/) hosted on Render.

---

## Live Demo

Try the live version here:  
https://pontus-curation.netlify.app/

---

## Backend Repository

The backend API repo is here:  
https://github.com/olliekeane123/pontus-backend

---

Feel free to open issues or contribute!
