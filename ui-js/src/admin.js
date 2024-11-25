function confirRegis1() {
    const username = document.querySelector('#username').value;
    const branch = document.querySelector('#branch').value;
    const tellerType = document.querySelector('#Teller-type').value;
    const Passcode = document.querySelector('#password').value;

    if (!username || branch === "null" || tellerType === "null" || !Passcode) {
        document.getElementById('errm1').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errm1').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confirm1-username').textContent = username;
        document.querySelector('#confirm1-branch').textContent = branch;
        document.querySelector('#confirm1-teller-type').textContent = tellerType;

        document.getElementById('AddTeller').style.display = 'none';
        document.getElementById('confirmRegistration1').style.display = 'block';
    }
}

async function submit1() {
    const form = document.getElementById('UserRegisteration');
    const formData = {
        name: form.name.value,
        usertype: form.usertype.value,
        branch: form.branch.value,
        tellertype: form.tellertype.value,
        Password: form.Password.value
    };

    const hideAllMessages = () => {
        const messageIds = [
            'confirmRegistration1',
            'successful-sms',
            'failureM-sms',
            'failureU-sms',
            'failure-sms-delE',
            'successD-sms-delS',
            'failureTx-sms',
            'failure-sms'
        ];
    
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };    

    const showErrorAndReset = (errorId) => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById(errorId).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('confirmRegistration1').style.display = 'block';
        }, 5000);
    };

    hideAllMessages();
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/UserRegisteration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            document.getElementById('loader').style.display = 'none';
            
            if (data.success) {
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            } else {
                switch (data.error) {
                    case 1:
                        showErrorAndReset('failureM-sms');
                        break;
                    case 2:
                        showErrorAndReset('failureTx-sms');
                        break;
                    case 3:
                        showErrorAndReset('failure-sms');
                        break;
                    default:
                        showErrorAndReset('failure-sms');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset('failure-sms');
        }
    }, 4000);
}

function Back1() {
    document.getElementById('confirmRegistration1').style.display = 'none';
    document.getElementById('AddTeller').style.display = 'block';
}

document.getElementById("user-type2").addEventListener("change", function() {
    const userType = this.value;
    const branchSelect = document.getElementById("Userbranch");

    branchSelect.innerHTML = `
        <option value="null" disabled selected hidden>Select An Option</option>
        <option value="No-branch">None</option>
        <option value="Aiyinase">Aiyinase</option>
        <option value="Prestea">Prestea</option>
        <option value="Bogoso">Bogoso</option>
    `;

    if (userType === "Costumer Service") {
        Array.from(branchSelect.options).forEach(option => {
            if (option.value === "No-branch") {
                option.style.display = "none";
            }
        });
    } else {
        branchSelect.innerHTML = `
            <option value="No-branch" selected>None</option>
        `;
    }
});

function confirRegis2() {
    const username = document.querySelector('#AddUser input[name="name"]').value;
    const password = document.querySelector('#AddUser input[name="Password"]').value;
    const userType = document.getElementById("user-type2").value;
    const branch = document.getElementById("Userbranch").value;
    const errorMessage = document.getElementById("errm2");

    if (username.trim() === "" || password.trim() === "" || userType === "null" || branch === "null") {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    } else {
        errorMessage.style.display = 'none';

        document.getElementById('confirm2-username').textContent = username;
        document.getElementById('confirm2-userty').textContent = userType;
        document.getElementById('confirm2-brnchty').textContent = branch;

        document.getElementById('AddUser').style.display = 'none';
        document.getElementById('confirmRegistration2').style.display = 'block';
    }
}

async function submit2() {
    const form = document.getElementById('UserRegisteration2');
    const formData = {
        name: form.name.value,
        usertype: form.usertype.value,
        branch: form.branch.value,
        tellertype: form.tellertype.value,
        Password: form.Password.value
    };

    const hideAllMessages = () => {
        const messageIds = [
            'confirmRegistration2',
            'successful-sms',
            'failureM-sms',
            'failureU-sms',
            'failure-sms-delE',
            'successD-sms-delS',
            'failureTx-sms',
            'failure-sms',
            'failureCS-sms' 
        ];

        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };    

    const showErrorAndReset = (errorId) => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById(errorId).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('confirmRegistration2').style.display = 'block';
        }, 5000);
    };

    hideAllMessages();
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/UserRegisteration2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            document.getElementById('loader').style.display = 'none';
            
            if (data.success) {
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            } else {
                switch (data.error) {
                    case 1:
                        showErrorAndReset('failureM-sms');
                        break;
                    case 2:
                        showErrorAndReset('failureU-sms');
                        break;
                    case 3:
                        showErrorAndReset('failure-sms');
                        break;
                    case 4:
                        showErrorAndReset('failureCS-sms'); 
                        break;
                    default:
                        showErrorAndReset('failure-sms');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset('failure-sms');
        }
    }, 4000);
}

