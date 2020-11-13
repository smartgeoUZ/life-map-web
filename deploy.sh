#!/usr/bin/env sh
$ ssh -T git@github.com
# abort on errors
#set -e

# build
 npm run build

# navigate into the build output directory
cd dist

## create a copy of index.html
#cp index.html 404.html

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
#git push -f git@github.com:StanislavMalinovskiy/StanislavMalinovskiy.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:StanislavMalinovskiy/test.git master:master
# https://aliyev21.github.io/life-map/


cd -
$SHELL