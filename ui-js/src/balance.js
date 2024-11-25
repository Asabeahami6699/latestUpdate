
function AT1DP(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('AT1-form').style.display = 'block';
}

function AT2DP(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('AT2-form').style.display = 'block';
}

function BT1DP(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('BT1-form').style.display = 'block';
}

function BT2DP(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('BT2-form').style.display = 'block';
}

function PT1DP(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('PT1-form').style.display = 'block';
}

function PT2DP(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('PT2-form').style.display = 'block';
}
function ATTDPT(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('ATTD-form').style.display = 'block';
}



function hideForm() {

    document.getElementById('overlay').style.display = 'none';

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}