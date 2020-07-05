import { surveyCollection } from "../mongo.ts"
import BaseModel from "./baseModel.ts"

export default class Survey extends BaseModel{
    public id: string = ''
    public userId:  string = ''
    public name: string = ''
    public description: string = ''

    constructor(userId: string, name: string, description: string) {
        super()
        this.userId = userId
        this.name = name
        this.description = description
    }
    async create() {
        delete this.id
        const { $oid } = await surveyCollection.insertOne(this)
        this.id = $oid
        
        return this
    }
    async update({name,description} : { name: string, description: string}) {
        const { modifiedCount } = await surveyCollection.updateOne(
            {_id: {$oid: this.id}}, 
            {name, description}
            )

        this.name = name
        this.description = description
        return this
    }

    async delete(id: string) {
        await surveyCollection.deleteOne({ _id: { $oid: id}})
    }
    
    static async findAll(): Promise<Survey[]> {
        const surveys = await surveyCollection.find()
        return surveys.map((survey: any) => Survey.prepare(survey))
    }

    static async findByUser(userId: string): Promise<Survey[]> {
        const surveys = await surveyCollection.find({userId})
        return surveys.map((survey: any) => Survey.prepare(survey))
    }

    static async findById(id: string): Promise<Survey | null> {
        const survey = await surveyCollection.findOne({_id: {$oid:id}})
        
        if(!survey)
            return null

        return Survey.prepare(survey)
    }



    protected static prepare(data: any): Survey {
        data = BaseModel.prepare(data)
        const survey = new Survey(data.userId,data.name, data.description)
        survey.id = data.id
        return survey
    }
}