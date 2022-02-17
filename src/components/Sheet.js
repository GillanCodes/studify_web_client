import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UIdContext } from './App.context';
import Editor from './Modules/Editor';
import Loading from './Modules/Loading';
import Viewer from './Modules/Viewer';
import { isEmpty } from './Utils';

export default function Sheet() {

    const {id: documentId} = useParams();
    const sheetsData = useSelector(state => state.sheetsReducer);
    const uid = useContext(UIdContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isEmpty(sheetsData)) {
            setIsLoading(false)
        }

    } , [sheetsData])

  return (
      <div className='sheet-container'>

            {isLoading ? (
                <Loading />
            ): (
                <>
                    {sheetsData.map((sheet) => {
                        if (sheet._id === documentId) {
                            if (sheet.author === uid || sheet.team.includes(uid)) {
                                return <Editor sheet={sheet} key={sheet._id} />
                            } else {
                                return <Viewer sheet={sheet} key={sheet._id} />
                            }
                            
                        }
                        return null
                    })}
                </>
            )} 
        
      </div>
  );
}
