import React from 'react'
import './HeatMap.css'

const HeatMapSquare = props => {
    return (
        <div className={'heatmap_square ' + props.data.split('-')[1]}>
            {props.data.split('-')[0]}
        </div> 
    )
}

export default HeatMapSquare