import { Component, OnInit } from '@angular/core';
import { Article } from "./article.model";

@Component({
  selector: 'app-articlelist',
  templateUrl: './article-list.component.html'
})
export class ArticlelistComponent implements OnInit {
  articles: Article[];
  selected = 'newstories.json';
  baseURL = "https://hacker-news.firebaseio.com/v0/";

  constructor() {
    this.articles = [];
  }

  ngOnInit(): void {
    this.getArticles();
  }

  async getArticles(){
    this.articles = [];

    const response = await fetch(this.baseURL + this.selected);
    const articleIDs = await response.json();

    const promises = articleIDs.slice(10, 22)
      .map((articleID: string) =>
        fetch(this.baseURL+`item/${articleID}.json`)
          .then(response => response.json()));
    this.articles = await Promise.all(promises);
  }

  updateArticleList(selected: string){
    this.selected=selected
    this.getArticles();
  }

  convertDate(time: number){
    const articleDate = new Date(time*1000)

    return articleDate.toLocaleString();
  }
}

