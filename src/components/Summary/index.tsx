import { Container } from './styles'
import IncomeIMG from '../../assets/income.svg'
import OutcomeMG from '../../assets/outcome.svg'
import TotalIMG from '../../assets/total.svg'
import { useContext } from 'react'
import { TransactionsContext } from '../../TransactionContext'

export function Summary (){

    const {transactions} = useContext(TransactionsContext);

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'Deposit') {
            acc.deposit +=  transaction.amount
            acc.total += transaction.amount
        }else {
            acc.withdraw +=  transaction.amount
            acc.total -= transaction.amount
        }
        return acc;
    },  {
        withdraw: 0,
        deposit: 0,
        total: 0,
    });

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeIMG} alt="Income"/>
                </header>
                <strong>
                    {Intl.NumberFormat('pt-BR',{
                                   style: 'currency',
                                   currency: 'BRL',
                               }).format(summary.deposit)}
                               </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeMG} alt="Outcome"/>
                </header>
                <strong>- 
                {Intl.NumberFormat('pt-BR',{
                                   style: 'currency',
                                   currency: 'BRL',
                               }).format(summary.withdraw)}
               </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={TotalIMG} alt="Total"/>
                </header>
                <strong>
                    {Intl.NumberFormat('pt-BR',{
                                   style: 'currency',
                                   currency: 'BRL',
                               }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}