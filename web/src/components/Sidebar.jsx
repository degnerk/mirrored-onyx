import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaRedo } from 'react-icons/fa';
import SidebarIcon from './SidebarIcon';

/**
 * Sidebar component responsible for holding editing features for the project board
 * Includes features such as adding a new node and resetting the project to its initial state
 * @param addNode Function that creates a new node on the project board (`handleAddNode` in logic.js)
 * @param resetProject Function that resets the project to its initial state (`handleReset` in logic.js)
 * @param selectedNode The node that is currently selected
 * @param setErrorMessage Defines any errors that have occurred (`setErrorMessage` in logic.js)
 */
function Sidebar({ addNode, resetProject, selectedNode, setErrorMessage }) {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const popupRef = useRef(null);

    const menuItems = [
        {
            id: 1,
            label: 'New Node',
            icon: <FaPlus size={20} color="#fff" />,
            bgColor: '#223046',
            onClick: (e) => { handleAddNodeClick(e); }
        },
        { 
            id: 2, 
            label: 'Reset', 
            icon: <FaRedo size={20} color="#fff" />, 
            bgColor: '#D23F3F', 
            onClick: resetProject 
        }
    ];

    // Function to handle the "New Node" click
    const handleAddNodeClick = (e) => {
        if (selectedNode) {
            const { top, left } = e.target.getBoundingClientRect();
            setPopupPosition({ top, left });
            setPopupVisible(true);
        } else {
            setErrorMessage("Please select a node.");
            setTimeout(() => {
                setErrorMessage("");
            }, 1500);
        }
    }

    // Function to handle node type selection
    const handleNodeTypeSelection = (type) => {
        setPopupVisible(false);
        addNode(type, popupPosition.top, popupPosition.left);
    };

    // Function to handle clicks outside the popup
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setPopupVisible(false);
        }
    };

    useEffect(() => {
        if (popupVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupVisible]);

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar-header">Edit Menu</div>
                <div className="sidebar-items">
                    {menuItems.map((item) => (
                        <SidebarIcon
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            bgColor={item.bgColor}
                            onClick={item.onClick}
                        />
                    ))}
                </div>
            </div>
            {popupVisible && (
                <div className="popup" ref={popupRef}>
                    <div className="popup-content">
                        <h3>Node Type</h3>
                        <button onClick={() => handleNodeTypeSelection('Text Node')}>Text Node</button>
                        <button onClick={() => handleNodeTypeSelection('File Node')}>File Node</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
