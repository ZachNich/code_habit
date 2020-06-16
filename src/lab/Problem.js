import React, { useState, useEffect } from 'react';

const Problem = props => {
    const [description, setDescription] = useState('')

    useEffect(() => setDescription(props.problem.description), [props.problem])

    return (
        <>
            <h3>Here's a problem:</h3>
            <p>{description}</p>
        </>
    )
}

export default Problem