import { useState } from "react";
import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Input } from "../../../../components/input";

export default function CadastrarEmpresaPage() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="content">
      <Box>
        <BoxTitle>
          <h3>Cadastramento de Empresa</h3>
        </BoxTitle>
        <BoxContent>
          <form action="">
            <Input placeholder="Nome da empresa" name="nome" type="text" />
          </form>
        </BoxContent>
      </Box>
    </div>
  );
}
