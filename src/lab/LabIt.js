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
            quality: null, 
            easeFactor: 2.5,
            timeTaken: 0, 
            description: "", 
            solveDate: null, 
            nextEncounterDate: null
        })
    const [clicked, setClicked] = useState(false);
    const [repetitions, setRepetitions] = useState(0);
    const [prevInterval, setPrevInterval] = useState(1);

    useEffect(() => {
        ApiManager.getByProperty('userSolutions', 'profileId', JSON.parse(sessionStorage.user).id).then(solutions => {
            ApiManager.getAll('problems').then(problems => {
                const unsolvedProblems = problems.filter(problem => !solutions.some(solution => solution.problemId === problem.id))
                setProblems(unsolvedProblems)
            })
        })
    }, [])

    useEffect(() => {
        setProblem(getRandomIndex(problems))
    }, [problems])

    const activate = e => {
        setClicked(true);
        setTimeout(function() {
            setClicked(false);
        }, 2000);
    }

    return (
        <>
            <h1 className="lab_header--main">New Problems</h1>
            <div className="main_container">
                <div className="left_side">
                    <Problem problem={problem} />
                    <Resources problem={problem} />
                </div>
                <div className="right_side">
                    <Coder problem={problem} setProblem={setProblem} problems={problems} setProblems={setProblems} setResult={setResult} result={result} setSolve={setSolve} solve={solve} activate={activate} isReview={false} {...props} />
                    <TestResults result={result} clicked={clicked} />
                </div>
                {props.hasSuccessWindow ? createPortal(<SuccessWindow problem={problem} setResult={setResult} setProblems={setProblems} setSolve={setSolve} solve={solve} repetitions={repetitions} prevInterval={prevInterval} toggleSuccess={props.toggleSuccess} isReview={false} {...props}/>, document.getElementById('modal')) : null}
            </div>
        </>
    )
}

export default Lab