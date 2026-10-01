create database Second_lab





create table Doctor(

D_id int primary key,
D_name varchar(20),
D_prof varchar(20),
D_salary money,
D_com money,
)



insert into Doctor(D_id,D_name,D_prof,D_salary,D_com)
values(1,'Ali','Neurologist',20000,2000),
(2,'Ali','Cardiologist',30000,1000),
(3,'Ali Saqlain ','Cardiologist',500000,1500),
(4,'Ahamd shah','Dentist',700000,12000),
(5,'Ali shah','Dematologist',60000,20000),
(6,'abdullah shah','Dentist',130000,8000),
(7,'ahamd ali','Pediatrician',80000,9000),
(8,'zain ali ','Neurologist',900000,15000),
(9,'abdullah ali ','Dematologist',40000,14000),
(10,'hammad ali ','Othroedic',30000,4000)



Select* from Doctor where D_com<=10000
Select* from Doctor where (D_salary>=100000 AND D_prof IN('Dentist','Neurologist') )

Select 
    D_id,D_name,D_prof,D_salary,D_com,
    (D_salary + (D_com * 1.20)) AS Total_Income
FROM Doctor
WHERE D_prof = 'Cardiologist';

Select* from Doctor where D_name like '%shah'


Select * from Doctor where D_prof !='Cardiologist' AND D_id NOt IN(8,10)













