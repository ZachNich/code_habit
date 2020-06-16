import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ReactCodeJar } from 'react-codejar';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import problemTests from '../helpers/problemTests';
import ApiManager from '../modules/ApiManager';
import getRandomIndex from '../helpers/getRandomIndex'

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

    return (
        <>
            <h3>Code Here </h3>
            <ReactCodeJar
                code={code} // Initial code value
                onUpdate={setCode} // Update the text
                highlight={highlight} // Highlight function, receive the editor
            />
            <button type="button" onClick={() => {
                    if (strFunction &&
                        strFunction.match(/\(([^)]+)\)/) &&
                        strFunction.includes('{') &&
                        strFunction.includes('}')) {
                            let testArg = strFunction.match(/\(([^)]+)\)/)[1];
                            let start = strFunction.indexOf('{') + 1
                            let end = strFunction.lastIndexOf('}')
                            let funcStr = strFunction.substring(start, end)
                            let testFunction = new Function(testArg, funcStr);

                        // Learn Docker later to make runtime environment for test suites, but can hardcode tests here for now (based on problem.id, while putting these hardcoded 'testfuntion === x' into individual files somewhere else so you can call them as variables instead of these long conditionals)
                        
                        // change to props.problem.id once passed down from LabIt.js
                        if (props.problem.id === 1) {
                            if (problemTests.problem1(testFunction)) { console.log('All tests passed. Good work!') }
                            else { (console.log('Tests failed! Try again.')) }
                        }
                    } else window.alert("Write your function! Be sure to include parentheses around your parameters and brackets around your function body.")
                }}>Submit!</button>
        </>
    )
}

export default Coder