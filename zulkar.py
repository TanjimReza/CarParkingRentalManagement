import mysql.connector

mydb = mysql.connector.connect(
  database= 'tanjimre_lab_test',
  host="clients.cmsngroup.com.au",
  user="tanjimre_tanjim",
  password="d2Mw@TEJjcin2Ge"
)

mycursor = mydb.cursor()

mycursor.execute("select * from test_table")
for i in mycursor:
    print(i)