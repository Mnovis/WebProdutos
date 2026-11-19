import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-edicao-produtos',
  styleUrl: './edicao-produtos.css',
  templateUrl: './edicao-produtos.html',
})
export class EdicaoProdutos {

  //Objeto para ler variáveis da URL da rota / navegador
  private route = inject(ActivatedRoute);

  private http = inject(HttpClient);
  id: string = '';

  formEdicao = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    preco: new FormControl('', [Validators.required, Validators.min(0.01)]),
    quantidade: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  ngOnInit() {
    //Capturando o id enviado na URL
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.http.get(environment.apiUrl + '/produtos/' + this.id)
      .subscribe((response: any) => {
        this.formEdicao.patchValue(response);
      });
  }

  //Função para capturar os dados do formulário e atualizar o produto
  editarProduto() {
    this.http.put(environment.apiUrl + '/produtos/' + this.id, this.formEdicao.value)
      .subscribe((response: any) => {
        alert('Produto ' + response.nome + ' atualizado com sucesso!');
        location.href = '/consulta-produtos';
      });
  }
}