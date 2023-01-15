// Checks for user submissions
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", createUser , false);

async function createUser() {
    var userNameInput = document.querySelector("#usernameInput").value;
    var passwordInput = document.querySelector("#passwordInput").value;

    // Checks that the username is not currently in use.
    // If it is in use, it returns TRUE.
    if ((userNameInput === "") || (passwordInput === "")) {
        // TODO: Make a pop-up instead
        alert("Please fill all fields in!");

        usernameInput.value = "";
        passwordInput.value = "";
        return;

    } else if (await checkUsername(userNameInput)) {
        // TODO: Make a pop-up instead
        alert("That username is currently in use. Please select a new username.");

        usernameInput.value = "";
        passwordInput.value = "";
        return;
    }

    // Disables fields as a safeguard
    button.removeEventListener("click", createUser , false);
    button.disabled = true;

    // Add encrypted password
    let encryptedPassword = await encryptData(passwordInput);

    // Gets the length of the user list
    let listUsers = await loadData("/json/users.json");
    let listUsersLength = listUsers.length;

    // Redirects to the second signup page using a query
    window.location = 'http://localhost:8080/finishSignup.html?username=' +
        userNameInput + '&password=' + encryptedPassword +
        "&userslistLength=" + listUsersLength;
}

function loginUser() {
    // Logs users in for the login page.



}

async function checkUsername(newUsername) {
    // Checks to make sure a username is not currently in use.
    var usernameMatch = false;
    var jsonData = await loadData("/json/users.json");

    // Cycles through the dictionaries
    for (var i = 0; i < jsonData.length; i++) {
        if ((jsonData[i])["username"] === newUsername) {
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
            this.jsonData = data;
        })
        .catch(function (error) {
            console.error("Something went wrong!");
            console.error(error);
        });
    return this.jsonData;
}

function editUser() {
    // In charge of editing user's details.

}

async function encryptData(password) {
    let encryptedPassword;

    await digestMessage(password)
        .then( function (digestHex){
            this.encryptedPassword = digestHex;
        });
    return this.encryptedPassword;
}

async function digestMessage(message) {
    // Creates hashs for the password encrypt

    const msgUint8 = new TextEncoder().encode(message);
    // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    // convert bytes to hex string
    return hashHex;
}

