function toggleDropdown() {
    var dropdownContent = document.getElementById("gameOptions");
    dropdownContent.style.display = dropdownContent.style.display === "flex" ? "none" : "flex";
}


function selectOption(gameType) {
    var inputField = document.getElementById("createGame");
    inputField.value = gameType; 
}


function navigateToNextPage() {
    console.log("Function called");
    // Get the game name and selected type
    var gameName = document.getElementById("gameName").value;
    var selectedType = document.getElementById("createGame").value;
    
    // Construct the URL with parameters
    var nextPageURL = "../project/index.html?gameName=" + encodeURIComponent(gameName) + "&selectedType=" + encodeURIComponent(selectedType);
    
    // Navigate to the next page
    window.location.href = nextPageURL;
}