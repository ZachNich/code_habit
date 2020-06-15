import React, { useState, useEffect } from 'react';
import Coder from './Coder';
import Problem from './Problem';
import Resources from './Resources';
import TestResults from './TestResults';
import ApiManager from '../modules/ApiManager'

const Lab = props => {
    const [problems, setProblems] = useState([]);
    const [problem, setProblem] = useState({});
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        ApiManager.getAll('problems').then(data => setProblems(data))
        ApiManager.getAll('userSolutions').then(data => setSolutions(data))
    }, [])

    // compare above two arrays to find unsolved problems (will find solved problems to review in habit.js instead of here)
    const findAvailableProblems = () => {

    }

    return (
        <>
            <Problem problem={problem} />
            <Resources problem={problem} />
            <Coder problem={problem} />
            <TestResults />
        </>
    )
}

export default Lab