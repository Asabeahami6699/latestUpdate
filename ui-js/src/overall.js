const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const closeBtn = document.getElementById('close-btn');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    mainContent.classList.remove('active');
});

function showPopups(formId) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formId).classList.add('show');
}


function hideForms(formId) {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById(formId).classList.remove('show');
}

function backToForm(currentForm, targetForm) {
    document.getElementById(currentForm).classList.remove('show');
    document.getElementById(targetForm).classList.add('show');
}

function confirmForm1() {
    document.getElementById('errorSmsBalance').style.display = 'none';

    const accountType = document.getElementById('accountTypeBalance').value;
    const accountDescription = document.getElementById('accountDescriptionBalance').value;
    const balanceAmount = document.getElementById('balanceAmountInput').value.trim();

    if (accountType === "" || accountDescription === "" || balanceAmount === "") {
        document.getElementById('errorSmsBalance').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorSmsBalance').style.display = 'none';
        }, 3000); 
    } else {
        document.getElementById('previewAccountTypeBalance').textContent = accountType;
        document.getElementById('previewAccountDescriptionBalance').textContent = accountDescription;
        document.getElementById('previewBalanceAmountBalance').textContent = balanceAmount;

        document.getElementById('accntBlnForm').classList.remove('show');
        document.getElementById('previewFormBalance').classList.add('show');
    }
}

function confirmForm2() {
    document.getElementById('errorSmsUnsettled').style.display = 'none';

    const branch = document.getElementById('branchUnsettled').value;
    const transactionType = document.getElementById('transactionTypeUnsettled').value;
    const amount = document.getElementById('amountUnsettled').value.trim();

    if (branch === "" || transactionType === "" || amount === "") {
        document.getElementById('errorSmsUnsettled').style.display = 'block'; 
        setTimeout(() => {
            document.getElementById('errorSmsUnsettled').style.display = 'none';
        }, 3000); 
    } else {
        document.getElementById('previewBranchUnsettled').textContent = branch;
        document.getElementById('previewTransactionTypeUnsettled').textContent = transactionType;
        document.getElementById('previewAmountUnsettled').textContent = amount;

        document.getElementById('unsettledForm').classList.remove('show');
        document.getElementById('unsettledPreview').classList.add('show');
        
    }
}

function confirmForm3() {
    document.getElementById('errorSmsPcash').style.display = 'none';

    const branch = document.getElementById('branchPcash').value;
    const amount = document.getElementById('amountPcash').value.trim();

    if (branch === "" || amount === "") {
        document.getElementById('errorSmsPcash').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorSmsPcash').style.display = 'none';
        }, 3000); 
    } else {
        document.getElementById('previewBranchPcash').textContent = branch;
        document.getElementById('previewAmountPcash').textContent = amount;

        document.getElementById('pcashForm').classList.remove('show');
        document.getElementById('pcashPreview').classList.add('show');
    }
}

function confirmForm4() {
    document.getElementById('errorSmsPending').style.display = 'none';

    const transactionType = document.getElementById('transactionTypePending').value;
    const description = document.getElementById('descriptionPending').value;
    const amount = document.getElementById('amountPending').value.trim();

    if (transactionType === "" || description === "" || amount === "") {
        document.getElementById('errorSmsPending').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorSmsPending').style.display = 'none';
        }, 3000); 
    } else {
        document.getElementById('previewTransactionTypePending').textContent = transactionType;
        document.getElementById('previewDescriptionPending').textContent = description;
        document.getElementById('previewAmountPending').textContent = amount;

        document.getElementById('pendingForm').classList.remove('show');
        document.getElementById('pendingPreview').classList.add('show');
    }
}

function confirmForm5() {
    document.getElementById('errorSmsGivenOutTransaction').style.display = 'none';

    const transactionType = document.getElementById('givenoutTransactionType').value;
    const description = document.getElementById('givenoutDescriptionTransaction').value;
    const amount = document.getElementById('givenoutAmountTransaction').value.trim();

    if (transactionType === "" || description === "" || amount === "") {
        document.getElementById('errorSmsGivenOutTransaction').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorSmsGivenOutTransaction').style.display = 'none';
        }, 3000); 
    } else {
        document.getElementById('previewGivenOutTransactionType').textContent = transactionType;
        document.getElementById('previewGivenOutDescriptionTransaction').textContent = description;
        document.getElementById('previewGivenOutAmountTransaction').textContent = amount;

        document.getElementById('givenOutForm').classList.remove('show');
        document.getElementById('givenOutPreview').classList.add('show');
    }
}

