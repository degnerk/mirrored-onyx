import { addNodeToDB, addLinkToDB, getAllNodes, getAllLinks, resetDatabase, addCentralNode } from '../database/database.js';


const niceOffset = 300;
const niceTOffset = 100;
const nodeWidth = 300;


export const handleAddNode = async (type, top, left, selectedNode, updateStateCallback, updateErrorMessageCallback, map, setmap,id) => {
    if (selectedNode) {
        
            try{
                const position = handlePosition(map, setmap, selectedNode)

            const newNode = {
                id: `node-${Date.now()}`, // ID based on timestamp so it will always be unique
                type: type,
                top: position[0],
                left: position[1],
                ring: selectedNode.ring+1,
                place: selectedNode.count+1,
                parent: selectedNode,
                id: id
            };


            await setTimeout(() => {
                
            }, 10000);
            const newLink = { from: selectedNode.id, to: newNode.id };

            // Save to IndexedDB
            await addNodeToDB(newNode);
            await addLinkToDB(newLink);

            // Update state
            const nodes = await getAllNodes();
            const links = await getAllLinks();
            updateStateCallback({ nodes, links, selectedNode: null });
        }catch(Error){
            updateErrorMessageCallback("Node Full.");
        setTimeout(() => {
            updateErrorMessageCallback("");
        }, 1500);
        }
        
    } else {
        updateErrorMessageCallback("Please select a node.");
        setTimeout(() => {
            updateErrorMessageCallback("");
        }, 1500);
    }
};

/**
 * Determines what happens when a node is clicked
 * @param nodeId The ID of the node that was clicked
 * @param currentSelectedNode The node that is currently selected
 * @param updateStateCallback Function that updates the state of the node (clicked/un-clicked)
 */
export const handleNodeClick = async (nodeId, currentSelectedNode, updateStateCallback) => {
    const nodes = await getAllNodes();
    const selectedNode =
        currentSelectedNode?.id === nodeId ? null : nodes.find(node => node.id === nodeId);

    updateStateCallback({ selectedNode });
};

/**
 * Resets the project to its initial state
 * @param updateStateCallback The function that updates the state of the project
 */
export const handleReset = async (updateStateCallback, setMap) => {
    setMap(new Map())
    await resetDatabase();
    const nMap = new Map()
    nMap.set(0, [206, 465,0])
    setMap(nMap)
    await addCentralNode();
    const centralNode = await getAllNodes();
    updateStateCallback({ nodes: centralNode, links: [], selectedNode: null });
};



export function handlePosition(map, setMap, selectedNode){
    let top=0
    let left=0
    const ring = selectedNode.ring+1
    console.log("RING:"+ring)
    //I'm going to hardcode the first 4 positions, then the rest will be programmatic
    //this will be vector based.
    const nMap = new Map(map)
    const parentData = nMap.get(selectedNode.id)
    const count = parentData[2]
    const parentTop = parentData[0]
    const parentLeft = parentData[1]
    console.log("count: "+count)
    if(ring==0){
        top = 206
        left = 465
    }else if(ring<2){

        if(count==0){
            top = parentTop
            left = parentLeft-niceOffset
            console.log("parent Top: "+parentTop)
            console.log("made first kid")
            
        }else if(count==1){
            console.log("parent Top: "+parentTop)
            top = parentTop
            left = parentTop+niceOffset+nodeWidth
        }else if(count ==2){
            console.log("parent Top: "+parentTop)
            top = parentTop-niceTOffset
            left = parentLeft
        }else if(count ==3){
            top = parentTop+niceTOffset
            left = parentLeft
        }else{
            throw new console.error();
        }
    }else if(ring<3){
        //const data = nMap.get(selectedNode.selectedNode.id)
        const data = nMap.get(0)
        const grandTop = data[0]
        const grandLeft= data[1]
        //Get direction of node.
        //this should look like x2-x1/distance and y2-y1/distance
        let x = parentLeft-grandLeft
        let y = parentTop-grandTop
        let ranOutofSpace = 100
        if(parentTop!=206){
            if(count==0){
                top = parentTop +y
                left = parentLeft+x
                console.log(`Left: ${left}, Top: ${top}`)
            }else if(count==1){
                //update all nodes
                top = parentTop+y
                left = parentLeft+x+150
            }else if(count==2){
                top = parentTop+y
                left=parentLeft+x-150
            }else{
                throw new Error();
            }
        }else{
            if(count==0){
                top = parentTop +y
                left = parentLeft+(x*.5)
                console.log(`Left: ${left}, Top: ${top}`)
            }else if(count==1){
                //update all nodes
                top = parentTop+y+100
                left = parentLeft+(x*0.5)
            }else if(count==2){
                top = parentTop+y-100
                left=parentLeft+(x*.5)
            }else{
                throw new Error();
            }
        }


    }else{
        throw new Error();
    }

    
    return [top, left]

    
    
}