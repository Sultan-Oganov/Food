'use strict';

window.addEventListener('DOMContentLoaded', () => {
  //Menu
  const burger = document.querySelector('.icon-menu'),
        menu = document.querySelector('.header__nav'),
        body = document.querySelector('body');
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('lock');
  }); //Tabs

  const tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item');

  function hideContent() {
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
  }); //Timer

  const deadLine = '2021-01-01';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
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
      return "0".concat(num);
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

  setClock('.timer__blocks', deadLine); //Modal Window

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
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
});