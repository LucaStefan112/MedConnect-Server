import { Response } from 'express';
export interface IBasicResponse extends Response {
    success: boolean;
    message: string;
}