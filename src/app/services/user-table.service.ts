import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from './../models/country.model';
import { Input1 } from '../models/input1.model';
import { Input2 } from '../models/input2.model';
import { User } from '../models/user.model';
const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserTableService {

  url: string = "https://localhost:44388/api/Usertable1/";

  constructor(private httpcall: HttpClient) { }

  IsUserNameExists(x: Input1) {
    return this.httpcall.post(this.url + 'IsUserNameExists', x, headerOption);
  }
  IsEmailExists(x: Input2) {
    return this.httpcall.post(this.url + 'IsEmailExists', x, headerOption);
  }
  CreateUser(x: User) {
    return this.httpcall.post('https://localhost:44388/api/Usertable1', x, headerOption);
  }
}
