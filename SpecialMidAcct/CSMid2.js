const express = require('express');

const { CSEcobankWithdls,CSExpressAcctCreation,Transaction} = require('../mongodb');

const app = express();

// Display Number of Recorded Customers of Ecobank Withdrawals docs for Customer Service Personal at Aiyinase
const AcsDocs1 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    CSEcobankWithdls.countDocuments({
        CSBranch: "Aiyinase",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(acsd1 => {
        req.acsd1 = acsd1;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display Number of Recorded Customers for Express Account Created docs for Customer Service Personal at Aiyinase
const AcsDocs2 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    CSExpressAcctCreation.countDocuments({
        CSBranch: "Aiyinase",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(acsd2 => {
        req.acsd2 = acsd2;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display the Ecobank Withdrawals Amount for Customer Service Personal at Aiyinase
const AcsAmount1 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await CSEcobankWithdls.aggregate([
            {
                $match: {
                    CSBranch: "Aiyinase",
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

        const acsamt1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.acsamt1 = acsamt1;
        next();
    } catch (err) {
        console.error("Error calculating the amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Number of Recorded Customers of Ecobank Withdrawals docs for Customer Service Personal at Bogoso
const BcsDocs1 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    CSEcobankWithdls.countDocuments({
        CSBranch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(bcsd1 => {
        req.bcsd1 = bcsd1;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display Number of Recorded Customers for Express Account Created docs for Customer Service Personal at Bogoso
const BcsDocs2 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    CSExpressAcctCreation.countDocuments({
        CSBranch: "Bogoso",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(bcsd2 => {
        req.bcsd2 = bcsd2;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display the Ecobank Withdrawals Amount for Customer Service Personal at Bogoso
const BcsAmount1 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await CSEcobankWithdls.aggregate([
            {
                $match: {
                    CSBranch: "Bogoso",
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

        const bcsamt1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.bcsamt1 = bcsamt1;
        next();
    } catch (err) {
        console.error("Error calculating the amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Number of Recorded Customers of Ecobank Withdrawals docs for Customer Service Personal at Prestea
const PcsDocs1 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    CSEcobankWithdls.countDocuments({
        CSBranch: "Prestea",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(pcsd1 => {
        req.pcsd1 = pcsd1;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display Number of Recorded Customers for Express Account Created docs for Customer Service Personal at Prestea
const PcsDocs2 = (req, res, next) => {
    const currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    CSExpressAcctCreation.countDocuments({
        CSBranch: "Prestea",
        Timestamp: {
            $gte: currentdate, 
            $lt: new Date(currentdate.getTime() + 24 * 60 * 60 * 1000) 
        }
    })
    .then(pcsd2 => {
        req.pcsd2 = pcsd2;
        next(); 
    })
    .catch(err => {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents");
    });
};

// Display the Ecobank Withdrawals Amount for Customer Service Personal at Prestea
const PcsAmount1 = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await CSEcobankWithdls.aggregate([
            {
                $match: {
                    CSBranch: "Prestea",
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

        const pcsamt1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.pcsamt1 = pcsamt1;
        next();
    } catch (err) {
        console.error("Error calculating the amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {AcsDocs1,AcsDocs2,AcsAmount1,BcsDocs1,BcsDocs2,BcsAmount1,PcsDocs1,PcsDocs2,PcsAmount1};