const socket = io('http://oddfood.ddns.net/')
var user 
const foods = [{"name": "Parmegiana (Pequeno)", "preco":20, "id":0, "img": "5.jpg"}, {"name": "Parmegiana (Grande)", "preco":22, "id":1, "img": "6.jpg"}, {"name": "Strogonoff (Pequeno)", "preco":20, "id":2, "img": "3.png"}, {"name": "Strogonoff (Grande)", "preco":22, "id":3, "img": "3_5.jpg"}, {"name": "Almôndegas (Pequeno)", "preco":20, "id":4, "img": "1.jpg"}, {"name": "Almôndegas (Grande)", "preco":22, "id":5, "img": "2.jpg"}, {"name": "Feijoada (Pequeno)", "preco":20, "id":6, "img": "7.jpeg"}, {"name": "Feijoada (Grande)", "preco":22, "id":7, "img": "8.jpg"}, {"name": "Alcatra (Pequeno)", "preco":31, "id":8, "img": "9.webp"}, {"name": "Alcatra (Grande)", "preco":34, "id":9, "img": "10.jpg"}, {"name": "Chorizo (Pequeno)", "preco":35, "id":10, "img": "11.jpg"}, {"name": "Chorizo (Grande)", "preco":39, "id":11, "img": "12.jpg"}, {"name": "Filé Mignon (Pequeno)", "preco":41, "id":12, "img": "13.webp"}, {"name": "Filé Migon (Grande)", "preco":44, "id":13, "img": "14.webp"}, {"name": "Frango (Pequeno)", "preco":22, "id":14, "img": "15.jpg"}, {"name": "Frango (Grande)", "preco":24, "id":15, "img": "16.jpg"}, {"name": "Hambúrger Vegano (Pequeno)", "preco":31, "id":16, "img": "17.jpg"}, {"name": "Hambúrguer Vegano (Grande)", "preco":34, "id":17, "img": "18.jpeg"}, {"name": "Lombo (Pequeno)", "preco":22, "id":18, "img": "19.jpg"}, {"name": "Lombo (Grande)", "preco":24, "id":19, "img": "19_5.jpg"}, {"name": "Omelete (Pequeno)", "preco":22, "id":20, "img": "20.jpeg"}, {"name": "Omelete (Grande)", "preco":24, "id":21, "img": "21.webp"}, {"name": "Picanha (Pequeno)", "preco":41, "id":22, "img": "22.jpg"}, {"name": "Picanha (Grande)", "preco":44, "id":23, "img": "22_5.jpg"}, {"name": "Tilápia (Pequeno)", "preco":31, "id":24, "img": "23.webp"}, {"name": "Tilápia (Grande)", "preco":34, "id":25, "img": "24.jpg"}, {"name": "Fritas (400g)", "preco":25, "id":26, "img": "29.jpg"}, {"name": "Fritas com Bacon e Queijo (400g)", "preco":35, "id":27, "img": "30.jpg"}, {"name": "Bolinhos de Bacalhau (15)", "preco":34, "id":28, "img": "31.jpg"}, {"name": "Prato Kids", "preco":22, "id":29, "img": "25.webp"}, {"name": "Coca Cola Lata", "preco":6, "id":30, "img": "b1.png"}, {"name": "Coca Cola Zero Lata", "preco":6, "id":31, "img": "b2.png"}, {"name": "Suco de Uva (330ml)", "preco":6, "id":32, "img": "b3.png"}, {"name": "Suco de Pêssego (330ml)", "preco":6, "id":33, "img": "b4.png"}, {"name": "Suco de Manga (330ml)", "preco":6, "id":34, "img": "b5.png"}, {"name": "Garrafa pra Pururuca", "preco":4, "id":35, "img": "b6.png"}, {"name": "Água com Gás", "preco":4, "id":36, "img": "b7.png"}, {"name": "H2OH!", "preco":6, "id":37, "img": "b8.png"}, {"name": "Bombom Sonho de Valsa", "preco":3, "id":38, "img": "c1.png"}, {"name": "Bombom Ouro Branco", "preco":3, "id":39, "img": "c2.png"}, {"name": "Brownie", "preco":7, "id":40, "img": "c3.jpg"}, {"name": "Chocolate 5 Star", "preco":5, "id":41, "img": "c4.png"}, {"name": "Chocolate Laka Branco", "preco":4, "id":42, "img": "c5.png"}, {"name": "Chocolate Diamante Negro", "preco":4, "id":43, "img": "c6.png"}, {"name": "Halls Extra Forte", "preco":3, "id":44, "img": "c7.png"}, {"name": "Halls de Morango", "preco":3, "id":45, "img": "c8.png"}, {"name": "Trident de Hortelã", "preco":3, "id":46, "img": "c9.png"}, {"name": "Trident de Morango", "preco":3, "id":47, "img": "c10.png"}]

