function gerarTabelaVitorias() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    fetch('http://localhost:3000/usuarioJogosVit').
        then((resp) => resp.json())
        .then(function (usu) {
            fetch('http://localhost:3000/usuarioGeral').then((resp) => resp.json())
                .then(function (data) {

                    for (var i = 0; i < usu.length; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j]['id'] == usu[i]["id_usuario"]) {
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                cell1.innerHTML = data[j]["nomep"];
                                cell2.innerHTML = usu[i]["num_vit"];
                                cell3.innerHTML = usu[i]["num_der"] + usu[i]["num_vit"];
                                row = table.insertRow(-1);
                            }
                        }
                    }
                })
        }
        )
}

function gerarTabelaDerrotas() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    fetch('http://localhost:3000/usuarioJogosDer').
        then((resp) => resp.json())
        .then(function (usu) {
            fetch('http://localhost:3000/usuarioGeral').then((resp) => resp.json())
                .then(function (data) {

                    for (var i = 0; i < usu.length; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j]['id'] == usu[i]["id_usuario"]) {
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                cell1.innerHTML = data[j]["nomep"];
                                cell2.innerHTML = usu[i]["num_der"];
                                cell3.innerHTML = usu[i]["num_der"] + usu[i]["num_vit"];
                                row = table.insertRow(-1);
                            }
                        }
                    }
                })
        }
        )
}