function confirmForm7() {
    document.getElementById('errorSmsSusu').style.display = 'none';

    const branch = document.getElementById('branchSusu').value;
    const description = document.getElementById('descriptionSusu').value;
    const amount = document.getElementById('amountSusu').value.trim();

    if (branch === "" || description === "" || amount === "") {
        document.getElementById('errorSmsSusu').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorSmsSusu').style.display = 'none';
        }, 3000); 
    } else {
        document.getElementById('previewBranchSusu').textContent = branch;
        document.getElementById('previewDescriptionSusu').textContent = description;
        document.getElementById('previewAmountSusu').textContent = amount;

        document.getElementById('susuForm').classList.remove('show');
        document.getElementById('susuPreview').classList.add('show');
    }
}

function confirmForm6() {
    const transactionType = document.getElementById("Exps/Comm").value;
    const description = document.getElementById("descriptionExpCom").value;
    const amount = document.getElementById("amountExpCom").value;

    document.getElementById('errorSmsExpCom').style.display = 'none';

    if (transactionType === "" || description === "" || amount === "") {
        document.getElementById('errorSmsExpCom').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorSmsExpCom').style.display = 'none';
        }, 3000); 

    } else {
        document.getElementById("previewtransactiontypeExpCom").textContent = transactionType;
        document.getElementById("previewDescriptionExpCom").textContent = description;
        document.getElementById("previewAmountExpCom").textContent = amount;
    
        document.getElementById('expComForm').classList.remove('show');
        document.getElementById('expComPreview').classList.add('show')
    }

}


function deltDocs() {
    document.getElementById('errorSmsDelt').style.display = 'none';

    const transactionID = document.getElementById('transDelt').value.trim();

    if (transactionID === "") {
        document.getElementById('errorSmsDelt').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorSmsDelt').style.display = 'none';
        }, 3000);
    } else {
        document.getElementById('previewtransactionID').textContent = transactionID;

        document.getElementById('overallDeltForm').classList.remove('show');
        document.getElementById('overallDeltPreview').classList.add('show');
    }
}


fetch('/getUserType')
    .then(response => response.json())
    .then(data => {
        const userType = data.usertype;

        let userRedirects = {
            'Superuser': '/superuser',
            'Teller': '/user',
            'Administrator': '/admin',
            'Invites': '/invite',
            'Costumer Service': '/cservice',
            'Accountant': '/accountant',
            'Operational': '/operational'
        };
        
        let redirectUrl = userRedirects[userType] || '/';        

        const backToPageLinks = document.querySelectorAll('.back-to-page');

            backToPageLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    window.location.href = redirectUrl; 
                });
            });
    })
    .catch(error => {
    console.error('Error fetching user type:', error);
});


function disableButtons() {
    const buttons = document.querySelectorAll('.buttonContainer button');
    
    buttons.forEach(button => {
        button.disabled = true;          
        button.classList.add('disabled'); 
    });
}

function enableButtons() {
    const buttons = document.querySelectorAll('.buttonContainer button');
    
    buttons.forEach(button => {
        button.disabled = false;          
        button.classList.remove('disabled'); 
    });

    document.querySelector('.loader').style.display = 'none';
}

let currentFormId = null;
function showLoaderForCurrentForm(id) {
    currentFormId = id;

    const currentForm = document.getElementById(currentFormId);
    if (currentForm) {
        currentForm.querySelector('.loader').style.display = 'block';

        setTimeout(() => {
            currentForm.querySelector('.loader').style.display = 'none';
        }, 4000);
        
    }
}

const descriptions = {
    'Ecobank': ['54. ACCOUNT', '20. ACCOUNT', '10. ACCOUNT', '80. ACCOUNT'],
    'MoMo/Voda': ['MTN', 'VODA', 'SUSU MOMO', 'MOMO', 'G.MONEY', 'ZEEPAY', '0243028644'],
    'Other Bank': ['CALBANK', 'FIDELITY 1', 'FIDELITY 2', 'GCB', '91 ACCOUNT', 'CALBANK FLOAT', 'WITHDRAWALS']
};

document.getElementById('accountTypeBalance').addEventListener('change', function() {
    const selectedType = this.value;
    const accountDescription = document.getElementById('accountDescriptionBalance');

    accountDescription.innerHTML = '<option value="" disabled selected hidden>Select Account Description</option>';

    if (selectedType === 'Opening Balance') {
        const openingBalanceOption = document.createElement('option');
        openingBalanceOption.value = 'Opening Balance';
        openingBalanceOption.textContent = 'Opening Balance';
        openingBalanceOption.selected = true;
        accountDescription.appendChild(openingBalanceOption);
    } else {
        if (descriptions[selectedType]) {
            descriptions[selectedType].forEach(option => {
                const newOption = document.createElement('option');
                newOption.value = option;
                newOption.textContent = option;
                accountDescription.appendChild(newOption);
            });
        }
    }
});


