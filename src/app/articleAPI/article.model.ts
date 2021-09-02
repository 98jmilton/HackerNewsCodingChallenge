export class Article {
  constructor(
    public id: number,
    public deleted: boolean,
    public type: string,
    public by: string,
    public time: number,
    public text: string,
    public dead: boolean,
    public parent: number,
    public poll: number,
    public kids: number[],
    public url: string,
    public score: number,
    public title: string,
    public parts: number[],
    public descendants: number
  ) {}
}
