import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';

import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { SearchFilters } from './dto/search-filters.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get()
  async findAll(@Query() searchFilters:SearchFilters):Promise<{}> {
    return{ 
      assistants: await this.asistenciaService.findAll(searchFilters),
      total: await this.asistenciaService.count() 
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.asistenciaService.findOne(id);
  // }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateAsistenciaDto: UpdateAsistenciaDto
  ):Promise<Asistencia> {
    return this.asistenciaService.update(id, updateAsistenciaDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ):Promise<Asistencia> {
    return this.asistenciaService.remove(id);
  }
}
