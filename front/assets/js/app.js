// As funções fillCup e fillDown continuam as mesmas, a seguir o novo código para controlar a lista
let sobe = true;

function randomAction() {
    var actionType;
    // const actionType = Math.random() > 0.5 ? 'fillCup' : 'fillDown'; // Choose randomly to fill or empty
    const cupNumber = Math.floor(Math.random() * 1) + 1; // Random cup number from 1 to 8
    const waterId = `drink${cupNumber}`;
    //actionType = 'fillCup'
    // const actionType = 'fillDown'

    
    if(sobe) { 
        actionType = 'fillCup'; } 
    else { 
        actionType = 'fillDown'; 
    }
    
    if (actionType === 'fillCup') {
        fillCup(waterId);
    } else {
        fillDown(waterId);
    }
}

function updateColor(water) {
    let heightPercentage = parseInt(water.style.height) || 0;
    let colorValue = 120 * (heightPercentage / 100); // 120 is green in HSL, 0 is red
    water.style.backgroundColor = `hsl(${colorValue}, 100%, 50%)`; // Hue varies from red to green
}
setInterval(randomAction, 2500); // Continua igual

function updateList(waterId) {
    const lowList = document.getElementById('lowList');
    const existingItem = document.getElementById(`list-${waterId}`);
    const water = document.getElementById(waterId);
    let currentHeight = parseInt(water.children[0].style.height) || 0;

    if (currentHeight <= 30 && !existingItem) {
        const listItem = document.createElement('li');
        listItem.id = `list-${waterId}`;
        listItem.textContent = `${waterId} - Clique para remover`;
        listItem.onclick = function() {
            this.parentNode.removeChild(this);
        };
        lowList.appendChild(listItem);
    } else if (currentHeight > 30 && existingItem) {
        existingItem.parentNode.removeChild(existingItem);
    }
}

function fillCup(waterId) {
    const water = document.getElementById(waterId);
    let currentHeight = parseInt(water.children[0].style.height) || 0;

    if (currentHeight < 100) {
        currentHeight += 10;
        water.children[0].style.height = `${currentHeight}%`;
        updateColor(water.children[0]);
        updateList(waterId);
    }
}

function fillDown(waterId) {
    const water = document.getElementById(waterId);
    let currentHeight = parseInt(water.children[0].style.height) || 0;

    if (currentHeight > 0) {
        currentHeight -= 10;
        water.children[0].style.height = `${currentHeight}%`;
        updateColor(water.children[0]);
        updateList(waterId);
    }
}
