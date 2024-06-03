import { PartialType } from '@nestjs/mapped-types';
import { CreateAluguelDto } from './create-aluguel.dto';

export class UpdateAluguelDto extends PartialType(CreateAluguelDto) {}
