import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';

@Module({
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
  imports: [
    TypeOrmModule.forFeature([Asistencia])
  ],
  exports: [
    TypeOrmModule,
    AsistenciaService
  ]
})
export class AsistenciaModule {}
