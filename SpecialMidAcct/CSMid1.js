const express = require('express');

const { CSEcobankWithdls,CSExpressAcctCreation,Transaction} = require('../mongodb');

const app = express();

// Display Number of Recorded Customers of Ecobank Withdrawals docs for Customer Service Personal
const csDocs1 = (req, res, next) => {
    const name = req.user.name;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    CSEcobankWithdls.countDocuments({
        CSName: name,
        CSBranch: branch,
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(csd1 => {
        req.csd1 = csd1;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display Number of Recorded Customers for Express Account Created docs for Customer Service Personal
const csDocs2 = (req, res, next) => {
    const name = req.user.name;
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    CSExpressAcctCreation.countDocuments({
        CSName: name,
        CSBranch: branch,
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(csd2 => {
        req.csd2 = csd2;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display the Ecobank Withdrawals Amount for Customer Service Personal
const csAmount1 = async (req, res, next) => {
    try {
        const name = req.user.name;
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await CSEcobankWithdls.aggregate([
            {
                $match: {
                    CSName: name,
                    CSBranch: branch,
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

        const csamt1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.csamt1 = csamt1;
        next();
    } catch (err) {
        console.error("Error calculating the amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the number of Withdrawal Ecobank docs T1
const csEcoWdlsDocs1 = (req, res, next) => {
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-1",
        TheBranch: branch,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(cstdoc1 => {
        req.cstdoc1 = cstdoc1;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display the number of Withdrawal Ecobank docs for T2
const csEcoWdlsDocs2 = (req, res, next) => {
    const branch = req.user.branch;
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    Transaction.countDocuments({
        Bank: "ecobank",
        TellerType: "Teller-2",
        TheBranch: branch,
        Description: "Withdrawal",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(cstdoc2 => {
        req.cstdoc2 = cstdoc2;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display Ecobank Withdrawal Amount for T1
const csTeller1 = async (req, res, next) => {
    try {
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-1",
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

        const csT1amt = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.csT1amt = csT1amt;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Ecobank Withdrawal Amount for T2
const csTeller2 = async (req, res, next) => {
    try {
        const branch = req.user.branch;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await Transaction.aggregate([
            {
                $match: {
                    Bank: "ecobank",
                    TellerType: "Teller-2",
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

        const csT2amt = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.csT2amt = csT2amt;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


const csTdocst = async (req, res, next) => {
    try {
        const A = parseFloat(req.cstdoc1) || 0; 
        const B = parseFloat(req.cstdoc2) || 0; 

        const cstdct = A + B ;

        req.cstdct = cstdct;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Ecob Widls docs", err);
        res.status(500).send('Internal Server Error');
    }
};

const csTamtt = async (req, res, next) => {
    try {
        const A = parseFloat(req.csT1amt) || 0; 
        const B = parseFloat(req.csT2amt) || 0; 

        const cstatt = A + B ;

        req.cstatt = cstatt;

        next();
    } catch (err) {
        console.error("Error calculating Total Teller Ecob Widls Amount", err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {csDocs1,csDocs2,csAmount1,csEcoWdlsDocs1,csEcoWdlsDocs2,csTeller1,csTeller2,csTdocst,csTamtt};