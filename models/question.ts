import { questionCollection } from "../mongo.ts"
import BaseModel from "./baseModel.ts"

export default class Question extends BaseModel {
    public id: string = ""
    constructor(
        public surveyId: string,
        public text: string,
        public type: QuestionType,
        public required: boolean,
        public data: any
    ) {
        super()
    }

    static async findBySurvey(surveyId: string): Promise<Question[]> {
        const surveys = await questionCollection.find({surveyId})
        return surveys.map((survey: any) => Question.prepare(survey))
    }

    static async findById(id: string): Promise<Question | null> {
        const question = await questionCollection.findOne({_id: {$oid:id}})
        
        if(!question)
            return null

        return Question.prepare(question)
    }



    protected static prepare(data: any): Question {
        data = BaseModel.prepare(data)
        const question = new Question(data.surveyId,data.text, data.type, data.required, data.data)
        question.id = data.id
        return question
    }

    async create() {
        delete this.id
        const { $oid } = await questionCollection.insertOne(this)
        this.id = $oid

        return this
    }
    async update(text: string, type: QuestionType, required: boolean, data: any) {
        const { modifiedCount } = await questionCollection.updateOne(
            {_id: {$oid: this.id}}, 
            {
                $set: { text,type, required, data }
            })

        this.text = text
        this.type = type
        this.required = required
        this.data = data
        return this
    }

    async delete(id: string) {
        await questionCollection.deleteOne({ _id: { $oid: id}})
    }

    isText() {
        return this.type === QuestionType.TEXT;
      }
    
      isChoice() {
        return this.type === QuestionType.CHOICE;
      }
    

}

export enum QuestionType {
    CHOICE = 'choice',
    TEXT = 'text'
}