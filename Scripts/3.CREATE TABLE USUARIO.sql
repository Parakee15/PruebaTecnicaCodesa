CREATE TABLE USUARIO (
    ID_USUARIO VARCHAR2(100) NOT NULL, 
	ID_ROL NUMBER NOT NULL, 
	NOMBRE VARCHAR2(100) NOT NULL, 
	ACTIVO CHAR(1) NOT NULL, 
	CONSTRAINT "USUARIO_PK" PRIMARY KEY ("ID_USUARIO"), 
	CONSTRAINT "FK_ROL" FOREIGN KEY ("ID_ROL")
	REFERENCES ROL ("ID_ROL")
);
