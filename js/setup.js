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

let fireballColors = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
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


let setupOpen = document.querySelector(`.setup-open`);
let setup = document.querySelector(`.setup`);
let setupClose = setup.querySelector(`.setup-close`);
let setupUserName = document.querySelector(`.setup-user-name`);
let setupWizard = document.querySelector(`.setup-wizard`);
let wizardCoat = setupWizard.querySelector(`.wizard-coat`);
let hiddenWizardCoat = document.querySelector(`[name="coat-color"]`);
let wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
let hiddenWizardEyes = document.querySelector(`[name="eyes-color"]`);
let setupFireballWrap = document.querySelector(`.setup-fireball-wrap`);
let hiddenFireballInput = document.querySelector(`[name="fireball-color"]`);


let onPopupEscPress = function (evt) {
  if (evt.key === `Escape` && document.activeElement !== setupUserName) {
    evt.preventDefault();
    closePopup();
  }
};

let openPopup = function () {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

let closePopup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

wizardCoat.addEventListener(`click`, function () {
  let randomCoatColor = getRandomArrayElement(coatColors);
  wizardCoat.style.fill = randomCoatColor;
  hiddenWizardCoat.value = randomCoatColor;
});

wizardEyes.addEventListener(`click`, function () {
  let randomEyesColor = getRandomArrayElement(eyesColors);
  wizardEyes.style.fill = randomEyesColor;
  hiddenWizardEyes.value = randomEyesColor;
});

setupFireballWrap.addEventListener(`click`, function () {
  let randomFireballColor = getRandomArrayElement(fireballColors);
  setupFireballWrap.style.backgroundColor = randomFireballColor;
  hiddenFireballInput.value = randomFireballColor;
});
