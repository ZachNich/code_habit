import React, { useState } from 'react';
import ApiManager from '../modules/ApiManager';
import './SuccessWindow.css';
import closeBtn from '../media/close_btn.svg';
import sm2 from '../helpers/sm2';

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
                ApiManager.getByProperty('userSolutions', 'profileId', JSON.parse(sessionStorage.user).id).then(solutions => {
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
                ApiManager.getByProperty('userSolutions', 'profileId', JSON.parse(sessionStorage.user).id).then(solutions => {
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
        stateToChange.quality = parseInt(e.target.value)
        const intervalObj = sm2(stateToChange.quality, props.repetitions, stateToChange.easeFactor, props.prevInterval)
        stateToChange.easeFactor = intervalObj.easeFactor
        stateToChange.solveDate = new Date().toLocaleString('en-US')
        let nextReview = new Date()
        nextReview.setDate(nextReview.getDate() + intervalObj.interval)
        stateToChange.nextEncounterDate = nextReview.toLocaleString('en-US')
        props.setSolve(stateToChange)
    }
    
    return (
        <div className="success_container modal">
            <div className="modal_content">
                <img className="close_btn" src={closeBtn} onClick={props.toggleSuccess}></img>
                <div className="success_message">
                    <p className="success">Success! </p><p className="greatjob">Great job.</p>
                </div>
                <div className="success_difficulty">
                    <p className="howhard">How hard was this problem for you?</p>
                    <div onChange={handleRadioDifficulty}>
                        <input type="radio" value="5" id="difficulty-5" className="difficulty_select" name="difficulty-select" />Easy
                        <input type="radio" value="4" id="difficulty-4" className="difficulty_select" name="difficulty-select" />Not Bad
                        <input type="radio" value="3" id="difficulty-3" className="difficulty_select" name="difficulty-select" />Doable
                        <input type="radio" value="2" id="difficulty-2" className="difficulty_select" name="difficulty-select" />Tough
                        <input type="radio" value="1" id="difficulty-1" className="difficulty_select" name="difficulty-select" />Very Hard
                    </div>
                </div>
                <div className="success_solutions">
                    <p className="solution_btn" onClick={expandSolutions}>View Solutions</p>
                    <p className="solution_view">{solutionsView.map(solution => solution.description)}</p>
                </div>
                <div className="btn_container">
                    <button className="home_btn" onClick={goHome}>Home</button>
                    {props.isReview ? <button className="next_btn" onClick={nextReview}>Save & Continue</button> : <button className="next_btn" onClick={nextProblem}>Save & Continue</button>}
                </div>
            </div>
        </div>
    )
}

export default SuccessWindow