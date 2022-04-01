import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { useAuth } from "../../../../hooks/useAuth";
import { CriarNovaVagaForm } from "./_form";

export default function CriarNovaVagaPage() {
  const auth = useAuth();
  // if (auth.type === "ALUNO") {
  //   return <h2>SEM PERMISÃO</h2>;
  // }
  return (
    <section>
      <div className="content">
        <Box>
          <BoxTitle>
            <h3>Criar nova vaga</h3>
          </BoxTitle>
          <BoxContent>
            <CriarNovaVagaForm />
            <div id="submit-container">
              <Button type="submit" form="form-create-vaga" id="submit-form" className="less-radius">
                Criar
              </Button>
            </div>
          </BoxContent>
        </Box>
      </div>
    </section>
  );
}
