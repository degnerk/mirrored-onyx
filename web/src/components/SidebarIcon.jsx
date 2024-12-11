import React from 'react';

/**
 * Represents the styling format of the buttons on the sidebar
 * @param icon The icon to display on the button
 * @param label Text to display under the button
 * @param bgColor The background color of the button
 * @param onClick Function to call when the button is clicked
 */
function SidebarIcon({ icon, label, bgColor, onClick }) {
    return (
        <div 
            className="sidebar-icon" 
            onClick={onClick}
        >
            <div className="icon-container"  style={{ backgroundColor: bgColor }}>{icon}</div>
            <div className="icon-label">{label}</div>
        </div>
    );
}

export default SidebarIcon;

