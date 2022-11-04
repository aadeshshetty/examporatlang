import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  cId:any;
  quizzes:any;
  title='';
  constructor(private route:ActivatedRoute,private quizService:QuizService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.cId=params['cId'];
        if(this.cId==0){
          this.quizService.getActiveQuizzes().subscribe(
            (data:any)=>{
              console.log(data);
              this.quizzes=data;
              this.title=this.quizzes.title;
            },
            (error)=>{
              console.log(error);
              alert("ERROR");
            }
          );
        }else{
          this.quizzes=[];
          this.quizService.getActiveQuizzesOfCategory(this.cId).subscribe(
            (data)=>{
              this.quizzes=data;
            },
            (error)=>{
              console.log(error);
              alert("ERROR");
            }
          );
        }
      }
    );
  }

}
