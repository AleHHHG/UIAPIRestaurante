import { Injectable, Class } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IPrato } from '../Models/prato.interface';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PratoService {
    constructor(private http: Http) { }
    private baseUrl = "http://localhost:42802";

    getPratos() {
        return this.http.get(this.baseUrl + "/api/pratos").map(data => <IPrato[]>data.json());
    }

    getPratoById(id: number) {
        return this.http.get(this.baseUrl + "/api/pratos/" + id).map(data => <IPrato>data.json());
    }

    setPrato(prato: IPrato) {
        return this.http.post(this.baseUrl + "/api/pratos", prato).map(data => <IPrato>data.json());
    }

    updatePrato(id: number, prato: IPrato) {
        return this.http.put(this.baseUrl + "/api/pratos/" + id, prato).map(data => <IPrato>data.json());
    }

    deletePrato(id: number) {
        return this.http.delete(this.baseUrl + "/api/pratos/" + id).map(data => <string>data.json());
    }
}