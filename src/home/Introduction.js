import React from 'react';
import FeatureCard from './FeatureCard';
import mascot from '../media/mascot1.png';
import { Link } from 'react-router-dom';
import './Introduction.css';
import background from '../media/mtn_bg_vid.mov';

const Introduction = props => {
    const features = [
        {id: 1, title: "Habitual", description: 'Bruce Lee once said, "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times." Code Habit trains you with repetition, ensuring you learn and remember the core fundamentals of programming.'}, 
        {id: 2, title: "Spaced Repetition", description: "You'll encounter reviews after solving problems. Considering how difficult the problem was for you, we'll space the reviews out. If a problem was easy, there will be more time between reviews. Manipulating the space between repetitions increases memory and retention of what you've learned. Think of it as your personalized learning pace."},
        {id: 3, title: "Resources", description: "Stuck on a problem? We've got you. Find appropriate resources for any problem on our website so you can keep all your learning in one place. This is a place for both practicing old concepts and learning new ones."},
        {id: 4, title: "Community", description: "Code Habit provides an optimal solution to each problem, but you may also view other users' solutions. If you're hung up on a problem after using the provided resources, head over to our forums to discuss the problem with other users."}
    ]

    return (
        <div className="intro_container">
            <video className="intro_video" autoPlay="autoplay" loop="loop">
                <source src={background} type="video/mov" />
            </video>
            <div className="intro_panel quote_container">
                <div className="intro_quote">"Habits stay with you even when you don't have the motivation." <p className="quote_author">— Neeraj Agnihotri</p></div>
            </div>
            <div className="intro_panel">
                <h3>What's up with Code Habit?</h3>
                <div className="intro_features">
                    {features.map(feature => <FeatureCard key={feature.id} feature={feature} />)}
                </div>
            </div>
            <div className="intro_panel">
                <div className="mascot_container">
                    <img className="mascot" src={mascot}></img>
                </div>
                <p>Ready to pick up the habit? Try Code Habit for free.</p>
                <button type="button" onClick={() => {props.history.push('/signup')}}>Start</button>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
    )
}

export default Introduction