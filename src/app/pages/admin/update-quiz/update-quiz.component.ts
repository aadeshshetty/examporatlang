import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  
  qId=0;
  quiz:any;
  categories:any;
  constructor(private route:ActivatedRoute,private quizService:QuizService,private categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    this.quizService.getQuiz(this.qId).subscribe(
      (data)=>{
        this.quiz=data;
      },
      (error)=>{
        alert("Error");
        console.log(error);
        
      }
    );
    this.categoryService.categories().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
        alert("Error");
        console.log(error);        
      }
    );
  }

  formSubmit(){
    if(this.quiz.title.trim()==''|| this.quiz.title==null){
      alert("Title is required!");
      return;
    }
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data)=>{
       alert("update Successfull");
       this.router.navigate(['admin/quizzes']);
      },
      (error)=>{
        console.log(error);
        alert("Error");
      }
    )
  }

}
