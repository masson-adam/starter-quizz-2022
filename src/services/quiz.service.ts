import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { HttpClient } from '@angular/common/http';

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
      // 1. On affiche la réponse brute pour comprendre ce que le serveur nous envoie
      console.log('Réponse du serveur :', response); 
      
      // 2. Si dans votre console (F12) vous voyez directement un tableau [...] :
      this.quizzes = response; 
      
      // (Si jamais vous voyez un objet { quizzes: [...] }, alors remettez this.quizzes = response.quizzes;)

      this.quizzes$.next(this.quizzes);
    });
  }
}
