import {  useState, useEffect, createContext, ReactNode } from 'react';
import { api } from './services/api';

interface Transactions {
    id: number,
    title: string,
    category:string,
    type:string,
    amount:number,
    createdAt: string,
}

type TransactionInput = Omit<Transactions,  'id' | 'createdAt'>;

interface TrasactionProviderProps {
    children: ReactNode;
  }

  interface TransactionsContextData {
      transactions: Transactions[];
      createTransaction: (transaction: TransactionInput) => void;
  }

  

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

export function TransactionProvider ( {children}: TrasactionProviderProps) {
    const [ transactions, setTransactions ] = useState<Transactions[] >([])

    useEffect (() => {  
    api.get('/transactions')
    .then(response => setTransactions (response.data.transactions) )
    },[]);

   async function createTransaction (transactionInput: TransactionInput) {
     const response =  await  api.post('/transactions', {
         ...transactionInput,
        createdAt: new Date (),
        });
     const {transaction} = response.data;

     setTransactions([
         ...transactions,
         transaction,
     ]);

    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
           {children}
        </TransactionsContext.Provider>
    )
} 