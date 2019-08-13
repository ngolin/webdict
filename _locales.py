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
        "en": "webdict - Play with New Words!",
        "zh": "网词快查 - 网页查词，一触即发！",
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
    },
}


def main():
    from os.path import exists, dirname, join
    from os import makedirs
    from json import dumps

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
        path = join(dirname(__file__), f"src/copy/_locales/{locale}")
        if not exists(path):
            makedirs(path)
        with open(path + "/messages.json", mode="w", encoding="utf-8") as f:
            f.write(dumps(localed[locale], ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
