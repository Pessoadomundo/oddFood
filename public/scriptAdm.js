const socket = io('http://oddfood.ddns.net/')

let day = -1 
let days = ["Terça", "Quarta", "Quinta", "Sexta"]
let lastActions = []
socket.emit("getDay", true)
socket.emit("getLastActions, true")

document.getElementById("search").addEventListener("click", ()=>{
    socket.emit("ADMaddMoney", document.getElementById("key").value, document.getElementById("valor").value)
})

document.getElementById("eraseOrders").addEventListener("click", ()=>{
    socket.emit("eraseOrders", true)
    socket.emit("getDay", true)
})

document.getElementById("addDay").addEventListener("click", ()=>{
    socket.emit("addDay", true)
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