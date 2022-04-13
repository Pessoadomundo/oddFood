/*const _pix = require('faz-um-pix');

const code = _pix.Pix("+5531988088186", "Gabriel Jota Lizardo", "Belo Horizonte", "10", "Penis");

const qrcode = _pix.Pix("+5531988088186", "Gabriel Jota Lizardo", "Belo Horizonte", "10", "Penis", true);


console.log(code)
console.log(qrcode)
*/
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
const foods = [{"name": "Parmegiana (Pequeno)", "preco":20, "id":0, "img": "5.jpg"}, {"name": "Parmegiana (Grande)", "preco":22, "id":1, "img": "6.jpg"}, {"name": "Strogonoff (Pequeno)", "preco":20, "id":2, "img": "3.png"}, {"name": "Strogonoff (Grande)", "preco":22, "id":3, "img": "3_5.jpg"}, {"name": "Almôndegas (Pequeno)", "preco":20, "id":4, "img": "1.jpg"}, {"name": "Almôndegas (Grande)", "preco":22, "id":5, "img": "2.jpg"}, {"name": "Alcatra (Pequeno)", "preco":31, "id":6, "img": "9.webp"}, {"name": "Alcatra (Grande)", "preco":34, "id":7, "img": "10.jpg"}, {"name": "Chorizo (Pequeno)", "preco":35, "id":8, "img": "11.jpg"}, {"name": "Chorizo (Grande)", "preco":39, "id":9, "img": "12.jpg"}, {"name": "Filé Mignon (Pequeno)", "preco":41, "id":10, "img": "13.webp"}, {"name": "Filé Migon (Grande)", "preco":44, "id":11, "img": "14.webp"}, {"name": "Frango (Pequeno)", "preco":22, "id":12, "img": "15.jpg"}, {"name": "Frango (Grande)", "preco":24, "id":13, "img": "16.jpg"}, {"name": "Hambúrger Vegano (Pequeno)", "preco":31, "id":14, "img": "17.jpg"}, {"name": "Hambúrguer Vegano (Grande)", "preco":34, "id":15, "img": "18.jpeg"}, {"name": "Lombo (Pequeno)", "preco":22, "id":16, "img": "19.jpg"}, {"name": "Lombo (Grande)", "preco":24, "id":17, "img": "19_5.jpg"}, {"name": "Omelete (Pequeno)", "preco":22, "id":18, "img": "20.jpeg"}, {"name": "Omelete (Grande)", "preco":24, "id":19, "img": "21.webp"}, {"name": "Picanha (Pequeno)", "preco":41, "id":20, "img": "22.jpg"}, {"name": "Picanha (Grande)", "preco":44, "id":21, "img": "22_5.jpg"}, {"name": "Tilápia (Pequeno)", "preco":31, "id":22, "img": "23.webp"}, {"name": "Tilápia (Grande)", "preco":34, "id":23, "img": "24.jpg"}, {"name": "Sanduíche de Frango", "preco":20, "id":24, "img": "26.jpg"}, {"name": "Sanduíche de Alcatra", "preco":25, "id":25, "img": "27.jpg"}, {"name": "Sanduíche de Filé Mignon", "preco":33, "id":26, "img": "28.jpg"}, {"name": "Fritas (400g)", "preco":25, "id":27, "img": "29.jpg"}, {"name": "Fritas com Bacon e Queijo (400g)", "preco":35, "id":28, "img": "30.jpg"}, {"name": "Bolinhos de Bacalhau (15)", "preco":34, "id":29, "img": "31.jpg"}, {"name": "Prato Kids", "preco":22, "id":30, "img": "25.webp"}, {"name": "Coca Cola Lata", "preco":6, "id":31, "img": "b1.png"}, {"name": "Coca Cola Zero Lata", "preco":6, "id":32, "img": "b2.png"}, {"name": "Suco de Uva (330ml)", "preco":6, "id":33, "img": "b3.png"}, {"name": "Suco de Pêssego (330ml)", "preco":6, "id":34, "img": "b4.png"}, {"name": "Suco de Manga (330ml)", "preco":6, "id":35, "img": "b5.png"}, {"name": "Água Natural", "preco":4, "id":36, "img": "b6.png"}, {"name": "Água com Gás", "preco":4, "id":37, "img": "b7.png"}, {"name": "H2OH!", "preco":6, "id":38, "img": "b8.png"}, {"name": "Bombom Sonho de Valsa", "preco":3, "id":39, "img": "c1.png"}, {"name": "Bombom Ouro Branco", "preco":3, "id":40, "img": "c2.png"}, {"name": "Brownie", "preco":7, "id":41, "img": "c3.jpg"}, {"name": "Chocolate 5 Star", "preco":5, "id":42, "img": "c4.png"}, {"name": "Chocolate Laka Branco", "preco":4, "id":43, "img": "c5.png"}, {"name": "Chocolate Diamante Negro", "preco":4, "id":44, "img": "c6.png"}, {"name": "Halls Extra Forte", "preco":3, "id":45, "img": "c7.png"}, {"name": "Halls de Morango", "preco":3, "id":46, "img": "c8.png"}, {"name": "Trident de Hortelã", "preco":3, "id":47, "img": "c9.png"}, {"name": "Trident de Morango", "preco":3, "id":48, "img": "c10.png"}]
let orders = [{"nome":"Parmegiana (Pequeno)", "qtd": 0}, {"nome":"Parmegiana (Grande)", "qtd": 0}, {"nome":"Strogonoff (Pequeno)", "qtd": 0}, {"nome":"Strogonoff (Grande)", "qtd": 0}, {"nome":"Almôndegas (Pequeno)", "qtd": 0}, {"nome":"Almôndegas (Grande)", "qtd": 0}, {"nome":"Alcatra (Pequeno)", "qtd": 0}, {"nome":"Alcatra (Grande)", "qtd": 0}, {"nome":"Chorizo (Pequeno)", "qtd": 0}, {"nome":"Chorizo (Grande)", "qtd": 0}, {"nome":"Filé Mignon (Pequeno)", "qtd": 0}, {"nome":"Filé Mignon (Grande)", "qtd": 0}, {"nome":"Frango (Pequeno)", "qtd": 0}, {"nome":"Frango (Grande)", "qtd": 0}, {"nome":"Hambúger Vegano (Pequeno)", "qtd": 0}, {"nome":"Hambúrger Vegano (Grande)", "qtd": 0}, {"nome":"Lombo (Pequeno)", "qtd": 0}, {"nome":"Lombo (Grande)", "qtd": 0}, {"nome":"Omelete (Pequeno)", "qtd": 0}, {"nome":"Omelete (Grande)", "qtd": 0}, {"nome":"Picanha (Pequeno)", "qtd": 0}, {"nome":"Picanha (Grande)", "qtd": 0}, {"nome":"Tilápia (Pequeno)", "qtd": 0}, {"nome":"Tilápia (Grande)", "qtd": 0}, {"nome":"Sanduíche de Frango", "qtd": 0}, {"nome":"Sanduíche de Alcatra", "qtd": 0}, {"nome":"Sanduíche de Filé Mignon", "qtd": 0}, {"nome":"Fritas (400g)", "qtd": 0}, {"nome":"Fritas com Bacon e Queijo (400g)", "qtd": 0}, {"nome":"Bolinhos de Bacalhau (15)", "qtd": 0}, {"nome":"Prato Kids", "qtd": 0}, {"nome":"Coca Cola Lata", "qtd": 0}, {"nome":"Coca Cola Zero Lata", "qtd": 0}, {"nome":"Suco de Uva (330ml)", "qtd": 0}, {"nome":"Suco de Pêssego (330ml)", "qtd": 0}, {"nome":"Suco de Manga (330ml)", "qtd": 0}, {"nome":"Água Natural", "qtd": 0}, {"nome":"Água com Gás", "qtd": 0}, {"nome":"H2OH!", "qtd": 0}, {"nome":"Bombom Sonho de Valsa", "qtd": 0}, {"nome":"Bombom Ouro Branco", "qtd": 0}, {"nome":"Brownie", "qtd": 0}, {"nome":"Chocolate 5 Star", "qtd": 0}, {"nome":"Chocolate Laka Branco", "qtd": 0}, {"nome":"Chocolate Diamante Negro", "qtd": 0}, {"nome":"Halls Extra Forte", "qtd": 0}, {"nome":"Halls de Morango", "qtd": 0}, {"nome":"Trident de Hortelã", "qtd": 0}, {"nome":"Trident de Morango", "qtd": 0}]
let day = 0

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
  orders = [{"nome":"Parmegiana (Pequeno)", "qtd": 0}, {"nome":"Parmegiana (Grande)", "qtd": 0}, {"nome":"Strogonoff (Pequeno)", "qtd": 0}, {"nome":"Strogonoff (Grande)", "qtd": 0}, {"nome":"Almôndegas (Pequeno)", "qtd": 0}, {"nome":"Almôndegas (Grande)", "qtd": 0}, {"nome":"Alcatra (Pequeno)", "qtd": 0}, {"nome":"Alcatra (Grande)", "qtd": 0}, {"nome":"Chorizo (Pequeno)", "qtd": 0}, {"nome":"Chorizo (Grande)", "qtd": 0}, {"nome":"Filé Mignon (Pequeno)", "qtd": 0}, {"nome":"Filé Mignon (Grande)", "qtd": 0}, {"nome":"Frango (Pequeno)", "qtd": 0}, {"nome":"Frango (Grande)", "qtd": 0}, {"nome":"Hambúger Vegano (Pequeno)", "qtd": 0}, {"nome":"Hambúrger Vegano (Grande)", "qtd": 0}, {"nome":"Lombo (Pequeno)", "qtd": 0}, {"nome":"Lombo (Grande)", "qtd": 0}, {"nome":"Omelete (Pequeno)", "qtd": 0}, {"nome":"Omelete (Grande)", "qtd": 0}, {"nome":"Picanha (Pequeno)", "qtd": 0}, {"nome":"Picanha (Grande)", "qtd": 0}, {"nome":"Tilápia (Pequeno)", "qtd": 0}, {"nome":"Tilápia (Grande)", "qtd": 0}, {"nome":"Sanduíche de Frango", "qtd": 0}, {"nome":"Sanduíche de Alcatra", "qtd": 0}, {"nome":"Sanduíche de Filé Mignon", "qtd": 0}, {"nome":"Fritas (400g)", "qtd": 0}, {"nome":"Fritas com Bacon e Queijo (400g)", "qtd": 0}, {"nome":"Bolinhos de Bacalhau (15)", "qtd": 0}, {"nome":"Prato Kids", "qtd": 0}, {"nome":"Coca Cola Lata", "qtd": 0}, {"nome":"Coca Cola Zero Lata", "qtd": 0}, {"nome":"Suco de Uva (330ml)", "qtd": 0}, {"nome":"Suco de Pêssego (330ml)", "qtd": 0}, {"nome":"Suco de Manga (330ml)", "qtd": 0}, {"nome":"Água Natural", "qtd": 0}, {"nome":"Água com Gás", "qtd": 0}, {"nome":"H2OH!", "qtd": 0}, {"nome":"Bombom Sonho de Valsa", "qtd": 0}, {"nome":"Bombom Ouro Branco", "qtd": 0}, {"nome":"Brownie", "qtd": 0}, {"nome":"Chocolate 5 Star", "qtd": 0}, {"nome":"Chocolate Laka Branco", "qtd": 0}, {"nome":"Chocolate Diamante Negro", "qtd": 0}, {"nome":"Halls Extra Forte", "qtd": 0}, {"nome":"Halls de Morango", "qtd": 0}, {"nome":"Trident de Hortelã", "qtd": 0}, {"nome":"Trident de Morango", "qtd": 0}]
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
      console.log(food)
      comidas+=foods[food.id].name+"x"+food.qtd+", "
    })
    if(comidas.length>2){
      text+=user.email+" - "+comidas+"\n"
    }
  }
  })
  return text
}

