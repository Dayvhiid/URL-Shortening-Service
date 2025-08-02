# URL Shortening Service

A simple and efficient URL shortening service built with Node.js, Express, MongoDB, and Redis. This service allows you to shorten long URLs and retrieve the original URLs using the shortened codes.

## Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **URL Retrieval**: Get the original URL from a shortened code
- **Caching**: Redis caching for improved performance
- **Database Storage**: Persistent storage using MongoDB
- **RESTful API**: Clean and simple REST API endpoints

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Cache**: Redis
- **Environment**: ES6 Modules

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dayvhiid/URL-Shortening-Service.git
   cd urlShorteningService
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   REDIS_PASSWORD=your_redis_password
   PORT=4000
   ```

4. **Start the application**
   
   For development:
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:4000/api/routely
```

### 1. Shorten URL
**POST** `/`

Create a shortened URL from a long URL.

**Request Body:**
```json
{
  "url": "https://www.example.com/very/long/url/that/needs/shortening"
}
```

**Response:**
```json
{
  "message": "Shortened successfully",
  "url": "abc123d"
}
```

### 2. Get Original URL
**GET** `/:shortUrl`

Retrieve the original URL using the shortened code.

**Example:**
```
GET /abc123d
```

**Response:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening"
}
```

**Response (from cache):**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening",
  "message": "Retrieved from cache"
}
```

## Project Structure

```
urlShorteningService/
├── controllers/
│   └── urlShortener.js      # Business logic for URL operations
├── models/
│   └── URL.js               # MongoDB schema for URL data
├── routes/
│   └── urlRoutes.js         # API route definitions
├── index.js                 # Application entry point
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables (not in repo)
└── README.md               # Project documentation
```

## Database Schema

### URL Model
```javascript
{
  originalUrl: String,    // The original long URL
  shortUrl: String,       // The generated short code (unique)
  createdAt: Date        // Timestamp of creation
}
```

## Caching Strategy

- **Redis Cache**: Short URLs are cached for 3 minutes (180 seconds)
- **Cache Hit**: Returns URL immediately from Redis
- **Cache Miss**: Queries MongoDB and updates cache

## How It Works

1. **URL Shortening Process**:
   - Receives a long URL via POST request
   - Generates a 7-character hash using SHA-256
   - Stores the mapping in MongoDB
   - Caches the mapping in Redis (3-minute TTL)
   - Returns the short code

2. **URL Retrieval Process**:
   - Receives a short code via GET request
   - Checks Redis cache first
   - If not cached, queries MongoDB
   - Returns the original URL

## Error Handling

- **400 Bad Request**: When URL is not provided
- **404 Not Found**: When short URL doesn't exist
- **500 Internal Server Error**: For server-side errors

## Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- Redis instance

### Scripts
- `npm start`: Start the production server
- `npm run dev`: Start development server with nodemon

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `REDIS_PASSWORD` | Redis authentication password | Yes |
| `PORT` | Server port (default: 4000) | No |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Dayvhiid**


## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
