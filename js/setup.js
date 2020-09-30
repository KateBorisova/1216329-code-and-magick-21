'use strict';
let WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`];

let WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

let coatColors = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

let eyesColors = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

let userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

let similarListElement = userDialog.querySelector(`.setup-similar-list`);

let similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

let getRandomArrayElement = function (inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
};
let getRandomWizardName = function () {
  let wizardName = getRandomArrayElement(WIZARD_NAMES);
  let wizardSurname = getRandomArrayElement(WIZARD_SURNAMES);
  let flipNameAndSurname = Math.random() > 0.5;
  return flipNameAndSurname
    ? wizardName + ` ` + wizardSurname
    : wizardSurname + ` ` + wizardName;
};
let wizards = [];
for (let i = 0; i < 4; i++) {
  wizards.push({
    name: getRandomWizardName(),
    coatColor: getRandomArrayElement(coatColors),
    eyesColor: getRandomArrayElement(eyesColors)
  });
}

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
