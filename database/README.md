# Database

```
CREATE ROLE me WITH LOGIN PASSWORD 'password';
```

```
ALTER ROLE me CREATEDB;
```

```
CREATE DATABASE api;
```

```
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);
```

```
INSERT INTO users (name, email)
  VALUES ('rit', 'rit@email.com'), ('someoneelse', 'someoneelse@someamazingwebsite.com');
```
