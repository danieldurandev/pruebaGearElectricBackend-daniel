import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';

import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';
import { SearchFilters } from './dto/search-filters.dto';

@Injectable()
export class AsistenciaService {

  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository:Repository<Asistencia>
  ){}

  async create(createAsistenciaDto: CreateAsistenciaDto):Promise<Asistencia> {
    const {idNumber, email, mobilePhone} = createAsistenciaDto

    let assistant = await this.asistenciaRepository.findOneBy({idNumber})

    if(assistant)
      throw new BadRequestException(`A user with this idNumber (${assistant.idNumber}) already exists`)

    assistant = await this.asistenciaRepository.findOneBy({email})

    if(assistant)
      throw new BadRequestException(`A user with this email (${assistant.email}) already exists`)

    assistant = await this.asistenciaRepository.findOneBy({mobilePhone})

    if(assistant)
      throw new BadRequestException(`A user with this phone number (${assistant.mobilePhone}) already exists`)

    assistant =  this.asistenciaRepository.create(createAsistenciaDto)
    await this.asistenciaRepository.save(assistant)
    return assistant
  }

  async findAll(searchFilters:SearchFilters):Promise<Asistencia[]> {

    const {names, lastNames, typeOfDocument, idNumber, email } = searchFilters

  return await this.asistenciaRepository.findBy({
    names: Like(`%${names}%`),
    lastNames: Like(`%${lastNames}%`),
    typeOfDocument: Like(`%${typeOfDocument}%`),
    idNumber: Like(`%${idNumber}%`),
    email: Like(`%${email}%`),
  })
  }

  async count():Promise<number> {
    return await this.asistenciaRepository.countBy({isActive: true})
  }

  // async findOne(id: string):Promise<Asistencia> {
  //   return await this.asistenciaRepository.findOneBy({id})
  // }

  async update(id: string, updateAsistenciaDto: UpdateAsistenciaDto):Promise<Asistencia> {
    let assistantToUpdate = await this.asistenciaRepository.findOneBy({id})

    if(!assistantToUpdate)
      throw new NotFoundException(`assistant with id ${id} not found`)

    assistantToUpdate = {...assistantToUpdate, ...updateAsistenciaDto}

    return await this.asistenciaRepository.save(assistantToUpdate)
  }

  async remove(id: string) {
    let assistantToRemove = await this.asistenciaRepository.findOneBy({id})

    if(!assistantToRemove)
      throw new NotFoundException(`assistant with id ${id} not found`)

    return await this.asistenciaRepository.remove(assistantToRemove)
  }
}
