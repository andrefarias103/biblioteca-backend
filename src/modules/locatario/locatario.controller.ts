import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocatarioService } from './locatario.service';
import { CreateLocatarioDto } from './dto/create-locatario.dto';
import { UpdateLocatarioDto } from './dto/update-locatario.dto';

@Controller('locatario')
export class LocatarioController {
  constructor(private readonly locatarioService: LocatarioService) {}

  @Post()
  create(@Body() createLocatarioDto: CreateLocatarioDto) {
    return this.locatarioService.create(createLocatarioDto);
  }

  @Get()
  findAll() {
    return this.locatarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locatarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocatarioDto: UpdateLocatarioDto) {
    return this.locatarioService.update(+id, updateLocatarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locatarioService.remove(+id);
  }
}
