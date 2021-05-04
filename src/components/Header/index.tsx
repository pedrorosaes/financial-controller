import LogoImg from '../../assets/logo.svg'
import { Container, Content } from './styles';

interface HeaderModalProps {
    onTransactionOpenModal : ()=> void;
}

export function Header({onTransactionOpenModal}: HeaderModalProps) {


    return (
        <Container>
            <Content>
                <img src={LogoImg} alt="Controller Financial"/>
                <button onClick={onTransactionOpenModal} >Nova Transação</button> 
            </Content>
        </Container>
    );
}