const express = require('express');

const { SUserInput5Collection,SUserInput4Collection,SuperuserInputsCollection } = require('../mongodb');

const app = express();


// Display the MoMo opening Balance
const Mobc = async (req, res, next) => {
    try {
        const username = req.user.name;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const SMopeningBalances = await SuperuserInputsCollection.find({
            Medium: "MobileMoney",
            Name: "Superuser",
            The_Type : "Opening Balance" ,
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let Mobcl = '0';
        if (SMopeningBalances.length > 0) {
            SMopeningBalances.sort((a, b) => b.Timestamp - a.Timestamp);
            Mobcl = SMopeningBalances[0].Input_Amount;
        }

        req.Mobcl = Mobcl;
        next();
    } catch (err) {
        console.error("Error fetching opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo E-cash Collected Balance
const MechC = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SuperuserInputsCollection.aggregate([
            {
                $match: {
                    Medium: "MobileMoney",
                    Name: "Superuser",
                    The_Type : "E-Cash",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Input_Amount" }
                }
            }
        ]);

        const Ecash = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.Ecash = Ecash;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Transfered Amount
const Mtfat = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Medium: "Mobile Money(MTN)",
                    Processor:"Superuser",
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
        const Mtfa1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        const transferredDocs2 = await SUserInput5Collection.aggregate([
            {
                $match: {
                    Account: "The MoMo Account",
                    Processor: "Superuser",
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
        const Mtfa2 = transferredDocs2.length > 0 ? transferredDocs2[0].totalAmount : 0;
        const Mtfa = Mtfa1 + Mtfa2 ;
        req.Mtfa  = Mtfa ;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the MoMo Current Balance
const Mcblc = async (req, res, next) => {
    try {
        
        const openingBalance = parseFloat(req.Mobcl) || 0; 
        const totalEcash = parseFloat(req.Ecash) || 0; 
        const transferredAmount = parseFloat(req.Mtfa) || 0; 
        const momoCharges = parseFloat(req.mct) || 0;

        const Mcbl = openingBalance + totalEcash - transferredAmount - momoCharges;

        req.Mcbl = parseFloat( Mcbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Fidelity opening Balance
const Foblc = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const SFopeningBalances = await SuperuserInputsCollection.find({
            Medium: "fidelity",
            Name: "Superuser",
            The_Type: "Opening Balance",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let Fobl = '0';
        if (SFopeningBalances.length > 0) {
            SFopeningBalances.sort((a, b) => b.Timestamp - a.Timestamp);
            Fobl = SFopeningBalances[0].Input_Amount;
        }

        req.Fobl = Fobl;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Fidelity E-Cash Collected Balance
const Fecash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SuperuserInputsCollection.aggregate([
            {
                $match: {
                    Name: "Superuser",
                    Medium: "fidelity",
                    The_Type: "E-Cash",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Input_Amount" }
                }
            }
        ]);

        const Fecas = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.Fecas = Fecas;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Fidelity Transfered Amount
const Fftat = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Medium: "fidelity",
                    Processor: "Superuser",
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

        const Ftfa = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.Ftfa = Ftfa;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Fidelity Current Balance
const Fcblc = async (req, res, next) => {
    try {
        
        const openingBalance = parseFloat(req.Fobl ) || 0; 
        const totalDeposits = parseFloat(req.Fecas) || 0; 
        const transferredAmount = parseFloat(req.Ftfa) || 0; 

        const Fcbl = openingBalance + totalDeposits - transferredAmount;

         req.Fcbl = parseFloat( Fcbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Ecobank(54) opening Balance
const E1oblc = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const SEopeningBalances = await SuperuserInputsCollection.find({
            Medium: "ecobank 54",
            Name: "Superuser",
            The_Type: "Opening Balance",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let E1obl = '0';
        if (SEopeningBalances.length > 0) {
            SEopeningBalances.sort((a, b) => b.Timestamp - a.Timestamp);
            E1obl = SEopeningBalances[0].Input_Amount;
        }

        req.E1obl= E1obl;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(20) opening Balance
const E2oblc = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const SEopeningBalances = await SuperuserInputsCollection.find({
            Medium: "ecobank 20",
            Name: "Superuser",
            The_Type: "Opening Balance",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let E2obl = '0';
        if (SEopeningBalances.length > 0) {
            SEopeningBalances.sort((a, b) => b.Timestamp - a.Timestamp);
            E2obl = SEopeningBalances[0].Input_Amount;
        }

        req.E2obl= E2obl;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(10) opening Balance
const E3oblc = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const SEopeningBalances = await SuperuserInputsCollection.find({
            Medium: "ecobank 10",
            Name: "Superuser",
            The_Type: "Opening Balance",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let E3obl = '0';
        if (SEopeningBalances.length > 0) {
            SEopeningBalances.sort((a, b) => b.Timestamp - a.Timestamp);
            E3obl = SEopeningBalances[0].Input_Amount;
        }

        req.E3obl= E3obl;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(80) opening Balance
const E4oblc = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const SEopeningBalances = await SuperuserInputsCollection.find({
            Medium: "ecobank 80",
            Name: "Superuser",
            The_Type: "Opening Balance",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let E4obl = '0';
        if (SEopeningBalances.length > 0) {
            SEopeningBalances.sort((a, b) => b.Timestamp - a.Timestamp);
            E4obl = SEopeningBalances[0].Input_Amount;
        }

        req.E4obl= E4obl;
        next();
    } catch (err) {
        console.error("Error fetching TM opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(54) E-cash Collected Balance
const E1cash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SuperuserInputsCollection.aggregate([
            {
                $match: {
                    Name: "Superuser",
                    Medium: "ecobank 54",
                    The_Type: "E-Cash",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Input_Amount" }
                }
            }
        ]);

        const E1cas = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.E1cas = E1cas;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(20) E-cash Collected Balance
const E2cash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SuperuserInputsCollection.aggregate([
            {
                $match: {
                    Name: "Superuser",
                    Medium: "ecobank 20",
                    The_Type: "E-Cash",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Input_Amount" }
                }
            }
        ]);

        const E2cas = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.E2cas = E2cas;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(10) E-cash Collected Balance
const E3cash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SuperuserInputsCollection.aggregate([
            {
                $match: {
                    Name: "Superuser",
                    Medium: "ecobank 10",
                    The_Type: "E-Cash",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Input_Amount" }
                }
            }
        ]);

        const E3cas = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.E3cas = E3cas;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(80) E-cash Collected Balance
const E4cash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SuperuserInputsCollection.aggregate([
            {
                $match: {
                    Name: "Superuser",
                    Medium: "ecobank 80",
                    The_Type: "E-Cash",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Input_Amount" }
                }
            }
        ]);

        const E4cas = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.E4cas = E4cas;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};



// Display the Ecobank(54) Transfered Amount
const E1tfat = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Medium: "ecobank 54",
                    Processor: "Superuser",
                    The_Type: "Total Entries",
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
        const E1tfa1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;

        const transferredDocs2 = await SUserInput5Collection.aggregate([
            {
                $match: {
                    Account: "ecobank 54",
                    Processor: "Superuser",
                    DocumentType: "Other Deposits Doc",
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
        const E1tfa2 = transferredDocs2.length > 0 ? transferredDocs2[0].totalAmount : 0;
        const E1tfa = E1tfa1 + E1tfa2;
        req.E1tfa = E1tfa;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(20) Transfered Amount
const E2tfat = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Medium: "ecobank 20",
                    Processor: "Superuser",
                    The_Type: "Total Entries",
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
        const E2tfa1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;

        const transferredDocs2 = await SUserInput5Collection.aggregate([
            {
                $match: {
                    Account: "ecobank 20",
                    Processor: "Superuser",
                    DocumentType: "Other Deposits Doc",
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
        const E2tfa2 = transferredDocs2.length > 0 ? transferredDocs2[0].totalAmount : 0;
        const E2tfa = E2tfa1 + E2tfa2;
        
        req.E2tfa = E2tfa;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(10) Transfered Amount
const E3tfat = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Medium: "ecobank 10",
                    Processor: "Superuser",
                    The_Type: "Total Entries",
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
        const E3tfa1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        const transferredDocs2 = await SUserInput5Collection.aggregate([
            {
                $match: {
                    Account: "ecobank 10",
                    Processor: "Superuser",
                    DocumentType: "Other Deposits Doc",
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
        const E3tfa2 = transferredDocs2.length > 0 ? transferredDocs2[0].totalAmount : 0;
        const E3tfa = E3tfa1 + E3tfa2;
        req.E3tfa = E3tfa;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(80) Transfered Amount
const E4tfat = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Medium: "ecobank 80",
                    Processor: "Superuser",
                    The_Type: "Total Entries",
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
        const E4tfa1 = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        const transferredDocs2 = await SUserInput5Collection.aggregate([
            {
                $match: {
                    Account: "ecobank 80",
                    Processor: "Superuser",
                    DocumentType: "Other Deposits Doc",
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
        const E4tfa2 = transferredDocs2.length > 0 ? transferredDocs2[0].totalAmount : 0;
        const E4tfa = E4tfa1 + E4tfa2;
        req.E4tfa = E4tfa;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display all Ecobank Total Transfered Amount
const TEtfat = async (req, res, next) => {
    try {
        
        const T1 = parseFloat(req.sa1e) || 0; 
        const T2 = parseFloat(req.sa2e) || 0; 
        const T3 = parseFloat(req.sb1e) || 0; 
        const T4 = parseFloat(req.sb2e) || 0;
        const T5 = parseFloat(req.sp1e) || 0; 
        const T6 = parseFloat(req.sp2e) || 0; 
        const T7 = parseFloat(req.OtEc) || 0;  

        const TEtfa = T1 + T2 + T3 + T4 + T5 + T6 + T7;

        req.TEtfa = TEtfa;

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(54) Current Balance
const E1cblc = async (req, res, next) => {
    try {
        
        const openingBalance = parseFloat(req.E1obl) || 0; 
        const totalDeposits = parseFloat(req.E1cas) || 0; 
        const transferredAmount = parseFloat(req.E1tfa) || 0; 

        const E1cbl = openingBalance + totalDeposits - transferredAmount;

         req.E1cbl = parseFloat( E1cbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(20) Current Balance
const E2cblc = async (req, res, next) => {
    try {
        
        const openingBalance = parseFloat(req.E2obl) || 0; 
        const totalDeposits = parseFloat(req.E2cas) || 0; 
        const transferredAmount = parseFloat(req.E2tfa) || 0; 

        const E2cbl = openingBalance + totalDeposits - transferredAmount;

         req.E2cbl = parseFloat( E2cbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(10) Current Balance
const E3cblc = async (req, res, next) => {
    try {
        
        const openingBalance = parseFloat(req.E3obl) || 0; 
        const totalDeposits = parseFloat(req.E3cas) || 0; 
        const transferredAmount = parseFloat(req.E3tfa) || 0; 

        const E3cbl = openingBalance + totalDeposits - transferredAmount;

         req.E3cbl = parseFloat( E3cbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

// Display the Ecobank(80) Current Balance
const E4cblc = async (req, res, next) => {
    try {
        
        const openingBalance = parseFloat(req.E4obl) || 0; 
        const totalDeposits = parseFloat(req.E4cas) || 0; 
        const transferredAmount = parseFloat(req.E4tfa) || 0; 

        const E4cbl = openingBalance + totalDeposits - transferredAmount;

         req.E4cbl= parseFloat( E4cbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Calbank opening Balance
const Coblc = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const SCopeningBalances = await SuperuserInputsCollection.find({
            Medium: "Calbank",
            Name: "Superuser",
            The_Type: "Opening Balance",
            Timestamp: {
                $gte: currentDate, 
                $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) 
            }
        });

        let Cobl = '0';
        if (SCopeningBalances.length > 0) {
            SCopeningBalances.sort((a, b) => b.Timestamp - a.Timestamp);
            Cobl = SCopeningBalances[0].Input_Amount;
        }

        req.Cobl = Cobl;
        next();
    } catch (err) {
        console.error("Error fetching opening balance:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Calbank E-cash Collected Balance
const Cecash = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const inputAmounts = await SuperuserInputsCollection.aggregate([
            {
                $match: {
                    Name: "Superuser",
                    Medium: "Calbank",
                    The_Type: "E-Cash",
                    Timestamp: {
                        $gte: currentDate,
                        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$Input_Amount" }
                }
            }
        ]);

        const Cecas = inputAmounts.length > 0 ? inputAmounts[0].totalAmount : 0;
        req.Cecas = Cecas;
        next();
    } catch (err) {
        console.error("Error fetching total InputAmount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Calbank Transfered Amount
const Ctfat = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const transferredDocs = await SUserInput4Collection.aggregate([
            {
                $match: {
                    Medium: "Calbank",
                    Processor: "Superuser",
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

        const Ctfa = transferredDocs.length > 0 ? transferredDocs[0].totalAmount : 0;
        req.Ctfa = Ctfa;
        next();
    } catch (err) {
        console.error("Error finding transferred amount:", err);
        res.status(500).send('Internal Server Error');
    }
};


// Display the Calbank Current Balance
const Ccblc = async (req, res, next) => {
    try {
        
        const openingBalance = parseFloat(req.Cobl) || 0; 
        const totalDeposits = parseFloat(req.Cecas) || 0; 
        const transferredAmount = parseFloat(req.Ctfa) || 0; 

        const Ccbl = openingBalance + totalDeposits - transferredAmount;

         req.Ccbl= parseFloat( Ccbl.toFixed(2));

        next();
    } catch (err) {
        console.error("Error calculating current balance:", err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {Mobc,MechC,Mtfat,Mcblc,Foblc,Fecash,Fftat,Fcblc,E1oblc,E2oblc,E3oblc,E4oblc,E1cash,E2cash,E3cash,E4cash,
E1tfat,E2tfat,E3tfat,E4tfat,E1cblc,E2cblc,E3cblc,E4cblc,
Coblc,Cecash,Ctfat,Ccblc,TEtfat};

