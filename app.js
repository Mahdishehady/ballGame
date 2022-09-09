const left = document.getElementById('left')
const right = document.getElementById('right')
const btn = document.getElementById('btn')

right.addEventListener('click', () => {
   if (currentPosition[0] < 470) {
      currentPosition[0] += 20
      makeuser()

   }

})
left.addEventListener('click', () => {
   if (currentPosition[0] > 0) {
      currentPosition[0] -= 20
      makeuser()

   }
})


const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockwidth = 100
const blockheight = 20
const boardwidth = 572
const boardheight = 302
const ballDiameter = 20
const userStart = [230, 10]
let score = 0
console.log(userStart);
let currentPosition = userStart
ballstart = [270, 30]
let ballcurrentPosition = ballstart
let timerid
let xDirection = 2
let yDirection = 2



//create block
class block {
   constructor(x, y) {
      this.bottomLeft = [x, y]
      this.bottomRight = [x + blockwidth, y]
      this.topLeft = [x, y + blockheight]
      this.topRight = [x + blockwidth, y + blockheight]
   }
}

//array of blocks
const blocks = [
   new block(10, 270),
   new block(120, 270),
   new block(230, 270),
   new block(340, 270),
   new block(450, 270),

   new block(10, 240),
   new block(120, 240),
   new block(230, 240),
   new block(340, 240),
   new block(450, 240),

   new block(10, 210),
   new block(120, 210),
   new block(230, 210),
   new block(340, 210),
   new block(450, 210)

]
//console.log(blocks[0]);
//draw all blocks
function addBlocks() {
   for (let i = 0; i < blocks.length; i++) {


      const block = document.createElement('div')
      block.classList.add('block')
      block.style.left = blocks[i].bottomLeft[0] + 'px'
      block.style.bottom = blocks[i].bottomLeft[1] + 'px'
      grid.appendChild(block)
   }
}

addBlocks()
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
makeuser()


function makeuser() {
   user.style.left = currentPosition[0] + 'px'
   user.style.bottom = currentPosition[1] + 'px'
}

function drawball() {
   ball.style.left = ballcurrentPosition[0] + 'px'
   ball.style.bottom = ballcurrentPosition[1] + 'px'

}
//move the user
function moveuser(e) {
   switch (e.key) {
      case 'ArrowLeft':
         if (currentPosition[0] > 0) {
            currentPosition[0] -= 20
            makeuser()

         }
         break;
      case 'ArrowRight':
         if (currentPosition[0] < 470) {
            currentPosition[0] += 20
            makeuser()

         }
         break;
      /*  case rightkey:
           if (currentPosition[0] < 470) {
              currentPosition[0] += 20
              makeuser()
  
           }
           break;
           case leftkey:
              if (currentPosition[0] > 0) {
                 currentPosition[0] -= 20
                 makeuser()
     
              }
              break;

*/
   }
}
document.addEventListener('keydown', moveuser)
//draw ball
const ball = document.createElement('div')
ball.classList.add('ball')

drawball()
grid.appendChild(ball)
//move the ball
function moveball() {
   ballcurrentPosition[0] += xDirection
   ballcurrentPosition[1] += yDirection
   drawball()
   checkforcollisions()
}
timerid = setInterval(moveball, 20)
//check for collisions
function checkforcollisions() {

   //sheckfor block collision
   for (let i = 0; i < blocks.length; i++) {
      if ((ballcurrentPosition[0] > blocks[i].bottomLeft[0]
         && ballcurrentPosition[0] < blocks[i].bottomRight[0])
         && ((ballcurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
            ballcurrentPosition[1] < blocks[i].topLeft[1])) {

         const allblocks = Array.from(document.querySelectorAll('.block'))
         allblocks[i].classList.remove('block')
         blocks.splice(i, 1)
         changeDirection()
         score++
         scoreDisplay.innerHTML = score
         //check for win 
         if (blocks.length === 0) {
            scoreDisplay.innerHTML = "You Win!!!"
            clearInterval(timerid)
            document.removeEventListener('keydown', moveuser)



         }
      }
   }
   if ((ballcurrentPosition[0] > currentPosition[0] && ballcurrentPosition[0] < currentPosition[0] + blockwidth) &&
      (ballcurrentPosition[1] > currentPosition[1] && ballcurrentPosition[1] < currentPosition[1] + blockheight))
      changeDirection()

   if (ballcurrentPosition[0] >= (boardwidth - ballDiameter) ||
      ballcurrentPosition[1] >= (boardheight - ballDiameter) || ballcurrentPosition[0] <= 0)
      changeDirection()
   //check for game over
   if (ballcurrentPosition[1] <= 0) {
      clearInterval(timerid)
      scoreDisplay.innerHTML = 'You Lose'
      document.removeEventListener('keydown', moveuser)


   }
}
function changeDirection() {
   if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
   }
   if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
   }
   if (xDirection === -2 && yDirection === -2) {
      yDirection = 2

      return
   }
   if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
   }
}
btn.addEventListener('click', () => {
   currentPosition = [230, 10]
   scoreDisplay.innerHTML = '0'
   ballcurrentPosition = [270, 30]
   xDirection = 2
   yDirection = 2


})

