const express = require('express');

const { Transaction,UserMoMoCollection ,UserInputsCollection,UserDInputsCollection,SusuDocs
 } = require('../mongodb');

const app = express();

// Display the number of MoMo Deposit docs
const countMoMoDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "mtn",
        TellerType: type,
        TheBranch: branch,
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(count => {
        req.documentsCount = count;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the number of Voda Deposit docs
const countVodaDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    UserMoMoCollection.countDocuments({
        MoMo: "Voda",
        TellerType: type,
        TheBranch: branch,
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(Vcount => {
        req.documentsVCount = Vcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Other Banks Transfered Amount
const VodaTransferredAmount = async (req, res, next) => {
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

        const VodatransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.VodatransferredAmount = VodatransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Other Banks Deposit docs
const countOtherBDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Other Banks",
        TellerType: type,
        TheBranch: branch,
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(odcount => {
        req.documentsodCount = odcount;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display Other Banks Transfered Amount
const OtherBTransferredAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Other Banks",
                    TellerType: type,
                    TheBranch: branch,
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

        const ObtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.ObtransferredAmount = ObtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Iniitial Physical Cash
const fetchInitialPCash = async (req, res, next) => {
    try {
        const username = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const InitialPCashs = await UserInputsCollection.find({
            Teller_Type: username,
            The_Branch: branch,
            TheType: "Initial Physical Cash",
            Timestamp: {
                $gte: currentDate, // Greater than or equal to the start of the day
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Less than the start of the next day
            }
        });

        let InitialPCash = '0';
        if (InitialPCashs.length > 0) {
            InitialPCashs.sort((a, b) => b.Timestamp - a.Timestamp);
            InitialPCash = InitialPCashs[0].InputAmount;
        }

        req.InitialPCash = InitialPCash;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display Total Cash Collected
const TotalCashColltd = async (req, res, next) => {
    try {
        const username = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await UserDInputsCollection.aggregate([
            {
                $match: {
                    Teller_Type: username,
                    The_Branch: branch,
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

        const totalColtdPcash = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.totalColtdPcash = totalColtdPcash;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Transfered Amount
const MoMoTransferredAmount = async (req, res, next) => {
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

        const transferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.transferredAmount = transferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Fidelity docs
const countFDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "fidelity",
        TellerType: type,
        TheBranch: branch,
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countF => {
        req.documentsCountF = countF;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Fidelity Transfered Amount
const FidelityTransferredAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "fidelity",
                    TellerType: type,
                    TheBranch: branch,
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

        const FtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.FtransferredAmount = FtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Ecobank docs
const countEDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: type,
        TheBranch: branch,
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countE => {
        req.documentsCountE = countE;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Ecobank Transfered Amount
const EcobankTransferredAmount = async (req, res, next) => {
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

        const EtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.EtransferredAmount = EtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs
const countCDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "Calbank",
        TellerType: type,
        TheBranch: branch,
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countC => {
        req.documentsCountC = countC;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Calbank Transfered Amount
const CalbankTransferredAmount = async (req, res, next) => {
    try {
        const type = req.user.tellertype;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "Calbank",
                    TellerType: type,
                    TheBranch: branch,
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

        const CtransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.CtransferredAmount = CtransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the number of Deposit Calbank docs
const countSuSuDocuments = (req, res, next) => {
    const type = req.user.tellertype;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    SusuDocs.countDocuments({
        Teller_Type: type,
        The_Branch: branch,
        Description: "Deposit",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(countsusu => {
        req.documentsCountsusu = countsusu;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};


// Display the Susu Transfered Amount
const SusuTransferredAmount = async (req, res, next) => {
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

        const SutransferredAmount = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.SutransferredAmount = SutransferredAmount;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Costumers
const TotalCostumers = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.documentsCount) || 0; 
        const TotalFidelity = parseFloat(req.documentsCountF) || 0; 
        const TotalEcobank = parseFloat(req.documentsCountE) || 0;
        const TotalCalbank = parseFloat(req.documentsCountC) || 0;
        const TotalOtherB = parseFloat( req.documentsodCount) || 0;
        const TotalSusudocs= parseFloat(req.documentsCountsusu) || 0;
        const TotalVoda= parseFloat(req.documentsVCount) || 0;


        const TotalCostumers = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherB + TotalSusudocs + TotalVoda;

        req.TotalCostumers = TotalCostumers;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Transfered Amount
const TotalAmoutTrans = async (req, res, next) => {
    try {
        
        const TotalMoMo = parseFloat(req.transferredAmount) || 0; 
        const TotalFidelity = parseFloat(req.FtransferredAmount) || 0; 
        const TotalEcobank = parseFloat(req.EtransferredAmount) || 0;
        const TotalCalbank = parseFloat(req.CtransferredAmount) || 0;
        const TotalOtherbank = parseFloat(req.ObtransferredAmount) || 0;
        const TotalVoda = parseFloat(req.VodatransferredAmount) || 0;
        const TotalsusuD = parseFloat(req.SutransferredAmount ) || 0;


        const TotalAmoutTrans = TotalCalbank + TotalEcobank + TotalFidelity + TotalMoMo + TotalOtherbank + 
         TotalVoda + TotalsusuD;

        req.TotalAmoutTrans = TotalAmoutTrans;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Total Deposit Physical Cash
const TotalcPcash = async (req, res, next) => {
    try {
        
        const InitPcash = parseFloat(req.InitialPCash) || 0; 
        const PcashColtd = parseFloat(req.totalColtdPcash) || 0; 
        const TotalTAmt = parseFloat(req.TotalAmoutTrans) || 0; 

        const TTotalcPcash = InitPcash + PcashColtd + TotalTAmt ;

        req.TTotalcPcash = TTotalcPcash;

        next();
    } catch (err) {
        console.error("Error calculating Total Costumers:", err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {countMoMoDocuments,MoMoTransferredAmount,countFDocuments,FidelityTransferredAmount,countEDocuments,
EcobankTransferredAmount,countCDocuments,CalbankTransferredAmount,countOtherBDocuments,TotalCostumers,OtherBTransferredAmount,
TotalAmoutTrans,fetchInitialPCash,TotalCashColltd,TotalcPcash,SusuTransferredAmount,countSuSuDocuments,countVodaDocuments,
VodaTransferredAmount};



