'use strict';

var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var containerElement = document.getElementById('container');
var voteCounterElement = document.getElementById('vote-counter');
var totalVotes = 0;
var uniqueRandomNumbers = 0;
var allProducts = [];
var productLabels = [];
var productVotes = [];
var productShown = [];

var Product = function(name, endOfFile){
    this.filePath = `imgs/${name}.${endOfFile}`;
    this.title = this.alt = name;
    this.vote = 0;
    this.views = 0;

    allProducts.push(this);
}

function fillLocalStorageArray(){
    new Product('bag', 'jpg');
    new Product('banana', 'jpg');
    new Product('bathroom', 'jpg');
    new Product('boots', 'jpg');
    new Product('breakfast', 'jpg');
    new Product('bubblegum', 'jpg');
    new Product('chair', 'jpg');
    new Product('cthulhu', 'jpg');
    new Product('dog-duck', 'jpg');
    new Product('dragon', 'jpg');
    new Product('pen', 'jpg');
    new Product('pet-sweep', 'jpg');
    new Product('tauntaun', 'jpg');
    new Product('unicorn', 'jpg');
    new Product('usb', 'gif');
    new Product('water-can', 'jpg');
    new Product('wine-glass', 'jpg');
    new Product('shark', 'jpg');
    new Product('sweep', 'png')
    new Product('scissors', 'jpg');
}


var render = function(){
    getUniqueRandomNumbers();

    var firstRandomIndexNumber = uniqueRandomNumbers[0];
    var secondRandomIndexNumber = uniqueRandomNumbers[1];
    var thirdRandomIndexNumber = uniqueRandomNumbers[2];

    imageOneElement.src = allProducts[firstRandomIndexNumber].filePath;
    imageOneElement.title = allProducts[firstRandomIndexNumber].title;
    imageOneElement.alt = allProducts[firstRandomIndexNumber].title;
    allProducts[firstRandomIndexNumber].views++;

    imageTwoElement.src = allProducts[secondRandomIndexNumber].filePath;
    imageTwoElement.title = allProducts[secondRandomIndexNumber].title;
    imageTwoElement.alt = allProducts[secondRandomIndexNumber].title;
    allProducts[secondRandomIndexNumber].views++;

    imageThreeElement.src = allProducts[thirdRandomIndexNumber].filePath;
    imageThreeElement.title = allProducts[thirdRandomIndexNumber].title;
    imageThreeElement.alt = allProducts[thirdRandomIndexNumber].title;
    allProducts[thirdRandomIndexNumber].views++;
}

function getUniqueRandomNumbers(){
        uniqueRandomNumbers = [];

        for(var i=0; i<3; i++){
            var randomNumber = randomIndexGenerator();
            while(uniqueRandomNumbers.includes(randomNumber)){
                randomNumber = randomIndexGenerator;
            }
            uniqueRandomNumbers.unshift(randomNumber);
        }
        while(uniqueRandomNumbers.length > 3){
            uniqueRandomNumbers.pop();
        }
    }

    function randomIndexGenerator(){
        return Math.floor(Math.random() * allProducts.length);
    }

    function handleClick(e){
        var titleClick = e.target.title;
        for(var i=0; i<allProducts.length; i++){
            if(titleClick === allProducts[i].title){
                allProducts[i].vote++;
                totalVotes++;
            }
        }

        render();

        if(totalVotes === 25){
            containerElement.removeEventListener('click', handleClick);
            generateChartData();
            generateChart();
            createResultButton();
        }
    }

function createResultButton() {
  var buttonContainer = document.getElementById('button-container');
  var resultsButton = document.createElement('button');

  resultsButton.textContent = 'View Results';
  buttonContainer.appendChild(resultsButton);
  resultsButton.addEventListener('click', displayResults);
}

function displayResults() {
  document.getElementById('results-header').innerHTML = '';
  var resultsHeader = document.getElementById('results-header');
  var headerEl = document.createElement('h2');
  var resultsList = document.getElementById('results-list');
  var resultEl;
  var pluralVotes;
  var pluralShown;

  headerEl.textContent = 'Results';
  resultsHeader.appendChild(headerEl);

  for (var i = 0; i < allProducts.length; i++) {
    pluralVotes = 's';
    pluralShown = 's';

    if (allProducts[i].vote === 1) {
      pluralVotes = '';
    }

    if (allProducts[i].views === 1) {
      pluralShown = '';
    }

    resultEl = document.createElement('li');
    resultEl.textContent = `${allProducts[i].title} had ${allProducts[i].vote} vote${pluralVotes}, and was seen ${allProducts[i].views} time${pluralShown}.`;
    resultsList.appendChild(resultEl);

  }

  document.getElementById('button-container').innerHTML = '';
  generateChart();
}

    containerElement.addEventListener('click', handleClick);

    function generateChartData(){
        for(var i=0; i<allProducts.length; i++){
            productLabels.push(allProducts[i].title);
            productVotes.push(allProducts[i].vote);
            productShown.push(allProducts[i].views);
        }
    }

    function generateChart(){

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productLabels,
            datasets: [{
                label: 'Votes',
                data: productVotes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                    label: 'Views',
                    data: productShown,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
        ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function initialLS(){
    if(localStorage.length === 0){
        fillLocalStorageArray();
    } else {
        getAllProducts();
    }
}

function allProductsIntoLS(){
    var stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifiedProducts);
}

function getAllProducts(){
    var allProductsFromLS = localStorage.getItem('products');
    var parsedProducts = JSON.parse(allProductsFromLS);
    generateNewProducts(parsedProducts);
}

function generateNewProducts(products){
    allProducts = [];
    for(var i=0; i<products.length; i++){
        new Product(products[i].filePath, products[i].title, products[i].vote, products[i].views);
    }
}

initialLS();
allProductsIntoLS();
render();