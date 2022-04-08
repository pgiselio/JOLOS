import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import { useUser } from "../../../../hooks/useUser";
import { api } from "../../../../services/api";

export default function SettingContaPage() {
  const user = useUser();
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
        `/curriculo/upload/${user.email}`, formData,
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
      </div>
    </>
  );
}
