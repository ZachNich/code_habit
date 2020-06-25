import React from 'react';
import FeatureCard from './FeatureCard';
import mascot from '../media/mascot1.png';
import { Link } from 'react-router-dom';
import './Introduction.css';
import background from '../media/bg_bunny.mp4';

const Introduction = props => {
    const features = [
        {id: 1, title: "Habitual", description: 'Bruce Lee once said, "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times." Code Habit trains you with repetition, ensuring you learn and remember the core fundamentals of programming.'}, 
        {id: 2, title: "Spaced Repetition", description: "You'll encounter reviews after solving problems. Considering how difficult the problem was for you, we'll space the reviews out. If a problem was easy, there will be more time between reviews. Manipulating the space between repetitions increases memory and retention of what you've learned. Think of it as your personalized learning pace."},
        {id: 3, title: "Resources", description: "Stuck on a problem? We've got you. Find appropriate resources for any problem on our website so you can keep all your learning in one place. This is a place for both practicing old concepts and learning new ones."},
        {id: 4, title: "Community", description: "Code Habit provides an optimal solution to each problem, but you may also view other users' solutions. If you're hung up on a problem after using the provided resources, head over to our forums to discuss the problem with other users."}
    ]

    return (
        <div className="video_container">
            <video className="intro_video" autoPlay="autoplay" loop="loop" muted>
                <source src={background} type="video/mp4" />
            </video>
            <div className="intro_container">
                <div className="intro_panel quote_container">
                    <div className="intro_quote">"Habits stay with you even when you don't have the motivation." <p className="intro_quote_author">— Neeraj Agnihotri</p></div>
                </div>
                <div className="intro_panel">
                    <h3 className="intro_header">What's up with Code Habit?</h3>
                    <div className="intro_features">
                        {features.map(feature => <FeatureCard key={feature.id} feature={feature} />)}
                    </div>
                </div>
                <div className="intro_panel call_to_action">
                    <div className="mascot_container">
                        <img className="mascot" src={mascot}></img>
                    </div>
                    <p className="intro_ready">Ready to pick up the habit?</p>
                    <p className="hop_to_it">Hop to it and try Code Habit for free.</p>
                    <button type="button" className="intro_btn" onClick={() => {props.history.push('/signup')}}>Sign Up</button>
                    <button type="button" className="intro_btn" onClick={() => {props.history.push('/login')}}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Introduction