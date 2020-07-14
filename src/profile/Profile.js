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
    const [radarGraph, setRadarGraph] = useState({})
    const [donutGraph, setDonutGraph] = useState({})
    const [showGraph, setShowGraph] = useState('Proficiency')

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
                        setHardestProblem(solution.problem)
                    })
            })
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

    const makeDonutGraph = () => {
        const labels = ["New Problems", "Reviews", "Burned Reviews"]
        const backgroundColor = ["#2ec4b6", "#e71d36", "#011627"]
        let data = [0, 0, 0]
        ApiManager.getAll('userSolutions').then(solutions => {
            ApiManager.getAll('problems').then(problems => {
                const unsolvedProblems = problems.filter(problem => !solutions.some(solution => solution.problemId === problem.id))
                data[0] = unsolvedProblems.length
                const reviews = solutions.filter(solution => solution.nextEncounterDate !== 0)
                data[1] = reviews.length
                const burned = solutions.filter(solution => solution.nextEncounterDate === 0)
                data[2] = burned.length
            })
            const donut = {
                datasets :[{
                    backgroundColor,
                    data,
                    hoverBackgroundColor: backgroundColor
                }],
                labels
            }
            setDonutGraph(donut)
        })
    }

    const toggleShowGraph = e => {
        if (e.target.textContent === "Proficiency") {
            setShowGraph("Proficiency")
        } else if (e.target.textContent === "Progress") {
            setShowGraph("Progress")
        } else {
            setShowGraph("Consistency")
        }
    }
        
    useEffect(() => {
        countSolvedProblems()
        countDaysStudied()
        getJoinDate()
        findHardestProblem()
        makeRadarGraph()
        makeDonutGraph()
    }, [])


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
                    <h3 className="profile_header">Quick Stats</h3>
                    <p className="stats_block">Days Studied: {daysStudied}</p>
                    <p className="stats_block">Problems Solved: {problemsSolved}</p>
                    <p className="stats_block">Reviews Burned: 0</p>
                    <p className="stats_block">Quickest Solve: 400 seconds</p>
                    <p className="stats_block">Slowest Solve: 4 hours 44 minutes 44 seconds</p>
                    <p className="stats_block">Rated Hardest: {hardestProblem.title}</p>
                </div>
                <div className="profile_graphs">
                    <h3 className="profile_header graphs_header">
                        <p onClick={showGraph === "Proficiency" ? null : toggleShowGraph} className={showGraph === "Proficiency" ? "graph_title--active" : "graph_title"}>Proficiency</p>
                        <p onClick={showGraph === "Progress" ? null : toggleShowGraph} className={showGraph === "Progress" ? "graph_title--active" : "graph_title"}>Progress</p>
                        <p onClick={showGraph === "Consistency" ? null : toggleShowGraph} className={showGraph === "Consistency" ? "graph_title--active" : "graph_title"}>Consistency</p>
                    </h3>
                    {showGraph === "Proficiency" ? <Radar data={radarGraph} /> : null}
                    {showGraph === "Progress" ? <Doughnut data={donutGraph} /> : null}
                    {showGraph === "Consistency" ? <Line data={lineGraph} options={{showLines: true}} /> : null}
                </div>
            </div>
        </div>
    )
}

export default Profile