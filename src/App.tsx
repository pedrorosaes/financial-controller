import { Dashboard } from "./components/Dashboard";
import Modal from 'react-modal';
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import {  TransactionProvider} from "./TransactionContext";

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModelOpen] = useState(false);

  function handleOpenNewTransactionModal (){
      setIsNewTransactionModelOpen(true);
  }
  
  function handleCloseNewTransactionModal(){
      setIsNewTransactionModelOpen(false);
  }

  return (
    <TransactionProvider>
    
      <Header onTransactionOpenModal={handleOpenNewTransactionModal}/> 

      <Dashboard/>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
    <GlobalStyle/>
    </TransactionProvider>
  );
}


