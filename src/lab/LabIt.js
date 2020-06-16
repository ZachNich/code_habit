import React, { useState, useEffect } from 'react';
import Coder from './Coder';
import Problem from './Problem';
import Resources from './Resources';
import TestResults from './TestResults';
import ApiManager from '../modules/ApiManager'
import getRandomIndex from '../helpers/getRandomIndex'

const Lab = props => {
    const [problems, setProblems] = useState([]);
    const [problem, setProblem] = useState({});
    const [solutions, setSolutions] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        ApiManager.getAll('userSolutions').then(setSolutions)
        ApiManager.getByProperty('profiles', 'userId', JSON.parse(sessionStorage.user).id).then(setProfile)
    }, [])

    // returns only new problems that haven't been attempted/solved by the user
    useEffect(() => {
        ApiManager.getAll('problems').then(data => {
            const unsolvedProblems = data.filter(problem => !solutions.some(solution => solution.problemId === problem.id))
            setProblems(unsolvedProblems)
        })
    }, [solutions])
    
    // return random problem from available problems
    useEffect(() => {
        setProblem(getRandomIndex(problems))
    }, [problems])

    return (
        <>
            <Problem problem={problem} />
            <Resources problem={problem} />
            <Coder problem={problem} problems={problems} />
            <TestResults />
        </>
    )
}

export default Lab