import { User } from "./user";
import { roletype } from "./roletype";
import {CRUD} from "./crudinterface";
import data from "./data.json" assert {type : "json"};


export class usercrud implements CRUD<User>
{
     

    users: User[];
    col: string[];
    tableContainer: HTMLDivElement;
    tableEle : HTMLTableElement;
    user: any;

    constructor()
    {
       this.users = [];
       this.col = [];
       this.tableContainer = document.querySelector('.table')!;
       this.initialize();
       this.tableEle = document.createElement("table");
    
    }

    initialize()
    {
        for (let key in data[0]) {
            if(this.col.indexOf(key) < 0)
            {
                this.col.push(key); 
            }
    }
    data.forEach(object => 
        {
            this.users.push(new this.user(object["FirstName"],object["MiddleName"],object["LastName"],object.Email,object.Phone,object.Role,object.Address));
        }
    )
    }

    load()
    {
        this.tableEle =  document.createElement("table");
        let tr = this.tableEle.insertRow(-1);

        for(let i=0; i< this.col.length;i++)
        {   
            let th = tr.insertCell(i);
            
            th.innerHTML = this.col[i];
            
        }
        this.users.forEach((user) => this.create(user))

    }


    create(user: User)
    {
     
       let tr = document.createElement("tr");
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.addEventListener('click',() => this.update(user));
       editBtn.classList.add("edit");
       let deleteBtn = document.createElement("button");
       deleteBtn = document.createElement("button");
       deleteBtn.innerHTML = "Delete";
    
      deleteBtn.addEventListener('click',()=>this.delete(user));
       deleteBtn.classList.add("dlt");
    
        tr.innerHTML = `<td>${user.FirstName}</td>
                        <td>${user.MiddleName}</td>
                        <td>${user.LastName}</td>
                        <td>${user.Email}</td>
                        <td>${user.Phone}</td>
                        <td>${user.Role}</td>
                        <td>${user.Address}</td>
                        `;
        tr.append(editBtn);
        tr.append(deleteBtn);
        this.tableEle.append(tr);
        this.tableContainer.innerHTML = "";
        this.tableContainer.append(this.tableEle);
        
    }

    read(){
        
    }

    update(user:User)
    {
        let i = this.users.indexOf(user);
        let tr = this.tableEle.children[i+1] as HTMLTableRowElement;
        let editbtn = tr.children[8] as HTMLButtonElement;
        let dltbtn = tr.children[9] as HTMLButtonElement;
        if(editbtn.innerHTML === "Edit")
        {
            tr.contentEditable = "true";
            editbtn.innerHTML = "Save";
            dltbtn.innerHTML = "Cancel";
            editbtn.contentEditable = "false";
            dltbtn.contentEditable = "false";
            let select = document.createElement("select") as HTMLSelectElement;   
            select.classList.add("select");
            for (const i in roletype) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
    
                if (tr.children[6].textContent === i) 
                {
                    option.selected = true;
                }
                else option.selected = false;
                select.appendChild(option);
            }    
             tr.children[6].replaceWith(select);
        }
        else{
            tr.contentEditable = "false";
            editbtn.innerHTML = "Edit";
            dltbtn.innerHTML = "Delete";
            user.id = tr.children[0].textContent !;
            user.FirstName = tr.children[1].textContent !;
            user.MiddleName = tr.children[2].textContent !;
            user.LastName = tr.children[3].textContent !;
            user.Email = tr.children[4].textContent !;
            user.Phone = tr.children[5].textContent !;         
            user.Address = tr.children[7].textContent !;
            for(let i = 0; i<= 2;i++)
            {
                let s = tr.children[6].children[i] as HTMLOptionElement;
                if(s.selected)
                {
                    user.Role = s.textContent!;
                }
            }

            let td = document.createElement("td");
            tr.children[6].replaceWith(td);
            tr.children[6].innerHTML = user.Role;

        }
    }

    
    cancel(user:User)
    {
        let i = this.users.indexOf(user);
        let tr = this.tableEle.children[i+1] as HTMLTableRowElement;
        let editbtn = tr.children[8] as HTMLButtonElement;
        let dltbtn = tr.children[9] as HTMLButtonElement;
    
        tr.contentEditable = "false";
        dltbtn.innerHTML = "Delete";
        editbtn.innerHTML = "Edit";
        this.load();
    }
 
    delete(user: User): void {
       
        let n = this.users.indexOf(user);
        this.tableEle.deleteRow(n + 1);
        this.users.forEach((item, index) => {
            if (item === user) this.users.splice(index, 1);
        });
        this.create(user);
        
    }

    refresh()
    {
        this.users = [];
        this.initialize();
        this.load(); 
    }

}
