CREATE TABLE IF NOT EXISTS users (
    `id` int primary key auto_increment,
    `username` varchar(255) not null,
    `password` varchar(255) not null
);