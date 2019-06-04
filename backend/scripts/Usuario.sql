-----------------Criar Tabela Usuario-------
CREATE TABLE tb_usuario
(
  id_usuario serial NOT NULL,
  nome character varying(60),
  email character varying(60),
  senha character varying(32) NOT NULL,
  CONSTRAINT pk_tb_usuario PRIMARY KEY (id_usuario),
  CONSTRAINT tb_usuario_email_key UNIQUE (email),
  CONSTRAINT tb_usuario_nome_key UNIQUE (nome)
)
----------------------Funçoes---------------------
----1- Criar conta---

CREATE OR REPLACE FUNCTION fn_criar(nome1 character varying, email1 character varying, senha1 character varying)
  RETURNS integer AS
$BODY$
    
    DECLARE vId INTEGER;

    begin 

	if((select count(*)
		from tb_usuario
		where nome = nome1 or email=email1) = 1) then
		return -1;
	end if;
	
        insert into tb_usuario(nome,email, senha)
        values(nome1,email1, senha1)

        RETURNING id_usuario INTO vId;
        RETURN vId;
    end;
$BODY$
  LANGUAGE plpgsql
------------------2- fazer Login---------------------------------------

CREATE OR REPLACE FUNCTION fn_login(IN email1 character varying, IN senha1 character varying)
  RETURNS TABLE(id integer, nome_usuario character varying, email_usuario character varying) AS
$BODY$
begin

    RETURN QUERY
        select 
            id_usuario AS "id",
            nome AS "nome_usuario",
            email AS "email_usuario"
        from tb_usuario
        where email = email1
	and senha = senha1;

end;
$BODY$
  LANGUAGE plpgsql

----------------------3- selecionar usuario a partir do 'id'---------------------------------
CREATE OR REPLACE FUNCTION fn_seleciona(IN id integer)
  RETURNS TABLE(pnome character varying, pid integer) AS
$BODY$
 declare
	pnome varchar;
	
 begin
	return query select nome, id_usuario
	from tb_usuario
	where id_usuario = id;

	
end;
$BODY$
  LANGUAGE plpgsql

---------------------4- listar todos jogadores por nome e id----------------------------------------------
CREATE OR REPLACE FUNCTION fn_listarjogador()
  RETURNS TABLE(id integer, nomep character varying) AS
$BODY$
begin

    RETURN QUERY
        select 
            id_usuario as "id_Usuario",
            nome as "NomeP"
        from tb_usuario;
end;
$BODY$
  LANGUAGE plpgsql