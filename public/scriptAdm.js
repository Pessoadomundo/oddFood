const socket = io('http://oddfood.ddns.net/')

let day = -1 
let days = ["Terça", "Quarta", "Quinta", "Sexta"]

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