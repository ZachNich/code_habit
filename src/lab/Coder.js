import React, { useState, useEffect } from 'react';
import { ReactCodeJar } from 'react-codejar';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import problemTests from '../helpers/problemTests';
import ApiManager from '../modules/ApiManager';
import getRandomIndex from '../helpers/getRandomIndex';

let strFunction = ''

const Coder = props => {
    const [code, setCode] = useState('');

    const highlight = editor => {
        let code = Prism.highlight(editor.textContent, Prism.languages.javascript, 'javascript');
        editor.innerHTML = code;
        strFunction = editor.textContent;
    }

    useEffect(() => {
        setCode(props.problem.setup)
    }, [props.problem])

    // skips to next random unsolved problem, but does not return the current problem
    // TODO: needs to persist modified array of unsolved problems, otherwise skipped problems will come back in queue randomly
    const skipProblem = e => {
        ApiManager.getAll('userSolutions').then(solutions => {
            ApiManager.getAll('problems').then(problems => {
                const unsolvedProblems = problems.filter(problem => !solutions.some(solution => solution.problemId === problem.id))
                const index = unsolvedProblems.findIndex(object => object.id === props.problem.id)
                unsolvedProblems.splice(index, 1)
                if (unsolvedProblems.length > 0) {
                    props.setProblem(getRandomIndex(unsolvedProblems))
                } else {
                    props.isReview ? window.alert('Nice! All your reviews are taken care of. We\'ll take you home.') : window.alert('Good work! No new problems left. Let\'s take you home.')
                    props.history.push('/')
                }
            })
        })
    }

    const testSubmission = e => {
        if (strFunction &&
            strFunction.match(/\(([^)]+)\)/) &&
            strFunction.includes('{') &&
            strFunction.includes('}')) {
                const testArg = strFunction.match(/\(([^)]+)\)/)[1]
                const start = strFunction.indexOf('{') + 1
                const end = strFunction.lastIndexOf('}')
                const funcStr = strFunction.substring(start, end)
                const testFunction = new Function(testArg, funcStr)

            // Learn Docker later to make runtime environment for test suites, but can hardcode tests here for now (based on problem.id, while putting these hardcoded 'testfunction === x' into individual files somewhere else so you can call them as variables instead of these long conditionals)
            
                if (problemTests[`problem${props.problem.id}`](testFunction)) { 
                    props.setResult('All tests passed. Good work!')
                    const nextReview = new Date()
                    nextReview.setDate(nextReview.getDate() + 1)
                    const solution = {
                        profileId: JSON.parse(sessionStorage.user),
                        problemId: props.problem.id, 
                        difficultyAssessed: "", 
                        timeTaken: 0, 
                        description: strFunction, 
                        solveDate: new Date().toLocaleString('en-US'), 
                        nextEncounterDate: nextReview.toLocaleString('en-US')
                    }
                    ApiManager.post('userSolutions', solution)
                } else { 
                    props.setResult('Tests failed! Try again.')
                }
        } else window.alert("Write your function! Be sure to include parentheses around your parameters and brackets around your function body.")

    }

    return (
        <>
            <h3>Code Here</h3>
            <ReactCodeJar
                code={code} // Initial code value
                onUpdate={setCode} // Update the text
                highlight={highlight} // Highlight function, receive the editor
            />
            <button type="button" onClick={skipProblem}>Skip It</button>
            <button type="button" onClick={testSubmission}>Ship It</button>
        </>
    )
}

export default Coder