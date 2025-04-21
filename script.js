const form = document.getElementById("registrationForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  const selectedEvent = document.getElementById("event").value;

  const entryKey = `${name}|${email}|${number}|${selectedEvent}`;

  // Check localStorage for duplicate
  const existingEntries = JSON.parse(localStorage.getItem("registrations") || "[]");

  const isDuplicate = existingEntries.includes(entryKey);

  if (isDuplicate) {
    alert("You've already registered for this event with the same details.");
    return;
  }

  const formURL = "https://docs.google.com/forms/d/e/1FAIpQLScoXEMiCg7loBz7LiOAS-ogu7McL4SeKA3NfVroP0VO7MoyuQ/formResponse";

  const formData = new FormData();
  formData.append("entry.706879500", name);
  formData.append("entry.2112021950", email);
  formData.append("entry.213988092", number);
  formData.append("entry.1133712770", selectedEvent);

  fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
    .then(() => {
      existingEntries.push(entryKey);
      localStorage.setItem("registrations", JSON.stringify(existingEntries));

      document.getElementById("confirmationMessage").textContent =
        "Registration successful!";
      form.reset();
    })
    .catch((error) => {
      alert("Something went wrong.");
      console.error("Error:", error);
    });
});
