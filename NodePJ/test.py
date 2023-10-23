from eunjeon import Mecab
mecab = Mecab(dicpath='C:/mecab/mecab-ko-dic')
out = mecab.nouns("좌/우 전조등 피스볼트 1개소 미조임")
print(out)