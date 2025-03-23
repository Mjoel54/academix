# Academix

A modern Learning Management System (LMS) API built with Express.js and MongoDB. The application provides a robust backend for managing educational resources including courses, assignments, students, and teachers.

## Tech Stack

### Backend Framework

- **Express.js**: Fast, unopinionated web framework for Node.js
- **TypeScript**: Adds static typing and modern JavaScript features
- **Mongoose**: Elegant MongoDB object modeling for Node.js

### Database

- **MongoDB**: NoSQL database for flexible, scalable data storage

### Testing

- **Jest**: Delightful JavaScript testing framework with a focus on simplicity

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/academix.git
cd academix
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/academix
PORT=3000
```

4. Start the server:

```bash
npm run dev
```

## API Documentation


### Courses

#### GET /api/courses

Retrieve all courses.

Response:

```json
{
  "courses": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "instructor": "string",
      "students": ["string"],
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### POST /api/courses

Create a new course.

Request Body:

```json
{
  "name": "string",
  "description": "string",
  "instructor": "string"
}
```

### Assignments

#### GET /api/assignments

Retrieve all assignments for a course.

Query Parameters:

- courseId: string (required)

Response:

```json
{
  "assignments": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "dueDate": "date",
      "courseId": "string",
      "totalPoints": "number"
    }
  ]
}
```

#### POST /api/assignments

Create a new assignment.

Request Body:

```json
{
  "title": "string",
  "description": "string",
  "dueDate": "date",
  "courseId": "string",
  "totalPoints": "number"
}
```

### Students

#### GET /api/students

Retrieve all students.

Response:

```json
{
  "students": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "enrolledCourses": ["string"]
    }
  ]
}
```

#### POST /api/students

Register a new student.

Request Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Teachers

#### GET /api/teachers

Retrieve all teachers.

Response:

```json
{
  "teachers": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "departments": ["string"],
      "courses": ["string"]
    }
  ]
}
```

#### POST /api/teachers

Register a new teacher.

Request Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "departments": ["string"]
}
```

## Error Handling

The API uses standard HTTP response codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:

```json
{
  "error": {
    "code": "number",
    "message": "string"
  }
}
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
