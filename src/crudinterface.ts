import {User} from "./user.js";

export interface CRUD<T>
{
    create(object:T) : void;
    read() : void;
    update(object:T) : void;
    delete(object:T) : void;
    cancel(object:T) : void;

}