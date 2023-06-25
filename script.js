//Create an object for the Player Ship

  //Have Default Property Values for the Player Ship

  //Create a method to allow the Player Ship to attack 

//Create a class for the Alien Ships

  //Have the alien ship properties generate randomly     between a range 

  //Create a method to allow the Alien Ships to attack

//Instantiate the 6 Alien Ships with a for loop

  //Push all alien ships into an array

//c user to start the game

  //Accept their input to begin the game

//Start Round 1 with a while loop (check if the alien array is empty)
  //check inside the while loop for player hull > 0

  //Begin the battle, use a while loop to check if the   health of the enemy is > 0, also check for the player

    //if (Math.random() < player.accuracy) {
    //console.log('call attack method on alien');
    //} else
    // console.log('call attack method on player')
      //check if the hull for the player OR the enemy               <= 0  
      //If true, break the loop

    //if (Math.random() < alien[0].accuracy) {
    //console.log('call attack method on player');
    //} else
    // console.log('call attack method on alien')

  //Check if alien array is empty or not, if true then      player wins
  //Check if player won or not, if they did ask player if   they want to continue or retreat
    //If retreat, game over
    //If player won, continue
    //If player lost, game over

//-----------------------------------------------------------

class Alien {
    constructor(hull, firepower, accuracy) {
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    }
    attack(firepower){
      this.hull -= firepower
    }
  }
  
  const playerShip = {
    hull: 20,
    firepower: 5,
    accuracy: 0.7,
    attackPlayer(firepower){
      this.hull -= firepower
    }
  }
  const alienArray = []
  for (let i = 1; i <= Math.floor(Math.random()*3)+5; i++) {
    const alienShip = new Alien(Math.floor((Math.random()*4) + 3), 
                                Math.floor((Math.random()*3) + 2),
                                ((Math.random()*0.2) + 0.6)
                               )
    alienArray.push(alienShip)
  }
let aliens=document.getElementById("aliens")
for (let index = 1; index <= alienArray.length; index++) {
    let alien=document.createElement("div")
    alien.setAttribute("class","alien")
    // alien.classList.add("able")
    alien.setAttribute("id","alien"+index)
    alien.innerHTML=`<img src="alien-ship.png" alt="" width="70px" id="${index}" class="able imgAlien">
    <div class="progress-bar">
      <div class="progress" id="myProgress${index}"></div>
    </div>`
    aliens.appendChild(alien)
    
}

const textContainer = document.getElementById('guide');
const text = `Welcome to the game! Here are the rules and instructions:
1. Once you proceed past these instructions, the game will begin.\n
2. The enemy will send an unspecified random number of enemies for you to defeat.\n
3. You will be able to see the remaining strength of each enemy.\n
4. To attack an enemy, simply click on the enemy you wish to attack.\n
5. Once you defeat an enemy, you will be presented with two options. Choose carefully.\n
6. Your goal is to defeat all the enemies and emerge victorious.\n
7. Good luck on your mission!`; // The text you want to display
const delay = 30; // The delay between each character (in milliseconds)

let index = 0;

function typeText() {
  if (index < text.length) {
    textContainer.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, delay);
  }
}

typeText();
let skip=document.getElementById("skip")
skip.addEventListener("click",e=>{
    setTimeout(function() {
        document.getElementById("light").classList.add("hidden")
      }, 2000);
    document.getElementById("centerTheContainer").classList.remove("hidden")
    document.getElementById("conStart").classList.add("hidden")
})
  
