import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qtitle :any;
  questions:any=[];
  constructor(private route:ActivatedRoute,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    this.qtitle=this.route.snapshot.params['title'];
    this.questionService.getQuestions(this.qId).subscribe(
      (data)=>{
        this.questions=data;
      },
      (error)=>{
        alert("Error");
      }
    );
  }
  deleteQuestion(qId:any){
    if(window.confirm("Are you sure want to delete this question?")){
      this.questionService.deleteQuestion(qId).subscribe(
        (data)=>{
          this.questions=this.questions.filter((question:any)=>question.quesid!=qId);
          alert("Question Deleted");
        },
        (error)=>{
          console.log(error);
          alert("ERROR");
        }
      );
    }
  }
}
