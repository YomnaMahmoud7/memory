var request = new XMLHttpRequest();

request.addEventListener("load" , function(){
	
    if (request.status == 200 && request.readyState == 4){
        jsonImgArray = JSON.parse(request.responseText);
    }
});

request.open('GET' , 'imgs-cartoon.json' , false);
request.send();

var numOfClickedCards = 0;
var firstCard;//one
var secondCard;//two
var win = 0;
var back= document.getElementsByClassName('back');
var timerVariable;
var imgArrayElements=document.getElementsByClassName("imageItself");

var numOfAllowedClicks=40;
//----------------------------------------------------------
function reloadGame(){
document.location.reload();
}

//-----------------------------------------------------
function shuffle(array){
	
	var currentIndex = jsonImgArray.length, temporaryValue, randomIndex;
	
	
	 while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = jsonImgArray[currentIndex];
    jsonImgArray[currentIndex] = jsonImgArray[randomIndex];
    jsonImgArray[randomIndex] = temporaryValue;
  }

  return array;
}

var returnedShuffledArray;

returnedShuffledArray =shuffle(jsonImgArray);

//-------------------------------------------------------------------------
var second = 0, minute = 0; hour = 0;
var timer = document.getElementById("timer");
var interval;

function startCountingTimer(){
    interval = setInterval(function(){
    timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
	
} 

function resetTimer(){
    second = 0;
    minute = 0; 
    hour = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

document.body.onload = startCountingTimer();
//----------------------------------------------------------------------------


function startTimer(){
    timerVariable = setInterval(control,950);
}

function stopTimer(){
    clearInterval(timerVariable);
}

var totalNumOfClicks=0;

function clicks(index)
{
	totalNumOfClicks=parseInt(totalNumOfClicks)+parseInt(1);
	//console.log(totalNumOfClicks);
	document.getElementById("moves").innerHTML=41 -totalNumOfClicks;
	
	if(totalNumOfClicks<=30){
		
        if (numOfClickedCards==0)
        {
        firstCard = index;
        imgArrayElements[index].setAttribute('src', jsonImgArray[index].URL);
        numOfClickedCards=1;
    }
        else if(numOfClickedCards==1) { 
			
            numOfClickedCards=2;
            console.log("second click   "+imgArrayElements[index].src);
            secondCard = index;
		
		    if(imgArrayElements[firstCard].src !==imgArrayElements[secondCard].src){
				
                imgArrayElements[index].setAttribute('src', jsonImgArray[index].URL);
                startTimer();
				numOfClickedCards=0;
			}
			
			else if(numOfClickedCards=2 && imgArrayElements[firstCard].src ==imgArrayElements[secondCard].src){
					
				for(i=0;i<back.length;i++){
				imgArrayElements[secondCard].setAttribute('src', back[i].src);
				}
				
				firstCard = index;
                imgArrayElements[index].setAttribute('src', jsonImgArray[index].URL);
				numOfClickedCards=1; 
				
			}
			
		}	
		
	}
	
	else{
		modalLose();
		resetTimer();
	}
}



function control()
{
    stopTimer();
	
    if (jsonImgArray[firstCard].URL == jsonImgArray[secondCard].URL)
    {
        win++;
	   document.getElementById("right-choices").innerHTML=win;
  
    }
    else if (jsonImgArray[firstCard].URL !== jsonImgArray[secondCard].URL)
    {
       for(i=0;i<back.length;i++){
		   
       imgArrayElements[firstCard].setAttribute('src', back[i].src);
       imgArrayElements[secondCard].setAttribute('src', back[i].src);
	   
    }
    }
	numOfClickedCards=0;
	
	if(win ==jsonImgArray.length/2){
		modalWin();
		resetTimer()
	}

}
//----------------------------------------------------------------------------------------------------------	
	    
function modalWin(){

    var modal = document.getElementById('myModal');

    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
    modal.style.display = "none";}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

}

//----------------------
function modalLose(){

var modal2 = document.getElementById('myModal2');

modal2.style.display = "block";

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal2.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

}

//-------------------------------------------------------------------------------------------------
