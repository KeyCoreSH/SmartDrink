document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("card-container");
    const closeAccount = document.getElementById('close-account');
    const tableNumber = document.querySelector('.table');
    const closeIcon = document.querySelector('ion-icon');
    let selectedCard = null;
    let isOnDisplayed = true;

    const numbersDiv = document.querySelector('.numbers');
    const numbersArray = Array.from({ length: 30 }, (_, i) => i + 1);

    for (let i = 0; i < 3; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 10; j++) {
            const index = i * 10 + j;
            if (index < numbersArray.length) {
                const numberElement = document.createElement("p");
                numberElement.textContent = numbersArray[index];
                row.appendChild(numberElement);
            }
        }
        numbersDiv.appendChild(row);
    }

    let selectedNumbers = [];
    let cardsWithGlass = []; 

    function handleNumberClick(numberElement) {
        const number = numberElement.textContent;

        if (numberElement.classList.contains('selected')) {
            numberElement.style.opacity = '1';
            numberElement.classList.remove('selected');
            numberElement.style.pointerEvents = 'auto';

            const index = selectedNumbers.indexOf(number);
            if (index !== -1) {
                selectedNumbers.splice(index, 1);
            }
        } else {
            numberElement.style.opacity = '0.1';
            numberElement.classList.add('selected');
            numberElement.style.pointerEvents = 'none';

            selectedNumbers.push(number);
        }
    }

    const numberElements = document.querySelectorAll('.numbers p');
    numberElements.forEach(numberElement => {
        numberElement.addEventListener('click', function () {
            handleNumberClick(numberElement);
        });
    });

    for (let i = 1; i <= 12; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const number = document.createElement("p");
        number.classList.add("number");
        number.textContent = i;

        card.appendChild(number);
        container.appendChild(card);

        card.addEventListener('click', function () {
            tableNumber.textContent = i;
            closeAccount.style.display = 'block';
            selectedCard = card;
        });
    }

    const addButton = document.querySelector('.put');
    const onSpan = document.querySelector('.on');
    const checkSpan = document.querySelector('.check');

    addButton.addEventListener('click', function () {
        selectedNumbers.forEach(number => {
            const glassContainer = document.createElement("div");
            const glasswave = document.createElement('div');
            glasswave.classList.add("wave");
            glassContainer.classList.add("glass-container");
            

            const glassDiv = document.createElement("div");
            glassDiv.appendChild(glasswave);
            glassDiv.classList.add("glass");
            glassContainer.appendChild(glassDiv);

            const numberSpan = document.createElement("span");
            numberSpan.classList.add("glass-number");
            numberSpan.textContent = number;
            glassContainer.appendChild(numberSpan);

            if (selectedCard) {
                selectedCard.appendChild(glassContainer);
                cardsWithGlass.push(selectedCard); 
            }
        });

        if (isOnDisplayed) {
            onSpan.style.display = 'none';
            checkSpan.style.display = 'flex';

            addButton.style.border = 'none';
            addButton.style.background = 'linear-gradient(to right, #00ad00, #3b7730)';

            numbersDiv.style.display = 'flex';
        } else {
            onSpan.style.display = 'flex';
            checkSpan.style.display = 'none';

            addButton.style.border = '2px solid #CB6CE6';
            addButton.style.background = 'transparent';

            numbersDiv.style.display = 'none';
        }

        isOnDisplayed = !isOnDisplayed;

        selectedNumbers = [];
    });

    closeIcon.addEventListener('click', function () {
        closeAccount.style.display = 'none';
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAccount.style.display = 'none';
        }
    });

    setInterval(function () {
        const cardsWithGlassNumbers = cardsWithGlass.map(card => parseInt(card.querySelector('.number').textContent));
    
        if (cardsWithGlassNumbers.length > 0) {
            const availableCards = cardsWithGlass.filter(card => !card.dataset.toastShown);
    
            if (availableCards.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableCards.length);
                const randomCard = availableCards[randomIndex];
                const randomCardNumber = parseInt(randomCard.querySelector('.number').textContent);
    
                Toastify({
                    text: `MESA ${randomCardNumber}`,
                    duration: 100000,
                    style: {
                        background: `linear-gradient(to right, #d00000, #8d0801)`,
                        borderRadius: '1rem'
                    },
                    onClick: function () {
                        toast.hideToast();
                    }
                }).showToast();
    
                randomCard.dataset.toastShown = true;
            }
        }
    }, 3000);   
});
