const priceItems = document.querySelectorAll('.price-item');
const additionalHeadingCell = document.querySelector('.price-list__heading--additional');
let currentPriceItem;
let sortButtons = document.querySelectorAll('.price-list__heading-button');
let priceItemsArray = [];
let currentSortButton;

for (let item of priceItems) {
  for (let button of item.querySelectorAll('.price-item__button')) {
    button.addEventListener('click', () => {
      if (!currentPriceItem) {
        additionalHeadingCell.classList.toggle('price-list__heading--additional');
        additionalHeadingCell.classList.toggle('visually-hidden');
        item.classList.toggle('price-item--extended');
        currentPriceItem = item;
      } else if (currentPriceItem === item) {
        additionalHeadingCell.classList.toggle('price-list__heading--additional');
        additionalHeadingCell.classList.toggle('visually-hidden');
        item.classList.toggle('price-item--extended');
        currentPriceItem = null;
      } else {
        currentPriceItem.classList.toggle('price-item--extended');
        item.classList.toggle('price-item--extended');
        currentPriceItem = item;
      }
    });
  }

  priceItemsArray.push(item);

  item.querySelector('.price-item__form-button--increase').addEventListener('click', () => {
    item.querySelector('.price-item__input').stepUp();
    minimazeCartForm(item.querySelector('.price-item__form'));
  });

  item.querySelector('.price-item__form-button--decrease').addEventListener('click', () => {
    item.querySelector('.price-item__input').stepDown();
    minimazeCartForm(item.querySelector('.price-item__form'));
  });

  item.querySelector('.price-item__input').addEventListener('change', () => {
    minimazeCartForm(item.querySelector('.price-item__form'));
  });
}

function minimazeCartForm(form) {
  if (+form.querySelector('.price-item__input').value === 0) {
    form.querySelector('.price-item__input').classList.add('visually-hidden');
    form.querySelector('.price-item__form-button--decrease').classList.add('visually-hidden');
    form.classList.add('price-item__form--minimize');
  } else {
    form.querySelector('.price-item__input').classList.remove('visually-hidden');
    form.querySelector('.price-item__form-button--decrease').classList.remove('visually-hidden');
    form.classList.remove('price-item__form--minimize');
  }
}

for (let button of sortButtons) {
  button.addEventListener('click', () => {
    if (!currentSortButton) {
      button.classList.add('price-list__heading-button--active--up');
      sortPriceItems(button.dataset.sortRule, 'up');
      currentSortButton = button;
    } else if (button === currentSortButton) {
      if (button.classList.contains('price-list__heading-button--active--up')) {
        button.classList.remove('price-list__heading-button--active--up');
        button.classList.add('price-list__heading-button--active--down');
        sortPriceItems(button.dataset.sortRule, 'down');
      } else {
        button.classList.remove('price-list__heading-button--active--down');
        button.classList.add('price-list__heading-button--active--up');
        sortPriceItems(button.dataset.sortRule, 'up');
      }
      currentSortButton = button;
    } else {
      currentSortButton.classList.remove('price-list__heading-button--active--up');
      currentSortButton.classList.remove('price-list__heading-button--active--down');
      button.classList.add('price-list__heading-button--active--up');
      sortPriceItems(button.dataset.sortRule, 'up');
      currentSortButton = button;
    }
  });
}

function sortPriceItems(rule, direction) {
  if (rule === 'model') {
    if (direction === 'up') {
      priceItemsArray.sort((a, b) => a.dataset[rule].toUpperCase() > b.dataset[rule].toUpperCase() ? 1 : -1);
    } else {
      priceItemsArray.sort((a, b) => a.dataset[rule].toUpperCase() < b.dataset[rule].toUpperCase() ? 1 : -1);
    }
  } else {
    if (direction === 'up') {
      priceItemsArray.sort((a, b) => +a.dataset[rule] > +b.dataset[rule] ? 1 : -1);
    } else {
      priceItemsArray.sort((a, b) => +a.dataset[rule] < +b.dataset[rule] ? 1 : -1);
    }
  }

  for (let i = 0; i < priceItemsArray.length; i++) {
    priceItemsArray[i].style.order = i;
  }
}
