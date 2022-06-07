export type notification = {
  id: number;
  titulo: string;
  descricao: string;
  visualizado: boolean;
  data: string;
  usuario: {
    id: number;
    email: string;
  };
};
