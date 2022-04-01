// import { Editor, EditorState } from "draft-js";
// import { useState } from "react";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Input } from "../../../../components/input";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";

export function CriarNovaVagaForm() {
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  const [empresaCNPJ, setEmpresaCNPJ] = useState<string | null>("000");
  const auth = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      titulo: "",
      localidade: "",
      cursoAlvo: "",
      descricao: "",
      cnpj: "",
    },
  });

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

  useEffect(() => {
    async function getUser() {
      const response = await api
        .get(`/usuario/email/${auth?.email}`)
        .catch((error) =>
          error.response.status === 401 || error.response.status === 403
            ? (window.location.href = "/logout")
            : error
        );
      setEmpresaCNPJ(response?.data.empresa.cnpj);
    }
    getUser();
  }, []);

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
        cnpj: auth.type === "EMPRESA" ? empresaCNPJ : cnpj,
        dataCriacao: new Date(),
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Vaga criada com sucesso!");
        }
      })
      .catch(() => {
        toast.error("Houve um erro ao criar a vaga!", {});
      });
  }

  if (auth.type === "ALUNO") {
    return <h1>SEM PERMISÃO</h1>;
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
            />
          )}
        />
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
              />
            )}
          />
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
              />
            )}
          />

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
              <Input type="text" id="cnpj" placeholder="CNPJ" {...field} />
            )}
          />
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

        <div className="counter-box">
          <p>
            Limite de caracteres: <span id="count">1000</span>
          </p>
        </div>
      </div>
    </form>
  );
}
