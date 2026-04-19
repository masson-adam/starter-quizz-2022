import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question | undefined;

  @Output()
  questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() { }

  ngOnInit() {
  }

  deleteQuestion() {
    if (this.question) {
      this.questionDeleted.emit(this.question);
    }
  }
}