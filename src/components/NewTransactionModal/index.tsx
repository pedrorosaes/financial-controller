import { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';
import { TransactionsContext } from '../../TransactionContext';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'


import { Container, TransactionTypeContainer, RadioBox } from './styles';



interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: ()=>void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    const {createTransaction} = useContext(TransactionsContext);

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('Deposit');

    async function handleTransaction (event : FormEvent){
        event.preventDefault();

     await   createTransaction ({
            title,
            amount,
            category,
            type,
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('Deposit');
        onRequestClose();

    }

    return(
        
        <Modal
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className = "react-modal-content"
        >
         <button type="button" onClick={onRequestClose} className="react-modal-close">
             <img src={closeImg} alt="Fechar Modal"/>
             </button>   
        <Container>  
                 <h2> Cadastrar Transação</h2>
                  <input 
                  placeholder="Titulo"
                  value={title}
                  onChange={event => setTitle( event.target.value)}
                  /> 

                  <input 
                   type="number"
                  placeholder="Valor"
                  value={amount}
                  onChange={event => setAmount(Number(event.target.value))}
                  /> 
                <TransactionTypeContainer>
                <RadioBox 
                type="button"
                onClick={()=> {setType('Deposit');}}
                isType={type === 'Deposit'}
                activeColor='green'
                >
                    <img src={incomeImg} alt="Income IMG"/>
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox 
                type="button"
                onClick={()=> {setType('Withdraw');}}
                isType={type === 'Withdraw'}
                activeColor='red'

                >
                    <img src={outcomeImg} alt="Outcome IMG"/>
                    <span>Saída</span>
                </RadioBox>    
                </TransactionTypeContainer>


                  <input 
                  placeholder="Categoria"
                  value={category}
                  onChange={(event) =>  setCategory(event.target.value)}
                  /> 

                  <button type="submit" onClick={handleTransaction}>Cadastrar</button>
        </Container>
        </Modal>
        
    )
}