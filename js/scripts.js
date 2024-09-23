"use strict";

// modal hide/show & slide functions

function hideAllModalContent() {
    let modal_section = document.querySelector('#modals');
    let modal_contents = modal_section.querySelectorAll('.modal-content');
    for (let content of modal_contents) {
        content.style.display = 'none';
    }
}

function setModalSectionVisibility(visible) {
    let modal_section = document.querySelector('#modals');
    let modal_wrapper = modal_section.querySelector('.modal-wrapper');
    let body_tag = document.querySelector('body');

    if (visible) {
        modal_wrapper.classList.add('open');
        body_tag.classList.add('non-scrollable');
    } else {
        modal_wrapper.classList.remove('open');
        body_tag.classList.remove('non-scrollable');
    }
}

function closeModal() {
    setModalSectionVisibility(false); // hiding the modal section
    hideAllModalContent(); // hiding all contents of modal section
}

function displayModalContent(content_id) {
    hideAllModalContent(); // making sure all other content is hidden

    let modal_section = document.querySelector('#modals');
    let needed_modal_content = modal_section.querySelector(`#${content_id}`); // making the needed content visible
    needed_modal_content.style.display = 'flex';
    
    setModalSectionVisibility(true);// making the modal section itself visible
}

function setModalGalleryPreviousButtonVisibility(visible) {
    let modal_section = document.querySelector('#modals');
    let modal_gallery = modal_section.querySelector('#gallery-modal');
    let previous_button = modal_gallery.querySelector('#previous-modal-button'); // finding the needed element

    previous_button.style.display = visible ? 'flex' : 'none';
}

function setModalGalleryNextButtonVisibility(visible) {
    let modal_section = document.querySelector('#modals');
    let modal_gallery = modal_section.querySelector('#gallery-modal');
    let next_button = modal_gallery.querySelector('#next-modal-button'); // finding the needed element

    next_button.style.display = visible ? 'flex' : 'none';
}

function setNthGalleryImage(n) {
    let cards_section = document.querySelector('#cards');
    let gallery_card = cards_section.querySelector('#gallery'); // finding the gallery card
    let gallery_images = gallery_card.querySelectorAll('.content-card__image_gallery'); // finding all the source images

    let modal_section = document.querySelector('#modals');
    let modal_gallery = modal_section.querySelector('#gallery-modal'); // finding the modal gallery
    let modal_gallery_image = modal_gallery.querySelector('.modal-content__image'); // finding the modal gallery image elememt

    modal_gallery_image.src = gallery_images[n - 1].src; // setting the needed image as a source for the displayed image of the modal gallery
    modal_gallery_image.alt = gallery_images[n - 1].alt; // setting the description accordingly
    modal_gallery_image['data-slide-number'] = String(n); // saving the currently displayed image nimber
    
    setModalGalleryPreviousButtonVisibility((n > 1) ? true : false); // showing/hiding gallery navigation buttons accordingly to the image number
    setModalGalleryNextButtonVisibility((n < gallery_images.length) ? true : false);
}

function openNthGalleryImage(n) {
    setNthGalleryImage(n); // changing the displayed image to the needed
    displayModalContent('gallery-modal'); // opening the modal gallery
}

function openLatestGalleryImage() {
    let modal_section = document.querySelector('#modals');
    let modal_gallery = modal_section.querySelector('#gallery-modal');
    let modal_gallery_image = modal_gallery.querySelector('.modal-content__image'); // finding the modal gallery image elememt

    let latest_image_number = modal_gallery_image['data-slide-number'];
    latest_image_number = (Number(latest_image_number) > 0) ? Number(latest_image_number) : 1;
    openNthGalleryImage(latest_image_number); // opening the latest displayed image or the first if none was
}

function switchModalGalleryImage(shift) {
    let modal_section = document.querySelector('#modals');
    let modal_gallery = modal_section.querySelector('#gallery-modal'); // finding the modal gallery
    let modal_gallery_image = modal_gallery.querySelector('.modal-content__image'); // finding the modal gallery image elememt

    let current_image_number = Number(modal_gallery_image['data-slide-number']); // finding the currently displayed image number
    let new_image_number = current_image_number + shift; // counting the newly displayed image number

    setNthGalleryImage(new_image_number); // changing the displayed image to the needed
}

function modalGalleryNextImage() {
    switchModalGalleryImage(1);
}

function modalGalleryPreviousImage() {
    switchModalGalleryImage(-1);
}

