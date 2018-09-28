// src/communication.js

const zmq = require('zmq');

let receiver = null;
let sender = null; 
let subscriber = null;
let publisher = null;
let requester = null;
let responder = null;

// ZMQ Events
// connect - ZMQ_EVENT_CONNECTED
// connect_delay - ZMQ_EVENT_CONNECT_DELAYED
// connect_retry - ZMQ_EVENT_CONNECT_RETRIED
// listen - ZMQ_EVENT_LISTENING
// bind_error - ZMQ_EVENT_BIND_FAILED
// accept - ZMQ_EVENT_ACCEPTED
// accept_error - ZMQ_EVENT_ACCEPT_FAILED
// close - ZMQ_EVENT_CLOSED
// close_error - ZMQ_EVENT_CLOSE_FAILED
// disconnect - ZMQ_EVENT_DISCONNECTED

// Communication class
module.exports = class {

    constructor (config) {
        this.config = config;
        console.log(`zmq.com create`);
    }

    // send | receive 
    sender () {
        console.log(`zmq.com get sender`);
        if (sender) return sender;  // singleton
        
        console.log(`zmq.com create sender`);
        const socket = zmq.socket('push');
        socket.connect(`tcp://${config.host}:${config.port}`);
        sender = socket;
        return socket;
    }
    receiver () {
        console.log(`zmq.com get receiver`);
        if (receiver) return receiver;  // singleton

        console.log(`zmq.com create receiver`);
        const socket = zmq.socket('pull');
        socket.connect(`tcp://${config.host}:${config.port}`);
        receiver = socket;
        return socket;
    }

    // publish | subscribe 
    publisher () {
        console.log(`zmq.com get publisher`);
        if (publisher) return publisher;  // singleton
        
        console.log(`zmq.com create publisher`);
        const socket = zmq.socket('pub');
        socket.bind(`tcp://${config.host}:${config.port}`);
        publisher = socket;
        return socket;
    }
    subscriber () {
        console.log(`zmq.com get subscriber`);
        if (subscriber) return subscriber;  // singleton
        
        console.log(`zmq.com create subscriber`);
        const socket = zmq.socket('sub');
        socket.subscribe(''); //prefix
        socket.connect(`tcp://${config.host}:${config.port}`);
        subscriber = socket;
        return socket;
    }

    // request | respond
    requester () {
        console.log(`zmq.com get requester`);
        if (requester) return requester;  // singleton
        
        console.log(`zmq.com create requester`);
        const socket = zmq.socket('req');
        socket.connect(`tcp://${config.host}:${config.port}`); 
        requester = socket;
        return socket;
    }
    responder () {
        console.log(`zmq.com get responder`);
        if (responder) return responder;  // singleton
        
        console.log(`zmq.com create responder`);
        const socket = zmq.socket('rep');
        socket.bind(`tcp://${config.host}:${config.port}`);
        responder = socket;
        return socket;
    }

    static close () {
        closeAllSockets();
        console.log(`zmq.com closed`);
    }
}

const closeAllSockets = function () {
    if (receiver) { 
        receiver.close();
        receiver = null;
    }
    if (sender) {
        sender.close();
        sender = null;
    }
    if (subscriber) {
        subscriber.close();
        subscriber = null;
    }
    if (publisher) {
        publisher.close();
        publisher = null;
    }
    if (requester) {
        requester.close();
        requester = null;
    }
    if (responder) {
        responder.close();
        responder = null;
    }
}



        // const sock = zmq.socket('push');
        // sock.bindSync('tcp://127.0.0.1:3000');
        // setInterval(function(){
        //     console.log('sending work');
        //     sock.send('some work');
        // }, 500);

//     sock = zmq.socket('pull');    
//     sock.connect('tcp://127.0.0.1:3000');
//     sock.on('message', function(msg){
//     console.log('work: %s', msg.toString());
//     });

//         , sock = zmq.socket('pub');        
//         sock.bindSync('tcp://127.0.0.1:3000');        
//         setInterval(function(){
//         console.log('sending a multipart message envelope');
//         sock.send(['kitty cats', 'meow!']);
//         }, 500);

//     , sock = zmq.socket('sub');    
//     sock.connect('tcp://127.0.0.1:3000');
//     sock.subscribe('kitty cats');    
//     sock.on('message', function(topic, message) {
//     console.log('received a message related to:', topic, 'containing message:', message);
//     });
// }
