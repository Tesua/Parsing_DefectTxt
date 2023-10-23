import pymssql
import numpy as np
import sys

type = sys.argv[1]
val = sys.argv[2]

# MSSQL 연결
connect = pymssql.connect(server=r"(local)", database="TEST", user="sa", password="unimes@2018")
cursor = connect.cursor()

#Type에 따른 분기
if type == "PJT":
    query = "select * From pjt_summary(nolock) where project = %s FOR JSON AUTO"
else :
    query = "select * From item_summary(nolock) where Item = %s FOR JSON AUTO"


# 쿼리실행
cursor.execute(query, val)
row = cursor.fetchall()
connect.close()

# Return
print(row)

