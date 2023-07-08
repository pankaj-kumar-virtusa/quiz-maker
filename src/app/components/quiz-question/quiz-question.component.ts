import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer, Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent {

  @Input()
  question!: Question;

  @Input()
  resultMode?: boolean = false;

  @Output()
  answerSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onOptionSelect(answer: string): void {
    if(this.resultMode) return;
    
    this.question.answers?.forEach((ans: Answer) => {
      if(ans.description === answer) {
        ans.selected = true;
      } else {
        ans.selected = false;
      }
    });
    this.answerSelected.emit('selected');
  }
}
