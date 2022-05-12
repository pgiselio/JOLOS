import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@reach/accordion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { FabButton } from "../../../../components/fab";
import { Input } from "../../../../components/input";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import { CurriculoForm } from "./_curriculoForm";

export default function SettingContaPage() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: { isDirty, errors },
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
      telefone: auth.userInfo?.empresa?.telefone || "",
      uf:
        auth.userInfo?.empresa?.dadosPessoa?.localizacao.split("/")[1] ||
        auth.userInfo?.aluno?.dadosPessoa?.localizacao.split("/")[1],
      cidade:
        auth.userInfo?.empresa?.dadosPessoa?.localizacao.split("/")[0] ||
        auth.userInfo?.aluno?.dadosPessoa?.localizacao.split("/")[0],
      curso: auth.userInfo?.aluno?.curso || "",
    },
  });
  async function onSubmit(data: any) {
    setIsLoading(true);
    await api
      .patch(
        `/usuario/${auth.userInfo?.id}`,
        auth.userInfo?.aluno?.id
          ? [
              {
                op: "replace",
                path: "/aluno/dadosPessoa/nome",
                value: data.nome,
              },
              {
                op: "replace",
                path: "/aluno/dadosPessoa/localizacao",
                value: data.cidade.trim() + "/" + data.uf.trim().toUpperCase(),
              },
              {
                op: "replace",
                path: "/aluno/resumo",
                value: data.resumo,
              },
            ]
          : auth.userInfo?.empresa?.id
          ? [
              {
                op: "replace",
                path: "/empresa/dadosPessoa/nome",
                value: data.nome,
              },
              {
                op: "replace",
                path: "/empresa/dadosPessoa/localizacao",
                value: data.cidade.trim() + "/" + data.uf.trim().toUpperCase(),
              },
              {
                op: "replace",
                path: "/empresa/resumo",
                value: data.resumo,
              },
              {
                op: "replace",
                path: "/empresa/redesSociais/facebook",
                value: data.facebook,
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
              },
              {
                op: "replace",
                path: "/empresa/telefone",
                value: data.telefone,
              },
            ]
          : null
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Mudanças salvas com sucesso!");
        }
        queryClient.invalidateQueries("meUser");
        queryClient.invalidateQueries("profile" + auth.userInfo?.id);
        queryClient.fetchQuery("meUser");
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
          <AccordionItem>
            <AccordionButton className="autohide-sub">
              <h4>Nome</h4>
              <span className="subtitle">
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
          {auth?.authorities?.includes("ALUNO") && (
            <AccordionItem>
              <AccordionButton className="autohide-sub">
                <h4>Curso</h4>
                <span className="subtitle">{auth.userInfo?.aluno?.curso}</span>
              </AccordionButton>
              <AccordionPanel>
                <Controller
                  name="curso"
                  control={control}
                  render={({ field }) => (
                    <Input type="text" id="nome" {...field} />
                  )}
                />
              </AccordionPanel>
            </AccordionItem>
          )}

          <AccordionItem>
            <AccordionButton className="has-sub">
              <h4>
                Sobre {auth?.authorities?.includes("ALUNO") ? "mim" : "nós"}
              </h4>
              <span className="subtitle">
                Uma breve descrição sobre{" "}
                {auth?.authorities?.includes("ALUNO")
                  ? "você"
                  : "a sua empresa"}
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

          <AccordionItem>
            <AccordionButton className="autohide-sub">
              <h4>Localização</h4>
              <span className="subtitle">
                {auth.userInfo?.aluno?.dadosPessoa.localizacao ||
                  auth.userInfo?.empresa?.dadosPessoa.localizacao}
              </span>
            </AccordionButton>
            <AccordionPanel>
              <div className="input-group">
                <div className="lbl">
                  <label htmlFor="cidade">Cidade: </label>
                  <Controller
                    name="cidade"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        id="cidade"
                        placeholder="Cidade"
                        {...field}
                        {...(errors.cidade && { className: "danger" })}
                      />
                    )}
                  />
                  <p className="input-error">{errors.cidade?.message}</p>
                </div>
                <div className="lbl" style={{ maxWidth: "60px" }}>
                  <label htmlFor="uf">UF: </label>
                  <Controller
                    name="uf"
                    control={control}
                    render={({ field }) => (
                      <ReactInputMask
                        maskPlaceholder={null}
                        mask="aa"
                        {...field}
                      >
                        <Input
                          type="text"
                          id="uf"
                          placeholder="UF"
                          {...(errors.uf && { className: "danger" })}
                        />
                      </ReactInputMask>
                    )}
                  />
                  <p className="input-error">{errors.uf?.message}</p>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>

          {auth.userInfo?.empresa && (
            <span>
              <h4
                style={{
                  margin: "15px 0",
                  marginBottom: "8px",
                  marginLeft: "5px",
                }}
              >
                Contatos
              </h4>

              <AccordionItem>
                <AccordionButton className="autohide-sub">
                  <h4>Telefone</h4>
                  <span className="subtitle">
                    {auth.userInfo?.empresa?.telefone}
                  </span>
                </AccordionButton>
                <AccordionPanel>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" id="telefone" {...field} />
                    )}
                  />
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton className="has-sub">
                  <h4>Redes Sociais</h4>
                  <span className="subtitle">
                    Facebook, Instagram, LinkedIn e Twitter
                  </span>
                </AccordionButton>
                <AccordionPanel>
                  <div className="inputs">
                    <Controller
                      name="facebook"
                      control={control}
                      render={({ field }) => (
                        <Input
                          icon="fa-brands fa-facebook-f"
                          type="text"
                          id="facebook"
                          {...field}
                          spellCheck={false}
                        />
                      )}
                    />
                    <Controller
                      name="instagram"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          icon="fa-brands fa-instagram"
                          id="instagram"
                          {...field}
                          spellCheck={false}
                        />
                      )}
                    />
                    <Controller
                      name="linkedin"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          icon="fa-brands fa-linkedin"
                          id="linkedin"
                          {...field}
                          spellCheck={false}
                        />
                      )}
                    />
                    <Controller
                      name="twitter"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          icon="fa-brands fa-twitter"
                          id="twitter"
                          {...field}
                          spellCheck={false}
                        />
                      )}
                    />
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </span>
          )}

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
