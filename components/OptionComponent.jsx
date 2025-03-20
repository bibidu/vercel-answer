import React, { useState } from 'react';

function OptionComponent() {
    const [selected, setSelected] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleClick = () => {
        setSelected(true);
        setProgress(prev => prev + 1);
        // 撒花效果
        setTimeout(() => {
            setSelected(false);
        }, 500);
    };

    return (
        <div className={`option ${selected ? 'selected' : ''}`} onClick={handleClick}>
            <span className="good-text">Good</span>
            {/* 撒花效果 */}
            {selected && <div className="confetti">🎉</div>}
        </div>
    );
}

export default OptionComponent; 