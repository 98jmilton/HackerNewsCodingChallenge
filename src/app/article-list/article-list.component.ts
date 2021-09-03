import { Component, OnInit } from '@angular/core';
import { Article } from "../articleAPI/article.model";
import { ArticleService } from "../articleAPI/article.service";

@Component({
  selector: 'app-articlelist',
  templateUrl: './article-list.component.html'
})
export class ArticlelistComponent implements OnInit {
  articles: Article[];
  selected = 'newstories.json';

  constructor(private articleService: ArticleService) {
    this.articles = [];
  }

  ngOnInit(): void {
    this.getArticles(this.selected);
  }

  async getArticles(articleOrder: string){
    this.articles = [];
    console.log(this.articles);
    let articleIDs = await this.articleService.getArticles(articleOrder);
    for (const articleID of articleIDs) {
      var article = await this.articleService.getArticleByID(articleID);
      this.articles.push(article);
    }
  }

  updateArticleList(selected: string){
    this.selected=selected
    this.getArticles(this.selected);
  }

  convertDate(time: number){
    const articleDate = new Date(time*1000)

    return articleDate.toLocaleString();
  }
}