const desc = ["Filé de peito de frango à parmegiana com arroz e purê", "Filé de peito de frango à parmegiana com arroz e purê", "Strogonoff de frango com arroz e batata palha", "Strogonoff de frango com arroz e batata palha", "Almôndegas de alcatra com arroz, feijão, couve e angu", "Almôndegas de alcatra com arroz, feijão, couve e angu", "Feijoada com arroz, farofa, couve e vinagrete", "Feijoada com arroz, farofa, couve e vinagrete", "Alcatra acompanhado de arroz, feijão e fritas", "Alcatra acompanhado de arroz, feijão e fritas", "Chorizo acompanhado de arroz, feijão e fritas", "Chorizo acompanhado de arroz, feijão e fritas", "Filé Mignon acompanhado de arroz, feijão e fritas", "Filé Mignon acompanhado de arroz, feijão e fritas", "Frango acompanhado de arroz, feijão e fritas", "Frango acompanhado de arroz, feijão e fritas", "Hamburger Vegano acompanhado de arroz, feijão e fritas", "Hamburger Vegano acompanhado de arroz, feijão e fritas", "Lombo acompanhado de arroz, feijão e fritas", "Lombo acompanhado de arroz, feijão e fritas", "Omelete de queijo acompanhado de arroz, feijão e fritas", "Omelete de queijo acompanhado de arroz, feijão e fritas", "Picanha acompanhado de arroz, feijão e fritas", "Picanha acompanhado de arroz, feijão e fritas", "Tilápia acompanhada de arroz, feijão e fritas", "Tilápia acompanhada de arroz, feijão e fritas", "400 gramas de fritas", "400 gramas de fritas com queijo e bacon", "15 bolinhos de bacalhau", "Prato mini com filé de peito de frango grelhado, arroz, feijão de caldo e fritas"]
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

//let copySymbol = document.getElementById("copySymbol")

let tutorialGif = document.getElementById("tutorialGif")
let tutorialText = document.getElementById("tutorialText")
let backTutorial = document.getElementById("backTutorial")
let forwardTutorial = document.getElementById("forwardTutorial")
let tuText = document.getElementById("tuText")
let sauce = document.getElementById("sauce")
let sendingDay = document.getElementById("sendingDay")

//TICKET
/////let divIngressos = document.getElementById("ingressos")
/////let buyTicket = document.getElementById("buyTicket")

var clickedInsideMarketplaceProduct = false

var products = []

var precoIngresso = 80
var lote = 1

let mode = 1

let tuTela = 0

let tuTelas = [{"texto": "Passo 1: Criar a conta", "imagem": "tela1.mov"}, {"texto": "Passo 2: Fazer Login", "imagem": "tela2.mov"}, {"texto": "Passo 3: Adicionar Saldo", "imagem": "tela3.mov"}, {"texto": "Passo 4: Fazer Pedido", "imagem": "tela4.mov"}, {"texto": "Fim do Tutorial", "imagem": "tela5.mov"}]

let day = -1
let days = ["Terça (12:25)", "Quarta (11:35)", "Quinta (12:25)", "Sexta (11:35)"]


