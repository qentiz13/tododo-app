import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { User } from './user';
//import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: User;
  users: User[]=[];

  ngOnInit(){
    
   }

  constructor(private _dataService: DataService){ 
    
    this._dataService.getUsers().subscribe(res=>this.users=res);
    //this._dataService.insertUser();
    //.subscribe(resNewUserName =>{
    //  this.users.push(resNewUserName);
   // });
  }
  insertUser(name){

    console.log("aaa");
    console.log(name.value);
    console.log("bbb");
    var result;
    var newUser={
      name: name.value
    };
    result = this._dataService.saveUser(newUser);
    result.subscribe(x => {
      this.users.push(newUser);
    })


  }
  

}
