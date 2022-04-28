const priceItems = document.querySelectorAll('.price-item');
const additionalHeadingCell = document.querySelector('.price-list__heading--additional');
let currentPriceItem;

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
