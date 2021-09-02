import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Article } from "./article.model";

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  private baseURL = "https://hacker-news.firebaseio.com/v0/";

  constructor(private http: HttpClient){}

  async getNewArticles(){
    return await this.http.get<number[]>(this.baseURL + "newstories.json").toPromise();
  }

  async getArticleByID(id: number){
    return await this.http.get<Article>(this.baseURL + "item/" + id.toString() + ".json").toPromise();
  }
}
