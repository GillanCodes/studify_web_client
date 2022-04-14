import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addQuestion, deleteQuizz, editQuestion, editQuizz, removeQuestion } from '../../action/quizz.action';
import { isEmpty } from '../Utils';
import { Switch, FormControlLabel } from '@mui/material';

export default function QuizzEditor({ quizz }) {

    const [title, setTitle] = useState();
    const [level, setLevel] = useState();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [edit, setEdit] = useState();
    const [isPublic, setIsPublic] = useState();

    const dispatch = useDispatch();

    const editHandle = (question) => {
        setEdit(question._id);
        setAnswer(question.answer);
        setQuestion(question.question)
    }

    const save = () => {
            dispatch(editQuizz(quizz._id, title, level, isPublic))
    }

    const deleteQuizzHandle = () => {
        dispatch(deleteQuizz(quizz._id));
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
        setLevel(quizz.level)
        setIsPublic(quizz.isPublic)
      }
    }, [quizz]);
    

  return (
    <div className="quizz-content">

        <div className="field questions">
            <div className="info">
                <h1>Info du Quizz</h1>
            </div>
            <div className="question">
                <div className="info">
                    <span>Titre <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /></span>
                    <span>Niveau <input type="text" name="title" id="title" value={level} onChange={(e) => setLevel(e.target.value)} /></span> 
                    <FormControlLabel control={<Switch checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />} label={"Public"} />
                </div>
                <div className="buttons">
                    <button onClick={save} className="button add">Sauvegarder</button>
                </div>
            </div>
        </div>

        <div className="field questions question-add">
            <div className='question'>
                <div className="text">
                    <span>Question : <input type="text" onChange={(e) => setQuestion(e.target.value)} /></span>
                    <span>Réponse : <input type="text" onChange={(e) => setAnswer(e.target.value)} /></span>
                </div>
                <div className="buttons">
                    <button onClick={addQuestionHandle} className="add">Ajouter</button>
                </div>
            </div>
        </div>


        {!isEmpty(quizz.questions) && (
            <>
                {quizz.questions.map((question) => {
                    return (
                        <div className="field questions" key={question._id}>
                            {edit === question._id ? (
                                <div className='question'>
                                <div className="text">
                                    <span>Question : <input type="text" defaultValue={question.question} onChange={(e) => setQuestion(e.target.value)} /></span>
                                    <span>Réponse : <input type="text" defaultValue={question.answer} onChange={(e) => setAnswer(e.target.value)} /></span>
                                </div>
                                <div className="buttons">
                                    <button className='delete' onClick={() => removeQuestionHandle(question._id)}>Supprimer</button> 
                                    <button className='edit' onClick={() => saveQuestionHandle(question._id)}>Sauvegarder</button>
                                </div>
                            </div>
                            ) : (
                                <div className='question'>
                                    <div className="text">
                                        <span>Question : <input type="text" disabled defaultValue={question.question} onChange={(e) => setQuestion(e.target.value)} /></span>
                                        <span>Réponse : <input type="text" disabled defaultValue={question.answer} onChange={(e) => setAnswer(e.target.value)} /></span>
                                    </div>
                                    <div className="buttons">
                                        <button className='delete' onClick={() => removeQuestionHandle(question._id)}>Supprimer</button> 
                                        <button className='edit' onClick={() => editHandle(question)}>Modifier</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </>
        )}

        <div className="delete">
            <button onClick={deleteQuizzHandle} className="button delete">Supprimer le Quizz</button>
        </div>

    </div>
  )
}
