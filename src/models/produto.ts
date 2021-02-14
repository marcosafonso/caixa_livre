export class ProdutoServico {
    constructor(
        public id: number = -1,
        public descricao: string = '',
        public preco_unitario: number = 0,
        public comissao: number = 0
    ) {}
}
