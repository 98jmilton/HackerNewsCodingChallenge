import { Component, OnInit } from '@angular/core';
import { Article } from "./article.model";
import { PageEvent } from "@angular/material/paginator";
import { Router} from '@angular/router';

@Component({
  selector: 'app-articlelist',
  templateUrl: './article-list.component.html'
})
export class ArticlelistComponent implements OnInit {
  articles: Article[];
  selected = 'newstories.json';
  fullArticleList = true;
  loading = false;
  articleAmount = 30;
  currentPage = 1;
  articlesFound: number = 0;
  baseURL = "https://hacker-news.firebaseio.com/v0/";

  constructor(router: Router) {
    this.articles = [];
    if(router.url=="/Article"){this.selected = 'newstories.json'; this.fullArticleList=true;}
    if(router.url=="/Ask"){this.selected = 'askstories.json'; this.fullArticleList=false;}
    if(router.url=="/Show"){this.selected = 'showstories.json'; this.fullArticleList=false;}
    if(router.url=="/Jobs"){this.selected = 'jobstories.json'; this.fullArticleList=false;}
  }

  ngOnInit(): void {
    this.getArticles();
  }

  async getArticles(){
    this.loading = true;
    this.articles = [];

    const response = await fetch(this.baseURL + this.selected);
    const articleIDs = await response.json();
    this.articlesFound = articleIDs.length;
    var currentPageLower = this.articleAmount*this.currentPage
    const promises = articleIDs.slice(currentPageLower, currentPageLower+this.articleAmount )
      .map((articleID: string) =>
        fetch(this.baseURL+`item/${articleID}.json`)
          .then(response => response.json()));
    this.articles = await Promise.all(promises);
    this.loading = false;
  }

  updateArticleList(selected: string){
    this.selected=selected;
    this.currentPage = 0;
    this.getArticles();
  }


  changeArticlesPerPage(pageEvent: PageEvent){
    this.articleAmount = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex
    this.getArticles();
  }

  convertDate(time: number){
    const articleDate = new Date(time*1000)
    return articleDate.toLocaleString();
  }
}

