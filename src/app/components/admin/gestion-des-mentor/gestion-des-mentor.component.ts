import { Component } from '@angular/core';
import { Mentor } from 'src/app/models/mentors';
import { MentorService } from 'src/app/services/mentor/mentor.service';
import { MessageService } from 'src/app/services/message/message.service';
import { MetierService } from 'src/app/services/metier/metier.service';

@Component({
  selector: 'app-gestion-des-mentor',
  templateUrl: './gestion-des-mentor.component.html',
  styleUrls: ['./gestion-des-mentor.component.css']
})
export class GestionDesMentorComponent {
  //variable
  AllmentorData: any = '' ;
  AllArticle: any;
  articles: any;

  currentMentorElt: any;

  // public AllmentorDataLength: number = 0 ;
  prenomMentor = ""
  nomMentor = "";
  emailMentor = "";
  telephoneMentor = "";
  nombre_annee_experienceMentor = 0;
  photo_profil_Mentor = "";
  article_idMentor =1 ;
  passwordMentor = "";
  // descriptionMentor = "";


  constructor(private mentorService: MentorService, private messageService: MessageService,private metierService: MetierService) {
  }

  ngOnInit(): void {
    this.afficher();
    this.getAllArtilce()
  }

  getAllArtilce(){
    this.metierService.getAllArticle().subscribe(
      (data) => {
        this.AllArticle = data;
       this.articles = this.AllArticle.article;

      }
    );
  }

  afficher() {
    this.mentorService.getAllMentors().subscribe((data) => {
      this.AllmentorData = data;
      // console.log(this.AllmentorData.Mentor.length);
    });
  }

  addUser() {
    const newMentor = new Mentor;

    newMentor.nom = this.prenomMentor + " " + this.nomMentor;
    newMentor.email = this.emailMentor;
    newMentor.photo_profil = this.photo_profil_Mentor;
    newMentor.password = this.passwordMentor;
    newMentor.telephone = this.telephoneMentor;
    newMentor.nombre_annee_experience = this.nombre_annee_experienceMentor
    newMentor.articles_id = this.article_idMentor


    if (this.nomMentor == "" || this.emailMentor == "" || this.passwordMentor == "" || this.telephoneMentor == "" || this.nombre_annee_experienceMentor == null || this.article_idMentor == null) {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      this.mentorService.addUser(newMentor, (reponse: any) => {
        // console.log(reponse);
        if (reponse.status_code == 200) {
          this.messageService.showMessage("success", "Ajout faite avec succès");

          //vider les champs
          this.nomMentor = "";
          this.emailMentor = "";
          this.photo_profil_Mentor = "";
          this.passwordMentor = "";
          this.telephoneMentor = "";
          this.nombre_annee_experienceMentor = 0;
          this.article_idMentor =1 ;
          // this.descriptionMentor = "";
          // console.log(reponse);
        } else {
          this.messageService.showMessage("error", "veuillez vérifiez ce que vous avez saisie");
          // console.log(reponse);
        }
      });
      }
  }

  getMentorById(id: number){
    this.mentorService.getMentorById(id).subscribe(
      (data)=>{
        this.currentMentorElt = data;
        console.log(this.currentMentorElt.mentor[0], 'aze');
      }
    );
  }

  updateMentor(){



    // this.mentorService.updateMentor()
  }
}
