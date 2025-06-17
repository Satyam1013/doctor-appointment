import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsTeamService } from './team.service';
import { DoctorsTeamController } from './team.controller';
import { DoctorsTeam, DoctorsTeamSchema } from './team.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DoctorsTeam.name, schema: DoctorsTeamSchema },
    ]),
    UserModule,
  ],
  controllers: [DoctorsTeamController],
  providers: [DoctorsTeamService],
  exports: [DoctorsTeamService],
})
export class DoctorsTeamModule {}
