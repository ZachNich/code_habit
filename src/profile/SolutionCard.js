import React from 'react'
import './Profile.css'

const SolutionCard = props => {
    return (
        <div className="problem_card" id={`solution-${props.solution[0].id}`}>
            <p className="profile_problem_title">{props.solution[1].title}</p>
            <p className="profile_solution">{props.solution[0].description}</p>
        </div>
    )
}

export default SolutionCard