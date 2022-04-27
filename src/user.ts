import {roletype} from "./roletype";
export class User{

   constructor(public id:string, public FirstName:string, public MiddleName :string, public LastName:string,
      public Email:string, public Phone: string,public Role: string, public Address: string)
   {

   }
}