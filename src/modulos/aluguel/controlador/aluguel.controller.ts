import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CadastraAluguelDto } from '../dto/cadastra-aluguel.dto';
import { ListaAluguelDto } from '../dto/lista-aluguel.dto';
import { AluguelService } from '../servico/aluguel.service';

@Controller('aluguel')
export class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post()
  @ApiOperation({ summary: 'Realizar reserva' })
  @ApiResponse({
    status: 201,
    description: 'Realizar reserva do livro com sucesso',
  })
  async cadastrar(
    @Body() dadosAluguel: CadastraAluguelDto,
  ): Promise<ListaAluguelDto> {
    return await this.aluguelService.cadastrar(dadosAluguel);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desfazer reserva' })
  async remover(@Param('id') id: string) {
    return await this.aluguelService.remover(id);
  }
}
