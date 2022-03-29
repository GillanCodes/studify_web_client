import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendAnswer } from '../../action/quizz.action';
import { isEmpty } from '../Utils';

export default function QuizzViewer({quizz}) {

    const [answer, setAnswer] = useState('');
    const [init, setInit] = useState(false);
    const [empty, setEmpty] = useState(true)
    
    const [question, setQuestion] = useState();
    const [questions, setQuestions] = useState(quizz.questions);
    var quest = questions;

    var result;
    const [fRes, setFRes] = useState([]);

    const dispatch = useDispatch();

    const qResult = document.getElementById('result')

    const anwserHandle = () => {


        // Init state

        qResult.disabled = true;
        document.getElementById('progress').className = "progress-value"

        // traitement des données

        quest = questions.filter((q) => q._id !== question._id)
        setQuestions(quest);

        result = fRes;
        result.push({qId: question._id, question: question.question, uAnswer: answer, qAnswer: question.answer, correct: textPurifying(question.answer) === textPurifying(answer) ? true : false });
        setFRes(result)
        
        // data algo

        if (textPurifying(question.answer) === textPurifying(answer)){
            qResult.innerHTML = "Bonne Réponse";
            qResult.className = "button win"
        } else {
            qResult.innerHTML = "Mauvaise Réponse" 
            qResult.className = "button loose"  
        }

        if (quest.length === 0) {
            var interval_end = setInterval(() => {
                qResult.innerHTML = "FIN"
                qResult.className = "button end"
                qResult.disabled = true;
                document.getElementById('home').style.display = ""
                clearInterval(interval_end);
                dispatch(sendAnswer(quizz._id, result, quizz.title));  
            }, 5000);
            return
        }

        var interval = setInterval(() => {
            qResult.innerHTML = "Valider";
            qResult.disabled = false;
            qResult.className = "button";
            document.getElementById('progress').className = "progress-back"
            clearInterval(interval);
            questionInit();
        }, 5000);
        
    }

    function textPurifying(str) {
        return str.toLowerCase().split(' ').join('').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    }

    function questionInit() {

        if (quest.length === 0) {
            return
        }

        var random = Math.floor(Math.random() * quest.length);
        setQuestion(quest[random]);
    }

    useEffect(() => {
        questionInit();
        setInit(true);
    }, [])

    useEffect(() => {
        if(!isEmpty(quizz.questions)){
            setEmpty(false);
        }
    }, [quizz.questions])
    

  return (
    <div className='quizz-viewer'>
        {!empty ? (
            <div className="quizz">
                <div className="field">
                    {init && (<p className="question">{question.question}</p>)}
                </div>
                <div className="field">
                    <input type="text" name="answer" id="answer" className="answer" onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? anwserHandle() : null} />
                    <button className="button" id='result' onClick={anwserHandle}>Valider</button>
                    <button className="button" id='home' style={{display: "none"}} onClick={() => window.location = "/"}>Revenir a l'accueil</button>
                    <div class="progress">
                        <div id="progress"></div>
                    </div>
                </div>
            </div>
        ): (
            <div className="quizz">
                <div className="field">
                    {init && (<p className="question">Ce quizz est vide !</p>)}
                </div>
                <div className="field">
                    <button className="button" id='home' onClick={() => window.location = "/"}>Revenir a l'accueil</button>
                </div>
            </div>
        )}
    </div>
  )
}
