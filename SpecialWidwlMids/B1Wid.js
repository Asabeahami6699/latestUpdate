const express = require('express');

const { Transaction,UserMoMoCollection,SusuDocs,OthersWithdrawalCollection,TellerInput3
 } = require('../mongodb');

const app = express();

// Display the number of MTN MoMo Withdrawal docs for "Bogoso" Teller-1
const B1MoMoC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B1Mc => {
        req.WMoMoB1Ct = B1Mc;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of G-Money Withdrawal docs for "Bogoso" Teller-1
const B1GmC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "G-Money",
        Teller_Type: "Teller-1",
        The_Branch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B1Gm => {
        req.docB1Gm = B1Gm ;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of ATM docs
const AtmB1 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "ATM",
        Teller_Type: "Teller-1",
        The_Branch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AtmB1 => {
        req.docAtmB1 = AtmB1;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Vodafone Cash Withdrawal docs
const B1Voda = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B1VdC => {
        req.docB1VdC = B1VdC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal Ecobank docs
const B1Ec = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B1E => {
        req.docB1E = B1E;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of E-Zwich Withdrawal docs
const B1Ezc = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Ezwich",
        Teller_Type: "Teller-1",
        The_Branch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B1Ez => {
        req.docB1Ez = B1Ez;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal SuSu docs
const B1susuC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: "Teller-1" ,
        The_Branch: "Bogoso" ,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B1Susud => {
        req.docB1Susud = B1Susud;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Remittances Withdrawal docs
const B1RemC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Remittances",
        Teller_Type: "Teller-1",
        The_Branch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(B1Rd => {
        req.docB1Rd = B1Rd;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Voda Withdrawal Amount
const B1VdWm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: "Teller-1",
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

        const B1VWm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1VW = B1VWm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Ecobank Withdrawal Amount
const B1EWm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-1",
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

        const B1Em = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1E = B1Em;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MTN Withdrawal Amount
const B1MTNm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: "Teller-1",
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

        const B1MTN = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1MTN = B1MTN;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the SUSU Withdrawal Amount
const B1susuM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-1",
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

        const B1susu = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1susu = B1susu;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the G-Money Withdrawal Amount
const B1Gmm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "G-Money",
                    Teller_Type: "Teller-1",
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

        const B1Gmm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1Gm = B1Gmm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the ATM Withdrawal Amount
const B1Atmm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "ATM",
                    Teller_Type: "Teller-1",
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

        const B1Atm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1Atm = B1Atm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Ezwich Withdrawal Amount
const B1Ezm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Ezwich",
                    Teller_Type: "Teller-1",
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

        const B1Ezmm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1Ezmm = B1Ezmm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Remmitance Withdrawal Amount
const B1Rem = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Remittances",
                    Teller_Type: "Teller-1",
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

        const B1Remm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1Remm = B1Remm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Commission Amount
const B1Com = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const MoMoDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    Description: "Deposit",
                    TellerType: "Teller-1",
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
                    TellerType: "Teller-1",
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

        const B1Comm = MoMoDocsAmount + BanksCollectionAmount;

        req.AmountB1Comm = B1Comm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Cash To Bank Amount
const B1ctb = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Cash To Bank",
                    Teller_Type: "Teller-1",
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

        const B1Load = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.LoadingB1 = B1Load;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Expenses Amount
const B1Ex = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Expenses",
                    Teller_Type: "Teller-1",
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

        const B1Exp = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountB1Exp = B1Exp;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Cash Remaining Amount
const B1CR = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const RemainPCashs = await TellerInput3.find({
            Teller_Type: "Teller-1",
            The_Branch: "Bogoso",
            Type: "Physical Cash Remaining",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let B1cashR = '0';
        if (RemainPCashs.length > 0) {
            RemainPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            B1cashR = RemainPCashs[0].Amount;
        }

        req.B1cashRm = B1cashR;
        next();
    } catch (err) {
        console.error("Error fetching TM Remaining balance:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Withdrawal Costumers
const B1TCos = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.WMoMoB1Ct) || 0; 
        const TotalGmoney = parseFloat(req.docB1Gm) || 0; 
        const TotalATM = parseFloat(req.docAtmB1) || 0;
        const TotalEcobank = parseFloat(req.docB1E ) || 0;
        const TotalEzwich = parseFloat( req.docB1Ez) || 0;
        const TotalSusudocs= parseFloat(req.docB1Susud) || 0;
        const TotalVoda= parseFloat(req.docB1VdC) || 0;
        const TotalRemitt= parseFloat(req.docB1Rd) || 0;


        const B1TCost = TotalEcobank + TotalATM + TotalGmoney + TotalMoMo + TotalEzwich  + TotalSusudocs + 
        TotalVoda + TotalRemitt;

        req.TotalB1Cost = B1TCost;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Amount Withdrew 
const B1TAM = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AmountB1MTN) || 0; 
        const TotalATM = parseFloat(req.AmountB1Atm) || 0; 
        const TotalEcobank = parseFloat(req.AmountB1E) || 0;
        const TotalEzwich = parseFloat(req.AmountB1Ezmm) || 0;
        const TotalRemitt = parseFloat(req.AmountB1Remm) || 0;
        const TotalSusu = parseFloat(req.AmountB1susu) || 0;
        const TotalVoda = parseFloat(req.AmountB1VW) || 0;
        const TotalGMoney = parseFloat(req.AmountB1Gm) || 0;


        const B1TM  = TotalEzwich + TotalEcobank + TotalATM + TotalMoMo + TotalRemitt + 
        TotalSusu + TotalVoda + TotalGMoney;

        req.B1WAmount = B1TM  ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Actual Amount Withdrew After All Computation
const B1ActW= async (req, res, next) => {
    try {
        const B1TM = parseFloat(req.B1WAmount) || 0;
        const TotalExpenses = parseFloat(req.AmountB1Exp) || 0;
        const PCashRemain = parseFloat(req.B1cashRm) || 0;
        const TotalCashToBank = parseFloat(req.LoadingB1) || 0;
        const TCommission = parseFloat(req.AmountB1Comm) || 0;


        const B1AW  = B1TM + TotalExpenses + PCashRemain + TotalCashToBank -TCommission;

        req.B1AWAmount = B1AW ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {B1MoMoC,B1GmC,AtmB1,B1Voda,B1Ec,B1Ezc,B1susuC,B1RemC,B1VdWm,B1EWm,B1MTNm,B1susuM,B1Gmm,B1Atmm,B1Ezm,B1Rem,B1Com,
B1ctb,B1Ex,B1CR,B1TCos,B1TAM,B1ActW};



