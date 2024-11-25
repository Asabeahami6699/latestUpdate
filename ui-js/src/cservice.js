
function csbtn1(formId) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formId).style.display = 'block';
}

function csdownload(formId) {
    document.getElementById('choose').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
}

function DBack(formId) {
    document.getElementById('choose').style.display = 'block';
    document.getElementById(formId).style.display = 'none';
}

function confirCS1() {
    document.getElementById('errm1').style.display = 'none';

    const name = document.querySelector('input[name="csname"]').value;
    const amount = document.querySelector('input[name="csamount"]').value;

    if (!name || !amount) {
        document.getElementById('errm1').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errm1').style.display = 'none';
        }, 2000);
    } else {
        document.querySelector('#confir-name1').textContent = name;
        document.querySelector('#confir-amount1').textContent = amount;

        document.getElementById('csForm1').style.display = "none";
        document.getElementById('csConf-form1').style.display = "block";
    }
}

async function csSubmit() {
    const form = document.getElementById('csEWForm1');
    const formData = {
        csname: form.csname.value,
        csamount: form.csamount.value
    };

    const hideAllMessages = () => {
        const messageIds = ['successful-sms','csConf-form1', 'failure-sms'];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };

    const showErrorAndReset = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('csConf-form1').style.display = 'block';
        }, 4000);
    };

    hideAllMessages();
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/csEcobankWithdls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            document.getElementById('loading').style.display = 'none';
            if (data.success) {
                document.getElementById('success-txt').innerText = 'Ecobank Withdrawal Transaction Document Is Saved Successfully';
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/cservice';
                }, 3000);
            } else {
                showErrorAndReset();
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset();
        }
    }, 2000);
}

function csBK1() {
    document.getElementById('csForm1').style.display = 'block';
    document.getElementById('csConf-form1').style.display = 'none';
}

function confirCS2() {
    document.getElementById('errm2').style.display = 'none';

    const customerName = document.querySelector('input[name="csname1"]').value;
    const customerContact = document.querySelector('input[name="contact1"]').value;
    const accountNumber = document.querySelector('input[name="account1"]').value;
    const email = document.querySelector('input[name="email1"]').value;
    const initialDeposit = document.querySelector('input[name="csamount1"]').value;

    if (!customerName || !customerContact || !accountNumber || !email || !initialDeposit) {
        document.getElementById('errm2').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errm2').style.display = 'none';
        }, 2000);
    } else {
        document.getElementById('confir-Cname2').textContent = customerName;
        document.getElementById('confir-Ccont2').textContent = customerContact;
        document.getElementById('confir-Anumb').textContent = accountNumber;
        document.getElementById('confir-Email').textContent = email;
        document.getElementById('confir-amount2').textContent = initialDeposit;

        document.getElementById('csForm2').style.display = 'none';
        document.getElementById('csConf-form2').style.display = 'block';
    }
}

async function csSubmit2() {
    const form = document.getElementById('csEACForm1');
    const formData = {
        csname1: form.csname1.value,
        contact1: form.contact1.value,
        account1: form.account1.value,
        email1: form.email1.value,
        csamount1: form.csamount1.value
    };

    const hideAllMessages = () => {
        const messageIds = ['successful-sms','csConf-form2', 'failure-sms'];
        messageIds.forEach(id => document.getElementById(id).style.display = 'none');
    };

    const showErrorAndReset = () => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('csConf-form2').style.display = 'block';
        }, 4000);
    };

    hideAllMessages();
    document.getElementById('loading').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/csExpressCreation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            document.getElementById('loading').style.display = 'none';
            if (data.success) {
                document.getElementById('success-txt').innerText = 'Express Accounts Created Document Is Saved Successfully';
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/cservice';
                }, 3000);
            } else {
                showErrorAndReset();
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset();
        }
    }, 2000);
}


function csBK2() {
    document.getElementById('csForm2').style.display = 'block';
    document.getElementById('csConf-form2').style.display = 'none';
}

function openPopup(popupId) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById(popupId).style.display = 'none';
}


function hideForm() {

    document.getElementById('overlay').style.display = 'none';

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}