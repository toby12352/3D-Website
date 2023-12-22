import React from 'react'
import { Link } from 'react-router-dom'
import {arrow} from '../assets/icons'

const InfoBox = ({text, link, btnText}) => (
    <div className="info-box">
        <p className='font-medium sm:text-xl text-center'>{text}</p>

        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain'></img>
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className='sm:text-1 sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            <span className='font-medium sm:text-xl text-center'>Hello, I am Toby.</span>
            <br/>
            <br/>
            This website is built using React, TailwindCSS, Three.js and Sketchfab.
        </h1>
    ),
    2: (
        <InfoBox
            text="Visit GitHub to learn more about my projects!"
            link="https://github.com/toby12352?tab=repositories"
            btnText="Let's Go!"
        />
    ),
    3: (
        <InfoBox
            text="Visit my personal website!"
            link="https://toby12352.github.io/tobyThaung/"
            btnText="Let's Go!"
        />
    ),
    4: (
        <InfoBox
            text="For more information, Contact me!"
            link="/contact"
            btnText="Let's connect!"
        />
    )
}


const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo