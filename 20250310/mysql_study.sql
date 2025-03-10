SHOW TABLES;

CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(10) NOT NULL, user_pw VARCHAR(10) NOT NULL, user_nick VARCHAR(10) NOT NULL, user_sex VARCHAR(5) , date DATETIME DEFAULT now());

SELECT * FROM users

INSERT into users ( user_id, user_pw, user_nick, user_sex) VALUES ("zzeen3", 1234, "zzeen", NULL)

drop Table users;

## 얘는 틀림
SELECT user_pw WHERE user_id="zzeen1";

SELECT user_pw from users WHERE user_id="zzeen1"