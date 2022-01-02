### backend API for servise notification users

1. simple api for user auth - done
2. create api for crud user searh-mask - ...

### build

1. need: node + npm + yarn + nest = latest versions
2. yarn install --ignore-engines

## API

#### POST: `host/users`

1. for registration user:
   <br/> **request**
   <br/> where - *body*, type - `<json>`
   ```
   {
      "user":{
         "name":"name",
         "email":"name@mail.jo",
         "password":"any"
      }
   }
   ```
   **resolve**
   ```
   {
      "user": {
          "name"    : "name",
          "email"   : "name@mail.jo",
          "password": "hash-psw",
          "id"      : unique-number <smallint>,
          "token"   : "unique-value"
      }
   }
   ```

<br/>

2. for login user:`host/users/login`
   <br/> **request**
   <br/> where - *body*, type - `<json>`
   ```
   {
      "user":{
         "email"   :"name@mail.jo",
         "password":"unique-value"
      }
   }
   ```

   **resolve**
   <br/>
   ```
   {
      "user": {
         "id"   : unique-number <smallint>,
         "name" : "name",
         "email": "name@mail.jo",
         "token": "unique-value"
      }
   }
   ```

<br/>

#### GET: `host/user`

1. for get current user:
   <br/> **request**
   <br/> where - *Headers*, type - `KEY:TOKEN`
   <br/>
   `Authorization`:`token <user-token>`
   <br/>
   <br/> where - *body*, type - `<json>`
   ```
   {
      "user":{
         "name":"name",
         "email":"name@mail.jo",
      }
   }
   ```
   **resolve**
   ```
   {
      "user": {
          "id"      : unique-number <smallint>,
          "name"    : "name",
          "email"   : "name@mail.jo",
          "token"   : "unique-value"
      }
   }
   ```
   *resolve update token*
   <br/>

#### PUT: `host/user`

1. for get update user:
   <br/> **request**
   <br/> where - *Headers*, type - `KEY:TOKEN`
   <br/>
   `Authorization`:`token <user-token>`
   <br/>
   <br/> where - *body*, type - `<json>`
   <br/> All fields are optionals
   ```
   {
      "user":{
         "name":"new name",
         "email":"new name@mail.jo",
         "password":"new password",
      }
   }
   ```
   **resolve**
   ```
   {
      "user": {
          "id"      : unique-number <smallint>,
          "name"    : "name",
          "email"   : "name@mail.jo",
          "token"   : "unique-value"
      }
   }
   ```
   *resolve update token*