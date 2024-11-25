const express = require('express');

const { Transaction,UserMoMoCollection,SusuDocs,OthersWithdrawalCollection,TellerInput3} = require('../mongodb');

const app = express();

// Display the number of MTN MoMo Withdrawal docs
const countWithdMoMoDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: type,
        TheBranch: branch,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(Wcount => {
        req.WdocumentsCount = Wcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of G-Money Withdrawal docs
const GMoneyWithdl = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "G-Money",
        Teller_Type: type,
        The_Branch: branch,
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(Gcount => {
        req.documentsGCount = Gcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of ATM docs
const ATMDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "ATM",
        Teller_Type: type,
        The_Branch: branch,
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AMTcount => {
        req.documentsATMCount = AMTcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Vodafone Cash Withdrawal docs
const countVodaWdDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: type,
        TheBranch: branch,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countvw => {
        req.documentsCountvw = countvw;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal Ecobank docs
const countEWithdlDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: type,
        TheBranch: branch,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countEw => {
        req.documentsCountEw = countEw;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of E-Zwich Withdrawal docs
const countEZwichDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Ezwich",
        Teller_Type: type,
        The_Branch: branch,
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countz => {
        req.documentsCountZ = countz;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal SuSu docs
const countSuSuWithdlDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: type,
        The_Branch: branch,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countsusuWd => {
        req.documentsCountsusuWd = countsusuWd;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Remittances Withdrawal docs
const countRemitDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Remittances",
        Teller_Type: type,
        The_Branch: branch,
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countR => {
        req.documentsCountR = countR;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Voda Withdrawal Amount
const VodaWithdrawalAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: type,
                    TheBranch: branch,
                    Description: "Withdrawal",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const VodawithdrawalAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.VodawithdrawalAmount = VodawithdrawalAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Ecobank Withdrawal Amount
const EcobankWithdrawalAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: type,
                    TheBranch: branch,
                    Description: "Withdrawal",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const EcobankWithdrawalAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.EcobankWithdrawalAmount = EcobankWithdrawalAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MTN Withdrawal Amount
const MoMoWithdrawalAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: type,
                    TheBranch: branch,
                    Description: "Withdrawal",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const MoMoWithdrawalAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.MoMoWithdrawalAmount = MoMoWithdrawalAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the SUSU Withdrawal Amount
const SuSuWithdrawalAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: type,
                    The_Branch: branch,
                    Description: "Withdrawal",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const SusuWithdrawalAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.SusuWithdrawalAmount = SusuWithdrawalAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the G-Money Withdrawal Amount
const GMoneyWithdlAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "G-Money",
                    Teller_Type: type,
                    The_Branch: branch,
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const GMoneyAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.GMoneyAmount = GMoneyAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the ATM Withdrawal Amount
const ATMWithdlAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "ATM",
                    Teller_Type: type,
                    The_Branch: branch,
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const ATMAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.ATMAmount = ATMAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Ezwich Withdrawal Amount
const EzwichWithdlAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Ezwich",
                    Teller_Type: type,
                    The_Branch: branch,
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const EzwichAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.EzwichAmount = EzwichAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Remmitance Withdrawal Amount
const RemittWithdlAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Remittances",
                    Teller_Type: type,
                    The_Branch: branch,
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const RemittAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.RemittAmount = RemittAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Commission Amount
const CommissionAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const MoMoDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    Description: "Deposit",
                    TellerType: type,
                    TheBranch: branch,
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Commission" }
                }
            }
        ]);

        const BanksCollectionDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Other Banks",
                    Description : "Deposit",
                    TheBranch: branch,
                    TellerType: type,
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Commission" }
                }
            }
        ]);

        const MoMoDocsAmount = MoMoDocs.length > 0 ? MoMoDocs[0].totalAmount : 0;
        const BanksCollectionAmount = BanksCollectionDocs.length > 0 ? BanksCollectionDocs[0].totalAmount : 0;

        const finalCommssAmount = MoMoDocsAmount + BanksCollectionAmount;

        req.CommssAmount = finalCommssAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Cash To Bank Amount
const CashToBankAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Cash To Bank",
                    Teller_Type: type,
                    The_Branch: branch,
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const LoadingAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.LoadingAmount = LoadingAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Expenses Amount
const ExpensesAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Expenses",
                    Teller_Type: type,
                    The_Branch: branch,
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
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

        const ExpensesAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.ExpensesAmount = ExpensesAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Cash Remaining Amount
const CashRemaining = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const RemainPCashs = await TellerInput3.find({
            Teller_Type: type,
            The_Branch: branch,
            Type: "Physical Cash Remaining",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let RemainPCash = '0';
        if (RemainPCashs.length > 0) {
            RemainPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            RemainPCash = RemainPCashs[0].Amount;
        }

        req.RemainPCash = RemainPCash;
        next();
    } catch (err) {
        console.error("Error fetching TM Remaining balance:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Withdrawal Costumers
const TotalWithdlCostumers = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.WdocumentsCount) || 0; 
        const TotalGmoney = parseFloat(req.documentsGCount) || 0; 
        const TotalATM = parseFloat(req.documentsATMCount) || 0;
        const TotalEcobank = parseFloat(req.documentsCountEw ) || 0;
        const TotalEzwich = parseFloat( req.documentsCountZ) || 0;
        const TotalSusudocs= parseFloat(req.documentsCountsusuWd) || 0;
        const TotalVoda= parseFloat(req.documentsCountvw) || 0;
        const TotalRemitt= parseFloat(req.documentsCountR) || 0;


        const TotalWCostumers = TotalEcobank + TotalATM + TotalGmoney + TotalMoMo + TotalEzwich  + TotalSusudocs + 
        TotalVoda + TotalRemitt;

        req.TotalWCostumers = TotalWCostumers;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Amount Withdrew 
const TotalAmountWithdrew = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.MoMoWithdrawalAmount) || 0; 
        const TotalATM = parseFloat(req.ATMAmount) || 0; 
        const TotalEcobank = parseFloat(req.EcobankWithdrawalAmount) || 0;
        const TotalEzwich = parseFloat(req.EzwichAmount) || 0;
        const TotalRemitt = parseFloat(req.RemittAmount) || 0;
        const TotalSusu = parseFloat(req.SusuWithdrawalAmount) || 0;
        const TotalVoda = parseFloat(req.VodawithdrawalAmount) || 0;
        const TotalGMoney = parseFloat(req.GMoneyAmount) || 0;


        const TotalWAmount  = TotalEzwich + TotalEcobank + TotalATM + TotalMoMo + TotalRemitt + 
        TotalSusu + TotalVoda + TotalGMoney;

        req.TotalWAmount = TotalWAmount ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Actual Amount Withdrew After All Computation
const ActualAmountWithdrew = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.MoMoWithdrawalAmount) || 0; 
        const TotalATM = parseFloat(req.ATMAmount) || 0; 
        const TotalEcobank = parseFloat(req.EcobankWithdrawalAmount) || 0;
        const TotalEzwich = parseFloat(req.EzwichAmount) || 0;
        const TotalRemitt = parseFloat(req.RemittAmount) || 0;
        const TotalSusu = parseFloat(req.SusuWithdrawalAmount) || 0;
        const TotalVoda = parseFloat(req.VodawithdrawalAmount) || 0;
        const TotalGMoney = parseFloat(req.GMoneyAmount) || 0;
        const TotalExpenses = parseFloat(req.ExpensesAmount) || 0;
        const PCashRemain = parseFloat(req.RemainPCash) || 0;
        const TotalCashToBank = parseFloat(req.LoadingAmount) || 0;
        const TCommission = parseFloat(req.CommssAmount) || 0;


        const ActualWAmount  = TotalEzwich + TotalEcobank + TotalATM + TotalMoMo + TotalRemitt + 
        TotalSusu + TotalVoda + TotalGMoney + TotalExpenses + PCashRemain + TotalCashToBank -TCommission;

        req.ActualWAmount = ActualWAmount ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {countWithdMoMoDocuments,countEWithdlDocuments,countSuSuWithdlDocuments,countEZwichDocuments,
countVodaWdDocuments,ATMDocuments,GMoneyWithdl,countRemitDocuments,TotalWithdlCostumers,VodaWithdrawalAmount,
EcobankWithdrawalAmount,MoMoWithdrawalAmount,SuSuWithdrawalAmount,GMoneyWithdlAmount,ATMWithdlAmount,
EzwichWithdlAmount,RemittWithdlAmount,TotalAmountWithdrew,CashRemaining,ExpensesAmount,CommissionAmount,CashToBankAmount,
ActualAmountWithdrew};



