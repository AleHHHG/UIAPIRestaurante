import { Injectable, Class } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IRestaurante } from '../Models/restaurante.interface';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class RestauranteService {
    constructor(private http: Http) { }
    private baseUrl = "http://localhost:42802";

    getRestaurantes() {
        return this.http.get(this.baseUrl + "/api/restaurantes").map(data => <IRestaurante[]>data.json());
    }

    searchRestaurantes(querString : string) {
        return this.http.get(this.baseUrl + "/api/restaurantes?search="+querString).map(data => <IRestaurante[]>data.json());
    }

    getRestauranteById(id: number) {
        return this.http.get(this.baseUrl + "/api/restaurantes/"+id).map(data => <IRestaurante>data.json());
    }

    setRestaurante(restaurante : IRestaurante) {
        return this.http.post(this.baseUrl + "/api/restaurantes", restaurante).map(data => <IRestaurante>data.json());
    }

    updateRestaurante(id: number ,restaurante: IRestaurante) {
        return this.http.put(this.baseUrl + "/api/restaurantes/"+id, restaurante).map(data => <IRestaurante>data.json());
    }

   deleteRestaurante(id: number) {
        return this.http.delete(this.baseUrl + "/api/restaurantes/" + id).map(data => <string>data.json());
    }
}