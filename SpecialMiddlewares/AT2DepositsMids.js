const express = require('express');

const { Transaction,UserMoMoCollection ,UserInputsCollection,UserDInputsCollection,SusuDocs
 } = require('../mongodb');

const app = express();

// Display the number of MoMo Deposit docs For Aiyinase Teller 2
const AT2MoMoDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT2count => {
        req.AT2documentsCount = AT2count;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Voda Deposit docs For Aiyinase Teller 2
const AT2VodaDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT2Vcount => {
        req.AT2documentsVCount = AT2Vcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Other Banks Transfered Amount For Aiyinase Teller 2
const AT2VodaTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const AT2VodatransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT2VodatransferredAmount = AT2VodatransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Other Banks Deposit docs For Aiyinase Teller 2
const AT2countOtherBDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Other Banks",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT2odcount => {
        req.AT2documentsodCount = AT2odcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Other Banks Transfered Amount For Aiyinase Teller 2
const AT2OtherBTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Other Banks",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const AT2ObtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT2ObtransferredAmount = AT2ObtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Iniitial Physical Cash For Aiyinase Teller 2
const AT2fetchInitialPCash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const InitialPCashs = await UserInputsCollection.find({
            Teller_Type: "Teller-2",
            The_Branch: "Aiyinase",
            TheType: "Initial Physical Cash",
            Timestamp: {
                $gte: currentDate, // Greater than or equal to the start of the day
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Less than the start of the next day
            }
        });

        let AT2InitialPCash = '0';
        if (InitialPCashs.length > 0) {
            InitialPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            AT2InitialPCash = InitialPCashs[0].InputAmount;
        }

        req.AT2InitialPCash = AT2InitialPCash;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Total Cash Collected For Aiyinase Teller 2
const AT2TotalCashColltd = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await UserDInputsCollection.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const AT2totalColtdPcash = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.AT2totalColtdPcash = AT2totalColtdPcash;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Transfered Amount For Aiyinase Teller 2
const AT2MoMoTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const AT2transferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT2transferredAmount = AT2transferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Fidelity docs For Aiyinase Teller 2
const AT2countFDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "fidelity",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT2countF => {
        req.AT2documentsCountF = AT2countF;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Fidelity Transfered Amount For Aiyinase Teller 2
const AT2FidelityTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "fidelity",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const AT2FtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT2FtransferredAmount = AT2FtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Ecobank docs For Aiyinase Teller 2
const AT2countEDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT2countE => {
        req.AT2documentsCountE = AT2countE;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Ecobank Transfered Amount For Aiyinase Teller 2
const AT2EcobankTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const AT2EtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT2EtransferredAmount = AT2EtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs For Aiyinase Teller 2
const AT2countCDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Calbank",
        TellerType: "Teller-2",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT2countC => {
        req.AT2documentsCountC = AT2countC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Calbank Transfered Amount For Aiyinase Teller 2
const AT2CalbankTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Calbank",
                    TellerType: "Teller-2",
                    TheBranch: "Aiyinase",
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

        const AT2CtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT2CtransferredAmount = AT2CtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs For Aiyinase Teller 2
const AT2countSuSuDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: "Teller-2",
        The_Branch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT2countsusu => {
        req.AT2documentsCountsusu = AT2countsusu;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Susu Transfered Amount For Aiyinase Teller 2
const AT2SusuTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-2",
                    The_Branch: "Aiyinase",
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

        const AT2SutransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT2SutransferredAmount = AT2SutransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Costumers For Aiyinase Teller 2
const AT2TotalCostumers = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AT2documentsCount) || 0; 
        const TotalFidelity = parseFloat(req.AT2documentsCountF) || 0; 
        const TotalEcobank = parseFloat(req.AT2documentsCountE) || 0;
        const TotalCalbank = parseFloat(req.AT2documentsCountC) || 0;
        const TotalOtherB = parseFloat( req.AT2documentsodCount) || 0;
        const TotalSusudocs= parseFloat(req.AT2documentsCountsusu) || 0;
        const TotalVoda= parseFloat(req.AT2documentsVCount) || 0;


        const AT2TotalCostumers = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherB + TotalSusudocs + TotalVoda;

        req.AT2TotalCostumers = AT2TotalCostumers;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Transfered Amount For Aiyinase Teller 2
const AT2TotalAmountTransf = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AT2transferredAmount) || 0; 
        const TotalFidelity = parseFloat(req.AT2FtransferredAmount) || 0; 
        const TotalEcobank = parseFloat(req.AT2EtransferredAmount) || 0;
        const TotalCalbank = parseFloat(req.AT2CtransferredAmount) || 0;
        const TotalOtherbank = parseFloat(req.AT2ObtransferredAmount) || 0;
        const TotalVoda = parseFloat(req.AT2VodatransferredAmount) || 0;
        const TotalsusuD = parseFloat(req.AT2SutransferredAmount) || 0;


        const AT2TotalAmoutTrans = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherbank + 
        TotalVoda + TotalsusuD;

        req.AT2TotalAmoutTrans = AT2TotalAmoutTrans;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Deposit Physical Cash For Aiyinase Teller 2
const AT2TotalcPcash = async (req, res, next) => {
    try {
        
        const InitPcash = parseFloat(req.AT2InitialPCash) || 0; 
        const PcashColtd = parseFloat(req.AT2totalColtdPcash) || 0; 
        const TotalTAmt = parseFloat(req.AT2TotalAmoutTrans) || 0; 

        const AT2TTotalcPcash = InitPcash + PcashColtd + TotalTAmt ;

        req.AT2TTotalcPcash = AT2TTotalcPcash;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {AT2MoMoDocuments,AT2VodaDocuments,AT2VodaTransferredAmount,AT2countOtherBDocuments,AT2OtherBTransferredAmount,
AT2fetchInitialPCash,AT2TotalCashColltd,AT2MoMoTransferredAmount,AT2countFDocuments,AT2FidelityTransferredAmount,
AT2countEDocuments,AT2EcobankTransferredAmount,AT2countCDocuments,AT2CalbankTransferredAmount,AT2countSuSuDocuments,
AT2SusuTransferredAmount,AT2TotalCostumers,AT2TotalAmountTransf,AT2TotalcPcash};



