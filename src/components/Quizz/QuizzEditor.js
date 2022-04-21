import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addQuestion, deleteQuizz, editQuestion, editQuizz, removeQuestion } from '../../action/quizz.action';
import { isEmpty } from '../Utils';
import { Switch, FormControlLabel } from '@mui/material';

export default function QuizzEditor({ quizz }) {

    const [init, setInit] = useState(false);
    const [info, setInfo] = useState({});
    const [oldInfo, setOldInfo] = useState({});
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [save, setSave] = useState(true);
    const [edit, setEdit] = useState();
    const [isPublic, setIsPublic] = useState();

    const dispatch = useDispatch();

    const editHandle = (question) => {
        setEdit(question._id);
        setAnswer(question.answer);
        setQuestion(question.question)
    }

    const saving = () => {
        console.log(info)
        // dispatch(editQuizz(quizz._id, title, level, isPublic))
    }

    const deleteQuizzHandle = () => {
        dispatch(deleteQuizz(quizz._id));
    }

    const addQuestionHandle = () => {
        setNewAnswer('');
        setNewQuestion('');
        dispatch(addQuestion(quizz._id, newQuestion, newAnswer))
    }

    const removeQuestionHandle = (question_id) => {
        dispatch(removeQuestion(quizz._id, question_id))
    }

    const saveQuestionHandle = (question_id) => {
        setAnswer('');
        setQuestion('');
        dispatch(editQuestion(quizz._id, question_id, question, answer)).then(() => setEdit());
    }

    useEffect(() => {
        if (!isEmpty(info) && !isEmpty(oldInfo)){
            if (oldInfo.title === info.title && oldInfo.level === info.level && oldInfo.isPublic === info.isPublic){
                setSave(true);
                return null
            } else {
                setSave(false);
                var interval = setInterval(() => {
                    setOldInfo(info)
                    console.log(info)
                    dispatch(editQuizz(quizz._id, info.title, info.level, info.isPublic));
                }, 2000);
                
                return () => {
                    clearInterval(interval)
                };
            } 
        }
    }, [info, oldInfo, quizz]);

    useEffect(() => {
      if (!isEmpty(quizz)) {
        setInfo({level: quizz.level, title: quizz.title, isPublic: quizz.isPublic})
        setOldInfo({level: quizz.level, title: quizz.title, isPublic: quizz.isPublic})
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
                    <span>Titre <input type="text" name="title" id="title" value={info.title} onChange={(e) => setInfo(info => ({...info, title: e.target.value}))} /></span>
                    <span>Niveau <input type="text" name="title" id="title" value={info.level} onChange={(e) => setInfo(info => ({...info, level: e.target.value}))} /></span> 
                    <FormControlLabel control={<Switch checked={info.isPublic} onChange={(e) => setInfo(info => ({...info, isPublic: e.target.checked}))} />} label={"Public"} />
                </div>
                <div className="quizz-save">
                    {save ? (
                        <i className="fas fa-save" data-tip="Document Sauvegarder"></i>
                    ) : (
                        <i className="fas fa-sync fa-spin" data-tip="Enregistrement en Cours ..."></i>
                    )}
                </div>
            </div>
        </div>

        <div className="field questions question-add">
            <div className='question'>
                <div className="text">
                    <span>Question : <input type="text" onChange={(e) => setNewQuestion(e.target.value)} value={newQuestion} /></span>
                    <span>Réponse : <input type="text" onChange={(e) => setNewAnswer(e.target.value)} value={newAnswer} /></span>
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
