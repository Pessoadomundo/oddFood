const socket = io('http://oddfood.ddns.net/')
var user 
const foods = [{"name": "Parmegiana (Pequeno)", "preco":20, "id":0, "img": "5.jpg"}, {"name": "Parmegiana (Grande)", "preco":22, "id":1, "img": "6.jpg"}, {"name": "Strogonoff (Pequeno)", "preco":20, "id":2, "img": "3.png"}, {"name": "Strogonoff (Grande)", "preco":22, "id":3, "img": "3_5.jpg"}, {"name": "Almôndegas (Pequeno)", "preco":20, "id":4, "img": "1.jpg"}, {"name": "Almôndegas (Grande)", "preco":22, "id":5, "img": "2.jpg"}, {"name": "Feijoada (Pequeno)", "preco":20, "id":6, "img": "7.jpeg"}, {"name": "Feijoada (Grande)", "preco":22, "id":7, "img": "8.jpg"}, {"name": "Alcatra (Pequeno)", "preco":31, "id":8, "img": "9.webp"}, {"name": "Alcatra (Grande)", "preco":34, "id":9, "img": "10.jpg"}, {"name": "Chorizo (Pequeno)", "preco":35, "id":10, "img": "11.jpg"}, {"name": "Chorizo (Grande)", "preco":39, "id":11, "img": "12.jpg"}, {"name": "Filé Mignon (Pequeno)", "preco":41, "id":12, "img": "13.webp"}, {"name": "Filé Migon (Grande)", "preco":44, "id":13, "img": "14.webp"}, {"name": "Frango (Pequeno)", "preco":22, "id":14, "img": "15.jpg"}, {"name": "Frango (Grande)", "preco":24, "id":15, "img": "16.jpg"}, {"name": "Hambúrger Vegano (Pequeno)", "preco":31, "id":16, "img": "17.jpg"}, {"name": "Hambúrguer Vegano (Grande)", "preco":34, "id":17, "img": "18.jpeg"}, {"name": "Lombo (Pequeno)", "preco":22, "id":18, "img": "19.jpg"}, {"name": "Lombo (Grande)", "preco":24, "id":19, "img": "19_5.jpg"}, {"name": "Omelete (Pequeno)", "preco":22, "id":20, "img": "20.jpeg"}, {"name": "Omelete (Grande)", "preco":24, "id":21, "img": "21.webp"}, {"name": "Picanha (Pequeno)", "preco":41, "id":22, "img": "22.jpg"}, {"name": "Picanha (Grande)", "preco":44, "id":23, "img": "22_5.jpg"}, {"name": "Tilápia (Pequeno)", "preco":31, "id":24, "img": "23.webp"}, {"name": "Tilápia (Grande)", "preco":34, "id":25, "img": "24.jpg"}, {"name": "Prato Kids", "preco":22, "id":26, "img": "25.webp"}, {"name": "Coca Cola Lata", "preco":6, "id":27, "img": "b1.png"}, {"name": "Coca Cola Zero Lata", "preco":6, "id":28, "img": "b2.png"}, {"name": "Suco de Uva (330ml)", "preco":6, "id":29, "img": "b3.png"}, {"name": "Suco de Pêssego (330ml)", "preco":6, "id":30, "img": "b4.png"}, {"name": "Suco de Manga (330ml)", "preco":6, "id":31, "img": "b5.png"}, {"name": "Água Natural", "preco":4, "id":32, "img": "b6.png"}, {"name": "Água com Gás", "preco":4, "id":33, "img": "b7.png"}, {"name": "H2OH!", "preco":6, "id":34, "img": "b8.png"}, {"name": "Bombom Sonho de Valsa", "preco":3, "id":35, "img": "c1.png"}, {"name": "Bombom Ouro Branco", "preco":3, "id":36, "img": "c2.png"}, {"name": "Brownie", "preco":7, "id":37, "img": "c3.jpg"}, {"name": "Chocolate 5 Star", "preco":5, "id":38, "img": "c4.png"}, {"name": "Chocolate Laka Branco", "preco":4, "id":39, "img": "c5.png"}, {"name": "Chocolate Diamante Negro", "preco":4, "id":40, "img": "c6.png"}, {"name": "Halls Extra Forte", "preco":3, "id":41, "img": "c7.png"}, {"name": "Halls de Morango", "preco":3, "id":42, "img": "c8.png"}, {"name": "Trident de Hortelã", "preco":3, "id":43, "img": "c9.png"}, {"name": "Trident de Morango", "preco":3, "id":44, "img": "c10.png"}]

let trans = document.getElementById("trans")
let tela1 = document.getElementById("tela1")
let tela2 = document.getElementById("tela2")
let tela3 = document.getElementById("tela3")


let loginTitle = document.getElementById("loginTitle")
let email = document.getElementById("email")
let chavePixIn = document.getElementById("chavePixIn")
let senha = document.getElementById("senha")
let login = document.getElementById("enviar")
let registrar = document.getElementById("registrar")
let result = document.getElementById("result")
let tutorial = document.getElementById("tutorial")

