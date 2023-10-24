import csv
import subprocess
import sys

val = "TEST" #sys.argv[1]
header = [val,'1786','3546','0','NNP','*','T',val,'*','*','*','*','*']
with open(r"mecab\mecab-ko-dic\user-custom.csv", 'a', newline='', encoding='utf-8-sig') as csv_file: 
    writer = csv.writer(csv_file, delimiter=',', quotechar='"')
    writer.writerow(header)

p = subprocess.Popen(["powershell.exe", "mecab\\tools\\compile-win.ps1"], stdout=sys.stdout)
p.communicate()

print("Sucess")