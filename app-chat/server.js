var app = require('express')();
// passa o express para o http-server
var http = require('http').Server(app);
// passa o http-server par ao socketio
var io = require('socket.io')(http);
 
// cria uma rota para fornecer o arquivo index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
// sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
 
// inicia o servidor na porta informada, no caso vamo iniciar na porta 3000
const PORT = process.env.PORT || 3000
http.listen(PORT, ()=>{
  console.log('Server rodando na porta',PORT)
})