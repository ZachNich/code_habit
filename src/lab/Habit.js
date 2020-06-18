import React, { useState, useEffect } from 'react';
import Coder from './Coder';
import Problem from './Problem';
import Resources from './Resources';
import TestResults from './TestResults';
import ApiManager from '../modules/ApiManager'
import getRandomIndex from '../helpers/getRandomIndex'
import './LabIt.css';

const Habit = props => {
    const [result, setResult] = useState('Ship your code to see the result!')
    const [reviews, setReviews] = useState([{}])
    const [problem, setProblem] = useState({id: null, setup: '', description: '', testSuite: '', level: null});

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

    return (
        <div className="main-container">
            <div className="left-side">
                <Problem problem={problem} />
                <Resources problem={problem} />
            </div>
            <div className="right-side">
                <Coder problem={problem} reviews={reviews} setReviews={setReviews} setProblem={setProblem} setResult={setResult} isReview={true} {...props} />
                <TestResults result={result} />
            </div>
        </div>
    )
}

export default Habit