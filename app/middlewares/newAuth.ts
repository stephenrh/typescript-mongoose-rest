import { Request, Response, NextFunction } from 'express'
module.exports = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.path)
    next()
}