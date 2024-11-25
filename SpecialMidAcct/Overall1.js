const express = require('express');

const { COverallColt,OperationalColt,UserMoMoCollection,Transaction} = require('../mongodb');

const app = express();


// Timestamp calculation logic
const calculateTimestampRange = () => {
    const now = new Date();

    // Define the start of the range (7:30 PM today or yesterday if current time is before 7:30 PM)
    const startOfRange = new Date(now);
    startOfRange.setHours(19, 30, 0, 0); // Set to 7:30 PM today
    if (now < startOfRange) {
        // If before 7:30 PM, adjust to yesterday's 7:30 PM
        startOfRange.setDate(startOfRange.getDate() - 1);
    }

    // Define the end of the range (7:30 PM the next day)
    const endOfRange = new Date(startOfRange);
    endOfRange.setDate(endOfRange.getDate() + 1);

    return { startOfRange, endOfRange };
};


const operational1 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); 

        const result = await OperationalColt.aggregate([
            {
                $match: {
                    UserType: "Operational",
                    DocumentType: "Actual Entry",
                    Timestamp: {
                        $gte: currentDate, 
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    docCount: { $sum: 1 }, 
                    totalAmount: { $sum: "$Amount" }
                }
            }
        ]);

        req.opt1DocCount = result.length > 0 ? result[0].docCount : 0;
        req.opt1TotalAmount = result.length > 0 ? result[0].totalAmount : 0;

        next(); 
    } catch (err) {
        console.error("Error processing operational documents:", err);
        res.status(500).send('Internal Server Error');
    }
};


const getEcobankAccountData = (req, res, next) => {
    
    const { startOfRange, endOfRange } = calculateTimestampRange();

    // Query to count amounts grouped by account type within the specified range
    COverallColt.aggregate([
        {
            $match: {
                AccountType: "Ecobank",
                Document: "Account Balance Doc",
                Timestamp: { $gte: startOfRange, $lt: endOfRange }
            }
        },
        {
            $group: {
                _id: "$Description",
                totalAmount: { $sum: "$Amount" }
            }
        }
    ])
    .then(accountData => {
        // Initialize the account totals
        const accountSummary = {
            "54. ACCOUNT": 0,
            "20. ACCOUNT": 0,
            "10. ACCOUNT": 0,
            "80. ACCOUNT": 0,
            accountTotal: 0
        };

        // Assign totals to respective accounts
        accountData.forEach(account => {
            if (accountSummary.hasOwnProperty(account._id)) {
                accountSummary[account._id] = account.totalAmount;
                accountSummary.accountTotal += account.totalAmount;
            }
        });

        req.ecobankTotal = accountSummary.accountTotal;
        req.accountSummary = accountSummary;
        next();
    })
    .catch(err => {
        console.error("Error fetching account data:", err);
        res.status(500).send("Error fetching account data");
    });
};

const getMoMoAccountData = (req, res, next) => {
    
    const { startOfRange, endOfRange } = calculateTimestampRange();

    COverallColt.aggregate([
        {
            $match: {
                AccountType: "MoMo/Voda",
                Document: "Account Balance Doc",
                Timestamp: { $gte: startOfRange, $lt: endOfRange }
            }
        },
        {
            $group: {
                _id: "$Description",
                totalAmount: { $sum: "$Amount" }
            }
        }
    ])
    .then(accountData => {
        const momoAccountSummary = {
            "MTN": 0,
            "VODA": 0,
            "SUSU MOMO": 0,
            "MOMO": 0,
            "G.MONEY": 0,
            "ZEEPAY": 0,
            "0243028644": 0,
            totalBalance: 0
        };

        accountData.forEach(account => {
            if (momoAccountSummary.hasOwnProperty(account._id)) {
                momoAccountSummary[account._id] = account.totalAmount;
                momoAccountSummary.totalBalance += account.totalAmount;
            }
        });

        req.momoTotal = momoAccountSummary.totalBalance;
        req.momoAccountSummary = momoAccountSummary;
        next();
    })
    .catch(err => {
        console.error("Error fetching MoMo account data:", err);
        res.status(500).send("Error fetching MoMo account data");
    });
};

const calculateOtherBankBalances = (req, res, next) => {
    
    const { startOfRange, endOfRange } = calculateTimestampRange();

    COverallColt.aggregate([
        {
            $match: {
                Document: "Account Balance Doc",
                AccountType: "Other Bank",
                Timestamp: {
                    $gte: startOfRange,
                    $lt: endOfRange,
                }
            }
        },
        {
            $group: {
                _id: "$Description",
                totalAmount: { $sum: "$Amount" }
            }
        }
    ])
    .then(result => {
        const otherBankAccountSummary = {
            "CALBANK": 0,
            "FIDELITY 1": 0,
            "FIDELITY 2": 0,
            "GCB": 0,
            "91 ACCOUNT": 0,
            "CALBANK FLOAT": 0,
            "WITHDRAWALS": 0,
            totalBalance: 0
        };

        result.forEach(doc => {
            otherBankAccountSummary[doc._id] = doc.totalAmount;
            otherBankAccountSummary.totalBalance += doc.totalAmount;
        });

        req.otherBanksTotal = otherBankAccountSummary.totalBalance;

        req.otherBankAccountSummary = otherBankAccountSummary;
        next();
    })
    .catch(err => {
        console.error("Error calculating other bank balances:", err);
        res.status(500).send("Error calculating balances");
    });
};

