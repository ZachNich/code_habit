import React from 'react'
import HeatMapSquare from './HeatMapSquare'
import './HeatMap.css'

const HeatMapRow = props => {

    let j = -1
    const incrementCol = () => {
        j++
    }

    console.log('row data', props.data)
    return (
        <div className="heatmap_row">
            {props.data.map(data => {
                incrementCol()
                return <HeatMapSquare data={data} /> 
            })}
        </div>
    )
}

export default HeatMapRow