const Matchup = ({ team1, team2, score1, score2, team1Image, team2Image }) => {
  // Determina los estilos basados en los puntajes
  const team1Style = {
    position: 'relative',
    width: '10rem',
    margin: '5px',
    borderRadius: '5px',
    overflow: 'hidden', // Evita que los hijos se salgan del contenedor
    textAlign: 'center',
  };

  const team2Style = {
    position: 'relative',
    width: '10rem',
    margin: '5px',
    borderRadius: '5px',
    overflow: 'hidden',
    textAlign: 'center',
  };

  // Estilo para la capa de la imagen con blur
  const backgroundBlurStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundImage: `url(${team1Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px)', // Aplica el blur
    zIndex: 0,
  };

  const backgroundBlurStyle2 = {
    ...backgroundBlurStyle,
    backgroundImage: `url(${team2Image})`,
  };

  // Filtro de color semitransparente dependiendo del resultado
  const overlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: score1 > score2
      ? 'rgba(0, 255, 0, 0.3)'  // Verde para el ganador
      : score2 > score1
      ? 'rgba(255, 0, 0, 0.3)'  // Rojo para el perdedor
      : 'rgba(0, 0, 0, 0.3)',   // Neutro si aún no hay resultado
    zIndex: 1, // Capa encima del blur
  };

  const overlayStyle2 = {
    ...overlayStyle,
    backgroundColor: score2 > score1
      ? 'rgba(0, 255, 0, 0.3)'  // Verde para el ganador
      : score1 > score2
      ? 'rgba(255, 0, 0, 0.3)'  // Rojo para el perdedor
      : 'rgba(0, 0, 0, 0.3)',   // Neutro si aún no hay resultado
  };

  // Estilo del texto para asegurarse que sea legible
  const textOverlayStyle = {
    position: 'relative', // Para estar por encima del blur y el filtro
    zIndex: 2,
    color: 'white',
    padding: '10px',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '27rem' }}>
        <div style={team1Style}>
          <div style={backgroundBlurStyle}></div> {/* Capa con blur */}
          <div style={overlayStyle}></div> {/* Capa con el filtro de color */}
          <div style={textOverlayStyle}>
            <div>{team1}</div>
            <div>Puntos: {score1}</div>
          </div>
        </div>
        <div>VS</div>
        <div style={team2Style}>
          <div style={backgroundBlurStyle2}></div> {/* Capa con blur */}
          <div style={overlayStyle2}></div> {/* Capa con el filtro de color */}
          <div style={textOverlayStyle}>
            <div>{team2}</div>
            <div>Puntos: {score2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchup;
