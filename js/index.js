window.addEventListener('DOMContentLoaded', function() {

  // Tabs
  
let tabs = document.querySelectorAll('.tabheader__item'),
  tabsContent = document.querySelectorAll('.tabcontent'),
  tabsParent = document.querySelector('.tabheader__items');

// Функция для скрытия содержимого всех вкладок
function hideTabContent() {
  tabsContent.forEach(item => {
      item.classList.add('hide');     // Добавляем класс 'hide' для скрытия элемента
      item.classList.remove('show'); // Удаляем классы 'show', если есть
  });

  tabs.forEach(item => {
      item.classList.remove('tabheader__item_active'); // Удаляем класс 'tabheader__item_active'
  });
}

// Функция для показа содержимого определенной вкладки (по умолчанию - первой)
function showTabContent(i = 0) {
  tabsContent[i].classList.add('show', 'fade'); // Добавляем классы 'show' для отображения элемента
  tabsContent[i].classList.remove('hide');      // Удаляем класс 'hide'
  tabs[i].classList.add('tabheader__item_active'); // Добавляем класс 'tabheader__item_active'
}

hideTabContent();

showTabContent();

// Добавляем обработчик события клика на родительский элемент tabsParent
tabsParent.addEventListener('click', function(event) {
  const target = event.target; // Получаем элемент, на который был клик

  // Проверяем, является ли кликнутый элемент вкладкой (имеет ли класс 'tabheader__item')
  if (target && target.classList.contains('tabheader__item')) {
      // Перебираем все элементы tabs
      tabs.forEach((item, i) => {
          // Если кликнутый элемент совпадает с текущим элементом из tabs
          if (target == item) {
              hideTabContent(); // Скрываем содержимое всех вкладок
              showTabContent(i); // Показываем содержимое выбранной вкладки
          }
      });
  }
});
  
  // Timer

// Задаем конечную дату-дедлайн
const deadline = '2023-12-11';

// Функция для вычисления оставшегося времени
function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()), // Разница между дедлайном и текущей датой в миллисекундах
        days = Math.floor(t / (1000 * 60 * 60 * 24)), // Количество оставшихся дней
        seconds = Math.floor((t / 1000) % 60), // Остаток секунд
        minutes = Math.floor((t / 1000 / 60) % 60), // Остаток минут
        hours = Math.floor((t / (1000 * 60 * 60) % 24)); // Остаток часов

    return {
        'total': t, // Общее оставшееся время в миллисекундах
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

// Функция для добавления ведущего нуля, если число меньше 10
function getZero(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

// Функция для установки и обновления таймера
function setClock(selector, endtime) {
    const timer = document.querySelector(selector), // Находим контейнер таймера по селектору
        days = timer.querySelector("#days"), // Находим элемент для дней
        hours = timer.querySelector('#hours'), // Находим элемент для часов
        minutes = timer.querySelector('#minutes'), // Находим элемент для минут
        seconds = timer.querySelector('#seconds'), // Находим элемент для секунд
        timeInterval = setInterval(updateClock, 1000); // Запускаем обновление таймера каждую секунду

    updateClock(); // Вызываем функцию обновления таймера сразу

    // Функция для обновления отображаемого времени
    function updateClock() {
        const t = getTimeRemaining(endtime); // Получаем оставшееся время

        // Обновляем значения элементов таймера на странице
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        // Если оставшееся время меньше или равно нулю, останавливаем таймер
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

// Запускаем установку и обновление таймера, передавая селектор контейнера таймера и дату-дедлайн
setClock('.timer', deadline);

  
    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

// Добавление обработчиков событий для каждой кнопки с атрибутом data-modal
modalTrigger.forEach(btn => {
  btn.addEventListener('click', openModal);
});

// Функция для закрытия модального окна
function closeModal() {
  modal.classList.add('hide'); // Добавляем класс hide для скрытия
  modal.classList.remove('show'); // Убираем класс show для видимости
  document.body.style.overflow = ''; // Восстанавливаем скроллинг
}

// Функция для открытия модального окна
function openModal() {
  modal.classList.add('show'); // Добавляем класс show для видимости
  modal.classList.remove('hide'); // Убираем класс hide для скрытия
  document.body.style.overflow = 'hidden'; // Запрещаем скроллинг
  clearInterval(modalTimerId); // Очищаем таймер открытия модального окна
}

// Добавляем обработчик события клика для кнопки закрытия модального окна
modalCloseBtn.addEventListener('click', closeModal);

// Добавляем обработчик события клика на само модальное окно
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
      closeModal();
  }
});

// Добавляем обработчик события нажатия клавиши на документе
document.addEventListener('keydown', (e) => {
  if (e.code === "Escape" && modal.classList.contains('show')) { 
      closeModal();
  }
});

// Устанавливаем таймер для автоматического открытия модального окна через 3000 миллисекунд
const modalTimerId = setTimeout(openModal, 3000);

// Функция для отображения модального окна при скроллинге до конца страницы
function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll); // Прекращаем отслеживание события скроллинга
  }
}

// Добавляем обработчик события скроллинга окна
window.addEventListener('scroll', showModalByScroll);


    // Используем классы для создание карточек меню

  //   class MenuCard {
  //     constructor(src, alt, title, descr, price, parentSelector) {
  //         this.src = src;
  //         this.alt = alt;
  //         this.title = title;
  //         this.descr = descr;
  //         this.price = price;
  //         this.parent = document.querySelector(parentSelector);
  //         this.transfer = 27;
  //         this.changeToUAH(); 
  //     }

  //     changeToUAH() {
  //         this.price = this.price * this.transfer; 
  //     }

  //     render() {
  //         const element = document.createElement('div');
  //         element.innerHTML = `
  //             <div class="menu__item">
  //                 <img src=${this.src} alt=${this.alt}>
  //                 <h3 class="menu__item-subtitle">${this.title}</h3>
  //                 <div class="menu__item-descr">${this.descr}</div>
  //                 <div class="menu__item-divider"></div>
  //                 <div class="menu__item-price">
  //                     <div class="menu__item-cost">Цена:</div>
  //                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
  //                 </div>
  //             </div>
  //         `;
  //         this.parent.append(element);
  //     }
  // }
  // console.log("Creating a new MenuCard");
  // new MenuCard(
  //     "img/tabs/vegy.jpg",
  //     "vegy",
  //     'Меню "Фитнес"',
  //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //     100,
  //     ".menu .container"
  // ).render();
  // console.log("Creating a new MenuCard");
  // new MenuCard(
  //     "img/tabs/post.jpg",
  //     "post",
  //     'Меню "Постное"',
  //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  //     17,
  //     ".menu .container"
  // ).render();
  // console.log("Creating a new MenuCard");
  // new MenuCard(
  //     "img/tabs/elite.jpg",
  //     "elite",
  //     'Меню “Премиум”',
  //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  //     21,
  //     ".menu .container"
  // ).render();

});