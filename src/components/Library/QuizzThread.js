import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Quizz from '../Home/HomeScreen/Quizz';
import Loading from '../Modules/Loading';
import { isEmpty } from '../Utils';

export default function QuizzThread() {

    const [isLoading, setIsLoading] = useState(true);

    const [searchType, setSearchType] = useState('tag');
    const [search, setSearch] = useState('');

    const quizzData = useSelector(state => state.quizzReducer)

    useEffect(() => {

        if (!isEmpty(quizzData)) {
            setIsLoading(false)
        }

    }, [quizzData])


  return (
        <div className="quizzs-thread-content">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="quizzs-thread">
                    
                    <div className="search">
                        <input type="text" name="" id="" onChange={(e) => setSearch(e.target.value)} />
                        <select onClick={(e) => setSearchType(e.target.value)}>
                            <option value="tag">Tag</option>
                            <option value="title">Titre</option>
                        </select>
                    </div>

                        {quizzData.map((quizz) => {
                            if (quizz.isPublic) {
                                return (<Quizz quizz={quizz} author />)
                            }
                            return null
                        })}

                </div>
            )}
        
        </div>
  );
}
