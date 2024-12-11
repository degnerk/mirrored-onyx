import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../App';

function Node({ top, left, type, onClick, isSelected, id, childCount = 0 }) {
    const [data, setData] = useState({ top, left, childCount });
    const [map, setMap] = useContext(Context);

    useEffect(() => {
        const nMap = new Map(map);
        nMap.set(id, [data.top, data.left, data.childCount]);
        setMap(nMap);
    }, [data, id, map, setMap]);

    useEffect(() => {
        const nMap = new Map(map);
        if (nMap.has(id)) {
            const nodeData = nMap.get(id);
            setData({ top: nodeData[0], left: nodeData[1], childCount: nodeData[2] });
        }
    }, [map, id]);

    return (
        <div
            className={`node ${isSelected ? 'node-selected' : ''}`}
            style={{ top: data.top, left: data.left, position: 'absolute', cursor: 'pointer' }}
            onClick={onClick}
        >
            {type}
        </div>
    );
}

export default Node;

