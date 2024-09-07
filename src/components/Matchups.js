import './Matchups.component.css';
import React, { useState, useEffect } from 'react';

async function fetch_json(key) {
  const js_page = 'https://los-moridos.github.io/Los_Muertos_Files/';
  const js_key = key + `.json?v=${Date.now()}`;
  console.log(js_key)
  const response = await fetch(`${js_page}${js_key}`);
  const data = await response.json();
  return data;
}

const Matchup = ({ jornada, enfrentamiento, front, json }) => {
  console.log(json)
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    async function loadJson() {
      const data = await fetch_json(json);
      setJsonData(data);
    }

    loadJson();
  }, [json]);

  if (!jsonData) {
    return <div>Cargando `(Futuro Esqueleo de Carga)`...</div>;
  }

  const jornada_key = `jornada_${jornada}`;
  const enfrentamiento_key = `enfrentamiento_${enfrentamiento}`;

  const score_1 = jsonData?.jornadas?.[jornada_key]?.[enfrentamiento_key]?.equipo_1?.puntos || 0;
  const score_2 = jsonData?.jornadas?.[jornada_key]?.[enfrentamiento_key]?.equipo_2?.puntos || 0;
  const team_1 = jsonData?.jornadas?.[jornada_key]?.[enfrentamiento_key]?.equipo_1?.nombre;
  const team_2 = jsonData?.jornadas?.[jornada_key]?.[enfrentamiento_key]?.equipo_2?.nombre;
  const team_1_Front = front.find(equipo => equipo.nombre === team_1);
  const team_2_Front = front.find(equipo => equipo.nombre === team_2);
  const team_1Image = team_1_Front?.imagen;
  const team_2Image = team_2_Front?.imagen;

  const overlayteam_1 = {
    backgroundColor: score_1 > score_2
      ? 'rgba(0, 255, 0, 0.3)'  // Win
      : score_2 > score_1
        ? 'rgba(255, 0, 0, 0.3)'  // Lose
        : 'rgba(0, 0, 0, 0.3)',   // En Espera
  };

  const overlayteam_2 = {
    backgroundColor: score_2 > score_1
      ? 'rgba(0, 255, 0, 0.3)'  // Win
      : score_1 > score_2
        ? 'rgba(255, 0, 0, 0.3)'  // Lose
        : 'rgba(0, 0, 0, 0.3)',   // En Espera
  };

  return (
    <div className="matchup-container">
      <div className="team-container">
        <div className="team">
          <div className="background-blur" style={{ backgroundImage: `url(${team_1Image})` }}></div>
          <div className="overlay" style={overlayteam_1}></div>
          <div className="text-overlay">
            {(score_1 === 0 && score_2 === 0) ? (
              <div className="blur-text-container">
                <div className="team-text-size">{team_1}</div>
              </div>
            ) : (
              <>
                <div className="blur-text-container text-container-padding-bot">
                  <div className="team-text-size">{team_1}</div>
                </div>
                <div className="blur-text-container text-container-padding-top blur-score-text-container">
                  <div className="puntos-text-size">Puntos: {score_1}</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="vs">
          <div className="vs-L">V</div>
          <div className="vs-R">S</div>
        </div>
        <div className="team">
          <div className="background-blur" style={{ backgroundImage: `url(${team_2Image})` }}></div>
          <div className="overlay" style={overlayteam_2}></div>
          <div className="text-overlay">
            {(score_1 === 0 && score_2 === 0) ? (
              <div className="blur-text-container">
                <div className="team-text-size">{team_2}</div>
              </div>
            ) : (
              <>
                <div className="blur-text-container text-container-padding-bot">
                  <div className="team-text-size">{team_2}</div>
                </div>
                <div className="blur-text-container text-container-padding-top blur-score-text-container">
                  <div className="puntos-text-size">Puntos: {score_2}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchup;
