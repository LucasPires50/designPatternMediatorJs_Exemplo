var Participant = function (name) {
    this.name = name;
    this.chatroom = null;
};

Participant.prototype = {
    send: function (message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function (message, from) {
        log.add(from.name + " to " + this.name + ": " + message);
    }
};

//Mediador
var Chatroom = function () {
    var participants = {};

    return {

        register: function (participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },

        send: function (message, from, to) {
            if (to) {                      // Recebe a Mensagem 
                to.receive(message, from);
            } else {                       // Mensagem de transmissão
                for (key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};

// log
var log = (function () {
    var log = "";

    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

function run() {
    //Cada participante é registrado por um objeto "Participant"
    var yoko = new Participant("Yoko");
    var john = new Participant("John");
    var paul = new Participant("Paul");
    var ringo = new Participant("Ringo");

    var chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);

    yoko.send("Bom dia");
    yoko.send("Tudo certo?");
    john.send("Bom dia, tudo certo.", yoko);
    paul.send("Bom dia");
    ringo.send("Opa, como você está?", paul);

    log.show();
}

console.log = run();