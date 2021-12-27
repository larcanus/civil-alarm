import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  host: "45.128.206.159",
  port: 5432,
  username: "admin",
  password: "100",
  database: "civiltest",
  synchronize: false,
  logging: false,
  entities: [
    __dirname + '/**/*.entity{.ts,.js}'
  ],
  migrations: [
    __dirname + '/migrations/**/*{.ts,.js}'
  ],
  cli :{
    migrationsDir : 'src/migrations'
  },
  subscribers: [
    "src/subscriber/**/*.ts"
  ]
};
export default config;