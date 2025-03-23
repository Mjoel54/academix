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

#### GET /api/courses/:id

Retrieve a specific course by ID.

#### PUT /api/courses/:id

Update a specific course.

Request Body:

```json
{
  "name": "string",
  "description": "string",
  "instructor": "string"
}
```

#### DELETE /api/courses/:id

Delete a specific course.

#### POST /api/courses/:id/students

Add a student to a course.

Request Body:

```json
{
  "studentId": "string"
}
```

### Assignments

#### GET /api/courses/:courseId/assignments

Retrieve all assignments for a specific course.

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

#### POST /api/courses/:courseId/assignments

Create a new assignment for a specific course.

Request Body:

```json
{
  "title": "string",
  "description": "string",
  "dueDate": "date",
  "totalPoints": "number"
}
```

#### GET /api/courses/:courseId/assignments/:assignmentId

Retrieve a specific assignment.

#### PUT /api/courses/:courseId/assignments/:assignmentId

Update a specific assignment.

Request Body:

```json
{
  "title": "string",
  "description": "string",
  "dueDate": "date",
  "totalPoints": "number"
}
```

#### DELETE /api/courses/:courseId/assignments/:assignmentId

Delete a specific assignment.

### Users

#### GET /api/users

Retrieve all users.

Response:

```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "enrolledCourses": ["string"]
    }
  ]
}
```

#### POST /api/users

Create a new user.

Request Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

#### GET /api/users/:id

Retrieve a specific user.

#### PUT /api/users/:id

Update a specific user.

#### DELETE /api/users/:id

Delete a specific user.

#### POST /api/users/:id/enrolments

Add a course enrollment for a user.

#### PUT /api/users/:id/enrolments

Update a user's course enrollment.

#### DELETE /api/users/:id/enrolments

Remove a course enrollment for a user.

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
