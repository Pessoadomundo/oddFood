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
const foods = [{"name": "Parmegiana (Pequeno)", "preco":20, "id":0, "img": "5.jpg"}, {"name": "Parmegiana (Grande)", "preco":22, "id":1, "img": "6.jpg"}, {"name": "Strogonoff (Pequeno)", "preco":20, "id":2, "img": "3.png"}, {"name": "Strogonoff (Grande)", "preco":22, "id":3, "img": "3_5.jpg"}, {"name": "Almôndegas (Pequeno)", "preco":20, "id":4, "img": "1.jpg"}, {"name": "Almôndegas (Grande)", "preco":22, "id":5, "img": "2.jpg"}, {"name": "Feijoada (Pequeno)", "preco":20, "id":6, "img": "7.jpeg"}, {"name": "Feijoada (Grande)", "preco":22, "id":7, "img": "8.jpg"}, {"name": "Alcatra (Pequeno)", "preco":31, "id":8, "img": "9.webp"}, {"name": "Alcatra (Grande)", "preco":34, "id":9, "img": "10.jpg"}, {"name": "Chorizo (Pequeno)", "preco":35, "id":10, "img": "11.jpg"}, {"name": "Chorizo (Grande)", "preco":39, "id":11, "img": "12.jpg"}, {"name": "Filé Mignon (Pequeno)", "preco":41, "id":12, "img": "13.webp"}, {"name": "Filé Migon (Grande)", "preco":44, "id":13, "img": "14.webp"}, {"name": "Frango (Pequeno)", "preco":22, "id":14, "img": "15.jpg"}, {"name": "Frango (Grande)", "preco":24, "id":15, "img": "16.jpg"}, {"name": "Hambúrger Vegano (Pequeno)", "preco":31, "id":16, "img": "17.jpg"}, {"name": "Hambúrguer Vegano (Grande)", "preco":34, "id":17, "img": "18.jpeg"}, {"name": "Lombo (Pequeno)", "preco":22, "id":18, "img": "19.jpg"}, {"name": "Lombo (Grande)", "preco":24, "id":19, "img": "19_5.jpg"}, {"name": "Omelete (Pequeno)", "preco":22, "id":20, "img": "20.jpeg"}, {"name": "Omelete (Grande)", "preco":24, "id":21, "img": "21.webp"}, {"name": "Picanha (Pequeno)", "preco":41, "id":22, "img": "22.jpg"}, {"name": "Picanha (Grande)", "preco":44, "id":23, "img": "22_5.jpg"}, {"name": "Tilápia (Pequeno)", "preco":31, "id":24, "img": "23.webp"}, {"name": "Tilápia (Grande)", "preco":34, "id":25, "img": "24.jpg"}, {"name": "Prato Kids", "preco":22, "id":26, "img": "25.jpg"}]
let orders = [{"nome":"Parmegiana (Pequeno)", "qtd": 0}, {"nome":"Parmegiana (Grande)", "qtd": 0}, {"nome":"Strogonoff (Pequeno)", "qtd": 0}, {"nome":"Strogonoff (Grande)", "qtd": 0}, {"nome":"Almôndegas (Pequeno)", "qtd": 0}, {"nome":"Almôndegas (Pequeno)", "qtd": 0}, {"nome":"Feijoada (Pequeno)", "qtd": 0}, {"nome":"Feijoada (Grande)", "qtd": 0}, {"nome":"Alcatra (Pequeno)", "qtd": 0}, {"nome":"Alcatra (Grande)", "qtd": 0}, {"nome":"Chorizo (Pequeno)", "qtd": 0}, {"nome":"Chorizo (Grande)", "qtd": 0}, {"nome":"Filé Mignon (Pequeno)", "qtd": 0}, {"nome":"Filé Mignon (Grande)", "qtd": 0}, {"nome":"Frango (Pequeno)", "qtd": 0}, {"nome":"Frango (Grande)", "qtd": 0}, {"nome":"Hambúger Vegano (Pequeno)", "qtd": 0}, {"nome":"Hambúrger Vegano (Grande)", "qtd": 0}, {"nome":"Lombo (Pequeno)", "qtd": 0}, {"nome":"Lombo (Grande)", "qtd": 0}, {"nome":"Omelete (Pequeno)", "qtd": 0}, {"nome":"Omelete (Grande)", "qtd": 0}, {"nome":"Picanha (Pequeno)", "qtd": 0}, {"nome":"Picanha (Grande)", "qtd": 0}, {"nome":"Tilápia (Pequeno)", "qtd": 0}, {"nome":"Tilápia (Grande)", "qtd": 0}, {"nome":"Prato Kids", "qtd": 0}]


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
  orders = [{"nome":"Parmegiana (Pequeno)", "qtd": 0}, {"nome":"Parmegiana (Grande)", "qtd": 0}, {"nome":"Strogonoff (Pequeno)", "qtd": 0}, {"nome":"Strogonoff (Grande)", "qtd": 0}, {"nome":"Almôndegas (Pequeno)", "qtd": 0}, {"nome":"Almôndegas (Pequeno)", "qtd": 0}, {"nome":"Feijoada (Pequeno)", "qtd": 0}, {"nome":"Feijoada (Grande)", "qtd": 0}, {"nome":"Alcatra (Pequeno)", "qtd": 0}, {"nome":"Alcatra (Grande)", "qtd": 0}, {"nome":"Chorizo (Pequeno)", "qtd": 0}, {"nome":"Chorizo (Grande)", "qtd": 0}, {"nome":"Filé Mignon (Pequeno)", "qtd": 0}, {"nome":"Filé Mignon (Grande)", "qtd": 0}, {"nome":"Frango (Pequeno)", "qtd": 0}, {"nome":"Frango (Grande)", "qtd": 0}, {"nome":"Hambúger Vegano (Pequeno)", "qtd": 0}, {"nome":"Hambúrger Vegano (Grande)", "qtd": 0}, {"nome":"Lombo (Pequeno)", "qtd": 0}, {"nome":"Lombo (Grande)", "qtd": 0}, {"nome":"Omelete (Pequeno)", "qtd": 0}, {"nome":"Omelete (Grande)", "qtd": 0}, {"nome":"Picanha (Pequeno)", "qtd": 0}, {"nome":"Picanha (Grande)", "qtd": 0}, {"nome":"Tilápia (Pequeno)", "qtd": 0}, {"nome":"Tilápia (Grande)", "qtd": 0}, {"nome":"Prato Kids", "qtd": 0}]
  allMoney = 0
  users.forEach(user=>{
    user.pending.forEach(item=>{
      orders[item.id].qtd += item.qtd
      allMoney += item.qtd*foods[item.id].preco
      //allMoney += item.qtd*(foods[item.id].preco+5)
    })
  })
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
  res.write(JSON.stringify(users))
  res.write("\n\n\n")
  res.write(JSON.stringify(orders))
  res.write("\n\n\n")
  orders.forEach(order=>{
    res.write(order.nome+": "+order.qtd+"\n")
  })
  res.write("\n\n\n")
  res.write("Total: "+allMoney+"\n")
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
        io.to(id).emit("ADMresult", "Deu certo zz")
      }
    }
    if(found==false){
      io.to(id).emit("ADMresult", "Usuario não encontrado zz")
    }
    fs.writeFile('users.json', JSON.stringify(users), (err) => {})  
  })
})

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