document.addEventListener('scroll', function() {
    const toggler = document.getElementById('toggler');

    if (toggler.checked) {
      toggler.checked = false;
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filt_btn');
    const sections = document.querySelectorAll('section');
    let currentFilter = null; //  Текущий активный фильтр
    let activeButton = null; // Текущая активная кнопка

    // Показываем все секции по умолчанию
    sections.forEach(section => section.style.display = 'block');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const filter = this.dataset.filter;

            if (activeButton === this) {
                // Если нажата та же кнопка, отменяем фильтр
                this.classList.remove('active'); // Удаляем класс active с кнопки
                activeButton = null;
                currentFilter = null;
                sections.forEach(section => section.style.display = 'block'); // Показываем все
            } else {
                // Сбрасываем активный класс со всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Устанавливаем класс 'active' для нажатой кнопки
                this.classList.add('active');
                activeButton = this;
                currentFilter = filter;

                // Сбрасываем отображение для всех секций
                sections.forEach(section => section.style.display = 'none');

                // Показываем только секции с соответствующим data-category
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

    notification.classList.add('notification'); // Добавляем класс "toast"
    notification.classList.add('active'); // Добавляем класс "active" для отображения
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
        notification.remove(); // Удаляем уведомление из DOM
    });
  
    setTimeout(() => {
        notification.remove(); // Удаляем уведомление из DOM
    }, 3000); // 3 секунды (можно изменить)
  }

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification();
}

// *** Обработка КАРТОЧЕК С ПОПАПАМИ (напитки) ***
document.querySelectorAll('.card .popup_buy_btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        // Находим ближайшую карточку
        const card = this.closest('.card');

        const name = card.querySelector('h3').textContent;
        const price = parseInt(card.querySelector('.card_price').textContent);
        const image = card.querySelector('.card_img').src;

        // Получаем значения из попапа
        const popup = this.closest('.overlay'); // Находим ближайший overlay
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
    popup.style.display = 'none'; // Скрываем попап
}

function openPopup(popup) {
    resetPopupFields(popup);
    popup.style.display = 'block'; // Или любое другое нужное вам отображение
}

function resetPopupFields(popup) {
    // Сбрасываем радиокнопки (снимаем выделение)
    const radioButtons = popup.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    // Сбрасываем текстовые поля (очищаем значения)
    const textInputs = popup.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        input.value = '';
    });

    // Сбрасываем выпадающие списки (выбираем первый элемент)
    const selects = popup.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0; // Выбираем первый элемент
    });

    //Сбрасываем чекбоксы
    const checkboxes = popup.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

// *** Обработка КАРТОЧЕК БЕЗ ПОПАПОВ (еда) ***
document.querySelectorAll('.card:not(:has(.overlay)) .card_btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        // Находим ближайшую карточку
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