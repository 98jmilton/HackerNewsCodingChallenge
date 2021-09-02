import { Component, OnInit } from '@angular/core';
import { Article } from "../articleAPI/article.model";
import { ArticleService } from "../articleAPI/article.service";

@Component({
  selector: 'app-articlelist',
  templateUrl: './article-list.component.html'
})
export class ArticlelistComponent implements OnInit {
  articles: Article[];

  constructor(private articleService: ArticleService) {
    this.articles = [];
  }

  async ngOnInit() {
    var articleIDs = await this.articleService.getNewArticles();
    console.log(articleIDs);

    articleIDs.forEach(async (articleID) => {
      var article = await this.articleService.getArticleByID(articleID);
      this.articles.push(article);
    });

    console.log(this.articles);
  }
}
