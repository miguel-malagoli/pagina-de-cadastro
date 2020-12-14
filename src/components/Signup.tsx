// React
import React, { ChangeEvent, FormEvent, useState } from 'react';
// Constantes e tipos
import Data from '../interface';
import * as RGX from '../regex';

// Componente
const Signup = (props: {handleData: (data: Data) => void}) => {
    // Estado
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPhone1, setValidPhone1] = useState(true);
    const [validPhone2, setValidPhone2] = useState(true);
    const [success, setSuccess] = useState(false);
    // Funções
    function handleSubmit(event: FormEvent) {
        if (
            validateName() &&
            validateEmail() &&
            validatePhone1() &&
            validatePhone2()
        ) {
            props.handleData({
                name,
                email,
                phone1,
                phone2
            });
            setSuccess(true);
        }
        event.preventDefault();
    }
    function validateName() {
        const valid = (name.length > 0 && RGX.SP_CHAR.test(name) === false && name.includes('  ') === false);
        setValidName(valid);
        return valid;
    }
    function validateEmail() {
        const valid = (email.length > 0 && RGX.EMAIL_FORMAT.test(email));
        setValidEmail(valid);
        return valid;
    }
    function validatePhone1() {
        const valid = (phone1.length > 0 && phone1.length <= 15 && RGX.PHONE_CHAR.test(phone1));
        setValidPhone1(valid);
        return valid;
    }
    function validatePhone2() {
        const valid = (phone2.length === 0 || (phone2.length <= 15 && RGX.PHONE_CHAR.test(phone2)));
        setValidPhone2(valid);
        return valid;
    }
    function formatPhone(event: ChangeEvent<HTMLInputElement>, setState: ((value: string) => void)) {
        let newPhone = event.target.value.replace(/\D/g, '');
        if (newPhone.length > 0) newPhone = ['(', newPhone].join('');
        if (newPhone.length >= 3) newPhone = [newPhone.substr(0, 3), ') ', newPhone.substr(3)].join('');
        if (newPhone.length >= 9) {
            if (newPhone.length < 14) {
                newPhone = [newPhone.substr(0, 9), '-', newPhone.substr(9)].join('');
            } else {
                newPhone = [newPhone.substr(0, 10), '-', newPhone.substr(10)].join('');
            }
        }
        setState(newPhone);
        event.preventDefault();
    }
    // Render
    return (
        <div className="signup">
            <h1 className="signup__title">Venha trablhar na Docket</h1>
            <p className="signup__text">
                Preencha o formulário abaixo e venha trabalhar em uma das startups mais desejadas do Brasil!
            </p>
            <form className="signup__form" onSubmit={handleSubmit}>
                <h2 className="signup__subtitle">Dados pessoais</h2>
                <label className="signup__label signup__label_required" htmlFor="form-name">Nome completo:</label>
                <input
                    className={'signup__input' + (validName ? '' : ' signup__input_error')}
                    type="text"
                    placeholder="Seu nome"
                    id="form-name"
                    value={name}
                    onChange={(event) => {setName(event.target.value)}}
                    onBlur={validateName}
                    required
                />
                <p className="signup__message" style={{opacity: (validName ? 0 : 1)}}>
                    Preencha esse campo com apenas letras e espaços
                </p>
                <label className="signup__label signup__label_required" htmlFor="form-email">E-mail:</label>
                <input
                    className={'signup__input' + (validEmail ? '' : ' signup__input_error')}
                    type="email"
                    placeholder="seunome@sobrenome.com.br"
                    id="form-email"
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    onBlur={validateEmail}
                    required
                />
                <p className="signup__message" style={{opacity: (validEmail ? 0 : 1)}}>
                    Preencha esse campo com um email válido
                </p>
                <div className="signup__flex">
                    <div className="signup__wrapper">
                        <label className="signup__label signup__label_required" htmlFor="form-phone1">Telefone 1:</label>
                        <input
                            className={'signup__input' + (validPhone1 ? '' : ' signup__input_error')}
                            type="text"
                            placeholder="(88) 8888-8888"
                            id="form-phone1"
                            value={phone1}
                            onChange={(event) => {formatPhone(event, setPhone1)}}
                            onBlur={validatePhone1}
                            maxLength={15}
                            required
                        />
                        <p className="signup__message" style={{opacity: (validPhone1 ? 0 : 1)}}>
                            Preencha esse campo com um número de telefone válido
                        </p>
                    </div>
                    <div className="signup__wrapper">
                        <label className="signup__label" htmlFor="form-phone2">Telefone 2:</label>
                        <input
                            className={'signup__input' + (validPhone2 ? '' : ' signup__input_error')}
                            type="text"
                            placeholder="(88) 8888-8888"
                            id="form-phone2"
                            value={phone2}
                            onChange={(event) => {formatPhone(event, setPhone2)}}
                            onBlur={validatePhone2}
                            maxLength={15}
                        />
                        <p className="signup__message" style={{opacity: (validPhone2 ? 0 : 1)}}>
                            O número informado não é válido
                        </p>
                    </div>
                </div>
                <button
                    className="signup__button"
                    type="submit"
                    disabled={success || (!validName && !validEmail && !validPhone1 && !validPhone2)}>
                        Enviar
                </button>
            </form>
        </div>
    );
};
export default Signup;