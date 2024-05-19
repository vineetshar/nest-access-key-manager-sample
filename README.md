# access-key-commands-nest-sample
A sample codebase to work with access keys written in nestJS

PGADMIN HOST : host.docker.internal
REST config for db connections in individual docker-compose per repo 

Commands for access-key-generator:

npm i
npm run build
npx prisma migrate dev 

Admin commands
npm run list-all-keys
npm run generate-key -- --level=admin --username=vineet --ratelimit=10 --expiry=10-11-2024
npm run delete-key --  --key-id=clwdrmjpu0000ax0t4jwcilt8
npm run update-rate-limit -- -k clwdrkf830000lrz76f73rgdh -r 10
npm run update-expiry -- -k clwdrkf830000lrz76f73rgdh -e 10-10-2024

User commands 
npm run update-key-status -- -k clwdrfbdq000054lt4clwrqch -s enabled
npm run fetch-key-details -- -k clwdrfbdq000054lt4clwrqch


Commands for key-information-service:

npm i
npx prisma migrate dev
npm run build
npm run start

do a get call at localhost 3000 http://localhost:3000/key-information/key -> example -> http://localhost:3000/key-information/1234

