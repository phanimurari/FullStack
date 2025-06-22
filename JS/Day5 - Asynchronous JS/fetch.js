const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    // body: JSON.stringify(data)
}


// The POST method can be used to send data to the server.
// let options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: "Bearer ACCESS-TOKEN"
//     },
//     body: JSON.stringify(data)
// };


// The PUT method can be used to update the existing resource.

// let options = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: "Bearer ACCESS-TOKEN"
//     },
//     body: JSON.stringify(data)
//   };

// The DELETE method can be used to delete the specified resource.

// let options = {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: "Bearer ACCESS-TOKEN"
//     }
//   };

console.log("Start")


fetch('http://localhost:8000/api/todos/', options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Fetched Todos:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
});

console.log("end")
