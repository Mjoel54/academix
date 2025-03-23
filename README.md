# Academix

A modern Learning Management System (LMS) API built with Express.js and MongoDB. The application provides a robust backend for managing educational resources including courses, assignments, students, and teachers.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)

  - [Courses](#courses)
  - [Assignments](#assignments)
  - [Users](#users)

- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

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

Query Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | No | Page number for pagination (default: 1) |
| limit | number | No | Number of items per page (default: 10) |
| instructor | string | No | Filter courses by instructor ID |

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
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "pages": "number"
  }
}
```

#### POST /api/courses

Create a new course.

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Name of the course (max: 100 characters) |
| description | string | Yes | Detailed description of the course |
| instructor | string | Yes | ID of the instructor teaching the course |

Response:

```json
{
  "course": {
    "id": "string",
    "name": "string",
    "description": "string",
    "instructor": "string",
    "students": [],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### GET /api/courses/:id

Retrieve a specific course by ID.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the course |

Response:

```json
{
  "course": {
    "id": "string",
    "name": "string",
    "description": "string",
    "instructor": "string",
    "students": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### PUT /api/courses/:id

Update a specific course.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the course |

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | No | Updated name of the course (max: 100 characters) |
| description | string | No | Updated description of the course |
| instructor | string | No | Updated ID of the instructor |

Response:

```json
{
  "course": {
    "id": "string",
    "name": "string",
    "description": "string",
    "instructor": "string",
    "students": ["string"],
    "updatedAt": "date"
  }
}
```

#### DELETE /api/courses/:id

Delete a specific course.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the course |

Response:

```json
{
  "message": "Course successfully deleted",
  "courseId": "string"
}
```

#### POST /api/courses/:id/students

Add a student to a course.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the course |

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| studentId | string | Yes | ID of the student to be added to the course |

Response:

```json
{
  "course": {
    "id": "string",
    "students": ["string"],
    "updatedAt": "date"
  },
  "message": "Student successfully added to course"
}
```

### Assignments

#### GET /api/courses/:courseId/assignments

Retrieve all assignments for a specific course.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| courseId | string | Yes | Unique identifier of the course |

Query Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | No | Page number for pagination (default: 1) |
| limit | number | No | Number of items per page (default: 10) |
| dueDate | date | No | Filter assignments by due date |

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

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| courseId | string | Yes | Unique identifier of the course |

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| title | string | Yes | Title of the assignment (max: 100 characters) |
| description | string | Yes | Detailed description of the assignment |
| dueDate | date | Yes | Due date for the assignment (ISO 8601 format) |
| totalPoints | number | Yes | Maximum points possible for the assignment |

Response:

```json
{
  "assignment": {
    "id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "date",
    "courseId": "string",
    "totalPoints": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### GET /api/courses/:courseId/assignments/:assignmentId

Retrieve a specific assignment.

Response:

```json
{
  "assignment": {
    "id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "date",
    "courseId": "string",
    "totalPoints": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

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

Response:

```json
{
  "assignment": {
    "id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "date",
    "courseId": "string",
    "totalPoints": "number",
    "updatedAt": "date"
  }
}
```

#### DELETE /api/courses/:courseId/assignments/:assignmentId

Delete a specific assignment.

Response:

```json
{
  "message": "Assignment successfully deleted",
  "assignmentId": "string"
}
```

### Users

#### GET /api/users

Retrieve all users.

Query Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | No | Page number for pagination (default: 1) |
| limit | number | No | Number of items per page (default: 10) |
| role | string | No | Filter users by role (e.g., "student", "instructor") |
| email | string | No | Filter users by email address |

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

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Full name of the user |
| email | string | Yes | Email address (must be unique) |
| password | string | Yes | Password (min: 8 characters, must include uppercase, lowercase, number) |
| role | string | Yes | User role ("student" or "instructor") |

Response:

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "enrolledCourses": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### GET /api/users/:id

Retrieve a specific user.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the user |

Response:

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "enrolledCourses": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### PUT /api/users/:id

Update a specific user.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the user |

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | No | Updated full name of the user |
| email | string | No | Updated email address (must be unique) |
| role | string | No | Updated user role ("student" or "instructor") |

Response:

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "enrolledCourses": ["string"],
    "updatedAt": "date"
  }
}
```

#### DELETE /api/users/:id

Delete a specific user.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the user |

Response:

```json
{
  "message": "User successfully deleted",
  "userId": "string"
}
```

#### POST /api/users/:id/enrolments

Add a course enrollment for a user.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the user |

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| courseId | string | Yes | ID of the course to enroll in |

Response:

```json
{
  "course": {
    "id": "string",
    "students": ["string"],
    "updatedAt": "date"
  },
  "message": "Student successfully added to course"
}
```

#### PUT /api/users/:id/enrolments

Update a user's course enrollment.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the user |

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| courseId | string | Yes | ID of the course to update enrollment for |
| status | string | Yes | New enrollment status ("active", "completed", "dropped") |

Response:

```json
{
  "user": {
    "id": "string",
    "enrolledCourses": ["string"],
    "courseStatuses": [
      {
        "courseId": "string",
        "status": "string",
        "updatedAt": "date"
      }
    ]
  }
}
```

#### DELETE /api/users/:id/enrolments

Remove a course enrollment for a user.

URL Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Unique identifier of the user |

Request Body Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| courseId | string | Yes | ID of the course to remove enrollment from |

Response:

```json
{
  "user": {
    "id": "string",
    "enrolledCourses": ["string"],
    "updatedAt": "date"
  },
  "message": "Successfully unenrolled from course"
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
