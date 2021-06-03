import { ObjectId } from "mongodb";

export default interface ShoutOuts {
    _id?: ObjectId
    to: string
    from: string
    message: string
}