import { Request, Response, NextFunction } from 'express';
import {ValidationError} from 'express-validator';

abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
      super(message)
      //needed when you are extending a built in class in javascript
      Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): { message: string; field?: string }[]
}

export class NotFoundError extends CustomError{

    reason = "This route does not exist"
    statusCode = 404;

    constructor(){
        super('This route does not exist');
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(){
        return [
            {message : this.reason}
        ]
    }
}

export class BadRequestError extends CustomError{

    statusCode = 400;

    constructor(public message:string){
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors(){
        return [
            {message : this.message}
        ]
    }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    }

    res.status(400).send({
        errors: [{ message: "Something went wrong" }]
    })
}


export class RequestValidationError extends CustomError{

    statusCode = 400;

    constructor(public errors: ValidationError[]){
        super('Request validation Error');

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(){
        return this.errors.map(error => {
            return { message: error.msg, field: error.param }
        })
    }

}