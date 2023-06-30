# Настройка проекта

Установка зависимостей
    
    npm install

Создать файл .env в корневом каталоге и добавить конфигурацию БД

    DATABASE_URL="mysql://root:secret@localhost:3306/nature2"

Выполнить миграцию БД из конфигурации ORM Prisma

    npx prisma migrate dev

Запуск веб-сервера

    npm run dev

    обновление на гитхабе 
    git add .
    git commit -m 'edit text'
    git push

    //////
    войти на GitHub
    создать репозиторий
    переименовать папку с проектом под название репозитория
    
    git init

    git add .

    git commit -m 'text'

    git branch -M main

    git remote add origin https:// путь

    git push -u origin main


    ///////////////////////////
     при ошибке: 
     Another git process seems to be running in this repository, e.g.
    an editor opened by 'git commit'. Please make sure all processes
    are terminated then try again. If it still fails, a git process
    may have crashed in this repository earlier:
    remove the file manually to continue.

использовать команду:  rm .git/index.lock