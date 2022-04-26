a = "['9:00AM-11:00AM', '11:00AM-1:00AM', '1:00PM-3:00PM', '3:00PM-5:00PM']"
# a = "['9:00AM-11:00AM', '11:00AM-1:00AM']"

a = a.replace("'", "").replace(" ", "")[1:-1:].split(",")
print(a)
str = "["
for i in a:
    str += "'" + i + "',"
str = str[:-1]
str += "]"
print(a)
print(str)
print(type(str))  
print(type(a))  