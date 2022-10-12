import Choices from 'choices.js';
import 'choices.js/public/assets/scripts/choices.min.js';
import 'choices.js/public/assets/styles/choices.min.css';

const defaultSelect = () => {
  const element = document.querySelector('.select-country');
  const choices = new Choices(element, {
    allowHTML: true,
    noResultsText: 'There is no such country. Select from the list',
    placeholderValue: 'hello',
    resetScrollPosition: false,
  });
};
defaultSelect();
