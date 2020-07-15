import React from 'react'
import './Home.css'

const ProblemCard = props => {
    return (
        <div className="problem_card" id={`problem-${props.problem.id}`}>
            <p className="home_problem_title">{props.problem.title}</p>
            <p className="home_problem_description">{props.problem.description}</p>
        </div>
    )
}

export default ProblemCard