document.getElementById('description-type-momo').addEventListener('change', handleDescriptionChange);
document.getElementById('comm-description-momo').addEventListener('change', handleCommissionChange);

function handleDescriptionChange() {
    const descriptionType = this.value;
    const commDescription = document.getElementById('comm-description-momo');
    const commissionInput = document.getElementById('comm-momo');
    const commissionLabel = document.getElementById('cml1');
    const reasonLabel = document.getElementById('lr1');
    const reasonInput = document.getElementById('r1');
    const CL1 = document.getElementById('cd1');

    if (descriptionType === 'Withdrawal') {
        toggleElements([CL1, commDescription, commissionInput, commissionLabel, reasonLabel, reasonInput], 'none');
        commDescription.value = "Null"; 
        commissionInput.value = "0";
        reasonInput.value = "Null";
    } else if (descriptionType === 'Deposit') {
        toggleElements([CL1, commDescription], 'block');
        handleCommissionChange();
    }
}

function handleCommissionChange() {
    const commDescription = document.getElementById('comm-description-momo').value;
    const commissionInput = document.getElementById('comm-momo');
    const commissionLabel = document.getElementById('cml1');
    const reasonLabel = document.getElementById('lr1');
    const reasonInput = document.getElementById('r1');

    if (commDescription === 'Yes') {
        toggleElements([commissionInput, commissionLabel], 'block');
        toggleElements([reasonLabel, reasonInput], 'none');
        commissionInput.value = "";
        reasonInput.value = "Null";
    } else if (commDescription === 'No') {
        toggleElements([commissionInput, commissionLabel], 'none');
        toggleElements([reasonLabel, reasonInput], 'block');
        commissionInput.value = "0";
        reasonInput.value = ""; 
    }
}

function toggleElements(elements, displayStyle) {
    elements.forEach(element => {
        element.style.display = displayStyle;
    });
}


document.getElementById('bank-type').addEventListener('change', function () {
    const bankType = this.value;
    const descriptionType = document.getElementById('description-type');
    const commissionInput = document.querySelector('input[name="Commission"]');
    const commissionLabel = commissionInput.previousElementSibling;

    switch (bankType) {
        case 'ecobank':
            commissionLabel.style.display = 'none';
            commissionInput.style.display = 'none';
            commissionInput.value = '0';
            
            descriptionType.style.display = 'block';
            descriptionType.previousElementSibling.style.display = 'block';
            break;

        case 'fidelity':
        case 'Calbank':
            commissionLabel.style.display = 'none';
            commissionInput.style.display = 'none';
            commissionInput.value = '0';

            descriptionType.style.display = 'none';
            descriptionType.previousElementSibling.style.display = 'none';
            descriptionType.value = 'Deposit';
            break;

        case 'Other Banks':
            commissionLabel.style.display = 'block';
            commissionInput.style.display = 'block';
            commissionInput.value = '';

            descriptionType.style.display = 'none';
            descriptionType.previousElementSibling.style.display = 'none';
            descriptionType.value = 'Deposit';
            break;

        default:
            commissionLabel.style.display = 'block';
            commissionInput.style.display = 'block';
            commissionInput.value = '';
            
            descriptionType.style.display = 'block';
            descriptionType.previousElementSibling.style.display = 'block';
            descriptionType.value = '';
            break;
    }
});



// function for user calculator
function calculateTotal() {
    const note200 = document.getElementById('note200').value * 200;
    const note100 = document.getElementById('note100').value * 100;
    const note50 = document.getElementById('note50').value * 50;
    const note20 = document.getElementById('note20').value * 20;
    const note10 = document.getElementById('note10').value * 10;
    const note5 = document.getElementById('note5').value * 5;
    const note2 = document.getElementById('note2').value * 2;
    const note1 = document.getElementById('note1').value * 1;
    const coin50 = document.getElementById('coin50').value * 0.50;
    const coin20 = document.getElementById('coin20').value * 0.20;
    const coin10 = document.getElementById('coin10').value * 0.10;

    document.getElementById('total200').innerText =  + note200.toFixed(2);
    document.getElementById('total100').innerText =  + note100.toFixed(2);
    document.getElementById('total50').innerText =  + note50.toFixed(2);
    document.getElementById('total20').innerText =  + note20.toFixed(2);
    document.getElementById('total10').innerText =   + note10.toFixed(2);
    document.getElementById('total5').innerText =   + note5.toFixed(2);
    document.getElementById('total2').innerText =   + note2.toFixed(2);
    document.getElementById('total1').innerText =   + note1.toFixed(2);
    document.getElementById('totalCoin50').innerText =   + coin50.toFixed(2);
    document.getElementById('totalCoin20').innerText =   + coin20.toFixed(2);
    document.getElementById('totalCoin10').innerText =   + coin10.toFixed(2);

    const grandTotal = note200 + note100 + note50 + note20 + note10 + note5 + note2 + note1 + coin50 + coin20 + coin10;
    document.getElementById('grandTotal').innerText = 'GHS ' + grandTotal.toFixed(2);
}

function clearInputs() {
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
    document.querySelectorAll('td[id^="total"]').forEach(td => td.innerText = ' 0.00');
    document.getElementById('grandTotal').innerText = 'GHS 0.00';
}

function copyGrandTotal() {
    const grandTotalElement = document.getElementById('grandTotal');
    const grandTotalText = grandTotalElement.innerText;

    // Extract numerical part (assuming it always starts after 'GHS ')
    const numericValue = grandTotalText.replace('GHS ', '');

    // Use Clipboard API to copy the text
    navigator.clipboard.writeText(numericValue)
        .then(() => {
            grandTotalElement.innerText = "Copied!";

            setTimeout(() => {
                grandTotalElement.innerText = grandTotalText;
            }, 2000);
        })
        .catch(err => {
            alert("Failed to copy text");
            console.error("Failed to copy text: ", err);
        });
}
