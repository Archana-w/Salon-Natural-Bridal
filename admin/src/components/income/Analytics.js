import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransection }) => {
  // category
  // const categories = [
  //   "Service",
  //   "Retail",
  //   "Membership",
  //   "Special",
  //   "Gift",
  //   "Payroll",
  //   "Supplies",
  //   "Rent",
  //   "Maintenance",
  //   "Marketing",
  //   "Order",
  //   "Salary",
    
  // ];

  // total transaction
  const totalTransaction = allTransection.length;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total turnover
 
  const totalIncome = totalIncomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = totalExpenseTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalProfit= totalIncome-totalExpense;

  const totalProfitPercent =
    (totalProfit / totalIncome) * 100;
  const totalExpenseValPercent =
    (totalExpense / totalIncome) * 100;

    allTransection.sort((a,b)=>b.amount-a.amount);

  const categories = allTransection.reduce((map, transaction) => {
    if(transaction.type === "income"){
      map.income[transaction.category] = (map.income[transaction.category] || 0) + transaction.amount;
    }else{
      map.expense[transaction.category] = (map.expense[transaction.category] || 0) + transaction.amount;
    }
    return map;
  }, {expense:[],income:[]});



  const incomeCategories = [...Object.keys(categories.income)];
  const expenseCategories = [...Object.keys(categories.expense)];

  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransactions.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Income: {totalIncome}</div>
            <div className="card-body">
              <h5 className="text-success">Profit : {totalProfit}</h5>
              <h5 className="text-danger">Expense : {totalExpense}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalProfitPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseValPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <h4>Categorywise Income</h4>
          {incomeCategories.map((category) => {
            const amount = ((categories.income[category]/totalIncome)*100).toFixed(0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={amount}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>Categorywise Expense</h4>
          {expenseCategories.map((category) => {
            const amount = ((categories.expense[category]/totalExpense)*100).toFixed(0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={amount}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;