alert("First Line");
console.log("after first line")
alert("Second Line");
console.log("after Second line")
alert("Third Line");


  // const outer = document.getElementById("outer");
  // const middle = document.getElementById("middle");
  // const inner = document.getElementById("inner");


  // // Basic Syntax
  // // addEventListener("click", () => {

  // // }, useCapture) --> true/false
  // // )


  // // // Event Bubbling (useCapture = false)
  // // outer.addEventListener("click", (event) => {
  // //   console.log("Bubbling: OUTER");
  // // }, false);

  // // middle.addEventListener("click", (event) => {
    
  // //   console.log("Bubbling: MIDDLE");
  // // }, false);

  // // inner.addEventListener("click", (event) => {
    
  // //   console.log("Bubbling: INNER");
  // // }, false);





  // // Event Capturing
  // outer.addEventListener("click", (event) => {
  //   event.stopPropagation()
  //   console.log("Capturing: OUTER");
  // }, true);

  // middle.addEventListener("click", () => {
  //   console.log("Capturing: MIDDLE");
  // }, true);

  // inner.addEventListener("click", () => {
  //   console.log("Capturing: INNER");
  // }, true);