const calculatePhysicalCashAmounts = (req, res, next) => {
    
    const { startOfRange, endOfRange } = calculateTimestampRange();

    const physicalCashSummary = {
        "AIYINASI": 0,
        "BOGOSO": 0,
        "PRESTEA": 0,
        "OTHER": 0,
        "PREVIOUS": 0,
        "SUSU": 0,
        totalAmount: 0
    };

    const pcashAggregate = COverallColt.aggregate([
        {
            $match: {
                Document: "PCash Doc",
                Branch: { $ne: "SUSU VAULT PREVIOUS" },
                Timestamp: {
                    $gte: startOfRange,
                    $lt: endOfRange,
                }
            }
        },
        {
            $group: {
                _id: "$Branch",
                totalAmount: { $sum: "$Amount" }
            }
        }
    ]);

    const susuAggregate = COverallColt.aggregate([
        {
            $match: {
                Document: "SUSU Transaction Doc",
                Description: "MOBILISERS",
                Timestamp: {
                    $gte: startOfRange,
                    $lt: endOfRange,
                }
            }
        },
        {
            $group: {
                _id: null,  
                totalAmount: { $sum: "$Amount" }
            }
        }
    ]);

    Promise.all([pcashAggregate, susuAggregate])
        .then(([pcashResult, susuResult]) => {
            pcashResult.forEach(doc => {
                physicalCashSummary[doc._id] = doc.totalAmount;
                physicalCashSummary.totalAmount += doc.totalAmount;
            });

            if (susuResult.length > 0) {
                physicalCashSummary["SUSU"] = susuResult[0].totalAmount;
                physicalCashSummary.totalAmount += susuResult[0].totalAmount;
            }

            req.pcashTotal = physicalCashSummary.totalAmount;

            req.physicalCashSummary = physicalCashSummary;
            next();
        })
        .catch(err => {
            console.error("Error calculating physical cash amounts:", err);
            res.status(500).send("Error calculating amounts");
        });
};

// Middleware to calculate unsettled transactions
const calculateUnsettledTransacs = async (req, res, next) => {
    
    const { startOfRange, endOfRange } = calculateTimestampRange();

    try {
        const unsettledTransactions = await COverallColt.find({
            Document: "Unsettled Balances Doc",
            Timestamp: {
                $gte: startOfRange,
                $lt: endOfRange,
            } 
        }).lean();

        const unsettledSummary = {
            "unsettled remittance": { AIYINASI: 0, BOGOSO: 0, PRESTEA: 0, total: 0 },
            "unsettled ezwich": { AIYINASI: 0, BOGOSO: 0, PRESTEA: 0, total: 0 },
            "unsettled atm": { AIYINASI: 0, BOGOSO: 0, PRESTEA: 0, total: 0 },
        };

  
        unsettledTransactions.forEach(transaction => {
            const transactionType = transaction.TransactionType; 
            const branch = transaction.Branch; 

            if (unsettledSummary[transactionType]) {
                unsettledSummary[transactionType][branch] += transaction.Amount; 
                unsettledSummary[transactionType].total += transaction.Amount; 
            }
        });

        
        const overallTotal = Object.values(unsettledSummary).reduce((acc, type) => acc + type.total, 0);

        req.unsettledTotal = overallTotal;

        req.unsettledSummary = unsettledSummary;

        next();
    } catch (error) {
        console.error("Error calculating unsettled transactions:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Middleware to calculate SUSU transactions summary
const calculateSusuTransacs = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        const susuTransactions = await COverallColt.find({
            Document: "SUSU Transaction Doc",
            Timestamp: {
                $gte: startOfRange,
                $lt: endOfRange,
            }
        }).lean();

        const susuSummary = {
            "MXP BOGOSO": { CREDIT: 0, WALKING: 0, MOBILISERS: 0, WITHDRAWALS: 0, BAL: 0 },
            "LUTECH AIYINASI": { CREDIT: 0, WALKING: 0, MOBILISERS: 0, WITHDRAWALS: 0, BAL: 0 },
            "SUSU PRESTEA": { CREDIT: 0, WALKING: 0, MOBILISERS: 0, WITHDRAWALS: 0, BAL: 0 },
            Total: { CREDIT: 0, WALKING: 0, MOBILISERS: 0, WITHDRAWALS: 0, BAL: 0 },
        };

        susuTransactions.forEach(transaction => {
            const transactionType = transaction.TransactionType;
            const description = transaction.Description;
            const amount = transaction.Amount;

            // Check if the transaction type and description exist in susuSummary
            if (susuSummary[transactionType] && susuSummary[transactionType][description] !== undefined) {
                susuSummary[transactionType][description] += amount;
                susuSummary.Total[description] += amount;
            }
        });

        // Calculate the balance for each branch and the total balance
        for (const branch in susuSummary) {
            if (branch !== "Total") {
                const { CREDIT, WALKING, MOBILISERS, WITHDRAWALS } = susuSummary[branch];
                susuSummary[branch].BAL = CREDIT + WALKING + MOBILISERS - WITHDRAWALS;
            }
        }

        // Calculate the total balance
        const { CREDIT, WALKING, MOBILISERS, WITHDRAWALS } = susuSummary.Total;
        susuSummary.Total.BAL = CREDIT + WALKING + MOBILISERS - WITHDRAWALS;

        req.susuSummary = susuSummary;

        next();
    } catch (error) {
        console.error("Error calculating SUSU transactions:", error);
        res.status(500).send("Internal Server Error");
    }
};

const fetchRepaymentTransacs = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        const repayments = await COverallColt.find({
            Document: "Pending Transactions Doc",
            TransactionType: "repayment",
            Timestamp: { $gte: startOfRange, $lt: endOfRange }
        }).lean();

        // Calculate total amount
        const totalRepayment = repayments.reduce((sum, transaction) => sum + transaction.Amount, 0);

        req.repaymentSummary = { repayments, totalRepayment };
        req.repaymentTotal = totalRepayment;

        next();
    } catch (error) {
        console.error("Error calculating repayment transactions:", error);
        res.status(500).send("Internal Server Error");
    }
};

