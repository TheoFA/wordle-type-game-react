import React from "react"

export function Chip(props) {
    
    const style = {
        backgroundColor : props.backgroundColor,
        color: props.color,
        paddingRight: '2%',
        paddingLeft: '2%',
        marginTop: '2%',
        borderRadius: "2px"
    }

    const styleDead = {
        backgroundColor: "#808080",
        paddingRight: '2%',
        paddingLeft: '2%',
        marginTop: '2%',
        borderRadius: "2px"
    }
return(
    <div style={props.dead? styleDead : style}>
    <p>{props.dead?  "💀" : props.name}</p>
    </div>
)
}