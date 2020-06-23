import React, {useState, useEffect} from 'react';
import ApiManager from '../modules/ApiManager';
import avatar from '../media/avatar1.png';
import './Profile.css';

const Profile = props => {
    const [problemsSolved, setProblemsSolved] = useState(0)
    const [daysStudied, setDaysStudied] = useState(0)
    const [joinDate, setJoinDate] = useState("")
    const [hardestProblem, setHardestProblem] = useState("")
    const [hardestSolution, setHardestSolution] = useState("")

    const username = JSON.parse(sessionStorage.user).username
    const userId = JSON.parse(sessionStorage.user).id

    const countSolvedProblems = () => {
        let count = 0
        ApiManager.getByProperty('userSolutions', 'profileId', userId)
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data.findIndex(solution => solution.problemId === data[i].problemId) === i) {
                        count++
                    }
                }
                setProblemsSolved(count)
            })
    }

    const getJoinDate = () => {
        ApiManager.get('profiles', userId)
            .then(user => setJoinDate(user.joinDate))
    }

    const findHardestProblem = () => {
        ApiManager.getByProperty('userSolutions', 'profileId', userId)
            .then(data => {
                let hardest = 0
                for (let i = 0; i < data.length; i++) {
                    if (data[i].difficultyAssessed >= data[hardest].difficultyAssessed) {
                        hardest = i;
                    }
                }
                ApiManager.getAndExpand('userSolutions', data[hardest].id, 'problem')
                    .then(solution => {
                        setHardestProblem(solution.problem.description)
                        setHardestSolution(solution.description)
                    })
            })
    }

    let showProblem = true;
    const showSolution = e => {
        if (showProblem) {
            e.target.innerHTML = `Most Recent Solution: <br> ${hardestSolution}`
            showProblem = false
        } else {
            e.target.innerHTML = `Problem Rated Hardest: <br> ${hardestProblem}`
            showProblem = true
        }
    }

    const countDaysStudied = () => {
        let count = 0
        ApiManager.getByProperty('userSolutions', 'profileId', userId)
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data.findIndex(solution => solution.solveDate.split(',')[0] === data[i].solveDate.split(',')[0]) === i) {
                        count++
                    }
                }
                setDaysStudied(count)
            })
    }

    useEffect(() => {
        countSolvedProblems()
        countDaysStudied()
        getJoinDate()
        findHardestProblem()
    }, [])

    return (
        <div className="profile_container">
            <div className="profile_banner">
                <div className="banner_leftside">
                    <img src={avatar} className="profile_avatar" />
                </div>
                <div className="banner_rightside">
                    <p className="profile_username">{username}</p>
                    <p className="profile_problemsSolved">{`${problemsSolved} problems solved!`}</p>
                    <p className="profile_memberSince">{`Member since ${joinDate}`}</p> 
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_stats">
                    <p className="profile_hardestProblem" onClick={showSolution}>Problem Rated Hardest: <br/>{hardestProblem}</p>
                    <p className="profile_totalDaysStudied">Days Studied: {daysStudied}</p>
                    <p className="profile_fastestSolution"></p>
                </div>
                <div className="profile_graphs">Graphs</div>
            </div>
        </div>
    )
}

export default Profile