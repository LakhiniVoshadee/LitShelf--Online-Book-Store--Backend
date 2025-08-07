export class NotFoundError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class ValidationError extends Error {
    statusCode: number;
    errors: Record<string, string>;

    constructor(message: string, errors: Record<string, string> = {}) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.errors = errors;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class UnauthorizedError extends Error {
    statusCode: number;

    constructor(message: string = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ForbiddenError extends Error {
    statusCode: number;

    constructor(message: string = 'Forbidden') {
        super(message);
        this.name = 'ForbiddenError';
        this.statusCode = 403;
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export const errorHandler = (err: any, req: any, res: any, next: any) => {
    console.error(err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            message: err.message,
            details: err.errors
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: err.message || 'Authentication failed'
        });
    }

    if (err.name === 'ForbiddenError') {
        return res.status(403).json({
            error: 'Forbidden',
            message: err.message || 'Access denied'
        });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            error: 'Not Found',
            message: err.message || 'The requested resource was not found'
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            error: 'Duplicate Key Error',
            message: 'A document with this data already exists',
            details: err.keyValue
        });
    }

    // Default to 500 server error
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

export const notFoundHandler = (req: any, res: any) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`
    });
};
