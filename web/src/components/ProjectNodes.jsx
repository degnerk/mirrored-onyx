import React from "react";
import Node from "./Node";

/**
 * The collage of all nodes on the project board
 * @param allSubNodes An array of all sub-nodes on the project board
 * @param onNodeClick Function that determines what happens when a node is clicked (`handleNodeClick` in logic.js)
 * @param selectedNode The node that is currently selected
 * @returns {Element} All nodes to display on the project board, this includes both central and sub-nodes
 */
const ProjectNodes = ({ allSubNodes, onNodeClick, selectedNode }) => {

    return (
        <div>
            {allSubNodes.map(node => (
                <Node
                    key={node.id}
                    id={node.id}
                    top={node.top}
                    left={node.left}
                    type={node.type}
                    onClick={() => onNodeClick(node.id)}
                    isSelected={selectedNode?.id === node.id}
                />
            ))}
        </div>
    )
}

export default ProjectNodes;