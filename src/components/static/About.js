import React from 'react'

export default function About() {
  return (
    <div className='about-container'>
        <h1>A Propos</h1>

        <div className="content">
            <div className="box text">
                <h2>L'entreprise et le PDG</h2>
                <p>
                Studify est un projet édité et développé par "GillanCorp". <br />
                "GillanCorp" est un groupement de projets créer et présidé par Gillian GUND. Ce développeur en freelance propose également de l'edition et du développement de site, d'application et d'API pour entreprise et particulier en plus de proposer une gamme de produit
                </p>
            </div>
            <div className="box image">
                <img src="./cdn/content/dev.jpg" alt="dev" className='illustration' />
            </div>
        </div>

        <div className="content">
            <div className="box image">
                <img src="./cdn/content/dev.jpg" alt="dev" className='illustration' />
            </div>
            <div className="box text">
                <h2>Le projet</h2>
                <p>
                Le projet Studify vise a rendre la vie des étudiant(e)s plus simple. Un site communautaire ou les étudiants peuvent s'entraider a travers le monde ! <br />
                <br />
                Studify propose la création de fiches de révisions que vous pour partager avec vous amis, avec le monde ou simplement les garder pour vous. Dès lors que vous possedez un compte, les fiches sont accessible depuis n'import où ! Vous pouvez également les imprimer ou encore les convertir au format PDF. <br />
                <br />
                Au meme titre que les fiches de révision, nous proposons des quizz que vous pouvez partager sur toute la platform ou simplement les gardez pour vous. <br />
                Vous créez un Quizz, avec vos questions et vos réponses. Simple d'utilisation cette fonctionalité vous permettera d'apprendre d'une façon plus ludique! <br />
                <br />
                <br />
                # Un peu d'histoire ! <br />
                Studify, nommé a l'origine "Rev'TonBac" (nom qu'il garde durant le prototypage) est un jeu de mot avec réviser et rever, est devenu lors du passage au public Studify du nom complet "Studify : Student's life Simplified" (en français : "Studify : Votre vie étudiante simplifée") est la contration de Student (étudiant) & Simplify (simplifer).
                </p>
            </div>
        </div>

        <div className="content">
            <div className="box text">
                <h2>Nos objectifs</h2>
                <p>
                    Le projet "Studify" existe pour le moment uniquement en version française et donc ce limite a un public francophone. Notre objectif durant la prochaine année est de creer des traductions pour rendre le site accessible a une grande patie du monde <br />
                    <br />
                    Nous savons que la version mobile est <b>utilisable</b> mais pas <b>OPTIMAL</b>, c'est pourquoi dans les deux prochaines années nous esperons pourvoir développer une application pour IOS et Android pour facilité la vie des utilisateurs sur téléphone et tablette.
                </p>
            </div>
            <div className="box image">
                <img src="./cdn/content/dev.jpg" alt="dev" className='illustration' />
            </div>
        </div>

    </div>
  )
}
