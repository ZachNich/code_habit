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

const Lab = props => {
    const [result, setResult] = useState('Ship your code to see the result!')
    const [problems, setProblems] = useState([{}])
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
                <Coder problem={problem} setProblem={setProblem} problems={problems} setProblems={setProblems} setResult={setResult} setSolve={setSolve} solve={solve} isReview={false} {...props} />
                <TestResults result={result} />
            </div>
            {props.hasSuccessWindow ? createPortal(<SuccessWindow problem={problem} setResult={setResult} setProblems={setProblems} setSolve={setSolve} solve={solve} toggleSuccess={props.toggleSuccess} isReview={false} {...props}/>, document.getElementById('modal')) : null}
        </div>
    )
}

export default Lab