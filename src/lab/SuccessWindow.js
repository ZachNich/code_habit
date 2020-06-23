import React, { useState } from 'react';
import ApiManager from '../modules/ApiManager';

const SuccessWindow = props => {
    const [solutionsView, setSolutionsView] = useState([])

    const expandSolutions = e => {
        ApiManager.getByProperty('officialSolutions', 'problemId', props.problem.id)
            .then(setSolutionsView)
    }

    const goHome = e => {
        props.toggleSuccess()
        props.history.push('/')
    }

    const nextProblem = e => {
        ApiManager.post('userSolutions', props.solve)
            .then(() =>{
                ApiManager.getAll('userSolutions').then(solutions => {
                    ApiManager.getAll('problems').then(problems => {
                        const unsolvedProblems = problems.filter(problem => !solutions.some(solution => solution.problemId === problem.id))
                        props.setProblems(unsolvedProblems)
                    })
                })
            props.setResult('Ship your code to see the result!')
            props.toggleSuccess()
        })
    }

    const nextReview = e => {
        ApiManager.post('userSolutions', props.solve)
            .then(() =>{
                ApiManager.getAll('userSolutions').then(solutions => {
                    ApiManager.getAll('problems').then(problems => {
                        const dueReviews = solutions.filter(solution => Date.parse(solution.nextEncounterDate) <= Date.parse(new Date()))
                        const dontReviews = solutions.filter(solution => Date.parse(solution.nextEncounterDate) > Date.parse(new Date()))
                        const filteredReviews = dueReviews.filter(solution => !dontReviews.some(sol => solution.problemId === sol.problemId))
                        const reviewProblems = problems.filter(problem => filteredReviews.some(solution => solution.problemId === problem.id))
                        props.setReviews(reviewProblems)
                    })
                })
            props.setResult('Ship your code to see the result!')
            props.toggleSuccess()
        })
    }

    const handleRadioDifficulty = e => {
        const stateToChange = {...props.solve}
        stateToChange.difficultyAssessed = parseInt(e.target.value)
        props.setSolve(stateToChange)
    }
    
    return (
        <div className="success_container">
            <div className="success_message">
                <p>{`Success! Great job.`}</p>
            </div>
            <div className="success_difficulty">
                <p>How hard was this problem for you?</p>
                <div onChange={handleRadioDifficulty}>
                    <input type="radio" value="1" id="difficulty-1" name="difficulty-select" />Way Beneath Me
                    <input type="radio" value="2" id="difficulty-2" name="difficulty-select" />Easy Enough
                    <input type="radio" value="3" id="difficulty-3" name="difficulty-select" />Around My Level
                    <input type="radio" value="4" id="difficulty-4" name="difficulty-select" />Had Some Difficulty
                    <input type="radio" value="5" id="difficulty-5" name="difficulty-select" />I Don't Know How I Did It
                </div>
            </div>
            <div className="success_solutions">
                <p onClick={expandSolutions}>View Solutions</p>
                <p>{solutionsView.map(solution => solution.description)}</p>
            </div>
            <button onClick={goHome}>Home</button>
            {props.isReview ? <button onClick={nextReview}>Continue</button> : <button onClick={nextProblem}>Continue</button>}
        </div>
    )
}

export default SuccessWindow