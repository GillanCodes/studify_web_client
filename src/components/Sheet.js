import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UIdContext } from './App.context';
import NotFound from './errors/NotFound';
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
      <div className='sheet-container app-container'>

            {isLoading ? (
                <Loading />
            ): (
                <>
                    {sheetsData.map((sheet) => {
                        if (sheet._id === documentId) {
                            if (sheet.author === uid || sheet.team.includes(uid)) {
                                return <Editor sheet={sheet} key={sheet._id} />
                            } else {
                                if (sheet.isPublic) {
                                    return <Viewer sheet={sheet} key={sheet._id} />
                                } else {
                                    return <NotFound customMessage={"Cette fiche est Privée ou n'existe pas :("} />
                                }
                            }
                            
                        }
                        return null
                    })}
                </>
            )} 
        
      </div>
  );
}
