import mongoose, { models, Schema, Document } from "mongoose";
import { IUser } from "../../types/user";

export interface ICommentBase {
    user: IUser;
    text: string;
}

export interface IComment extends Document, ICommentBase{
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
    user: {
        userId: {type: String, required: true},
        uesrImage: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String}
    },
    text: {type: String, required: true}
}, {timestamps: true});

export const Comment = models.Comment || mongoose.model<IComment>("Comment", CommentSchema);