function handleImageUpload() {
  const fileInput = document.getElementById("usrImg");
  const file = fileInput.files[0];

  if (file) {
    console.log("Image uploaded:", file.name); // Logs the name of the uploaded file

    const formData = new FormData();
    formData.append("usrImg", file); // Use the same name as in your HTML input
    formData.append(
      "usrPOV",
      document.querySelector('input[name="usrPOV"]').value
    ); // Append usrPOV
    formData.append(
      "usrTurn",
      document.querySelector('input[name="usrTurn"]').value
    ); // Append usrTurn

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((html) => {
        // Update the document with the new HTML
        document.body.innerHTML = html; // Replace the entire body or a specific section
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("No file selected.");
  }
}
