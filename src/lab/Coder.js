import React, { useState, useEffect } from 'react';
import { ReactCodeJar } from 'react-codejar';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import ApiManager from '../modules/ApiManager'

let strFunction = ''

const Coder = props => {
    // add props.problem.setup to useState
    const [code, setCode] = useState(props.problem.setup);
    
    const highlight = editor => {
        let code = Prism.highlight(editor.textContent, Prism.languages.javascript, 'javascript');
        editor.innerHTML = code;
        strFunction = editor.textContent;
    }
    
    // ATTN: props.problem is handled asynchronously, so it's not available when you want to set it to the initial function string. How to handle this? Ask teacher. 
    useEffect(() => setCode(props.problem.setup), [])

    return (
        <>
            <h3>Code Here </h3>
            <ReactCodeJar
                code={code} // Initial code value
                onUpdate={setCode} // Update the text
                highlight={highlight} // Highlight function, receive the editor
            />
            <button type="button" onClick={() => {
                console.log(props.problem)
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
                            if (testFunction(10) === 23 && testFunction(100) === 2318 && testFunction(999) === 232169 && testFunction(0) === 0 && testFunction (15) === 45) { console.log('All tests passed. Good work!') }
                            else { (console.log('Tests failed! Try again.')) }
                        }
                    } else window.alert("Write your function! Be sure to include parentheses around your parameters and brackets around your function body.")
                }}>Submit!</button>
        </>
    )
}

export default Coder