document.getElementById('Exps/Comm').addEventListener('change', function () {
    const transactionType = this.value;
    const descriptionSelect = document.getElementById("descriptionExpCom");
    
    descriptionSelect.innerHTML = '<option value="" disabled selected hidden>Select Description</option>';
    
    if (transactionType === "Expenses") {
        descriptionSelect.innerHTML += `
            <option value="Aiyinase Teller 1">Aiyinase Teller 1</option>
            <option value="Aiyinase Teller 2">Aiyinase Teller 2</option>
            <option value="Bogoso Teller 1">Bogoso Teller 1</option>
            <option value="Bogoso Teller 2">Bogoso Teller 2</option>
            <option value="Prestea Teller 1">Prestea Teller 1</option>
            <option value="Prestea Teller 2">Prestea Teller 2</option>
            <option value="Other">Other</option>
            <option value="Daily Transaction Charges">Daily Transaction Charges</option>
            <option value="End of Month Acct. Charges">End of Month Acct. Charges</option>
        `;
    } else if (transactionType === "Commission") {
        descriptionSelect.innerHTML += `
            <option value="Aiyinase Teller 1">Aiyinase Teller 1</option>
            <option value="Aiyinase Teller 2">Aiyinase Teller 2</option>
            <option value="Bogoso Teller 1">Bogoso Teller 1</option>
            <option value="Bogoso Teller 2">Bogoso Teller 2</option>
            <option value="Prestea Teller 1">Prestea Teller 1</option>
            <option value="Prestea Teller 2">Prestea Teller 2</option>
            <option value="Ezwich">Ezwich</option>
            <option value="Remittance">Remittance</option>
            <option value="Interbank Commission">Interbank Commission</option>
        `;
    }
});


// Helper function to hide all status messages
const hideAllMessages = () => {
    const messageIds = ['successful-sms', 'failure-sms', 'failure-sms-delE', 'successD-sms-delS'];
    messageIds.forEach(id => document.getElementById(id).style.display = 'none');
};


