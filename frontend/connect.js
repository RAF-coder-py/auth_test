const sendRequestLogin = (url, data, callback) => {
  fetch(url, {
    method: "POST", // Méthode de la requête
    headers: {
      "Content-Type": "application/json", // Spécifie que le corps de la requête est au format JSON
    },
    body: JSON.stringify(data), // Convertit l'objet JavaScript en une chaîne JSON
  })
    .then((res) => {
      res.json().then((response) => {
        callback(response.message);
      });
    })
    .catch((error) => console.error("Erreur:", error));
};

document.addEventListener("DOMContentLoaded", (event) => {
  const signInForm = document.getElementById("signInForm");
  const signInButton = document.getElementById("signIn");
  const errorMessage = document.getElementById("errorMessage");

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    sendRequestLogin("http://localhost:3000/users", data, (errorText) => {
      if (errorText != "") {
        errorMessage.innerHTML = errorText;
        errorMessage.style.visibility = "visible";
      }
    });
  });
});
