import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AluguelService } from './aluguel.service';
import { CreateAluguelDto } from './dto/create-aluguel.dto';
import { UpdateAluguelDto } from './dto/update-aluguel.dto';

@Controller('aluguel')
export class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post()
  create(@Body() createAluguelDto: CreateAluguelDto) {
    return this.aluguelService.create(createAluguelDto);
  }

  @Get()
  findAll() {
    return this.aluguelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aluguelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAluguelDto: UpdateAluguelDto) {
    return this.aluguelService.update(+id, updateAluguelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aluguelService.remove(+id);
  }
}
