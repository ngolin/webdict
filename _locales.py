data = {
    "LOCALE": {"en": "en", "zh": "zh"},
    "name": {
        "en": "webdict",
        "zh": "网词快查",
        # 'zh_TW': '网词快查',
        # 'zh_HK': '网词快查',
        # 'zh_MO': '网词快查'
    },
    "description": {
        "en": "webdict - Play with the Web!",
        "zh": "网词快查 - 遇到生词，一触即发！",
        #
    },
    "addNote": {
        "en": "Add Note",
        "zh": "保存笔记"
        #
    },
    "highlight": {
        "en": "Highlight",
        "zh": "高亮显示"
        #
    }
}


def main():
    from os.path import exists
    from os import makedirs
    from json import dump

    locales = {locale for head in data for locale in data[head]}
    locales.discard("description")
    localed = {}
    for locale in locales:
        content = {}
        for head in data:
            content[head] = {"message": data[head][locale]}
            if "description" in data[head]:
                content[head]["description"] = data[head]["description"]
        localed[locale] = content
    for locale in localed:
        path = "src/copy/_locales/" + locale
        if not exists(path):
            makedirs(path)
        with open(path + "/messages.json", mode="w", encoding="utf-8") as f:
            dump(localed[locale], f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