socket.emit("getDay", true)
socket.emit("getTicketPrice")

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
            updateTut(0)
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

    for (let i = 0; i < foods.length; i++) {
        if(day==0 && !([0,1,2,3,6,7].includes(foods[i].id))){
            displayFood(foods[i].id, 1, divComidas)
        }
        if(day==1 && !([0,1,4,5,6,7].includes(foods[i].id))){
            displayFood(foods[i].id, 1, divComidas)
        }
        if(day==2 && !([2,3,4,5,6,7].includes(foods[i].id))){
            displayFood(foods[i].id, 1, divComidas)
        }
        if(day==3 && foods[i].id>5){
            displayFood(foods[i].id, 1, divComidas)
        }
    }
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
        }, 2000)
    }
}
function getYPosition(){
    var top  = window.pageYOffset || document.documentElement.scrollTop
    return top
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
    eltImgComida.addEventListener("click", (event)=>{
        if(id<30){
            scrollOffset = getYPosition()
            initialPos = event.clientY
            document.getElementById("foodInfoText").innerText = desc[id]
            document.getElementById("foodInfoDiv").style.display = "block"
            document.getElementById("foodInfo").style.position = "fixed"
            document.getElementById("trianglin").style.position = "fixed"
            document.getElementById("foodInfo").style.left = ""+(event.clientX-52)+"px"
            document.getElementById("foodInfo").style.top = ""+(event.clientY+10)+"px"
            document.getElementById("trianglin").style.left = ""+(event.clientX-30)+"px"
            document.getElementById("trianglin").style.top = ""+(event.clientY-0)+"px"
        }
    })
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
        saldoMarketplace.innerHTML = "Saldo: R$"+user.saldo+",00"
    }else{
        saldo.innerHTML = "Saldo: R$"+user.saldo
        saldoMarketplace.innerHTML = "Saldo: R$"+user.saldo
    }
}

function displayMarketplaceProduct(id, name, imagem, desc, preco){
    let eltProduct = document.createElement("div")
    eltProduct.classList.add("marketplaceProduct")
    let imgProduct = document.createElement("img")
    imgProduct.src = imagem
    imgProduct.classList.add("imgProduct")
    eltProduct.appendChild(imgProduct)
    let productInfo = document.createElement("div")
    productInfo.classList.add("productInfo")
    let nomeComida = document.createElement("span")
    nomeComida.classList.add("nomeComida")
    nomeComida.innerHTML = name
    productInfo.appendChild(nomeComida)
    let precoComida = document.createElement("span")
    precoComida.classList.add("preco")
    precoComida.innerHTML = "R$"+preco+",00"
    productInfo.appendChild(precoComida)
    productInfo.appendChild(document.createElement("br"))
    eltProduct.appendChild(productInfo)

    let columnToAdd = 1
    if(document.getElementById("marketplaceColumn1").children.length>document.getElementById("marketplaceColumn2").children.length){
        columnToAdd = 2
    }
    if(columnToAdd==1){
        document.getElementById("marketplaceColumn1").appendChild(eltProduct)
    }else if(columnToAdd==2){
        document.getElementById("marketplaceColumn2").appendChild(eltProduct)
    }

    eltProduct.addEventListener("click", ()=>{
        displayMarketplaceProductLook(id, name, imagem, desc, preco)
        document.getElementById("marketplaceEntireScreen").style.display = "block"
    })
}

function putArrayInScoreOrder(array){
    let newArray = []
    for(let i=0; i<array.length; i++){
        newArray.push(array[i])
    }
    for(let i=0; i<newArray.length; i++){
        for(let j=i+1; j<newArray.length; j++){
            if(newArray[i].vendas<newArray[j].vendas){
                let aux = newArray[i]
                newArray[i] = newArray[j]
                newArray[j] = aux
            }
        }
    }
    return newArray
}

function invertArray(array){
    let newArray = []
    for(let i=array.length-1; i>=0; i--){
        newArray.push(array[i])
    }
    return newArray
}
    


