const express = require('express');

const { Transaction,UserMoMoCollection ,UserInputsCollection,UserDInputsCollection,SusuDocs
 } = require('../mongodb');

const app = express();

// Display the number of MoMo Deposit docs For Aiyinase TEller 1
const AT1MoMoDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: "Teller-1",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT1count => {
        req.AT1documentsCount = AT1count;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Voda Deposit docs For Aiyinase TEller 1
const AT1VodaDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: "Teller-1",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT1Vcount => {
        req.AT1documentsVCount = AT1Vcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Other Banks Transfered Amount For Aiyinase TEller 1
const AT1VodaTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "Voda",
                    TellerType: "Teller-1",
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

        const AT1VodatransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT1VodatransferredAmount = AT1VodatransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Other Banks Deposit docs For Aiyinase TEller 1
const AT1countOtherBDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Other Banks",
        TellerType: "Teller-1",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT1odcount => {
        req.AT1documentsodCount = AT1odcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Other Banks Transfered Amount For Aiyinase TEller 1
const AT1OtherBTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Other Banks",
                    TellerType: "Teller-1",
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

        const AT1ObtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT1ObtransferredAmount = AT1ObtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Iniitial Physical Cash For Aiyinase TEller 1
const AT1fetchInitialPCash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const InitialPCashs = await UserInputsCollection.find({
            Teller_Type: "Teller-1",
            The_Branch: "Aiyinase",
            TheType: "Initial Physical Cash",
            Timestamp: {
                $gte: currentDate, // Greater than or equal to the start of the day
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Less than the start of the next day
            }
        });

        let AT1InitialPCash = '0';
        if (InitialPCashs.length > 0) {
            InitialPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            AT1InitialPCash = InitialPCashs[0].InputAmount;
        }

        req.AT1InitialPCash = AT1InitialPCash;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Total Cash Collected For Aiyinase TEller 1
const AT1TotalCashColltd = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await UserDInputsCollection.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-1",
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

        const AT1totalColtdPcash = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.AT1totalColtdPcash = AT1totalColtdPcash;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Transfered Amount For Aiyinase Teller 1
const AT1MoMoTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await UserMoMoCollection.aggregate([
            {
                $match: {
                    MoMo: "mtn",
                    TellerType: "Teller-1",
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

        const AT1transferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT1transferredAmount = AT1transferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Fidelity docs For Aiyinase Teller 1
const AT1countFDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "fidelity",
        TellerType: "Teller-1",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT1countF => {
        req.AT1documentsCountF = AT1countF;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Fidelity Transfered Amount For Aiyinase Teller 1
const AT1FidelityTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "fidelity",
                    TellerType: "Teller-1",
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

        const AT1FtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT1FtransferredAmount = AT1FtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Ecobank docs For Aiyinase Teller 1
const AT1countEDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-1",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT1countE => {
        req.AT1documentsCountE = AT1countE;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Ecobank Transfered Amount For Aiyinase Teller 1
const AT1EcobankTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-1",
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

        const AT1EtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT1EtransferredAmount = AT1EtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs For Aiyinase Teller 1
const AT1countCDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Calbank",
        TellerType: "Teller-1",
        TheBranch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT1countC => {
        req.AT1documentsCountC = AT1countC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Calbank Transfered Amount For Aiyinase Teller 1
const AT1CalbankTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Calbank",
                    TellerType: "Teller-1",
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

        const AT1CtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT1CtransferredAmount = AT1CtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs For Aiyinase Teller 1
const AT1countSuSuDocuments = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: "Teller-1",
        The_Branch: "Aiyinase",
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(AT1countsusu => {
        req.AT1documentsCountsusu = AT1countsusu;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Susu Transfered Amount For Aiyinase Teller 1
const AT1SusuTransferredAmount = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SusuDocs.aggregate([
            {
                $match: {
                    Teller_Type: "Teller-1",
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

        const AT1SutransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.AT1SutransferredAmount = AT1SutransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Costumers For Aiyinase Teller 1
const AT1TotalCostumers = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AT1documentsCount) || 0; 
        const TotalFidelity = parseFloat(req.AT1documentsCountF) || 0; 
        const TotalEcobank = parseFloat(req.AT1documentsCountE) || 0;
        const TotalCalbank = parseFloat(req.AT1documentsCountC) || 0;
        const TotalOtherB = parseFloat( req.AT1documentsodCount) || 0;
        const TotalSusudocs= parseFloat(req.AT1documentsCountsusu) || 0;
        const TotalVoda= parseFloat(req.AT1documentsVCount) || 0;


        const AT1TotalCostumers = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherB + TotalSusudocs + TotalVoda;

        req.AT1TotalCostumers = AT1TotalCostumers;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Transfered Amount For Aiyinase Teller 1
const AT1TotalAmountTransf = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.AT1transferredAmount) || 0; 
        const TotalFidelity = parseFloat(req.AT1FtransferredAmount) || 0; 
        const TotalEcobank = parseFloat(req.AT1EtransferredAmount) || 0;
        const TotalCalbank = parseFloat(req.AT1CtransferredAmount) || 0;
        const TotalOtherbank = parseFloat(req.AT1ObtransferredAmount) || 0;
        const TotalVoda = parseFloat(req.AT1VodatransferredAmount) || 0;
        const TotalsusuD = parseFloat(req.AT1SutransferredAmount) || 0;


        const AT1TotalAmoutTrans = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherbank + 
        TotalVoda + TotalsusuD;

        req.AT1TotalAmoutTrans = AT1TotalAmoutTrans;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Deposit Physical Cash For Aiyinase Teller 1
const AT1TotalcPcash = async (req, res, next) => {
    try {
        
        const InitPcash = parseFloat(req.AT1InitialPCash) || 0; 
        const PcashColtd = parseFloat(req.AT1totalColtdPcash) || 0; 
        const TotalTAmt = parseFloat(req.AT1TotalAmoutTrans) || 0; 

        const AT1TTotalcPcash = InitPcash + PcashColtd + TotalTAmt ;

        req.AT1TTotalcPcash = AT1TTotalcPcash;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {AT1MoMoDocuments,AT1VodaDocuments,AT1VodaTransferredAmount,AT1countOtherBDocuments,AT1OtherBTransferredAmount,
AT1fetchInitialPCash,AT1TotalCashColltd,AT1MoMoTransferredAmount,AT1countFDocuments,AT1FidelityTransferredAmount,
AT1countEDocuments,AT1EcobankTransferredAmount,AT1countCDocuments,AT1CalbankTransferredAmount,AT1countSuSuDocuments,
AT1SusuTransferredAmount,AT1TotalCostumers,AT1TotalAmountTransf,AT1TotalcPcash};



