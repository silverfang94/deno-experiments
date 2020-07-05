import { RouterContext } from "../deps.ts";
import Survey from "../models/survey.ts";
import BaseSurveyCotroller from "./baseSurveyController.ts";
import User from "../models/user.ts";

class SurveyController extends BaseSurveyCotroller {
    async getAllForUser(ctx: RouterContext) {

        const user: User = ctx.state.user as User
        ctx.response.status = 200,
        ctx.response.body = await Survey.findByUser(user.id);
    }
    async getSingle (ctx: RouterContext) {
        const id = ctx.params.id!
        const survey = await this.findSurveyOrFail(id,ctx)
        
        if(survey) {
            ctx.response.status = 200,
            ctx.response.body = survey
        }
    }
    async create (ctx: RouterContext) {
        const { value: { name, description } } = await ctx.request.body()

        const user: User = ctx.state.user as User

        const survey = new Survey(user.id,name,description)
        await survey.create()

        ctx.response.status = 201,
        ctx.response.body = survey
    }
    async update (ctx: RouterContext) {
        const id = ctx.params.id!

        const survey = await this.findSurveyOrFail(id, ctx)

        if(survey) {
           const { value: { name, description } } = await ctx.request.body() 
           await survey.update({name,description})

           ctx.response.status = 201,
           ctx.response.body = survey
        }
    }
    async delete (ctx: RouterContext) {
        const id = ctx.params.id!

        const survey = await this.findSurveyOrFail(id, ctx)
        if(survey) { 
            await survey.delete(id)
 
            ctx.response.status = 204
         }
    }

}

export const surveyController = new SurveyController();
