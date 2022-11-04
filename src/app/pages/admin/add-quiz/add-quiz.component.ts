import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories:any=[
  ];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  };
  constructor(private categoryService:CategoryService,private quizService:QuizService,private router:Router) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data)=>{
        this.categories=data;
        console.log(this.categories);
        
      },
      (error)=>{
        console.log(error);
        alert("Error");
      }
    );
  }
  addQuiz(){
    if(this.quizData.title.trim()==''|| this.quizData.title==null){
      alert("Title is required!");
      return;
    }
    this.quizService.addQuiz(this.quizData).subscribe(
      (data)=>{
        alert("Success");
        this.router.navigate(['admin/quizzes']);
      },
      (error)=>{
        alert("Error");
        console.log(error);
      }
    )
  }
}
