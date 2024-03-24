document.addEventListener("DOMContentLoaded", function () {
    const pop_up = document.getElementById("popup");
    const close_btn = document.getElementById("login_btn");

    const displayNameInput = document.querySelector("input[name='display_name']");
    const userNameDisplay = document.getElementById("userNameDisplay");
    const overlay = document.getElementById("overlay");
//fetch url
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Get the game name parameter from the URL
    var gameName = getParameterByName('gameName');

    // Display the game name in the title element
    var titleElement = document.getElementById("title");
    if (gameName && titleElement) {
        titleElement.innerHTML = "<h2>" + gameName + "</h2>";
    }
    // pop up 
    function show_popup() {
        pop_up.style.display = 'block';
        overlay.style.display = 'flex'; 
    }

    function hide_popup() {
        pop_up.style.display = 'none';
        overlay.style.display = 'none';
        updateUserNameDisplay();
        userNameDisplay.style.display = 'flex';

        document.querySelector(".register").style.display = 'none';
    }

    function updateButtonState() {
        close_btn.disabled = displayNameInput.value.trim() === "";
    }

    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent form submission
        hide_popup();
    }

    function updateUserNameDisplay() {
        const enteredName = displayNameInput.value.trim();
        const userInitial = enteredName ? enteredName[0].toUpperCase() : '#';

        document.getElementById("userInitial").textContent = userInitial;
        document.getElementById("userName").textContent = enteredName || '#';
        document.getElementById("user_name").textContent = enteredName || '';
    }

    displayNameInput.addEventListener("input", updateButtonState);
    close_btn.addEventListener("click", hide_popup);

    const form = document.querySelector("form");
    form.addEventListener("submit", handleFormSubmit);

    window.onload = function () {
        show_popup();
        updateButtonState(); // Initially update the button state
    };

//menu display
    const subMenu = document.getElementById("subMenu");
    const myBtn = document.getElementById("rateHistory");

    myBtn.addEventListener('click', function () {
        subMenu.classList.toggle("active");
    });

    window.addEventListener('click', function (event) {
        if (!event.target.closest('#rateHistory')) {
            subMenu.classList.remove('active');
        }
    });


    
    const cardContainer = document.getElementById("cardContainer");
    const pickedCard = document.getElementById("cardPicked");
    const votedCard = document.getElementById("voted_card");
    const bottomTitle = document.querySelector(".bottom_title");
    const averageDisplay = document.querySelector('.average h1');
    let countdownActive = false; // Variable to track countdown status
    const selectedCardNumbers = []; // Array to store selected card numbers

    // Get the selected type from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedType = urlParams.get('selectedType');

    // Extract the game type from selectedType
    let gameType;
    if (selectedType.includes('Fibonacci')) {
        gameType = 'Fibonacci';
    } else if (selectedType.includes('Powers of 2')) {
        gameType = 'Powers of 2';
    } else if (selectedType.includes('15')) {
        gameType = '15';
    } else {
        console.error('Invalid selected type:', selectedType);
        return;
    }

    // Call the createCards function with the extracted game type
    createCards(gameType);

    // Create cards and append to cardContainer
    function createCards(gameType) {
        // Clear existing cards
        cardContainer.innerHTML = "";

        // Define the card values based on the selected game type
        let cardValues = [];
        switch (gameType) {
            case 'Powers of 2':
                cardValues = [1, 2, 4, 8, 16, 32, 64];
                break;
            case 'Fibonacci':
                cardValues = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
                break;
            case '15':
                cardValues = Array.from({ length: 15 }, (_, i) => i + 1);
                break;
            default:
                console.error('Invalid game type:', gameType);
                return; // Exit the function early if an invalid game type is provided
        }

        // Create cards based on the selected game type
        for (let value of cardValues) {
            const card = createCard(value);
            cardContainer.appendChild(card);
        }
    }

    // Create a single card
    function createCard(cardNumber) {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = cardNumber;
        card.addEventListener('click', handleCardClick);
        
        return card;
    }



    // Handle click event on card
    function handleCardClick() {
        const card = this;
        if (!countdownActive && !card.classList.contains('selected_counting')) {
            const cards = cardContainer.getElementsByClassName('card');
            Array.from(cards).forEach(function (c) {
                c.classList.remove('selected');
            });
    
            card.classList.add('selected');
    
            pickedCard.classList.add("blue");
            document.getElementById("blue_deck").innerHTML = '<button id="revealButton">Reveal cards!</button>';
    
            document.getElementById("revealButton").addEventListener("click", handleRevealButtonClick);
        }
    }
    
    // Handle click event on reveal button
    function handleRevealButtonClick() {
        const cards = cardContainer.getElementsByClassName('card');
        const countdownElement = document.createElement('div');
        countdownElement.className = 'countdown';
        cardContainer.appendChild(countdownElement);
    
        countdownActive = true;
        let count = 2;
        const countdown = setInterval(function () {
            countdownElement.textContent = count;
            Array.from(cards).forEach(function (c) {
                c.classList.toggle('gray-card', count > 0);
                c.classList.toggle('selected_counting', count > 0);
            });
            if (count === 0) {
                clearInterval(countdown);
                countdownElement.style.display = 'none';
                const footerContent = document.getElementById("footerContent");
                const votingResults = document.getElementById("votingResults");
                const picked_card = document.getElementById("cardPicked");
                const selectedCard = cardContainer.querySelector('.selected');
                footerContent.style.display = 'none';
                votingResults.style.display = "flex";
                topMiddle.classList.toggle("voting");
                if (selectedCard) {
                    cardPicked.innerHTML = selectedCard.textContent;
                    picked_card.classList.toggle("shown")
                }
    
                //start new voting
                document.getElementById("blue_deck").innerHTML = '<button id="newvoteButton">Start new voting </button>';
    
                document.getElementById("newvoteButton").addEventListener("click", function(){



                }
                    
                );
    
                const selectedCardNumber = selectedCard.textContent;
                votedCard.textContent = selectedCardNumber;
    
                const average = calculateAverage(selectedCardNumbers);
                averageDisplay.textContent = isNaN(average) ? '-' : Math.round(average);
    
                countdownActive = false;
    
            } else {
                bottomTitle.innerHTML = '<p>Counting votes...</p>';
            }
            count--;
        }, 800);
        const revealButton = document.getElementById("revealButton");
        revealButton.style.display = 'none';
    }
    
    // Calculate the average of an array of numbers
    function calculateAverage(numbers) {
        if (numbers.length === 0) return 0;
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        return sum / numbers.length;
    }
    
    // Event listener to update selectedCardNumbers array whenever a card is clicked
    cardContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('card')) {
            selectedCardNumbers.push(parseInt(event.target.textContent));
        }
    });
    
      
});




