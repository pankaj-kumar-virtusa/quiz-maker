import { Component, OnInit } from '@angular/core';
import { Answer, Question } from 'src/app/models/question.model';
import { QuizMakerService } from 'src/app/services/quiz-maker.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  resultList: Question[] = [];
  score: number = 0;
  scoreBgColor: string = '';

  constructor(private quizMakerService: QuizMakerService){}

  ngOnInit(): void {
    this.quizMakerService.resultList$.subscribe((result: Question[]) => {
      this.resultList = result;
      this.setScore();
      this.scoreBgColor = this.score < 2 ? 'red' :
                                            this.score > 3 ? 'green' : 'yellow'; 
    });

  }

  setScore(): void{
   this.resultList.forEach((result: Question) => {
      result.answers?.forEach((ans:Answer) => {
        if(ans.selected && ans.isCorrect){
          this.score++;
        }
      });
   });   
  }

}
