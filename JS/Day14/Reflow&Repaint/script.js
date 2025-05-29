// var box1Height = document.getElementById('box1').clientHeight;
// document.getElementById('box1').style.height = box1Height + 10 + 'px';

// var box2Height = document.getElementById('box2').clientHeight;
// document.getElementById('box2').style.height = box2Height + 10 + 'px';

// var box3Height = document.getElementById('box3').clientHeight;
// document.getElementById('box3').style.height = box3Height + 10 + 'px';

// var box4Height = document.getElementById('box4').clientHeight;
// document.getElementById('box4').style.height = box4Height + 10 + 'px';

// var box5Height = document.getElementById('box5').clientHeight;
// document.getElementById('box5').style.height = box5Height + 10 + 'px';

// var box6Height = document.getElementById('box6').clientHeight;
// document.getElementById('box6').style.height = box6Height + 10 + 'px';


var box1Height = document.getElementById('box1').clientHeight;
var box2Height = document.getElementById('box2').clientHeight;
var box3Height = document.getElementById('box3').clientHeight;
var box4Height = document.getElementById('box4').clientHeight;
var box5Height = document.getElementById('box5').clientHeight;
var box6Height = document.getElementById('box6').clientHeight;

document.getElementById('box1').style.height = box1Height + 10 + 'px';
document.getElementById('box2').style.height = box2Height + 10 + 'px';
document.getElementById('box3').style.height = box3Height + 10 + 'px';
document.getElementById('box4').style.height = box4Height + 10 + 'px';
document.getElementById('box5').style.height = box5Height + 10 + 'px';
document.getElementById('box6').style.height = box6Height + 10 + 'px'



function increaseHeights() {
  for (let i = 1; i <= 6; i++) {
    const box = document.getElementById('box' + i);
    const height = box.clientHeight;
    box.style.height = height + 10 + 'px';
  }
}




// optimized code:


