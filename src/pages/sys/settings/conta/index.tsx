import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@reach/accordion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { FabButton } from "../../../../components/fab";
import { Input } from "../../../../components/input";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import { User } from "../../../../types/user";
import { CurriculoForm } from "./_curriculoForm";

export default function SettingContaPage() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    register,
    formState: { isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      nome:
        auth.userInfo?.aluno?.dadosPessoa.nome ||
        auth.userInfo?.empresa?.dadosPessoa.nome,
      resumo:
        auth.userInfo?.aluno?.resumo || auth.userInfo?.empresa?.resumo || "",
      facebook: auth.userInfo?.empresa?.redesSociais?.facebook || "",
      instagram: auth.userInfo?.empresa?.redesSociais?.instagram || "",
      linkedin: auth.userInfo?.empresa?.redesSociais?.linkedin || "",
      twitter: auth.userInfo?.empresa?.redesSociais?.twitter || "",
    },
  });
  async function onSubmit(data: any) {
    setIsLoading(true);
    await api
      .patch(`/usuario/${auth.userInfo?.id}`, auth.userInfo?.aluno?.id ?
      [
        {
          op: "replace",
          path: "/aluno/dadosPessoa/nome",
          value: data.nome,
        },
        {
          op: "replace",
          path: "/aluno/resumo",
          value:  data.resumo,
        },        
      ]
         : auth.userInfo?.empresa?.id ? [
          {
            op: "replace",
            path: "/empresa/dadosPessoa/nome",
            value: data.nome,
          },
          {
            op: "replace",
            path: "/empresa/resumo",
            value:  data.resumo,
          },   {
            op: "replace",
            path: "/empresa/redesSociais/facebook",
            value:  data.facebook,
          },
          {
            op: "replace",
            path: "/empresa/redesSociais/instagram",
            value: data.instagram,
          },
          {
            op: "replace",
            path: "/empresa/redesSociais/linkedin",
            value: data.linkedin,
          },
          {
            op: "replace",
            path: "/empresa/redesSociais/twitter",
            value: data.twitter,
          }  
        ] : null)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Mudanças salvas com sucesso!");
        }
        queryClient.invalidateQueries("meUser");
      })
      .catch((err) => {
        if (err.status === 500) {
          toast.error("Ops... algo não deu certo!", {});
        }
        if (err.status === 403 || err.status === 401) {
          toast.error("Você não tem autorização para executar essa ação!");
        } else {
          toast.error("Ops... algo não deu certo!");
          console.error(err);
        }
      });
    setIsLoading(false);
  }
  return (
    <>
      <div>
        <ProfilePic style={{ height: "80px" }} />
      </div>

      <Accordion collapsible multiple>
        <form>
          {isDirty && (
            <FabButton type="button" onClick={handleSubmit(onSubmit)}>
              {isLoading && (
                <CircularProgressFluent
                  color="white"
                  height="25px"
                  width="25px"
                  duration=".8s"
                  style={{ position: "absolute" }}
                />
              )}
              <span {...(isLoading && { style: { opacity: 0 } })}>
                <i className="fas fa-floppy-disk"></i> Salvar alterações
              </span>
            </FabButton>
          )}
          <AccordionItem>
            <AccordionButton className="autohide-sub">
              <h4>Nome</h4>
              <span className="subtittle">
                {auth.userInfo?.aluno?.dadosPessoa.nome ||
                  auth.userInfo?.empresa?.dadosPessoa.nome}
              </span>
            </AccordionButton>
            <AccordionPanel>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <Input type="text" id="nome" {...field} />
                )}
              />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton className="has-sub">
              <h4>Sobre mim</h4>
              <span className="subtittle">
                Uma breve descrição sobre{" "}
                {auth?.authorities?.includes("ALUNO") ? "você" : "a sua empresa"}
              </span>
            </AccordionButton>
            <AccordionPanel>
              <Controller
                name="resumo"
                control={control}
                render={({ field }) => (
                  <textarea
                    style={{
                      resize: "vertical",
                      minHeight: "150px",
                      maxHeight: "250px",
                      height: 150,
                      width: "100%",
                    }}
                    placeholder="Faça uma breve descrição sobre você"
                    className="txt-input"
                    {...field}
                    id="desc"
                    rows={10}
                  ></textarea>
                )}
              />
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
                    <Controller
                      name="facebook"
                      control={control}
                      render={({ field }) => (
                        <Input type="text" id="facebook" {...field} />
                      )}
                    />
                  </div>
                  <div className="lbl-icon">
                    <label>
                      <i className="fa-brands fa-instagram"></i>
                      <span>instagram.com</span>/
                    </label>
                    <Controller
                      name="instagram"
                      control={control}
                      render={({ field }) => (
                        <Input type="text" id="instagram" {...field} />
                      )}
                    />
                  </div>
                  <div className="lbl-icon">
                    <label>
                      <i className="fa-brands fa-linkedin"></i>
                      <span>linkedin.com/company/</span>
                    </label>
                    <Controller
                      name="linkedin"
                      control={control}
                      render={({ field }) => (
                        <Input type="text" id="linkedin" {...field} />
                      )}
                    />
                  </div>
                  <div className="lbl-icon">
                    <label>
                      <i className="fa-brands fa-twitter"></i>
                      <span>twitter.com/</span>
                    </label>
                    <Controller
                      name="twitter"
                      control={control}
                      render={({ field }) => (
                        <Input type="text" id="twitter" {...field} />
                      )}
                    />
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
          )}
        </form>
        {auth.userInfo?.aluno && (
          <AccordionItem style={{ marginTop: 14 }}>
            <AccordionButton>
              <h4>Currículo</h4>
            </AccordionButton>
            <AccordionPanel>
              <CurriculoForm />
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
}
