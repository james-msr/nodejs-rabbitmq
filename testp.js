const amqp = require('amqplib/callback_api');

for (i=0; i<=1000; i++){
    amqp.connect('amqp://admin:admin@192.168.89.200:5672', function(err, connection) {
        if (err) {
            throw err;
        }
    
        connection.createChannel(function(err, channel) {
            if (err) {
                throw err
            }
    
            const exchange = 'exchange'
            const msg = 'message'
    
            channel.assertExchange(exchange, 'fanout', {
                durable: false
                });
                channel.publish(exchange, '', Buffer.from(msg));
                console.log(" [x] Sent '%s'", msg);
            setTimeout(function () {
                console.log('Next request')
                connection.close();
                // process.exit(0)
            }, 100)
        });
    });
}
