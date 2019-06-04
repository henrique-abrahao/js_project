
function verifica() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    var myHeaders = new Headers({
        "Content-Type": "application/json",
    });

    var body = {
        email: email,
        senha: senha
    }

    var myInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    var myRequest = new Request('http://localhost:3000/login', myInit);

    fetch(myRequest)
        .then(function (response) {
            console.log(response);
            if (response.status == 404) {
                alert('Usuario Não encontrado')
                return console.log('Não encontrado');
            }

            response.json().then(function (result) {
                console.log(result);
                window.location.href = './smn/index.html';
            })
                .catch(function (err) {
                    console.log('nao foi possivel converter o json', err);
                })
        })
        .catch(function (err) {
            err.json().then(function (result) {
                console.log(result);
            })
                .catch(function (err) {
                    console.log('nao foi possivel converter o json', err);
                })
        });
}

function cadastro() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    var myHeaders = new Headers({
        "Content-Type": "application/json",
    });

    var body = {
        nome: nome,
        email: email,
        senha: senha,
    }

    var myInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    var myRequest = new Request('http://localhost:3000/usuario', myInit);

    fetch(myRequest)
        .then(function (response) {
            response.json().then(function (result) {
                console.log(result);
                if (result == -1) {
                    return alert('Usuario ja existe')
                }
                return window.location.href = './index.html';
            })
                .catch(function (err) {
                    console.log('nao foi possivel converter o json', err);
                })
        })
        .catch(function (err) {
            console.log(err);
        });
}
