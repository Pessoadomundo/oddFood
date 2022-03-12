const res = require("express/lib/response")

const socket = io('74.207.230.69')

document.getElementById("search").addEventListener("click", ()=>{
    socket.emit("ADMaddMoney", document.getElementById("key"), document.getElementById("valor"))
})

socket.on("ADMresult", resultado=>{
    alert(resultado)
})