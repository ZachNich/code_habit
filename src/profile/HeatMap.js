import React from 'react'
import HeatMapRow from './HeatMapRow'
import './HeatMap.css'

const HeatMap = props => {
    
    let i = -1
    const incrementRow = () => {
        i++
    }

    return (
        <div className="profile_heatmap">
            <div className="heatmap_key">
                <div className="key_color_true"></div>
                <div className="key_name_true">Studied</div>
                <div className="key_color_false"></div>
                <div className="key_name_false">Didn't study</div>
            </div>
            {
                props.data.map(data => {
                incrementRow()
                return <HeatMapRow data={data} />
            })}
        </div>
    )
}

export default HeatMap