function displayMarketplaceProducts(){
    document.getElementById("marketplaceColumn1").innerHTML = ""
    document.getElementById("marketplaceColumn2").innerHTML = ""
    let productsInOrder = putArrayInScoreOrder(products)

    for(let i=0; i<productsInOrder.length; i++){
        if(!(productsInOrder[i].definedStock==true && productsInOrder[i].stock<=0)){
            displayMarketplaceProduct(productsInOrder[i].id, productsInOrder[i].name, productsInOrder[i].imagem, productsInOrder[i].desc, productsInOrder[i].preco)
        }
    }
}

function displayMarketplaceProductLook(id, name, imagem, desc, preco){
    document.getElementById("marketplaceProductImgLook").src = imagem
    document.getElementById("marketplaceProductNameLook").innerHTML = name
    document.getElementById("marketplaceProductDescriptionLook").innerHTML = desc
    document.getElementById("marketplaceProductPriceLook").innerHTML = "R$"+preco+",00"

    var new_element = document.getElementById("marketplaceProductBuyLook").cloneNode(true)
    document.getElementById("marketplaceProductBuyLook").parentNode.replaceChild(new_element, document.getElementById("marketplaceProductBuyLook"))

    document.getElementById("marketplaceProductBuyLook").addEventListener("click", ()=>{
        let confimation = confirm("Você tem certeza que deseja comprar este produto?")
            if(confimation){
                socket.emit("buyMarketplaceProductAsk", user.id, id, document.getElementById("marketplaceProductObservationsLook").value)
            }
            document.getElementById("marketplaceEntireScreen").style.display="none"
    })
}


function putRecentItemMP(name, imagem, preco){
    let eltRecentItem = document.createElement("div")
    eltRecentItem.classList.add("recentItem")
    let imgRecentItem = document.createElement("img")
    imgRecentItem.src = imagem
    imgRecentItem.classList.add("imgComida")
    let imgRecentItemDiv = document.createElement("div")
    imgRecentItemDiv.classList.add("divImgComida")
    imgRecentItemDiv.appendChild(imgRecentItem)
    eltRecentItem.appendChild(imgRecentItemDiv)
    let recentItemInfo = document.createElement("div")
    recentItemInfo.classList.add("productInfo")
    let nome = document.createElement("span")
    nome.classList.add("nomeComida")
    nome.innerHTML = name
    recentItemInfo.appendChild(nome)
    let recentItemPreco = document.createElement("span")
    recentItemPreco.classList.add("preco")
    recentItemPreco.innerHTML = "R$"+preco+",00"
    recentItemInfo.appendChild(recentItemPreco)
    recentItemInfo.appendChild(document.createElement("br"))
    eltRecentItem.appendChild(recentItemInfo)
    document.getElementById("recentItems").appendChild(eltRecentItem)
}

function putRecentItemsMP(){
    try{
    document.getElementById("recentItems").innerHTML = ""
    for(let i=0; i<user.recentItems.length; i++){
        putRecentItemMP(products[getProductIndexById(user.recentItems[i])].name, products[getProductIndexById(user.recentItems[i])].imagem, products[getProductIndexById(user.recentItems[i])].preco)
    }
    }catch(e){
        console.log(e)
    }
}

