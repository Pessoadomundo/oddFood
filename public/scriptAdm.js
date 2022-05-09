const socket = io('http://oddfood.ddns.net/')

let day = -1 
let days = ["Terça", "Quarta", "Quinta", "Sexta"]
let lastActions = []
socket.emit("getDay", true)
socket.emit("getLastActions", true)

document.getElementById("search").addEventListener("click", ()=>{
    socket.emit("ADMaddMoney", document.getElementById("key").value, document.getElementById("valor").value)
    socket.emit("getLastActions", true)
})

document.getElementById("eraseOrders").addEventListener("click", ()=>{
    socket.emit("eraseOrders", true)
    socket.emit("getDay", true)
    socket.emit("getLastActions", true)
})

document.getElementById("addDay").addEventListener("click", ()=>{
    socket.emit("addDay", true)
    socket.emit("getLastActions", true)
})
document.getElementById("changeInfo").addEventListener("click", ()=>{
    socket.emit("changeUserInfo", document.getElementById("changingUserId").value, document.getElementById("changingInfoType").value, document.getElementById("changingInfo").value)
    alert("Acho q mudou")
    socket.emit("getLastActions", true)
})
socket.on("ADMresult", resultado=>{
    alert(resultado)
})

socket.on("day", dia=>{
    day = dia
    document.getElementById("nextDay").innerText = "Próxima entrega: " + days[day]
})
socket.on("lastActions", actions=>{
    lastActions = actions
    lastActions.forEach(action => {
        let actionLi = document.createElement("li")
        actionLi.innerText = action
        document.getElementById("lastActions").appendChild(actionLi)
    })
})

async function a(){
    setInterval(()=>{
        socket.emit("getLastActions", true)
    },10000)
  }
a()