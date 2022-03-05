if(process.env.NODE_ENV !== "production"){
  require("dotenv").config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


const _pix = require('faz-um-pix');

const code = _pix.Pix("+5531988088186", "Gabriel Jota Lizardo", "Belo Horizonte", "10", "Penis");

const qrcode = _pix.Pix("+5531988088186", "Gabriel Jota Lizardo", "Belo Horizonte", "10", "Penis", true);


console.log(code)
console.log(qrcode)




const cons = require('consolidate');
var express = require('express')
var fs = require("fs")
var app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const stripe = require('stripe')(stripeSecretKey)
bodyParser = require("body-parser")


app.use(express.static('./views'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

let rawdata = fs.readFileSync('users.json')
var users = JSON.parse(rawdata)
const foods = [{"name": "Filé Mignon", "preco":25, "id":0, "img": "comida.jpg"}, {"name": "Picanha", "preco":30, "id":1, "img": "comida2.png"}]
let orders = [{"nome":"File Mignon", "qtd": 0}, {"nome":"Picanha", "qtd": 0}]


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
  orders = [{"nome":"File Mignon", "qtd": 0}, {"nome":"Picanha", "qtd": 0}]
  allMoney = 0
  users.forEach(user=>{
    user.pending.forEach(item=>{
      orders[item.id].qtd += item.qtd
      allMoney += item.qtd*foods[item.id].preco
    })
  })
}

app.get('/', function (req, res){
  res.write('index.html')
  res.end()
})
app.get('/adm', function (req, res){
  getAllOrder()
  res.write(JSON.stringify(orders))
  res.write("\n\n\n")
  orders.forEach(order=>{
    res.write(order.nome+": "+order.qtd+"\n")
  })
  res.write("\n\n\n")
  res.write("Total: "+allMoney+"\n")
  res.end()
})
app.get('/pagamento', function (req, res){
  
})

const endpointSecret = "whsec_9fb5d7e9f4e4ef10f5e4c3cfd72444d02ad410dd875726112c9da97f6db2d9fe";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  console.log("a")

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
})

app.post('/purchase', function(req, res) {
      let total = 0
      console.log(req.body)
      
      users[req.body.userid].cart.forEach(item=>{
        total+=item.qtd*foods[item.id].preco
      })

      stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenId,
        currency: 'brl'
      }).then(function() {
        console.log('Charge Successful')
        res.json({ message: 'Successfully purchased items' })
      }).catch(function() {
        console.log('Charge Fail')
        res.status(500).end()
      })
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
  socket.on('registrar', (email, senha) => {
    let found = false
    users.forEach(user => {
      if(user.email==email){
          found = true
      }
    })
    if(found==true){
      io.to(id).emit("regState", {state: "Fail"})
    }else{
      io.to(id).emit("regState", {state: "Success"})
      users.push({"email": email, "senha":senha, "id":users.length+1, "saldo":0, "cart":[], "pending":[]})
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
})

async function a(){
  setInterval(()=>{
    if((new Date).getHours()==13){
      users.forEach(user=>{
        user.cart = []
        user.pending = []
      })
    }
  },6000000)
}
a()