function displayMyMarketplaceProduct(id){
    let marketplaceMyProduct = document.createElement("div")
    marketplaceMyProduct.classList.add("marketplaceProduct")
    let imgProduct = document.createElement("img")
    imgProduct.src = products[getProductIndexById(id)].imagem
    imgProduct.classList.add("imgProduct")
    marketplaceMyProduct.appendChild(imgProduct)
    let productInfo = document.createElement("div")
    productInfo.classList.add("productInfo")
    let nomeComida = document.createElement("span")
    nomeComida.classList.add("nomeComida")
    nomeComida.innerHTML = products[getProductIndexById(id)].name
    productInfo.appendChild(nomeComida)
    productInfo.appendChild(document.createElement("br"))
    let preco = document.createElement("span")
    preco.classList.add("preco")
    preco.innerHTML = "R$"+products[getProductIndexById(id)].preco+",00"
    productInfo.appendChild(preco)
    productInfo.appendChild(document.createElement("br"))
    let totalSales = document.createElement("span")
    totalSales.classList.add("totalSales")
    totalSales.innerHTML = products[getProductIndexById(id)].vendas + " Vendas Realizadas"
    productInfo.appendChild(totalSales)
    productInfo.appendChild(document.createElement("br"))
    let a = document.createElement("span")
    let definedStockBool = true
    let toggleStock = document.createElement("img")
    if(products[getProductIndexById(id)].definedStock){
        toggleStock.src = "toggle.png"
        definedStockBool = true
    }else{
        toggleStock.src = "toggle2.png"
        definedStockBool = false
    }
    toggleStock.classList.add("toggleStock")
    toggleStock.addEventListener("click", ()=>{
        if(toggleStock.src.includes("toggle.png")){
            toggleStock.src = "toggle2.png"
            socket.emit("toggleStock", id, false)
            definedStockBool = false
            stockControlDiv.style.display = "none"
            b.style.display = "none"
        }else{
            toggleStock.src = "toggle.png"
            socket.emit("toggleStock", id, true)
            definedStockBool = true
            stockControlDiv.style.display = "flex"
            b.style.display = "block"
        }
    })
    let definedStock = document.createElement("span")
    definedStock.innerHTML = "Estoque Definido"
    let undefinedStock = document.createElement("span")
    undefinedStock.innerHTML = "Estoque Indefinido"
    a.appendChild(definedStock)
    a.appendChild(toggleStock)
    a.appendChild(undefinedStock)

    productInfo.appendChild(a)
    let b = document.createElement("span")
    b.innerHTML = "Estoque Restante:"
    if(!definedStockBool){
        b.style.display = "none"
    }
    productInfo.appendChild(b)
    let stockControlDiv = document.createElement("div")
    stockControlDiv.classList.add("stockControlDiv")
    if(!definedStockBool){
        stockControlDiv.style.display = "none"
    }
    let minusStock = document.createElement("img")
    minusStock.src = "minusBlack.png"
    minusStock.classList.add("minusStock")
    minusStock.addEventListener("click", ()=>{
        if(products[getProductIndexById(id)].stock > 0){
            products[getProductIndexById(id)].stock--
            socket.emit("stockControl", id, -1)
            lastingStock.innerHTML = products[getProductIndexById(id)].stock
        }
    })
    stockControlDiv.appendChild(minusStock)
    let lastingStock = document.createElement("span")
    lastingStock.classList.add("lastingStock")
    lastingStock.innerHTML = products[getProductIndexById(id)].stock
    stockControlDiv.appendChild(lastingStock)
    let plusStock = document.createElement("img")
    plusStock.src = "plusBlack.png"
    plusStock.classList.add("plusStock")
    plusStock.addEventListener("click", ()=>{
        products[getProductIndexById(id)].stock++
        socket.emit("stockControl", id, 1)
        lastingStock.innerHTML = products[getProductIndexById(id)].stock
    })
    stockControlDiv.appendChild(plusStock)
    productInfo.appendChild(stockControlDiv)
    productInfo.appendChild(document.createElement("br"))
    let marketplaceDeleteProduct = document.createElement("img")
    marketplaceDeleteProduct.src = "trash.png"
    marketplaceDeleteProduct.classList.add("marketplaceDeleteProduct")
    marketplaceDeleteProduct.addEventListener("click", ()=>{
        let confimation = confirm("Você tem certeza que deseja deletar este produto?")
            if(confimation){
                marketplaceMyProduct.display = "none"
                socket.emit("deleteMarketplaceProduct", id)
            }
    })
    productInfo.appendChild(marketplaceDeleteProduct)
    marketplaceMyProduct.appendChild(productInfo)
    document.getElementById("marketplaceMyProducts").appendChild(marketplaceMyProduct)
}


