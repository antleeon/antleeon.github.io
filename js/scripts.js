"use strict";

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
    modal_wrapper.style.display = visible ? 'flex' : 'none';
}

function closeModal() {
    hideAllModalContent(); // hiding all contents of modal section
    setModalSectionVisibility(false); // hiding the modal section
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
    modal_gallery_image.alt = String(n); // saving the currently displayed image nimber
    
    setModalGalleryPreviousButtonVisibility((n > 1) ? true : false); // showing/hiding gallery navigation buttons accordingly to the image number
    setModalGalleryNextButtonVisibility((n < gallery_images.length) ? true : false);
}

function openNthGalleryImage(n) {
    setNthGalleryImage(n); // changing the displayed image to the needed
    displayModalContent('gallery-modal'); // opening the modal gallery
}

function switchModalGalleryImage(shift) {
    let modal_section = document.querySelector('#modals');
    let modal_gallery = modal_section.querySelector('#gallery-modal'); // finding the modal gallery
    let modal_gallery_image = modal_gallery.querySelector('.modal-content__image'); // finding the modal gallery image elememt

    let current_image_number = Number(modal_gallery_image.alt); // finding the currently displayed image number
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
    const MENU_CLOSED_WIDTH = '80px';
    const MENU_OPENED_WIDTH = '600px';

    const LIST_CLOSED_WIDTH = '0';
    const LIST_OPENED_WIDTH = '540px';

    let floating_section = document.querySelector('#floating');
    let opening_menu = floating_section.querySelector('.opening-menu'); // finding the menu element

    let menu_list = opening_menu.querySelector('.navigation-menu_hidden'); // finding the menu list
    let open_menu_button = opening_menu.querySelector('#open-menu-button'); // finding the menu button

    let switch_to_opened = opening_menu.style.width != MENU_OPENED_WIDTH; // determining the state we're switching to

    opening_menu.style.width = switch_to_opened ? MENU_OPENED_WIDTH : MENU_CLOSED_WIDTH;
    opening_menu.style['box-shadow'] = switch_to_opened ? '0 0 7px rgba(0,0,0,.5)' : '3px 4px 4px rgba(0,0,0,.15)';
    
    menu_list.style.width = switch_to_opened ? LIST_OPENED_WIDTH : LIST_CLOSED_WIDTH;

    let active_animation = switch_to_opened ?
                           open_menu_button.querySelector('.forward-animation') :
                           open_menu_button.querySelector('.reverse-animation'); // choosing the needed button animation
    active_animation.beginElement(); // activating animation
}