function openFeedbackForm() {
    displayModalContent('feedback-modal');
}

function floatingMenuBarSwitch() {
    let floating_section = document.querySelector('#floating');
    let opening_menu = floating_section.querySelector('.opening-menu'); // finding the menu element

    let menu_list = opening_menu.querySelector('.navigation-menu_hidden'); // finding the menu list
    let open_menu_button = opening_menu.querySelector('#open-menu-button'); // finding the menu button

    let switch_to_opened = !(opening_menu.classList.contains('open')); // determining the state we're switching to

    if (switch_to_opened) {
        opening_menu.classList.add('open');
        menu_list.classList.add('open');
    } else {
        opening_menu.classList.remove('open');
        menu_list.classList.remove('open');
    }

    let button_animations = open_menu_button.querySelectorAll('animate');
    let active_animation = switch_to_opened ?
                           button_animations[0] :
                           button_animations[1]; // choosing the needed button animation
    active_animation.beginElement(); // activating animation
}

function setImageView(source, alternative) {
    let modal_section = document.querySelector('#modals');
    let modal_image_view = modal_section.querySelector('#modal-image-view'); // finding the modal image view
    let modal_image = modal_image_view.querySelector('.modal-content__image'); // finding the image elememt

    modal_image.src = source;
    modal_image.alt = alternative;
}

function openModalImageView(source, alternative) {
    setImageView(source, alternative); // changing the displayed image to the required
    displayModalContent('modal-image-view'); // opening the modal image view
}

function transferFeedbackFormInputs(to_modal) {
    let cards_section = document.querySelector('#cards');
    let feedback_card = cards_section.querySelector('#feedback');
    let main_feedback_form = feedback_card.querySelector('#feedback-form'); // finding the body content card feedback form

    let modal_section = document.querySelector('#modals');
    let modal_feedback = modal_section.querySelector('#feedback-modal');
    let modal_feedback_form = modal_feedback.querySelector('#modal-feedback-form'); // finding the modal feedback form

    let main_form_inputs = main_feedback_form.querySelectorAll('.feedback-form__input');
    let modal_form_inputs = modal_feedback_form.querySelectorAll('.feedback-form__input'); // finding all inputs fro both forms

    let form_from = to_modal ? main_form_inputs : modal_form_inputs;
    let form_to = to_modal ? modal_form_inputs : main_form_inputs; // defining the source and target sets of inputs
    
    let target_input_index = -1;
    const target_inputs_quan = form_to.length;
    for (const input_from of form_from) { // transfering input values according to input names
        const input_name = input_from.name;
        for (let i = 0; i < target_inputs_quan; ++i) {
            ++target_input_index;
            target_input_index %= target_inputs_quan;
            let input_to = form_to[target_input_index];
            if (input_to.name == input_name) {
                input_to.value = input_from.value;
                break;
            }
        }
    }
}

(function() {
const main_feedback_form = document.querySelector('#feedback-form');
const modal_feedback_form = document.querySelector('#modal-feedback-form');

main_feedback_form.addEventListener('focusout', () => { transferFeedbackFormInputs(true); });
modal_feedback_form.addEventListener('focusout', () => { transferFeedbackFormInputs(false); });
}()); // transfering the input text from one form to another automaticaly script

// timer counting down script

