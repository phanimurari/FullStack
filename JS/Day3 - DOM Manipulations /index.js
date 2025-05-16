// // // getElementById()
// console.log(document.getElementById("headingElement"))


// // // getElementByTagName

// console.log(document.getElementsByTagName("h1"))

// const containerEle = document.getElementById("container")

// console.log(containerEle.getAttribute("id"))
// console.log(containerEle.getAttribute("class"))

// containerEle.setAttribute("id", "main_container")
// console.log(containerEle.getAttribute("id"))









const container = document.getElementById('container');
const para2 = document.getElementById('para2');
const para1 = document.getElementById("para1")

para1.textContent = "I am Changed!"

console.log(container.getAttribute('id'))
console.log(container.getAttribute('class'))

container.setAttribute("id", "main_container")
container.setAttribute("class", "new-class")

console.log(container.getAttribute('id'))
console.log(container.getAttribute('class'))


console.log('All childNodes of #container:');
console.log(container.childNodes); // Includes text nodes (whitespace), comment, and elements
console.log(container.childNodes[1])


console.log('First child of #container:', container.firstChild);
console.log('Last child of #container:', container.lastChild);

console.log('Parent of #para2:', para2.parentNode);
console.log('Next sibling of #para2:', para2.nextSibling);
console.log('Previous sibling of #para2:', para2.previousSibling);

const para4 = document.createElement("p")
para4.textContent ="Fourth paragraph"

container.appendChild(para4);

para4.style.color = "green"
para4.style.backgroundColor = "blue"
para4.style.padding = "10px"

innerHtml
innerHeight
