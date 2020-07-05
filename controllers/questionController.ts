import { RouterContext } from "../deps.ts";
import Question from "../models/question.ts";
import BaseSurveyCotroller from "./baseSurveyController.ts";

class QuestionController extends BaseSurveyCotroller{
    async getBySurvey(ctx: RouterContext) {
        const surveyId: string = ctx.params.surveyId!

        const survey = await this.findSurveyOrFail(surveyId,ctx)
        if(survey) {
            const questions = await Question.findBySurvey(surveyId)
            ctx.response.status = 200
            ctx.response.body = questions
        }
    
    }
    async getSingle (ctx: RouterContext) {
        const id = ctx.params.id!

        const question = await Question.findById(id)

        if(!question) {
            ctx.response.status = 404
            ctx.response.body = { message: 'Invalid question id'}
            return
        }
        ctx.response.status = 200,
        ctx.response.body = question
    }
    async create (ctx: RouterContext) {
        const { value: { text, type, required, data } } = await ctx.request.body()
        const surveyId: string = ctx.params.surveyId!

        const survey = await this.findSurveyOrFail(surveyId,ctx)
        if(survey) {
            const question = new Question(surveyId,text, type, required, data)

            await question.create()
            ctx.response.status = 201
            ctx.response.body = question
        }
    }
    async update (ctx: RouterContext) {
        const id = ctx.params.id!

        const question = await Question.findById(id)

        if(!question) {
            ctx.response.status = 404
            ctx.response.body = { message: 'Invalid question id'}
            return
        }
        const { value: { text, type, required, data } } = await ctx.request.body() 
        await question.update(text, type, required, data)

        ctx.response.status = 200,
        ctx.response.body = question
     }
    async delete (ctx: RouterContext) {
        const id = ctx.params.id!

        const question = await Question.findById(id)
        if(question) { 
            await question.delete(id)
 
            ctx.response.status = 204
         }
    }
}

export const questionController = new QuestionController();
