import express, { Request, Response, NextFunction } from 'express'
import cors = require('cors')
import path from 'path'
import { Database } from './system/database'
import System from './system/system'
import bodyParser = require('body-parser')

class Server extends System {
    private app: express.Application = express()
    private autoRoutes = require('express-auto-routes')(this.app)
    private port: number
    private auth: any
    constructor() {
        super()
        Database.init()
        this.port = 3015
        this.activateCors({origin: true, credentials: true, allowedHeaders: ['x-access-token', 'content-type']})
        this.enableAuthMiddleWare()
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }))
        this.initializeRoutes()
        this.errorPages()
        this.start(5687)
    }
    private initializeRoutes() {
        this.app.set('view engine', 'pug')
        this.autoRoutes(path.join(__dirname, './controllers'))
        this.app.set('views', __dirname + '/routes/views')
        this.app.use(express.static(__dirname + '/routes/views/static'))
    }
    private activateCors(options: any) {
        this.app.use(cors(options))
    }
    private enableAuthMiddleWare() {
       this.app.use(require('./middlewares/newAuth'))
    }
    private errorPages() {
        this.app.use((req: Request, res: Response) => {
            return res.status(404).send({error: 'Endpoint does not exist'})
        })
        this.app.use((req: Request, res: Response) => {
            return res.status(500).send({error: 'Fatal Server Error'})
        })
    }
    private start(port: number) {
        this.app.listen(port)
    }

}

module.exports = new Server()
