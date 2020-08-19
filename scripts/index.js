window.onload = function() {
    var nextButtons = document.querySelectorAll(".btn.next");
    for (var i = 0; i < nextButtons.length; i++) {
        nextButtons[i].setAttribute("onclick","next(this," + i + ");");
        if (i > 0) {
            nextButtons[i].setAttribute("data-toggle","tooltip");
            nextButtons[i].setAttribute("data-placement","top");
            nextButtons[i].setAttribute("title","You must make a selection to continue");
        }
        if (i == nextButtons.length - 1 && nextButtons.length > 1) {
            nextButtons[i].setAttribute("onclick","next(this," + i + "); calculate();"); 
        }
    }
    var backButtons = document.querySelectorAll(".btn.back");
    for (var i = 0; i < backButtons.length; i++) {
        backButtons[i].setAttribute("onclick","back(this," + i + ");");
    }
    var radios = document.querySelectorAll(".btn-group label.btn");
    for (var i = 0; radios.length; i++) {
        if (i == radios.length - 1 || i == radios.length - 2) {
            radios[i].setAttribute("onclick","enableNext(this); next(this," + Math.floor(i/2 + 1) + "); calculate();");
        } else {
            radios[i].setAttribute("onclick","enableNext(this); next(this," + Math.floor(i/2 + 1) + ");");
        }
    }
}

function next(button, input) {
    if (button.classList.contains("disabled") == false) {
        var target = input + 1;
        var pages = document.querySelectorAll(".page");
        document.querySelector(".current-page").classList.remove("current-page");
        setTimeout(function(){pages[target].classList.add("current-page"); pages[target].classList.add("loaded"); }, 300);
    }
}

function back(button, input) {
    if (button.classList.contains("disabled") == false) {
        var target = input;
        var pages = document.querySelectorAll(".page");
        document.querySelector(".current-page").classList.remove("current-page");
        pages[target + 1].classList.remove("loaded");
        setTimeout(function(){pages[target].classList.add("current-page"); }, 300);
    }
}

function enableNext(startLocation) {
    var button = startLocation.parentElement.parentElement.lastElementChild.lastElementChild;
    console.log(button);
    button.setAttribute("data-original-title","");
    button.classList.remove("disabled");
}

function enableStartOver() {
    document.querySelector(".start-over").classList.remove("hide");
}
//Function for jumping to the end of the quiz early
/*function jump() {
    console.log("jump");
    var pages = document.querySelectorAll(".page");
    document.getElementsByClassName("current-page")[0].classList.remove("current-page");
    pages[pages.length - 1].classList.add("current-page");
}*/

//Persona Factory
function Persona (title, id, score, img) {
    this.title = title;
    this.id = id;
    this.score = score;
    this.img = img
}
var personas = [];
var p1 = new Persona("Modern Flipster",1,0,"flipster");
personas.push(p1);
var p2 = new Persona('"Phone on Zen Mode"',2,0,"zen-mode");
personas.push(p2);
var p3 = new Persona("Brand Loyalist",3,0,"brand-loyalist");
personas.push(p3);
var p4 = new Persona("Bonafide Tech Addict",4,0,"tech-junky");
personas.push(p4);
var p5 = new Persona('"Man Shall Live on Phone Alone"',5,0,"man");
personas.push(p5);

