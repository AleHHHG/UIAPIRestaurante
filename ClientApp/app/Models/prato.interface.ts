import { IRestaurante } from "./restaurante.interface";
export interface IPrato {
    id: number,
    nome: string,
    restauranteId: number,
    preco: number,
    restaurante : IRestaurante
}