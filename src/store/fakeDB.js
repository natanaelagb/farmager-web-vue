const mydb = {
    animais: [
        {id:1, especie:'vaca',      raca:"Bitelo", genero: "M", descricao: "", massa: 200,  data_nascimento: "2022-12-01T06:00", vacinas: ""},
        {id:2, especie:'macaco',    raca:"Bitelo", genero: "M", descricao: "", massa: 30,  data_nascimento: "2022-12-01T06:00", vacinas: ""},
        {id:3, especie:'galinha',   raca:"Bitelo", genero: "M", descricao: "", massa: 3,  data_nascimento: "2022-12-01T06:00", vacinas: ""},
        {id:4, especie:'boi',       raca:"Bitelo", genero: "M", descricao: "", massa: 250,  data_nascimento: "2022-12-01T06:00", vacinas: ""},
        {id:5, especie:'voce',      raca:"Bitelo", genero: "M", descricao: "", massa: 1000,  data_nascimento: "2022-12-01T06:00", vacinas: ""},
    ],
    usuarios: [
        {id: 1, nome: "Vinícius Felipe", email: "viniciusfbb@google.com", senha: "senha", cargo: "Gerente", salario: "2500"},
        {id: 2, nome: "Natanael Aguilar Barreto", email: "natanael@google.com", senha: "senha", cargo: "Proprietario", salario: "2000"},
        {id: 3, nome: "Neymar da Silva Santos Junior", email: "neymar@google.com", senha: "senha", cargo: "Funcionario", salario: "1500"},
    ],
    produtos_hst: [
        {id: 1, id_animal: 1, produto: "Carne Bovina", quantidade: 200, unidade:"Kg", observacao: "", criado_em:"2022-12-01T06:00"},
        {id: 2, id_animal: 1, produto: "Leite", quantidade: 4, unidade:"Litro", observacao: "", criado_em:"2022-12-01T06:00"},
        {id: 3, id_animal: 4, produto: "Carne", quantidade: 1000, unidade:"Kg", observacao: "", criado_em:"2022-12-01T06:00"},
        {id: 4, id_animal: 3, produto: "Carne Frango", quantidade: 5, unidade:"Kg", observacao: "", criado_em:"2022-12-01T06:00"},
        {id: 5, id_animal: 3, produto: "Ovo", quantidade: 20, unidade:"Unidades", observacao: "", criado_em:"2022-12-01T06:00"},
    ],
    produtos: [
        {nome:"Carne Bovina", quantidade: 100, unidade: "Kg", preco_unitario: 20},
        {nome:"Carne Frango", quantidade: 100, unidade: "Kg", preco_unitario: 5},
        {nome:"Leite", quantidade: 200, unidade: "Litro", preco_unitario: 2},
        {nome:"Ovo", quantidade: 100, unidade: "Unidade", preco_unitario: 0.3},
    ],
    ocorrencias: [
        {id_animal:1, ocorrencia: "Não bate bem da cabeça", criado_em: "2022-12-01T06:00"},
        {id_animal:1, ocorrencia: "Não deu leite", criado_em: "2022-12-01T06:00"},
        {id_animal:3, ocorrencia: "Botou demais", criado_em: "2022-12-01T06:00"},
        {id_animal:4, ocorrencia: "É corno", criado_em: "2022-12-01T06:00"},
        {id_animal:2, ocorrencia: "Olha o macaco!!", criado_em: "2022-12-01T06:00"},
    ]
}

export default mydb;