import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuetionServiceService } from 'src/app/service/quetion-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  name: string = '';
  questionList: any = [];
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted:boolean=false;
  constructor(private questionService: QuetionServiceService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestion();
    this.startCounter();
  }
  getAllQuestion() {
    this.questionService.getQuesJSON().subscribe((res: any) => {
      this.questionList = res.questions;
    });
  }
  nextQuestion() {
    this.currentQuestion += 1;
  }
  previousQuestion() {
    this.currentQuestion -= 1;
  }
  answer(currentQno: number, option: any) {
    if(currentQno==this.questionList.length){
      this.isQuizCompleted=true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer += 1;
      setTimeout(() => {
        this.currentQuestion += 1;
        this.resetCounter();
        this.getProgressPercentage();
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion += 1;
        this.inCorrectAnswer += 1;
        this.resetCounter();
        this.getProgressPercentage();
      }, 1000);
      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 60;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
    this.progress = '0';
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestion();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
  }
  getProgressPercentage() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }
}
