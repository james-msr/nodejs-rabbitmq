import amqp from "amqplib/callback_api"

export class Producer {

    public producer(msg:any) {
        amqp.connect('amqp://admin:admin@192.168.89.200:5672', function(err, connection) {
            if (err) {
                throw err;
            }

            connection.createChannel(function(err, channel) {
                if (err) {
                    throw err
                }

                const exchange = 'exchange'

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
}
