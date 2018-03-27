import express from "express";

// Middlewares
export interface IMiddleware {
    cors: (req: any, res: any, next: any) => void;
    subdomain: (req: any, res: any, next: any) => void;
}

// Subdomain
export interface IOptions {
    app: express.Application;
    name: string;
}