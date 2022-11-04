import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  quesid=0;
  qtitle:any;
  question:any;
  constructor(private questionService:QuestionService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.quesid=this.route.snapshot.params['quesid'];
    this.qtitle=this.route.snapshot.params['title'];
    this.questionService.getQuestion(this.quesid).subscribe(
      (data)=>{
        this.question=data;
      },
      (error)=>{
        console.log(error);
        alert("Error loading question");
      }
    );
  }
  updateQuestion(){
    this.questionService.updateQuestion(this.question).subscribe(
      (data)=>{
        alert("Update Succesfull");
        this.router.navigate(['admin/view-questions/'+this.question.quiz.qid+'/'+this.qtitle]);
      },
      (error)=>{
        console.log(error);
        alert("ERROR");
      }
    );
  }
}