function getPixKeys(){
  let text = ""
  users.forEach(user => {
    text+=user.email+" - "+user.chavePix+"\n"
  })
  return text
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
    users[index].cart.forEach(item=>{
      total+=item.qtd*foods[item.id].preco
    })
    if(users[index].saldo>=total){
      users[index].saldo -=  total
      io.to(id).emit("balancePayResp", true, users[index].saldo)
      for (let i = 0; i < users[index].pending.length; i++) {
        let found = 0
        for (let o = 0; o < users[index].cart.length; o++) {
          if(users[index].pending[i].id == users[index].cart[found].id){
            users[index].pending[i].qtd+=users[index].cart[found].qtd
            users[index].cart.splice(found, 1)
          }else{
            found++
          }
        }
      }
      
      for (let p = 0; p <= users[index].cart.length; p++) {
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
  })
  socket.on("getDay", a=>{
    io.to(id).emit("day", day)
  })
  socket.on("addDay", a=>{
    if(day<3){
      day+=1
    }else{
      day=0
    }
    io.to(id).emit("day", day)
  })
})

/*
async function a(){
  setInterval(()=>{
    if((new Date).getHours()==13){
      if([2,3,4,5,6].includes((new Date).getDay)){
        users.forEach(user=>{
          user.cart = []
          user.pending = []
        })
      }
    }
  },6000000)
}
a()

*/