/* TODO: Add column for hash password*/
create table if not exists Users (
    ID int not null auto_increment primary key,
    Email varchar(225) not null,
    Password varchar(60) not null,
    UserName varchar(255) not null,
    FirstName varchar(255) not null,
    LastName varchar(255) not null,
);

