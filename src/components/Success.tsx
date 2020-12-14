// React
import React from 'react';
// Imagens
import check from '../svg/check.svg';

// Componente Success
const Success = () => {
    return (
        <div className="success" id="success">
            <img
                className="success__check"
                src={check}
                alt="Sucesso!"
            />
            <div className="success__line"></div>
            <p className="success__text">
                Candidatura enviada com sucesso!
            </p>
        </div>
    );
};
export default Success;