function Back2() {
    document.getElementById('confirmRegistration2').style.display = 'none';
    document.getElementById('AddUser').style.display = 'block';
}

function confirDel() {
    const username = document.querySelector('#UserDeletion input[name="Username"]').value;

    if (!username) {
        document.getElementById('errm3').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errm3').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confirm3-username').textContent = username;

        document.getElementById('UserDeletion').style.display = 'none';
        document.getElementById('confirmDelt').style.display = 'block';
    }
}

async function submit3() {
    const form = document.getElementById('UserDelete');
    const formData = {
        Username: form.Username.value,
    };

    const hideAllMessages = () => {
        const messageIds = [
            'confirmDelt',
            'failure-sms-delE',
            'successD-sms-delS',
            'failure-sms'
        ];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };    

    const showErrorAndReset = (errorId) => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById(errorId).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('confirmDelt').style.display = 'block';
        }, 5000);
    };

    hideAllMessages();
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/DeleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            document.getElementById('loader').style.display = 'none';
            
            if (data.success) {
                document.getElementById('successD-sms-delS').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            } else {
                switch (data.error) {
                    case 1:
                        showErrorAndReset('failure-sms-delE');
                        break;
                    case 2:
                        showErrorAndReset('failure-sms');
                        break;
                    default:
                        showErrorAndReset('failure-sms');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset('failure-sms');
        }
    }, 4000);
}

function Back3() {
    document.getElementById('confirmDelt').style.display = 'none';
    document.getElementById('UserDeletion').style.display = 'block';
}

function confirResetPsd() {
    const PRusername = document.querySelector('#PasscodeRst input[name="Username"]').value.trim();
    const PRpassword = document.querySelector('#PasscodeRst input[name="Password"]').value.trim();
    const PRconfirmPassword = document.querySelector('#PasscodeRst input[name="confirPassword"]').value.trim();
    const PRerrorMsg = document.getElementById('errm4');

    if (!PRusername || !PRpassword || !PRconfirmPassword) {
        PRerrorMsg.innerText = 'Please all fields are required!!';
        PRerrorMsg.style.display = 'block';
        setTimeout(() => {
            PRerrorMsg.style.display = 'none';
        }, 1500);
    } else if (PRpassword !== PRconfirmPassword) {
        PRerrorMsg.innerText = 'Passwords do not match!';
        PRerrorMsg.style.display = 'block';
        setTimeout(() => {
            PRerrorMsg.style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confirps-username').textContent = PRusername;

        document.getElementById('PasscodeRst').style.display = 'none';
        document.getElementById('confirUserPsdRst').style.display = 'block';
    }
}

async function submit4() {
    const form = document.getElementById('UPsdRst');
    const formData = {
        Username: form.Username.value.trim(),
        Password: form.Password.value.trim(),
    };

    const hideAllMessages = () => {
        const messageIds = [
            'confirUserPsdRst',
            'failure-sms-delE',
            'successful-smsPR',
            'failure-sms'
        ];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };

    const showErrorAndReset = (errorId) => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById(errorId).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('confirUserPsdRst').style.display = 'block';
        }, 5000);
    };

    hideAllMessages();
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/userPsdReset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            document.getElementById('loader').style.display = 'none';

            if (data.success) {
                document.getElementById('successful-smsPR').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            } else {
                switch (data.error) {
                    case 1:
                        showErrorAndReset('failure-sms-delE');
                        break;
                    case 2:
                        showErrorAndReset('failure-sms');
                        break;
                    default:
                        showErrorAndReset('failure-sms');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset('failure-sms');
        }
    }, 4000);
}

function Back4() {
    document.getElementById('PasscodeRst').style.display = 'block';
    document.getElementById('confirUserPsdRst').style.display = 'none';
}

// Toggle submenu visibility
function toggleMenu(menuId) {
    const submenu = document.getElementById(menuId);
    if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = '0';
    } else {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
        submenu.style.opacity = '1';
    }
}


// Toggle content and inner resizing
const hamburger = document.querySelector('.hamburger');
const inner = document.querySelector('.inner');
const content = document.querySelector('.content');

hamburger.addEventListener('click', () => {
    inner.classList.toggle('shrunk');
    content.classList.toggle('active');
});


