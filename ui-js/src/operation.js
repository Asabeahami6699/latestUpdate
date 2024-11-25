function showPopup(formid) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formid).style.display = 'block';
}

function closePopup(formid) {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById(formid).style.display = 'none';
}

function previewData() {
    const branch = document.querySelector('#branch').value;
    const bankType = document.querySelector('#banktype').value;
    const beneficiary = document.querySelector('#beneficiary').value;
    const slipNumber = document.querySelector('#slipnumber').value;
    const amount = document.querySelector('#amount').value;

    if (branch === "" || bankType === "" || beneficiary === "" || slipNumber === "" || amount === "") {
        const err = document.getElementById('err');
        err.style.display = 'block';

        setTimeout(() => {
            err.style.display = 'none';
        }, 3000);
    } else {

        document.getElementById('previewBranch').textContent = branch;
        document.getElementById('previewBankType').textContent = bankType;
        document.getElementById('previewBeneficiaryName').textContent = beneficiary;
        document.getElementById('previewSlipNumber').textContent = slipNumber;
        document.getElementById('previewAmount').textContent = parseFloat(amount);

        document.getElementById('operationsPopupForm').style.display = 'none'; 
        document.getElementById('operationsPreview').style.display = 'block'; 
    }
}

function previewEcash() {
    // Get the input value from the form
    const amountInput = document.getElementById("amountEcash").value;
    if (amountInput === "") {
        document.getElementById("err2").style.display = "block";
        setTimeout(() => {
            document.getElementById("err2").style.display = 'none';
        }, 3000);
    } else {
        document.getElementById("err2").style.display = "none";

        document.getElementById("previewEcash").textContent = amountInput;

        document.getElementById("operationsPopupForm2").style.display = "none";
        document.getElementById("operationsPreview2").style.display = "block";
    }
}

// Function to preview the Transaction ID
function previewDelt() {
    const transactionID = document.getElementById('IDdelt').value;
    const err = document.getElementById('err3');
    
    if (!transactionID) {
        err.style.display = 'block';
        setTimeout(() => {
            err.style.display = 'none';
        }, 3000); 
        return;
    }
    
    document.getElementById('previewDelt1').textContent = transactionID;
    document.getElementById('operationsPopupForm3').style.display = 'none';
    document.getElementById('operationsPreview3').style.display = 'block';
}


function backToForm2() {
    document.getElementById("operationsPreview2").style.display = "none";
    document.getElementById("operationsPopupForm2").style.display = "block";
}

function backToForm3() {
    document.getElementById("operationsPreview3").style.display = "none";
    document.getElementById("operationsPopupForm3").style.display = "block";
}

function backToForm() {
    document.getElementById('operationsPopupForm').style.display = 'block'; 
    document.getElementById('operationsPreview').style.display = 'none'; 
}

function toggleMenu() {
    const menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('active');
}

async function submitData() {
    const form = document.getElementById('Interbank-Form');
    const formData = {
        branch: form.branch.value,
        banktype: form.banktype.value,
        beneficiary: form.beneficiary.value,
        slipnumber: form.slipnumber.value,
        amount: form.amount.value
    };

    const hideAllMessages = () => {
        const messageIds = ['successful-sms', 'operationsPreview', 'failure-sms'];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };

    const showErrorAndReset = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('operationsPreview').style.display = 'block';
        }, 4000);
    };

    hideAllMessages();
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/operationalTransc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            document.getElementById('loading').style.display = 'none';
            if (data.success) {
                document.getElementById('success-txt').innerText = 'Interbank Transaction Document Is Saved Successfully';
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/operational';
                }, 3000);
            } else {
                showErrorAndReset();
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset();
        }
    }, 4000);
}

async function submitData2() {
    const form = document.getElementById('Interbank-Ecash');
    const formData = {
        document: "Ecash Document",
        amount: form.amount.value
    };

    const hideAllMessages = () => {
        const messageIds = ['successful-sms', 'operationsPreview2', 'failure-sms'];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };

    const showErrorAndReset = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('operationsPreview2').style.display = 'block';
        }, 4000);
    };

    hideAllMessages();
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/operationalTransc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            document.getElementById('loading').style.display = 'none';

            if (data.success) {
                document.getElementById('success-txt').innerText = 'Ecash Document Is Saved Successfully';
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/operational';
                }, 3000);
            } else {
                showErrorAndReset();
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset();
        }
    }, 4000);
}


// Function to submit the Transaction ID for deletion
async function submitData3() {
    const transactionID = document.getElementById('IDdelt').value;

    const hideAllMessages = () => {
        ['successD-sms-delS', 'failure-sms-delE', 'failure-sms', 'operationsPreview3'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
    };

    const showErrorAndReset = () => {
        document.getElementById('loading').style.display = 'none';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('operationsPreview3').style.display = 'block';
        }, 4000);
    };

    hideAllMessages();
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/deleteByOperational', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transactionID })
            });
    
            const data = await response.json();
            document.getElementById('loading').style.display = 'none';
            
            if (data.success) {
                document.getElementById('successD-sms-delS').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/operational';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('failure-sms-delE').style.display = 'block';
                showErrorAndReset();
            } else {
                document.getElementById('failure-sms').style.display = 'block';
                showErrorAndReset();
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('failure-sms').style.display = 'block';
            showErrorAndReset();
        }
    }, 4000);
}


// Download Table Data as CSV
function downloadCSV() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('dlPopupForm').style.display = 'block';
}

async function loadTransactions(startDate, endDate) {
    try {
        // Build the query parameters if start and end dates are provided
        let query = '';
        if (startDate && endDate) {
            query = `?startDate=${startDate}&endDate=${endDate}`;
        }

        // Fetch transactions from the backend
        const response = await fetch(`/optTransaction1${query}`);
        const transactions = await response.json();

        // Get the table body element
        const tbody = document.querySelector('#transactionsTable tbody');
        tbody.innerHTML = ''; // Clear existing data

        // Loop through transactions and insert rows
        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.Branch}</td>
                <td>${transaction.BankType}</td>
                <td>${transaction.BeneficiaryName}</td>
                <td>${transaction.Amount}</td>
                <td>${transaction.ID}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

// Load today's transactions on page load
const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
loadTransactions(today, today);

// Apply Filter button click event
document.getElementById('applyFilter').addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        loadTransactions(startDate, endDate); // Load filtered transactions
    } else {
        alert('PLEASE SELECT A START AND END DATE.');
    }
});
