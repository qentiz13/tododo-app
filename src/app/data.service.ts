import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Text } from '@angular/compiler';
import { User } from './user';
import { FormsModule } from '@angular/forms';

@Injectable()
export class DataService {

  result: any;
  private _getUrl="api/users";

  private _postUrl="api/new";

  constructor(private _http: Http) { 
    
  }

  getUsers(){
    return this._http.get("api/users").map(result=>this.result = result.json().data)
  }

  saveUser(user){

    //console.log(user.name)
    //var Auser: User;
    //Auser=form.value;
    var headers = new Headers({'Content-Type':'application/json'});
    return this._http.post("api/new", JSON.stringify(user),{headers:headers}).map(res=>res.json());
  }
}
