import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PratoService } from '../../Services/prato.service';
import { IPrato } from '../../Models/prato.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RestauranteService } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Models/restaurante.interface';
@Component({
    selector: 'app-prato',
    templateUrl: './prato.component.html'
})
export class PratoComponent implements OnInit {
    pratos: IPrato[] = [];
    restaurantes: IRestaurante[] = [];
    prato: IPrato = <IPrato>{}
    form: FormGroup;
    isEdit: boolean = false;
    showForm: boolean = false;
    label: string = "";

    constructor(private pratoService: PratoService, private restauranteService: RestauranteService, private fb: FormBuilder) {
        this.form = fb.group({
            "nome": ["",Validators.required],
            "preco": ["",Validators.required],
            "restauranteId":["",Validators.required]

        });
    }

    private getPratos() {
        this.pratoService.getPratos().subscribe(
            data => this.pratos = data,
            error => alert(error)
        );
    }

    private getRestaurantes() {
        this.restauranteService.getRestaurantes().subscribe(
            data => this.restaurantes = data,
            error => alert(error)
        );
    }

    ngOnInit() {
        this.getPratos();
    }

    cadastrar() {
        this.label = "Cadastrar novo prato";
        this.showForm = true;
        this.isEdit = false;
        this.getRestaurantes()
    }

    voltar() {
        this.showForm = false;
        this.form.reset();
    }

    editar(prato: IPrato) {
        this.label = "Editar prato";
        this.showForm = true;
        this.isEdit = true;
        this.prato = prato;
        this.getRestaurantes()
        this.form.setValue({
            "nome": prato.nome,
            "restauranteId": prato.restauranteId,
            "preco": prato.preco
        });
    }

    deletar(pratoId: number) {
        this.pratoService.deletePrato(pratoId).subscribe(
            data => {
                this.getPratos();
            }
        );
    }

    onSubmit() {
        this.prato.nome = this.form.controls["nome"].value;
        this.prato.preco = this.form.controls["preco"].value;
        this.prato.restauranteId = this.form.controls["restauranteId"].value;
        if (this.isEdit) {
            this.pratoService.updatePrato(this.prato.id, this.prato).subscribe(
                data => {
                    this.getPratos();
                    this.form.reset();
                    this.showForm = false;
                }
            );
        } else {
            this.pratoService.setPrato(this.prato).subscribe(
                data => {
                    this.getPratos();
                    this.form.reset();
                    this.showForm = false;
                }
            );
        }
    }
}
