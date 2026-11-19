import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-cadastro-produtos',
  styleUrl: './cadastro-produtos.css',
  templateUrl: './cadastro-produtos.html',
})
export class CadastroProdutos {
  private http = inject(HttpClient);
  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    preco: new FormControl('', [Validators.required, Validators.min(0.01)]),
    quantidade: new FormControl('', [Validators.required, Validators.min(0)]),
  });

 //Função para capturar os dados do formulário e cadastrar o produto
cadastrarProduto() {
  //Fazendo uma requisição POST para a API com os dados do formulário
  this.http.post(environment.apiUrl + '/produtos', this.formCadastro.value)
    .subscribe((response: any) => {
      //Exibir uma mensagem de sucesso
      alert('Produto ' + response.nome + ' cadastrado com sucesso!');
      //Limpar o formulário após o cadastro
      this.formCadastro.reset();
    });
  }
}
