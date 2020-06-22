import React, {useState, useEffect} from 'react'
import ApiManager from '../modules/ApiManager';
import getRandomIndex from '../helpers/getRandomIndex';
import mascot from '../media/mascot1.png';

const Home = props => {
    const [recentSolution, setRecentSolution] = useState({})
    const [nextProblem, setNextProblem] = useState("")
    const [upcomingProblems, setUpcomingProblems] = useState([])

    const getRecentSolution = () => {
        ApiManager.getByProperty('userSolutions', 'profileId', JSON.parse(sessionStorage.user).id)
            .then(solutions => {
                let recent = {solveDate: "12/12/9999, 12:12:12 PM"}
                for (let i = 0; i < solutions.length; i++) {
                    console.log(solutions[i])
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
                <p>Most Recent Solution: {recentSolution.description}</p>
                <div className="home_upcomingProblems">Preview Upcoming Problems: {upcomingProblems.map(problem => <p key={problem.id}>{problem.description}</p>)}</div>
            </div>
            <div className="home_rightside">
                <p>"Habits stay with you even when you don't have the motivation." -- Neeraj Agnihotri</p>
                <button type="button" onClick={() => {props.history.push('/labit')}}>Start Studying!</button>
                <p>Have a question or issue? Let us know!</p>
                <img src={mascot} className="home_mascot"></img>
            </div>
        </div>
    )
}

export default Home