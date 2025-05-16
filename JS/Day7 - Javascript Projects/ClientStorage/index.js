// LOCAL STORAGE: Save and Load Name
function saveName() {
  const name = document.getElementById('nameInput').value;
  localStorage.setItem('savedName', name);

  // localStorage.setItem()
  displayName();
}

// const details = {
//     name: "Murari"
// }


// const stringfiedDetails = JSON.stringify(details) -> string
// JSON.parse()


function displayName() {
  const name = localStorage.getItem('savedName');

   //   localStorage.getItem()
  if (name) {
    document.getElementById('savedName').textContent = `Saved Name: ${name}`;
  }
}

// SESSION STORAGE: Save and Load Note
function saveNote() {
  const note = document.getElementById('noteInput').value;
  sessionStorage.setItem('savedNote', note);
  displayNote();
}

function displayNote() {
  const note = sessionStorage.getItem('savedNote');
  if (note) {
    document.getElementById('savedNote').textContent = `Saved Note: ${note}`;
  }
}

// Initial load (when page is refreshed or reopened)
displayName();
displayNote();
