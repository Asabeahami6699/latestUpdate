function deleteBMSConfir() {
    document.getElementById('filldelsms').style.display = 'none';

    const transaction = document.querySelector('#Transaction-type').value;
    const transID = document.querySelector('input[name="transID1"]').value.trim();

    if (transaction === 'choose' || !transID) {
        document.getElementById('filldelsms').style.display = 'block';
        setTimeout(() => {
            document.getElementById('filldelsms').style.display = 'none';
        }, 3000);
    } else {
        document.querySelector('#confir-DTrtyp1').textContent = transaction;
        document.querySelector('#confir-Damt1').textContent = transID;

        document.getElementById('BMSdelete-form').style.display = "none";
        document.getElementById('Delete-form1').style.display = "block";
    }
}

function BackD1(){
    document.getElementById('Delete-form1').style.display = 'none';
    document.getElementById('BMSdelete-form').style.display = 'block';
}

function confirSubmitDel1() {
    const formData = {
        transactionType: document.getElementById('Transaction-type').value,
        transID: document.querySelector('input[name="transID1"]').value.trim(),
    };

    hideMessages('Delete-form1'); 
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/DeleteDoc1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loading').style.display = 'none';

            if (data.deleted) {
                document.getElementById('success-txt').innerText = 'Teller Deposit Transaction Document Is Deleted Successfully';
                document.getElementById('success-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/invite';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('unexist-txt').innerText = 'Teller Deposit Transaction Document Does Not Exist!!';
                showErrorAndReset('Delete-form1', 'failure-sms-delE');
            } else {
                showErrorAndReset('Delete-form1', 'failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('fail-txt').innerText = 'Network Or Unexpected Error Occurred While Processing Request, Please Try Again';
            showErrorAndReset('Delete-form1', 'failure-sms');
        }
    }, 3000);
}

function showOtherWithdDelForm() {
    document.getElementById('deleteSms2').style.display = 'none';

    const withdrawalType = document.querySelector('#withdrawal-del').value;
    const transID = document.querySelector('#otherWithDel input[name="transID2"]').value.trim();

    if (withdrawalType === 'choose' || !transID) {
        document.getElementById('deleteSms2').style.display = 'block';
        setTimeout(() => {
            document.getElementById('deleteSms2').style.display = 'none';
        }, 3000);
    } else {
        document.querySelector('#confirm-withd-del').textContent = withdrawalType;
        document.querySelector('#confirm-name-del').textContent = transID;
        
        document.getElementById('OtherWithdlsDel-form').style.display = "none";
        document.getElementById('confirDel-form').style.display = "block";
    }
}

function BackodD() {
    document.getElementById("confirDel-form").style.display = "none";
    document.getElementById("OtherWithdlsDel-form").style.display = "block";
}

function submitOtherWithdDelete() {
    const formData = {
        withdrawalType: document.getElementById('withdrawal-del').value,  
        transID2: document.querySelector('input[name="transID2"]').value.trim(),   
    };
    hideMessages('confirDel-form'); 
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/deleteOtherWithdrawal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loading').style.display = 'none';

            if (data.deleted) {
                document.getElementById('success-txt').innerText = 'Teller Withdrawal Transaction Document Is Deleted Successfully';
                document.getElementById('success-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/invite';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('unexist-txt').innerText = 'Teller Withdrawal Transaction Document Does Not Exist!!';
                showErrorAndReset('confirDel-form', 'failure-sms-delE');
            } else {
                showErrorAndReset('confirDel-form', 'failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('fail-txt').innerText = 'Network Or Unexpected Error Occurred While Processing Request, Please Try Again';
            showErrorAndReset('confirDel-form', 'failure-sms');
        }
    }, 3000);
    
}

