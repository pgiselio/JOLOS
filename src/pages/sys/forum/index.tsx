import { Box, BoxContent, BoxTitle } from "../../../components/box";
import { Button } from "../../../components/button";
import { HeaderTitle } from "../../../components/header-title";
import { OutsetHeadersCornerRadius } from "../../../components/outset-radius-to-headers";

export default function ForumPage() {
  return (
    <div id="forum-page">
      <section>
        <OutsetHeadersCornerRadius>
          <HeaderTitle className="header-section">
            <h2>Explore suas perguntas</h2>
          </HeaderTitle>
        </OutsetHeadersCornerRadius>

        <div className="content">
          <Box>
            <BoxTitle>
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                Perguntas
                <Button className="outlined" id="filtro">
                  Filtros <i className="fas fa-filter"></i>
                </Button>
              </h3>
            </BoxTitle>
            <BoxContent>
              <div className="ask-box">
                <div className="ask">
                  <a href="ask-unanswered.html" className="pessoa-forum-group">
                    <img
                      src="../../images/male-avatar-3.png"
                      alt="Imagem de Perfil"
                      className="candidato-pic"
                    />
                    <div className="pessoa-forum-info">
                      <h3>Estágio</h3>
                      <span>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </span>
                    </div>
                    <div className="situation-ask">
                      <i className="fas fa-exclamation-circle pendding"></i>
                    </div>
                  </a>
                </div>
                <div className="ask">
                  <a href="#oi" className="pessoa-forum-group">
                    <img
                      src="../../images/male-avatar-3.png"
                      alt="Imagem de Perfil"
                      className="candidato-pic"
                    />
                    <div className="pessoa-forum-info">
                      <h3>Jovem Aprendiz</h3>
                      <span>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </span>
                    </div>
                    <div className="situation-ask answered">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  </a>
                </div>
              </div>
            </BoxContent>
          </Box>
        </div>
      </section>
    </div>
  );
}
