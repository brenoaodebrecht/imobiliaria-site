create database imobiliaria_essenza;

use imobiliaria_essenza;

create table serviços(
	id int primary key auto_increment,
    nome_serviço varchar(50),
    preço decimal(10,2)
);

create table clientes(
	id int primary key auto_increment, 
    nome varchar(50), 
    endereço int, 
    cpf int, 
    data_nascimento date, 
    cartão int,
    id_serviço int,
    FOREIGN KEY (id_serviço) REFERENCES serviços(id)
);

create table imoveis(
	id int primary key auto_increment, 
	endereço int, 
    preço decimal(10,2),
    id_cliente int,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

select * from clientes;
select * from imoveis;
select * from serviços;