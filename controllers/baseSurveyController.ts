import { RouterContext } from "../deps.ts";
import Survey from "../models/survey.ts";
import User from "../models/user.ts";

export default class BaseSurveyCotroller {
    async findSurveyOrFail(id: string, ctx: RouterContext): Promise<Survey | null> {
        const survey = await Survey.findById(id)

        if(!survey) {
            ctx.response.status = 404,
            ctx.response.body = { message: "Incorect Id"}
            return null
        }
        const user = ctx.state.user as User
        if(survey.userId !== user.id)
        {
            ctx.response.status = 403,
            ctx.response.body = { message: "You don't have permission on this survey"}
            return null
        }
        return survey
    }
}
