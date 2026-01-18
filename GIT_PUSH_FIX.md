# Исправление ошибки 403 при push

## Проблема
```
remote: Permission to Salmanchike05/Degen-Memory-Game.git denied to Salmanchike05.
fatal: unable to access 'https://github.com/Salmanchike05/Degen-Memory-Game.git/': The requested URL returned error: 403
```

## Решение

### Шаг 1: Очистить сохраненные credentials

Выполните в терминале:

```bash
cd /Users/airm1/Documents/degen-memory-game

# Очистить сохраненные credentials
git credential-osxkeychain erase
host=github.com
protocol=https
[Press Enter дважды]

# Или удалить из Keychain вручную:
# Откройте Keychain Access → найдите github.com → удалите
```

### Шаг 2: Убедитесь, что используете токен, а не пароль

1. Создайте новый Personal Access Token:
   - https://github.com/settings/tokens
   - Generate new token (classic)
   - Выберите scope: **repo** (полный доступ)
   - Скопируйте токен (начинается с `ghp_...`)

### Шаг 3: Выполните push с токеном

```bash
cd /Users/airm1/Documents/degen-memory-game

# Убедитесь, что remote использует HTTPS
git remote -v

# Если показывает SSH, измените на HTTPS:
git remote set-url origin https://github.com/Salmanchike05/Degen-Memory-Game.git

# Выполните push
git push -u origin main
```

**При запросе:**
- **Username**: `Salmanchike05`
- **Password**: **Вставьте токен** (не пароль от GitHub!)

### Шаг 4: Если все еще не работает

Попробуйте использовать токен прямо в URL:

```bash
# Замените YOUR_TOKEN на ваш токен
git remote set-url origin https://YOUR_TOKEN@github.com/Salmanchike05/Degen-Memory-Game.git
git push -u origin main
```

Или используйте переменную окружения:

```bash
export GIT_ASKPASS=echo
export GIT_USERNAME=Salmanchike05
export GIT_PASSWORD=YOUR_TOKEN_HERE
git push -u origin main
```

### Альтернатива: Проверьте права доступа

Убедитесь, что:
1. Репозиторий существует: https://github.com/Salmanchike05/Degen-Memory-Game
2. Вы залогинены в правильный аккаунт GitHub
3. Токен имеет scope `repo` (полный доступ к репозиториям)
