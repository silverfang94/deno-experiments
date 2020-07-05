import { usersCollection } from "../mongo.ts";
import BaseModel from "./baseModel.ts";

export default class User extends BaseModel {
    public id: string 
    public name: string
    public email: string
    public password: string

    constructor({ id = '', name = '', email = '', password = ''}) {
        super()
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        
    }

    static async findOne(params: object) {
        const user = await usersCollection.findOne(params);
        return User.prepare(user)
    }

    async save() {
        delete this.id
        const {$oid} = await usersCollection.insertOne(this)

        this.id = $oid

        return this
    }

    protected static prepare(data: any): User {
        data = BaseModel.prepare(data)
        const user = new User(data)
        return user
    }
}
