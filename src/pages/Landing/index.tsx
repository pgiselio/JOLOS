import { LandNavBar } from "./navbar";
import { LandingStyle } from "./style";

export default function LandingPage() {
    window.location.href = "/entrar";
    return (
        <LandingStyle id="landing-page">
            <LandNavBar />
            <main className="landing-main">
                <section id="1">
                    CARROUSEL
                </section>
                <section id="2">

                </section>
                <section id="3">

                </section>
                <section id="4">

                </section>
            </main>
            <footer className="landing-footer">

            </footer>
        </LandingStyle>
    );
}