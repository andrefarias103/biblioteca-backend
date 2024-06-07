import { CadastraAluguelDto } from "../dto/cadastra-aluguel.dto";
import { ListaAluguelDto } from "../dto/lista-aluguel.dto";

export interface IAluguelRepositorio {
    cadastrar(data: CadastraAluguelDto): Promise<ListaAluguelDto>;
    remover(id: string);
    // buscaPorDisponiveis(): Promise<ListaAluguelDto[] | null>;
    // buscaPorReservados(): Promise<ListaAluguelDto[] | null>;
    // buscaPorReservadosPorLocacao(id: string): Promise<ListaAluguelDto[]> | null;
    // Outros métodos...
  }