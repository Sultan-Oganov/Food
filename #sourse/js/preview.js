'use strict';

window.addEventListener('DOMContentLoaded', () =>{
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
});