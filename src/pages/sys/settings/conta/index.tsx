import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import { api } from "../../../../services/api";
import { User } from "../../../../types/user";

export default function SettingContaPage() {
  const user: User = useOutletContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      arquivo: "",
    },
  });
  async function onSubmit(data: any) {
    
    const formData = new FormData();
    const file = data.arquivo[0];
    formData.append("arquivo", file);
    await api
      .post(
        "/curriculo/upload", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Currículo enviado com sucesso!");
        }
      })
      .catch((err) => {
        if (err.status === 500) {
          toast.error("Ops... algo não deu certo!", {});
        }
        if (err.response.status === 403 || err.response.status === 401) {
          toast.error("Você não tem autorização para executar essa ação!");
        } else {
          console.error(err);
        }
      });
  }
  return (
    <>
      <div>
        <div>Currículo</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" {...register("arquivo")} />
          <Button type="submit">Enviar</Button>
        </form>
        {user?.aluno && JSON.stringify(user?.aluno)}
      </div>
    </>
  );
}
