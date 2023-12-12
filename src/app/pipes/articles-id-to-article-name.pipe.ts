import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articlesIdToArticleName'
})
export class ArticlesIdToArticleNamePipe implements PipeTransform {

  transform(article_id: number, articles: any[]): string {
    const article = articles.find(article => article.id === article_id);
    console.log(article)
    console.log(article_id)
    return article ? article.libelle : 'N/A';
  }

}