const calculateGivenOutTransacs = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        const givenOutTransactions = await COverallColt.find({
            Document: "Given-Out/Personal Expenses Doc",
            TransactionType: "Given Out",
            Timestamp: {
                $gte: startOfRange,
                $lt: endOfRange,
            }
        }).lean();

        const totalGivenOut = givenOutTransactions.reduce((sum, transaction) => sum + transaction.Amount, 0);

        req.givenOutSummary = {
            givenOutTransactions,
            totalGivenOut
        };

        req.givenoutTotal = totalGivenOut;

        next();
    } catch (error) {
        console.error("Error calculating given-out transactions:", error);
        res.status(500).send("Internal Server Error");
    }
};

const calculatePersonalExpenses = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        const personalExpenses = await COverallColt.find({
            Document: "Given-Out/Personal Expenses Doc",
            TransactionType: "Personal Expenses",
            Timestamp: {
                $gte: startOfRange,
                $lt: endOfRange,
            }
        }).lean();

        const totalPersonalExpenses = personalExpenses.reduce((sum, transaction) => sum + transaction.Amount, 0);

        req.personalExpensesSummary = {
            personalExpenses,
            totalPersonalExpenses
        };
        req.PExpensesTotal = totalPersonalExpenses;

        next();
    } catch (error) {
        console.error("Error calculating personal expenses:", error);
        res.status(500).send("Internal Server Error");
    }
};

const calculateReversals = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        const reversals = await COverallColt.find({
            Document: "Pending Transactions Doc",
            TransactionType: "reversal",
            Timestamp: { $gte: startOfRange, $lt: endOfRange }
        }).lean(); 

        const totalReversals = reversals.reduce((sum, transaction) => sum + transaction.Amount, 0);

        req.reversals = reversals;           
        req.totalReversals = totalReversals; 

        next();
    } catch (error) {
        console.error("Error calculating reversal transactions:", error);
        res.status(500).send("Internal Server Error");
    }
};