function displayMyProducts(){
    document.getElementById("marketplaceMyProducts").innerHTML = ""
    let addProduct = document.createElement("img")
    addProduct.src = "addProduct.png"
    addProduct.id = "addProduct"
    addProduct.style.width = "90%"
    addProduct.addEventListener("click", ()=>{
        let ctz = confirm("Você tem certeza que deseja criar um produto?")
    if(ctz){
        let productName = prompt("Qual será o nome do produto?")
        if(productName==null){
            productName = alert("Nome inválido")
        }else{
            let productPrice = prompt("Quanto deseja receber com cada venda? (Apenas use números inteiros e não coloque R$)")
            if(productPrice==null){
                productPrice = alert("Preço inválido")
            }else{
                alert("O preço do produto será de R$"+Math.round(productPrice*1.1+1)+",00 para os compradores")
                let productDescription = prompt("Qual será a descrição do produto? (Coloque informações como seu nome e local de entrega caso seja um produto físico)")
                if(productDescription==null){
                    productDescription = alert("Descrição inválida")
                }else{
                    let productImage = prompt("Digite o link do arquivo da imagem do produto")
                    if(productImage==null){
                        productImage = alert("Imagem inválida")
                    }else{
                        socket.emit("createProduct", {
                            name: productName,
                            preco: productPrice,
                            desc: productDescription,
                            imagem: productImage
                        }, user.id)
                        alert("Produto criado com sucesso!")
                    }
                }
            }
        }
    }
    })
    marketplaceMyProducts.appendChild(addProduct)
    marketplaceMyProducts.appendChild(document.createElement("br"))
    for(let i=0; i<products.length; i++){
        if(products[i].ownerId == user.id){
            displayMyMarketplaceProduct(products[i].id)
        }
    }
}

function putArrayInTimeOrder(array){
    let newArray = []
    for(let i=0; i<array.length; i++){
        newArray.push(array[i])
    }
    for(let i=0; i<newArray.length; i++){
        for(let j=0; j<newArray.length; j++){
            if(newArray[i].time < newArray[j].time){
                let temp = newArray[i]
                newArray[i] = newArray[j]
                newArray[j] = temp
            }
        }
    }
    return newArray
}

function invertTimeArray(array){
    let newArray = []
    for(let i=0; i<array.length; i++){
        newArray.push(array[i])
    }
    for(let i=0; i<newArray.length; i++){
        for(let j=0; j<newArray.length; j++){
            if(newArray[i].time > newArray[j].time){
                let temp = newArray[i]
                newArray[i] = newArray[j]
                newArray[j] = temp
            }
        }
    }
    return newArray
}

function garanteeDoubleDigits(number){
    if(number < 10){
        return "0"+number
    }else{
        return number
    }
}

function getTimeAndDateFromMiliseconds(miliseconds){
    let date = new Date(miliseconds)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let day = date.getDate()
    let month = date.getMonth()+1
    return ""+garanteeDoubleDigits(hours)+":"+garanteeDoubleDigits(minutes) + " do dia " + garanteeDoubleDigits(day)+"/"+garanteeDoubleDigits(month)
}

function displayLastSales(){
    let ul = document.getElementById("lastSales")
    ul.innerHTML = ""
    let lastSales = []
    for (let i = 0; i < products.length; i++) {
        if(products[i].ownerId == user.id){
            for (let o = 0; o < products[i].lastSales.length; o++) {
                lastSales.push(products[i].lastSales[o])
            }
        }
    }
    lastSales = putArrayInTimeOrder(lastSales)
    lastSales = invertTimeArray(lastSales)
    for(let i=0; i<lastSales.length; i++){
        let newElt = document.createElement("li")
        newElt.innerHTML = lastSales[i].username + " comprou um(a) " + products[getProductIndexById(lastSales[i].productid)].name+"(R$"+products[getProductIndexById(lastSales[i].productid)].preco+",00) às "+ getTimeAndDateFromMiliseconds(lastSales[i].time)+". Obs.: "+ lastSales[i].obs+"."
        ul.appendChild(newElt)
        ul.appendChild(document.createElement("br"))
    }
}

