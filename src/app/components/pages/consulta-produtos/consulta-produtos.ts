import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  imports: [
    CommonModule
  ],
  selector: 'app-consulta-produtos',
  styleUrl: './consulta-produtos.css',
  templateUrl: './consulta-produtos.html',
})
export class ConsultaProdutos {
  private http = inject(HttpClient);
  produtos = signal<any[]>([]);
  ngOnInit() {
    this.http.get<any[]>(environment.apiUrl + '/produtos').subscribe((response) => {
      this.produtos.set(response);
    });
  }

  excluirProduto(item: any){
    var confirmacao = confirm('Tem certeza que deseja excluir o produto ' + item.nome + '?');
    if(confirmacao){
      this.http.delete(environment.apiUrl + '/produtos/' + item.idProduto).subscribe(() => {
        alert('Produto ' + item.nome + ' excluído com sucesso!');
        this.ngOnInit(); // Atualiza a lista de produtos após a exclusão
      });
    }
  }
}
