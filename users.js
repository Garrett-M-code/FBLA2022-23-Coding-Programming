// Checks for user submissions
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", createUser , false);


async function createUser() {
    // TODO: Add the user input fields when implementing.
    var userNameInput = document.querySelector("#usernameInput").value;
    var passwordInput = document.querySelector("#passwordInput").value;

    // Checks that the username is not currently in use.
    // If it is in use, it returns TRUE.
    if ((userNameInput === "") || (passwordInput === "")) {
        // TODO: Make a pop-up instead
        alert("Please fill all fields in!");

        userNameInput.value = "";
        passwordInput.value = "";
        return;

    } else if (await checkUsername(userNameInput)) {
        // TODO: Make a pop-up instead
        alert("That username is currently in use. Please select a new username.");

        userNameInput.value = "";
        passwordInput.value = "";
        return;
    }

    // TODO: Add the user to JSON
    var createdUser =  {
        "username": userNameInput.value,
        "password": passwordInput,
        "name": "",
        "grade": 0,
        "elo": 0,
        "visited_events": [],
        "wishlisted_events": [],
        "user_ID": []
    }
    createdUser = JSON.stringify(createdUser);

    // TODO: Redirect the user to the home page

    button.removeEventListener("click", createUser , false);
    button.disabled = true;

}

function loginUser() {
    // Logs users in for the login page.



}

async function checkUsername(newUsername) {
    // Checks to make sure a username is not currently in use.
    var usernameMatch = false;

    var jsonData = await loadData("users.json");

    alert("Made it");

    console.log(jsonData);
    // Cycles through the dictionaries
    for (var i = 0; i < jsonData.length; i++) {
        if ((jsonData[0])["username"] === newUsername) {
            usernameMatch = true;
        }
    }

    return usernameMatch;
}

async function loadData(filename) {
    var jsonData;

    await fetch(filename)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            this.jsonData = data;
        })
        .catch(function (error) {
            console.error("Something went wrong!");
            console.error(error);
        });

    console.log(this.jsonData);
    return this.jsonData;
}

function editUser() {
    // In charge of editing user's details.

}

function encryptData() {
    // Ecrypts peices of data so that user's privacy can be respected.

}