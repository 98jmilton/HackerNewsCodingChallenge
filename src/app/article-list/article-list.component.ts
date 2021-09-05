import { Component, OnInit } from '@angular/core';
import { Article } from "./article.model";
import { PageEvent } from "@angular/material/paginator";
import { Router } from '@angular/router';

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
  articlesFound = 0;
  baseURL = "https://hacker-news.firebaseio.com/v0/";

  constructor(router: Router) {
    this.articles = [];
    // changing api request based on user selection. fullArticleList is used to toggle the sort order,
    // which is not used when filtering by ask, show or job
    if(router.url=="/Article"){this.selected = 'newstories.json'; this.fullArticleList=true;}
    if(router.url=="/Ask"){this.selected = 'askstories.json'; this.fullArticleList=false;}
    if(router.url=="/Show"){this.selected = 'showstories.json'; this.fullArticleList=false;}
    if(router.url=="/Jobs"){this.selected = 'jobstories.json'; this.fullArticleList=false;}
  }

  ngOnInit(): void {
    this.getArticles(); // gets initial list of articles
  }

  async getArticles(){
    this.loading = true; //used to display the loading spinner until article data ready to be displayed
    this.articles = [];

    //get list of articles from api in order "selected"
    const response = await fetch(this.baseURL + this.selected);
    const articleIDs = await response.json();
    this.articlesFound = articleIDs.length;

    //get article data for display. .slice method gets only articles in the current display range
    let currentPageLower = this.articleAmount * this.currentPage;
    const promises = articleIDs.slice(currentPageLower, currentPageLower+this.articleAmount )
      .map((articleID: string) =>
        fetch(this.baseURL+`item/${articleID}.json`)
          .then(response => response.json()));
    this.articles = await Promise.all(promises);
    this.loading = false;
  }

  updateArticleOrder(selected: string){ // gets new article list in the event of new sorting order being chosen
    this.selected=selected;
    this.currentPage = 0;
    this.getArticles();
  }

  updatePaginator(pageEvent: PageEvent){ // update pagination number of items per page
    this.articleAmount = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex
    this.getArticles();
  }

  convertDate(time: number){ // converts the unix timestamp to a readable date form
    const articleDate = new Date(time*1000)
    return articleDate.toLocaleString();
  }
}

