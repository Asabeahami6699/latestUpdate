const express = require('express');

const { Transaction,UserMoMoCollection ,UserInputsCollection,UserDInputsCollection,SusuDocs
 } = require('../mongodb');

const app = express();

// Display the number of MoMo Deposit docs For Bogoso TEller 1
const BT1MoMoDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT1count => {
        req.BT1documentsCount = BT1count;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Voda Deposit docs For Bogoso TEller 1
const BT1VodaDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT1Vcount => {
        req.BT1documentsVCount = BT1Vcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Voda Transfered Amount For Bogoso TEller 1
const BT1VodaTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: "Teller-1",
                    TheBranch: "Bogoso",
                    Description: "Deposit",
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

        const BT1VodatransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT1VodatransferredAmount = BT1VodatransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Other Banks Deposit docs For Bogoso TEller 1
const BT1countOtherBDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Other Banks",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT1odcount => {
        req.BT1documentsodCount = BT1odcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Other Banks Transfered Amount For Bogoso TEller 1
const BT1OtherBTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Other Banks",
                    TellerType: "Teller-1",
                    TheBranch: "Bogoso",
                    Description: "Deposit",
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

        const BT1ObtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT1ObtransferredAmount = BT1ObtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Iniitial Physical Cash For Bogoso TEller 1
const BT1fetchInitialPCash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const InitialPCashs = await UserInputsCollection.find({
            Teller_Type: "Teller-1",
            The_Branch: "Bogoso",
            TheType: "Initial Physical Cash",
            Timestamp: {
                $gte: currentDate, // Greater than or equal to the start of the day
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Less than the start of the next day
            }
        });

        let BT1InitialPCash = '0';
        if (InitialPCashs.length > 0) {
            InitialPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            BT1InitialPCash = InitialPCashs[0].InputAmount;
        }

        req.BT1InitialPCash = BT1InitialPCash;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Total Cash Collected For Bogoso TEller 1
const BT1TotalCashColltd = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await UserDInputsCollection.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-1",
                    The_Branch: "Bogoso",
                    TheType: "Physical Cash Collected",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$InputAmount" }
                }
            }
        ]);

        const BT1totalColtdPcash = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.BT1totalColtdPcash = BT1totalColtdPcash;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Transfered Amount For Bogoso Teller 1
const BT1MoMoTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: "Teller-1",
                    TheBranch: "Bogoso",
                    Description: "Deposit",
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

        const BT1transferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT1transferredAmount = BT1transferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Fidelity docs For Bogoso Teller 1
const BT1countFDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "fidelity",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT1countF => {
        req.BT1documentsCountF = BT1countF;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Fidelity Transfered Amount For Bogoso Teller 1
const BT1FidelityTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "fidelity",
                    TellerType: "Teller-1",
                    TheBranch: "Bogoso",
                    Description: "Deposit",
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

        const BT1FtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT1FtransferredAmount = BT1FtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Ecobank docs For Bogoso Teller 1
const BT1countEDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT1countE => {
        req.BT1documentsCountE = BT1countE;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Ecobank Transfered Amount For "Bogoso" Teller 1
const BT1EcobankTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-1",
                    TheBranch: "Bogoso",
                    Description: "Deposit",
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

        const BT1EtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT1EtransferredAmount = BT1EtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs For "Bogoso" Teller 1
const BT1countCDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Calbank",
        TellerType: "Teller-1",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT1countC => {
        req.BT1documentsCountC = BT1countC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Calbank Transfered Amount For "Bogoso" Teller 1
const BT1CalbankTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Calbank",
                    TellerType: "Teller-1",
                    TheBranch: "Bogoso",
                    Description: "Deposit",
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

        const BT1CtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT1CtransferredAmount = BT1CtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs For "Bogoso" Teller 1
const BT1countSuSuDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: "Teller-1",
        The_Branch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT1countsusu => {
        req.BT1documentsCountsusu = BT1countsusu;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Susu Transfered Amount For "Bogoso" Teller 1
const BT1SusuTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-1",
                    The_Branch: "Bogoso",
                    Description: "Deposit",
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

        const BT1SutransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT1SutransferredAmount = BT1SutransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Costumers For "Bogoso" Teller 1
const BT1TotalCostumers = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.BT1documentsCount) || 0; 
        const TotalFidelity = parseFloat(req.BT1documentsCountF) || 0; 
        const TotalEcobank = parseFloat(req.BT1documentsCountE) || 0;
        const TotalCalbank = parseFloat(req.BT1documentsCountC) || 0;
        const TotalOtherB = parseFloat( req.BT1documentsodCount) || 0;
        const TotalSusudocs= parseFloat(req.BT1documentsCountsusu) || 0;
        const TotalVoda= parseFloat(req.BT1documentsVCount) || 0;


        const BT1TotalCostumers = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherB + TotalSusudocs + TotalVoda;

        req.BT1TotalCostumers = BT1TotalCostumers;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Transfered Amount For "Bogoso" Teller 1
const BT1TotalAmountTransf = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.BT1transferredAmount) || 0; 
        const TotalFidelity = parseFloat(req.BT1FtransferredAmount) || 0; 
        const TotalEcobank = parseFloat(req.BT1EtransferredAmount) || 0;
        const TotalCalbank = parseFloat(req.BT1CtransferredAmount) || 0;
        const TotalOtherbank = parseFloat(req.BT1ObtransferredAmount) || 0;
        const TotalVoda = parseFloat(req.BT1VodatransferredAmount) || 0;
        const TotalsusuD = parseFloat(req.BT1SutransferredAmount) || 0;


        const BT1TotalAmoutTrans = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherbank + 
        TotalVoda + TotalsusuD;

        req.BT1TotalAmoutTrans = BT1TotalAmoutTrans;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Deposit Physical Cash For "Bogoso" Teller 1
const BT1TotalcPcash = async (req, res, next) => {
    try {
        
        const InitPcash = parseFloat(req.BT1InitialPCash) || 0; 
        const PcashColtd = parseFloat(req.BT1totalColtdPcash) || 0; 
        const TotalTAmt = parseFloat(req.BT1TotalAmoutTrans) || 0; 

        const BT1TTotalcPcash = InitPcash + PcashColtd + TotalTAmt ;

        req.BT1TTotalcPcash = BT1TTotalcPcash;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {BT1MoMoDocuments,BT1VodaDocuments,BT1VodaTransferredAmount,BT1countOtherBDocuments,BT1OtherBTransferredAmount,
BT1fetchInitialPCash,BT1TotalCashColltd,BT1MoMoTransferredAmount,BT1countFDocuments,BT1FidelityTransferredAmount,
BT1countEDocuments,BT1EcobankTransferredAmount,BT1countCDocuments,BT1CalbankTransferredAmount,BT1countSuSuDocuments,
BT1SusuTransferredAmount,BT1TotalCostumers,BT1TotalAmountTransf,BT1TotalcPcash};

