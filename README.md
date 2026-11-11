# roofing-demos

Бесплатные демо-сайты для кровельщиков (холодные письма). Все страницы закрыты от Google (noindex).

Ссылка на демо: `https://websorgex5234683.github.io/roofing-demos/clients/<папка>/`
Шаблон: `https://websorgex5234683.github.io/roofing-demos/_template/`

## Файлы шаблона
- `index.html` — главная, `work.html` — работы (фото до/после), `inspection.html` — заявка на осмотр и контакты
- `config.js` — анкета клиента. Меняется только этот файл. Пустое поле — блок скрыт.
- `styles.css`, `site.js` — дизайн и движок, не трогать.
- `images/` — фото клиента (создаётся в папке клиента).

Пока фото работ нет, в демо показываются пустые рамки «Your work will be shown here».

## Новый клиент
1. Скопировать `_template` в `clients/<номер-название>`
2. Заполнить `config.js` (только проверенные данные)
3. Загрузить папку на GitHub (без файлов-инструкций .txt)

## Оплаченный сайт
1. `config.js`: `demo: false`
2. Удалить `<meta name="robots" content="noindex, nofollow">` во всех .html
3. Публикация на Cloudflare Pages, форма через Formspree (`form.endpoint`)

Подробная инструкция: рабочий стол → «Сайты кровельщиков/_template/КАК ПОЛЬЗОВАТЬСЯ.txt»
