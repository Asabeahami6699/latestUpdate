const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const MYDB = process.env.MYDB;

mongoose.connect(MYDB)
.then(() => {
    console.log('Mongodb Atlas is connected');
})
.catch((e) => {
    console.log('Mongoose failed connecting', e);
});

// Model for Adding User(s) to the DB 
const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    tellertype:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
   
});
const LogInCollection=new mongoose.model('LogInCollection',logInSchema);


// Model for Tellers to Add Bank Transac.(both Deposits and Withdrawals) to the DB
const userstransactionSchema = new mongoose.Schema({
    
    Bank: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    AccounTNumber: {
        type: String,
        required: true
    },
    Beneficialname: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Commission: {
        type: Number,
        required: true
    },
    TellerType: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    TheBranch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const Transaction =new mongoose.model('Transaction', userstransactionSchema);


// Model for Superuser to Add All Transac. to the DB
const supertransactionSchema = new mongoose.Schema({
    Transaction: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Processor: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Teller_Type: {
        type: String,
        required: true
    },
    The_Branch: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const SBTransaction =new mongoose.model('SBTransaction', supertransactionSchema);


// Model for Tellers to Add MoMo Transac.(both Deposits and Withdrawals) to the DB
const UserMoMoSchema=new mongoose.Schema({
    MoMo: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    MoMoNumber: {
        type: String,
        required: true
    },
    Beneficialname: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    commDescription: {
        type: String,
        required: true
    },
    commReason: {
        type: String,
        required: true
    },
    Commission: {
        type: Number,
        required: true
    },
    TellerType: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    TheBranch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const UserMoMoCollection=new mongoose.model('UserMoMoCollection',UserMoMoSchema);


// Model for Superuser to Add Individual Teller to the DB
const SUserInput3Schema=new mongoose.Schema({
    Processor: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Teller_Type: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    The_Branch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    The_Type: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const SUserInput3Collection=new mongoose.model('SUserInput3Collection',SUserInput3Schema);


// Model for Superuser to Add Individual Transaction to the DB
const SUserInput4Schema=new mongoose.Schema({
    Processor: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Medium: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    The_Type: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const SUserInput4Collection=new mongoose.model('SUserInput4Collection',SUserInput4Schema);


// Model for Superuser to Add Other Deposits Record to the DB
const SUserInput5Schema = new mongoose.Schema({
    Processor: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Account: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    DocumentType: {
        type: String, 
        required: true
    },
    The_Type: {
        type: String, // Optional for Sform9
        default: null
    },
    Commission: {
        type: Number, // Optional for Sform8
        default: null
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const SUserInput5Collection = new mongoose.model('SUserInput5Collection', SUserInput5Schema);



// Model for Tellers to Add (Initial Pcash inputs) to the DB
const UserInputSchema=new mongoose.Schema({
    Name: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    InputType:{
        type:String,
        required:true
    },
    InputAmount:{
        type:Number,
        required:true
    },
    TheType:{
        type:String,
        required:true
    },
    Teller_Type: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    The_Branch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const UserInputsCollection=new mongoose.model('UserInputsCollection',UserInputSchema);


// Model for Tellers to Add (Pcash coltd inputs) to the DB
const UserDInputSchema=new mongoose.Schema({
    Name: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    InputType:{
        type:String,
        required:true
    },
    InputAmount:{
        type:Number,
        required:true
    },
    TheType:{
        type:String,
        required:true
    },
    Teller_Type: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    The_Branch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const UserDInputsCollection=new mongoose.model('UserDInputsCollection',UserDInputSchema);


// Model for Superuser to Add (both Deposited inputs and Opening Balance) to the DB
const SuperuserInputsSchema = new mongoose.Schema({
    Name: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Medium: {
        type: String,
        required: true
    },
    Input_Amount: {
        type: Number,
        required: true
    },
    The_Type: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const SuperuserInputsCollection =new mongoose.model('SuperuserInputsCollection', SuperuserInputsSchema);


// Model for Tellers to Add Other Withdrawal docs to the DB
const OthersWithdrawalSchema = new mongoose.Schema({
    Name: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Beneficial_Name: {
        type: String,
        required: true
    },
    Teller_Type: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    The_Branch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const OthersWithdrawalCollection =new mongoose.model('OthersWithdrawalCollection', OthersWithdrawalSchema);


// Model for Tellers to Add SuSu  docs to the DB
const SusuDocsSchema = new mongoose.Schema({
    Name: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Beneficial_Name: {
        type: String,
        required: true
    },
    AccounTNumber: {
        type: String,
        required: true
    },
    Teller_Type: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    The_Branch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const SusuDocs =new mongoose.model('SusuDocs', SusuDocsSchema);


// Model for Tellers to Add Input 3 info.  docs to the DB
const TellerInput3Schema = new mongoose.Schema({
    Name: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Teller_Type: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    The_Branch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const TellerInput3 =new mongoose.model('TellerInput3', TellerInput3Schema);


// Model for Customer Service Personel to add Ecobank Withdls to the DB
const csEWSchema = new mongoose.Schema({
    CSName: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    CSUserType: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    CSBranch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    BeneficiaryName: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const CSEcobankWithdls =new mongoose.model('CSEcobankWithdls', csEWSchema);


// Model for Customer Service Personel to add Express Account Created to the DB
const csEACchema = new mongoose.Schema({
    CSName: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    CSUserType: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    CSBranch: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    CustomerName: {
        type: String,
        required: true
    },
    CustomerContact: {
        type: String,
        required: true
    },
    AccountNumber: {
        type: String,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true
    },
    InitialDeposit: {
        type: Number,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const CSExpressAcctCreation =new mongoose.model('CSExpressAcctCreation', csEACchema);


// Model for Accountant to add Data to the DB
const accountantSchema = new mongoose.Schema({
    Username: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    UserType: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    FormType: {
        type: String,
        required: true,
        enum: ['Closing Balance', 'Downloaded Report']
    },
    Branch: {  // Only for Accountant forms
        type: String,
        required: function() {
            return this.FormType === 'Closing Balance';
        }
    },
    TellerType: { // Only for Accountant forms
        type: String,
        required: function() {
            return this.FormType === 'Closing Balance';
        }
    },
    AccountType: {  // Only for Report forms
        type: String,
        required: function() {
            return this.FormType === 'Downloaded Report';
        }
    },
    Amount: { 
        type: Number,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: { 
        type: Date,
        default: Date.now,
        required: true
    }
});
const AccountantCollection =new mongoose.model('AccountantCollection', accountantSchema);


// Model for Operational Personel to add other deposits docs to the DB
const OptSchema = new mongoose.Schema({
    Name: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    UserType: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Branch: {
        type: String,
        required: false  // Made optional for Ecash documents
    },
    BankType: {
        type: String,
        required: false  // Made optional for Ecash documents
    },
    BeneficiaryName: {
        type: String,
        required: false  // Made optional for Ecash documents
    },
    SlipNumber: {
        type: String,
        required: false  // Made optional for Ecash documents
    },
    Amount: {
        type: Number,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    DocumentType: {
        type: String,
        default: "Actual Entry",
        required: true  // Optional field to distinguish document type
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const OperationalColt = new mongoose.model('OperationalColt', OptSchema);


const uniqueIDSchema = new mongoose.Schema({
    ID: { type: String, unique: true, required: true },
    
    Timestamp: {
        type: Date,
        default: Date.now,
        required:true
    }
});
const AllDocsUniqueIDs = new mongoose.model('AllDocsUniqueIDs', uniqueIDSchema);


const unifiedSchema = new mongoose.Schema({
    Username: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    UserType: {
        type: String,
        ref: 'LogInCollection',
        required: true
    },
    Document: {
        type: String,
        required: true,
        enum: ['Account Balance Doc', 'Unsettled Balances Doc', 'PCash Doc','Pending Transactions Doc',
        'Given-Out/Personal Expenses Doc','Expenses & Commission Doc','SUSU Transaction Doc']
    },
    Branch: {  
        type: String,
        required: function() {
            return this.Document === 'Unsettled Balances Doc' || this.Document === 'PCash Doc';
        }
    },
    AccountType: {  
        type: String,
        required: function() {
            return this.Document === 'Account Balance Doc';
        }
    },
    Description: {  
        type: String,
        required: function() {
            return this.Document === 'Account Balance Doc'|| this.Document === 'Given-Out/Personal Expenses Doc'
            || this.Document === 'Pending Transactions Doc'|| this.Document === 'Expenses & Commission Doc'
            || this.Document === 'SUSU Transaction Doc';
        }
    },
    TransactionType: {  
        type: String,
        required: function() {
            return this.Document === 'Unsettled Balances Doc'|| this.Document === 'Given-Out/Personal Expenses Doc'
            || this.Document === 'Pending Transactions Doc'|| this.Document === 'Expenses & Commission Doc'
            || this.Document === 'SUSU Transaction Doc';
        }
    },
    Amount: { 
        type: Number,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    Timestamp: { 
        type: Date,
        default: Date.now,
        required: true
    }
});

const COverallColt = new mongoose.model('COverallColt', unifiedSchema);


module.exports = {
    LogInCollection,Transaction,SBTransaction,UserMoMoCollection,SUserInput3Collection,
    UserInputsCollection,UserDInputsCollection,SuperuserInputsCollection,OthersWithdrawalCollection,SusuDocs,TellerInput3,
    SUserInput4Collection,SUserInput5Collection,CSEcobankWithdls,CSExpressAcctCreation,
    AccountantCollection,AllDocsUniqueIDs,OperationalColt,COverallColt
};
