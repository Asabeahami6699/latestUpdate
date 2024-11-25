const express = require('express');

const { Transaction,UserMoMoCollection ,UserInputsCollection,UserDInputsCollection,SusuDocs
 } = require('../mongodb');

const app = express();

// Display the number of MoMo Deposit docs For Bogoso "Teller-2"
const BT2MoMoDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT2count => {
        req.BT2documentsCount = BT2count;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Voda Deposit docs For Bogoso "Teller-2"
const BT2VodaDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT2Vcount => {
        req.BT2documentsVCount = BT2Vcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Voda Transfered Amount For Bogoso "Teller-2"
const BT2VodaTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: "Teller-2",
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

        const BT2VodatransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT2VodatransferredAmount = BT2VodatransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Other Banks Deposit docs For Bogoso "Teller-2"
const BT2countOtherBDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Other Banks",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT2odcount => {
        req.BT2documentsodCount = BT2odcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Other Banks Transfered Amount For Bogoso "Teller-2"
const BT2OtherBTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Other Banks",
                    TellerType: "Teller-2",
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

        const BT2ObtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT2ObtransferredAmount = BT2ObtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Iniitial Physical Cash For Bogoso "Teller-2"
const BT2fetchInitialPCash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const InitialPCashs = await UserInputsCollection.find({
            Teller_Type: "Teller-2",
            The_Branch: "Bogoso",
            TheType: "Initial Physical Cash",
            Timestamp: {
                $gte: currentDate, // Greater than or equal to the start of the day
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Less than the start of the next day
            }
        });

        let BT2InitialPCash = '0';
        if (InitialPCashs.length > 0) {
            InitialPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            BT2InitialPCash = InitialPCashs[0].InputAmount;
        }

        req.BT2InitialPCash = BT2InitialPCash;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Total Cash Collected For Bogoso "Teller-2"
const BT2TotalCashColltd = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await UserDInputsCollection.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-2",
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

        const BT2totalColtdPcash = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.BT2totalColtdPcash = BT2totalColtdPcash;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Transfered Amount For Bogoso "Teller-2"
const BT2MoMoTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: "Teller-2",
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

        const BT2transferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT2transferredAmount = BT2transferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Fidelity docs For Bogoso "Teller-2"
const BT2countFDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "fidelity",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT2countF => {
        req.BT2documentsCountF = BT2countF;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Fidelity Transfered Amount For Bogoso "Teller-2"
const BT2FidelityTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "fidelity",
                    TellerType: "Teller-2",
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

        const BT2FtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT2FtransferredAmount = BT2FtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Ecobank docs For Bogoso "Teller-2"
const BT2countEDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT2countE => {
        req.BT2documentsCountE = BT2countE;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Ecobank Transfered Amount For "Bogoso" "Teller-2"
const BT2EcobankTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-2",
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

        const BT2EtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT2EtransferredAmount = BT2EtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs For "Bogoso" "Teller-2"
const BT2countCDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Calbank",
        TellerType: "Teller-2",
        TheBranch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT2countC => {
        req.BT2documentsCountC = BT2countC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Calbank Transfered Amount For "Bogoso" "Teller-2"
const BT2CalbankTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Calbank",
                    TellerType: "Teller-2",
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

        const BT2CtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT2CtransferredAmount = BT2CtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs For "Bogoso" "Teller-2"
const BT2countSuSuDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: "Teller-2",
        The_Branch: "Bogoso",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(BT2countsusu => {
        req.BT2documentsCountsusu = BT2countsusu;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Susu Transfered Amount For "Bogoso" "Teller-2"
const BT2SusuTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-2",
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

        const BT2SutransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.BT2SutransferredAmount = BT2SutransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Costumers For "Bogoso" "Teller-2"
const BT2TotalCostumers = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.BT2documentsCount) || 0; 
        const TotalFidelity = parseFloat(req.BT2documentsCountF) || 0; 
        const TotalEcobank = parseFloat(req.BT2documentsCountE) || 0;
        const TotalCalbank = parseFloat(req.BT2documentsCountC) || 0;
        const TotalOtherB = parseFloat( req.BT2documentsodCount) || 0;
        const TotalSusudocs= parseFloat(req.BT2documentsCountsusu) || 0;
        const TotalVoda= parseFloat(req.BT2documentsVCount) || 0;


        const BT2TotalCostumers = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherB + TotalSusudocs + TotalVoda;

        req.BT2TotalCostumers = BT2TotalCostumers;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Transfered Amount For "Bogoso"  "Teller-2"
const BT2TotalAmountTransf = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.BT2transferredAmount) || 0; 
        const TotalFidelity = parseFloat(req.BT2FtransferredAmount) || 0; 
        const TotalEcobank = parseFloat(req.BT2EtransferredAmount) || 0;
        const TotalCalbank = parseFloat(req.BT2CtransferredAmount) || 0;
        const TotalOtherbank = parseFloat(req.BT2ObtransferredAmount) || 0;
        const TotalVoda = parseFloat(req.BT2VodatransferredAmount) || 0;
        const TotalsusuD = parseFloat(req.BT2SutransferredAmount) || 0;


        const BT2TotalAmoutTrans = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherbank + 
        TotalVoda + TotalsusuD;

        req.BT2TotalAmoutTrans = BT2TotalAmoutTrans;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Deposit Physical Cash For "Bogoso" "Teller-2"
const BT2TotalcPcash = async (req, res, next) => {
    try {
        
        const InitPcash = parseFloat(req.BT2InitialPCash) || 0; 
        const PcashColtd = parseFloat(req.BT2totalColtdPcash) || 0; 
        const TotalTAmt = parseFloat(req.BT2TotalAmoutTrans) || 0; 

        const BT2TTotalcPcash = InitPcash + PcashColtd + TotalTAmt ;

        req.BT2TTotalcPcash = BT2TTotalcPcash;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {BT2MoMoDocuments,BT2VodaDocuments,BT2VodaTransferredAmount,BT2countOtherBDocuments,BT2OtherBTransferredAmount,
BT2fetchInitialPCash,BT2TotalCashColltd,BT2MoMoTransferredAmount,BT2countFDocuments,BT2FidelityTransferredAmount,
BT2countEDocuments,BT2EcobankTransferredAmount,BT2countCDocuments,BT2CalbankTransferredAmount,BT2countSuSuDocuments,
BT2SusuTransferredAmount,BT2TotalCostumers,BT2TotalAmountTransf,BT2TotalcPcash};

