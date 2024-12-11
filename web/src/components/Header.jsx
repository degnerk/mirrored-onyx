import React from 'react';

/**
 * Header item responsible for displaying the project title and logo
 */
function Header() {
    return (
        <header className="header">
            <div className="logo"><img src="./onyx.png" alt="Onyx Logo" /></div>
            <div className="project-title">New Project</div>
        </header>
    );
}

export default Header;