function calculate() {
    var inputs = document.querySelectorAll("label.active input");
    var r = []; //Results
    var qTip = ["Waking Up:","Space:","YouTube:","restless:","4 Hours:","K-Cups:","Dinner Plate:"]
    for (var i = 0; i < inputs.length; i++) {
        //r.push(qTip[i]); //question tip info
        r.push(inputs[i].value); //push each y & n value to results variable
    }
    console.log(r); //debugging code
    //Quiz Logic
    //Waking Up
    if (r[0] == "y") {
        //p1 no change //Flipster
        personas[1].score--;  //Zen
        personas[2].score++;  //Loyal
        personas[3].score++;  //Tech Addict
        personas[4].score++;  //Man
    } else {
        personas[0].score--;  //Flipster
        personas[1].score++;  //Zen
        //p3 no change
        personas[3].score--;  //Tech
        personas[4].score--;  //Man
    }
    //Laws of Space and Time
    if (r[1] == "y") {
        personas[0].score--;  //Flipster
        personas[1].score++;  //Zen
        //p3 no changepersonas[0].score
        personas[3].score++;  //Tech
        personas[4].score--;  //Man - doesn't even recognize it
    } else {
        personas[0].score++;  //Flipster
        //p2 no change
        //p3 no change
        personas[3].score--;  //Tech
        personas[4].score++;  //Man
    }
    //Youtube
    if (r[2] == "y") {
        personas[0].score--;  //Flipster
        personas[1].score--;  //Zen
        personas[2].score++;  //Loyal
        personas[3].score++;  //Tech
        personas[4].score++;  //Man
    } else {
        personas[0].score++;  //Flipster
        personas[1].score++;  //Zen
        //p3 no change
        personas[3].score--;  //Tech
        personas[4].score--;  //Man  
    }
    //Restlessness
    if (r[3] == "y") {
        personas[0].score--;  //Flipster
        personas[1].score++;  //Zen
        //p3 no change
        personas[3].score++;  //Tech
        personas[4].score++;  //Man
    } else {
        personas[0].score++;  //Flipster
        personas[1].score--;  //Zen
        personas[2].score3--;  //Loyal
        personas[3].score--;  //Tech
        personas[4].score--;  //Man
    }
    //4 Hours a Day
    if (r[4] == "y") {
        personas[0].score--;  //Flipster
        personas[1].score--;  //Zen
        //p3 no change
        personas[3].score++;  //Tech
        personas[4].score++;  //Man
    } else {
        //p1 no change Flipster
        personas[1].score++;  //Zen
        //p3 no change
        //p4 no change Tech
        personas[4].score--;  //Man
    }
    //K-Cup Phone Addiction
    if (r[5] == "y") {
        personas[0].score--;  //Flipster
        personas[1].score++;  //Zen
        personas[2].score++;  //Loyal
        personas[2].score++;  //Loyal
        //p4 no change Tech
        personas[4].score++;  //Man
    } else {
        personas[0].score++;  //Flipster
        //p2 no change Zen
        personas[2].score--;  //Loyal
        personas[3].score--;  //Tech
        personas[4].score--;  //Man
    }
    //Dinner Table
    if (r[6] == "y") {
        personas[0].score--;  //Flipster
        personas[1].score--;  //Zen
        personas[2].score++;  //Loyal
        personas[3].score++;  //Tech
        personas[4].score++;  //Man
    } else {
        personas[0].score++;  //Flipster
        personas[1].score++;  //Zen
        //p3 no change
        personas[3].score--;  //Tech
        personas[4].score--;  //Man
    }
    for (var j = 0; j < personas.length; j++) {
        console.log(personas[j].title + " : " + personas[j].score);
    } //debugging code
    var scores = [personas[0].score,personas[1].score,personas[2].score,personas[3].score,personas[4].score]
    var winningScore = Math.max(...scores);
    console.log(winningScore); //debugging code
    for (var k = 0; k < personas.length; k++) {
        if (personas[k].score === winningScore) {
            var personaResult = personas[k].title;
            var personaImage = personas[k].img;
        }
    }
    console.log(personaResult); //debugging code
    document.querySelector("#results-page h1").innerHTML = "You are a " + personaResult + "!";
    document.querySelector("#mc_persona").value = personaResult;
    document.querySelector(".persona-img").classList.add(personaImage);
}

function quizValidate() {
    var errorField = document.querySelector("#mce-error-response");
    var successField = document.querySelector("#mce-success-response");
    if (successField.innerHTML == "Thank you for subscribing!" && successField.style.display == "" && errorField.innerHTML == "" && errorField.style.display == "none") {
        next(document.querySelector("#mc-embedded-subscribe"),8);
    }
}

/*
Quiz Calculations
7 Yes and No questions
There are 5 possible results

Titles:
1.    Modern Flipster
2.    "Phone on Zen Mode"
3.    Brand Loyalist
4.    Bonafide Tech Addict
5.    "Man Shall Live on Phone Alone"

Scale:
7 No : 0 Yes   Modern Flipster
6 No : 1 Yes   "Phone on Zen Mode"
5 No : 2 Yes   "Phone on Zen Mode"
4 No : 3 Yes   Brand Loyalist
3 No : 4 Yes   Brand Loyalist
2 No : 5 Yes   Bonafide Tech Addict
1 No : 6 Yes   Bonafide Tech Addict
0 No : 7 Yes   "Man Shall Live on Phone Alone"

Modern Flipster         Zen Mode        Brand Loyalist          Tech Addict         Man Shall Live on Phone Alone

Questions                       Yes Leaning     No Leaning
--------------------------------------------------------------------
Q1 "Waking Up" -                4 & 5           2
Q2 "Laws of Space and time" -   2 & 4           1 & 5
Q3 "Youtube" -                  5               2 & 1
Q4 "restlessness" -             5               1
Q5 "4 hours a day" -            5               1 & 2
Q6 "K-cups" -                   3 heavy         1
Q7 "dinner table" -             4 & 5















*/

//JQuery for Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
