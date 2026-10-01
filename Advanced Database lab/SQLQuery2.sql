create database advanceddatabase2
drop database advanceddatabase1


create table Students1(
Rollno int primary key ,
StudentName varchar(50),
Class varchar(50),
Teacher varchar(50),
Subjects varchar(50)
)

Insert into Students1( Rollno,StudentName,Class,Teacher,Subjects)
values(1,'Saqlain','10','Ahmad','Physics'),
(2,'ALi','1','Ahsan','Math'),
(3,'zain','2','hassan','Math'),
(4,'waleed','3','ateeb','English'),
(5,'abdullah','4','adil','Urdu'),
(6,'saqib','10','muneeb','BBA'),
(7,'tallat','5','hammad','Biology'),
(8,'hunain','11','asad','Computer science'),
(9,'hamza','12','zain','Science'),
(10,'Saqlain','10','Ahmad','Physics'),
(11,'haider','11','Abdullah','mangement')

select * from Students1






Create table Dept(
DepNo int primary key ,
DepName varchar(50))



Create table EMP(
Ename varchar(50),
DepNo int,
JOB varchar(50),
Sal money)


Insert into Dept(DepNo,DepName)
values(1,'Computer Science'),
(2,'Arts'),
(3,'Physics'),
(4,'Mangemnet')



insert into EMP(Ename,DepNo,JOB,Sal)
values('haider','1','Manager',50000.00),
('ALi','2','Cleark',10000.00),
('Ahmad','3','Assistant',20000.00),
('Saqib','4','Officer',30000.00),
('Ateeb','5','Intern',40000.00),
('Saqlain','6','Assistant',70000.00),
('haider','1','Manager',50000.00)



Select  * from Dept
Select Ename,DepNo,JOB,Sal , Sal*12 as AnnualSalary from EMP 

Select Ename,Sal,Sal*12 as AnnualSalary , sal*0.15 as NewSalary from EMP



select distinct JOB from EMP

select '<<'+Ename+'>>'+'is a '+'<<'+JOB+'>>' as  EmployeeDetail from EMP









