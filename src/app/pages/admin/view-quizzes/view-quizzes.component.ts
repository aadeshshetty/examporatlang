import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes:any=[
  ];
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.quizzes().subscribe(
      (data)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        alert("Error");
      }
    )
  }
  
  deleteQuiz(qid:any){
    if(window.confirm("Are you sure want to delete this quiz?")){
    this.quizService.deleteQuiz(qid).subscribe(
      (data)=>{
        this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qid!=qid);
        alert("Quiz deleted successfully");
      },
      (error)=>{
        alert("Error");
        console.log(error);
      }
      );
    }
  }

}
