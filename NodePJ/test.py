import os
from eunjeon import Mecab

#print(os.path.join(os.getcwd())) 실행 경로
      
mecab = Mecab(dicpath=os.path.join(os.getcwd(), 'mecab/mecabrc'))
#Mecab(dicpath='C:/mecab/mecab-ko-dic')
out = mecab.nouns("좌/우 전조등 피스볼트 1개소 미조임")
print(out)