function displayAlert(message, good=true){
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

function getProductIndexById(id){
    for(let i=0; i<products.length; i++){
        if(products[i].id==id){
            return i
        }
    }
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

/*
copySymbol.addEventListener("click", ()=>{
    //navigator.clipboard.writeText("c802a08e-def8-4202-b6c1-72f137327329")
    displayAlert("Código Pix copiado", true)
})
*/
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

document.getElementById("foodInfoDiv").addEventListener("click", ()=>{
    document.getElementById("foodInfoDiv").style.display="none"
})


document.getElementsByTagName('body')[0].onscroll = () => {
    document.getElementById("foodInfoDiv").style.display="none"
}

/* TICKET
buyTicket.addEventListener("click", ()=>{
    if(lote!=999){
        let confimation = confirm("Você tem certeza que deseja usar R$"+precoIngresso+",00 para comprar o ingresso?")
        if(confimation && user.hasTicket!=true){
            socket.emit("payTicketAsk", user.id)
        }else if(user.hasTicket==true){
            displayAlert("Você já adquiriu este ingresso", false)
        }else{
            displayAlert("Compra cancelada", false)
        }
    }else{
        displayAlert("Vendas encerradas", false)
    }
})
*/

document.getElementById("menuOddFood").addEventListener("click", ()=>{
    document.getElementById("menuOddFood").style.backgroundColor="black"
    document.getElementById("menuOddFoodText").style.color="white"
    document.getElementById("menuMarketplace").style.backgroundColor="#f2f2f2"
    document.getElementById("menuMarketplaceText").style.color="black"
    document.getElementById("comidas").style.display="block"
    document.getElementById("marketplace").style.display="none"
})

document.getElementById("menuMarketplace").addEventListener("click", ()=>{
    document.getElementById("menuMarketplace").style.backgroundColor="black"
    document.getElementById("menuMarketplaceText").style.color="white"
    document.getElementById("menuOddFood").style.backgroundColor="#f2f2f2"
    document.getElementById("menuOddFoodText").style.color="black"
    document.getElementById("comidas").style.display="none"
    document.getElementById("marketplace").style.display="flex"
})

document.getElementById("marketplaceProductLook").addEventListener("click", ()=>{
    clickedInsideMarketplaceProduct = true
    setTimeout(()=>{
        clickedInsideMarketplaceProduct = false
    }, 100)
})

document.getElementById("marketplaceEntireScreen").addEventListener("click", ()=>{
    setTimeout(()=>{
        if(!clickedInsideMarketplaceProduct){
            document.getElementById("marketplaceEntireScreen").style.display="none"
        }
    }, 10)
})

document.getElementById("plusMarketplaceButton").addEventListener("click", ()=>{
    document.getElementById("plusMarketplaceButton").style.animation= "enlarge 1s"
    document.getElementsByTagName("body")[0].style.animation= "whiteToBlack 1s"

    document.getElementById("daBarra").style.animation= "fade 1s"
    setTimeout(()=>{
        document.getElementById("plusMarketplaceButton").style.animation= "none"
        document.getElementById("tela2").style.display="none"
        document.getElementById("tela4").style.display="block"
        document.getElementById("tela4content").style.animation="appear 0.5s"
        document.getElementById("daBarra").style.animation= "none"
        document.getElementsByTagName("body")[0].style.backgroundColor="black"
    }, 990)
})

document.getElementById("backArrowMP").addEventListener("click", ()=>{
    document.getElementById("backArrowMP").style.animation="enlarge2 1s"
    document.getElementById("tela4content").style.animation="fade 1s"
    document.getElementsByTagName("body")[0].style.animation= "blackToWhite 1s"
    setTimeout(()=>{
        document.getElementById("tela4").style.display="none"
        document.getElementById("tela2").style.display="block"
        document.getElementById("tela4content").style.animation= "none"
        document.getElementById("backArrowMP").style.animation="none"
        document.getElementsByTagName("body")[0].style.backgroundColor="white"
    }, 990)
})

document.getElementById("addProduct").addEventListener("click", ()=>{
    let ctz = confirm("Você tem certeza que deseja criar um produto?")
    if(ctz){
        let productName = prompt("Qual será o nome do produto?")
        if(productName==null){
            productName = alert("Nome inválido")
        }else{
            let productPrice = prompt("Quanto deseja receber com cada venda?")
            if(productPrice==null){
                productPrice = alert("Preço inválido")
            }else{
                alert("O preço do produto será de R$"+Math.round(productPrice*1.1+1)+",00")
                let productDescription = prompt("Qual será a descrição do produto?")
                if(productDescription==null){
                    productDescription = alert("Descrição inválida")
                }else{
                    let productImage = prompt("Digite o link do arquivo da imagem do produto")
                    if(productImage==null){
                        productImage = alert("Imagem inválida")
                    }else{
                        socket.emit("createProduct", {
                            name: productName,
                            preco: productPrice,
                            desc: productDescription,
                            imagem: productImage
                        }, user.id)
                        alert("Produto criado com sucesso!")
                    }
                }
            }
        }
    }
})

socket.on("loginState", data=>{
    if(data.state == "Success"){
        user = data.userInfo
        trans.style.animation= "animation 2s";
        putFoods()
        updateCart()
        updatePending()
        setTimeout(()=>{
            displayMyProducts()
            if(user.recentItems!=undefined){
                putRecentItemsMP()
                displayLastSales()
            }
        }, 100)
        setTimeout(()=>{
            displayBalance()
            changePage(2)
            tela2.style.animation= "animation2 1s";
        }, 2000)
        /*TICKET
        if(user.hasTicket){
            document.getElementById("buyTicket").style.backgroundColor = "#61e03a"
        }
        */
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
    putFoods()
    updateCart()
    updatePending()
    displayMyProducts()
    if(user.recentItems!=undefined){
        putRecentItemsMP()
        displayLastSales()
    }
    displayBalance()
    socket.emit("getDay", true)
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

socket.on("day", dia=>{
    if(day!=dia){
        day = dia
        putFoods()
    }
    sendingDay.innerText = "Entrega: " + days[day]
})

socket.on("buyMarketplaceProductAnswer", answer=>{
    if(answer){
        displayAlert("Compra realizada com sucesso", true)
        displayBalance()
        setTimeout(()=>{
            putRecentItemsMP()
        }, 500)
    }else{
        displayAlert("Não foi possível comprar o produto", false)
    }
})

socket.on("getMPProducts", productss=>{
    products = productss
    displayMarketplaceProducts()
})

/* TICKET
socket.on("ticketAnswer", confirmation =>{
    if(confirmation){
        displayAlert("Ingresso comprado com sucesso!")
        user.saldo-=precoIngresso
        socket.emit("askUser", user.id)
        setTimeout(()=>{
            displayBalance()
        },500)
    }else{
        displayAlert("Saldo insuficiente", false)
    }
})

socket.on("ticketPriceAnswer", data=>{
    precoIngresso = data.precoIngresso
    lote = data.lote
    document.getElementById("precoIngresso").innerHTML = "R$"+precoIngresso+",00"
    document.getElementById("nomeIngresso").innerHTML = "OddParty Junina <br>("+lote+"º Lote)"
    if(lote==999){
        document.getElementById("precoIngresso").innerHTML = "Vendas encerradas"
        document.getElementById("nomeIngresso").innerHTML = "OddParty Junina"
        document.getElementById("buyTicket").style.backgroundColor = "#c42421"
    }
})
*/
async function a(){
    setInterval(()=>{
        socket.emit("askUser", user.id)
        /*TICKET
        socket.emit("getTicketPrice")
        if(user.hasTicket){
            document.getElementById("buyTicket").style.backgroundColor = "#61e03a"
        }
        */
        displayBalance()
        updateCart()
    },10000)
  }
  a()