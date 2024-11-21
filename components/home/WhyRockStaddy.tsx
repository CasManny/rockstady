import { BrainCircuit, Gamepad2, Users } from 'lucide-react'
import React from 'react'

const benefits = [
    {
        label: "Gamified Experience",
        details: "Earn points, climb the leaderboard, and make reading fun.",
        icon: Gamepad2

    },
    {
        label: "Community & Motivation",
        details: "Compete with others and stay motivated to keep improving.",
        icon: Users

    },
    {
        label: "Interactive Learning",
        details: "Boost retention with fun quizzes after each chapter..",
        icon: BrainCircuit

    },
    
]


const WhyRockStaddy = () => {
  return (
      <div className='container min-h-[80vh] p-5 mb:p-10'>
          <h1 className='text-center text-3xl font-extrabold mb-20 dark:text-white/80'>Why you will Love <br /> <span className='border-b border-dotted border-rs-yellow'>SkillSquare 👌</span></h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
              {benefits.map((benefit, index) => (
                  <div className="text-center px-10">
                      <benefit.icon className='h-10 w-10 sm:mb-5 mx-auto text-rs-yellow' />
                      <h3 className='font-semibold text-xl mb-4 dark:text-white/70'>{benefit.label}</h3>
                      <p className='dark:text-rs-text-dark'>{ benefit.details}</p>
                  </div>
              ))}
          </div>
    </div>
  )
}

export default WhyRockStaddy