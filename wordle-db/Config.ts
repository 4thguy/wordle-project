export class Config {
  static Postgres = {
    user: 'superman',
    password: 'batman',
    host: 'localhost',
    database: 'wordle',
    port: 5432,
  };

  static dbServerPort = 4000;

  static Endpoints = {
    ROOT: '/',
    CHECK: '/check',
    WORD: '/word',
  };
}
