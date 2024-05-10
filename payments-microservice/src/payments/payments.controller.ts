import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, EventPattern, Payload } from "@nestjs/microservices";
import { CreatePaymentDto } from "./dtos/CreatePayment.dto";
import { PaymentsService } from "./payments.service";


@Controller()
export class PaymentMicroserviceController {
    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy, 
        private paymentService: PaymentsService
    ){}

    @EventPattern({cmd: 'createPayment'})
    async createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
        console.log(createPaymentDto)
        const newPayment = await this.paymentService.createPayment(createPaymentDto)
      if(newPayment) {
        this.natsClient.emit('paymentCreated', newPayment)
      }
    }
}