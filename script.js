const body = document.querySelector('body')
body.style.background = 'white'
body.style.margin = 0

const board = document.createElement('div')
board.setAttribute('id', 'board')
body.appendChild(board)
board.style.display = 'flex'
board.style.flexDirection = 'column'
board.style.alignItems = 'center'




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
startBtn.style.padding = '48px'
startBtn.style.marginTop = '50px'
startBtn.style.fontSize = '36px'
startBtn.style.backgroundColor = 'red'
startBtn.style.color = 'white'
startBtn.style.borderRadius = '50%'
startBtn.style.boder = '2px'

startG