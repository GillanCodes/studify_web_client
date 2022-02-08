import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import File from './Home/HomeScreen/File';
import Loading from './Modules/Loading';
import { isEmpty } from './Utils';

export default function SheetsThread() {

    const [isLoading, setIsLoading] = useState(true);

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
                    
                    {sheetsData.map((sheet) => {
                        if (sheet.isPublic) {
                            return (<File sheet={sheet} author />)
                        }
                        return null
                    })}

                </div>
            )}
        
        </div>
  );
}
