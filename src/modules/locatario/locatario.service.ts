import { Injectable } from '@nestjs/common';
import { CreateLocatarioDto } from './dto/create-locatario.dto';
import { UpdateLocatarioDto } from './dto/update-locatario.dto';

@Injectable()
export class LocatarioService {
  create(createLocatarioDto: CreateLocatarioDto) {
    return 'This action adds a new locatario';
  }

  findAll() {
    return `This action returns all locatario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locatario`;
  }

  update(id: number, updateLocatarioDto: UpdateLocatarioDto) {
    return `This action updates a #${id} locatario`;
  }

  remove(id: number) {
    return `This action removes a #${id} locatario`;
  }
}
