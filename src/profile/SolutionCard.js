import React from 'react'
import './Profile.css'

const SolutionCard = props => {
    return (
        <div className="problem_card" id={`solution-${props.solution[0].id}`}>
            <p className="profile_problem_title">{props.solution[1].title}</p>
            <pre className="profile_solution_container">
                <code className="profile_solution">{props.solution[0].description}</code>
            </pre>
        </div>
    )
}

export default SolutionCard