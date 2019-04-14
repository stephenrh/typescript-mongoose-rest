import mongoose, { Model, model, Document, Schema } from 'mongoose'
import { dbs } from '../config/database.config'
export class Database {
    public static models: IConnections = { empty: <Model<Document>> {} }
    public static async init() {
        Object.keys(dbs).forEach(v => {
            const collections = dbs[v]
            mongoose.createConnection(`mongodb://localhost/${v}`, {useNewUrlParser: true}).then(connection => {
                const schemas = Object.keys(collections)
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < schemas.length; i++) {
                    Database.models[schemas[i]] = connection.model(schemas[i], dbs[v][schemas[i]])
                }
            })
        })
    }
}
interface IConnections {
    [key: string]: Model<Document>
}
