import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UIdContext } from './App.context';
import Homescreen from './Home/Homescreen';
import Introduction from './Home/Introduction';
import Loading from './Modules/Loading';
import { isEmpty } from './Utils';

export default function Home() {

  	const uid = useContext(UIdContext);
    const userData = useSelector(state => state.userReducer);

	const [isLoading, setIsLoading] = useState(true);
  	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		if (!isEmpty(uid) && !isEmpty(userData)) { 
			setIsLogged(true);
			setIsLoading(false);
		} else {
			setIsLogged(false);
			setIsLoading(false)
		}
	}, [uid, userData])

  return (
      <>
		{isLoading ? (
			<Loading />
		) : (
			<>
				{isLogged ? (
					<Homescreen />
				) : (
					<Introduction />
				)}

			</>
		)}



      </>
  );
}
