import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  questions:any;
  length=0;
  marksObtained=0;
  correctAnswer=0;
  Attempted=0;
  isSubmit=false;
  timer:any;

  constructor(private locationSt:LocationStrategy,private route:ActivatedRoute,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this.route.snapshot.params['qid'];
    this.loadQuestion();
  }
  loadQuestion(){
      this.questionService.getQuestions(this.qid).subscribe(
      (data)=>{
        this.questions=data;
        // console.log(this.questions);
        this.length=this.questions.length;
        this.timer=this.questions.length*1*60;
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        alert("ERROR loading Questions");
      }
    )
  }
  preventBackButton(){
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null, '', location.href);
    });
  }
  evalQuiz(){
    this.isSubmit=true;
    //   this.questions.forEach((q:any)=>{
    //     if(q.givenAnswer==q.answer){
    //       this.correctAnswer++;
    //       let marks=this.questions[0].quiz.maxMarks/this.questions.length;
    //       this.length=this.questions.length;
    //       this.marksObtained+=marks;
    //     }
    //     if(q.givenAnswer.trim()!=''){
    //       this.Attempted++;
    //     }
    //   });
      // console.log(this.correctAnswer);
      // console.log(this.length);
      this.questionService.evalQuiz(this.questions).subscribe(
        (data)=>{
          this.marksObtained=parseFloat(Number(data["marksObtained"]).toFixed(2));
          this.Attempted=data["Attempted"];
          this.correctAnswer=data["correctAnswer"];
        },
        (error)=>{
          console.log(error);
          alert("ERROR");
        }
      )
    }

  submitQuiz(){
    if (window.confirm("Are you sure want to submit the Quiz?")) {
      // console.log(this.questions);
      this.evalQuiz();
    }
  }
  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }
  formattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }
  print(){
    window.print();
  }
}
