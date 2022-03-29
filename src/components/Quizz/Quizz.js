import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { UIdContext } from '../App.context';
import NotFound from '../errors/NotFound';
import { isEmpty } from '../Utils';
import QuizzEditor from './QuizzEditor';
import QuizzViewer from './QuizzViewer';

export default function Quizz() {

    const {id} = useParams();
    
    const quizzData = useSelector(state => state.quizzReducer);
    const Uid = useContext(UIdContext)
    
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useState("view");

    const modeHandle = () => {
        if (mode === "view") {
            setMode("edit");
        }
        if (mode === "edit") {
            setMode("view");
        }

    }

    useEffect(() => {
        if (!isEmpty(quizzData)) {
            setLoading(false);
        }
    })

  return (
    <div className='quizz-container'>
        {loading ? (
            <h1>Load</h1>
        ) : (  
            <div className='quizz-editor'>
                
                {quizzData.map((quizz) => {
                    if (quizz._id.toString() === id.toString()) {
                        if (quizz.author === Uid || quizz.team.includes(Uid)) {
                            if (mode === "view") {
                                return (
                                    <>
                                        <button className='button edit' onClick={modeHandle}>{mode === "view" && ("Modifier")} {mode === "edit" && ("Voir")}</button>
                                        <QuizzViewer quizz={quizz} />
                                    </>
                                )
                            }
                            if (mode ===  "edit") {
                                return (
                                    <>
                                        <button className='button edit' onClick={modeHandle}>{mode === "view" && ("Modifier")} {mode === "edit" && ("Voir")}</button>
                                        <QuizzEditor quizz={quizz} />
                                    </>
                                )
                            }
                        } else {
                            if (quizz.isPublic) {
                                return <QuizzViewer quizz={quizz} />
                            } else {
                                return <NotFound customMessage={"Ce quizz n'exsiste pas ou est peut etre privé !"} />
                            }
                        }
                    }
                    return null
                })}
            </div>
        )}


    </div>
  )
}
