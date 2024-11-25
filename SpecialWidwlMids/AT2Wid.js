const express = require('express');

const { Transaction,UserMoMoCollection,SusuDocs,OthersWithdrawalCollection,TellerInput3
 } = require('../mongodb');

const app = express();

// Display the number of MTN MoMo Withdrawal docs for Aiyinase Teller-2
const A2MoMoC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(A2Mc => {
        req.WMoMoA2Ct = A2Mc;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of G-Money Withdrawal docs for Aiyinase Teller-2
const A2GmC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "G-Money",
        Teller_Type: "Teller-2",
        The_Branch: "Aiyinase",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(A2Gm => {
        req.docA2Gm = A2Gm ;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of ATM docs
const AtmA2 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "ATM",
        Teller_Type: "Teller-2",
        The_Branch: "Aiyinase",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AtmA2 => {
        req.docAtmA2 = AtmA2;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Vodafone Cash Withdrawal docs
const A2Voda = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(A2VdC => {
        req.docA2VdC = A2VdC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal Ecobank docs
const A2Ec = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(A2E => {
        req.docA2E = A2E;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of E-Zwich Withdrawal docs
const A2Ezc = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Ezwich",
        Teller_Type: "Teller-2",
        The_Branch: "Aiyinase",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(A2Ez => {
        req.docA2Ez = A2Ez;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Withdrawal SuSu docs
const A2susuC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: "Teller-2" ,
        The_Branch: "Aiyinase" ,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(A2Susud => {
        req.docA2Susud = A2Susud;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Remittances Withdrawal docs
const A2RemC = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    OthersWithdrawalCollection.countDocuments({
        Type: "Remittances",
        Teller_Type: "Teller-2",
        The_Branch: "Aiyinase",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(A2Rd => {
        req.docA2Rd = A2Rd;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Voda Withdrawal Amount
const A2VdWm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const A2VWm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2VW = A2VWm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Ecobank Withdrawal Amount
const A2EWm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const A2Em = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2E = A2Em;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MTN Withdrawal Amount
const A2MTNm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const A2MTN = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2MTN = A2MTN;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the SUSU Withdrawal Amount
const A2susuM = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const A2susu = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2susu = A2susu;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the G-Money Withdrawal Amount
const A2Gmm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "G-Money",
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const A2Gmm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2Gm = A2Gmm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the ATM Withdrawal Amount
const A2Atmm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "ATM",
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const A2Atm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2Atm = A2Atm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Ezwich Withdrawal Amount
const A2Ezm = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Ezwich",
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const A2Ezmm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2Ezmm = A2Ezmm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Remmitance Withdrawal Amount
const A2Rem = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await OthersWithdrawalCollection.aggregate([
            {
                $match: {
                    Type: "Remittances",
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const A2Remm = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2Remm = A2Remm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Commission Amount
const A2Com = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const MoMoDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    Description: "Deposit",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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
                    TheBranch: "Aiyinase",
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

        const A2Comm = MoMoDocsAmount + BanksCollectionAmount;

        req.AmountA2Comm = A2Comm;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Cash To Bank Amount
const A2ctb = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Cash To Bank",
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const A2Load = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.LoadingA2 = A2Load;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Expenses Amount
const A2Ex = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await TellerInput3.aggregate([
            {
                $match: {
                    Type: "Expenses",
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const A2Exp = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AmountA2Exp = A2Exp;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Cash Remaining Amount
const A2CR = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const RemainPCashs = await TellerInput3.find({
            Teller_Type: "Teller-2",
            The_Branch: "Aiyinase",
            Type: "Physical Cash Remaining",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let A2cashR = '0';
        if (RemainPCashs.length > 0) {
            RemainPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            A2cashR = RemainPCashs[0].Amount;
        }

        req.A2cashRm = A2cashR;
        next();
    } catch (err) {
        console.error("Error fetching TM Remaining balance:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Total Withdrawal Costumers
const A2TCos = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.WMoMoA2Ct) || 0; 
        const TotalGmoney = parseFloat(req.docA2Gm) || 0; 
        const TotalATM = parseFloat(req.docAtmA2) || 0;
        const TotalEcobank = parseFloat(req.docA2E ) || 0;
        const TotalEzwich = parseFloat( req.docA2Ez) || 0;
        const TotalSusudocs= parseFloat(req.docA2Susud) || 0;
        const TotalVoda= parseFloat(req.docA2VdC) || 0;
        const TotalRemitt= parseFloat(req.docA2Rd) || 0;


        const A2TCost = TotalEcobank + TotalATM + TotalGmoney + TotalMoMo + TotalEzwich  + TotalSusudocs + 
        TotalVoda + TotalRemitt;

        req.TotalA2Cost = A2TCost;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Amount Withdrew 
const A2TAM = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AmountA2MTN) || 0; 
        const TotalATM = parseFloat(req.AmountA2Atm) || 0; 
        const TotalEcobank = parseFloat(req.AmountA2E) || 0;
        const TotalEzwich = parseFloat(req.AmountA2Ezmm) || 0;
        const TotalRemitt = parseFloat(req.AmountA2Remm) || 0;
        const TotalSusu = parseFloat(req.AmountA2susu) || 0;
        const TotalVoda = parseFloat(req.AmountA2VW) || 0;
        const TotalGMoney = parseFloat(req.AmountA2Gm) || 0;


        const A2TM  = TotalEzwich + TotalEcobank + TotalATM + TotalMoMo + TotalRemitt + 
        TotalSusu + TotalVoda + TotalGMoney;

        req.A2WAmount = A2TM  ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Actual Amount Withdrew After All Computation
const A2ActW= async (req, res, next) => {
    try {
        const A2TM = parseFloat(req.A2WAmount) || 0;
        const TotalExpenses = parseFloat(req.AmountA2Exp) || 0;
        const PCashRemain = parseFloat(req.A2cashRm) || 0;
        const TotalCashToBank = parseFloat(req.LoadingA2) || 0;
        const TCommission = parseFloat(req.AmountA2Comm) || 0;


        const A2AW  = A2TM + TotalExpenses + PCashRemain + TotalCashToBank -TCommission;

        req.A2AWAmount = A2AW ;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {A2MoMoC,A2GmC,AtmA2,A2Voda,A2Ec,A2Ezc,A2susuC,A2RemC,A2VdWm,A2EWm,A2MTNm,A2susuM,A2Gmm,A2Atmm,A2Ezm,A2Rem,A2Com,
A2ctb,A2Ex,A2CR,A2TCos,A2TAM,A2ActW};



