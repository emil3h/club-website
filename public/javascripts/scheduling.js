$(document).ready(() => {
    let dropdownContainer = document.getElementById('class-selection-border');
    let dropdown = document.getElementsByClassName('dropdown')[0];
    let anchor = document.getElementById('anchor');
    let dropdownOptions = document.querySelectorAll('.class-option-container');
    /**
     * adjust dropdown list width to align with anchor button
     */
    $('.anchor').siblings('.options').css('max-width', $('.anchor').width() + 'px');
    
    /**
     * dropdown list functionality
     */
    anchor.addEventListener('click', () => {
        if (dropdown.classList.contains('visible-options')) {
            dropdown.classList.remove('visible-options');
            dropdown.classList.add('hidden-options');
            dropdownContainer.classList.remove('expanded-dropdown');
        }
        else {
            dropdown.classList.add('visible-options');
            dropdown.classList.remove('hidden-options');
            dropdownContainer.classList.add('expanded-dropdown');
        }
    });

    dropdownOptions.forEach(option => {
        option.addEventListener('click', () => {
            anchor.innerHTML = option.innerHTML;

            if (option.classList.contains('.chosen-option-container')) {
                option.classList.remove('.chosen-option-container');
            } else {
                option.classList.add('.chosen-option-container');
            }

            // hide dropdown after clicking a class
            dropdown.classList.remove('visible-options');
            dropdown.classList.add('hidden-options');
            dropdownContainer.classList.remove('expanded-dropdown');
        });
    });

    /**
     * Observe anchor and detect changes to innerHTML to determine what class selections to display for user
     */
    let chosenClass = '';
    let classDisplayContainer = document.getElementsByClassName('class-display-container')[0];
    let sectionContainers = document.getElementsByClassName('section-container');
    anchorObserver = new MutationObserver( (elements, anchorObserver) => {
        elements.forEach(element => {
            chosenClass = element.target.innerHTML;
            // split string and input the catalog number into callback
            displayClasses(chosenClass.split(' ', 2)[1]);
        });
    });
    anchorObserver.observe(anchor, { childList: true});

    /**
     * callback to display each class section when a class is chosen from dropdown list given a catalog number
     */
    let displayClasses = (catalogNumber) => {
        // iterate through all the section containers and append all matching course sections to display and hide all other class sections
        for (let i = 0; i < sectionContainers.length; i++) {
            if (sectionContainers[i].dataset.catalogNumber == catalogNumber) {
                sectionContainers[i].classList.remove('hidden-section-container');
                sectionContainers[i].classList.add('visible-section-container');
            } else {
                sectionContainers[i].classList.remove('visible-section-container');
                sectionContainers[i].classList.add('hidden-section-container');
            }
        }
    };

    /**
     * create a new Node to add to the shopping cart list when pressing the blue add to cart button next to a class
     */
    let cartItem, cartItemContainer, cartDeleteBttn;
    let cartSelection = document.getElementById('shopping-cart-selection');
    document.querySelectorAll('.add-class-button').forEach(button => {
        button.addEventListener('click', () => {
            button.style.display = 'none';
            let cartDeleteBttn = document.createElement('img');
            cartDeleteBttn.setAttribute('src', 'images/delete button.svg');
            cartDeleteBttn.setAttribute('class', 'cart-delete-button');
            cartDeleteBttn.addEventListener('click', () => {
                cartDeleteBttn.parentElement.remove();
                button.style.display = 'block';
            });
            cartDeleteBttn.addEventListener('mouseover', () => { cartDeleteBttn.setAttribute('src', 'images/delete button hover.svg') });
            cartDeleteBttn.addEventListener('mouseout', () => { cartDeleteBttn.setAttribute('src', 'images/delete button.svg') });
    
            cartItemContainer = document.createElement('div');
            cartItemContainer.setAttribute('class', 'shopping-cart-item-container visible-shopping-cart-item-container');
    
            cartItem = document.createElement('li');
            strongTag = `<strong>CS${button.dataset.catalogNumber}-${button.dataset.section}</strong>`;
            // html input tag to pass data to back-end
            inputTag = `<input type='hidden' name='class${button.dataset.arrayIndex}' value='${button.dataset.arrayIndex}'>`
            cartItem.innerHTML =
                `${strongTag} ${button.dataset.instructor}<br>${button.dataset.meetDays} ${button.dataset.meetTimes}${inputTag}`;
            
            cartItemContainer.appendChild(cartDeleteBttn);
            cartItemContainer.appendChild(cartItem);
            cartSelection.appendChild(cartItemContainer);
        });
    });


    
    // for (let i = 0; i < addClassBttns.length; i++) {
    //     currentBttn = addClassBttns[i];
    //     currentBttn.addEventListener('click', () => {
    //         let cartDeleteBttn = document.createElement('img');
    //         cartDeleteBttn.setAttribute('src', 'images/delete button.svg');
    //         cartDeleteBttn.setAttribute('class', 'cart-delete-button');

    //         cartItemContainer = document.createElement('div');
    //         cartItemContainer.setAttribute('class', 'shopping-cart-item-container visible-shopping-cart-item-container');

    //         cartItem = document.createElement('li');
    //         strongTag = `<strong>CS${currentBttn.dataset.catalogNumber}-${currentBttn.dataset.section}</strong>`;
    //         // html input tag to pass data to back-end
    //         inputTag = `<input type='hidden' name='class${currentBttn.dataset.arrayIndex}' value='${currentBttn.dataset.arrayIndex}'>`
    //         cartItem.innerHTML =
    //             `${strongTag} ${currentBttn.dataset.instructor}<br>${currentBttn.dataset.meetDays} ${currentBttn.dataset.meetTimes}${inputTag}`;
            
    //         cartItemContainer.appendChild(cartDeleteBttn);
    //         cartItemContainer.appendChild(cartItem);
    //         cartSelection.appendChild(cartItemContainer);
    //     });
    // }

    /**
     * shopping cart functionality
     */
    let cartSelectionContainer = document.getElementById('shopping-cart-selection-container');
    let cartBttn = document.getElementById('shopping-cart');
    let blueBg = document.getElementById('blue-background-gradient');
    let cartTitle = document.getElementById('shopping-cart-title');
    let submitBttn = document.getElementById('submit-button');

    cartBttn.addEventListener('click', () => {
        if (cartSelectionContainer.classList.contains('hidden-shopping-cart-selection-container')) {
            cartSelectionContainer.classList.remove('hidden-shopping-cart-selection-container');
            cartSelectionContainer.classList.add('visible-shopping-cart-selection-container');

            blueBg.classList.add('hidden-blue-background');
            blueBg.classList.remove('visible-blue-background');

            cartTitle.classList.remove('hidden-shopping-cart-title');
            cartTitle.classList.add('visible-shopping-cart-title');

            cartSelection.classList.remove('hidden-shopping-cart-selection');
            cartSelection.classList.add('visible-shopping-cart-selection');

            if (cartItem != undefined) {
                cartItem.classList.remove('hidden-shopping-cart-item');
                cartItem.classList.add('visible-shopping-cart-item');
            }

            submitBttn.classList.remove('hidden-submit-button');
            submitBttn.classList.add('visible-submit-button');
        } else {
            cartSelectionContainer.classList.remove('visible-shopping-cart-selection-container');
            cartSelectionContainer.classList.add('hidden-shopping-cart-selection-container');

            blueBg.classList.add('visible-blue-background');
            blueBg.classList.remove('hidden-blue-background');

            cartTitle.classList.remove('visible-shopping-cart-title');
            cartTitle.classList.add('hidden-shopping-cart-title');

            cartSelection.classList.remove('visible-shopping-cart-selection');
            cartSelection.classList.add('hidden-shopping-cart-selection');

            if (cartItem != undefined) {
                cartItem.classList.remove('visible-shopping-cart-item');
                cartItem.classList.add('hidden-shopping-cart-item');
            }

            submitBttn.classList.remove('visible-submit-button');
            submitBttn.classList.add('hidden-submit-button');
        }
    });
});



