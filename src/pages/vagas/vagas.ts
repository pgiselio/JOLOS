type candidates = {
  id: number;
};

export type user = {
    id: number;
    name: string;
    profilepic_url?: string;
    email: string;
  };
export type vaga = {
  id: number;
  name: string;
  status: boolean;
  description: string;
  location: string;
  date: string;
  course_target: string;
  owner: {
    name: string;
    id: number;
    profilepic_url?: string;
  };
  candidates: candidates[];
};

export const usersList : user[] = [
  {
    id: 1,
    name: "João Cleber",
    email: "joao.cleber@gmail.com",
  },
  {
    id: 2,
    name: "Afonso Bezerra",
    email: "afonsinho21@gmail.com",
  },
  {
    id: 3,
    name: "Diogo Defante",
    email: "vo.raspar.a.cabeca@gmail.com",
  },
  {
    id: 4,
    name: "John Doe",
    email: "john.doe@hotmail.com",
  },
  {
    id: 5,
    name: "Alex Silva",
    email: "alex.sem.sandro@gmail.com",
  },
  {
    id: 6,
    name: "Kleber Bambam",
    email: "birlll@yahoo.com",
  },
  {
    id: 7,
    name: "Tiago Leifert",
    email: "john.doe@hotmail.com",
    profilepic_url: "http://tv.i.uol.com.br/televisao/2010/02/03/tiago-leifert-jornalista-1265237938768_300x300.jpg",
  },
];

export const vagasListTest: vaga[] = [
  {
    id: 1,
    name: "Vaga de estágio",
    status: true,
    description: "Lorem ipsum 1",
    location: "João Câmara/RN",
    date: "01/02/2002",
    course_target: "Administração",
    owner: {
      name: "Jolos Company",
      id: 1,
    },
    candidates: [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
    ],
  },
  {
    id: 2,
    name: "Vaga de jovem aprendiz",
    status: false,
    description: "Lorem ipsum 2",
    location: "João Câmara/RN",
    date: "05/02/2022",
    course_target: "Eletrônica",
    owner: {
      name: "Jolos Chocolates",
      id: 2,
    },
    candidates: [
        {
            id: 4,
        },
        {
            id: 5,
        },
        {
            id: 6,
        },
        {
            id: 7,
        },
    ],
  },
  {
    id: 3,
    name: "string",
    status: true,
    description: "Lorem ipsum 3",
    location: "João Câmara/RN",
    date: "02/02/2002",
    course_target: "Administração",
    owner: {
      name: "Jolos Frios",
      id: 3,
    },
    candidates: [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
    ],
  },
  {
    id: 4,
    name: "string",
    status: false,
    description: "Lorem ipsum 4",
    location: "João Câmara/RN",
    date: "19/11/2013",
    course_target: "Administração",
    owner: {
      name: "Jolos Laticínios",
      id: 1,
    },
    candidates: [

    ],
  },
  {
    id: 5,
    name: "string",
    status: true,
    description: "Lorem ipsum 5",
    location: "João Câmara/RN",
    date: "17/03/2012",
    course_target: "Administração",
    owner: {
      name: "Jolos Automotiva",
      id: 1,
    },
    candidates: [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
        {
            id: 6,
        },
        {
            id: 7,
        },
    ],
  },
];
