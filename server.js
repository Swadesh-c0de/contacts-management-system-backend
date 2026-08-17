import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import sanitize from './middleware/sanitize.js';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/dbConnection.js';
import { globalLimiter } from './middleware/rateLimiter.js';

connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            scriptSrc: ["'self'"],
        }
    }
}));

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());
app.use(sanitize);
app.use(globalLimiter);

// Root route - Clean minimal monochromatic welcome for browsers & JSON for API clients
app.get('/', (req, res) => {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(200).json({
            status: "online",
            name: "Contacts Management System API",
            version: "1.0.0",
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
            documentation: "https://github.com/Swadesh-c0de/contacts-management-system-backend",
            endpoints: {
                users: "/api/users",
                contacts: "/api/contacts"
            }
        });
    }

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacts API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #09090b;
            color: #fafafa;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
        }
        .card {
            width: 100%;
            max-width: 440px;
            background: #111113;
            border: 1px solid #27272a;
            border-radius: 12px;
            padding: 1.75rem;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        .version {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.75rem;
            color: #71717a;
        }
        h1 {
            font-size: 1.25rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            color: #ffffff;
        }
        p {
            font-size: 0.85rem;
            color: #a1a1aa;
            line-height: 1.5;
            margin-bottom: 1.25rem;
        }
        .endpoints {
            border: 1px solid #27272a;
            border-radius: 8px;
            background: #09090b;
            margin-bottom: 1.25rem;
            overflow: hidden;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.8rem;
        }
        .row {
            display: flex;
            align-items: center;
            padding: 0.55rem 0.75rem;
            border-bottom: 1px solid #1c1c20;
        }
        .row:last-child {
            border-bottom: none;
        }
        .method {
            font-weight: 600;
            font-size: 0.7rem;
            color: #71717a;
            width: 44px;
        }
        .path {
            color: #e4e4e7;
        }
        .actions {
            display: flex;
            gap: 0.6rem;
        }
        .btn {
            flex: 1;
            padding: 0.55rem 0.85rem;
            border-radius: 6px;
            font-size: 0.825rem;
            font-weight: 500;
            text-align: center;
            text-decoration: none;
            transition: opacity 0.15s ease, background 0.15s ease;
        }
        .btn-primary {
            background: #fafafa;
            color: #09090b;
            border: 1px solid #fafafa;
        }
        .btn-primary:hover {
            opacity: 0.9;
        }
        .btn-secondary {
            background: transparent;
            color: #fafafa;
            border: 1px solid #27272a;
        }
        .btn-secondary:hover {
            background: #18181b;
            border-color: #3f3f46;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>Contacts API</h1>
            <span class="version">v1.0.0</span>
        </div>
        <p>A secure, RESTful backend engine with isolated user tenancy, JWT rotation, and rate limiting.</p>

        <div class="endpoints">
            <div class="row">
                <span class="method">POST</span>
                <span class="path">/api/users/login</span>
            </div>
            <div class="row">
                <span class="method">GET</span>
                <span class="path">/api/contacts</span>
            </div>
            <div class="row">
                <span class="method">POST</span>
                <span class="path">/api/contacts</span>
            </div>
        </div>

        <div class="actions">
            <a href="https://github.com/Swadesh-c0de/contacts-management-system-backend" target="_blank" rel="noopener noreferrer" class="btn btn-primary">GitHub</a>
            <a href="/api/contacts" class="btn btn-secondary">Status</a>
        </div>
    </div>
</body>
</html>`);
});

app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}.`);
    });
}

export default app;