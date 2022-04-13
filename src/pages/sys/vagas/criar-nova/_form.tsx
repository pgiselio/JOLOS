// import { Editor, EditorState } from "draft-js";
// import { useState } from "react";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MaskedInput from "react-input-mask";

import { Input } from "../../../../components/input";
import { useAuth } from "../../../../hooks/useAuth";
import { usePrompt } from "../../../../hooks/usePrompt";
import { useUser } from "../../../../hooks/useUser";
import { api } from "../../../../services/api";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { queryClient } from "../../../../services/queryClient";

export function CriarNovaVagaForm() {
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  const [empresaCNPJ, setEmpresaCNPJ] = useState<string | null>();
  const auth = useAuth();
  const user = useUser();

  useEffect(() => {
    setEmpresaCNPJ(user?.empresa?.cnpj);
  }, [user]);

  let validationSchema;
  if (empresaCNPJ) {
    validationSchema = Yup.object().shape({
      titulo: Yup.string().required("Este campo é obrigatório"),
      localidade: Yup.string().required("Este campo é obrigatório"),
      cursoAlvo: Yup.string().required("Este campo é obrigatório"),
      descricao: Yup.string().required("Este campo é obrigatório"),
      cnpj: Yup.string().required("Este campo é obrigatório"),
    });
  } else {
    validationSchema = Yup.object().shape({
      titulo: Yup.string().required("Este campo é obrigatório"),
      localidade: Yup.string().required("Este campo é obrigatório"),
      cursoAlvo: Yup.string().required("Este campo é obrigatório"),
      descricao: Yup.string().required("Este campo é obrigatório"),
      cnpj: Yup.string().required("Este campo é obrigatório"),
    });
  }
  const {
    control,
    formState: { errors, isDirty,  },
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      titulo: "",
      localidade: "",
      cursoAlvo: "",
      descricao: "",
      cnpj: "",
    },
    resolver: yupResolver(validationSchema),
  });
  usePrompt(
    "Deseja realmente sair? Os dados não salvos serão perdidos!",
    isDirty
  );

  function counter() {
    const descriptionVaga: any = document.querySelector("#desc");
    let countChar: any = document.querySelector("#count");

    const maxChars = 1000;
    let currentValue = maxChars - descriptionVaga.value.length;

    if (currentValue <= 0) {
      currentValue = 0;
      descriptionVaga.setAttribute("maxlength", maxChars);
    }

    countChar.innerHTML = currentValue + "";
  }
  async function onSubmit({
    titulo,
    localidade,
    cursoAlvo,
    descricao,
    cnpj,
  }: any) {
    await api
      .post("/vaga/create", {
        cursoAlvo,
        titulo,
        localizacao: localidade,
        descricao,
        cnpj: auth.type === "EMPRESA" ? empresaCNPJ : cnpj.replaceAll(".", "").replaceAll("/", "").replaceAll("-", ""),
        dataCriacao: new Date(),
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Vaga criada com sucesso!");
          reset();
          queryClient.invalidateQueries("vagas");
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
    <form
      className="form-create-vaga"
      id="form-create-vaga"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="lbl">
        <label htmlFor="vaga-title">Título:</label>
        <Controller
          name="titulo"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="vaga-title"
              placeholder="Jovem aprendiz na área de manutenção"
              {...field}
              {...(errors.titulo && { className: "danger" })}
            />
          )}
        />
        <p className="input-error">{errors.titulo?.message}</p>
      </div>
      <div className="form-item-group" style={{ width: "100%" }}>
        <div className="lbl">
          <label htmlFor="vaga-location">Localidade da vaga: </label>
          <Controller
            name="localidade"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                id="vaga-location"
                placeholder="ex.: João Câmara, RN"
                {...field}
                {...(errors.localidade && { className: "danger" })}
              />
            )}
          />
          <p className="input-error">{errors.cursoAlvo?.message}</p>
        </div>
        <div className="lbl">
          <label htmlFor="change-courses">Curso alvo: </label>
          <Controller
            name="cursoAlvo"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                id="change-courses"
                placeholder="Administração, Informática etc"
                list="courses"
                {...field}
                {...(errors.cursoAlvo && { className: "danger" })}
              />
            )}
          />
          <p className="input-error">{errors.cursoAlvo?.message}</p>

          <datalist id="courses">
            <option value="Informática"></option>
            <option value="Energias Renováveis"></option>
            <option value="Eletrotécnica"></option>
            <option value="Administração"></option>
            <option value="Física"></option>
          </datalist>
        </div>
      </div>
      {auth.type !== "EMPRESA" && (
        <div className="lbl">
          <label htmlFor="cnpj">CNPJ da empresa: </label>
          <Controller
            name="cnpj"
            control={control}
            render={({ field }) => (
              <MaskedInput mask="99.999.999/9999-99" {...field} alwaysShowMask>
                {
                  () => <Input type="text" id="cnpj" placeholder="CNPJ" {...(errors.cursoAlvo && { className: "danger" })} />
                }
              </MaskedInput>
            )}
          />
          <p className="input-error">{errors.cnpj?.message}</p>
        </div>
      )}

      <div className="lbl">
        <label htmlFor="descriptionVaga">Descrição: </label>
        {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
        <div id="descriptionVaga"></div>

        <Controller
          name="descricao"
          control={control}
          render={({ field }) => (
            <textarea
              style={{
                resize: "vertical",
                minHeight: "150px",
                maxHeight: "250px",
                height: 200,
                background: "#ffffff1a",
                padding: "5px",
                borderRadius: "5px",
                color: "var(--text-a)",
              }}
              placeholder="Descrição da vaga..."
              className="txt-input"
              id="desc"
              rows={10}
              onKeyUp={counter}
              {...field}
            ></textarea>
          )}
        />
        <p className="input-error">{errors.descricao?.message}</p>

        <div className="counter-box">
          <p>
            Limite de caracteres: <span id="count">1000</span>
          </p>
        </div>
      </div>
    </form>
  );
}
