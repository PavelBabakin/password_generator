document.addEventListener('DOMContentLoaded', function(){
    formSubmit();
    addPasswordPart();
    removePasswordPart();
    checkInputMaxValueLength();
});


function formSubmit() {
    document.querySelector('form').addEventListener('submit', function(e){
        e.preventDefault();

        let p_str = '';
        let input_flag = true;

        this.querySelectorAll('input').forEach(input => {
            p_str += input.value;
            if(input.value === '') {
                input_flag = false;
            }
        })

        if(input_flag) {
            async function postData(url, data) {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(data)
                });

                return await response.json();
            }
            
            if(p_str.length) {
                postData('http://localhost:3000', {p: p_str})
                    .then((data) => {
                        copyToClipboard(data);
                    });
            }
        } else {
            setH1Title('Fill in all the blank fields or delete it');
            setBtnText('Temporarily blocked');
            setBtnDisabledAttr();
            resetTitleAndSubmitBtn();
        }
    });
}

function copyToClipboard(hash) {
    const form = document.querySelector('form');
    const el = document.querySelector('input[type=hidden]');
    el.value = hash;
    el.select();
    
    if (!navigator.clipboard){
        document.execCommand('copy');
    } else{
        navigator.clipboard.writeText(el.value)
            .then(function(){
                setH1Title('Copied to your clipboard');
            })
            .catch(function() {
                setH1Title('Something go wrong...');
            });
            el.value = '';
            form.reset();
            setBtnText('Temporarily blocked');
            setBtnDisabledAttr();
            resetTitleAndSubmitBtn();
    }
}

function addPasswordPart() {
    document.querySelector('.plus').addEventListener('click', function(e) {
        e.preventDefault();

        const parent_node = document.querySelector('.right-side');
        const button = document.querySelector('button[type=submit]');

        const label_holder = document.createElement('div');
        label_holder.className = 'label-holder';
        
        const label_el = document.createElement('label');
        
        const input_el = document.createElement('input');
        input_el.type = 'password';
        input_el.placeholder = 'Enter password part';

        const btn_minus = document.createElement('div');
        btn_minus.className = 'minus';

        const icon = document.createElement('i');
        icon.className = 'fas fa-minus';

        label_holder.appendChild(label_el);
        label_el.appendChild(input_el);
        label_holder.appendChild(btn_minus);
        btn_minus.appendChild(icon);

        parent_node.insertBefore(label_holder, button);

        countInputs();
    });
}

function removePasswordPart() {
    const wrapper = document.querySelector('.right-side');


    wrapper.addEventListener('click', function(e) {
        if (!e.target.className === 'minus' && !e.target.nodeName === 'I') {
            return;
        }

        if(e.target.className === 'minus') {
            e.target.parentNode.remove();
        }

        if(e.target.nodeName === 'I') {
            e.target.parentNode.parentNode.remove();
        }

        countInputs();
    });
}

function countInputs() {
    const btn = document.querySelector('.plus');
    const icon = btn.querySelector('i');
    const inputs = document.querySelectorAll('input[type=password]');

    if(inputs.length === 3) {
        btn.classList.add('disabled');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-times');
    } else {
        if(btn.classList.contains('disabled')) {
            btn.classList.remove('disabled');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-plus');
        }
    } 
}

function setH1Title(h1_title='Get your password') {
    const h1 = document.querySelector('h1');

    h1.innerText = h1_title;
}

function setBtnText(btn_title='Get Password') {
    const button = document.querySelector('button[type=submit]');

    button.innerText = btn_title;
}

function setBtnDisabledAttr() {
    const button = document.querySelector('button[type=submit]');

    button.setAttribute("disabled", true);
}

function resetTitleAndSubmitBtn() {
    const h1 = document.querySelector('h1');
    const button = document.querySelector('button[type=submit]');

    setTimeout(function() {
        h1.innerText = 'Get your password';
        button.innerText = 'Get password';
        if(button.hasAttribute('disabled')) {
            button.removeAttribute("disabled");
        }
    }, 3000);
}

function resetTitleAndSubmitBtn() {
    const h1 = document.querySelector('h1');
    const button = document.querySelector('button[type=submit]');

    setTimeout(function() {
        h1.innerText = 'Get your password';
        button.innerText = 'Get password';
        if(button.hasAttribute('disabled')) {
            button.removeAttribute("disabled");
        }
    }, 3000);
}

function setAndResetInputDisable(target) {
    target.setAttribute("disabled", true);

    setTimeout(function() {
        if(target.hasAttribute('disabled')) {
            target.removeAttribute("disabled");
        }
    }, 3000);
}

function checkInputMaxValueLength() {
    document.querySelector('form').addEventListener('keyup', function(e) {
        if(e.target.nodeName === 'INPUT') {
            if(e.target.value.length >= 21) {
                setAndResetInputDisable(e.target);
                setH1Title('Max input value length is 20 characters');
                setBtnText('Temporarily blocked');
                e.target.value = e.target.value.slice(0, -1);
                resetTitleAndSubmitBtn();
            }
        }
    });
}