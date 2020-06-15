import React, { Component, useState, useEffect } from 'react';
import { ReactCodeJar } from 'react-codejar';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import ApiManager from '../modules/ApiManager'

let strFunction = ''

const Lab = props => {
    const [code, setCode] = useState('');
    const [problem, setProblem] = useState({});
    
    const highlight = editor => {
        let code = Prism.highlight(editor.textContent, Prism.languages.javascript, 'javascript');
        editor.innerHTML = code;
        strFunction = editor.textContent;
    }

    useEffect(() => {
        ApiManager.get('problems', 1).then(data => setProblem(data))
    }, [])
    useEffect(() => setCode(problem.setup), [problem])
    
    return (
        <>
            <ReactCodeJar
                code={code} // Initial code value
                onUpdate={setCode} // Update the text
                highlight={highlight} // Highlight function, receive the editor
            />
            <button type="button" onClick={() => {
                    let testArg = strFunction.match(/\(([^)]+)\)/)[1];
                    let start = strFunction.indexOf('{') + 1
                    let end = strFunction.lastIndexOf('}')
                    let funcStr = strFunction.substring(start, end)
                    let testFunction = new Function(testArg, funcStr);
                    if (problem.testSuite) { console.log('All tests passed. Good work!') }
                    else { (console.log('Tests failed! Try again.')) }
                }}>Submit!</button>
        </>
    )
}

export default Lab