const socket = io('74.207.230.69')

document.getElementById("search").addEventListener("click", ()=>{
    socket.emit("ADMaddMoney", document.getElementById("key").value, document.getElementById("valor").value)
})

socket.on("ADMresult", resultado=>{
    alert(resultado)
})