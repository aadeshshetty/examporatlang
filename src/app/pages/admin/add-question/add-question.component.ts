import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qId:any;
  qtitle:any;
  question={
    quiz:{
      qid:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };
  constructor(private route:ActivatedRoute,private questionService:QuestionService,private router:Router) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    this.question.quiz['qid']=this.qId;
    this.qtitle=this.route.snapshot.params['title'];
  }
  addQuestion(){
    if(this.question.content.trim()=="" || this.question.content==null){
      alert("content is required");
      return;
    }
    if(this.question.option1.trim()=="" || this.question.option1==null){
      alert("Option1 is required");
      return;
    }
    if(this.question.option2.trim()=="" || this.question.option2==null){
      alert("Option2 is required");
      return;
    }
    if(this.question.answer.trim()=="" || this.question.answer==null){
      alert("Answer is required");
      return;
    }
    this.questionService.addQuestion(this.question).subscribe(
      (data)=>{
        alert("Question Added to Quiz");
        this.router.navigate(['admin/view-questions/'+this.qId+'/'+this.qtitle]);
      },
      (error)=>{
        alert("Error");
        console.log(error);
      }
    );
  }

}
