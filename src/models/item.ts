import { ProdutoServico } from './produto';
export class Item {
    constructor(
        public id: number = -1,
        public venda: number = 0,
        public produto_servico: any = null,
        public quantidade: number = 0,
        public total: number = 0,
        public total_comissao: number = 0

    ) { }
}
