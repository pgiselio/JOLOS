import { ProfilePic } from '../profile-pic/profile-pic';
import { SidebarItem } from './sidebar-item';

export function SidebarList(){
    return(
        <section className="side-bar">
            <div className="side-bar-container">
                <div className="perfil">
                    <ProfilePic style={{width: 100 + "px", height: 100 + "px"} }/>
                    <h3 className="name-perfil">testando 123</h3>
                </div>

                <div className="data">
                    <ul className="data-items">
                        <SidebarItem href="/" icon="fas fa-home" label="Início"/>
                        <SidebarItem href="/" icon="fas fa-user" label="Dados"/>
                        <SidebarItem href="/" icon="fas fa-briefcase" label="Vagas"/>
                        <SidebarItem href="/" icon="fas fa-comments" label="Fórum"/>
                        <SidebarItem href="/" icon="fas fa-sign-out-alt" label="Sair" className="sair"/>
                    </ul>
                </div>
            </div>
        </section>

    );
}