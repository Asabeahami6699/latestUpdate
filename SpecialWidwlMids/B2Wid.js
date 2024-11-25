const express = require('express');

const { Transaction,UserMoMoCollection,SusuDocs,OthersWithdrawalCollection,TellerInput3
 } = require('../mongodb');

const app = express();

// Display the number of MTN MoMo Withdrawal docs for "Bogoso" Teller-2
const B2MoMoC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B2Mc => {
        req.WMoMoB2Ct = B2Mc;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of G-Money Withdrawal docs for "Bogoso" Teller-2
const B2GmC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "G-Money",
        Teller_Type: "Teller-2",
        The_Branch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B2Gm => {
        req.docB2Gm = B2Gm ;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of ATM docs
const AtmB2 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "ATM",
        Teller_Type: "Teller-2",
        The_Branch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AtmB2 => {
        req.docAtmB2 = AtmB2;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Vodafone Cash Withdrawal docs
const B2Voda = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B2VdC => {
        req.docB2VdC = B2VdC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal Ecobank docs
const B2Ec = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B2E => {
        req.docB2E = B2E;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of E-Zwich Withdrawal docs
const B2Ezc = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Ezwich",
        Teller_Type: "Teller-2",
        The_Branch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B2Ez => {
        req.docB2Ez = B2Ez;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal SuSu docs
const B2susuC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: "Teller-2" ,
        The_Branch: "Bogoso" ,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B2Susud => {
        req.docB2Susud = B2Susud;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Remittances Withdrawal docs
const B2RemC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Remittances",
        Teller_Type: "Teller-2",
        The_Branch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B2Rd => {
        req.docB2Rd = B2Rd;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Voda Withdrawal Amount
const B2VdWm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: "Teller-2",
                    TheBranch: "Bogoso",
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

        const B2VWm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2VW = B2VWm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Ecobank Withdrawal Amount
const B2EWm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-2",
                    TheBranch: "Bogoso",
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

        const B2Em = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2E = B2Em;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MTN Withdrawal Amount
const B2MTNm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: "Teller-2",
                    TheBranch: "Bogoso",
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

        const B2MTN = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2MTN = B2MTN;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the SUSU Withdrawal Amount
const B2susuM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
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

        const B2susu = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2susu = B2susu;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the G-Money Withdrawal Amount
const B2Gmm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "G-Money",
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
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

        const B2Gmm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2Gm = B2Gmm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the ATM Withdrawal Amount
const B2Atmm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "ATM",
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
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

        const B2Atm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2Atm = B2Atm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Ezwich Withdrawal Amount
const B2Ezm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Ezwich",
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
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

        const B2Ezmm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2Ezmm = B2Ezmm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Remmitance Withdrawal Amount
const B2Rem = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Remittances",
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
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

        const B2Remm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2Remm = B2Remm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Commission Amount
const B2Com = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const MoMoDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    Description: "Deposit",
                    TellerType: "Teller-2",
                    TheBranch: "Bogoso",
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
                    TellerType: "Teller-2",
                    TheBranch: "Bogoso",
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

        const B2Comm = MoMoDocsAmount + BanksCollectionAmount;

        req.AmountB2Comm = B2Comm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Cash To Bank Amount
const B2ctb = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Cash To Bank",
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
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

        const B2Load = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.LoadingB2 = B2Load;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Expenses Amount
const B2Ex = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Expenses",
                    Teller_Type: "Teller-2",
                    The_Branch: "Bogoso",
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

        const B2Exp = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB2Exp = B2Exp;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Cash Remaining Amount
const B2CR = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const RemainPCashs = await TellerInput3.find({
            Teller_Type: "Teller-2",
            The_Branch: "Bogoso",
            Type: "Physical Cash Remaining",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let B2cashR = '0';
        if (RemainPCashs.length > 0) {
            RemainPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            B2cashR = RemainPCashs[0].Amount;
        }

        req.B2cashRm = B2cashR;
        next();
    } catch (err) {
        console.error("Error fetching TM Remaining balance:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Withdrawal Costumers
const B2TCos = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.WMoMoB2Ct) || 0; 
        const TotalGmoney = parseFloat(req.docB2Gm) || 0; 
        const TotalATM = parseFloat(req.docAtmB2) || 0;
        const TotalEcobank = parseFloat(req.docB2E ) || 0;
        const TotalEzwich = parseFloat( req.docB2Ez) || 0;
        const TotalSusudocs= parseFloat(req.docB2Susud) || 0;
        const TotalVoda= parseFloat(req.docB2VdC) || 0;
        const TotalRemitt= parseFloat(req.docB2Rd) || 0;


        const B2TCost = TotalEcobank + TotalATM + TotalGmoney + TotalMoMo + TotalEzwich  + TotalSusudocs + 
        TotalVoda + TotalRemitt;

        req.TotalB2Cost = B2TCost;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Amount Withdrew 
const B2TAM = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AmountB2MTN) || 0; 
        const TotalATM = parseFloat(req.AmountB2Atm) || 0; 
        const TotalEcobank = parseFloat(req.AmountB2E) || 0;
        const TotalEzwich = parseFloat(req.AmountB2Ezmm) || 0;
        const TotalRemitt = parseFloat(req.AmountB2Remm) || 0;
        const TotalSusu = parseFloat(req.AmountB2susu) || 0;
        const TotalVoda = parseFloat(req.AmountB2VW) || 0;
        const TotalGMoney = parseFloat(req.AmountB2Gm) || 0;


        const B2TM  = TotalEzwich + TotalEcobank + TotalATM + TotalMoMo + TotalRemitt + 
        TotalSusu + TotalVoda + TotalGMoney;

        req.B2WAmount = B2TM  ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Actual Amount Withdrew After All Computation
const B2ActW= async (req, res, next) => {
    try {
        const B2TM = parseFloat(req.B2WAmount) || 0;
        const TotalExpenses = parseFloat(req.AmountB2Exp) || 0;
        const PCashRemain = parseFloat(req.B2cashRm) || 0;
        const TotalCashToBank = parseFloat(req.LoadingB2) || 0;
        const TCommission = parseFloat(req.AmountB2Comm) || 0;


        const B2AW  = B2TM + TotalExpenses + PCashRemain + TotalCashToBank -TCommission;

        req.B2AWAmount = B2AW ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {B2MoMoC,B2GmC,AtmB2,B2Voda,B2Ec,B2Ezc,B2susuC,B2RemC,B2VdWm,B2EWm,B2MTNm,B2susuM,B2Gmm,B2Atmm,B2Ezm,B2Rem,B2Com,
B2ctb,B2Ex,B2CR,B2TCos,B2TAM,B2ActW};



