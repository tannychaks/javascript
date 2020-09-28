// Challenge 1: Your Age in Days

function ageInDays() {
    let birthYear = prompt("What is your birth year?");
    let ageInDays = (2020 - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + ageInDays + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-age-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

//Challenge 2:  Cat Generator

function generateCat() {
    let image = document.createElement('img');
    image.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
    document.getElementById('flex-box-cat-result').appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randRpsInt());
    console.log(botChoice);
    let results = decideWinner(humanChoice, botChoice); //[0, 1] : human lost | bot won
    console.log(results)
    let message = finalMessage(results);
    console.log(message);
    rpsFrontend(humanChoice, botChoice, message)
}

function randRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, botChoice) {
    let rpsDatastore = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5 },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1 }
    }

    let yourScore = rpsDatastore[yourChoice][botChoice];
    let botScore = rpsDatastore[botChoice][yourChoice];

    return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]) {
    if (yourScore === 0) {
        return { 'message': 'You Lost!', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You Tied!', 'color': 'yellow' };
    } else {
        return { 'message': 'You Won!', 'color': 'green' };
    }
}

function rpsFrontend(humanChoice, botChoice, finalMessage) {
    let imageDatastore = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    let botDiv = document.createElement('div');

    /**following can be changed through DOM manipulation. 
    Avoid innerHTML for security Reasons like XSS attack 
    and many more complexities.*/
    humanDiv.innerHTML = "<img src='" + imageDatastore[humanChoice] + "' height=150 width=150 style = 'box-shadow:  0px 10px 50px rgba(37, 50, 253, 1);'>";
    messageDiv.innerHTML = "<h1 style ='color:" + finalMessage['color'] + "; font-size:60px; padding:30px; '>" + finalMessage['message'] + "<\h1>";
    botDiv.innerHTML = "<img src='" + imageDatastore[botChoice] + "' height=150 width=150 style = 'box-shadow:  0px 10px 50px rgba(243, 38, 24, 1);'>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}