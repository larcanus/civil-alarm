### Back-end API for service notification users

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
          "id"      : integer,
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
         "id"      : integer,
         "name"    : "name",
         "email"   : "name@mail.jo",
         "filters" : [
            {
               "id"        : integer,
               "name_1"    : string,
               "filter_1"  : string,
               "subject_1" : string,
               "active_1"  : boolean,
               "name_2"    : string,
               "filter_2"  : string,
               "subject_2" : string,
               "active_2"  : boolean,
               "created_at": timestapm,
               "update_at" : timestapm
            }
         ],
         "token" : "unique-value"
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
   
   **resolve**
   ```
   {
      "user": {
         "id"      : integer,
         "name"    : "name",
         "email"   : "name@mail.jo",
         "password": "hash-psw",
         "filters" : [
            {
               "id"        : integer,
               "name_1"    : string,
               "filter_1"  : string,
               "subject_1" : string,
               "active_1"  : boolean,
               "name_2"    : string,
               "filter_2"  : string,
               "subject_2" : string,
               "active_2"  : boolean,
               "created_at": timestapm,
               "update_at" : timestapm
            }
          ],
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
          "id"      : integer,
          "name"    : "name",
          "email"   : "name@mail.jo",
          "token"   : "unique-value"
      }
   }
   ```
   *resolve update token*
   
#### PUT: `host/filters`
1. for get update or create filters
<br/> **request**
   <br/> where - *Headers*, type - `KEY:TOKEN`
   <br/>
   `Authorization`:`token <user-token>`
   <br/>
   <br/> where - *body*, type - `<json>`
   <br/> All fields are optionals
   ```
   {
      "filters": {
         "name_1"   : string,
         "name_2"   : string,
         "filter_1" : string,
         "filter_2" : string
         "subject_1": string
         "subject_2": string
         "active_1" : boolean
         "active_2" : boolean
      }
   }
   ```
   **resolve**
   ```
   {
      "filters": {
         "id"         : integer
         "name_1"     : string
         "name_2"     : string
         "filter_1"   : string
         "filter_2"   : string
         "active_1"   : boolean
         "active_2"   : boolean
         "subject_1"  : string
         "subject_2"  : string
         "created_at" : timestamp
         "update_at"  : timestamp
      }
   }
   ```