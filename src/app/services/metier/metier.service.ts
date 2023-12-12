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

  private apiUrl = 'http://127.0.0.1:8000/api';

  getAllArticle(){
    return this.http.get(`${url}/articles/articlesNonArchives`);
  }

  // Méthode pour ajouter un utilisateur
  addArticle(article: Article, onSuccess: Function) {
    this.http.post<Article>(`${this.apiUrl}/articles/create`, article).subscribe((response: any) => onSuccess(response));
  }

  getMentorById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/show/${id}`);
  }

  updateMetier(article: Article, id: number): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/articles/edit/${id}`, article)
  }

  archiveMetier(id: number, article: Article):Observable<Article>{
    return this.http.put<Article>(`${this.apiUrl}/articles/archives/${id}`, article)
  }

}
