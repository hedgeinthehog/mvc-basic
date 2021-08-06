CREATE TABLE IF NOT EXISTS students (
    `id` int primary key auto_increment,
    `name` varchar(255) not null,
    `age` int not null,
    `gender` varchar(255) not null
);