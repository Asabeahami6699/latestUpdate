function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    sidebar.classList.toggle('visible');
    body.classList.toggle('shifted');
}

function openPopup(formId) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('visible')) {
        toggleSidebar();
    }

    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formId).style.display = 'block';
    document.body.classList.add('no-scroll'); 
}

function Confirm1() {
    const branch = document.getElementById('branch').value;
    const tellerType = document.getElementById('tellerType').value;
    const amount = document.getElementById('amount').value;

    if (branch === "" || tellerType === "" || amount === "") {
        const err1 = document.getElementById('err1');
        err1.style.display = 'block'; 

        setTimeout(() => {
            err1.style.display = 'none';
        }, 3000);
    } else {
        document.getElementById('err1').style.display = 'none'; 

        document.getElementById('previewBranch').textContent = branch;
        document.getElementById('previewTellerType').textContent = tellerType;
        document.getElementById('previewAmount').textContent = parseFloat(amount);

        document.getElementById('accountantPopupForm').style.display = "none";
        document.getElementById('accountantPreview').style.display = "block";
    }
}

function Back1() {
    document.getElementById('accountantPreview').style.display = 'none';
    document.getElementById('accountantPopupForm').style.display = 'block';
}

async function Submit1() {
    const form = document.getElementById('closingBlnForm');
    const formData = {
        FormType: 'Closing Balance',
        branch: form.branch.value,
        tellerType: form.tellerType.value,
        amount: form.amount.value
    };

    const hideAllMessages = () => {
        const messageIds = ['successful-sms', 'accountantPreview', 'failure-sms'];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };

    const showErrorAndReset = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('accountantPreview').style.display = 'block';
        }, 4000);
    };

    hideAllMessages();
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/AccountantForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            document.getElementById('loading').style.display = 'none';
            if (data.success) {
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/accountant';
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


function Confirm2() {
    const accountType = document.getElementById('accounttype').value;
    const amount = document.getElementById('reportAmount').value;

    if (accountType === "" || amount === "") {
        const err2 = document.getElementById('err2');
        err2.style.display = 'block'; 

        setTimeout(() => {
            err2.style.display = 'none';
        }, 3000);
    } else {
        document.getElementById('err2').style.display = 'none'; 

        document.getElementById('previewAccount').textContent = accountType;
        document.getElementById('reportPreviewAmount').textContent = parseFloat(amount);

        document.getElementById('reportPopupForm').style.display = "none";
        document.getElementById('dlReportPreview').style.display = "block";
    }
}

function Confirm3() {
    document.getElementById('errorSmsDelt').style.display = 'none';

    const transactionID = document.getElementById('transDelt').value.trim();

    if (transactionID === "") {
        document.getElementById('errorSmsDelt').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorSmsDelt').style.display = 'none';
        }, 3000);
    } else {
        document.getElementById('previewtransactionID').textContent = transactionID;

        document.getElementById('acctDeltForm').style.display = "none";
        document.getElementById('accDeltPrv').style.display = "block";
    }
}

function Back3() {
    document.getElementById('accDeltPrv').style.display = 'none';
    document.getElementById('acctDeltForm').style.display = 'block';
}

function Back2() {
    document.getElementById('dlReportPreview').style.display = 'none';
    document.getElementById('reportPopupForm').style.display = 'block';
}

async function Submit2() {
    const form = document.getElementById('dlReportsForm');
    const formData = {
        FormType: 'Downloaded Report',
        accounttype: form.accounttype.value,
        amount: form.reportAmount.value
    };

    const hideAllMessages = () => {
        const messageIds = ['successful-sms', 'dlReportPreview', 'failure-sms'];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };

    const showErrorAndReset = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('dlReportPreview').style.display = 'block';
        }, 4000);
    };

    hideAllMessages();
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/AccountantForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            document.getElementById('loading').style.display = 'none';
            if (data.success) {
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/accountant';
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


// Async delete function with error handling
async function submitDel() {
    const form = document.getElementById('docDeltForm');
    const formData = { Id: form.deletion2.value };

    const hideAllMessages = () => {
        const messageIds = ['accDeltPrv', 'failure-sms-delE', 'successD-sms-delS', 'failure-sms'];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };

    const showErrorAndReset = (errorId) => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById(errorId).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('accDeltPrv').style.display = 'block';
        }, 4000);
    };

    hideAllMessages();
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/accountantDel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loading').style.display = 'none';

            if (data.success) {
                document.getElementById('successD-sms-delS').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/accountant';
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
    }, 3000);
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
        
        const backToPageLinks = document.querySelectorAll('.menu-item#back-to-page');

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



function hideForm() {

    document.getElementById('overlay').style.display = 'none';
    document.body.classList.remove('no-scroll');

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}