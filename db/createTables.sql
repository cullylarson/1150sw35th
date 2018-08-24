CREATE TABLE applications (
    id                  INT UNSIGNED    NOT NULL    AUTO_INCREMENT,
    name                VARCHAR(512),
    email               VARCHAR(1024),
    params              TEXT,
    created             DATETIME,
    PRIMARY KEY (id)
) ENGINE=InnoDB CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci' 
