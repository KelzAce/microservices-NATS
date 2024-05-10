import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Payment } from "src/typeorm/entities/Payment";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dtos/CreatePayment.dto";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { User } from "src/typeorm/entities/User";

//injectable makes it a provider
@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment) private paymentsRepository: 
        Repository<Payment>,
        @Inject('NATS_SERVICE') private natsClient: ClientProxy
    ){}

    async createPayment({userId, ...createPaymentDto}: CreatePaymentDto) {

        //SO because the .send method returns an observable, we cant assign the value by merely assigning it to a variable
        // We use the LastValueFrom 'rxjs' to get the value
        // const user = this.natsClient.send({cmd: 'getUserById'}, {userId})
        const user = await lastValueFrom<User>(
            this.natsClient.send({ cmd: 'getUserById'}, {userId})
        );

        console.log(user);
        if(user) {
            const newPayment = this.paymentsRepository.create({
                ...createPaymentDto, 
                user});
                return this.paymentsRepository.save(newPayment)
        }

        return null
    }
}