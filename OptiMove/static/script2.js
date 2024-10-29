const fenOutput = document.getElementById("fen");
const moveOutput = document.getElementById("move");
const lettersOutput = document.getElementById("letters");

function handleImageUpload() {
  const fileInput = document.getElementById("usrImg");
  const file = fileInput.files[0];
  console.log("image uploaded");
  // Add all data to send
  const formData = new FormData();
  formData.append("usrImg", file);
  formData.append(
    "usrPOV",
    document.querySelector('input[name="usrPOV"]').value
  ); // Append usrPOV
  formData.append(
    "usrTurn",
    document.querySelector('input[name="usrTurn"]').value
  );

  sendData(formData);
}

async function sendData(formData) {
  // send data to /api/tiles
  const response1 = await fetch("/api/tiles", {
    method: "POST",
    body: formData,
  });
  const data1 = await response1.json();
  lettersOutput.innerText = data1.letters;

  // send data to /api/fen
  const response2 = await fetch("/api/fen", {
    method: "POST",
    body: formData,
  });
  const data2 = await response2.json();
  fenOutput.innerText = data2.fen;

  // send data to /api/move
  const response3 = await fetch("/api/move", {
    method: "POST",
    body: formData,
  });
  const data3 = await response3.json();
  moveOutput.innerText = data3.move;
}
