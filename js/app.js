'use strict';

var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var containerElement = document.getElementById('container');
var voteCounterElement = document.getElementById('vote-counter');
var totalClicks = 0;


var firstRandomIndexNumber = 0;
var secondRandomIndexNumber = 0;
var thirdRandomIndexNumber = 0;

var allProducts = [];

var Product = function(name){
    this.filePath = `imgs/${name}.jpg`;
    this.title = this.alt = name;
    this.vote = 0;
    this.views = 0;

    allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');
new Product('shark');
new Product('sweep')
new Product('scissors');

function randomIndexGenerator(){
    return Math.floor(Math.random() * allProducts.length);
}

function render(){
    firstRandomIndexNumber = randomIndexGenerator();
    secondRandomIndexNumber = randomIndexGenerator();
    thirdRandomIndexNumber = randomIndexGenerator();

    while(secondRandomIndexNumber === firstRandomIndexNumber){
        secondRandomIndexNumber = randomIndexGenerator();

    }

    while(thirdRandomIndexNumber === secondRandomIndexNumber){
        thirdRandomIndexNumber = randomIndexGenerator();

    }

    while(firstRandomIndexNumber === thirdRandomIndexNumber){
        firstRandomIndexNumber = randomIndexGenerator();

    }

imageOneElement.src = allProducts[firstRandomIndexNumber].filePath;
imageOneElement.title = allProducts[firstRandomIndexNumber].title;
imageOneElement.alt = allProducts[firstRandomIndexNumber].alt;

imageTwoElement.src = allProducts[secondRandomIndexNumber].filePath;
imageTwoElement.title = allProducts[secondRandomIndexNumber].title;
imageTwoElement.alt = allProducts[secondRandomIndexNumber].alt;

imageThreeElement.src = allProducts[thirdRandomIndexNumber].filePath;
imageThreeElement.title = allProducts[thirdRandomIndexNumber].title;
imageThreeElement.alt = allProducts[thirdRandomIndexNumber].alt;

}

function handleClick(e){
    totalClicks++;
    if(totalClicks<=25){
        var title = e.target.title;
        for(var i=0; i<allProducts.length; i++){
            if(allProducts[i].title === title){
                allProducts[i].vote++;
            }
            render();
    }  var title = e.target.title;
    for(var i=0; i<allProducts.length; i++){
        if(allProducts[i].title === title){
            allProducts[i].views++;
        }
    }
    }else{
    for(var i=0; i<allProducts.length; i++){
        var liElement=document.createElement('li')
        liElement.textContent=`${allProducts[i].title} was voted ${allProducts[i].vote} and was seen ${allProducts[i].views} times`;
        voteCounterElement.appendChild(liElement)
    }
}
}

containerElement.addEventListener('click', handleClick);
//
render();

