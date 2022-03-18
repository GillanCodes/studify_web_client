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
          <p>
            Jeune lycéen, je developpe deja des sites depuis trois ans, j'ai besoin de me challenger un peu plus ! En me balandant sur l'ent entre deux cours je tombe sur "Code ton Lycée". Le projet est simple, tu dois créer une équipe et developper un module qui pourrait etre integré a l'ENT des lycée en Ile de France <br />
            J'ai alors l'idée de créer un site pour aider la revision et a la prise de note. Hélas etant dans un lycée principalement litteraire je ne trouve pas assez des personnes pour former une équipe de cinq persionnes et donc je n'ai jamais pu m'inscrire a ce concours <br />
            L'année suivante de change de filliere et je me retrouve en STI2D, entourer de gens qui, comme moi, aime l'informatique ! Hélas le COVID 19 annul tous nos plan et ce pour deux ans ... <br />
            C'est enfin en periode de confinement, impossible de sortir, je me decide a créer la base de ce qui est aujourd'hui RevTonBac <br /> <br />
            Cela fait maintement 2 ans que le projet a été commencer et ceci n'est encore qu'un prototype de l'idée final que j'ai pour ce projet ! <br />
            Alors étudiants etudiantes ! Voila comment le projey RevTon'Bac a vu le jour. <br /><br />
            Si vous pensez etre en capacité d'apporter des choses au projet (financements, desing, cybersecurité, etc ...) N'hésitez pas a faire un tours sur notre page re recrutement <a href="/jobs">Jobs @ RTB !</a>
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
