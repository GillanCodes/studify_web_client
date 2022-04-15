import React from 'react'

export default function About() {
  return (
    <div className='about-container'>
        <h1>A Propos</h1>

        <div className="content">
            <div className="box text">
                <h2>L'entreprise et le PDG</h2>
                <p>
                Studify est un projet édité et développé par OpenCodes. <br />
                "OpenCodes" est un groupement de projets créé et présidé par Gillian GUND, développeur freelance. Nous proposons également de l'édition et du développement de site, d'application et d'API pour entreprise et particulier
                </p>
            </div>
            <div className="box image">
                <img src="./cdn/content/corporation.jpg" alt="Illustration Corp" className='illustration' />
            </div>
        </div>

        <div className="content">
            <div className="box image">
                <img src="./cdn/content/project.jpg" alt="Illustration Project" className='illustration' />
            </div>
            <div className="box text">
                <h2>Le projet</h2>
                <p>
                Le projet Studify vise a rendre la vie des étudiants plus simple. Un site communautaire ou les étudiants peuvent s'entraider a travers le monde ! <br />
                <br />
                Studify propose la création de fiches de révisions que vous pour partager avec vos amis, avec le monde ou simplement les garder pour vous. Dès lors que vous possedez un compte, les fiches sont accessible depuis n'import où ! Vous pouvez également les imprimer ou encore les convertir au format PDF. <br />
                <br />
                Au meme titre que les fiches de révision, nous proposons des quizz que vous pouvez partager sur toute la platform ou simplement les gardez pour vous. <br />
                Vous créez un Quizz, avec vos questions et vos réponses. Simple d'utilisation cette fonctionalité vous permettera d'apprendre d'une façon plus ludique! <br />
                <br />
                <br />
                # Un peu d'histoire ! <br />
                Studify, nommé a l'origine "Rev'TonBac" est un jeu de mot avec réviser et rever, est devenu, peu de temps avant sa sortie, 'Studify' du nom complet "Studify : Simplyfy Student's life" (en français : "Studify : Simplifiez le vie etudiante") est la contration de Student (étudiant) & Simplify (simplifer).
                </p>
            </div>
        </div>

        <div className="content">
            <div className="box text">
                <h2>Nos objectifs</h2>
                <p>
                    Le projet "Studify" existe pour le moment uniquement en version française et donc ce limite a un public francophone. Notre objectif durant la prochaine année est de creer des traductions pour rendre le site accessible a une grande patie du monde <br />
                    <br />
                    Nous savons que la version mobile est <b>utilisable</b> mais pas <b>OPTIMAL</b>, c'est pourquoi dans un futur proche nous esperons pourvoir développer une application pour IOS et Android afin de faciliter la vie des utilisateurs sur téléphone et tablette.
                </p>
            </div>
            <div className="box image">
                <img src="./cdn/content/objective.jpg" alt="Illustration Objectif" className='illustration' />
            </div>
        </div>

    </div>
  )
}
