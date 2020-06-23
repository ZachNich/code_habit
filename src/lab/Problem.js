import React, { useState, useEffect } from 'react';

const Problem = props => {
    const [description, setDescription] = useState('')

    useEffect(() => setDescription(props.problem.description), [props.problem])

    return (
        <div className="problem_container">
            <h3 className="lab_header">Our Problem</h3>
            <p>{description}</p>
        </div>
    )
}

export default Problem