import { Button } from "../../components/button";
import { Notifications } from "../../components/notifications/notifications-list";

export function HomePage() {
    return (
        <>
            <div className="content">
                <Notifications/>
                <h2>BETOOOOOOOOOOOOOO!</h2>
                <h1>bola carro céu árvore joão pôr-do-sol </h1>
                <Button type='button' className="inactive">bom dia brasil</Button>
                <Button>
                    <i className="fas fa-user"></i> 
                    aaaaaaaaa
                </Button>
                <Button className="inactive">
                    <i className="fas fa-user"></i> 
                    aaaaaaaaa
                </Button>
                <Button className="less-radius">
                    aaaaaaaaa
                </Button>
                <Button className="outlined">outlined</Button>
                <Button className="outlined filled">outlined filled</Button>
                <Button className="outlined less-radius">outlined less-radius</Button>
                <Button className="outlined red">outlined red</Button>
                <Button className="outlined red filled">outlined red filled</Button>
                <Button className="outlined red less-radius">outlined red less-radius</Button>

                <Button className="outlined inactive">outlined</Button>
                <Button className="outlined filled inactive">outlined filled</Button>
                <Button className="outlined less-radius inactive">outlined less-radius</Button>
                <Button className="outlined red inactive">outlined red</Button>
                <Button className="outlined red filled inactive">outlined red filled</Button>
                <Button className="outlined red less-radius inactive">outlined red less-radius</Button>
            </div>
        </>
    );
}