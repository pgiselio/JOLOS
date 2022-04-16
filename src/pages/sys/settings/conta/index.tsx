import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";

export default function SettingContaPage() {
  const auth = useAuth();
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
      .patch(`/curriculo/atualizaArquivo/${auth.userInfo?.email}`, formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Currículo enviado com sucesso!");
        }
      })
      .catch((err) => {
        if (err.status === 500) {
          toast.error("Ops... algo não deu certo!", {});
        }
        if (err.status === 403 || err.status === 401) {
          toast.error("Você não tem autorização para executar essa ação!");
        } else {
          console.error(err);
        }
      });
  }
  return (
    <>
      <div>
        {auth.userInfo?.aluno && (
          <>
            <div>Currículo</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="file" {...register("arquivo")} />
              <Button type="submit">Enviar</Button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
