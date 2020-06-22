import React from 'react';

const FeatureCard = props => {
    return (
        <div className="feature_card">
            <img></img>
            <h4>{props.feature.title}</h4>
            <p>{props.feature.description}</p>
        </div>
    )
}

export default FeatureCard