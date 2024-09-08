import React, { useState, useRef, useEffect } from 'react';
import './GenericTooltip.component.css';

function Tooltip({ text, children }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const handleClick = () => {
        setShowTooltip(!showTooltip);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (


        <div
            onMouseEnter={!/Mobi|Android/i.test(navigator.userAgent) ? handleMouseEnter : null}
            onMouseLeave={!/Mobi|Android/i.test(navigator.userAgent) ? handleMouseLeave : null}
            onClick={/Mobi|Android/i.test(navigator.userAgent) ? handleClick : null}
            class="tooltip-container"
        >
            <div className='tooltip-text'>{text}</div>
            {showTooltip && (
                <div ref={tooltipRef} className="tooltip">
                    {children}
                </div>
            )}
        </div>


    );
}

export default Tooltip;