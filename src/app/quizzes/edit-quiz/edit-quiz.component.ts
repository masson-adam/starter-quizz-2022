import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit{

    @Input() quiz: Quiz;
    @Output() quizUpdated = new EventEmitter<Quiz>();

    constructor(quiz: Quiz) {
        this.quiz = quiz;
    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    
}
