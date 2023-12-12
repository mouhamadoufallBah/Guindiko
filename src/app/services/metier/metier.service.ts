import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/articles';
import {url} from 'src/app/services/apiUrl'

@Injectable({
  providedIn: 'root'
})
export class MetierService {

  constructor(private http: HttpClient) { }

  getAllArticle(){
    return this.http.get(`${url}articles`);
  }

}
