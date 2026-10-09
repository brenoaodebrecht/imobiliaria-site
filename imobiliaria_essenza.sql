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
    email varchar(60),
    FOREIGN KEY (id_serviço) REFERENCES serviços(id)
);

create table imoveis(
	id int primary key auto_increment, 
	endereço int, 
    preço decimal(10,2),
    id_cliente int,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

create table funcionarios(
	id int primary key auto_increment, 
    nome varchar(50), 
    cpf int, 
    data_nascimento date, 
    cartão int,
    id_serviço int,
    FOREIGN KEY (id_serviço) REFERENCES serviços(id)
);

INSERT INTO serviços (nome_serviço, preço) VALUES
('Venda de Imóveis', 5000.00),
('Aluguel de Imóveis', 1500.00),
('Avaliação de Imóveis', 800.00),
('Administração de Imóveis', 600.00),
('Consultoria Imobiliária', 1200.00);

INSERT INTO clientes
(nome, endereço, cpf, data_nascimento, cartão, id_serviço, email)
VALUES
('Ana Silva', 100, 100000001, '1990-03-15', 1001, 1, 'ana.silva@email.com'),
('Bruno Santos', 101, 100000002, '1985-07-22', 1002, 2, 'bruno.santos@email.com'),
('Carla Oliveira', 102, 100000003, '1992-11-08', 1003, 3, 'carla.oliveira@email.com'),
('Daniel Souza', 103, 100000004, '1988-01-30', 1004, 4, 'daniel.souza@email.com'),
('Eduarda Costa', 104, 100000005, '1995-05-12', 1005, 5, 'eduarda.costa@email.com'),
('Felipe Pereira', 105, 100000006, '1982-09-17', 1006, 1, 'felipe.pereira@email.com'),
('Gabriela Lima', 106, 100000007, '1998-12-03', 1007, 2, 'gabriela.lima@email.com'),
('Henrique Almeida', 107, 100000008, '1987-04-25', 1008, 3, 'henrique.almeida@email.com'),
('Isabela Rodrigues', 108, 100000009, '1993-06-19', 1009, 4, 'isabela.rodrigues@email.com'),
('João Ferreira', 109, 100000010, '1991-08-11', 1010, 5, 'joao.ferreira@email.com'),
('Larissa Gomes', 110, 100000011, '1996-02-14', 1011, 1, 'larissa.gomes@email.com'),
('Marcos Ribeiro', 111, 100000012, '1984-10-07', 1012, 2, 'marcos.ribeiro@email.com'),
('Natália Martins', 112, 100000013, '1997-01-21', 1013, 3, 'natalia.martins@email.com'),
('Otávio Carvalho', 113, 100000014, '1989-03-09', 1014, 4, 'otavio.carvalho@email.com'),
('Patrícia Araújo', 114, 100000015, '1994-07-16', 1015, 5, 'patricia.araujo@email.com'),
('Rafael Fernandes', 115, 100000016, '1986-12-28', 1016, 1, 'rafael.fernandes@email.com'),
('Sofia Barbosa', 116, 100000017, '1999-04-05', 1017, 2, 'sofia.barbosa@email.com'),
('Thiago Nascimento', 117, 100000018, '1983-06-23', 1018, 3, 'thiago.nascimento@email.com'),
('Vanessa Moreira', 118, 100000019, '1990-09-13', 1019, 4, 'vanessa.moreira@email.com'),
('William Cardoso', 119, 100000020, '1992-11-26', 1020, 5, 'william.cardoso@email.com');

INSERT INTO imoveis (endereço, preço, id_cliente) VALUES
(200, 350000.00, 1),
(201, 420000.00, 2),
(202, 280000.00, 3),
(203, 510000.00, 4),
(204, 390000.00, 5),
(205, 650000.00, 6),
(206, 310000.00, 7),
(207, 475000.00, 8),
(208, 295000.00, 9),
(209, 580000.00, 10),
(210, 360000.00, 11),
(211, 440000.00, 12),
(212, 720000.00, 13),
(213, 330000.00, 14),
(214, 490000.00, 15),
(215, 270000.00, 16),
(216, 610000.00, 17),
(217, 385000.00, 18),
(218, 530000.00, 19),
(219, 410000.00, 20),
(220, 340000.00, 1),
(221, 460000.00, 2),
(222, 295000.00, 3),
(223, 690000.00, 4),
(224, 375000.00, 5),
(225, 550000.00, 6),
(226, 320000.00, 7),
(227, 485000.00, 8),
(228, 625000.00, 9),
(229, 400000.00, 10);

INSERT INTO funcionarios
(nome, cpf, data_nascimento, cartão, id_serviço)
VALUES
('André Mendes', 200000001, '1985-02-10', 2001, 1),
('Beatriz Lopes', 200000002, '1990-05-18', 2002, 2),
('Caio Dias', 200000003, '1988-09-25', 2003, 3),
('Débora Castro', 200000004, '1993-12-07', 2004, 4),
('Eduardo Melo', 200000005, '1982-04-14', 2005, 5),
('Fernanda Reis', 200000006, '1995-07-21', 2006, 1),
('Gustavo Freitas', 200000007, '1987-01-16', 2007, 2),
('Helena Machado', 200000008, '1991-06-29', 2008, 3),
('Igor Teixeira', 200000009, '1989-10-03', 2009, 4),
('Juliana Correia', 200000010, '1994-03-12', 2010, 5),
('Leonardo Pinto', 200000011, '1986-08-20', 2011, 1),
('Mariana Xavier', 200000012, '1997-11-05', 2012, 2),
('Nicolas Monteiro', 200000013, '1992-02-27', 2013, 3),
('Olívia Mendes', 200000014, '1984-05-09', 2014, 4),
('Pedro Cunha', 200000015, '1996-09-14', 2015, 5),
('Renata Vieira', 200000016, '1983-12-22', 2016, 1),
('Samuel Batista', 200000017, '1998-04-17', 2017, 2),
('Talita Andrade', 200000018, '1990-07-30', 2018, 3),
('Vinícius Duarte', 200000019, '1988-01-11', 2019, 4),
('Yasmin Peixoto', 200000020, '1999-10-26', 2020, 5);

select * from clientes;
select * from imoveis;
select * from serviços;
select * from funcionarios;