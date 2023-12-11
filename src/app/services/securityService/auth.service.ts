import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { MessageService } from '../message/message.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false); //var super globale initialisé à false permet de savoir si user est auth ou pas
  isAdmin$ = new BehaviorSubject<boolean>(false); //var super globale initialisé à false permet de savoir si user est auth ou pas
  isMentor$ = new BehaviorSubject<boolean>(false); //var super globale initialisé à false permet de savoir si user est auth ou pas
  isMontore$ = new BehaviorSubject<boolean>(false); //var super globale initialisé à false permet de savoir si user est auth ou pas
  private authToken = '';
  private userId = '';
  private userObj = {};

  constructor(private http: HttpClient, private message: MessageService, private route: Router) { }

  // Retourne la val du token envoyé par le back sous forme d'objet => Exemple :  { "userId": "6477aad2457309c8a3e3d031", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc3YWFkMjQ1NzMwOWM4YTNlM2QwMzEiLCJpYXQiOjE2ODU2MjMzOTksImV4cCI6MTY4NTcwOTc5OX0.18cpQsPFDGJWTFKeRHn92mOwLS04BDDAeewWo582rvM"}
  getToken() {
    return this.authToken;
  }

  // Retourne la val du token envoyé par le back sous forme d'objet
  getUserId() {
    return this.userId;
  }

  getUser() {
    return this.userObj
  }

  getAllUser() {
    return this.http.get<User[]>(`http://localhost:8000/user/index`);
  }


  login(email: string, password: string) {
    return this.http.post<{ status_body: string, token: string }>('http://localhost:8000/api/login', { email: email, password: password }).pipe(
      tap(({ status_body, token }) => {
        this.userObj = status_body;
        this.authToken = token;

        localStorage.setItem('token', JSON.stringify(this.authToken));
        localStorage.setItem('userConnected', JSON.stringify(this.userObj));

        this.isAuth$.next(true); // on met à je la val de isAuth$

      })
    );
  }

  register(mentore: User):Observable<User>{
    return this.http.post<User>('http://localhost:8000/api/register', mentore);
  }

  logout() {
    // On vide les infos du token et on met à je la val de isAuth$
    this.authToken = '';
    this.userId = '';
    this.isAuth$.next(false);
    this.isAdmin$.next(false);
    this.route.navigate(['login']);
  }

}
