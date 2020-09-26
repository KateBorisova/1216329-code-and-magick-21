"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_SIZE = 16;
const FONT_GAP = 18;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_GAP = 50;

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getBarColor = function (playerName) {
  if (playerName === `Вы`) {
    return `rgba(255, 0, 0, 1)`;
  } else {
    let newSaturation = Math.random() * 100;
    return `hsl(240,` + newSaturation + `%, 50%)`;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);
  ctx.fillStyle = `#000`;
  ctx.font = FONT_SIZE + `px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText(
      `Список результатов: `,
      CLOUD_X + FONT_GAP,
      CLOUD_Y + FONT_SIZE + FONT_GAP
  );

  let BARS_Y = CLOUD_Y + (FONT_SIZE + FONT_GAP) * 2 + GAP;
  let NAMES_Y = BARS_Y + BAR_HEIGHT + GAP;
  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        BARS_Y + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime) - FONT_GAP
    );
    ctx.fillStyle = getBarColor(names[i]);
    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        BARS_Y + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime),
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) / maxTime
    );
    ctx.fillStyle = `#000`;
    ctx.fillText(
        names[i],
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        NAMES_Y
    );
  }
};
