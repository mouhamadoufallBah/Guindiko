import { Component } from '@angular/core';
import { Mentor } from 'src/app/models/mentors';
import { MentorService } from 'src/app/services/mentor/mentor.service';
import { MessageService } from 'src/app/services/message/message.service';
import { MetierService } from 'src/app/services/metier/metier.service';
import Swal from 'sweetalert2';

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

  prenomMentorUpdate = ""
  nomMentorUpdate = "";
  emailMentorUpdate = "";
  telephoneMentorUpdate = "";
  nombre_annee_experienceMentorUpdate = 0;
  photo_profil_MentorUpdate = "";
  article_idMentorUpdate =1 ;
  passwordMentorUpdate = "";

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
        console.log(this.currentMentorElt, 'aze');

        this.prenomMentorUpdate = this.currentMentorElt.mentor.nom;
        this.nomMentorUpdate = "";
        this.emailMentorUpdate = this.currentMentorElt.mentor.email;
        this.telephoneMentorUpdate = this.currentMentorElt.mentor.telephone;
        this.nombre_annee_experienceMentorUpdate = this.currentMentorElt.mentor.nombre_annee_experience;
        this.photo_profil_MentorUpdate = this.currentMentorElt.mentor.photo_profil;
        this.article_idMentorUpdate =this.currentMentorElt.mentor.articles_id ;
        // this.passwordMentorUpdate = this.currentMentorElt.mentor.password ;
      }
    );
    // alert(id)
  }



  updateMentor(id: number){
    const mentorToUpdate = new Mentor;

    mentorToUpdate.nom = this.prenomMentorUpdate + " " + this.nomMentorUpdate;
    mentorToUpdate.email = this.emailMentorUpdate;
    mentorToUpdate.photo_profil = this.photo_profil_MentorUpdate;
    mentorToUpdate.password = this.passwordMentorUpdate;
    mentorToUpdate.telephone = this.telephoneMentorUpdate;
    mentorToUpdate.nombre_annee_experience = this.nombre_annee_experienceMentorUpdate;
    mentorToUpdate.articles_id = this.article_idMentorUpdate;

    if (this.emailMentorUpdate == "" || this.telephoneMentorUpdate == "" || this.nombre_annee_experienceMentorUpdate == null) {
      this.messageService.showMessage("error", "Veuillez remplir tous les champs")
    }else{

      this.mentorService.updateMentor(mentorToUpdate, id).subscribe(
        (data)=> {
          console.log(data);

        }
      );
    }

  }

  archiveMentorById(id: number) {
    const mentor = new Mentor(); // Vous pouvez également récupérer les données du mentor si nécessaire

    Swal.fire({
      title: "Etes vous sûr?",
      text: "de vouloir archiver",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, Je confirme"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Archiver!",
          text: "Ce mentor a été archiver avec succées ",
          icon: "success"
        });

        this.mentorService.archiveMentor(id, mentor).subscribe(
          (response) => {
            this.AllmentorData;
          },
          (error) => {
            console.error('Erreur lors de l\'archivage du mentor', error);

          }
        );
      }
    });


  }
}
