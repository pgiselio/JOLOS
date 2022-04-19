import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@reach/accordion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
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
        <ProfilePic style={{ height: "80px" }} />
      </div>

      <Accordion collapsible multiple>
        <AccordionItem>
          <AccordionButton className="has-sub">
            <h4>Nome</h4>
            <span className="subtittle">
              {auth.userInfo?.aluno?.dadosPessoa.nome ||
                auth.userInfo?.empresa?.dadosPessoa.nome}
            </span>
          </AccordionButton>
          <AccordionPanel>
            <Input
              type="text"
              id="nome"
              defaultValue={
                auth.userInfo?.aluno?.dadosPessoa.nome ||
                auth.userInfo?.empresa?.dadosPessoa.nome
              }
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton className="has-sub">
            <h4>Sobre mim</h4>
            <span className="subtittle">
              Uma breve descrição sobre{" "}
              {auth.type === "ALUNO" ? "você" : "a sua empresa"}
            </span>
          </AccordionButton>
          <AccordionPanel>
            <textarea
              style={{
                resize: "vertical",
                minHeight: "150px",
                maxHeight: "250px",
                height: 150,
                width: "100%",
                background: "#ffffff1a",
                padding: "5px",
                borderRadius: "5px",
                color: "var(--text-a)",
              }}
              placeholder="Faça uma breve descrição sobre você"
              className="txt-input"
              defaultValue={auth.userInfo?.aluno?.resumo}
              id="desc"
              rows={10}
            ></textarea>
          </AccordionPanel>
        </AccordionItem>
        {auth.userInfo?.empresa && (
          <AccordionItem>
            <AccordionButton className="has-sub">
              <h4>Redes Sociais</h4>{" "}
              <span className="subtittle">
                Facebook, Instagram, LinkedIn e Twitter
              </span>
            </AccordionButton>
            <AccordionPanel>
              <div className="inputs">
                <div className="lbl-icon">
                  <label>
                    <i className="fa-brands fa-facebook-f"></i>
                    <span>facebook.com</span>/
                  </label>
                  <Input type="text" />
                </div>
                <div className="lbl-icon">
                  <label>
                    <i className="fa-brands fa-instagram"></i>
                    <span>instagram.com</span>/
                  </label>
                  <Input type="text" />
                </div>
                <div className="lbl-icon">
                  <label>
                    <i className="fa-brands fa-linkedin"></i>
                    <span>linkedin.com/company/</span>
                  </label>
                  <Input type="text" />
                </div>
                <div className="lbl-icon">
                  <label>
                    <i className="fa-brands fa-twitter"></i>
                    <span>twitter.com/</span>
                  </label>
                  <Input type="text" />
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>
        )}
        {auth.userInfo?.aluno && (
          <AccordionItem>
            <AccordionButton>
              <h4>Currículo</h4>
            </AccordionButton>
            <AccordionPanel>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" accept=".pdf" {...register("arquivo")} />
                <Button type="submit">Enviar</Button>
              </form>
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
}
