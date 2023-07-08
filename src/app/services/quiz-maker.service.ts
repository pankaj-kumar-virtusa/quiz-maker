import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from '../models/category.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizMakerService {
  baseURL: String = 'https://opentdb.com/';
  private resultList:BehaviorSubject<Question[]>;
  resultList$: Observable<Question[]>;
 
  constructor(private httpClient: HttpClient) { 
    this.resultList = new BehaviorSubject<Question[]>([]);
    this.resultList$ = this.resultList.asObservable(); 
  }

  getCategoryList(): Observable<Category[]> {
    const url: string = `${this.baseURL}api_category.php`;
    type CategoryResponse = {trivia_categories: Category[]};

    return this.httpClient.get<CategoryResponse>(url).pipe(
      map(response => response.trivia_categories)
    );
  }

  getQuestionList(questionCount: number, category: number, 
    difficulty: string, type: string): Observable<Question[]> {
    const url: string = `${this.baseURL}api.php?amount=${questionCount}&category=${category}&difficulty=${difficulty.toLowerCase()}&type=${type}`;
    type QuestionListResponse =  {response_code: number,results: Question[]};
    
    return this.httpClient.get<QuestionListResponse>(url).pipe(
      map(response => {
        let questionList =  response.results;
        questionList = questionList.map((question : Question) => {
          let answers = [...question.incorrect_answers, question.correct_answer].map((ans,index) => {
             return {
                description: ans,
                isCorrect: index > 2,
                selected: false
             }
          });
          //shuffle the answers
          question.answers = answers.sort(() => 0.5 - Math.random());
          return question;
       });
       return questionList;
      })
    );
  }

  submitQuizData(questionList: Question[]): void{
    this.resultList.next(questionList);
  }

}

