import mongoose, { Schema } from 'mongoose'
export const dbs: IDB = {
    mongoplay: {
        Company: new mongoose.Schema({
            name: String,
        }),
    },
    myusers: {
        User: new mongoose.Schema({
            firstName: String,
            lastName: String,
        }),
    },
}

interface IDB {
    [key: string]: {
        [key: string]: Schema,
    }
}
