///////////////////////////////////////////////////////////////
const socket = io('74.207.230.69')
var user 

const foods = [{"name": "Filé Mignon", "preco":25, "id":0, "img": "comida.jpg"}, {"name": "Picanha", "preco":30, "id":1, "img": "comida2.png"}]

let trans = document.getElementById("trans")
let tela1 = document.getElementById("tela1")
let tela2 = document.getElementById("tela2")
let tela3 = document.getElementById("tela3")


let loginTitle = document.getElementById("loginTitle")
let email = document.getElementById("email")
let senha = document.getElementById("senha")
let login = document.getElementById("enviar")
let registrar = document.getElementById("registrar")
let result = document.getElementById("result")
let tutorial = document.getElementById("tutorial")

let container1 = document.getElementById("container")
let container2 = document.getElementById("container2")
let container3 = document.getElementById("container3")

let plus = document.getElementById("plus")
let backFromAdd = document.getElementById("backFromAdd")

let bag = document.getElementById("bag")
let carrinho = document.getElementById("carrinho")
let perfil = document.getElementById("perfil")

let addMoney = document.getElementById("addMoney")
let pagamentoDiv = document.getElementById("pagamentoDiv")

let divComidas = document.getElementById("comidas")

let payNow = document.getElementById("payNow")
let useBalance = document.getElementById("useBalance")

let itensCarrinho = document.getElementById("itensCarrinho")
let pendingItems = document.getElementById("pendingItems")

let saldo = document.getElementById("saldo")

let plusSign = document.getElementsByClassName("plusSign")
let minusSign = document.getElementsByClassName("minusSign")

let totalValue = document.getElementById("totalValue")

let notificationDiv = document.getElementById("notificationDiv")

let currentMoney = document.getElementById("currentMoney")
let copySymbol = document.getElementById("copySymbol")

let mode = 1

function changePage(page){
    if(page==2){
        tela1.style.display = "none"
        tela2.style.display = "block"
        tela3.style.display = "none"
        
    }
    if(page==3){
        tela1.style.display = "none"
        tela2.style.display = "none"
        tela3.style.display = "block"
    }
}

function changeMenu(menu){
    if(menu==1){
        container1.style.display = "block"
        container2.style.display = "none"
        container3.style.display = "none"
    }else if(menu==2){
        container1.style.display = "none"
        container2.style.display = "block"
        container3.style.display = "none"
    }else if(menu==3){
        container1.style.display = "none"
        container2.style.display = "none"
        container3.style.display = "block"
    }
}

function putFoods(){
    divComidas.innerHTML = ""

    foods.forEach(item => {
        displayFood(item.id, 1, divComidas)
    })
}

function updateCart(){
    itensCarrinho.innerHTML = ""

    let total = 0
    for (let i = 0; i < user.cart.length; i++){
        displayFood(user.cart[i].id, 2, itensCarrinho, user.cart[i].qtd)
        total+=user.cart[i].qtd*foods[user.cart[i].id].preco
    }

    if(Number.isInteger(total)){
        totalValue.innerHTML = "Total: R$"+total+",00"
    }else{
        totalValue.innerHTML = "Total: R$"+total
    }
}

function updatePending(){
    pendingItems.innerHTML = ""

    for (let i = 0; i < user.pending.length; i++){
        displayFood(user.pending[i].id, 3, pendingItems, user.pending[i].qtd)
    }
}

function addToCart(id, amount){
    socket.emit("addToCart", id, amount, user.id)
    socket.emit("askUser", user.id)

    if(amount>0){
        displayAlert("Item adicionado ao carrinho com sucesso", true)
    }
    setTimeout(()=>{
        updateCart()
    },500)
}

function displayFood(id, type, elt, qtd=0){
    let food = foods[id]


    let eltComida = document.createElement("div")
    eltComida.classList.add("comida")

    let eltDivImgComida = document.createElement("div")
    eltDivImgComida.classList.add("divImgComida")
    
    let eltImgComida = document.createElement("img")
    eltImgComida.classList.add("imgComida")
    eltImgComida.src = food.img
    eltDivImgComida.appendChild(eltImgComida)
    eltComida.appendChild(eltDivImgComida)

    let eltDivInfoComida = document.createElement("div")
    eltDivInfoComida.classList.add("divInfoComida")

    let eltNomeComida = document.createElement("span")
    eltNomeComida.classList.add("nomeComida")
    eltNomeComida.innerHTML = food.name
    eltDivInfoComida.appendChild(eltNomeComida)

    if(type==1){
        eltDivInfoComida.appendChild(document.createElement("br"))
        let eltPreco = document.createElement("span")
        eltPreco.classList.add("preco")
        if(Number.isInteger(food.preco)){
            eltPreco.innerHTML = "R$"+food.preco+",00"
        }else{
            eltPreco.innerHTML = "R$"+food.preco
        }
        eltDivInfoComida.appendChild(eltPreco)
        eltDivInfoComida.appendChild(document.createElement("br"))
        eltDivInfoComida.appendChild(document.createElement("br"))
        let eltAddToCart = document.createElement("img")
        eltAddToCart.src = "plusBlack.png"
        eltAddToCart.classList.add("addToCart")
        eltAddToCart.addEventListener("click", ()=>{addToCart(id, 1)})
        eltDivInfoComida.appendChild(eltAddToCart)
    }else if(type==2){
        eltDivInfoComida.appendChild(document.createElement("br"))
        let eltPreco = document.createElement("span")
        eltPreco.classList.add("preco")
        if(Number.isInteger(food.preco)){
            eltPreco.innerHTML = "R$"+food.preco+",00"
        }else{
            eltPreco.innerHTML = "R$"+food.preco
        }
        eltDivInfoComida.appendChild(eltPreco)
        eltDivInfoComida.appendChild(document.createElement("br"))

        let amount = document.createElement("p")
        amount.classList.add("amount")
        amount.innerHTML = "Qtd: "+ qtd
        eltDivInfoComida.appendChild(amount)
        
        let eltMinusSign = document.createElement("img")
        eltMinusSign.src = "minusBlack.png"
        eltMinusSign.classList.add("minusSign")
        eltMinusSign.addEventListener("click", ()=>{addToCart(id, -1)})
        eltDivInfoComida.appendChild(eltMinusSign)

        let eltPlusSign = document.createElement("img")
        eltPlusSign.src = "plusBlack.png"
        eltPlusSign.classList.add("plusSign")
        eltPlusSign.addEventListener("click", ()=>{addToCart(id, 1)})
        eltDivInfoComida.appendChild(eltPlusSign)
    }else if(type==3){
        eltDivInfoComida.appendChild(document.createElement("br"))
        let amount = document.createElement("p")
        amount.classList.add("amount")
        amount.innerHTML = "Qtd: "+ qtd
        eltDivInfoComida.appendChild(amount)
    }

    eltComida.appendChild(eltDivInfoComida)

    elt.appendChild(eltComida)
}

