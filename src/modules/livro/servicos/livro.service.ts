import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IAutorPorLivroRepositorio } from "src/modules/autorPorLivro/interfaces/autorPorLivro-interface";
import { IAutorRepositorio } from "../../../modules/autor/interfaces/autor-repositorio.interface";
import { AtualizaLivroDto } from "../dto/atualiza-livro.dto";
import { CadastraLivroDto } from "../dto/cadastra-livro.dto";
import { ListaLivroDto } from "../dto/lista-livro.dto";
import { ILivroRepositorio } from '../interfaces/livro-repositorio.interface';
import { AUTORPORLIVRO_REPOSITORIO, AUTOR_REPOSITORIO, LIVRO_REPOSITORIO } from './../../../common/constantes/constantes';

@Injectable()
export class LivroService {
    constructor(@Inject(LIVRO_REPOSITORIO) private readonly livroRepositorio: ILivroRepositorio,
                @Inject(AUTOR_REPOSITORIO) private readonly autorRepositorio: IAutorRepositorio,
                @Inject(AUTORPORLIVRO_REPOSITORIO) private readonly autorporLivroRepositotio: IAutorPorLivroRepositorio) {}

            
    async cadastrar(dadosLivro: CadastraLivroDto):Promise<ListaLivroDto> {

        const {autorPorLivros} = dadosLivro;
      
        if (!autorPorLivros) {
          throw new HttpException(`Não foi informado nenhum autor`, HttpStatus.NOT_FOUND);
        }

        const verificacaoAutores: Boolean = await this.autorRepositorio.checaSeTodosIdsExistem(autorPorLivros);
        if (!verificacaoAutores) {
            throw new HttpException(`Autor não encontrado na lista`, HttpStatus.NOT_FOUND);
          }

        const livro = await this.livroRepositorio.cadastrar(dadosLivro);

        autorPorLivros.map(async (autor: string) => {
          const dadosAutor = { livroId: livro.id, autorId: autor};
          return await this.autorporLivroRepositotio.cadastrar(dadosAutor)
        })

        return livro;

      }    


      async atualizar(id: string, dadosLivro: AtualizaLivroDto) {
        return await this.livroRepositorio.atualizar(id, dadosLivro);
      }
    
      
      async remover(id: string) {
        return await this.livroRepositorio.remover(id);
      }      

      findAll() {
        return `This action returns all book`;
      }
    
      findOne(id: number) {
        return `This action returns a #${id} book`;
      }

      async buscaLivroPorId(id: string): Promise<ListaLivroDto> {
        const livro = await this.livroRepositorio.buscaPorId(id);
        return livro;
      }      
}