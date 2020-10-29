'use strict';

window.addEventListener('DOMContentLoaded', () =>{

	//Menu
	const burger = document.querySelector('.icon-menu'),
			menu = document.querySelector('.header__nav'),
			body = document.querySelector('body');

	burger.addEventListener('click', () => {
		burger.classList.toggle('active');
		menu.classList.toggle('active');
		body.classList.toggle('lock');
	});

	//Tabs
	const tabContent = document.querySelectorAll('.tabcontent'),
			tabsParent = document.querySelector('.tabheader__items'),
			tabs = document.querySelectorAll('.tabheader__item');

	function hideContent(){
		tabContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showContent(i = 0) {
		tabContent[i].classList.add('show', 'fade');
		tabContent[i].classList.remove('hide');

		tabs[i].classList.add('tabheader__item_active');
	}

	hideContent();
	showContent();

	tabsParent.addEventListener('click', event => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, i) => {
				if (target == tab) {
					hideContent();
					showContent(i);
				}
			});
		}
	});

	//Timer
	const deadLine = '2021-01-01';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
				days = Math.floor(t / (1000 * 60 * 60 * 24)),
				hours = Math.floor((t / (1000 * 60 * 60) % 24)),
				minutes = Math.floor((t / 1000 / 60) % 60),
				seconds = Math.floor((t / 1000) % 60);

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
				days = timer.querySelector('#days'),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
				timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer__blocks', deadLine);

	//Modal Window

	const modalTrigger = document.querySelectorAll('[data-modal]'),
			modalClose = document.querySelector('[data-close]'),
			modal = document.querySelector('.modal');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		body.classList.add('lock');
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		body.classList.remove('lock');
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach(trigger => {
		trigger.addEventListener('click', openModal);
	});

	modalClose.addEventListener('click', closeModal);
	
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// const modalTimerId = setTimeout(openModal, 5000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	//Use Class for Cards

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 0.85;
			this.changeToEUR();
		}

		changeToEUR() {
			this.price = Math.trunc(this.price * this.transfer);
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.element = 'menu__column';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<div class="menu__column-img">
					<img src=${this.src} alt=${this.alt}>
				</div>
				<div class="menu__subtitle">${this.title}</div>
				<div class="menu__column-descr">${this.descr}</div>
				<div class="menu__column-divider"></div>
				<div class="menu__column-price">
					<div class="menu__column-cost">Цена:</div>
					<div class="menu__column-total"><span>${this.price}</span> &euro;/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	new MenuCard(
		"img/dishes/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		30,
		'.menu .menu__row',
		'menu__column',
		'big'
	).render();

	new MenuCard(
		"img/dishes/elite.jpg",
		"elite",
		'Меню "Премиум"',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		76.90 ,
		'.menu .menu__row',
		'menu__column'
	).render();

	new MenuCard(
		"img/dishes/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		35.50,
		'.menu .menu__row',
		'menu__column'
	).render();
});