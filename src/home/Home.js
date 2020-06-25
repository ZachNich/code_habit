import React, {useState, useEffect} from 'react'
import ApiManager from '../modules/ApiManager';
import getRandomIndex from '../helpers/getRandomIndex';
import mascot from '../media/mascot1.png';
import './Home.css';

const Home = props => {
    const [recentSolution, setRecentSolution] = useState({})
    const [nextProblem, setNextProblem] = useState("")
    const [upcomingProblems, setUpcomingProblems] = useState([])

    const getRecentSolution = () => {
        ApiManager.getByProperty('userSolutions', 'profileId', JSON.parse(sessionStorage.user).id)
            .then(solutions => {
                let recent = {solveDate: "12/12/9999, 12:12:12 PM"}
                for (let i = 0; i < solutions.length; i++) {
                    if (Date.parse(solutions[i].solveDate) < Date.parse(recent.solveDate)) {
                        recent = solutions[i]
                    }
                }
                setRecentSolution(recent)
            })
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
        getRecentSolution()
        getUpcomingProblems()
    }, [])

    useEffect(() => {
        if (upcomingProblems.length > 0) {
            setNextProblem(getRandomIndex(upcomingProblems).description)
        }
    }, [upcomingProblems])

    return (
        <div className="home_container">
            <div className="home_leftside">
                <h4 className="home_header">Most Recent Solution</h4>
                <p className="home_content home_recentSolution">{recentSolution.description}</p>
                <h4 className="home_header">Preview Upcoming Problems</h4>
                <div className="home_content home_upcomingProblems">{upcomingProblems.map(problem => <p key={problem.id} className="home_problem">{problem.description}</p>)}</div>
            </div>
            <div className="home_rightside">
                <aside className="home_quote">"Habits stay with you even when you don't have the motivation." <p className="home_quote_author">— Neeraj Agnihotri</p></aside>
                <button type="button" className="study_btn" onClick={() => {props.history.push('/labit')}}>Start Studying!</button>
                <p className="home_support">Have a question or issue? Let us know!</p>
                <div className="img_container">
                    <img src={mascot} className="home_mascot"></img>
                </div>
            </div>
        </div>
    )
}

export default Home