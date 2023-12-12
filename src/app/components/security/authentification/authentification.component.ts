import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { User } from 'src/app/models/users';
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

  emailLogin = "";
  passwordLogin = "";

  nomRegister = "";
  prenomRegister = "";
  emailRegister = "";
  passwordRegister = "";
  statutRegister = "";
  telephoneRegister = "";
  parcourInputRegister = "";

  switchFormValue = true;

  userConnected: any;



  constructor(private authService: AuthService, private route: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  register(){
    const newMentor = new User;

    newMentor.nom = this.nomRegister + this.prenomRegister;
    newMentor.email = this.emailRegister;
    newMentor.password = this.passwordRegister;
    newMentor.parcours = this.parcourInputRegister;
    newMentor.statut = this.statutRegister;
    newMentor.telephone =this.telephoneRegister;


    if (this.emailRegister == "" || this.passwordRegister == "" || this.parcourInputRegister == "" || this.statutRegister == "" || this.telephoneRegister == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs");
    } else {
      this.authService.register(newMentor, (reponse: any) => {
        if (reponse.status_code == 200) {
          this.messageService.showMessage("success", "inscription faite avec succès");

          //revenir à la page de connexion
          this.switchForm();

          //vider les champs
          this.nomRegister = "";
          this.prenomRegister = "";
          this.emailRegister = "";
          this.passwordRegister = "";
          this.statutRegister = "";
          this.telephoneRegister = "";
          this.parcourInputRegister = "";



        } else {
          this.messageService.showMessage("error", "veuillez vérifiez ce que vous avez saisie");
        }
      });
    }
  }

  login() {
    this.loading = true;
    if (this.emailLogin == "" || this.passwordLogin == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs");
    } else {
      //consommer notre service
      this.authService.login({ email: this.emailLogin, password: this.passwordLogin }, (reponse: any) => {

        if (reponse.status_code == 200) {
          this.messageService.showMessage("success", "Connexion faite avec succès");

          //stocker notre les info de la requete dans notre localstorage
          localStorage.setItem("userOnline", JSON.stringify(reponse));

          //recuperer le le userConnecter
          const userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
      this.authService.login(this.emailLogin, this.passwordLogin).pipe(
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