const explosionSound = document.getElementById('explosionSound')  
    
 aliens.addEventListener("click",e=>{
    // console.dir(e.target)
        if(e.target.nodeName=="IMG"  && e.target.classList.contains("able")){
            explosionSound.play();
         let index=parseInt(e.target.id)
    while (playerShip.hull > 0 && alienArray[index-1].hull > 0) {
      if (Math.random() < playerShip.accuracy) {
        const enemyHull=alienArray[index-1].hull
      alienArray[index-1].attack(playerShip.firepower)
      updateProgress((alienArray[index-1].hull/enemyHull)*100,index)
      console.log('Good shot!')
      console.log(`The Hull of the Alien Ship is ${alienArray[index-1].hull}`)
      } 
    //   else {
    //     console.log('You Missed!')
    //   }
      if (alienArray[index-1].hull > 0) {
      if (Math.random() < alienArray[index-1].accuracy) {
        
        let alienNow=document.getElementById("alien"+index)
        alienNow.innerHTML+='<img src="firee.gif" alt="" width="50px" id="Upp">'
        setTimeout(function() {
            document.getElementById('Upp').classList.add("hidden")
          }, 3000);
        playerShip.attackPlayer(alienArray[index-1].firepower)
        updateProgress((playerShip.hull/20)*100,0)

        console.log('You have been hit!')
        console.log(`The Hull of the Player Ship is ${playerShip.hull}`)
      } 
      else {
        console.log('You are lucky they missed!')
      }
      }
        
      else  {
        break;
      }
    }
    
    if (alienArray[index-1].hull <= 0) {
        let alienNow=document.getElementById("alien"+index)
        alienNow.innerHTML+='<img src="2a9n.gif" alt="" width="50px" class="Up">'
        alienNow.innerHTML+='<img src="firee.gif" alt="" width="50px" class="Upp">'
        setTimeout(function() {
            alienNow.classList.add("hidden")
          }, 3000);
        
        alienArray[index-1]=0
        let emptyy=true
        for(let i of alienArray){
                if (i!=0){
                    emptyy=false
                }
        }
      if (!emptyy){
       let Contu= document.getElementById("Contu")
       setTimeout(function() {
        Contu.classList.remove("hidden")
      }, 4000);
       
       for (let j of document.getElementsByClassName("imgAlien")){
        j.style.cursor="not-allowed"
        j.classList.remove("able")
    }
        Contu.addEventListener("click",e=>{
            if (e.target.textContent=="retreat"){
                document.getElementById("result").classList.remove("hidden")
                Contu.classList.add("hidden")
            }else{
                for (let j of document.getElementsByClassName("imgAlien")){
                    j.classList.add("able")
                    j.style.cursor="pointer"
                }

                Contu.classList.add("hidden")
            }
        })
        }
    }

    
    
    if (playerShip.hull <= 0) {
        document.getElementById("player").innerHTML+='<img src="2a9n.gif" alt="" width="50px" class="Up">'
        document.getElementById("player").innerHTML='<img src="fire.gif" alt="" width="50px" class="Up">'+document.getElementById("player").innerHTML
        setTimeout(function() {
            document.getElementById("player").classList.add("hidden")
        document.getElementById("result").classList.remove("hidden")
        document.getElementById("result").textContent="YOU LOSE"
          }, 3000);
        
      
    }
    }
    let empty=true
        for(let i of alienArray){
                if (i!=0){
                    empty=false
                }}
    if (empty) {
        document.getElementById("result").classList.remove("hidden")
        document.getElementById("result").textContent="YOU WIN"
    }
   })
   
    
    
  


// Update the progress visually
function updateProgress(progressValue,num) {
  const progressBar = document.getElementById('myProgress'+num);
  progressBar.style.width = progressValue + '%';

  // Change the color to red when it reaches a certain threshold (e.g., 30%)
  if (progressValue <= 30) {
    progressBar.classList.add('red');
  } else {
    progressBar.classList.remove('red');
  }
}


const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.play();

const muteButton = document.getElementById('muteButton');
let isMuted = false;
muteButton.addEventListener('click', toggleMute);

function toggleMute() {
  if (isMuted) {
    backgroundMusic.play();
    isMuted = false;
    muteButton.innerHTML = '<img src="unmute.png" alt="" width="50px">';
  } else {
    backgroundMusic.pause();
    isMuted = true;
    muteButton.innerHTML = '<img src="mute.png" alt="" width="50px">';
  }
}

