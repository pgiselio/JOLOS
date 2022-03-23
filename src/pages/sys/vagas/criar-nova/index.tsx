import { Editor, EditorState } from "draft-js";
import { useState } from "react";

import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";

export function CriarNovaVagaPage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
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
  return (
    <section>
      <div className="content">
        <Box>
          <BoxTitle>
            <h3>Criar nova vaga</h3>
          </BoxTitle>
          <BoxContent>
            <form className="form-create-vaga" action="" method="post">
              <div className="lbl">
                <label htmlFor="vaga-title">Título:</label>
                <Input
                  type="text"
                  name="vaga-title"
                  id="vaga-title"
                  placeholder="Jovem aprendiz na área de manutenção"
                />
              </div>
              <div className="lbl">
                <label htmlFor="vaga-location">Localidade da vaga: </label>
                <Input
                  type="text"
                  name="location"
                  id="vaga-location"
                  placeholder="ex.: João Câmara, RN"
                />
              </div>
              <div className="lbl">
                <label htmlFor="change-courses">Curso alvo: </label>
                <Input
                  type="text"
                  name="courses"
                  id="change-courses"
                  placeholder="Administração, Informática etc"
                  list="courses"
                />
                <datalist id="courses">
                  <option value="Informática"></option>
                  <option value="Energias Renováveis"></option>
                  <option value="Eletrotécnica"></option>
                  <option value="Administração"></option>
                  <option value="Física"></option>
                </datalist>
              </div>
              <div className="lbl">
                <label htmlFor="descriptionVaga">Sobre a vaga: </label>
                <Editor editorState={editorState} onChange={setEditorState} />
                <div id="descriptionVaga"></div>
                <textarea
                  style={{
                    resize: "vertical",
                    minHeight: "200px",
                    maxHeight: "300px",
                  }}
                  placeholder="Descrição da vaga..."
                  className="txt-input"
                  name="description"
                  id="desc"
                  rows={10}
                  onKeyUp={counter}
                ></textarea>
                <div className="counter-box">
                  <p>
                    Limite de caracteres: <span id="count">1000</span>
                  </p>
                </div>
              </div>
              <div id="submit-container">
                <Button type="submit" id="submit-form">
                  Criar
                </Button>
              </div>
            </form>
          </BoxContent>
        </Box>
      </div>
    </section>
  );
}
