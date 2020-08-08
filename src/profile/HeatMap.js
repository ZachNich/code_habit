import React from 'react'
import HeatMapRow from './HeatMapRow'
import './HeatMap.css'

const HeatMap = props => {
    
    let i = -1
    const incrementRow = () => {
        i++
    }

    console.log('OG data', props.data)
    return (
        <div className="profile_heatmap">
            {
                props.data.map(data => {
                incrementRow()
                return <HeatMapRow data={data} />
            })}
        </div>
    )
}

export default HeatMap