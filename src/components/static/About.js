import React from 'react'

export default function About() {
  return (
    <div className='about-container'>
        <h1>A Propos</h1>

        <div className="content">
            <div className="box text">
                <h2>L'entreprise et le PDG</h2>
                <p>
                Studify est un projet édité et développé par Codeed. <br />
                Codeed créé et présidé par Gillian GUND, développeur freelance. Codeed propose également de l'édition et du développement de site, d'application et d'API pour entreprises et particuliers.
                </p>
            </div>
            <div className="box image">
                <img src="./cdn/content/corporation.jpg" alt="Illustration Corp" className='illustration' />
            </div>
        </div>

        <div className="content">
            <div className="box image">
                <img src="./cdn/content/banner.png" alt="Illustration Project" className='illustration' />
            </div>
            <div className="box text">
                <h2>Le projet</h2>
                <p>
                Le projet Studify vise à rendre la vie des étudiants plus simple. Un site communautaire où les étudiants peuvent s'entraider à travers le monde ! <br />
                Studify propose la création de fiches de révisions que vous créez pour les partager avec vos amis, avec le monde ou simplement les garder pour vous. Dès lors que vous possédez un compte, les fiches sont accessibles depuis n'importe où ! Vous pouvez également les imprimer ou encore les convertir au format PDF. <br />
                Au même titre que les fiches de révisions, nous proposons des Quizz que vous pouvez partager sur toute la plateforme ou gardez pour vous. <br />
                Vous créez un Quizz, avec vos questions et vos réponses. Simple d'utilisation, cette fonctionnalité vous permettra d'apprendre d'une façon plus ludique ! <br />
                <br />
                # Un peu d'histoire ! <br />
                Studify, nommé à l'origine « Rev'TonBac » est un jeu de mots entre « réviser » et « rêver ». Il est devenu, peu de temps avant sa sortie, « Studify » du nom complet « Studify : Simplify Student's Life » (en français : « Studify : Simplifiez la vie étudiante ») est la contraction de « Student » (étudiant) & « Simplify » (simplifier).
                </p>
            </div>
        </div>

        <div className="content">
            <div className="box text">
                <h2>Nos objectifs</h2>
                <p>
                Le projet « Studify » existe pour le moment uniquement en version française et donc se limite à un public francophone. Notre objectif durant la prochaine année est de créer des traductions pour rendre le site accessible à une grande partie du monde. <br />
                <br />
                Nous savons que la version mobile est <b>utilisable</b> mais pas <b>OPTIMAL</b>, c'est pourquoi dans un futur proche nous espérons pouvoir développer une application pour IOS et Android afin de faciliter la vie des utilisateurs sur téléphone et tablette.
                </p>
            </div>
            <div className="box image">
                <img src="./cdn/content/objective.jpg" alt="Illustration Objectif" className='illustration' />
            </div>
        </div>

    </div>
  )
}