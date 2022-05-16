import React from 'react'
import StoryCard from './StoryCard'

const stories = [
    {
        name: 'Mark Zuckerberg',
        src: 'https://preview.redd.it/8c8goknejj301.jpg?width=960&crop=smart&auto=webp&s=f6920d0e7ca14a70e43095716ca223ee32641068',
        profile: 'https://i.insider.com/5c07df44985cfd7b30525262?width=1136&format=jpeg',
        id: '1'
    },
    {
        name: 'Mark Zuckerberg',
        src: 'https://preview.redd.it/8c8goknejj301.jpg?width=960&crop=smart&auto=webp&s=f6920d0e7ca14a70e43095716ca223ee32641068',
        profile: 'https://i.insider.com/5c07df44985cfd7b30525262?width=1136&format=jpeg',
        id: '11'
    },
    {
        name: 'Mark Zuckerberg',
        src: 'https://preview.redd.it/8c8goknejj301.jpg?width=960&crop=smart&auto=webp&s=f6920d0e7ca14a70e43095716ca223ee32641068',
        profile: 'https://i.insider.com/5c07df44985cfd7b30525262?width=1136&format=jpeg',
        id: '111'
    },
    {
        name: 'Mark Zuckerberg',
        src: 'https://preview.redd.it/8c8goknejj301.jpg?width=960&crop=smart&auto=webp&s=f6920d0e7ca14a70e43095716ca223ee32641068',
        profile: 'https://i.insider.com/5c07df44985cfd7b30525262?width=1136&format=jpeg',
        id: '1111'
    },
    {
        name: 'Mark Zuckerberg',
        src: 'https://preview.redd.it/8c8goknejj301.jpg?width=960&crop=smart&auto=webp&s=f6920d0e7ca14a70e43095716ca223ee32641068',
        profile: 'https://i.insider.com/5c07df44985cfd7b30525262?width=1136&format=jpeg',
        id: '11111'
    }
]

function Stories() {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
        {stories.map((card) => {
            return <StoryCard key={card.id} name={card.name} src={card.src} profile={card.profile}/>
        })}
    </div>
  )
}

export default Stories;