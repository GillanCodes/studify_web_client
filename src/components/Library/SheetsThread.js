import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import File from '../Home/HomeScreen/File';
import Loading from '../Modules/Loading';
import { isEmpty } from '../Utils';

export default function SheetsThread() {

    const [isLoading, setIsLoading] = useState(true);

    const [searchType, setSearchType] = useState('tag');
    const [search, setSearch] = useState('');

    const sheetsData = useSelector(state => state.sheetsReducer)

    useEffect(() => {

        if (!isEmpty(sheetsData)) {
            setIsLoading(false)
        }

    }, [sheetsData])


  return (
        <div className="sheets-thread-content">
            {isLoading ? (
                <Loading />
            ) : (

                
            
                <div className="sheets-thread">
                    
                    <div className="search">
                        <input type="text" name="" id="" onChange={(e) => setSearch(e.target.value)} />
                        <select onClick={(e) => setSearchType(e.target.value)}>
                            <option value="tag">Tag</option>
                            <option value="title">Titre</option>
                        </select>
                    </div>

                    {search.length >= 2 ? (
                        <>
                            {sheetsData.map((sheet) => {
                                if (sheet.isPublic) {
                                    if(searchType === "tag"){
                                        if (!isEmpty(sheet.tag) && !isEmpty(sheet.tag.text)){
                                            if (sheet.tag.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
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
                        </>
                    ) : (
                        <>
                            {sheetsData.map((sheet) => {
                                if (sheet.isPublic) {
                                    return (<File sheet={sheet} author />)
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
