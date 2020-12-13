// Inputs
const inputName = document.getElementById('form-name');
const inputEmail = document.getElementById('form-email');
const inputPhone1 = document.getElementById('form-phone1');
const inputPhone2 = document.getElementById('form-phone2');
// Mensagens de erro
const messageName = document.getElementById('message-name');
const messageEmail = document.getElementById('message-email');
const messagePhone1 = document.getElementById('message-phone1');
const messagePhone2 = document.getElementById('message-phone2');
// Feedback
const feedbackName = document.getElementById('feedback-name');
const feedbackEmail = document.getElementById('feedback-email');
const feedbackPhone1 = document.getElementById('feedback-phone1');
const feedbackPhone2 = document.getElementById('feedback-phone2');
// Submit
const button = document.getElementById('signup-button');
const feedbackBlank = document.getElementById('feedback-blank');
const feedbackInfo = document.getElementById('feedback-info');
// Carrossel
const projectList = document.getElementById('projects-list');
let listPosition = 0;
let listSize = 0;
// Regex
const spChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneChar = /^[- +()0-9]+$/;

// Funções
const validateName = () => {
    if (inputName.value.length <= 0 || spChar.test(inputName.value) || inputName.value.includes('  ')) {
        inputName.classList.add('signup__input_error');
        messageName.classList.add('signup__message_error');
        return false;
    } else {
        inputName.classList.remove('signup__input_error');
        messageName.classList.remove('signup__message_error');
        return true;
    }
}

const validateEmail = () => {
    if (inputEmail.value.length <= 0 || emailFormat.test(inputEmail.value) === false) {
        inputEmail.classList.add('signup__input_error');
        messageEmail.classList.add('signup__message_error');
        return false;
    } else {
        inputEmail.classList.remove('signup__input_error');
        messageEmail.classList.remove('signup__message_error');
        return true;
    }
}

const validatePhone1 = () => {
    if (inputPhone1.value.length <= 0 || inputPhone1.value.length > 15 || phoneChar.test(inputPhone1.value) === false) {
        inputPhone1.classList.add('signup__input_error');
        messagePhone1.classList.add('signup__message_error');
        return false;
    } else {
        inputPhone1.classList.remove('signup__input_error');
        messagePhone1.classList.remove('signup__message_error');
        return true;
    }
}

const validatePhone2 = () => {
    if (inputPhone2.value.length > 0 && (phoneChar.test(inputPhone2.value) === false || inputPhone2.value.length > 15)) {
        inputPhone2.classList.add('signup__input_error');
        messagePhone2.classList.add('signup__message_error');
        return false;
    } else {
        inputPhone2.classList.remove('signup__input_error');
        messagePhone2.classList.remove('signup__message_error');
        return true;
    }
}

const formatPhone = (event) => {
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
    event.target.value = newPhone;
    event.preventDefault();
}

const handleSubmit = (event) => {
    if (
        validateName() &&
        validateEmail() &&
        validatePhone1() &&
        validatePhone2()
    ) {
        feedbackName.textContent = inputName.value;
        feedbackEmail.textContent = inputEmail.value;
        feedbackPhone1.textContent = inputPhone1.value;
        if (inputPhone2.value === '') {
            feedbackPhone2.textContent = 'Não informado';
        } else {
            feedbackPhone2.textContent = inputPhone2.value;
            feedbackPhone2.classList.remove('feedback__data_none');
        }
        feedbackBlank.classList.remove('feedback__blank_visible');
        feedbackInfo.classList.add('feedback__info_visible');
        button.setAttribute('disabled', '');
    }
    event.preventDefault();
}

const scrollList = (delta) => {
    listPosition = Math.max(0,
        (Math.min((listPosition + delta),
            (listSize - parseInt(getComputedStyle(projectList).getPropertyValue('--item-view'))))
        )
    );
    projectList.style.left = 'calc(-' + listPosition.toString() + ' * var(--item-scroll))';
}

// Carregar imagens
fetch('https://picsum.photos/v2/list')
    .then(response => response.json())
    .then(data => {
        for (i = 0; i < data.length; i++) {
            let li = document.createElement('LI');
            li.classList.add('projects__item');
            li.setAttribute('tabindex', '0');
            li.innerHTML = '<img class="projects__image" src="' + data[i].download_url + '" alt="Capa do projeto">';
            projectList.appendChild(li);
        }
        listSize = data.length;
    });