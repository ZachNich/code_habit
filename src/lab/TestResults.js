import React, { useEffect } from 'react';

const TestResults = props => {

    return (
        <>
            <h3 className="lab_header">Test Results</h3>
            <p className={props.clicked ? "lab_result_blink" : "lab_result"}>{props.result}</p>
        </>
    )
}

export default TestResults