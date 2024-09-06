import './Matchups.component.css';
import React from 'react';

const Matchup = ({ team1, team2, score1, score2, team1Image, team2Image }) => {
  const overlayTeam1 = {
    backgroundColor: score1 > score2
      ? 'rgba(0, 255, 0, 0.3)'  // Win
      : score2 > score1
      ? 'rgba(255, 0, 0, 0.3)'  // Lose
      : 'rgba(0, 0, 0, 0.3)',   // En Espera
  };

  const overlayTeam2 = {
    backgroundColor: score2 > score1
      ? 'rgba(0, 255, 0, 0.3)'  // Win
      : score1 > score2
      ? 'rgba(255, 0, 0, 0.3)'  // Lose
      : 'rgba(0, 0, 0, 0.3)',   // En Espera
  };

  return (
    <div className="matchup-container">
      <div className="team-container">
        <div className="team">
          <div className="background-blur" style={{ backgroundImage: `url(${team1Image})` }}></div>
          <div className="overlay" style={overlayTeam1}></div>
          <div className="text-overlay">
          <div class="blur-text-container text-container-padding-bot">
              <div class="team-text-size">{team1}</div>
            </div>
            <div class="blur-text-container text-container-padding-top blur-score-text-container">
              <div className="puntos-text-size">Puntos: {score1}</div>
            </div>
          </div>
        </div>
        <div className="vs">
          <div className="vs-L">V</div>
          <div className="vs-R">S</div>
        </div>
        <div className="team">
          <div className="background-blur" style={{ backgroundImage: `url(${team2Image})` }}></div>
          <div className="overlay" style={overlayTeam2}></div> 
          <div className="text-overlay">
            <div class="blur-text-container text-container-padding-bot">
              <div class="team-text-size">{team2}</div>
            </div>
            <div class="blur-text-container text-container-padding-top blur-score-text-container">
              <div className="puntos-text-size">Puntos: {score2}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchup;
