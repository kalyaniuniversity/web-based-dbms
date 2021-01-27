function save() {

    let name = document.getElementById('name').value;
    let account = document.getElementById('account').value;

    window.localStorage.setItem('name', name);
    window.localStorage.setItem('account', account);
}

function fetch() {
    
    let name = window.localStorage.getItem('name');
    let account = window.localStorage.getItem('account');

    document.getElementById('saved-name').innerHTML = name;
    document.getElementById('saved-account').innerHTML = account;
}

fetch();

// setTimeout(() => fetch(), 2000);