document.addEventListener('scroll', function() {
    const toggler = document.getElementById('toggler');

    if (toggler.checked) {
      toggler.checked = false;
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filt_btn');
    const sections = document.querySelectorAll('section');
    let currentFilter = null; 
    let activeButton = null; 

    sections.forEach(section => section.style.display = 'block');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const filter = this.dataset.filter;

            if (activeButton === this) {
                this.classList.remove('active'); 
                activeButton = null;
                currentFilter = null;
                sections.forEach(section => section.style.display = 'block');
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');
                activeButton = this;
                currentFilter = filter;

                sections.forEach(section => section.style.display = 'none');

                sections.forEach(section => {
                    if (section.dataset.category === filter) {
                        section.style.display = 'block';
                    }
                });
            }
        });
    });

});

function showNotification() {
    let notificationContainer = document.getElementById('notification_bl');
    const notification = document.createElement('div');

    notification.classList.add('notification');
    notification.classList.add('active'); 
    notification.innerHTML = `
        <div class="notification_content">
      
          <div class="message">
            <span class="text">Товар успешно добавлен в корзину</span>
          </div>
        </div>
        <i class="close_notification"><img src="./src/icons8-close-48.png" alt="close"></i>
      
    
        <div class="progress"></div>
    `; 

    notificationContainer.appendChild(notification);
    
    const closeNotification = notification.querySelector('.close_notification');

    closeNotification.addEventListener('click', () => {
        notification.remove(); 
    });
  
    setTimeout(() => {
        notification.remove(); 
    }, 3000); 
  }

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification();
}

document.querySelectorAll('.card .popup_buy_btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const card = this.closest('.card');

        const name = card.querySelector('h3').textContent;
        const price = parseInt(card.querySelector('.card_price').textContent);
        const image = card.querySelector('.card_img').src;

        const popup = this.closest('.overlay'); 
        const milk = popup.querySelector('input[name="milk"]:checked')?.value || 'Не выбрано';
        const sirop = popup.querySelector('input[name="sirop"]:checked')?.value || 'Не выбрано';
        const sprinkling = popup.querySelector('input[name="sprinkling"]:checked')?.value || 'Не выбрано';

        const item = {
            name: name,
            price: price,
            milk: milk,
            sirop: sirop,
            sprinkling: sprinkling,
            image: image,
            type: 'drink'
        };
        addToCart(item);
        resetPopupFields(popup);
        window.location.href = "#";
    });
});

function closePopup(popup) {
    popup.style.display = 'none'; 
}

function openPopup(popup) {
    resetPopupFields(popup);
    popup.style.display = 'block';
}

function resetPopupFields(popup) {
    const radioButtons = popup.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    const textInputs = popup.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        input.value = '';
    });

    const selects = popup.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0; 
    });

    const checkboxes = popup.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

document.querySelectorAll('.card:not(:has(.overlay)) .card_btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const card = this.closest('.card');

        const name = card.querySelector('h3').textContent;
        const price = parseInt(card.querySelector('.card_price').textContent);
        const image = card.querySelector('.card_img').src;

        const item = {
            name: name,
            price: price,
            image: image,
            milk: null,
            sirop: null,
            sprinkling: null,
            type: 'food'
        };
        addToCart(item);
    });
});
