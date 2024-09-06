import React from 'react';
import Link from '@docusaurus/Link';
import './ModDocCardList.component.css';

const DocCardList = ({ equipos = [] }) => {
  return (
    <div className="doc-card-list">
      {equipos.length > 0 ? (
        equipos.map((item) => (
          <div key={item.docId} className="doc-card">
            <Link to={item.docId} style={{ textDecoration: 'none' }}>
              {item.imagen && (
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="doc-card-image"
                />
              )}
              <h3>{item.nombre}</h3>
            </Link>
          </div>
        ))
      ) : 
      console.log('Array de Equipos Vacío:', equipos)}
    </div>
  );
};

export default DocCardList;