function openPopUp(action) {
    alert('Open ' + action + ' pop-up!');
}

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

    hideMessagesX('Delete-form1'); 
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/DeleteDoc1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loader').style.display = 'none';

            if (data.deleted) {
                document.getElementById('success-txt').innerText = 'Teller Deposit Transaction Document Is Deleted Successfully';
                document.getElementById('successD-sms-delS').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('unexist-txt').innerText = 'Teller Deposit Transaction Document Does Not Exist!!';
                showErrorAndResetX('Delete-form1', 'failure-sms-delE');
            } else {
                showErrorAndResetX('Delete-form1', 'failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('fail-txt').innerText = 'Network Or Unexpected Error Occurred While Processing Request, Please Try Again';
            showErrorAndResetX('Delete-form1', 'failure-sms');
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
    hideMessagesX('confirDel-form'); 
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/deleteOtherWithdrawal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loader').style.display = 'none';

            if (data.deleted) {
                document.getElementById('success-txt').innerText = 'Teller Withdrawal Transaction Document Is Deleted Successfully';
                document.getElementById('successD-sms-delS').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('unexist-txt').innerText = 'Teller Withdrawal Transaction Document Does Not Exist!!';
                showErrorAndResetX('confirDel-form', 'failure-sms-delE');
            } else {
                showErrorAndResetX('confirDel-form', 'failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('fail-txt').innerText = 'Network Or Unexpected Error Occurred While Processing Request, Please Try Again';
            showErrorAndResetX('confirDel-form', 'failure-sms');
        }
    }, 3000);
    
}

function DeleteUserInput() {
    document.getElementById("deleteDocs-form").style.display = "none";
    document.getElementById("UIdelete-form").style.display = "block";
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
    hideMessagesX('confIpDel-form'); 
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/deleteUserInput', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loader').style.display = 'none';

            if (data.deleted) {
                document.getElementById('success-txt').innerText = 'Teller Input Transaction Document Is Deleted Successfully';
                document.getElementById('successD-sms-delS').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('unexist-txt').innerText = 'Teller Input Transaction Document Does Not Exist!!';
                showErrorAndResetX('confIpDel-form', 'failure-sms-delE');
            } else {
                showErrorAndResetX('confIpDel-form', 'failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('fail-txt').innerText = 'Network Or Unexpected Error Occurred While Processing Request, Please Try Again';
            showErrorAndReseXt('confIpDel-form', 'failure-sms');
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

    hideMessagesX('confCsDel-form'); 
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/deleteCSInput', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            document.getElementById('loader').style.display = 'none';

            if (data.deleted) {
                document.getElementById('success-txt').innerText = 'Customer Service Personnel Transaction Document Is Deleted Successfully';
                document.getElementById('successD-sms-delS').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 4000);
            } else if (data.notFound) {
                document.getElementById('unexist-txt').innerText = 'Customer Service Personnel Transaction Document Does Not Exist!!';
                showErrorAndResetX('confCsDel-form', 'failure-sms-delE');
            } else {
                showErrorAndResetX('confCsDel-form', 'failure-sms');
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('fail-txt').innerText = 'Network Or Unexpected Error Occurred While Processing Request, Please Try Again';
            showErrorAndResetX('confCsDel-form', 'failure-sms');
        }
    }, 3000);
}


document.getElementById("Receiver").addEventListener("change", function() {
    const receiver = this.value;
    const tsac = document.getElementById("tsac");
    const interBanksOption = tsac.querySelector('option[value="InterBanks"]');

    Array.from(tsac.options).forEach(option => {
        option.style.display = "block";
    });

    if (receiver === "Superuser") {
        interBanksOption.style.display = "none";
        tsac.value = "null";  
    } else if (receiver === "Operational") {
        Array.from(tsac.options).forEach(option => {
            if (option.value !== "InterBanks" && option.value !== "null") {
                option.style.display = "none";
            }
        });
        tsac.value = "InterBanks";
    } else {
        tsac.value = "null";  
    }
});

function confAdmints() {
    const receiver = document.getElementById("Receiver").value;
    const tsac = document.getElementById("tsac").value;
    const amount = document.getElementById("tsacamount").value;
    const errorMessage = document.getElementById("errmAdtrans");

    if (receiver === "null" || tsac === "null" || amount.trim() === "") {
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000);
    } else {
        errorMessage.style.display = "none";

        document.getElementById('confir-ecashR').textContent = receiver;
        document.getElementById('confir-ecashTT').textContent = tsac;
        document.getElementById('confir-ecashA').textContent = amount;

        document.getElementById('AdminTrans').style.display = "none";
        document.getElementById('confAdEcash-form').style.display = "block";
    }
}

function BackEc() {
    document.getElementById('confAdEcash-form').style.display = "none";
    document.getElementById('AdminTrans').style.display = "block";
}


// Function to view the number of users
function viewUsers() {
    fetch('/users/count')
        .then(response => response.text())
        .then(data => alert(`Number of users: ${data}`))
        .catch(error => console.error('Error:', error));
}

function UserMgt(formId) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formId).style.display = 'block';
}

function innerForms(formId) {
    document.getElementById('Tdlop').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
}

function delBtn(formId) {
    document.getElementById('deleteDocs-form').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
}

// Function to hide all shared messages, including the unique form ID
const hideMessagesX = (formId) => {
    const messageIds = ['successD-sms-delS', 'failure-sms', 'failure-sms-delE',formId];
    messageIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
};

// Function to show error and reset, using the unique form ID
const showErrorAndResetX = (formId,formId2) => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById(formId2).style.display = 'block';
    setTimeout(() => {
        hideMessagesX(formId);
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





  