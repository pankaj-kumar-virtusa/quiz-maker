import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { BtnHoverDirective } from './directives/btn-hover.directive';
import { EscapeHtmlPipe } from './pipes/escape-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreateQuizComponent,
    QuizQuestionComponent,
    QuizResultComponent,
    BtnHoverDirective,
    EscapeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
