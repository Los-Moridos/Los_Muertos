import React, { useState, useRef, useEffect } from 'react';
import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { parse } from 'date-fns';
import InfoIcon from '@mui/icons-material/Info';
import BrowserOnly from '@docusaurus/BrowserOnly';

function TimeConverter({ time }) {
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

  const convertToLocalTime = (time) => {
    const timeZone = 'America/Mexico_City';                                             // GMT-6 (CDMX)
    const parsedTime = parse(time, 'hh:mm aa', new Date());                             // Parsear input time
    const zonedTime = fromZonedTime(parsedTime, timeZone);                              // Asignar zona horaria
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;           // Detectar zona horaria del navegador
    const localTime = toZonedTime(zonedTime, browserTimeZone);                          // Convertir hora CDMX a hora local
    const convertedTime = format(localTime, 'hh:mm a', { timeZone: browserTimeZone });  // Formatear el output
    return convertedTime;
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
    <BrowserOnly>
      {() => (
        <span
          onMouseEnter={!/Mobi|Android/i.test(navigator.userAgent) ? handleMouseEnter : null}
          onMouseLeave={!/Mobi|Android/i.test(navigator.userAgent) ? handleMouseLeave : null}
          onClick={/Mobi|Android/i.test(navigator.userAgent) ? handleClick : null}
        >
          {convertToLocalTime(time)} Hora de tu Ciudad<InfoIcon className="InfoIcon" />
          {showTooltip && (
            <div ref={tooltipRef} className="tooltip">
              {time + " Hora Ciudad de México"}
            </div>
          )}
        </span>
      )}
    </BrowserOnly>
  );
}

export default TimeConverter;