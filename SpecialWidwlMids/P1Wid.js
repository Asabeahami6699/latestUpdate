const express = require('express');

const { Transaction,UserMoMoCollection,SusuDocs,OthersWithdrawalCollection,TellerInput3
 } = require('../mongodb');

const app = express();

// Display the number of MTN MoMo Withdrawal docs for "Prestea" Teller-1
const P1MoMoC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: "Teller-1",
        TheBranch: "Prestea",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(P1Mc => {
        req.WMoMoP1Ct = P1Mc;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of G-Money Withdrawal docs for "Prestea" Teller-1
const P1GmC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "G-Money",
        Teller_Type: "Teller-1",
        The_Branch: "Prestea",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(P1Gm => {
        req.docP1Gm = P1Gm ;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of ATM docs
const AtmP1 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "ATM",
        Teller_Type: "Teller-1",
        The_Branch: "Prestea",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AtmP1 => {
        req.docAtmP1 = AtmP1;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Vodafone Cash Withdrawal docs
const P1Voda = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: "Teller-1",
        TheBranch: "Prestea",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(P1VdC => {
        req.docP1VdC = P1VdC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal Ecobank docs
const P1Ec = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-1",
        TheBranch: "Prestea",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(P1E => {
        req.docP1E = P1E;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of E-Zwich Withdrawal docs
const P1Ezc = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Ezwich",
        Teller_Type: "Teller-1",
        The_Branch: "Prestea",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(P1Ez => {
        req.docP1Ez = P1Ez;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal SuSu docs
const P1susuC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: "Teller-1" ,
        The_Branch: "Prestea" ,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(P1Susud => {
        req.docP1Susud = P1Susud;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Remittances Withdrawal docs
const P1RemC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Remittances",
        Teller_Type: "Teller-1",
        The_Branch: "Prestea",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(P1Rd => {
        req.docP1Rd = P1Rd;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Voda Withdrawal Amount
const P1VdWm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: "Teller-1",
                    TheBranch: "Prestea",
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

        const P1VWm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1VW = P1VWm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Ecobank Withdrawal Amount
const P1EWm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-1",
                    TheBranch: "Prestea",
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

        const P1Em = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1E = P1Em;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MTN Withdrawal Amount
const P1MTNm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: "Teller-1",
                    TheBranch: "Prestea",
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

        const P1MTN = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1MTN = P1MTN;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the SUSU Withdrawal Amount
const P1susuM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
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

        const P1susu = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1susu = P1susu;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the G-Money Withdrawal Amount
const P1Gmm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "G-Money",
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
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

        const P1Gmm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1Gm = P1Gmm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the ATM Withdrawal Amount
const P1Atmm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "ATM",
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
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

        const P1Atm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1Atm = P1Atm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Ezwich Withdrawal Amount
const P1Ezm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Ezwich",
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
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

        const P1Ezmm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1Ezmm = P1Ezmm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Remmitance Withdrawal Amount
const P1Rem = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Remittances",
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
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

        const P1Remm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1Remm = P1Remm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Commission Amount
const P1Com = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const MoMoDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    Description: "Deposit",
                    TellerType: "Teller-1",
                    TheBranch: "Prestea",
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
                    TheBranch: "Prestea",
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

        const P1Comm = MoMoDocsAmount + BanksCollectionAmount;

        req.AmountP1Comm = P1Comm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Cash To Bank Amount
const P1ctb = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Cash To Bank",
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
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

        const P1Load = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.LoadingP1 = P1Load;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Expenses Amount
const P1Ex = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Expenses",
                    Teller_Type: "Teller-1",
                    The_Branch: "Prestea",
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

        const P1Exp = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountP1Exp = P1Exp;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Cash Remaining Amount
const P1CR = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const RemainPCashs = await TellerInput3.find({
            Teller_Type: "Teller-1",
            The_Branch: "Prestea",
            Type: "Physical Cash Remaining",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let P1cashR = '0';
        if (RemainPCashs.length > 0) {
            RemainPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            P1cashR = RemainPCashs[0].Amount;
        }

        req.P1cashRm = P1cashR;
        next();
    } catch (err) {
        console.error("Error fetching TM Remaining balance:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Withdrawal Costumers
const P1TCos = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.WMoMoP1Ct) || 0; 
        const TotalGmoney = parseFloat(req.docP1Gm) || 0; 
        const TotalATM = parseFloat(req.docAtmP1) || 0;
        const TotalEcobank = parseFloat(req.docP1E ) || 0;
        const TotalEzwich = parseFloat( req.docP1Ez) || 0;
        const TotalSusudocs= parseFloat(req.docP1Susud) || 0;
        const TotalVoda= parseFloat(req.docP1VdC) || 0;
        const TotalRemitt= parseFloat(req.docP1Rd) || 0;


        const P1TCost = TotalEcobank + TotalATM + TotalGmoney + TotalMoMo + TotalEzwich  + TotalSusudocs + 
        TotalVoda + TotalRemitt;

        req.TotalP1Cost = P1TCost;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Amount Withdrew 
const P1TAM = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AmountP1MTN) || 0; 
        const TotalATM = parseFloat(req.AmountP1Atm) || 0; 
        const TotalEcobank = parseFloat(req.AmountP1E) || 0;
        const TotalEzwich = parseFloat(req.AmountP1Ezmm) || 0;
        const TotalRemitt = parseFloat(req.AmountP1Remm) || 0;
        const TotalSusu = parseFloat(req.AmountP1susu) || 0;
        const TotalVoda = parseFloat(req.AmountP1VW) || 0;
        const TotalGMoney = parseFloat(req.AmountP1Gm) || 0;


        const P1TM  = TotalEzwich + TotalEcobank + TotalATM + TotalMoMo + TotalRemitt + 
        TotalSusu + TotalVoda + TotalGMoney;

        req.P1WAmount = P1TM  ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Actual Amount Withdrew After All Computation
const P1ActW= async (req, res, next) => {
    try {
        const P1TM = parseFloat(req.P1WAmount) || 0;
        const TotalExpenses = parseFloat(req.AmountP1Exp) || 0;
        const PCashRemain = parseFloat(req.P1cashRm) || 0;
        const TotalCashToBank = parseFloat(req.LoadingP1) || 0;
        const TCommission = parseFloat(req.AmountP1Comm) || 0;


        const P1AW  = P1TM + TotalExpenses + PCashRemain + TotalCashToBank -TCommission;

        req.P1AWAmount = P1AW ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {P1MoMoC,P1GmC,AtmP1,P1Voda,P1Ec,P1Ezc,P1susuC,P1RemC,P1VdWm,P1EWm,P1MTNm,P1susuM,P1Gmm,P1Atmm,P1Ezm,P1Rem,P1Com,
P1ctb,P1Ex,P1CR,P1TCos,P1TAM,P1ActW};



