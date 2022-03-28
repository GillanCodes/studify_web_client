import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addQuestion, editQuestion, removeQuestion } from '../../action/quizz.action';
import { isEmpty } from '../Utils';

export default function QuizzEditor({ quizz }) {

    const [title, setTitle] = useState();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [edit, setEdit] = useState();

    const dispatch = useDispatch();

    const editHandle = (question) => {
        setEdit(question._id);
        setAnswer(question.answer);
        setQuestion(question.question)
    }

    const save = () => {

        axios({
            method:"put",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/quizz/${quizz._id}`,
            data: {
                title
            },
            
        })
    }

    const addQuestionHandle = () => {
        dispatch(addQuestion(quizz._id, question, answer))
    }

    const removeQuestionHandle = (question_id) => {
        dispatch(removeQuestion(quizz._id, question_id))
    }

    const saveQuestionHandle = (question_id) => {
        dispatch(editQuestion(quizz._id, question_id, question, answer)).then(() => setEdit());
        
    }

    useEffect(() => {
      if (!isEmpty(quizz)) {
        setTitle(quizz.title)
      }
    }, [quizz]);
    

  return (
    <div className="quizz-content">
        <div className="field">
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={save}>save</button>
        </div>

        <div className="field">
                <input placeholder='question' onChange={(e) => setQuestion(e.target.value)} />
                <input placeholder='answer' onChange={(e) => setAnswer(e.target.value)} />
                <button onClick={addQuestionHandle}>add</button>
            </div>

        {!isEmpty(quizz.questions) && (
            <>
                {quizz.questions.map((question) => {
                    return (
                        <div className="field questions" key={question._id}>
                            {edit === question._id ? (
                                <div className='question'>
                                <div className="text">
                                    <span>Question : </span><input type="text" defaultValue={question.question} onChange={(e) => setQuestion(e.target.value)} /> <br />
                                    <span>Réponse : </span><input type="text" defaultValue={question.answer} onChange={(e) => setAnswer(e.target.value)} />
                                </div>
                                <div className="buttons">
                                    <button className='delete' onClick={() => removeQuestionHandle(question._id)}>Supprimer</button> 
                                    <p className='edit' onClick={() => saveQuestionHandle(question._id)}>Save</p>
                                </div>
                            </div>
                            ) : (
                                <div className='question'>
                                    <div className="text">
                                        <p className="question-text">{question.question}</p>
                                        <p className="answer">{question.answer}</p> 
                                    </div>
                                    <div className="buttons">
                                        <button className='delete' onClick={() => removeQuestionHandle(question._id)}>Supprimer</button> 
                                        <p className='edit' onClick={() => editHandle(question)}>Edit</p>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    )
                })}
            </>
        )}
    </div>
  )
}
