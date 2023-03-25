# Pii Shop

Sample Backend Application For Enyata

- Click [here](https://documenter.getpostman.com/view/18143905/2s93RNxaEv) for a link to the postman documentation

### Setup

- Clone the repo
- Install depensencies

```bash
    npm install
```

- Add the env variables using .env.example

### Start up development server

```bash
  npm run dev
  
```
### Run Integration test
```bash
  npm run test:integration
 
```
### Run Unit test
```bash
  npm run test:unit
 
```

### Start up docker

- Ensure docker is installed on your system by running the following command

```bash
  docker version
```

- Build the application on docker with the following command

```bash
  docker build -t enyata-test .
```

- Run the application

```bash
  docker run -p 3000:3000 enyata-test

```

### Note

For the purpose of the test two (2) users has been seeded

## User 1

```ts
  {
    email: "john@example.com",
    password: "123456"
  }
```

## User 2

```ts
  {
    email: "jane@example.com",
    password: "123456"
  }
```
