const pg = require('../helpers/postgres');
const RankModel = require('../model/rankModel');
var usuario;
var usuario1;


module.exports = {
    login,
    cadastrarUsuario,
    usuarioInicial,
    usuarioInicial2,
    usuarioJogosDer,
    usuarioJogosVit,
    usuarioListaGeral,
    player1,
    player2,
    atualizaRank,
    atualizaRank2
}

function login(req, res) {
    pg.execute('fn_login($1, $2)',
        [req.body.email, req.body.senha],
        function (err, data) {
            if (err) {
                return res.status(500).json(err);
            }

            if (!data[0]) {
                return res.status(404).json({ message: 'Usuario não encontrado' });
            }
            res.status(200).json(data[0]);
            if (!usuario) {
                console.log('usuario1')
                return usuario = data[0].id;

            } else if(!usuario1) {
                console.log('usuario2')
                return usuario1 = data[0].id;
            }else{
                return console.log('irmao ja tem dois cadastrado')
            }
        });
}

function cadastrarUsuario(req, res) {
    pg.execute('fn_criar($1, $2, $3)',
        [req.body.nome, req.body.email, req.body.senha],
        function (err, data) {
            if (err) {
                return res.status(500).json(err);
            }
            else if (data[0].fn_criar == -1) {
                return res.status(409).json({ message: 'Usuario já cadastrado' });
            }

            usu = new RankModel({ id_usuario: data[0].fn_criar }).save(function (err) {
                res.status(200).json(data[0].fn_criar);
            });
        });
}


function usuarioInicial(req, res) {
    pg.execute('fn_seleciona($1)', [usuario], function (err, data) {
        if (err) {
            return console.log('falta o player 2');
        }
        res.status(200).json({
            usuario: data[0] ? data[0].pnome : null,
            usuarioid: data[0] ? data[0].pid : null
        });
    });
}
function usuarioInicial2(req, res) {
    pg.execute('fn_seleciona($1)', [usuario1], function (err, data) {
        if (err) {
            return console.log('falta o player 1');
        }
        res.status(200).json({
            usuario1: data[0] ? data[0].pnome : null,
            usuario1id: data[0] ? data[0].pid : null
        });
    });
}

function player1(req, res) {
    RankModel.find({ id_usuario: usuario }, { num_vit: 1, num_der: 1, id_usuario: 1, _id: 0 }, function (err, usu) {
        if(err){
           return console.log('calma brother')
        }
        res.json(Object.values(usu))
    });
}
function player2(req, res) {
    RankModel.find({ id_usuario: usuario1 }, { num_vit: 1, num_der: 1, id_usuario: 1, _id: 0 }, function (err, usu) {
        if(err){
            return console.log('calma brother')
        }
        res.json(Object.values(usu))
    });
}

function usuarioJogosVit(req, res) {
    RankModel.find({}, { num_vit: 1, num_der: 1, id_usuario: 1, _id: 0 }, function (err, usu) {
        res.json(Object.values(usu))
    }).sort({ num_vit: -1 });
}

function usuarioJogosDer(req, res) {
    RankModel.find({}, { num_vit: 1, num_der: 1, id_usuario: 1, _id: 0 }, function (err, usu) {
        res.json(Object.values(usu))
    }).sort({ num_der: -1 });
}

function usuarioListaGeral(req, res) {
    pg.execute('fn_listarJogador()', [], function (err, data) {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(data);

    });
}

function atualizaRank(req, res) {
    RankModel.updateOne({id_usuario: usuario },{$set:{ num_vit: req.body.p1, num_der: req.body.p2  }}, {upsert: false}, function (err, usu) {
        res.send({ error: err, affected: usu })
    })
}

function atualizaRank2(req, res) {
    RankModel.updateOne({ id_usuario: usuario1 },{$set:{ num_vit: req.body.p3, num_der: req.body.p4 }}, {upsert: false}, function (err, usu1) {
      res.send({ error: err, affected: usu1 })
    })
}