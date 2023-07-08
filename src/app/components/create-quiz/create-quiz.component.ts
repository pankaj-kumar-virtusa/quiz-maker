import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, Difficulty } from 'src/app/models/category.model';
import { Answer, Question } from 'src/app/models/question.model';
import { QuizMakerService } from 'src/app/services/quiz-maker.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent  implements OnInit, OnDestroy{
  questionCount = 5;
  type: string = 'multiple';
  categoryList:  Category[] = [];
  questionList: Question[] = [];
  showSubmit: boolean = false;
  categoryListSubscription: Subscription = new Subscription();
  questionListSubscription: Subscription = new Subscription();
  difficultyList: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  constructor(private quizMakerService: QuizMakerService, private router: Router) {}

  ngOnInit(): void {
    this.categoryListSubscription = this.quizMakerService.getCategoryList().subscribe(
        { 
          next: response => { this.categoryList = response},
         error: err => { console.log(err)}
        }
      );
  }

  getQuestionList(form: NgForm){
    let category: number = form.value.categorySelect;
    let difficultyLevel: string = form.value.difficultySelect;

      this.questionListSubscription = this.quizMakerService.getQuestionList(this.questionCount, category, difficultyLevel, this.type).subscribe(
        { 
          next: res => { this.questionList = res},
          error: err => { console.log(err)}
        }
      );
  }

  enableSubmit(): void{
    let answerSelectedCount = 0;
      
    this.questionList.forEach((question: Question) => {
      question.answers?.forEach((answer: Answer) => {
        if(answer.selected) {
           answerSelectedCount++;
        }
      });
      if(answerSelectedCount === this.questionCount){
        this.showSubmit = true;
      }
    });
  }

  onSubmitQuiz(): void {
    this.quizMakerService.submitQuizData(this.questionList);
    this.router.navigate(['/result']);
  }
  ngOnDestroy(): void {
    this.categoryListSubscription.unsubscribe();
    this.questionListSubscription.unsubscribe();
  }
}
