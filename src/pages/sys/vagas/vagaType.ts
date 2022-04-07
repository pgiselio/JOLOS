export type vaga = {
  id: number;
  titulo: string;
  status: "ATIVO" | "INATIVO" | null;
  descricao: string;
  localizacao: string;
  dataCriacao: string;
  cursoAlvo: string;
  empresa: {
    id: number;
    dadosPessoa: {
      nome: string;
    };
  }
  // owner: {
  //   name: string;
  //   id: number;
  //   profilepic_url?: string;
  // };
  alunos: number[];
};

// export const usersList : user[] = [
//   {
//     id: 1,
//     name: "João Cleber",
//     email: "joao.cleber@gmail.com",
//   },
//   {
//     id: 2,
//     name: "Afonso Bezerra",
//     email: "afonsinho21@gmail.com",
//   },
//   {
//     id: 3,
//     name: "Diogo Defante",
//     email: "vo.raspar.a.cabeca@gmail.com",
//   },
//   {
//     id: 4,
//     name: "John Doe",
//     email: "john.doe@hotmail.com",
//   },
//   {
//     id: 5,
//     name: "Alex Silva",
//     email: "alex.sem.sandro@gmail.com",
//   },
//   {
//     id: 6,
//     name: "Kleber Bambam",
//     email: "birlll@yahoo.com",
//   },
//   {
//     id: 7,
//     name: "Tiago Leifert",
//     email: "john.doe@hotmail.com",
//     profilepic_url: "http://tv.i.uol.com.br/televisao/2010/02/03/tiago-leifert-jornalista-1265237938768_300x300.jpg",
//   },
// ];
