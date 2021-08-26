import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from './../models/country.model';
const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url: string = "https://localhost:44388/api/Countries/";

  constructor(private httpcall: HttpClient) { }

  GetAllCountry() {
    return this.httpcall.get<Country[]>('https://localhost:44388/api/Countries', headerOption);
  }
}
