import { LandNavBar } from "./navbar";
import { LandingStyle } from "./style";

export function LandingPage() {
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