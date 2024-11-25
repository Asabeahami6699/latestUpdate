const express = require('express');

const {SUserInput5Collection,SUserInput4Collection,SBTransaction} = require('../mongodb');

const app = express();

// Display the Ecobank(54) Cash out Total Amount
const E1out = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Medium: "ecobank 54",
                    The_Type: "Ecobank Cash out",
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

        const E1ot = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.E1ot = E1ot;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(20) Cash out Total Amount
const E2out = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Medium: "ecobank 20",
                    The_Type: "Ecobank Cash out",
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

        const E2ot = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.E2ot = E2ot;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(10) Cash out Total Amount
const E3out = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Medium: "ecobank 10",
                    The_Type: "Ecobank Cash out",
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

        const E3ot = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.E3ot = E3ot;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(80) Cash out Total Amount
const E4out = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Medium: "ecobank 80",
                    The_Type: "Ecobank Cash out",
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

        const E4ot = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.E4ot = E4ot;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Total Ecobank Cash out Total Amount
const ETout = async (req, res, next) => {
    try {
        
        const E1 = parseFloat(req.E1ot) || 0; 
        const E2 = parseFloat(req.E2ot) || 0; 
        const E3 = parseFloat(req.E3ot) || 0; 
        const E4 = parseFloat(req.E4ot) || 0;

        const ETot = E1 + E2 + E3 + E4;

        req.ETot = ETot;

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Other Ecobank Deposits Total Amount
const OtEco = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput5Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Other Ecobank Deposits",
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

        const OtEc = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.OtEc = OtEc;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Other MoMo Deposits Total Amount
const OtMTN = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput5Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Other MTN MoMo Deposits",
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

        const omtn = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.omtn = omtn;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Fidelity Withdrawal Total Amount
const FidWdl = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SUserInput5Collection.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    The_Type: "Fidelity Withdrawals",
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

        const FidWd = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.FidWd = FidWd;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Superuser Total MoMo Deposits Entries for Aiyinase Teller 1
const SA1M = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "mtn",
                    Teller_Type: "Teller-1",
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

        const sa1mo = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa1mo = sa1mo;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Superuser Total MoMo Deposits Entries for Aiyinase Teller 2
const SA2M = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "mtn",
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

        const sa2mo = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sa2mo = sa2mo;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Superuser Total MoMo Deposits Entries for Bogoso Teller 1
const SB1M = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "mtn",
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

        const sb1mo = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb1mo = sb1mo;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Superuser Total MoMo Deposits Entries for Bogoso Teller 2
const SB2M = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "mtn",
                    Teller_Type: "Teller-2",
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

        const sb2mo = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sb2mo = sb2mo;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Superuser Total MoMo Deposits Entries for Prestea Teller 1
const SP1M = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "mtn",
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

        const sp1mo = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp1mo = sp1mo;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display Superuser Total MoMo Deposits Entries for Prestea Teller 2
const SP2M = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SBTransaction.aggregate([
            {
                $match: {
                    Processor: "Superuser",
                    Transaction: "mtn",
                    Teller_Type: "Teller-2",
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

        const sp2mo = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.sp2mo = sp2mo;
        next();
    } catch (err) {
        console.error("Error fetching total Amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Total MoMo Entries from all the Tellers By the Superuser
const STTM = async (req, res, next) => {
    try {
        
        const A1 = parseFloat(req.sa1mo) || 0; 
        const A2 = parseFloat(req.sa2mo) || 0; 
        const B1 = parseFloat(req.sb1mo) || 0; 
        const B2 = parseFloat(req.sb2mo) || 0; 
        const P1 = parseFloat(req.sp1mo) || 0; 
        const P2 = parseFloat(req.sp2mo) || 0; 

        const sttmo = A1 + A2 + B1 + B2 + P1 + P2;

        req.sttmo = sttmo;

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};




module.exports = {E1out,E2out,E3out,E4out,ETout,OtEco,OtMTN,FidWdl,SA1M,SA2M,SB1M,SB2M,SP1M,SP2M,STTM};