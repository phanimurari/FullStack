const button = document.getElementById('button')

function onclickfunction() {
    console.log("Button is clicked")
}

button.addEventListener("click", onclickfunction)

const imageElement = document.getElementById('cat-image')

function zoomIn() {
    console.log("ZoomIN")
    imageElement.style.height = `400px`
    imageElement.style.width = `400px`
}

imageElement.addEventListener('mouseover', zoomIn)

function zoomOut() {
    const imageElement = document.getElementById('cat-image')
    imageElement.style.height = `200px`
    imageElement.style.width = `200px`
}

function trackInput(event) {
    console.log(event.target.value)
}

function onFocusInput() {
    console.log("Focused")
}

function onkeydownFunction(event) {
    console.log("Key is pressed")
    console.log(event.target.value)
}

function showWelcomeMessage() {

}
