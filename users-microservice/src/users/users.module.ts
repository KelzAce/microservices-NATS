import {Module} from '@nestjs/common'
import { UsersMicroserviceControllers } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Payment } from 'src/typeorm/entities/Payment';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Payment
        ])
    ],
    controllers: [UsersMicroserviceControllers],
    providers: []
})

export class UsersModule {}