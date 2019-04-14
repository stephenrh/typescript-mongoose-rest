import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
export class Auth {
    public exemptPaths: string[] = [
        '/login',
    ]
    constructor(public req: Request, public res: Response, public next: NextFunction) {
        if (this.exemptPaths.indexOf(req.path) > -1) {
            next()
        } else {
        this.preCheck()
        }
    }
    public preCheck() {
        if (!this.req.headers['x-access-token']) {
            this.res.status(403).send('No authorization header')
        } else {
            this.webToken()
        }
    }

    public webToken() {
        jwt.verify(<string> this.req.headers['x-access-token'], '8675209', (err: jwt.JsonWebTokenError, result: any) => {
            if (err) {
                return this.res.status(500).send('Token Error')
            }
        })
    }
}
