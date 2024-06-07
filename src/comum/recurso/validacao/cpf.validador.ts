import { Injectable } from "@nestjs/common";
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@Injectable()
@ValidatorConstraint({async: true})
export class CpfValidador implements ValidatorConstraintInterface {
    
    async validacao(value: string): Promise<boolean> {
        
        // Remover caracteres não numéricos
        let cpf = value.replace(/[^\d]/g, '');
        
        if (cpf.length !== 11) {
            return false;
        }
        
        // Verifique se todos os dígitos são iguais (CPF inválido)
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        
        const calculoVerificador = (cpf: string, multiplier: number): number => {
            let sum = 0;
            for (let i = 0; i < multiplier - 1; i++) {
                sum += parseInt(cpf[i]) * (multiplier - i);
            }
            const remainder = sum * 10 % 11;
            return remainder === 10 ? 0 : remainder;
        };
        
        // Calcule os dígitos verificadores
        const primeiraVerificacao = calculoVerificador(cpf, 10);
        const segundaVerificacao = calculoVerificador(cpf, 11);
        
        return (
            primeiraVerificacao === parseInt(cpf[9]) && segundaVerificacao === parseInt(cpf[10])
        );
    }
    
}
        
export const ValidacaoCPF = (opcoesDeValidacao: ValidationOptions) => {
    return (obj: Object, property: string) => {
        registerDecorator({ 
            target: obj.constructor,
            propertyName: property, 
            options: opcoesDeValidacao,          
            constraints: [],
            validator: CpfValidador,
        });
    }    
}
