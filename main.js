const colorPalette = document.getElementById('color-palette');
const otherColors = colorPalette.getElementsByClassName('color');
const pixels = document.getElementsByClassName('pixel');
const canvas = document.getElementById('pixel-board');
const userBoardSize = document.getElementById('board-size');
const generateBoard = document.getElementById('generate-board');

function generateColors() {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }
  return color;
}

function generateRandomColors() {
  const colorOrder = [];
  for (let index = 1; index < otherColors.length; index += 1) {
    let randomColor = generateColors();
    while (randomColor === '#FFFFFF') {
      randomColor = generateColors();
    }
    otherColors[index].style.backgroundColor = randomColor;
    colorOrder.push(randomColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(colorOrder));
}
const btnRandomColor = document.getElementById('button-random-color');
btnRandomColor.addEventListener('click', generateRandomColors);

otherColors[0].classList.add('black');

function restoreColors() {
  let savedColors = JSON.parse(localStorage.getItem('colorPalette'));
  console.log(savedColors);
  if (savedColors === null) {
    savedColors = ['red', 'green', 'blue'];
  }
  for (let index = 1; index < otherColors.length; index += 1) {
    otherColors[index].style.backgroundColor = savedColors[index - 1];
  }
}
restoreColors();

function saveToLocalStorage() {
  let getColor;
  const savePalette = [0, 1, 2, 3];
  for (let index = 1; index < getColor.length; index += 1) {
    const saveTo = getColor[index].style.backgroundColor;
    savePalette[index] = saveTo;
  }
  localStorage.setItem('colorPalette', JSON.stringify(savePalette));
}

const pixelBoard = document.querySelector('#pixel-board');
function createBoard() {
  for (let index = 0; index < 25; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel')
    pixelBoard.appendChild(pixel);
  }
}
createBoard();

function select(event) {
  const selectedColor = document.querySelector('.selected');
  selectedColor.className = 'color';
  event.target.className = 'color selected';
}

const buttons = document.querySelectorAll('.color');
for (let index = 0; index < 4; index += 1) {
  const button = buttons[index];
  button.addEventListener('click', select);
}

const capturePixel = document.querySelectorAll('.pixel');
for (let index = 0; index < capturePixel.length; index += 1) {
  capturePixel[index].addEventListener('click', (event) => {
    event.target.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
    createBoard[index] = document.querySelector('.selected').style.backgroundColor;
    localStorage.setItem('pixelBoard', JSON.stringify(createBoard));
  });
}

const captureButtomClean = document.querySelector('#clear-board');
const cleanPixels = () => {
  for (let index = 0; index < capturePixel.length; index += 1) {
    capturePixel[index].style.backgroundColor = 'white';
    createBoard[index] = '#fff';
  }
  localStorage.setItem('pixelBoard', JSON.stringify(createBoard));
};
captureButtomClean.addEventListener('click', cleanPixels);

function saveColorBoard() {
  const colors = [];
  for (let index = 0; index < pixels.length; index += 1) {
    colors.push(pixels[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(colors));
}

function savedColorBoard() {
  if (localStorage.getItem('pixelBoard')) {
    const savedColors = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = savedColors[index];
    }
  }
}

for (let index = 0; index < pixels.length; index += 1) {
  pixels[index].addEventListener('click', (event) => {
    const selectedColor = document.querySelector('.selected');
    const newEvent = event;
    newEvent.target.style.backgroundColor = `${selectedColor.style.backgroundColor}`;
    saveColorBoard();
  });
}
savedColorBoard();

function makeCanvas(size) {
  for (let index = 0; index < size * size; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    canvas.appendChild(pixel);
  }
  canvas.style = `grid-template-columns: repeat(${size}, 40px);`;
  localStorage.setItem('boardSize', size);
  savedColorBoard();
}

function removeCanvas() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}

const lastArt = pixelBoard ? pixelBoard : [];

function clearBoard() {
  for (let index = 0; index < pixels.length; index += 1) {
    if (pixels[index].style.backgroundColor !== 'white') {
      pixels[index].style.backgroundColor = 'white';
      lastArt[index] = [];
    }
  }
}

generateBoard.addEventListener('click', () => {
  if (userBoardSize.value === '') {
    alert('Board inválido!');
  } else if (userBoardSize.value < 5) {
    removeCanvas();
    makeCanvas(5);
    clearBoard();    
  } else if (userBoardSize.value > 50) {
    removeCanvas();
    makeCanvas(50);
    clearBoard();    
  } else {
    removeCanvas();
    makeCanvas(userBoardSize.value);
    clearBoard();
  }
});
