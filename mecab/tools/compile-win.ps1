$PROC_PATH = "C:\Project\mecab\"
$DIC_PATH = "$($PROC_PATH)mecab-ko-dic\"
$USERDIC_PATH = "$($PROC_PATH)user-dic\"
$MECAB_EXEC_PATH = "$($PROC_PATH)mecab.exe"
$DICT_INDEX = "$($PROC_PATH)mecab-dict-index.exe"

function Compile {
    Remove-Item .\mecab\mecab-ko-dic\*.bin
    Remove-Item .\mecab\mecab-ko-dic\*.txt
    & .\mecab\mecab-dict-index.exe -d mecab\mecab-ko-dic -o mecab\mecab-ko-dic -f UTF-8 -t UTF-8

}

Compile