import React, {useState, useEffect} from 'react';
import ApiManager from '../modules/ApiManager';
import avatar from '../media/avatar1.png';
import { Line, Radar, Doughnut } from 'react-chartjs-2';
import './Profile.css'; 

const Profile = props => {
    const [problemsSolved, setProblemsSolved] = useState(0)
    const [daysStudied, setDaysStudied] = useState(0)
    const [joinDate, setJoinDate] = useState("")
    const [hardestProblem, setHardestProblem] = useState("")
    const [hardestSolution, setHardestSolution] = useState("")
    const [radarGraph, setRadarGraph] = useState({})

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
        makeRadarGraph()
    }, [])

    const lineGraph = {datasets: [{
        data: [1, 2, 3, 5, 7, 8, 10, 23],
        label: "Test Dataset"
    }],
        labels: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"]
    }

    const makeRadarGraph = () => {
        const labels = []
        let tagCount = {}
        ApiManager.getAll('tags')
            .then(tags => {
                tags.forEach(tag => {
                    labels.push(tag.name)
                    tagCount[tag.name] = 0
                })
                ApiManager.getByProperty('userSolutions', 'profileId', userId)
                    .then(solutions => {
                        const problemIds = solutions.map(solution => solution.problemId)
                        ApiManager.getAllAndExpand('problemsTags', 'tag')
                            .then(problemsTags => {
                                const matchedTags = problemsTags.filter(problemTag => problemIds.includes(problemTag.problemId))
                                for (let i = 0; i < matchedTags.length; i++) {
                                    tagCount[matchedTags[i].tag.name] = tagCount[matchedTags[i].tag.name] + 1
                                }
                                const tagCountArr = Object.entries(tagCount).sort((a, b) => b[0].localeCompare(a[0]))
                                const data = []
                                for (let i = 0; i < tagCountArr.length; i++) {
                                    data.push(tagCountArr[i][1])
                                }
                                labels.sort()
                                const radar = {
                                    datasets: [{
                                        data: data,
                                        label: "Proficiencies"
                                    }],
                                    labels: labels
                                }
                                setRadarGraph(radar);
                            })
                    })

            })
    }

    return (
        <div className="profile_container">
            <div className="profile_banner">
                <div className="banner_leftside">
                    <img src={avatar} className="profile_avatar" alt="avatar" />
                </div>
                <div className="banner_rightside">
                    <p className="profile_username">{username}</p>
                    <p className="profile_problemsSolved">{`${problemsSolved} problems solved!`}</p>
                    <p className="profile_memberSince">{`Member since ${joinDate}`}</p> 
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_stats">
                    <h3 className="profile_header">Stats</h3>
                    <p className="profile_hardestProblem" onClick={showSolution}>Problem Rated Hardest: <br/>{hardestProblem}</p>
                    <p className="profile_totalDaysStudied">Days Studied: {daysStudied}</p>
                    <p className="profile_fastestSolution"></p>
                </div>
                <div className="profile_graphs">
                    <h3 className="profile_header">Graphs</h3>
                    <Line data={lineGraph} options={{showLines: true}} />
                    <Radar data={radarGraph} />
                </div>
            </div>
        </div>
    )
}

export default Profile