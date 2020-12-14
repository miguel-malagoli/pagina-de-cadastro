// React
import React, { useEffect, useRef, useState } from 'react';
// Tipos
import Data from '../interface';

// Componente Feedback
const Feedback = (props: {data: Data}) => {
    // Axios
    const axios = require('axios');
    // Referência
    const list = useRef<HTMLUListElement>(null);
    // Estado
    const [listPosition, setListPosition] = useState(0);
    const [projectImages, setProjectImages] = useState<Array<string>>([]);
    // Efeito
    useEffect(() => {
        // Fetch das imagens
        axios.get(
            'https://picsum.photos/v2/list'
        ).then((response: any) => {
            if (response.request.readyState === 4 && response.request.status === 200) {
                setProjectImages(response.data.map((img: any) => img.download_url));
            }
        });
        // Evento 'onResize' da janela
        const adjustList = () => {scrollList(0)};
        window.addEventListener('resize', adjustList);
        return () => {window.removeEventListener('resize', adjustList)}
    }, []);
    // Funções
    function scrollList(delta: number) {
        if (list.current) {
            setListPosition(Math.max(0,
                (Math.min((listPosition + delta),
                    (projectImages.length - parseInt(getComputedStyle(list.current).getPropertyValue('--item-view'))))
                )
            ));
        }
    }
    // Verificar booleans antes do render
    const hasPhone2 = (props.data?.phone2 && props.data.phone2.length > 0);
    // Render
    return (
        <div className="feedback">
            <div className="feedback__top"></div>
            <h3 className="feedback__title">Ficha do candidato</h3>
            {props.data ?
                <div className="feedback__info">
                    <label className="feedback__label">Nome completo:</label>
                    <p className="feedback__data">
                        {props.data.name}
                    </p>
                    <label className="feedback__label">E-mail:</label>
                    <p className="feedback__data">
                        {props.data.email}
                    </p>
                    <label className="feedback__label">Telefone 1:</label>
                    <p className="feedback__data">
                        {props.data.phone1}
                    </p>
                    <label className="feedback__label">Telefone 2:</label>
                    <p className={'feedback__data' + hasPhone2 ? '' : ' feedback__data_none'}>
                        {hasPhone2 ? props.data.phone2 : 'Não informado'}
                    </p>
                </div>
                :
                <p className="feedback__blank feedback__blank_visible">
                    Preencha o formulário e clique em "Enviar" após conferir atentamente.
                </p>
            }
            {(projectImages.length > 0) &&
            <div className="projects">
                <h3 className="projects__title">Seus projetos:</h3>
                <div className="projects__carousel">
                    <button
                        className="projects__arrow"
                        onClick={() => scrollList(-1)}>
                    </button>
                    <div className="projects__window">
                        <ul className="projects__list" ref={list} style={{
                            left: 'calc(-' + listPosition.toString() + ' * var(--item-scroll))'
                        }}>
                            {projectImages.map((img: string) => { return (
                                <li className="projects__item" key={img}>
                                    <img
                                        className="projects__image"
                                        src={img}
                                        alt="Capa do projeto"
                                    />
                                </li>
                            )})}
                        </ul>
                    </div>
                    <button
                        className="projects__arrow"
                        onClick={() => scrollList(1)}>
                    </button>
                </div>
            </div>}
        </div>
    );
};
export default Feedback;