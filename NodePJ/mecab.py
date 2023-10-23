from collections import Counter
from itertools import count
import pymssql
from collections import Counter
from eunjeon import Mecab


# mecab 문서 위치
mecab = Mecab(dicpath='C:/Project/mecab/mecab-ko-dic')

# MSSQL 연결
connect = pymssql.connect(server=r"(local)", database="TEST", user="sa", password="unimes@2018")
cursor1 = connect.cursor()
cursor2 = connect.cursor()
cursor3 = connect.cursor()
cursor4 = connect.cursor()
 
# 기종 추출 및 기종별 mecab 실행
cursor1.execute("select ITEMCD from DATA group by ITEMCD order by itemcd")
item_all = cursor1.fetchall()
for item in item_all:
    cursor2.execute("select DEFECTTXT from DATA where itemcd = %s", item[0])
    row = cursor2.fetchall()
    defect_txt = str(row)

    mecab_result = mecab.nouns(defect_txt) #mecab 수행
    mecab_count = Counter(mecab_result) #mecab 결과 문자열별 갯수 추출
    total_count = (sum(mecab_count.values())) #mecab 결과 총 갯수 추출

    tag_count = []
    tags = []
    data = []

    # mecab 진행 후, 빈도 상위 100개 추출 (문자열과 갯수)
    for n, c in mecab_count.most_common(100):
        dics = {'tag': n, 'count': c}
        tag_count.append(dics)
      
    # insert문을 2만건씩 만들어 한번에 insert
    for i in range(len(tag_count)):
        value = tag_count[i]
        values = (
            str(item[0]),
            str(value['tag']),
            int(value['count']),
            int(total_count),
            round(float(value['count'] / total_count),2),
            str("")
        )
        # 데이터 프레임에 있는 값들을 하나하나씩 불러들여서 그 값들을 리스트에 추가합니다.
        data.append(values)

        if i % 20000 == 0:
            query = "insert into item_summary ( Item, Name, Count, Total, Rate, Option1) values (%s,%s,%s,%s,%s,%s)"
            cursor4.executemany(query,data)
            connect.commit()
            data = []

    #마지막 2만건 이후 나머지 것들 일괄 insert
    query = "insert into item_summary ( Item, Name, Count, Total, Rate, Option1) values (%s,%s,%s,%s,%s,%s)"
    cursor4.executemany(query,data)
    connect.commit()


# 플랫폼 추출 및 플랫폼별 mecab 실행
cursor1.execute("select PJTCD from DATA group by PJTCD order by PJTCD")
project_all = cursor1.fetchall()
for project in project_all:
    cursor2.execute("select DEFECTTXT from DATA where PJTCD = %s", project[0])
    row = cursor2.fetchall()
    defect_txt = str(row)

    mecab_result = mecab.nouns(defect_txt) #mecab 수행
    mecab_count = Counter(mecab_result) #mecab 결과 문자열별 갯수 추출
    total_count = (sum(mecab_count.values())) #mecab 결과 총 갯수 추출

    tag_count = []
    tags = []
    data = []

    # mecab 진행 후, 빈도 상위 100개 추출 (문자열과 갯수)
    for n, c in mecab_count.most_common(100):
        dics = {'tag': n, 'count': c}
        tag_count.append(dics)
      
    # insert문을 2만건씩 만들어 한번에 insert
    for i in range(len(tag_count)):
        value = tag_count[i]
        values = (
            str(project[0]),
            str(value['tag']),
            int(value['count']),
            int(total_count),
            round(float(value['count'] / total_count),2),
            str("")
        )
        # 데이터 프레임에 있는 값들을 하나하나씩 불러들여서 그 값들을 리스트에 추가합니다.
        data.append(values)

        if i % 20000 == 0:
            query = "insert into pjt_Summary ( project, Name, Count, Total, Rate, Option1) values (%s,%s,%s,%s,%s,%s)"
            cursor4.executemany(query,data)
            connect.commit()
            data = []

    #마지막 2만건 이후 나머지 것들 일괄 insert
    query = "insert into pjt_Summary ( project, Name, Count, Total, Rate, Option1) values (%s,%s,%s,%s,%s,%s)"
    cursor4.executemany(query,data)
    connect.commit()

connect.close()
print("Sueccess_Mecab")

