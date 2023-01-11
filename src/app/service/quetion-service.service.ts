import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuetionServiceService {

  constructor(private http:HttpClient) { }

  getQuesJSON(){
    return this.http.get("assets/questions.json")
  }
}
