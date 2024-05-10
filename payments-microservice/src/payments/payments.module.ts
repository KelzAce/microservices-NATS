import { Module } from "@nestjs/common";
import { PaymentMicroserviceController } from "./payments.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { PaymentsService } from "./payments.service";
import { Payment } from "src/typeorm/entities/Payment";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";


@Module({
    imports: [
        TypeOrmModule.forFeature([Payment, User]),
        NatsClientModule],
    controllers: [PaymentMicroserviceController],
    providers: [PaymentsService]
})
export class PaymentsModule { }