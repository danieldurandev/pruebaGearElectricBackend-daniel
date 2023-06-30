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
    const {id_number, email, mobile_phone} = createAsistenciaDto

    let assistant = await this.asistenciaRepository.findOneBy({id_number})

    if(assistant)
      throw new BadRequestException(`A user with this id_number (${assistant.id_number}) already exists`)

    assistant = await this.asistenciaRepository.findOneBy({email})

    if(assistant)
      throw new BadRequestException(`A user with this email (${assistant.email}) already exists`)

    assistant = await this.asistenciaRepository.findOneBy({mobile_phone})

    if(assistant)
      throw new BadRequestException(`A user with this phone number (${assistant.mobile_phone}) already exists`)

    assistant =  this.asistenciaRepository.create(createAsistenciaDto)
    await this.asistenciaRepository.save(assistant)
    return assistant
  }

  async findAll(searchFilters:SearchFilters):Promise<Asistencia[]> {

    const {names, last_names, type_of_document, id_number, email } = searchFilters

    const queryBuilder = this.asistenciaRepository.createQueryBuilder()


    if(names.length>0)
      queryBuilder.where("LOWER(names) LIKE :names", {
          names:`%${names.toLocaleLowerCase()}%`
      })

    if(last_names.length>0)
      queryBuilder.where("LOWER(last_names) LIKE :last_names", {
          last_names:`%${last_names.toLocaleLowerCase()}%`
      })
     
    if(email.length>0)
      queryBuilder.where("LOWER(email) LIKE :email", {
          email:`%${email.toLocaleLowerCase()}%`
      })

    if(id_number.length>0)
      queryBuilder.where("id_number LIKE :id_number", {
          id_number:`%${id_number}%`
      })


    if(type_of_document.length>0)
      queryBuilder.where("LOWER(type_of_document) LIKE :type_of_document", {
          type_of_document:`%${type_of_document.toLocaleLowerCase()}%`
      })

    queryBuilder.orderBy("names", "ASC")
    
    return await queryBuilder.getMany()
}


  async count():Promise<number> {
    return await this.asistenciaRepository.countBy({is_active: true})
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
