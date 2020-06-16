import React, { useState, useEffect, useLayoutEffect } from 'react';
import Coder from './Coder';
import Problem from './Problem';
import Resources from './Resources';
import TestResults from './TestResults';
import ApiManager from '../modules/ApiManager'
import getRandomIndex from '../helpers/getRandomIndex'
import './LabIt.css';

const Lab = props => {
    const [problem, setProblem] = useState({id: null, setup: '', description: '', testSuite: '', level: null});
    const [profile, setProfile] = useState({id: null, userId: JSON.parse(sessionStorage.user).id, joinDate: "", level: null});
    const [result, setResult] = useState('Ship your code to see the result!')

    useEffect(() => {
        ApiManager.getAll('userSolutions').then(solutions => {
            ApiManager.getAll('problems').then(problems => {
                const unsolvedProblems = problems.filter(problem => !solutions.some(solution => solution.problemId === problem.id))
                setProblem(getRandomIndex(unsolvedProblems))
            })
        })
        ApiManager.getByProperty('profiles', 'userId', JSON.parse(sessionStorage.user).id).then(data => {
            setProfile(data)
        })
    }, [])

    return (
        <div className="main-container">
            <div className="left-side">
                <Problem problem={problem} />
                <Resources problem={problem} />
            </div>
            <div className="right-side">
                <Coder problem={problem} setProblem={setProblem} setResult={setResult} {...props} />
                <TestResults result={result} />
            </div>
        </div>
    )
}

export default Lab