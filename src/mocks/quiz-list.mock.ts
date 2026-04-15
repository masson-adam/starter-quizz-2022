import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_ACTOR: Question = {
    label: 'Jean Gabin a joué dans...',
    answers: [
        {
            value: 'Les tuches II',
            isCorrect: false,
        },
        {            
            value: 'La grande illusion',
            isCorrect: true,
        }
    ]
};

export const QUESTION_SPORT: Question = {
    label : "Quel est le meilleur sport au monde ?",
    answers:[
        {
            value : "Le football",
            isCorrect : false,
        },
        {
            value : "Le rugby",
            isCorrect : true,
        }
    ]
}

export const QUIZ_LIST: Quiz[] = [
    {
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questions: [QUESTION_ACTOR],
    },
    {
        name: 'Les Sports',
        questions: [QUESTION_SPORT],
    },
    {
        name : 'Quiz de test',
        theme:'theme de quiz',
        questions: [],
    }
];
