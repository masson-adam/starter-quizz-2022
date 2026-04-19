import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private url = 'https://raw.githubusercontent.com/NablaT/starter-quiz-two/master/mock-quiz.json';

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);

  constructor(private http: HttpClient) {
    this.getQuizzes();
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject

    this.quizzes.push(quiz);
    
    //on met à jour l'observable
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz : Quiz){
    // On garde tous les quiz SAUF celui qu'on veut supprimer
    this.quizzes = this.quizzes.filter(q => q !== quiz);
    this.quizzes$.next(this.quizzes);
  }

  getQuizzes(){
    this.http.get(this.url).subscribe((response: any) => {
      // (Gardez response ou response.quizzes selon ce qui marchait pour vous à l'étape précédente)
      let list = response.quizzes || response; 

      // On s'assure que chaque quiz a bien un ID
      list.forEach((quiz: Quiz, index: number) => {
        if (!quiz.id) {
          // S'il n'a pas d'id, on lui en donne un arbitraire (ex: "quiz-1", "quiz-2")
          quiz.id = 'quiz-' + index; 
        }
      });

      this.quizzes = list;
      this.quizzes$.next(this.quizzes);
    });
  }

  // Retourne le quiz dont l'id correspond à celui passé en paramètre
  getQuiz(id: string): Quiz | undefined {
    return this.quizzes.find(q => q.id == id);
  }

  /**
   * Ajoute une question à un quiz spécifique
   */
  addQuestion(quiz: Quiz, question: Question) {
    // 1. Par sécurité, on s'assure que le tableau de questions existe
    if (!quiz.questions) {
      quiz.questions = [];
    }

    // 2. On ajoute la nouvelle question au tableau de ce quiz
    quiz.questions.push(question);

    // 3. On prévient l'application que les données ont changé
    this.quizzes$.next(this.quizzes);
  }

  /**
   * Supprime une question d'un quiz spécifique
   */
  deleteQuestion(quiz: Quiz, question: Question) {
    // 1. On remplace le tableau de questions par un nouveau tableau 
    // qui contient toutes les questions SAUF celle qu'on veut supprimer
    quiz.questions = quiz.questions.filter((q) => q !== question);

    // 2. On prévient l'application que les données ont changé
    this.quizzes$.next(this.quizzes);
  }
}
