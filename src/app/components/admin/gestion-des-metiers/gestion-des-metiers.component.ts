import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles';
import { Mentor } from 'src/app/models/mentors';
import { MessageService } from 'src/app/services/message/message.service';
import { MetierService } from 'src/app/services/metier/metier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-des-metiers',
  templateUrl: './gestion-des-metiers.component.html',
  styleUrls: ['./gestion-des-metiers.component.css']
})
export class GestionDesMetiersComponent implements OnInit {

  AllArticle: any;
  articles: any;

  currentMetierElt: any;

  currentArticle: any;


  libelleAdd: string = "";
  imageAdd: string = "";
  deboucheAdd: string = "";
  descriptionAdd: string = "";
  datePublicationAdd: string = "";

  titreUpdate: string = "";
  imageUpdate: string = "";
  deboucheUpdate: string = "";
  descriptionUpdate: string = "";
  datePublicationUpdate: string = "";




  constructor(private http: HttpClient, private messageService: MessageService, private metierService: MetierService) { }
  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle() {
    this.metierService.getAllArticle().subscribe(
      data => {
        this.articles = data;

        this.AllArticle = this.articles.article;

        //console.log(data);
      }
    )
  }

  addArticle() {
    const article = new Article;

    article.libelle = this.libelleAdd;
    article.image = this.imageAdd;
    article.debouche = this.deboucheAdd;
    article.description = this.descriptionAdd;
    article.date_publication = this.datePublicationAdd;

    console.log(this.libelleAdd, this.imageAdd, this.deboucheAdd, this.descriptionAdd)

    if (this.libelleAdd == "" || this.imageAdd == "" || this.deboucheAdd == "" || this.descriptionAdd == "") {
      this.messageService.showMessage("error", "Veuillez remplir tout les champs")
    } else {
      this.metierService.addArticle(article, (reponse: any) => {
        console.log(reponse);
        if (reponse.status_code == 200) {
          this.messageService.showMessage("success", "Ajout faite avec succès");
          this.getAllArticle();
          //vider les champs
          this.libelleAdd = "";
          this.imageAdd = "";
          this.deboucheAdd = "";
          this.descriptionAdd = "";
          this.datePublicationAdd = "";

        } else {
          this.messageService.showMessage("error", "veuillez vérifiez ce que vous avez saisie");
          // console.log(reponse);
        }
      });
    }
  }


  getMetierById(id: number) {
    this.metierService.getMentorById(id).subscribe(
      (data) => {
        this.currentMetierElt = data;

        this.currentArticle = this.currentMetierElt.article;

        console.log(this.currentArticle)

        this.titreUpdate = this.currentArticle.libelle;
        this.imageUpdate = this.currentArticle.image;
        this.deboucheUpdate = this.currentArticle.debouche;
        this.descriptionUpdate = this.currentArticle.description;
        this.datePublicationUpdate = this.currentArticle.date_publication;

        // this.passwordMentorUpdate = this.currentMentorElt.mentor.password ;
      }
    );
    // alert(id)
  }



  updateMetier(id: number) {
    const articleToUpdate = new Article;

    articleToUpdate.libelle = this.titreUpdate;
    articleToUpdate.image = this.imageUpdate;
    articleToUpdate.debouche = this.deboucheUpdate;
    articleToUpdate.description = this.descriptionUpdate;
    articleToUpdate.date_publication = this.datePublicationUpdate;


    if (this.titreUpdate == "" || this.imageUpdate == "" || this.descriptionUpdate == null) {
      this.messageService.showMessage("error", "Veuillez remplir tous les champs");
    } else {
      this.metierService.updateMetier(articleToUpdate, id).subscribe(
        (data) => {
          this.messageService.showMessage("success", "Modification avec succées");
          this.getAllArticle();
        }
      );
    }

  }

  archiveMetierById(id: number) {
    const metier = new Article(); // Vous pouvez également récupérer les données du mentor si nécessaire

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
          text: "Ce metier a été archiver avec succées ",
          icon: "success"
        });

        this.metierService.archiveMetier(id, metier).subscribe(
          (response) => {
            this.getAllArticle();
          },
          (error) => {
            console.error('Erreur lors de l\'archivage du mentor', error);

          }
        );
      }
    });
  }
}
