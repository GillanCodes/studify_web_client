import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';

import Register from '../Auth/Register'

export default function Introduction() {

  const usersData = useSelector(state => state.usersReducer);
  const sheetsData = useSelector(state => state.sheetsReducer);

  const [usersDataLoad, setUsersDataLoad] = useState(false)
  const [sheetsDataLoad, setSheetsDataLoad] = useState(false)

  var i = 0;
  var m = 0;

  useEffect(() => {
    if (!isEmpty(usersData)) {
      setUsersDataLoad(true);
      
    }

    if (!isEmpty(sheetsData)) {
      setSheetsDataLoad(true)
    }

  }, [usersData, sheetsData])

  return (
    <div className='introduction'>

      <div className="header">
        <img src="/cdn/content/header.png" alt="" />
      </div>

      <div className="container">
        <div className="box">
          <h1 className='title'>Le Projet</h1>
          <p className='article'>
            Le but de RevTonBac ? <br /> <br />
            <strong>Reviser !</strong> et ce de façon plus rapide et plus simple ! <br /> <br />
            <strong>Comment ?</strong> en apportant le support web / mobile, en etant en ligne et en etant simplifié pour aller a l'essentiel des besoins d'un étudiant ! <br /> <br />
            <strong>Nous mettons a disposition</strong> un systeme de traitement de text comme word mais en ligne et gratuit ! <br /> <br />
            <strong>En proposant des Quizz !</strong> Créer par la communauté, vous trouverez des quizz de tout niveau, de toutes matieres, et si aucun ne vous convient, alors créez en un !
          </p>
          <p className="article">
            Le but de Studify ? <br /> <br />
            <strong>Réviser !</strong> Et ce, de façon plus rapide et plus simple ! <br />
            <strong>Comment ?</strong> En apportant le support web / mobile qu’un étudiant a besoin, en ligne et simplifié ! <br />
            <strong>Nous mettons à disposition</strong> un système de traitement de texte comme Word, mais en ligne et gratuit ! <br />
            <strong>En proposant des Quizz !</strong> Créer par la communauté, vous trouverez des Quizz de tout niveau, de toutes matières, et si aucun ne vous convient, alors créez en !
          </p>
        </div>
        <div className="box">
          <h1 className='title'>Nous Rejoindre</h1>
          <Register intro={true} />
        </div>
      </div>

      <div className="stats_container">
        <h1 className='title'>Quelques Stats !</h1>
        <div className="stats">
          <p className='stat'>{usersDataLoad ? (usersData.length + " Utilisateurs") : ("Loading")}</p>
          <p className='stat'>{sheetsDataLoad ? (sheetsData.length + " Fiches Public") : ("Loading ..")}</p>
          <p className='stat'>
            {usersDataLoad && (
              usersData.map((user) => {
                if (user.certified) {
                  i=i+1
                }
              })
            )}
            {i} Utilisateurs Certifiés
          </p>
          <p className='stat'>{usersDataLoad && (
              usersData.map((user) => {
                if (user.permissions.DASHBOARD) {
                  m=m+1
                }
              })
            )}
            {m} Moderateurs
          </p>
        </div>
      </div>

      <div className="container">
        <div className="box">
          <h1 className="title">Comment ce projet est né ?</h1>
          <p className='text'>
          Jeune lycéen, je développe déjà des sites depuis trois ans, et j'ai besoin de me challenger un peu plus ! En me baladant sur l'ENT entre deux cours je tombe sur "Code ton Lycée". Le projet est simple, créer une équipe et développer un module qui pourrait être intégré à l'ENT des lycées en Ile de France. <br />
          J'ai alors l'idée de créer un site pour aider à la révision et à la prise de notes. Hélas étant dans un lycée principalement littéraire, je ne trouve pas assez des personnes pour former une équipe de cinq personnes, je n'ai donc jamais pu m'inscrire à ce concours. <br />
          L'année suivante, je change de filière et je me redirige en STI2D, entouré de gens qui, comme moi, aime l'informatique ! Hélas la COVID 19 annule tous nos plans et ce, pour deux ans... <br />
          C'est enfin en période de confinement, où il était impossible de sortir, que je me décide à créer la base de ce qui est aujourd'hui Studify. <br /> <br />
          Cela fait maintenant 2 ans que le projet est commencé et ce n'est encore qu'un prototype de l'idée finale que j'ai pour ce projet ! <br /> 
          Alors étudiants/étudiantes ! Voilà comment le projet Studify a vu le jour. <br /> <br />
          Si vous pensez être en capacité d'apporter des choses au projet (Design, cybersécurité, etc.…) N'hésitez pas à faire un tour sur notre page de recrutement <a href="/jobs" className="link">Jobs @ Studify !</a>
          </p>
        </div>
        <div className="box">
          <h1>Nos Partenaires</h1>
          <div className="partenaires">
            <div className="box">
              <img className='icon' src="/cdn/content/partenaires/gillancodes.png" alt="OpenCodes" />
              <p className='name'>GillanCodes</p>
              <p className='desc'>Fondateur, RevTon'Bac & OpenCodes</p>
            </div>

            <div className="box">
              <img className='icon' src="/cdn/content/partenaires/opencodes.png" alt="OpenCodes" />
              <p className='name'>OpenCodes</p>
              <p className='desc'>Fondateur, Editeur et Developpeur du projet</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
