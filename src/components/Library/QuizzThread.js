import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
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

                    {search.length >= 2 ? (
                        <>
                            {quizzData.map((quizz) => {
                                if (quizz.isPublic) {
                                    if(searchType === "tag"){
                                        if (!isEmpty(quizz.tag) && !isEmpty(quizz.tag.text)){
                                            if (quizz.tag.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                                                return <File quizz={quizz} key={quizz._id}/>
                                            }
                                            return null
                                        }
                                        return null
                                    }
                                    if(searchType === "title" && quizz.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                                        return <File quizz={quizz} key={quizz._id}/>
                                    }
                                    return null
                                } 
                                return null
                            })}
                        </>
                    ) : (
                        <>
                            {quizzData.map((quizz) => {
                                if (quizz.isPublic) {
                                    return (<File quizz={quizz} author />)
                                }
                                return null
                            })}
                        </>
                    )}

                    

                </div>
            )}
        
        </div>
  );
}
