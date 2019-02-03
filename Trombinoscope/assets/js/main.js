"use strict"; //Mode strict activated

// Header Animation
var app = document.querySelector('#app'); // return <div id="app"> and its content </div>
var texts = [ // table text list
    '2019',
    'cannes',
    'simplon',
    'trombinoscope'
];
var styles = ['green', 'yellow', 'red', 'blue']; // table color list
var degrees = ['0deg', '5deg', '10deg', '-5deg', '-10deg']; // table transform degree list
var sizes = ['lowercase', 'uppercase']; // table font case list
var getRndInteger = function (min, max) { // function randomize
    return Math.floor(Math.random() * (max - min)) + min;
};
var generateTextAnimated = function () { // function to randomize text displayed
    var text = texts[getRndInteger(0, texts.length)];
    new TextAnimated(text);
};
var TextAnimated = /** @class */ (function () {
    function TextAnimated(text) {
        this.text = text;
        this.textAnimatedArr = this.getArr(this.text);
        this.render();
    }
    TextAnimated.prototype.createTag = function (tagName, content) {
        var tag = document.createElement(tagName);
        var tagInner = document.createElement(tagName);
        tag.className = "animated bounceIn text-item text-" + this.getSize() + " " + this.getStyle();
        tagInner.textContent = content;
        tagInner.style.transform = "rotate(" + this.getDegree() + ")";
        tag.appendChild(tagInner);
        return tag;
    };
    TextAnimated.prototype.getArr = function (string) {
        return string.split('');
    };
    TextAnimated.prototype.getStyle = function () {
        return styles[getRndInteger(0, styles.length)];
    };
    TextAnimated.prototype.getDegree = function () {
        return degrees[getRndInteger(0, degrees.length)];
    };
    TextAnimated.prototype.getSize = function () {
        return sizes[getRndInteger(0, sizes.length)];
    };
    TextAnimated.prototype.render = function () {
        var _this = this;
        app.innerHTML = '';
        this.textAnimatedArr.map(function (str) { return app.appendChild(_this.createTag('div', str)); });
    };
    return TextAnimated;
}());
generateTextAnimated();
setInterval(function () {
    generateTextAnimated();
}, 3000);

// !Header Animation

var slideIndex = 0; // index for users
var slideContainer = document.querySelector(".slideshow-items"); // value of class same as document.getElementByClassname("slideshow-items")

populateTrombinoscope(); // function to populate the html class "slideshow-items"

showSlides(slideIndex); // function to display items on left or right button click

function populateTrombinoscope() {
	var strHTML = "";

	for(let i = 0, len = users.length; i < len; i++) { // len = total of user, loop to catch all user of users
		let user = users[i]; 
		strHTML += getTemplate(user.name, user.pict, i, len); // same as strHTML = strHTML + getTemplate(user.name, user.pict, i, len);
	}
	slideContainer.innerHTML += strHTML; // method .innerHTML to put the content of getTemplate(user.name, user.pict, i, len) in slideContainer class
}

function getTemplate(userName, pictName, index, userLength) { // gets [user.name, user.pict, i, len] as arguments
	return ('<div class="mySlides">\
		<div class="numbertext">'+(index+1)+' / '+userLength+'</div>\
		<img src="./assets/photos/'+pictName+'" style="width:100%">\
		<div class="text">'+userName+'</div>\
	</div>');
}

// Next/previous controls
function plusSlides(n) { // items index increment/decrement
	showSlides(slideIndex += n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}

	var slide;
	for (i = 0; i < slides.length; i++) {
		slide = slides[i];
		//slides[i].style.display = "none";
		slide.classList.remove("display_slide_item");
		slide.classList.add("hide_slide_item");
	}

	//slides[slideIndex - 1].style.display = "block";
	slides[slideIndex - 1].classList.remove("hide_slide_item");
	slides[slideIndex - 1].classList.add("display_slide_item");
}
// Auto Play Functions
var autoPlay = true; // statement for autoplay button
var autoPlayButton = document.querySelector(".fa-play"); //var autoPlayButton = document.getElementsByClassName("fa-play")[0];

function automaticSlide() {
	if (autoPlay == true) {
		autoPlay = false; // switch statement for autoplay button
		autoPlayButton.classList.replace("fa-play","fa-pause"); // replace to switch the class of play/pause button
	} else {
		autoPlay = true;
		autoPlayButton.classList.remove("fa-pause");
		autoPlayButton.classList.add("fa-play");
		return;
	}

	autoSlides();

}

function autoSlides() {
	
	if (autoPlay) { // autoPlay == true
		return; // if true then stop the function
	}

	plusSlides(1); // index increment in argument fixed at 1 to switch items 1 by 1;

	setTimeout(autoSlides, 3000); // Change image every 3 seconds
}
// !Autoplay Function