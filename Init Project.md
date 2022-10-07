# Init Project

## **GIT**
1. Create Repository
1. Create Branche
    - main
    - dev
1. Invite teammate
1. Create rooles
1. Download Repository
---

## **Project**
1. У папці Partials створити під кожну секцію html файл і підключити ці файли у головний файл index.html через `<include src="..."></include>`
1. Підключити шрифти в index.html
1. У папці SASS створити папку layout. Під кожну секцію створити окремий css файл.
1. В папці Utils:
    - створити файл _variables.scss і оголосити необхідні змінні
    - створити файли _placeholders.scss and _mixin.scss якщо вони потрібні
1. В файлі _common.scss створити мінімальний сброс
1. В файлі _container.scss свторити контейнер під усі екрани (мобілка, таблетка, десктоп)
1. Підключити усі scss файли в main.scss через дерективу @import
---
## URLS
- [Main Instruction](https://docs.google.com/document/d/1HtW1f15o_TCBVMB7CW_cu6g2p8cPiradkET99X85nYI/edit)
- [Trello Instruction](https://docs.google.com/document/d/1PvwscZhKhXM_ow0_RMJEWJ2xgtsEb65lLeGG3mEzFMs/edit)
- [Parcel Project Template](https://github.com/goitacademy/parcel-project-template)
- [Тех Завдання](https://docs.google.com/spreadsheets/d/19zS365fIf0gNfE8-Q-ruMeYiI7GVlrtNLl45MvLXDPs/edit#gid=0)
- [Макет](https://www.figma.com/file/AOs5DvnIvdZ67VSFGB2vXc/EVENT-BOOSTER-(Copy))
- [Booster API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)
- [Scrumpoker](https://www.scrumpoker-online.org/en/)
---
## Example dir
```js
- src:
    - images:

    - js:
        api.js
        base.js
    - partials:
        header.html
        container.html
        footer.html
        modal.html
    - sass:
        - base:
            _common.scss
            _container.scss
            _reset.scss
        - components:
            _components.scss
        - layouts:
            _header.scss
            _container.scss
            _footer.scss
            _modal.scss
        - utils:
            _variables.scss
        index.scss
    index.html
    index.js

```