function UserIpConfir() {
    document.getElementById('filldelsms2').style.display = 'none';

    const userInput = document.querySelector('#userInput-type').value;
    const transactionId = document.querySelector('input[name="InpID"]').value.trim();

    if (userInput === 'choose' || !transactionId) {
        document.getElementById('filldelsms2').style.display = 'block';
        setTimeout(() => {
            document.getElementById('filldelsms2').style.display = 'none';
        }, 3000);
    } else {
        document.getElementById('confir-Ip2').textContent = userInput;
        document.getElementById('confir-Ip3').textContent = transactionId;

        document.getElementById('UIdelete-form').style.display = "none";
        document.getElementById('confIpDel-form').style.display = "block";
    }
}

function BackIp() {
    document.getElementById("confIpDel-form").style.display = "none";
    document.getElementById("UIdelete-form").style.display = "block";
}

function UserIpSubmit() {
    const userInput = document.querySelector('#userInput-type').value;
    const transactionId = document.querySelector('input[name="InpID"]').value.trim();

    const formData = {
        userInput,
        transactionId
    };
    hideMessages('confIpDel-form'); 
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/deleteUserInput', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loading').style.display = 'none';

            if (data.deleted) {
                document.getElementById('success-txt').innerText = 'Teller Input Transaction Document Is Deleted Successfully';
                document.getElementById('success-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/invite';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('unexist-txt').innerText = 'Teller Input Transaction Document Does Not Exist!!';
                showErrorAndReset('confIpDel-form', 'failure-sms-delE');
            } else {
                showErrorAndReset('confIpDel-form', 'failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('fail-txt').innerText = 'Network Or Unexpected Error Occurred While Processing Request, Please Try Again';
            showErrorAndReset('confIpDel-form', 'failure-sms');
        }
    }, 3000);
}

function CsIpConfir() {
    document.getElementById('filldelsms3').style.display = 'none';

    const csInput = document.querySelector('#csInput-type').value;
    const transactionId = document.querySelector('input[name="csID"]').value.trim();

    if (csInput === 'choose' || !transactionId) {
        document.getElementById('filldelsms3').style.display = 'block';
        setTimeout(() => {
            document.getElementById('filldelsms3').style.display = 'none';
        }, 3000);
    } else {
        document.getElementById('confir-cs2').textContent = csInput;
        document.getElementById('confir-cs3').textContent = transactionId;

        document.getElementById('csdelete-form').style.display = "none";
        document.getElementById('confCsDel-form').style.display = "block";
    }
}

function BackCs() {
    document.getElementById("confCsDel-form").style.display = "none";
    document.getElementById("csdelete-form").style.display = "block";
}

function CsIpSubmit() {
    const csInput = document.querySelector('#csInput-type').value;
    const transactionId = document.querySelector('input[name="csID"]').value.trim();

    const formData = {
        csInput,
        transactionId
    };

    hideMessages('confCsDel-form'); 
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/deleteCSInput', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loading').style.display = 'none';

            if (data.deleted) {
                document.getElementById('success-txt').innerText = 'Customer Service Personnel Transaction Document Is Deleted Successfully';
                document.getElementById('success-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/invite';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('unexist-txt').innerText = 'Customer Service Personnel Transaction Document Does Not Exist!!';
                showErrorAndReset('confCsDel-form', 'failure-sms-delE');
            } else {
                showErrorAndReset('confCsDel-form', 'failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('fail-txt').innerText = 'Network Or Unexpected Error Occurred While Processing Request, Please Try Again';
            showErrorAndReset('confCsDel-form', 'failure-sms');
        }
    }, 3000);
}

function DelDocs(formId) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formId).style.display = 'block';
}


// Function to hide all shared messages, including the unique form ID
const hideMessages = (formId) => {
    const messageIds = ['success-sms', 'failure-sms', 'failure-sms-delE',formId];
    messageIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
};

// Function to show error and reset, using the unique form ID
const showErrorAndReset = (formId,formId2) => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById(formId2).style.display = 'block';
    setTimeout(() => {
        hideMessages(formId);
        const formElement = document.getElementById(formId);
        if (formElement) {
            formElement.style.display = 'block';
        }
    }, 4000);
};

function hideForm() {

    document.getElementById('overlay').style.display = 'none';

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}