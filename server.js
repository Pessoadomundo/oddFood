var express = require('express')
var fs = require("fs")
var app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require("body-parser");
const { json } = require('express/lib/response');

app.use(express.static('./views'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

let rawdata = fs.readFileSync('users.json')
var users = JSON.parse(rawdata)

let rawdata2 = fs.readFileSync('products.json')
var products = JSON.parse(rawdata2)


const foods = [{"name": "Parmegiana (Pequeno)", "preco":20, "id":0, "img": "5.jpg"}, {"name": "Parmegiana (Grande)", "preco":22, "id":1, "img": "6.jpg"}, {"name": "Strogonoff (Pequeno)", "preco":20, "id":2, "img": "3.png"}, {"name": "Strogonoff (Grande)", "preco":22, "id":3, "img": "3_5.jpg"}, {"name": "Almôndegas (Pequeno)", "preco":20, "id":4, "img": "1.jpg"}, {"name": "Almôndegas (Grande)", "preco":22, "id":5, "img": "2.jpg"}, {"name": "Feijoada (Pequeno)", "preco":20, "id":6, "img": "7.jpeg"}, {"name": "Feijoada (Grande)", "preco":22, "id":7, "img": "8.jpg"}, {"name": "Alcatra (Pequeno)", "preco":31, "id":8, "img": "9.webp"}, {"name": "Alcatra (Grande)", "preco":34, "id":9, "img": "10.jpg"}, {"name": "Chorizo (Pequeno)", "preco":35, "id":10, "img": "11.jpg"}, {"name": "Chorizo (Grande)", "preco":39, "id":11, "img": "12.jpg"}, {"name": "Filé Mignon (Pequeno)", "preco":41, "id":12, "img": "13.webp"}, {"name": "Filé Migon (Grande)", "preco":44, "id":13, "img": "14.webp"}, {"name": "Frango (Pequeno)", "preco":22, "id":14, "img": "15.jpg"}, {"name": "Frango (Grande)", "preco":24, "id":15, "img": "16.jpg"}, {"name": "Hambúrger Vegano (Pequeno)", "preco":31, "id":16, "img": "17.jpg"}, {"name": "Hambúrguer Vegano (Grande)", "preco":34, "id":17, "img": "18.jpeg"}, {"name": "Lombo (Pequeno)", "preco":22, "id":18, "img": "19.jpg"}, {"name": "Lombo (Grande)", "preco":24, "id":19, "img": "19_5.jpg"}, {"name": "Omelete (Pequeno)", "preco":22, "id":20, "img": "20.jpeg"}, {"name": "Omelete (Grande)", "preco":24, "id":21, "img": "21.webp"}, {"name": "Picanha (Pequeno)", "preco":41, "id":22, "img": "22.jpg"}, {"name": "Picanha (Grande)", "preco":44, "id":23, "img": "22_5.jpg"}, {"name": "Tilápia (Pequeno)", "preco":31, "id":24, "img": "23.webp"}, {"name": "Tilápia (Grande)", "preco":34, "id":25, "img": "24.jpg"}, {"name": "Fritas (400g)", "preco":25, "id":26, "img": "29.jpg"}, {"name": "Fritas com Bacon e Queijo (400g)", "preco":35, "id":27, "img": "30.jpg"}, {"name": "Bolinhos de Bacalhau (15)", "preco":34, "id":28, "img": "31.jpg"}, {"name": "Prato Kids", "preco":22, "id":29, "img": "25.webp"}, {"name": "Coca Cola Lata", "preco":6, "id":30, "img": "b1.png"}, {"name": "Coca Cola Zero Lata", "preco":6, "id":31, "img": "b2.png"}, {"name": "Suco de Uva (330ml)", "preco":6, "id":32, "img": "b3.png"}, {"name": "Suco de Pêssego (330ml)", "preco":6, "id":33, "img": "b4.png"}, {"name": "Suco de Manga (330ml)", "preco":6, "id":34, "img": "b5.png"}, {"name": "Água Natural", "preco":4, "id":35, "img": "b6.png"}, {"name": "Água com Gás", "preco":4, "id":36, "img": "b7.png"}, {"name": "H2OH!", "preco":6, "id":37, "img": "b8.png"}, {"name": "Bombom Sonho de Valsa", "preco":3, "id":38, "img": "c1.png"}, {"name": "Bombom Ouro Branco", "preco":3, "id":39, "img": "c2.png"}, {"name": "Brownie", "preco":7, "id":40, "img": "c3.jpg"}, {"name": "Chocolate 5 Star", "preco":5, "id":41, "img": "c4.png"}, {"name": "Chocolate Laka Branco", "preco":4, "id":42, "img": "c5.png"}, {"name": "Chocolate Diamante Negro", "preco":4, "id":43, "img": "c6.png"}, {"name": "Halls Extra Forte", "preco":3, "id":44, "img": "c7.png"}, {"name": "Halls de Morango", "preco":3, "id":45, "img": "c8.png"}, {"name": "Trident de Hortelã", "preco":3, "id":46, "img": "c9.png"}, {"name": "Trident de Morango", "preco":3, "id":47, "img": "c10.png"}]
let orders = [{"nome":"Parmegiana (Pequeno)", "qtd": 0}, {"nome":"Parmegiana (Grande)", "qtd": 0}, {"nome":"Strogonoff (Pequeno)", "qtd": 0}, {"nome":"Strogonoff (Grande)", "qtd": 0}, {"nome":"Almôndegas (Pequeno)", "qtd": 0}, {"nome":"Almôndegas (Grande)", "qtd": 0}, {"nome":"Feijoada (Pequeno)", "qtd": 0}, {"nome":"Feijoada (Grande)", "qtd": 0}, {"nome":"Alcatra (Pequeno)", "qtd": 0}, {"nome":"Alcatra (Grande)", "qtd": 0}, {"nome":"Chorizo (Pequeno)", "qtd": 0}, {"nome":"Chorizo (Grande)", "qtd": 0}, {"nome":"Filé Mignon (Pequeno)", "qtd": 0}, {"nome":"Filé Mignon (Grande)", "qtd": 0}, {"nome":"Frango (Pequeno)", "qtd": 0}, {"nome":"Frango (Grande)", "qtd": 0}, {"nome":"Hambúger Vegano (Pequeno)", "qtd": 0}, {"nome":"Hambúrger Vegano (Grande)", "qtd": 0}, {"nome":"Lombo (Pequeno)", "qtd": 0}, {"nome":"Lombo (Grande)", "qtd": 0}, {"nome":"Omelete (Pequeno)", "qtd": 0}, {"nome":"Omelete (Grande)", "qtd": 0}, {"nome":"Picanha (Pequeno)", "qtd": 0}, {"nome":"Picanha (Grande)", "qtd": 0}, {"nome":"Tilápia (Pequeno)", "qtd": 0}, {"nome":"Tilápia (Grande)", "qtd": 0}, {"nome":"Fritas (400g)", "qtd": 0}, {"nome":"Fritas com Bacon e Queijo (400g)", "qtd": 0}, {"nome":"Bolinhos de Bacalhau (15)", "qtd": 0}, {"nome":"Prato Kids", "qtd": 0}, {"nome":"Coca Cola Lata", "qtd": 0}, {"nome":"Coca Cola Zero Lata", "qtd": 0}, {"nome":"Suco de Uva (330ml)", "qtd": 0}, {"nome":"Suco de Pêssego (330ml)", "qtd": 0}, {"nome":"Suco de Manga (330ml)", "qtd": 0}, {"nome":"Água Natural", "qtd": 0}, {"nome":"Água com Gás", "qtd": 0}, {"nome":"H2OH!", "qtd": 0}, {"nome":"Bombom Sonho de Valsa", "qtd": 0}, {"nome":"Bombom Ouro Branco", "qtd": 0}, {"nome":"Brownie", "qtd": 0}, {"nome":"Chocolate 5 Star", "qtd": 0}, {"nome":"Chocolate Laka Branco", "qtd": 0}, {"nome":"Chocolate Diamante Negro", "qtd": 0}, {"nome":"Halls Extra Forte", "qtd": 0}, {"nome":"Halls de Morango", "qtd": 0}, {"nome":"Trident de Hortelã", "qtd": 0}, {"nome":"Trident de Morango", "qtd": 0}]
let day = 0

var precoIngresso = 80
var lote = 1
var ingressosComprados = 0
var listaPessoasIngressos = JSON.parse(fs.readFileSync('ingressos.json'))
ingressosComprados = listaPessoasIngressos.length
var aindaVendendo = true

if(ingressosComprados<=29){
  precoIngresso = 80
  lote = 1
}else if(ingressosComprados>=30 && ingressosComprados<=69){
  precoIngresso = 95
  lote = 2
}else if(ingressosComprados>=70 && ingressosComprados<=99){
  precoIngresso = 95
  lote = 3
}else{
  precoIngresso = 999
  lote = 999
  aindaVendendo = false
}

let lastActions = []

function getUserIndex(id){
  let index = 0
  let i = 0 
  users.forEach(user => {
    if(user.id == id){
      index = i
    }
    i++
  })
  return index
}

function getAllOrder(){
  orders = [{"nome":"Parmegiana (Pequeno)", "qtd": 0}, {"nome":"Parmegiana (Grande)", "qtd": 0}, {"nome":"Strogonoff (Pequeno)", "qtd": 0}, {"nome":"Strogonoff (Grande)", "qtd": 0}, {"nome":"Almôndegas (Pequeno)", "qtd": 0}, {"nome":"Almôndegas (Grande)", "qtd": 0}, {"nome":"Feijoada (Pequeno)", "qtd": 0}, {"nome":"Feijoada (Grande)", "qtd": 0}, {"nome":"Alcatra (Pequeno)", "qtd": 0}, {"nome":"Alcatra (Grande)", "qtd": 0}, {"nome":"Chorizo (Pequeno)", "qtd": 0}, {"nome":"Chorizo (Grande)", "qtd": 0}, {"nome":"Filé Mignon (Pequeno)", "qtd": 0}, {"nome":"Filé Mignon (Grande)", "qtd": 0}, {"nome":"Frango (Pequeno)", "qtd": 0}, {"nome":"Frango (Grande)", "qtd": 0}, {"nome":"Hambúger Vegano (Pequeno)", "qtd": 0}, {"nome":"Hambúrger Vegano (Grande)", "qtd": 0}, {"nome":"Lombo (Pequeno)", "qtd": 0}, {"nome":"Lombo (Grande)", "qtd": 0}, {"nome":"Omelete (Pequeno)", "qtd": 0}, {"nome":"Omelete (Grande)", "qtd": 0}, {"nome":"Picanha (Pequeno)", "qtd": 0}, {"nome":"Picanha (Grande)", "qtd": 0}, {"nome":"Tilápia (Pequeno)", "qtd": 0}, {"nome":"Tilápia (Grande)", "qtd": 0}, {"nome":"Fritas (400g)", "qtd": 0}, {"nome":"Fritas com Bacon e Queijo (400g)", "qtd": 0}, {"nome":"Bolinhos de Bacalhau (15)", "qtd": 0}, {"nome":"Prato Kids", "qtd": 0}, {"nome":"Coca Cola Lata", "qtd": 0}, {"nome":"Coca Cola Zero Lata", "qtd": 0}, {"nome":"Suco de Uva (330ml)", "qtd": 0}, {"nome":"Suco de Pêssego (330ml)", "qtd": 0}, {"nome":"Suco de Manga (330ml)", "qtd": 0}, {"nome":"Água Natural", "qtd": 0}, {"nome":"Água com Gás", "qtd": 0}, {"nome":"H2OH!", "qtd": 0}, {"nome":"Bombom Sonho de Valsa", "qtd": 0}, {"nome":"Bombom Ouro Branco", "qtd": 0}, {"nome":"Brownie", "qtd": 0}, {"nome":"Chocolate 5 Star", "qtd": 0}, {"nome":"Chocolate Laka Branco", "qtd": 0}, {"nome":"Chocolate Diamante Negro", "qtd": 0}, {"nome":"Halls Extra Forte", "qtd": 0}, {"nome":"Halls de Morango", "qtd": 0}, {"nome":"Trident de Hortelã", "qtd": 0}, {"nome":"Trident de Morango", "qtd": 0}]
  allMoney = 0
  moneyToPay = 0
  users.forEach(user=>{
    user.pending.forEach(item=>{
      orders[item.id].qtd += item.qtd
      allMoney += item.qtd*foods[item.id].preco
      if(item.id<=26){
        moneyToPay += item.qtd*(foods[item.id].preco-5)
      }else if(item.id==27 || item.id==28 || item.id>=35){
        moneyToPay += item.qtd*(foods[item.id].preco-1)
      }
      else{
        moneyToPay += item.qtd*foods[item.id].preco
      }
    })
  })
}
function getNamedOrders(){
  let text = ""
  users.forEach(user => {
    if(user.pending!=[]){
    let comidas = ""
    user.pending.forEach(food=>{
      comidas+=foods[food.id].name+"x"+food.qtd+", "
    })
    if(comidas.length>2){
      text+=user.email+" - "+comidas+"\n"
    }
  }
  })
  return text
}

function getFinalOrders(){
  let text = ""
  let bebidas = ""
  let sobremesas = ""
  users.forEach(user => {
    if(user.pending!=[]){
    let comidas = ""
    user.pending.forEach(food=>{
      if(food.id<=29){
        comidas+=foods[food.id].name+"x"+food.qtd+", "
      }
    })
    if(comidas.length>2){
      text+=user.email+" - "+comidas+"\n"
    }
  }
  })
  let index = 0
  orders.forEach(order=>{
    if(foods[index].id>=30 && foods[index].id<=37 && order.qtd>0){
      bebidas+=order.nome+"x"+order.qtd+", "
    }
    if(foods[index].id>=38 && order.qtd>0){
      sobremesas+=order.nome+"x"+order.qtd+", "
    }
    index+=1
  })
  text+="\nBebidas - "
  text+=bebidas
  text+="\n\nSobremesas - "
  text+=sobremesas
  text+="\n\n"
  return text
}

function getPixKeys(){
  let text = ""
  users.forEach(user => {
    text+=user.email+" - "+user.chavePix+"\n"
  })
  return text
}

function getHighestProductId(){
  let highest = 0
  products.forEach(product=>{
    if(product.id>highest){
      highest = product.id
    }
  })
  return highest
}

function getProductIndexById(id){
  for(let i = 0; i < products.length; i++) {
    if(products[i].id == id) {
      return i
    }
  }   
}


app.get('/', function (req, res){
  res.write('index.html')
  res.end()
})
app.get('/adm', function (req, res){
  res.write('adm.html')
  res.end()
})

app.get('/admInfo', function (req, res){
  getAllOrder()
  res.write("Usuários \n")
  res.write(JSON.stringify(users))
  res.write("\n\n\n")
  res.write("Pedidos \n")
  orders.forEach(order=>{
    res.write(order.nome+": "+order.qtd+"\n")
  })
  res.write("\n\n\n")
  res.write("Total de ganhos: R$"+allMoney+"\n")
  res.write("\n")
  res.write("Total a pagar aproximado: R$"+moneyToPay+"  + (R$17)"+"\n")
  res.write("\n\n\n")
  res.write("Pedidos com Nome: \n")
  res.write(getNamedOrders())
  res.write("\n\n\n")
  res.write("Chaves Pix \n")
  res.write(getPixKeys())
  res.end()
})

app.get('/finalOrder', function (req, res){
  getAllOrder()
  res.write("O pedido é: \n\n")
  res.write(getFinalOrders())
  res.write("\n\n\n")
  res.write("No total são: \n\n")
  orders.forEach(order=>{
    if(order.qtd>0){
      res.write(order.nome+": "+order.qtd+"\n")
    }
  })
  res.write("\n\n\n")
  if(day==0 || day==2){
    res.write("Horário de Entrega: 12:20")
  }else{
    res.write("Horário de Entrega: 11:30")
  }
  res.end()
})

app.get('/ingressos', function (req, res){
  listaPessoasIngressos = JSON.parse(fs.readFileSync('ingressos.json'))
  res.write("Lista de pessoas:\n")
  listaPessoasIngressos.forEach(pessoa=>{
    res.write(pessoa+"\n")
  })
  res.write("\n\n\n")
  res.write("Total de Ingressos: "+ingressosComprados)
  let valorTotal = 0
  valorTotal+=ingressosComprados*80
  if(ingressosComprados>30){
    valorTotal+=(ingressosComprados-30)*15
  }
  //let valorAPagar = valorTotal-3*ingressosComprados
  res.write("\n\nValor recebido: "+valorTotal)
  //res.write("\n\nValor a pagar pra comissao: "+valorAPagar)
  res.end()
})

server.listen(80)

io.on('connection', socket => {  
  let id = socket.id
  socket.on('login', (email, senha) => {
    let found = false
    let user
    users.forEach(userF => {
        if(userF.email==email && userF.senha == senha){
            found = true
            user = userF
        }
    })
    if(found==true){
      io.to(id).emit("loginState", {state: "Success", userInfo: user})
      io.to(id).emit("getMPProducts", products)
    }else{
      io.to(id).emit("loginState", {state: "Fail"})
    }
  })
  socket.on('registrar', (email, senha, chavePix) => {
    let found = false
    if(email[email.length-1]==" "){
      email = email.substring(0, email.length-1)
    }
    users.forEach(user => {
      if(user.email==email || user.chavePix == chavePix){
          found = true
      }
    })
    if(found==true){
      io.to(id).emit("regState", {state: "Fail"})
    }else{
      io.to(id).emit("regState", {state: "Success"})
      users.push({"email": email, "senha":senha, "chavePix": chavePix, "id":users.length+1, "saldo":0, "cart":[], "pending":[]})
      fs.writeFile('users.json', JSON.stringify(users), (err) => {})
      lastActions.unshift(email+" criou sua conta ("+(new Date).getHours()+":"+(new Date).getMinutes()+")")
    }
  })
  socket.on('addToCart', (id, amount, accountID) => {
      let i = 0
      let found = false
      users.forEach(userF => {
        if(userF.id == accountID){
          let o = 0
          users[i].cart.forEach(item => {
            if(item.id == id){
              users[i].cart[o].qtd+=amount
              found = true
            }
            if(users[i].cart[o].qtd<1){
              users[i].cart.pop(o)
            }
            o++
          })
          if(found == false){
            users[i].cart.push({"id":id,"qtd":1})
          }
        }
        i++
      })
      fs.writeFile('users.json', JSON.stringify(users), (err) => {})  
  })
  socket.on('askUser', (accountID) => {
    users.forEach(user => {
      if(user.id == accountID){
        io.to(id).emit("updateUser", user)
      }
    })
  })
  socket.on("balancePayAsk", (accountID)=>{
    let index = getUserIndex(accountID)
    let total = 0
    let entire = ""
    users[index].cart.forEach(item=>{
      total+=item.qtd*foods[item.id].preco
      entire+=""+foods[item.id].name+"x"+item.qtd+", "
    })
    if(users[index].saldo>=total){
      users[index].saldo -=  total
      io.to(id).emit("balancePayResp", true, users[index].saldo)

      lastActions.unshift(users[index].email + " usou R$"+total+" para comprar: "+entire + " ("+(new Date).getHours()+":"+(new Date).getMinutes()+")")

      for (let i = 0; i < users[index].pending.length; i++) {
        let found = 0
        for (let o = 0; users[index].cart.length>0; o++) {
          if(users[index].pending[i].id == users[index].cart[found].id){
            users[index].pending[i].qtd+=users[index].cart[found].qtd
            users[index].cart.splice(found, 1)
          }else{
            found++
          }
        }
      }
      for (let p = 0; users[index].cart.length>0; p++) {
          if(users[index].cart[0]!=null){
            users[index].pending.push(users[index].cart[0])
          }  
          users[index].cart.splice(0, 1)
      }
      io.to(id).emit("updateUser", users[index])
      fs.writeFile('users.json', JSON.stringify(users), (err) => {})  
    }else{
      io.to(id).emit("balancePayResp", false, users[index].saldo)
    }
  })
  socket.on("ADMaddMoney", (key, amount)=>{
    let found = false
    for (let i = 0; i < users.length; i++){
      console.log(key)
      console.log(users[i].chavePix==key)
      if(users[i].chavePix==key && found==false){
        found = true
        users[i].saldo+=parseInt(amount)
        io.to(id).emit("ADMresult", "Deu certo")
        lastActions.unshift(users[i].email + " teve R$"+ amount +" adicionados a conta ("+(new Date).getHours()+":"+(new Date).getMinutes()+")")
      }
    }
    if(found==false){
      io.to(id).emit("ADMresult", "Usuario não encontrado")
    }
    fs.writeFile('users.json', JSON.stringify(users), (err) => {})  
  })
  socket.on("eraseOrders", a=>{
    if(day<3){
      day+=1
    }else{
      day=0
    }
    for (let i = 0; i < users.length; i++) {
      users[i].cart = []
      users[i].pending = []
    }
    lastActions.unshift("Todos pedidos apagados ("+(new Date).getHours()+":"+(new Date).getMinutes()+")")
  })
  socket.on("getDay", a=>{
    io.to(id).emit("day", day)
  })
  socket.on("getLastActions", a=>{
    io.to(id).emit("lastActions", lastActions)
  })
  socket.on("addDay", a=>{
    if(day<3){
      day+=1
    }else{
      day=0
    }
    io.to(id).emit("day", day)
  })
  socket.on("changeUserInfo", (userid, infoType, info)=>{
    for (let i = 0; i < users.length; i++) {
      if(users[i].id==userid){
        users[i][infoType] = info
        fs.writeFile('users.json', JSON.stringify(users), (err) => {})
        lastActions.unshift(infoType+" do usuário de ID "+userid+" foi alterado/a para "+ info)
      }
    }
  })
  socket.on("payTicketAsk", userid=>{
    if(ingressosComprados<=29){
      precoIngresso = 80
      lote = 1
    }else if(ingressosComprados>=30 && ingressosComprados<=69){
      precoIngresso = 95
      lote = 3
    }else if(ingressosComprados>=70 && ingressosComprados<=99){
      precoIngresso = 95
      lote = 3
    }else{
      precoIngresso = 999
      lote = 999
      aindaVendendo = false
    }
    if(users[getUserIndex(userid)].saldo>=precoIngresso){
      ingressosComprados+=1
      users[getUserIndex(userid)].saldo -= precoIngresso
      users[getUserIndex(userid)].hasTicket = true
      io.to(id).emit("ticketAnswer", true)
      listaPessoasIngressos.push(users[getUserIndex(userid)].email)
      fs.writeFile('users.json', JSON.stringify(users), (err) => {})
      fs.writeFile('ingressos.json', JSON.stringify(listaPessoasIngressos), (err) => {})
      lastActions.unshift("Ingresso comprado por "+users[getUserIndex(userid)].email)
    }else{
      io.to(id).emit("ticketAnswer", false)
    }
  
    if(ingressosComprados<=29){
      precoIngresso = 80
      lote = 1
    }else if(ingressosComprados>=30 && ingressosComprados<=69){
      precoIngresso = 95
      lote = 3
    }else if(ingressosComprados>=70 && ingressosComprados<=99){
      precoIngresso = 95
      lote = 3
    }else{
      precoIngresso = 999
      lote = 999
      aindaVendendo = false
    }
  })
  socket.on("getTicketPrice", a=>{
    if(ingressosComprados<=29){
      precoIngresso = 80
      lote = 1
    }else if(ingressosComprados>=30 && ingressosComprados<=69){
      precoIngresso = 95
      lote = 3
    }else if(ingressosComprados>=70 && ingressosComprados<=99){
      precoIngresso = 95
      lote = 3
    }else{
      precoIngresso = 999
      lote = 999
      aindaVendendo = false
    }
    let ticketResp = {"precoIngresso": precoIngresso, "lote": lote}
    socket.emit("ticketPriceAnswer", ticketResp)
  })

  socket.on("buyMarketplaceProductAsk", (userid, productid, obs)=>{
    let a = true
    if(products[getProductIndexById(productid)].definedStock==true){
      if(products[getProductIndexById(productid)].stock<=0){
        a = false
      }
    }
    if(users[getUserIndex(userid)].saldo>=products[getProductIndexById(productid)].preco && a==true){
      users[getUserIndex(userid)].saldo -= products[getProductIndexById(productid)].preco
      io.to(id).emit("buyMarketplaceProductAnswer", true)

      if(users[getUserIndex(userid)].recentItems==undefined){
        users[getUserIndex(userid)].recentItems = []
      }
      users[getUserIndex(userid)].recentItems.unshift(products[getProductIndexById(productid)].id)
      if(users[getUserIndex(userid)].recentItems.length>5){
        for(let i = 0; i < users[getUserIndex(userid)].recentItems.length-5; i++){
          users[getUserIndex(userid)].recentItems.pop(5)
        }
      }
      lastActions.unshift(users[getUserIndex(userid)].email + " comprou o produto "+products[getProductIndexById(productid)].nome+" ("+(new Date).getHours()+":"+(new Date).getMinutes()+")")
      if(products[getProductIndexById(productid)].definedStock==true){
        products[getProductIndexById(productid)].stock-=1
      }
      products[getProductIndexById(productid)].vendas+=1
      let lastSale = {}
      lastSale.userid = userid
      lastSale.username = users[getUserIndex(userid)].email
      lastSale.productid = productid
      lastSale.time = new Date().getTime()
      lastSale.obs = obs
      products[getProductIndexById(productid)].lastSales.unshift(lastSale)

      users[getUserIndex(products[getProductIndexById(productid)].ownerId)].saldo+=Math.round((products[getProductIndexById(productid)].preco-1)/1.1)

      fs.writeFile('products.json', JSON.stringify(products), (err) => {})
      io.to(id).emit("updateUser", users[getUserIndex(userid)])
      fs.writeFile('users.json', JSON.stringify(users), (err) => {})
    }else{
      io.to(id).emit("buyMarketplaceProductAnswer", false)
    }
  })
  socket.on("createProduct", (product, userid)=>{
    let newProduct = {}
    newProduct.id = getHighestProductId()+1
    newProduct.name = product.name
    newProduct.preco = Math.round(product.preco*1.1+1)
    newProduct.desc = product.desc
    newProduct.imagem = product.imagem
    newProduct.vendas = 0
    newProduct.definedStock = true
    newProduct.stock = 10
    newProduct.ownerId = userid
    newProduct.lastSales = []
    products.push(newProduct)
    fs.writeFile('products.json', JSON.stringify(products), (err) => {})
  })
  socket.on("toggleStock", (productid, state)=>{
    products[getProductIndexById(productid)].definedStock = state
    fs.writeFile('products.json', JSON.stringify(products), (err) => {})
  })
  socket.on("stockControl", (productid, change)=>{
    products[getProductIndexById(productid)].stock += change
    fs.writeFile('products.json', JSON.stringify(products), (err) => {})
  })
  socket.on("deleteMarketplaceProduct", productid=>{
    products.splice(getProductIndexById(productid), 1)
    fs.writeFile('products.json', JSON.stringify(products), (err) => {})
  })
})
