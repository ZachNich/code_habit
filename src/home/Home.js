import React, {useState, useEffect} from 'react'
import ApiManager from '../modules/ApiManager';
import Prism from 'prismjs';
import 'prismjs/themes/prism-xonokai.css';
import mascot from '../media/mascot1.png';
import './Home.css';

const Home = props => {
    const [solutions, setSolutions] = useState([])
    const [recentSolution, setRecentSolution] = useState({})
    const [recentProblem, setRecentProblem] = useState({})
    const [upcomingProblems, setUpcomingProblems] = useState([])

    const getSolutions = () => {
        ApiManager.getByProperty('userSolutions', 'profileId', JSON.parse(sessionStorage.user).id)
            .then(setSolutions)
    }

    const getRecentSolution = () => {
        let recent = {solveDate: "12/12/12, 12:12:12 PM"}
        for (let i = 0; i < solutions.length; i++) {
            if (Date.parse(solutions[i].solveDate) > Date.parse(recent.solveDate)) {
                recent = solutions[i]
            }
        }
        setRecentSolution(recent)
        if (recent.id) {
            ApiManager.get('problems', recent.problemId)
                .then(setRecentProblem)
        } 
    }

    const getUpcomingProblems = () => {
        ApiManager.getAll('userSolutions').then(solutions => {
            ApiManager.getAll('problems').then(problems => {
                const unsolvedProblems = problems.filter(problem => !solutions.some(solution => solution.problemId === problem.id))
                setUpcomingProblems(unsolvedProblems)
            })
        })
    }

    useEffect(() => {
        getSolutions()
        getUpcomingProblems()
    }, [])

    useEffect(() => {
        getRecentSolution()
    }, [solutions])

    Prism.highlightAll()

    return (
        <div className="home_container">
            <div className="home_leftside">
                <h4 className="home_header">Most Recent Solution</h4>
                <h5 className="home_subheader">{recentProblem.title}</h5>
                <pre className="home_content home_recentSolution"><code className="language-javascript">{recentSolution.description}</code></pre>
                <h4 className="home_header">Preview Upcoming Problems</h4>
                <div className="home_content home_upcomingProblems">{upcomingProblems.map(problem => <p key={problem.id} className="home_problem">{problem.description}</p>)}</div>
            </div>
            <div className="home_rightside">
                <aside className="home_quote">"Habits stay with you even when you don't have the motivation." <p className="home_quote_author">— Neeraj Agnihotri</p></aside>
                <button type="button" className="study_btn" onClick={() => {props.history.push('/labit')}}>Start Studying!</button>
                <p className="home_support">Have a question or issue? Let us know!</p>
                <div className="img_container">
                    <img src={mascot} className="home_mascot" alt="mascot"></img>
                </div>
            </div>
        </div>
    )
}

export default Home