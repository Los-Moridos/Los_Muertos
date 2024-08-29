import React, { useState, useRef, useEffect } from 'react';
import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { parse } from 'date-fns';
import InfoIcon from '@mui/icons-material/Info';
import BrowserOnly from '@docusaurus/BrowserOnly';

function TimeConverter({ time }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const isMobile = () => /Mobi|Android/i.test(navigator.userAgent); // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent

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
    <BrowserOnly>
    
    const timeZone = 'America/Mexico_City'; // GMT-6 (CDMX) btw
    
    const parsedTime = parse(time, 'hh:mm aa', new Date()); // https://date-fns.org/v3.6.0/docs/parse
    
    const zonedTime = fromZonedTime(parsedTime, timeZone);  // Asignar zona horaria

    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Detectar zona horaria del navegador

    const localTime = toZonedTime(zonedTime, browserTimeZone);  // Convertir la hora CDMX a la zona horaria de navegador, creo xD

    const convertedTime = format(localTime, 'hh:mm a', { timeZone: browserTimeZone });  // Rehacer el formato de salida

    return convertedTime;
    </BrowserOnly>
    
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
    <span
    onMouseEnter={!isMobile() ? handleMouseEnter : null}
    onMouseLeave={!isMobile() ? handleMouseLeave : null}
    onClick={isMobile() ? handleClick : null}>
      {convertToLocalTime(time)} Hora de tu Ciudad<InfoIcon className="InfoIcon"/>
      
      {showTooltip && (
        <div ref={tooltipRef} className="tooltip">
          {time + " Hora Ciudad de México"}
        </div>
      )}
    </span>
  );
}

export default TimeConverter;