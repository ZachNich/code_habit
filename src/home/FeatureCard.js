import React from 'react';

const FeatureCard = props => {
    return (
        <div className="feature_card">
            <h4 className="feature_title">{props.feature.title}</h4>
            <p className="feature_description">{props.feature.description}</p>
        </div>
    )
}

export default FeatureCard