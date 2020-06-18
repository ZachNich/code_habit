import React, { useState, useEffect } from 'react';
import Coder from './Coder';
import Problem from './Problem';
import Resources from './Resources';
import TestResults from './TestResults';
import ApiManager from '../modules/ApiManager'
import getRandomIndex from '../helpers/getRandomIndex'
import './LabIt.css';

const Lab = props => {
    const [problem, setProblem] = useState({id: null, setup: '', description: '', testSuite: '', level: null});
    const [result, setResult] = useState('Ship your code to see the result!')
    const [problems, setProblems] = useState([{}])

    useEffect(() => {
        ApiManager.getAll('userSolutions').then(solutions => {
            ApiManager.getAll('problems').then(problems => {
                const unsolvedProblems = problems.filter(problem => !solutions.some(solution => solution.problemId === problem.id))
                setProblems(unsolvedProblems)
            })
        })
    }, [])

    useEffect(() => {
        setProblem(getRandomIndex(problems))
    }, [problems])

    return (
        <div className="main-container">
            <div className="left-side">
                <Problem problem={problem} />
                <Resources problem={problem} />
            </div>
            <div className="right-side">
                <Coder problem={problem} setProblem={setProblem} problems={problems} setProblem={setProblems} setResult={setResult} isReview={false} {...props} />
                <TestResults result={result} />
            </div>
        </div>
    )
}

export default Lab