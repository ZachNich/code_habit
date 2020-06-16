import React, { useState } from 'react';

const TestResults = props => {
    return (
        <>
            <h3>Test Results:</h3>
            <p>{props.result}</p>
        </>
    )
}

export default TestResults