# Инструкция по деплою Degen Memory Game

## Вариант 1: Деплой на IPFS (рекомендуется для Web3/Base)

### Шаг 1: Подготовка файлов
Все файлы должны быть в одной папке:
- `index.html`
- `script.js`
- `style.css`
- `images/` (папка с иконками)

### Шаг 2: Загрузка на IPFS

#### Способ A: Через Pinata (самый простой)
1. Зарегистрируйтесь на https://pinata.cloud
2. Перейдите в раздел "Upload"
3. Загрузите всю папку с файлами
4. После загрузки получите CID (Content Identifier)
5. Ваше приложение будет доступно по адресу: `https://gateway.pinata.cloud/ipfs/YOUR_CID`

#### Способ B: Через Fleek (автоматический деплой)
1. Зарегистрируйтесь на https://fleek.co
2. Подключите GitHub репозиторий или загрузите файлы вручную
3. Fleek автоматически задеплоит на IPFS

#### Способ C: Через nft.storage
1. Зайдите на https://nft.storage
2. Загрузите ZIP архив с вашими файлами
3. Получите CID и используйте IPFS gateway

### Шаг 3: Использование Base Name Service (опционально)
Можно привязать IPFS хеш к домену через ENS или Base Name Service.

---

## Вариант 2: Статический хостинг (Vercel/Netlify)

### Vercel
1. Зарегистрируйтесь на https://vercel.com
2. Установите Vercel CLI: `npm i -g vercel`
3. В папке проекта выполните: `vercel`
4. Следуйте инструкциям
5. Приложение будет доступно по адресу: `https://your-project.vercel.app`

### Netlify
1. Зарегистрируйтесь на https://netlify.com
2. Перетащите папку с файлами в Netlify Drop
3. Или используйте Netlify CLI: `netlify deploy`
4. Приложение будет доступно по адресу: `https://random-name.netlify.app`

### GitHub Pages
1. Создайте GitHub репозиторий
2. Загрузите все файлы в репозиторий
3. Перейдите в Settings > Pages
4. Выберите branch (обычно `main` или `master`)
5. Приложение будет доступно по адресу: `https://your-username.github.io/repository-name`

---

## Вариант 3: Base-специфичный хостинг

Если Base предоставляет собственный хостинг, проверьте их документацию:
- Base Documentation: https://docs.base.org
- Base Discord для поддержки

---

## Важные замечания

1. **Пути к файлам**: Убедитесь, что все пути относительные (как сейчас `images/brett.png`)
2. **HTTPS**: Для работы с Web3/кошельками нужен HTTPS
3. **CORS**: При использовании IPFS может понадобиться настройка CORS
4. **MetaMask**: Убедитесь, что приложение работает с MetaMask через HTTPS

---

## Быстрый деплой через CLI

### IPFS через IPFS Desktop
```bash
# Установите IPFS Desktop
# Затем:
ipfs add -r /path/to/your/project
```

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```
