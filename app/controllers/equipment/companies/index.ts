import mongoose, { Document, Schema, Model, model } from 'mongoose'
import Controller from '../../../system/controller'
import { Database } from '../../../system/database'
import { Request, Response, NextFunction } from 'express'
class EquipmentController extends Controller {
    public companySchema = new mongoose.Schema({
        name: String,
    })
    public get = {
        params: ':name?',
        handler: async (...args: [Request, Response, NextFunction]) => {
        const name = args[0].params.name === undefined ?  {} : {name: args[0].params.name }
        const find = await Database.models['Company'].find(name)
        return args[1].json(find)
        },
    }
    constructor() {
        super()
    }
    public post = async (...args: [Request, Response, NextFunction]) => {
        const company = new Database.models['Company']({
            name: 'OOP',
        })
        try {
            await company.validate()
            const insert = await company.save()
            return args[1].json(insert)
        } catch {
            return args[1].json(`Invalid Data`)
        }
    }

    public truckCreate = async (...args: [Request, Response, NextFunction]) => {
        args[0].body.truck.tcomp = mongoose.Types.ObjectId(args[0].body.truck.tcomp)
        const truck = new Database.models['Truck'](args[0].body.truck)
        try {
            const response = await truck.save()
            return args[1].json(response)
        } catch (err) {
            return args[1].status(500)
        }
    }

    public truckFind = async (...args: [Request, Response, NextFunction]) => {
        const trucks = await Database.models['Truck'].find().populate('tcomp').exec()
        return args[1].json(trucks)
    }
}

module.exports = new EquipmentController()
