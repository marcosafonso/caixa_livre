export class Venda {
    constructor(
        public id: number = -1,
        public data_criacao: string = '',
        public vendedor: any = 0,
        public cliente: any = 0,
        public situacao: number = 1,
        public valor_total: number = 0,
        public valor_comissao_total: number = 0
    ) { }

}
