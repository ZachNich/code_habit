import React from 'react';
import FeatureCard from './FeatureCard';
import mascot from '../media/mascot1.png';
import { Link } from 'react-router-dom';

const Introduction = props => {
    const features = [
        {id: 1, title: "Big Feature 1", description: "Very cool feature, let me tell you."}, 
        {id: 2, title: "Big Feature 2", description: "Very hot feature, let me tell you."},
        {id: 3, title: "Big Feature 3", description: "Very big feature, let me tell you."},
        {id: 4, title: "Big Feature 4", description: "Very neat feature, let me tell you."}
    ]

    return (
        <div className="into_container">
            <div className="intro_panel_1">
                <p>"Habits stay with you even when you don't have the motivation." -- Neeraj Agnihotri</p>
            </div>
            <div className="intro_panel_2">
                <h3>What's up with Code Habit?</h3>
                <div className="intro_features">
                    {features.map(feature => <FeatureCard key={feature.id} feature={feature} />)}
                </div>
            </div>
            <div className="intro_panel_3">
                <img src={mascot}></img>
                <p>Ready to pick up the habit? Try Code Habit for free.</p>
                <button type="button" onClick={() => {props.history.push('/signup')}}>Start</button>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
    )
}

export default Introduction