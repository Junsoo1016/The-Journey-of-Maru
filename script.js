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
title.style.fontSize = '58px'
title.style.fontFamily = 'Bungee Shade'

const startBtn = document.createElement('button')
startBtn.setAttribute('id', 'start')
startBtn.innerText = 'Start'
board.appendChild(startBtn)
startBtn.style.padding = '30px'
startBtn.style.marginTop = '50px'
startBtn.style.fontSize = '36px'
startBtn.style.backgroundColor = 'red'
startBtn.style.color = 'white'
startBtn.style.borderRadius = '50%'
startBtn.style.boder = '2px'

const canvas = document.createElement('canvas')
canvas.setAttribute('id', canvas)
body.appendChild(canvas)

const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight -100

const Maru = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
Maru.draw()
class Cactus {
    constructor(){
        this.x = 500
        this.y = 200
        this.width = 50
        this.height = 50
    }
    draw() {
        ctx.fillStyle ='green'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }    
}

let timer = 0
let cactusArr = []
let jumpTimer = 0

let jumping = false
document.addEventListener('keydown', function(e){
    if(e.code === 'Space') {
        jumping = true
    }
})


function playFrames() {
    requestAnimationFrame(playFrames)
    timer++
    
    ctx.clearRect(0,0, canvas.width, canvas.height)
    if(timer % 200 === 0){
    const cactus = new Cactus()
    cactusArr.push(cactus)
}
    cactusArr.forEach((cactus, i, o) => {
        if(cactus.x < 0) {
            o.splice(i, 1)
        }
        cactus.x-=3 
        cactus.draw()
    })
    
    if (jumping == true){
        Maru.y-=5
        jumpTimer++
    }
    if (jumping == false){
        if(Maru.y < 200) {
        Maru.y+=5
        }
    }
    if (jumpTimer > 25){
        jumping = false
        jumpTimer = 0
    }

    Maru.draw()
}
playFrames()




const startGame = () => {
    board.style.display = 'none'
}

const manuJump = () => {
    Maru.style.transform = 'translateY(-100px)'
}

startBtn.addEventListener('click', startGame)

