import { Controller, Inject } from "@nestjs/common"
import { ClientProxy, EventPattern, Payload } from "@nestjs/microservices";
import { CreatePaymentDto } from "./dtos/CreatePayment.dto";


@Controller()
export class PaymentMicroserviceController {

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy){}

    @EventPattern({cmd: 'createPayment'})
    createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
        console.log(createPaymentDto)
        this.natsClient.emit('paymentCreated', createPaymentDto)
    }
}