const calculatePendingTransacs = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        const pendingTransactions = await COverallColt.find({
            Document: "Pending Transactions Doc",
            TransactionType: "pending transaction",
            Timestamp: { $gte: startOfRange, $lt: endOfRange }
        }).lean(); 

        const totalPendingTransactions = pendingTransactions.reduce((sum, transaction) => sum + transaction.Amount, 0);

        req.pendingTransactions = pendingTransactions;            
        req.totalPendingTransactions = totalPendingTransactions;  

        next();
    } catch (error) {
        console.error("Error calculating pending transactions:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Middleware to calculate daily commission summary
const calculateCommissions = async (req, res, next) => {
    try {

      const { startOfRange, endOfRange } = calculateTimestampRange();
  
      const commissionTransactions = await COverallColt.find({
        Document: "Expenses & Commission Doc",
        Timestamp: { $gte: startOfRange, $lt: endOfRange },
        TransactionType: "Commission"
      }).lean();
  
      // Initialize summary object for each teller
      const commissionSummary = {
        "Aiyinase Teller 1": 0,
        "Aiyinase Teller 2": 0,
        "Bogoso Teller 1": 0,
        "Bogoso Teller 2": 0,
        "Prestea Teller 1": 0,
        "Prestea Teller 2": 0,
        "Ezwich": 0,
        "Remittance": 0,
        "Interbank Commission": 0,
        Total: 0
      };
  
      // Summing up commissions by Description
      commissionTransactions.forEach(transaction => {
        const description = transaction.Description;
        const amount = transaction.Amount;
  
        // Check if description matches a known teller in the summary object
        if (commissionSummary[description] !== undefined) {
          commissionSummary[description] += amount; 
          commissionSummary.Total += amount; 
        }
      });
  
    
      req.commissionSummary = commissionSummary;
      req.monthlyCommissionTotal = commissionSummary.Total;
  
      next();
    } catch (error) {
      console.error("Error calculating daily commissions:", error);
      res.status(500).send("Internal Server Error");
    }
};
  
// Middleware to calculate daily expenses summary
const calculateExpenses = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        const expensesData = await COverallColt.find({
            Document: "Expenses & Commission Doc",
            Timestamp: { $gte: startOfRange, $lt: endOfRange },
            TransactionType: "Expenses"
        }).lean();

        const expensesSummary = {
            "Aiyinase Teller 1": 0,
            "Aiyinase Teller 2": 0,
            "Bogoso Teller 1": 0,
            "Bogoso Teller 2": 0,
            "Prestea Teller 1": 0,
            "Prestea Teller 2": 0,
            "Other": 0,
            "Daily Transaction Charges": 0,
            "End of Month Acct. Charges": 0,
            Total: 0
        };

        expensesData.forEach(expense => {
            const description = expense.Description;
            const amount = expense.Amount;

            if (expensesSummary[description] !== undefined) {
                expensesSummary[description] += amount;
                expensesSummary.Total += amount; // Update total amount
            }
        });

        req.expensesSummary = expensesSummary;
        req.monthlyExpensesTotal = expensesSummary.Total;

        next();
    } catch (error) {
        console.error("Error calculating daily expenses:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Middleware to calculate monthly commission total
const MonthlyCommissions = async (req, res, next) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(startOfMonth.getMonth() + 1);

        const commissionTransactions = await COverallColt.find({
            Document: "Expenses & Commission Doc",
            Timestamp: {
                $gte: startOfMonth,
                $lt: endOfMonth,
            },
            TransactionType: "Commission"
        }).lean();

        const commissionMonthly = commissionTransactions.reduce((acc, transaction) => {
            return acc + (transaction.Amount || 0);
        }, 0);

        req.commissionMonthly = commissionMonthly;

        next();
    } catch (error) {
        console.error("Error calculating monthly commissions:", error);
        res.status(500).send("Internal Server Error");
    }
};


// Middleware to calculate monthly expense total
const MonthlyExpenses = async (req, res, next) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(startOfMonth.getMonth() + 1);

        const expenseTransactions = await COverallColt.find({
            Document: "Expenses & Commission Doc",
            Timestamp: {
                $gte: startOfMonth,
                $lt: endOfMonth,
            },
            TransactionType: "Expenses"
        }).lean();

        const expenseMonthly = expenseTransactions.reduce((acc, transaction) => {
            return acc + (transaction.Amount || 0);
        }, 0);

        req.expenseMonthly = expenseMonthly;

        next();
    } catch (error) {
        console.error("Error calculating monthly expenses:", error);
        res.status(500).send("Internal Server Error");
    }
};


const calculateOpeningBalance = async (req, res, next) => {
    try {

        const { startOfRange, endOfRange } = calculateTimestampRange();

        const openingBalanceDocs = await COverallColt.find({
            Document: "Account Balance Doc",
            AccountType: "Opening Balance",
            Timestamp: {
                $gte: startOfRange,
                $lt: endOfRange,
            }
        }).lean();

        const openingBalance = openingBalanceDocs.reduce((acc, doc) => acc + (doc.Amount || 0), 0);

        req.openingBalance = openingBalance;

        next();
    } catch (error) {
        console.error("Error calculating opening balance total:", error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = {operational1,getEcobankAccountData,getMoMoAccountData,calculateOtherBankBalances,
    calculatePhysicalCashAmounts,calculateUnsettledTransacs,calculateSusuTransacs,fetchRepaymentTransacs,
    calculateGivenOutTransacs,calculatePersonalExpenses,calculateReversals,calculatePendingTransacs,
    calculateCommissions,calculateExpenses,MonthlyCommissions,MonthlyExpenses,calculateOpeningBalance
};