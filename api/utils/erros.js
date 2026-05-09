class AppError extends Error {
    constructor(message, statusCode, code) {
        super(message)
        this.statusCode = statusCode
        this.code = code
    }
}

class AuthError extends AppError {
    constructor(message, statusCode, code = 'AUTH_ERROR') {
        super(message, statusCode, code)
    }
}

class SessionError extends AppError {
    constructor(message, statusCode, code = 'SESSION_ERROR') {
        super(message, statusCode, code)
    }
}

export {
    AppError,
    AuthError,
    SessionError
}