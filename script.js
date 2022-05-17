const body = document.querySelector('body')
body.style.background = 'white'
body.style.margin = 0

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

// start canvas
const canvas = document.createElement('canvas')
canvas.setAttribute('id', canvas)
body.appendChild(canvas)

let ctx = canvas.getContext('2d')
function makeGround(){
ctx.beginPath();
ctx.moveTo(0, 290);
ctx.lineTo(1000, 290);
ctx.stroke();
ctx.lineWidth = 0.5;
}

canvas.width = window.innerWidth - 500
canvas.height = window.innerHeight -300

const img1 = new Image()
img1.src = 'https://www.linkpicture.com/q/dog.png'
const img2 = new Image()
img2.src = 'https://i.ibb.co/CBcLGZn/dog-motion-2.png'
img2.setAttribute('class', 'img')
const boneImage = new Image()
boneImage.src = 'https://i.ibb.co/TkpqhJs/bone.png'
const lion = new Image()
lion.src = 'https://i.ibb.co/FhnHnsm/lionface.png'
const imageFrameCount = 2
const frameTime = 100
const currentFrameTime = 0

const cloud = new Image()
cloud.src = 'https://i.ibb.co/Bw3gt6c/cloud.png'

const Maru = {
    x : 10,
    y : 250,
    width : 60,
    height : 50,
    running: true,
    runningTime: 0,
    draw() {
        if (this.running === true){
        // ctx.fillStyle = 'white'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(img1, this.x, this.y)
        this.running = false     
        } else {
        // ctx.fillStyle = 'white'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(img2, this.x, this.y)
        this.running = true
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

document.addEventListener('keydown', function(e){
    if(e.code === 'Space') {
        jumping = true
    }
})


function playFrames() {

   animation = requestAnimationFrame(playFrames)
    timer++
    
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    makeGround()

    if(timer % 60 === 0){
    const obstacle = new Obstacle()
    obstacleArr.push(obstacle)
    }

    obstacleArr.forEach((obstacle, i, o) => {
        if(obstacle.x < 0) {
            o.splice(i, 1)
        }
        obstacle.x -= 8 

        collisionCheck(Maru, obstacle)

        obstacle.draw()
    })
    if(timer % 200 === 0){
        const cloud = new Cloud(800, 80, 50, 50)
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
        const cloud2 = new Cloud(800, 150, 50, 50)
        cloud2Arr.push(cloud2)
    }

    cloud2Arr.forEach((cloud2, i, o) => {
        if(cloud2.x<0) {
            o.splice(i, 1)
        }
        cloud2.x -= 2
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
        bone.x -= 4

        getBone(Maru, bone)

        bone.draw()
    })

    if (jumping == true){
        Maru.y-=5
        jumpTimer++
    }
    if (jumping == false){
        if(Maru.y < 250) {
        Maru.y+=5
        }
    }
    if (jumpTimer > 25){
        jumping = false
        jumpTimer = 0
    }
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
    ctx.fillText("+100", -60, 230)
}

const getBone = (Maru, bone) => {
    xGap = bone.x - (Maru.x + Maru.width)
    yGap = bone.x = (Maru.x + Maru.width)
    if(xGap < 0 && yGap < 0) {
        points += 100
        boneArr.splice(i, 1)
        pointsAlert()
    }
}

console.log(points)

startBtn.addEventListener('click', () => {
    board.style.display = 'none'
    pointBox.style.display = 'block'
    playFrames()
})

restartBtn2.addEventListener('click', () => {
    console.log('clicked');
    restartBtn2.style.display = 'none'
    timer = 0
    jumpTimer = 0
    points = 0
    obstacleArr = []
    boneArr = []
    cloudArr = []
    cloud2Arr = []
    playFrames()
})