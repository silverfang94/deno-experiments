import  { IRequest, IResponse, Next } from "https://deno.land/x/snowlight/mod.ts";
import { createUserService, getUserService, updateUserService, removeUserService } from "../services/userService.ts";


export const createUser = async (req: IRequest, res: IResponse, next: Next) => {

    try {
        let serviceCall = await createUserService(req.body);

        return res.status(201).json(serviceCall);
    } catch (e) {

        next(e);
    }
    

}

export const getUserDetails = async (req: IRequest, res: IResponse, next: Next) => {
    try {
        let serviceCall = await getUserService(req.params);
        console.log(serviceCall)

        return res.status(200).json(serviceCall);
    } catch (e) {
        
        next(e);
    }

}

export const updateUser = async (req: IRequest, res: IResponse, next: Next) => {

    try {
        let serviceCall = await updateUserService(req.query, req.body);
        return res.status(200).json(serviceCall);
    } catch (e) {
        
        next(e);
    }
    
}

export const removeUser = async (req: IRequest, res: IResponse, next: Next) => {

    try {
        let serviceCall = await removeUserService(req.params);
        return res.status(200).json(serviceCall);
    } catch (e) {
        
        next(e);
    }

}