// Function to handle form submission for FORM1
async function submitForm1() {
    disableButtons();
    const form = document.getElementById('balanceForm');
    const formData = {
        document: "Account Balance Doc",
        accountType: form['AB-slt'].value,
        description: form.Description.value,
        amount: form.amount.value
    };

    const showErrorAndReset = () => {
        document.getElementById('failure-sms').style.display = 'block';
        document.getElementById('previewFormBalance').classList.remove('show');
        setTimeout(() => {
            hideAllMessages();
            enableButtons();
            document.getElementById('accntBlnForm').classList.add('show');
        }, 4000);
    };

    hideAllMessages();
    showLoaderForCurrentForm('previewFormBalance');

    setTimeout(async () => {
        try {
            const response = await fetch('/overllFormsRoutes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('previewFormBalance').classList.remove('show');
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/company-overall-balancing'; 
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

// Function to handle form submission for FORM2
async function submitForm2() {
    disableButtons();
    const form = document.getElementById('Form2');
    const formData = {
        document: "Unsettled Balances Doc",
        branch: form.branch.value,
        transactionType: form['UB-slt'].value,
        amount: form.amount.value
    };

    const showErrorAndReset = () => {
        document.getElementById('failure-sms').style.display = 'block';
        document.getElementById('unsettledPreview').classList.remove('show');
        setTimeout(() => {
            hideAllMessages();
            enableButtons();
            document.getElementById('unsettledForm').classList.add('show');
        }, 4000);
    };

    hideAllMessages();
    showLoaderForCurrentForm('unsettledPreview');

    setTimeout(async () => {
        try {
            const response = await fetch('/overllFormsRoutes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('unsettledPreview').classList.remove('show');
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/company-overall-balancing';
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

// Function to handle form submission for FORM3
async function submitForm3() {
    disableButtons();
    const form = document.getElementById('pcashFormDetails');
    const formData = {
        document: "PCash Doc",
        branch: form.branch.value,
        amount: form.amount.value
    };

    const showErrorAndReset = () => {
        document.getElementById('failure-sms').style.display = 'block';
        document.getElementById('pcashPreview').classList.remove('show');
        setTimeout(() => {
            hideAllMessages();
            enableButtons();
            document.getElementById('pcashForm').classList.add('show');
        }, 4000);
    };

    hideAllMessages();
    showLoaderForCurrentForm('pcashPreview');

    setTimeout(async () => {
        try {
            const response = await fetch('/overllFormsRoutes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('pcashPreview').classList.remove('show');
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/company-overall-balancing';
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

// Function to handle form submission for FORM4
async function submitForm4() {
    disableButtons();
    const form = document.getElementById('pendingFormDetails');
    const formData = {
        document: "Pending Transactions Doc",
        description: form.Description.value,
        selecttype: form['PT-slt'].value,
        amount: form.amount.value
    };

    const showErrorAndReset = () => {
        document.getElementById('failure-sms').style.display = 'block';
        document.getElementById('pendingPreview').classList.remove('show');
        setTimeout(() => {
            hideAllMessages();
            enableButtons();
            document.getElementById('pendingForm').classList.add('show');
        }, 4000);
    };

    hideAllMessages();
    showLoaderForCurrentForm('pendingPreview');

    setTimeout(async () => {
        try {
            const response = await fetch('/overllFormsRoutes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('pendingPreview').classList.remove('show');
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/company-overall-balancing';
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

// Function to handle form submission for FORM5
async function submitForm5() {
    disableButtons();
    const form = document.getElementById('givenoutTransactionForm');
    const formData = {
        document: "Given-Out/Personal Expenses Doc",
        description: form.Description.value,
        selecttype: form['GOP-slt'].value,
        amount: form.amount.value
    };

    const showErrorAndReset = () => {
        document.getElementById('failure-sms').style.display = 'block';
        document.getElementById('givenOutPreview').classList.remove('show');
        setTimeout(() => {
            hideAllMessages();
            enableButtons();
            document.getElementById('givenOutForm').classList.add('show');
        }, 4000);
    };

    hideAllMessages();
    showLoaderForCurrentForm('givenOutPreview');

    setTimeout(async () => {
        try {
            const response = await fetch('/overllFormsRoutes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('givenOutPreview').classList.remove('show');
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/company-overall-balancing';
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

// Function to handle form submission for FORM6
async function submitForm6() {
    disableButtons();
    const form = document.getElementById('expComFormDetails');
    const formData = {
        document: "Expenses & Commission Doc",
        description: form.Description.value,
        selecttype: form['EC-slt'].value,
        amount: form.amount.value
    };

    const showErrorAndReset = () => {
        document.getElementById('failure-sms').style.display = 'block';
        document.getElementById('expComPreview').classList.remove('show');
        setTimeout(() => {
            hideAllMessages();
            enableButtons();
            document.getElementById('expComForm').classList.add('show');
        }, 4000);
    };

    hideAllMessages();
    showLoaderForCurrentForm('expComPreview');

    setTimeout(async () => {
        try {
            const response = await fetch('/overllFormsRoutes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('expComPreview').classList.remove('show');
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/company-overall-balancing';
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

// Function to handle form submission for FORM7
async function submitForm7() {
    disableButtons();
    const form = document.getElementById('susuFormDetails');
    const formData = {
        document: "SUSU Transaction Doc",
        description: form.Description.value,
        selecttype: form['ST-slt'].value,
        amount: form.amount.value
    };

    const showErrorAndReset = () => {
        document.getElementById('failure-sms').style.display = 'block';
        document.getElementById('susuPreview').classList.remove('show');
        setTimeout(() => {
            hideAllMessages();
            enableButtons();
            document.getElementById('susuForm').classList.add('show');
        }, 4000);
    };

    hideAllMessages();
    showLoaderForCurrentForm('susuPreview');

    setTimeout(async () => {
        try {
            const response = await fetch('/overllFormsRoutes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById('susuPreview').classList.remove('show');
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/company-overall-balancing';
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


async function submitFormDelt() {
    disableButtons();
    const transactionID = document.getElementById('transDelt').value;

    const showErrorAndReset = (errorType) => {
        document.getElementById('overallDeltPreview').classList.remove('show');
        document.getElementById(errorType).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            enableButtons();
            document.getElementById('overallDeltForm').classList.add('show');
        }, 4000);
    };

    hideAllMessages();
    showLoaderForCurrentForm('overallDeltPreview');

    setTimeout(async () => {
        try {
            const response = await fetch('/overallDeletion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transactionID })
            });

            const data = await response.json();
            document.getElementById('overallDeltPreview').classList.remove('show');

            if (data.success) {
                document.getElementById('successD-sms-delS').style.display = 'block'; 
                setTimeout(() => {
                    window.location.href = '/company-overall-balancing';
                }, 4000);
            } else if (data.notFound) {
                showErrorAndReset('failure-sms-delE');
            } else {
                showErrorAndReset('failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset('failure-sms'); 
        }
    }, 4000);
}



