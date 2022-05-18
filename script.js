const body = document.querySelector('body')
body.style.background = 'white'
body.style.margin = 0

const container = document.createElement('div')
document.body.appendChild(container)
container.setAttribute('id', 'container')

const board = document.createElement('div')
board.setAttribute('id', 'board')
body.appendChild(board)
board.style.display = 'flex'
board.style.flexDirection = 'column'
board.style.alignItems = 'center'

const maruImg = document.createElement('img')
maruImg.src = 'https://gcdnb.pbrd.co/images/CSE9TUuhTBWr.jpg?o=1'
maruImg.setAttribute('id','maru_image')
board.appendChild(maruImg)

const title = document.createElement('a')
title.setAttribute('id', 'title')
title.innerText = 'The Journey of Maru'
board.appendChild(title)
title.style.fontSize = '46px'
title.style.fontFamily = 'Bungee Shade'

const startBtn = document.createElement('button')
startBtn.setAttribute('id', 'start')
startBtn.innerText = 'START'
board.appendChild(startBtn)

const restartBtn = document.createElement('a')
restartBtn.setAttribute('id', 'restart')
body.appendChild(restartBtn)
const restartIcon = document.createElement('i')
restartIcon.setAttribute('class', 'fa-solid fa-rotate-right')
restartBtn.appendChild(restartIcon)
const restartBtn2 = document.querySelector('#restart')
console.log(restartBtn2);

function makeImageBoxes(num) {
    for(i = 0 ; i < num ; i++) {
        let cell = document.createElement('img')
        container.appendChild(cell)
        cell.setAttribute('class', 'imageBox')
        cell.setAttribute('id', `img${i}`)
        cell.src = 'https://i.ibb.co/Qnbb5Yg/dog-sit.png'
    }
}
makeImageBoxes(10)

// start canvas
const canvas = document.createElement('canvas')
canvas.setAttribute('id', canvas)
body.appendChild(canvas)



function drawBubble(ctx, x, y, w, h, radius)
{
  var r = x + w;
  var b = y + h;
  ctx.beginPath();
  ctx.strokeStyle="grey";
  ctx.lineWidth="1";
  ctx.moveTo(x+radius, y);
//   ctx.lineTo(x+radius/2, y-10);
//   ctx.lineTo(x+radius * 2, y);
  ctx.lineTo(r-radius, y);
  ctx.quadraticCurveTo(r, y, r, y+radius);
  ctx.lineTo(r, y+h-radius);
  ctx.quadraticCurveTo(r, b, r-radius, b);
  ctx.lineTo(x+radius, b);
  ctx.lineTo(x+radius/2, b+8);
  ctx.lineTo(x+radius * 2, b);
  ctx.quadraticCurveTo(x, b, x, b-radius);
  ctx.lineTo(x, y+radius);
  ctx.quadraticCurveTo(x, y, x+radius, y);
  ctx.stroke();
}
function dispQuote() 
{
  drawBubble(ctx, 70,140,220, 90, 20);
}

let ctx = canvas.getContext('2d')
function makeGround(){
ctx.beginPath()
ctx.moveTo(0, 290)
ctx.lineTo(1000, 290)
ctx.stroke()
ctx.lineWidth = 0.5
}

function quote(){
    ctx.font = "14px roboto"
    ctx.fillText("Press space bar to jump,", 105, 170)
    ctx.fillText("and avoid touching lions!", 105, 190)
    ctx.fillText("You get points for bones.", 105, 210)
}

canvas.width = window.innerWidth - 500
canvas.height = window.innerHeight -300

const img1 = new Image()
img1.src = 'https://www.linkpicture.com/q/dog.png'
const img2 = new Image()
img2.src = 'https://i.ibb.co/CBcLGZn/dog-motion-2.png'
img2.setAttribute('class', 'img')
const img3 = new Image()
img3.src = 'https://i.ibb.co/Qnbb5Yg/dog-sit.png'
img3.setAttribute('id', 'img3')
const boneImage = new Image()
boneImage.src = 'https://i.ibb.co/TkpqhJs/bone.png'
const lion = new Image()
lion.src = 'https://i.ibb.co/FhnHnsm/lionface.png'
const imageFrameCount = 2
const frameTime = 100
const currentFrameTime = 0

const cloud = new Image()
cloud.src = 'https://i.ibb.co/Bw3gt6c/cloud.png'

const MaruSit = {
    x : 10,
    y : 250,
    width : 60,
    height : 50,
    running: true,
    draw() {
        if (this.running === true){
        ctx.drawImage(img3, this.x, this.y)
        dispQuote()
        quote()
        setTimeout(() => {
            this.running = false     
        }, 4000)
        } else {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
        playFrames()
    }}
}

const Maru = {
    x : 10,
    y : 250,
    width : 60,
    height : 50,
    running: true,
    draw() {
        if (this.running === true){
        // ctx.fillStyle = 'yellow'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(img1, this.x, this.y)
        setTimeout(() => {
            this.running = false     
        }, 200)
        } else {
        // ctx.fillStyle = 'orange'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(img2, this.x, this.y)
        setTimeout(() => {
            this.running = true
        }, 200)
    }}
}

