import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  public getQuestions(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }
  public getQuestion(quesid:any){
    return this.http.get(`${baseUrl}/question/${quesid}`);
  }
  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/question/`,question);
  }
  public deleteQuestion(qId:any){
    return this.http.delete(`${baseUrl}/question/delete/${qId}`);
  }
  public updateQuestion(question:any){
    return this.http.put(`${baseUrl}/question/update`,question);
  }
  public evalQuiz(question:any){
    return this.http.post(`${baseUrl}/question/evaluate-quiz`,question);
  }
}
