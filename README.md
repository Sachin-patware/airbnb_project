# TripHaven

TripHaven is a full-stack vacation rental and property listing platform where users can browse stay options, search by destination, view listing details, leave reviews, and become a host by creating new property listings.

Live demo:
[Preview the site here](https://triphaven-renting-app.netlify.app/)

## Features

- Browse and search vacation homes, beach stays, city escapes, cabins, and more
- View detailed property pages with pricing, location, and amenities
- Add, edit, and delete listings as a host
- User authentication with signup/login
- Google login support
- Review system for listings
- Image upload support for property photos
- Location-based geocoding using Mapbox
- Responsive design for desktop and mobile

## Tech Stack

Frontend:
- React
- Vite
- Bootstrap
- React Router
- Axios
- React Toastify
- Mapbox GL
- React Icons

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- Passport.js
- Google OAuth
- Cloudinary
- Multer
- Joi
- Express Session

## Project Structure

```bash
Triphaven-renting-app/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── schemaValidation.js
│   ├── controller/
│   │   ├── google.jsx
│   │   └── listing.jsx
│   ├── models/
│   │   ├── listing.js
│   │   ├── review.js
│   │   └── user.js
│   ├── routes/
│   │   ├── google.js
│   │   ├── listing.js
│   │   ├── review.js
│   │   └── user.js
│   └── utility/
│       ├── CloudConfig.js
│       ├── ExpressError.js
│       ├── isLogin.js
│       ├── isOwner.js
│       ├── wrapAsync.js
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── netlify.toml
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── axiosInstance.jsx
│       ├── main.jsx
│       ├── Components/
│       └── hooks/
│
├── .gitignore
├── README.md
└── LICENSE (if present)
```

## Prerequisites

Before running the project, make sure you have:

- Node.js (v22 recommended)
- npm
- MongoDB Atlas connection
- Mapbox API key
- Cloudinary credentials
- Google OAuth client ID

## Environment Variables

Create a `.env` file in the backend folder:

```env
ATLAS_URL=your_mongodb_atlas_connection_string
MAP_API_KEY=your_mapbox_access_token
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_KEY_ID=your_cloudinary_api_key
CLOUD_KEY_SECRET=your_cloudinary_api_secret
PORT=5555
NODE_ENV=development
```

Create a `.env` file in the frontend folder:

```env
VITE_BACKEND_URL=http://localhost:5555
```

## Installation

1. Clone the repository

```bash
git clone https://github.com/Sachin-patware/Triphaven-renting-app.git
cd Triphaven-renting-app
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Application

Start the backend:

```bash
cd backend
node app.js
```

The backend should run on:

```bash
http://localhost:5555
```

Start the frontend:

```bash
cd frontend
npm run dev
```

The frontend should run on:

```bash
http://localhost:5173
```

## Deployment Notes

- Frontend is configured for Netlify hosting
- Frontend routing uses SPA fallback to `index.html`
- API requests are proxied through Netlify redirect configuration
- Backend is expected to be hosted separately and connected via environment configuration

## Usage

- Open the app in the browser
- Sign up or log in
- Search destinations or browse listings
- Open a listing to see full details
- Create your own listing by selecting “Become a Host”
- Add reviews to listings after interacting with them

## Contributing

Contributions are welcome. If you'd like to improve the project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

## License

This project is currently distributed under the repository's existing license terms.

## Contact

For any questions or collaboration requests, reach out through the project repository or linked profile.

---

If you want, I can also give you a cleaner README tailored for GitHub specifically with badges, screenshots, and a more polished project presentation.
