import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { AuthService } from 'src/app/services/securityService/auth.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  loading!: boolean;
  errorMsg!: string;

  email = "";
  password = "";

  switchFormValue = true;

  userConnected: any;



  constructor(private authService: AuthService, private route: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    if (this.email == "" || this.password == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs");
    } else {
      this.authService.login(this.email, this.password).pipe(
        tap(() => {
          let userCon = JSON.parse(localStorage.getItem('userConnected') || '');

          this.loading = false;

          if (userCon.role == "admin") {
            this.route.navigate(['/dashboard-admin']);
          }else if (userCon.role === "mentor") {
            this.route.navigate(['/dashboard-mentor']);
          }else {
            this.route.navigate(['/acceuil']);
          }
        }),
        catchError(error => {
          this.loading = false;
          this.errorMsg = error.message;
          return EMPTY;
        })
      ).subscribe();

    }
  }

  logout() {
    this.authService.logout()
  }

  switchForm() {
    this.switchFormValue = !this.switchFormValue;
  }
}

