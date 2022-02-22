import { Button } from "../../components/button";
import { ProfilePic } from "../../components/profile-pic/profile-pic";
import "./profilePage.scss";

export function ProfilePage() {
    return (
        <>
            <section>
                <div className="tabs-menu ontop">
                    <div className="spacer"></div>
                    <div className="tabs-menu-container">
                        <ul>
                            <li><a href="#" className="active">Perfil</a></li>
                            <li><a href="#" className="">Sua conta</a></li>
                        </ul>
                    </div>
                </div>
                <div className="profile-page-header">
                    <div className="profile-page-header-container">
                        <div className="user-info">
                            <ProfilePic/>
                            <div className="profile-names">
                                <h2>Sua empresa</h2>
                                <span>XX.XXX.XXX/0001-XX</span>
                            </div>
                        </div>
                        <div className="user-actions">
                            <Button className="outlined">
                                Editar perfil
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="vaga-page-info">
                        <ul>
                            <li>
                                <div className="vaga-page-info-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>LOCALIZAÇÃO</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="vaga-columns-2">
                        <div className="column-1">
                            <div className="box">
                                <div className="box-title">
                                    <h3>Sobre nós</h3>
                                </div>
                                <div className="box-content">
                                    <div className="vaga-page-description">
                                        <p>asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
                                            asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasddas
                                            dasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasddas
                                        </p>
                                        <h1>AAAAAHHHHH111111</h1>
                                        <h2>adasdasdasdas</h2>
                                        <h3>aaaaaaaaaaaaaa</h3>
                                        <ol>
                                            <li>asdasdasdasdasdas</li>
                                            <li>asdasdasdasdasd</li>
                                            <li>asdasdasdasd</li>
                                            <li>asdasdasdasd</li>
                                            <li>asdasdasd</li>
                                            <li>asdasdasdadsad</li>
                                        </ol>
                                        <p><s>asdasdads</s></p>
                                        <p><strong>asasdasdasdasd</strong></p>
                                        <ul>
                                            <li>asdassadasdasdaasdasdasdasdasdasdasd</li>
                                            <li>asdasdasda</li>
                                            <li>aasdasdaaa</li>
                                        </ul>
                                        <ul>
                                            <li>asdassadasdasdaasdasdasdasdasdasdasd</li>
                                            <li>asdasdasda</li>
                                            <li>aasdasdaaa</li>
                                        </ul>
                                        <blockquote>asdasdasdasdasdasdasdasdasdasd</blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column-2">
                            <div className="box">
                                <div className="box-title">
                                    <h3>Contatos</h3>
                                </div>
                                <div className="box-content no-title">
                                    <div className="contacts">
                                        <ul className="essential-info">
                                            <li><a href="#"><i className="fas fa-envelope"></i> <span>email@seusite.com.br</span></a></li>
                                            <li><a href="#"><i className="fas fa-phone-alt"></i> <span>(84) 0000-0000</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-content">
                                    <ul className="social-info">
                                        <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                                        <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}