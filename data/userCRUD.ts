import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { connectToDB } from '../database/config.ts';


export const createUser = async (data: any): Promise<any> => {
    (await connectToDB()).insertOne(data);
    
    return (await connectToDB()).findOne(data);

};

export const getUserById = async (query: any): Promise<any> => {

    return (await connectToDB()).findOne({ _id: ObjectId(query) });
}

export const updateUser = async (filter: any, updateBody: any): Promise<any> => {
    return (await connectToDB()).updateOne({ username: filter.username, 
                                            password: filter.password, 
                                            _id: ObjectId(filter.id), 
                                            name: filter.name,
                                            age: filter.age,
                                            email: filter.email}, updateBody);
};

export const deleteUser = async (filterId: any): Promise<any> => {

    console.log(filterId);
    return (await connectToDB()).deleteOne({_id: ObjectId(filterId)});
};