import { Module } from "@nestjs/common";
import { PaymentMicroserviceController } from "./payments.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";


@Module({
    imports: [NatsClientModule],
    controllers: [PaymentMicroserviceController],
    providers: []
})
export class PaymentsModule { }