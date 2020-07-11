import React, { useState, useEffect } from 'react';
import {createPortal} from 'react-dom';
import Coder from './Coder';
import Problem from './Problem';
import Resources from './Resources';
import TestResults from './TestResults';
import SuccessWindow from './SuccessWindow';
import ApiManager from '../modules/ApiManager'
import getRandomIndex from '../helpers/getRandomIndex'
import './LabIt.css';

const Habit = props => {
    const [result, setResult] = useState('Ship your code to see the result!')
    const [reviews, setReviews] = useState([{}])
    const [problem, setProblem] = useState({id: null, setup: '', description: '', testSuite: '', level: null});
    const [solve, setSolve] = useState(
        {
            profileId: JSON.parse(sessionStorage.user).id,
            problemId: null, 
            difficultyAssessed: null, 
            timeTaken: 0, 
            description: "", 
            solveDate: null, 
            nextEncounterDate: null
        })
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        ApiManager.getAll('userSolutions').then(solutions => {
            ApiManager.getAll('problems').then(problems => {
                const dueReviews = solutions.filter(solution => Date.parse(solution.nextEncounterDate) <= Date.parse(new Date()))
                const dontReviews = solutions.filter(solution => Date.parse(solution.nextEncounterDate) > Date.parse(new Date()))
                const filteredReviews = dueReviews.filter(solution => !dontReviews.some(sol => solution.problemId === sol.problemId))
                const reviewProblems = problems.filter(problem => filteredReviews.some(solution => solution.problemId === problem.id))
                setReviews(reviewProblems)
            })
        })
    }, [])

    useEffect(() => {
        setProblem(getRandomIndex(reviews))
    }, [reviews])

    const activate = e => {
        setClicked(true);
        setTimeout(function() {
            setClicked(false);
        }, 2000);
    }

    return (
        <div className="main_container">
            <div className="left_side">
                <Problem problem={problem} />
                <Resources problem={problem} />
            </div>
            <div className="right_side">
                <Coder problem={problem} setProblem={setProblem} reviews={reviews} setReviews={setReviews} setResult={setResult} result={result} setSolve={setSolve} solve={solve} activate={activate} isReview={true} {...props} />
                <TestResults result={result} clicked={clicked} />
            </div>
            {props.hasSuccessWindow ? createPortal(<SuccessWindow problem={problem} setReviews={setReviews} setResult={setResult} setSolve={setSolve} solve={solve} toggleSuccess={props.toggleSuccess} isReview={true} {...props} />, document.getElementById('modal')) : null}
        </div>
    )
}

export default Habit