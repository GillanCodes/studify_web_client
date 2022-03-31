import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Modules/Loading';
import { isEmpty } from '../Utils';
import File from './HomeScreen/File';
import { getSheets } from '../../action/sheets.action';
import { getQuizz } from '../../action/quizz.action';
import Quizz from './HomeScreen/Quizz';

export default function Homescreen() {

    const [isLoading, setIsLoading] = useState(true);
    const [updated, setUpdated] = useState(false);
    
    const [searchType, setSearchType] = useState('tag');
    const [search, setSearch] = useState('');


    const sheetsData = useSelector(state => state.sheetsReducer);
    const quizzData = useSelector(state => state.quizzReducer);
    const userData = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    useEffect(() => {
      if (!isEmpty(sheetsData) && !isEmpty(userData) && !isEmpty(quizzData)) {
          setIsLoading(false);
      }
    }, [isLoading, sheetsData, userData]);
    
    const newSheetHandle = () => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/api/sheet`,
            withCredentials: true,
            data : {
                title: 'New Sheet',
                isPublic: false
            }
        }).then((res) => {
            window.location = `/sheet/${res.data._id}`
        }).catch((err) => {
            console.log(err);
        })
    }

    const newQuizzHandle = () => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/api/quizz/new`,
            withCredentials: true,
        }).then((res) => {
            window.location = `/quizz/${res.data._id}`
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (!updated) {
            dispatch(getSheets())
            dispatch(getQuizz())
            setUpdated(true)
        }
    }, [updated])
    


    return (

        <div className='homescreen-container'>
            <div className="search">
                <input type="text" name="" id="" onChange={(e) => setSearch(e.target.value)} />
                <select onClick={(e) => setSearchType(e.target.value)}>
                    <option value="tag">Tag</option>
                    <option value="title">Titre</option>
                </select>
            </div>
            <div className="homescreen-content">
                <div className="news content">
                    <h2 className='subtitle'>Tableau de bord</h2>
                    <div className="box">
                        <div className="file" onClick={newSheetHandle}>
                            <div className="file-head">
                                <p><i className="fas fa-file-download"></i></p>
                            </div>
                            <div className="file-footer">
                                <h1 className='sheet-title'>Créer une Fiche</h1>
                            </div>
                        </div>

                        <div className="file" onClick={newQuizzHandle}>
                            <div className="file-head">
                                <p><i className="fas fa-file-download"></i></p>
                            </div>
                            <div className="file-footer">
                                <h1 className='sheet-title'>Créer un Quizz</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <Loading />
                ) : (
                    // TODO : Classer les fiches auteurs et les fiches de team
                    <>
                        {search.length >= 2 ? (
                            <>
                            <div className="sheets content">
                                    <h2 className='subtitle'>Fiches</h2>
                                    <div className="box">
                                        {sheetsData.map((sheet) => {
                                            if (sheet.author === userData._id || sheet.team.includes(userData._id)) {
                                                if(searchType === "tag"){
                                                    if (!isEmpty(sheet.tag) && !isEmpty(sheet.tag.text)){
                                                        if (sheet.tag.text.toLowerCase().includes(search.toLocaleLowerCase())) {
                                                            return <File sheet={sheet} key={sheet._id}/>
                                                        }
                                                        return null
                                                    }
                                                    return null
                                                }
                                                if(searchType === "title" && sheet.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                                                    return <File sheet={sheet} key={sheet._id}/>
                                                }
                                                return null
                                            } 
                                            return null
                                        })}
                                    </div>
                                </div>

                                <div className="sheets content">
                                    <h2 className='subtitle'>Fiches</h2>
                                    <div className="box">
                                        {quizzData.map((quizz) => {
                                            if (quizz.author === userData._id || quizz.team.includes(userData._id)) {
                                                if(searchType === "tag"){
                                                    if (!isEmpty(quizz.level)){
                                                        if (quizz.level.toLowerCase().includes(search.toLocaleLowerCase())) {
                                                            return <Quizz quizz={quizz} key={quizz._id}/>
                                                        }
                                                        return null
                                                    }
                                                    return null
                                                }
                                                if(searchType === "title" && quizz.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                                                    return <Quizz quizz={quizz} key={quizz._id}/>
                                                }
                                                return null
                                            } 
                                            return null
                                        })}
                                    </div>
                                </div>
                                
                            </>
                        ): (
                            <>
                                <div className="sheets content">
                                    <h2 className='subtitle'>Fiches</h2>
                                    <div className="box">
                                        {sheetsData.map((sheet) => {
                                            if (sheet.author === userData._id || sheet.team.includes(userData._id)) {
                                                return <File sheet={sheet} key={sheet._id}/>
                                            } 
                                            return null
                                        })}
                                    </div>
                                </div>

                                <div className="quizz content">
                                    <h2 className='subtitle'>Quizz</h2>
                                    <div className="box">
                                        {quizzData.map((quizz) => {
                                            if (quizz.author === userData._id || quizz.team.includes(userData._id)) {
                                                return <Quizz quizz={quizz} />
                                            } 
                                            return null
                                        })}
                                    </div>
                                </div>
                            </>
                        )}   
                    </>
                )}
                </div>
            </div>
    );
}
