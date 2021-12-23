document.addEventListener('DOMContentLoaded', function(){
    formSubmit();
    addPasswordPart();
});


function formSubmit() {
    document.querySelector('form').addEventListener('submit', function(e){
        e.preventDefault();

        let p_str = '';

        this.querySelectorAll('input').forEach(input => {
            p_str += input.value;
        })

        async function postData(url, data) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });

            return await response.json();
        }
        
        postData('http://localhost:3000', {p: p_str})
            .then((data) => {
                copyToClipboard(data);
            });
    });
}

function copyToClipboard(hash) {
    const form = document.querySelector('form');
    const button = document.querySelector('button[type=submit]');
    const el = document.querySelector('input[type=hidden]');
    el.value = hash;
    el.select();
    
    if (!navigator.clipboard){
        document.execCommand('copy');
    } else{
        navigator.clipboard.writeText(el.value)
            .then(function(){
                button.innerText = 'Copied to your clipboard';
            })
            .catch(function() {
                button.innerText = 'Something go wrong...';
            });
            el.value = '';
            form.reset();
    }
}

function addPasswordPart() {
    document.querySelector('.plus').addEventListener('click', function(e) {
        e.preventDefault();

        const parent_node = document.querySelector('.right-side');
        const button = document.querySelector('button[type=submit]');
        const label_el = document.createElement('label');
        const input_el = document.createElement('input');
        input_el.type = 'password';
        input_el.placeholder = 'Enter password part';
        label_el.appendChild(input_el);

        parent_node.insertBefore(label_el, button);
    });
}