(function() {
    const countdown_date_time = new Date("Jun 1, 2027 00:00:00").getTime();
    const countdown_interval = 1000;

    const cards_section = document.querySelector('#cards');
    const timer_card = cards_section.querySelector('#education');
    const timer_element = timer_card.querySelector('#countdown-timer');

    let x = setInterval(function() {
        const current_date_time = new Date().getTime();
        const time_distance = countdown_date_time - current_date_time;

        const remaining_days = Math.floor(time_distance / (1000 * 60 * 60 * 24));
        const remaining_hours = Math.floor((time_distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remaining_minutes = Math.floor((time_distance % (1000 * 60 * 60)) / (1000 * 60));
        const remaining_seconds = Math.floor((time_distance % (1000 * 60)) / 1000);

        const current_timer_value = ((remaining_days >= 1) ? (remaining_days + ((remaining_days >= 2) ? ' days and ' : ' day and ')) : '') +
                                    Math.floor(remaining_hours / 10) + Math.floor(remaining_hours % 10) + ':' +
                                    Math.floor(remaining_minutes / 10) + Math.floor(remaining_minutes % 10) + ':' +
                                    Math.floor(remaining_seconds / 10) + Math.floor(remaining_seconds % 10) + '.';

        timer_element.innerHTML = (time_distance > 0) ? current_timer_value : '... seems like it already happened!';
    }, countdown_interval);
}()); // timer countdown function

// basic cookies managing functions

function setCookie(name, value, max_age = false) {
    let new_cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (max_age) {
       new_cookie += '; max-age=' + String(max_age);
    }

    document.cookie = new_cookie;
} // sets new cookie value with an optional maximum age (in seconds)

function deleteCookie(name) {
    setCookie(name, '', -1);
} // deleting cookie by setting it a negative age

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
} // returns current value of the cookie with the provided name

// alert box message script

(function() {
    const countdown_time = 30_000;
    const already_shown = getCookie('timerMessage');

    if (!(already_shown)) {
        setTimeout(() => {
            alert('You can fill out a feedback form!');
            setCookie('timerMessage', 'shown', 60*60*24*30);
        }, countdown_time);
    }

    console.log(document.cookie);
}()); // timer message function

// feedback form input validation & submit functions

let validateMainFeedbackForm = function() {
    const cards_section = document.querySelector('#cards');
    const feedback_card = cards_section.querySelector('#feedback');
    const main_feedback_form = feedback_card.querySelector('#feedback-form');
    
    let validateNameInput = function() {
        const name_input = main_feedback_form.querySelector('#feedback-user-name');
        const input_value = name_input.value;
        let re = /^[a-z ]{3,30}$/igm;
        return (re.test(input_value));
    };
    let validateEmailInput = function() {
        const email_input = main_feedback_form.querySelector('#feedback-user-email');
        const input_value = email_input.value;
        let re = /^[a-z0-9_.]{5,25}@[a-z0-9]{2,10}.[a-z]{2,3}$/igm;
        return (re.test(input_value));
    };
    let validateMessageInput = function() {
        const message_input = main_feedback_form.querySelector('#feedback-message');
        const input_value = message_input.value;
        let re = /^[a-z ]{20,200}$/igm;
        return (re.test(input_value));
    };
    
    return (validateNameInput() && validateEmailInput() && validateMessageInput());
}

let validateModalFeedbackForm = function() {
    transferFeedbackFormInputs(false);
    return validateMainFeedbackForm();
}

function postFeedbackForm() {
    return true;
}

function submitFeedbackForm (submit_button, validator) {
    const await_interval = 3000;

    if (validator()) {
        submit_button.classList.add('awaiting');
        submit_button.innerHTML = 'Sending';
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify({
                    user_name: document.querySelector('#feedback-user-name').value,
                    user_email: document.querySelector('#feedback-user-email').value,
                    message: document.querySelector('#feedback-message').value
                }),
                headers: { 'Content-type': 'application/json; charset=UTF-8'}
            }).then(
                function(result) {
                    submit_button.classList.remove('awaiting');
                    submit_button.classList.add('success');
                    submit_button.innerHTML = 'Sent!';
                    setTimeout(() => {
                        submit_button.classList.remove('success');
                        submit_button.innerHTML = 'Submit';
                    }, await_interval);
                },
                function(error) {
                    submit_button.classList.remove('awaiting');
                    submit_button.classList.add('error');
                    submit_button.innerHTML = 'Error';
                    setTimeout(() => {
                        submit_button.classList.remove('error');
                        submit_button.innerHTML = 'Submit';
                    }, await_interval);
                }
            )
        }, await_interval);
    } else {
        submit_button.classList.add('error');
        submit_button.innerHTML = 'Invalid';
        setTimeout(() => {
            submit_button.classList.remove('error');
            submit_button.innerHTML = 'Submit';
        }, await_interval);
    }
}

function submitMainFeedbackForm() {
    const cards_section = document.querySelector('#cards');
    const feedback_card = cards_section.querySelector('#feedback');
    const main_feedback_form = feedback_card.querySelector('#feedback-form');
    const submit_button = main_feedback_form.querySelector('.feedback-form__button');

    submitFeedbackForm(submit_button, validateMainFeedbackForm);
    event.preventDefault();
}

function submitModalFeedbackForm() {
    const cards_section = document.querySelector('#modals');
    const feedback_card = cards_section.querySelector('#feedback-modal');
    const main_feedback_form = feedback_card.querySelector('#modal-feedback-form');
    const submit_button = main_feedback_form.querySelector('.feedback-form__button');

    submitFeedbackForm(submit_button, validateModalFeedbackForm);
    event.preventDefault();
}