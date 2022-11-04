import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quiz: any;
  title='';
  description='';
  numberOfQuestions=0;
  maxMarks=0;
  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.quizService.getQuiz(this.qid).subscribe(
      (data) => {
        this.quiz = data;
        this.title=this.quiz.title;
        this.description=this.quiz.description;
        this.maxMarks=this.quiz.maxMarks;
        this.numberOfQuestions=this.quiz.numberOfQuestions;
      },
      (error) => {
        console.log(error);
        alert("Error in loading quiz data");
      }
    )
  }
  startQuiz() {
    if (window.confirm("Are you sure want to start the Quiz?")) {
      this.router.navigate(['/start/' + this.qid]);
    }
  }
}
