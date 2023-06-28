import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [AsistenciaModule, /*ConfigModule.forRoot()*/ ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