function displayBalance(){
    if(Number.isInteger(user.saldo)){
        saldo.innerHTML = "Saldo: R$"+user.saldo+",00"
        currentMoney.innerHTML = "Saldo atual: R$"+user.saldo+",00"
    }else{
        saldo.innerHTML = "Saldo: R$"+user.saldo
        currentMoney.innerHTML = "Saldo atual: R$"+user.saldo
    }
}

function displayAlert(message, good){
    notificationDiv.children[0].innerHTML = message
    notificationDiv.style.display = "block"
    if(good){
        notificationDiv.style.backgroundColor = "lightgreen"
        notificationDiv.style.borderColor = "lightgreen"
    }else{
        notificationDiv.style.backgroundColor = "#d66f6f"
        notificationDiv.style.borderColor = "#d66f6f"
    }
    notificationDiv.style.animation = "notification 5s"
    setTimeout(()=>{
        notificationDiv.style.display = "none"
    }, 5000)

}

login.addEventListener("click", ()=>{
    if(mode==1){
        socket.emit("login", email.value, senha.value)
    }else if(mode==2){
        socket.emit("registrar", email.value, senha.value)
    }
})

registrar.addEventListener("click", ()=>{
    if(mode==1){
        mode=2
        registrar.innerText = "Login"
        login.innerText = "Registrar"
        loginTitle.innerText = "Registrar"
    }else if(mode==2){
        mode=1
        registrar.innerText = "Registrar"
        login.innerText = "Login"
        loginTitle.innerText = "Login"

    }
})

plus.addEventListener("click", ()=>{
    changePage(3)
})
backFromAdd.addEventListener("click", ()=>{
    changePage(2)
})

bag.addEventListener("click", ()=>{
    changeMenu(1)
    bag.style.borderTop = "white 5px solid"
    carrinho.style.borderTop = "black 0px solid"
    perfil.style.borderTop = "black 0px solid"
})

carrinho.addEventListener("click", ()=>{
    changeMenu(2)
    bag.style.borderTop = "black 0px solid"
    carrinho.style.borderTop = "white 5px solid"
    perfil.style.borderTop = "black 5px solid"
})

perfil.addEventListener("click", ()=>{
    changeMenu(3)
    bag.style.borderTop = "black 5px solid"
    carrinho.style.borderTop = "black 5px solid"
    perfil.style.borderTop = "white 5px solid"
})

addMoney.addEventListener("click", ()=>{
    pagamentoDiv.style.display = "block"
})

pagamentoDiv.addEventListener("click", ()=>{
    pagamentoDiv.style.display = "none"
})

payNow.addEventListener("click", ()=>{
    pagamentoDiv.style.display = "block"
})

useBalance.addEventListener("click", ()=>{
    if(user.cart.length>0){
        socket.emit("balancePayAsk", user.id)
    }else{
        displayAlert("Carrinho vazio", false)
    }
})
copySymbol.addEventListener("click", ()=>{
    navigator.clipboard.writeText("penis")
    displayAlert("Código Pix copiado", true)
})




socket.on("loginState", data=>{
    if(data.state == "Success"){
        user = data.userInfo
        trans.style.animation= "animation 2s";
        putFoods()
        updateCart()
        updatePending()
        setTimeout(()=>{
            displayBalance()
            changePage(2)
            tela2.style.animation= "animation2 1s";
        }, 2000)
    }else if(data.state == "Fail"){
        result.innerText = "Usuário e/ou senha incorretos"
    }
})


socket.on("regState", data=>{
    if(data.state == "Success"){
        result.innerText = "Usuário criado com sucesso"
        email.value = ""
        senha.value = ""
    }else if(data.state == "Fail"){
        result.innerText = "Usuário já existente"
    }
})

socket.on("updateUser", data=>{
    user = data
    console.log(user)
})

socket.on("balancePayResp", (state, saldo)=>{
    if(state){
        displayAlert("Pagamento feito com sucesso", true)
        user.saldo = saldo
    }else{
        displayAlert("Saldo insuficiente", false)
        user.saldo = saldo
    }
    setTimeout(()=>{
        displayBalance()
        updateCart()
        updatePending()
    },500)
})

