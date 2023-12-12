import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from 'src/app/models/mentors';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8000/api'


  getAllMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(`${this.apiUrl}/mentor`);
  }

  // Méthode pour ajouter un utilisateur
  addUser(mentor: Mentor, onSuccess: Function) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    this.http.post<Mentor>(`${this.apiUrl}/registerMentor`, mentor).subscribe((response: any) => onSuccess(response));
  }

  getMentorById(id: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.apiUrl}/mentor/show/${id}`);
  }

  updateMentor(mentor: Mentor, id: number): Observable<Mentor> {
    return this.http.put<Mentor>(`${this.apiUrl}/mentor/edit/${id}`, mentor)
  }

  archiveMentor(id: number, mentor: Mentor):Observable<Mentor>{
    return this.http.put<Mentor>(`${this.apiUrl}/mentor/archive/${id}`, mentor)
  }
}
