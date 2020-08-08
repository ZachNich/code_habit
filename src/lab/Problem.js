import React, { useState, useEffect } from 'react';

const Problem = props => {
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        setDescription(props.problem.description)
        setTitle(props.problem.title)
    }, [props.problem])

    return (
        <div className="problem_container">
            <h3 className="lab_header">Our Problem</h3>
            <h5 className="lab_problem_title">{title}</h5>
            <p>{description}</p>
        </div>
    )
}

export default Problem