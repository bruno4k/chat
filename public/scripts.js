var socket = io('https://chat-pi2022.herokuapp.com/')

        function renderMessage(message){
            $('.messages').append('<div class="message"><strong style="color:'+message.color+';">'+message.author+'</strong>:'+message.message+'</div>')
        }

        socket.on('previousMessage', (messages)=>{
            for(message of messages){
                renderMessage(message)
            }
        })

        socket.on('receivedMessage', (message) => {
            renderMessage(message)
        })

        $('#chat').submit((event) =>{
            event.preventDefault()

            var author = $('input[name=username]').val()
            var message = $('input[name=mensagem]').val()
            var colorname = $('input[name=namecolor]').val()
            if (author.length && message.length) {
                var messageObject = {
                    author: author,
                    message: message,
                    color: colorname
                }
                renderMessage(messageObject)
                socket.emit('sendMessage',messageObject)
            }
        })