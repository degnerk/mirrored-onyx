import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../App';
/**
 * Represents a node on the project board
 * @param top Represents how far the node is from the top of the project board (ex: 100px from the top)
 * @param left Represents how far the node is from the left of the project board (ex: 100px from the left)
 * @param type Represents the type of node (Text, File, Central Node)
 * @param onClick Once yje node is clicked, a function is called (mostly a selected node function `handleNodeClick` in logic.js)
 * @param isSelected Boolean that represents if the node is selected
 * @returns {Element} A fully functional node to display on the project board
 */
function Node({ top, left, type, onClick, isSelected, ring, place, parent, id, childCount = 0 }) {
    const [data, setData] = useState({ top, left, childCount }); // Initialize state with props
    const [map, setMap] = useContext(Context);

    

    useEffect(() => {
        // Create a new map to avoid mutating the old map
        const nMap = new Map(map);
        nMap.set(id, [data.top, data.left, data.childCount]);
        //console.log(nMap)
        setMap(nMap); // Update the context with the new map

        
    },[]); // Depend on `data` for updates
    
    useEffect(() => {
        const nMap = new Map(map)
        
        if(nMap.has(id)){
            const data = nMap.get(id)
            console.log(data)
            setData({ top: data[0], left: data[1], childCount: data[2] }); // Access by index
            
        }


    },[map])







    return (
        <div
            className={`node ${isSelected ? "node-selected" : ""}`}
            style={{ top: data.top, left: data.left, position: 'absolute', cursor: 'pointer' }}
            onClick={onClick}
        >
            {type}
        </div>
    );
}

export default Node;
