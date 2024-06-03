import { Injectable } from '@nestjs/common';
import { CreateAluguelDto } from './dto/create-aluguel.dto';
import { UpdateAluguelDto } from './dto/update-aluguel.dto';

@Injectable()
export class AluguelService {
  create(createAluguelDto: CreateAluguelDto) {
    return 'This action adds a new aluguel';
  }

  findAll() {
    return `This action returns all aluguel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aluguel`;
  }

  update(id: number, updateAluguelDto: UpdateAluguelDto) {
    return `This action updates a #${id} aluguel`;
  }

  remove(id: number) {
    return `This action removes a #${id} aluguel`;
  }
}
