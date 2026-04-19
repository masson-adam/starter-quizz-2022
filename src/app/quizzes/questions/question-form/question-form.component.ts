import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Quiz } from '../../../../models/quiz.model';
import { QuizService } from '../../../../services/quiz.service';
import { Question } from '../../../../models/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz | undefined;

  public questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    // Initialisation du formulaire avec un champ pour le titre de la question
    this.questionForm = this.formBuilder.group({
      label: ['']
    });
  }

  ngOnInit() {
  }

  addQuestion() {
    if (this.questionForm.valid && this.quiz) {
      const question = this.questionForm.getRawValue() as Question;
      
      // On demande au service d'ajouter cette question à ce quiz précis
      this.quizService.addQuestion(this.quiz, question);
      
      // Optionnel : on remet le formulaire à zéro après l'ajout
      this.questionForm.reset();
    }
  }
}