let container1 = document.getElementById("container")
let container2 = document.getElementById("container2")
let container3 = document.getElementById("container3")

let plus = document.getElementById("plus")

let bag = document.getElementById("bag")
let carrinho = document.getElementById("carrinho")
let perfil = document.getElementById("perfil")

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

let copySymbol = document.getElementById("copySymbol")

let tutorialGif = document.getElementById("tutorialGif")
let tutorialText = document.getElementById("tutorialText")
let backTutorial = document.getElementById("backTutorial")
let forwardTutorial = document.getElementById("forwardTutorial")
let tuText = document.getElementById("tuText")
let sauce = document.getElementById("sauce")


let mode = 1

let tuTela = 0

let tuTelas = [{"texto": "Passo 1: Criar a conta", "imagem": "tela1.mov"}, {"texto": "Passo 2: Fazer Login", "imagem": "tela2.mov"}, {"texto": "Passo 3: Adicionar Saldo", "imagem": "tela3.mov"}, {"texto": "Passo 4: Fazer Pedido", "imagem": "tela4.mov"}, {"texto": "Fim do Tutorial", "imagem": "tela5.mov"}]


function changePage(page){
    if(page==1){
        tela3.style.animation = "tela13 1s"   
        setTimeout(()=>{
            tela1.style.display = "block"
            tela2.style.display = "none"
            tela3.style.display = "none"
            tela1.style.animation = "tela132 2s"
        }, 1000)
    }
    if(page==2){
        tela1.style.display = "none"
        tela2.style.display = "block"
        tela3.style.display = "none"
        
    }
    if(page==3){
        tela1.style.animation = "tela13 1s"
        setTimeout(()=>{
            tela1.style.display = "none"
            tela2.style.display = "none"
            tela3.style.display = "flex"
            tela3.style.animation = "tela132 2s"
            window.scroll(0, 100);
        },1000)
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

function updateTut(tut){
    if(tut<0){
        changePage(1)
    }else if(tut>=5){
        changePage(1)
        tuTela = 0
    }else{
        tutorialGif.load()
        tutorialGif.play()
        tuText.innerHTML = tuTelas[tut].texto
        sauce.src = tuTelas[tut].imagem
        setTimeout(()=>{
            window.scroll(0, 100);
        }, 1000)
    }
}
function displayFood(id, type, elt, qtd=0){
    let food = foods[id]


    let eltComida = document.createElement("div")
    eltComida.classList.add("comida")

    let eltDivImgComida = document.createElement("div")
    eltDivImgComida.classList.add("divImgComida")
    
    let eltImgComida = document.createElement("img")
    eltImgComida.classList.add("imgComida")
    eltImgComida.src = "./pratos/"+food.img
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
        eltDivInfoComida.style.marginTop = "0px"
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
    }else{
        saldo.innerHTML = "Saldo: R$"+user.saldo
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
        socket.emit("registrar", email.value, senha.value, chavePixIn.value)
    }
})

registrar.addEventListener("click", ()=>{
    if(mode==1){
        mode=2
        registrar.innerText = "Login"
        login.innerText = "Registrar"
        loginTitle.innerText = "Registrar"
        chavePixIn.style.display = "inline-block"
    }else if(mode==2){
        mode=1
        registrar.innerText = "Registrar"
        login.innerText = "Login"
        loginTitle.innerText = "Login"
        chavePixIn.style.display = "none"
    }
})

plus.addEventListener("click", ()=>{
    pagamentoDiv.style.display = "block"
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


copySymbol.addEventListener("click", ()=>{
    alert("a")
    //navigator.clipboard.writeText("c802a08e-def8-4202-b6c1-72f137327329")
    //displayAlert("Código Pix copiado", true)
})

pagamentoDiv.addEventListener("click", ()=>{
    setTimeout(()=>{
        pagamentoDiv.style.display = "none"
    }, 50)
    
})

tutorial.addEventListener("click", ()=>{
    changePage(3)
})

/*payNow.addEventListener("click", ()=>{
    pagamentoDiv.style.display = "block"
    type = 1
    let total
    let i = 0
    user.cart.forEach(item=>{
        total+=item.qtd*foods[i].preco
        i++
    })
})
*/
useBalance.addEventListener("click", ()=>{
    if(user.cart.length>0){
        socket.emit("balancePayAsk", user.id)
    }else{
        displayAlert("Carrinho vazio", false)
    }
})

backTutorial.addEventListener("click", ()=>{
    tuTela-=1
    updateTut(tuTela)
})  

forwardTutorial.addEventListener("click", ()=>{
    tuTela+=1
    updateTut(tuTela)
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
        chavePixIn.value = ""
    }else if(data.state == "Fail"){
        result.innerText = "Nome ou chave pix já usados"
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

async function a(){
    setInterval(()=>{
        socket.emit("askUser", user.id)
        displayBalance()
    },10000)
  }
  a()