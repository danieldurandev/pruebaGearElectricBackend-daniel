import { Injectable } from '@nestjs/common';
import { AsistenciaService } from './asistencia/asistencia.service';
import { seedDb } from './data/seedDb';

@Injectable()
export class AppService {
  
  constructor(
    private readonly asistenciaService:AsistenciaService
  ){}

  async seed(): Promise<string> {
    const seedPromises = []
    
    seedDb.forEach(seed => {
      seedPromises.push(this.asistenciaService.create(seed))
    })

    try {
      await Promise.all(seedPromises)
      return "okay"
    } catch (error) {
      console.log(error)
      throw Error(error)
    }

  }
}
