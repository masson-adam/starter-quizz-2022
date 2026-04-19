import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit{

    quiz: Quiz | undefined;

    constructor(private route: ActivatedRoute, private quizService: QuizService) {
        
    }

    ngOnInit(){
        // 1. On récupère l'ID depuis l'URL (snapshot permet de prendre une 'photo' au moment du chargement)
        const id = this.route.snapshot.paramMap.get('id');

        // 2. Si on a bien un ID, on demande au service de nous donner le quiz correspondant
        if (id) {
            this.quiz = this.quizService.getQuiz(id);
        }
    }
    
}
