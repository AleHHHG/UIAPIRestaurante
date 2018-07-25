import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RestauranteService } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Models/restaurante.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-restaurante',
    templateUrl: './restaurante.component.html'
})
export class RestauranteComponent implements OnInit{
    restaurantes: IRestaurante[] = [];
    restaurante: IRestaurante = <IRestaurante>{}
    form: FormGroup;
    formSearch: FormGroup;
    isEdit: boolean = false;
    showForm: boolean = false;
    label: string = "";

    constructor(private restauranteService: RestauranteService, private fb: FormBuilder) {
        this.form = fb.group({
            "nome": [],
        });
        this.formSearch = fb.group({
            "search": [],
        });
    }

    private getRestaurantes() {
        this.restauranteService.getRestaurantes().subscribe(
            data => this.restaurantes = data,
            error => alert(error),
            () => console.log(this.restaurantes)
        );
    }

    ngOnInit() {
        this.getRestaurantes();
    }

    cadastrar() {
        this.label = "Cadastrar novo restaurante";
        this.showForm = true;
        this.isEdit = false;
    }

    voltar() {
        this.showForm = false;
        this.form.reset();
    }

    editar(restaurante : IRestaurante) {
        this.label = "Editar restaurante";
        this.showForm = true;
        this.isEdit = true;
        this.restaurante = restaurante;
        this.form.setValue({
            "nome": restaurante.nome
        });
    }

    deletar(restauranteId: number) {
        this.restauranteService.deleteRestaurante(restauranteId).subscribe(
            data => {
                this.getRestaurantes();
            }
        );
    }

    onSubmit() {
        this.restaurante.nome = this.form.controls["nome"].value;
        if (this.isEdit) {
            this.restauranteService.updateRestaurante(this.restaurante.id, this.restaurante).subscribe(
                data => {
                    this.getRestaurantes();
                    this.form.reset();
                    this.showForm = false;
                }
            );
        } else {
            this.restauranteService.setRestaurante(this.restaurante).subscribe(
                data => {
                    this.restaurantes.push(data);
                    this.form.reset();
                    this.showForm = false;
                }
            );
        }
    }

    search() {
        this.restauranteService.searchRestaurantes(this.formSearch.controls["search"].value).subscribe(
            data => this.restaurantes = data,
            error => alert(error),
            () => console.log(this.restaurantes)
        );
    }
}


