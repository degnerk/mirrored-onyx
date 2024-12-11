import React from 'react';

/** Generates a 17x17 grid on the project board
 */
function Grid() {


    return (
        <div className="grid-container">
            {[...Array(289)].map((_, index) =>
                <div className="grid-item" key={index}></div>
            )}
        </div>
    );
}

export default Grid;