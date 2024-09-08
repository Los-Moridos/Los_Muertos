import React, { useState, useRef, useEffect } from 'react';
import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { parse } from 'date-fns';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Tooltip from '@site/src/components/GenericTooltip.js';
import './TimeConverter.component.css';

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
        <div className='time-container'>
          {
            <Tooltip text={`${convertToLocalTime(time)}`}>
              {convertToLocalTime(time) + " Hora de tu Ciudad"}
              <br/>
              {time + " Hora Ciudad de México"}
            </Tooltip>
          }
        </div>
      )}
    </BrowserOnly>
  );
}

export default TimeConverter;