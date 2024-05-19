# Access Key Commands Nest Sample

A sample codebase to work with access keys written in NestJS.

## PGAdmin Configuration
- **Host**: `host.docker.internal`
- Individual config for DB connections is in individual `docker-compose` files per repository.

### Setup for access-key-generator app (after getting infra up via docker-compose up)
1. Install dependencies:
   ```bash
   npm i
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
## Access Key Generator Commands
### Admin Commands
Note : The admin app has no validation as of now - it doesnt validate for admins
- List all keys:
  ```bash
  npm run list-all-keys
  ```
- Generate a new key:
  ```bash
  npm run generate-key -- --level=admin --username=vineet --ratelimit=10 --expiry=10-11-2024
  ```
- Delete a key:
  ```bash
  npm run delete-key -- --key-id=clwdrmjpu0000ax0t4jwcilt8
  ```
- Update rate limit:
  ```bash
  npm run update-rate-limit -- -k clwdrkf830000lrz76f73rgdh -r 10
  ```
- Update expiry date:
  ```bash
  npm run update-expiry -- -k clwdrkf830000lrz76f73rgdh -e 10-10-2024
  ```

### User Commands
- Update key status:
  ```bash
  npm run update-key-status -- -k clwdrfbdq000054lt4clwrqch -s enabled
  ```
- Fetch key details:
  ```bash
  npm run fetch-key-details -- -k clwdrfbdq000054lt4clwrqch
  ```

## Key Information Service Commands (after getting infra up via docker-compose up)

### Setup
1. Install dependencies:
   ```bash
   npm i
   ```
2. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the service:
   ```bash
   npm run start
   ```

### Usage for key validation in key-information-service
Make a GET call at `http://localhost:3000/key-information/key`.

Example:
```bash
http://localhost:3000/key-information/1234
```

---

This README provides a quick reference for setting up and managing access keys using the provided NestJS sample codebase. For more detailed documentation, please refer to the project's documentation or source code comments.
