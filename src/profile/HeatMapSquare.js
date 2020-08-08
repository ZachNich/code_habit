import React from 'react'
import './HeatMap.css'

const HeatMapSquare = props => {
    console.log('square data', props.data)
    return (
        <div className={'heatmap_square ' + props.data.split('-')[1]}>
            {props.data.split('-')[0]}
        </div> 
    )
}

export default HeatMapSquare