class Bone {
    constructor(){
        this.x = 1000
        this.y = 250
        this.width = 50
        this.height = 50
    }
    draw() {
        // ctx.fillStyle = 'green'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(boneImage, this.x, this.y)
    }
}

class Cloud {
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw() {
        ctx.fillStyle ='white'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(cloud, this.x, this.y)
    }    
}
class Obstacle {
    constructor(x, y, width, height){
        this.x = 1000
        this.y = 250
        this.width = 50
        this.height = 50
    }
    draw() {
        // ctx.fillStyle ='green'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(lion, this.x, this.y)
    }    
}

let timer = 0
let jumpTimer = 0
let obstacleArr = []
let boneArr = []
let cloudArr = []
let cloud2Arr = []
let animation
let jumping = false

document.addEventListener('keydown', startJump)

function startJump(e) {
    if(e.code === 'Space') {
        jumping = true
    }
}

function playInit() {
    animation = requestAnimationFrame(playInit)
    
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    makeGround()
    canvas.style.display = 'block'
    MaruSit.draw()
}

function playFrames() {

   animation = requestAnimationFrame(playFrames)
    timer++
    
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    makeGround()

    if(timer % 70 === 0){
    const obstacle = new Obstacle()
    obstacleArr.push(obstacle)
    }

    obstacleArr.forEach((obstacle, i, o) => {
        if(obstacle.x < 0) {
            o.splice(i, 1)
        }
        obstacle.x -= 5 

        collisionCheck(Maru, obstacle)

        obstacle.draw()
    })
    if(timer % 180 === 0){
        const cloud = new Cloud(900, 90, 50, 50)
        cloudArr.push(cloud)
    }

    cloudArr.forEach((cloud, i, o) => {
        if(cloud.x<0) {
            o.splice(i, 1)
        }
        cloud.x -= 3
        cloud.draw()
    })
    if(timer % 120 === 0){
        const cloud2 = new Cloud(900, 160, 50, 50)
        cloud2Arr.push(cloud2)
    }

    cloud2Arr.forEach((cloud2, i, o) => {
        if(cloud2.x<0) {
            o.splice(i, 1)
        }
        cloud2.x -= 4
        cloud2.draw()
    })

    if(timer % 200 === 0){
        const bone = new Bone()
        boneArr.push(bone)
    }
    boneArr.forEach((bone, i ,o) => {
        if(bone.x < 0){
            o.splice(i, 1)
        }
        bone.x -= 6

        getBone(Maru, bone)

        bone.draw()
    })
   
    if (jumping == true){
        document.removeEventListener('keydown', startJump)
        // console.log("Jumping is true")
        Maru.y-= 6
        jumpTimer++
    }
    if (jumpTimer > 25){
        // console.log("Jumping is greater than 25")
        jumping = false 
        jumpTimer = 0
    }
    if (jumping == false){
        // console.log("Jumping is false")
        if(Maru.y < 250) {
        Maru.y+=5
        } else {
            document.addEventListener('keydown', startJump)
        }
    } 
    // while (landingTimer < 25){
    //     jumping = false;
    //     landingTimer = 0;
    // }
    canvas.style.display = 'block'
    Maru.draw()
}


//colision detection
const collisionCheck = (Maru, obstacle) => {
    xGap = obstacle.x - (Maru.x + Maru.width)
    yGap = obstacle.y - (Maru.y + Maru.height)
    if (xGap < 0 && yGap < 0) {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
        restartBtn.style.display = 'block'
        makeGround()
    }
}



let points = 0

const pointBox = document.createElement('h1')
pointBox.setAttribute('id', 'pointbox')
document.body.appendChild(pointBox)
pointBox.innerText = `Total Points: ${points}`

function pointsAlert() {
    ctx.fillText("+100", 50, 230)
}

const getBone = (Maru, bone) => {
    xGap = bone.x - (Maru.x + Maru.width)
    yGap = bone.y - (Maru.y + Maru.height)
    // console.log("xGap: ", xGap);
    // console.log("yGap: ", yGap);
    // if((xGap < 0 && xGap > -20) && yGap === 0) {
    if (xGap < 0 && yGap < 0) {
        // console.log('getting bone');
        points += 10
        pointBox.innerText = `Total Points: ${points}`
        boneArr.splice(i, 1)
        pointsAlert()
    }
}

startBtn.addEventListener('click', () => {
    board.style.display = 'none'
    container.style.display = 'none'
    pointBox.style.display = 'block'
    playInit()
})

restartBtn2.addEventListener('click', () => {
    restartBtn2.style.display = 'none'
    timer = 0
    jumpTimer = 0
    points = 0
    pointBox.innerText = `Total Points: ${points}`
    obstacleArr = []
    boneArr = []
    cloudArr = []
    cloud2Arr = []
    playFrames()
})