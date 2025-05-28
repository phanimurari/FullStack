


document.getElementById('fruit-list').addEventListener('click', function(event) {
  console.log(event.target.id, "id ")  
  if (event.target.tagName === 'LI') {
      console.log(`You clicked on ${event.target.textContent}`);
  }
});

document.getElementById('input-group').addEventListener('change', function(event) {
  if(event.target.id === "input1") {
    document.getElementById("input1").value = (event.target.value).toUpperCase()
  }
  else if(event.target.id === "input2") {
    document.getElementById("input2").value = (event.target.value).toLowerCase()
  }
  else {
    console.log(event.target.id)
  }
});

