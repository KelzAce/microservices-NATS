import {Module} from '@nestjs/common'
import { UsersMicroserviceControllers } from './users.controller';


@Module({
    imports: [],
    controllers: [UsersMicroserviceControllers],
    providers: []
})

export class UsersModule {}