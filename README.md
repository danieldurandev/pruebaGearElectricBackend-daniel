# pruebaGearElectricBackend-daniel

Backend de un sencillo administrador de asistencias para eventos.

## Tecnologías usadas

 - NestJS
 - TypeORM
 - PostgreSQL
 - Docker
 - TypeScript

## Pasos para ejecutar el proyecto

 1. Primero verifique que tenga instalado Docker Desktop, de lo contrario, proceda a instalarlo.
 2. Renombre el archivo `.env.template` ubicado en la raíz del proyecto a `.env`.
 3. En la raíz del proyecto, ejecute el comando `docker-compose up -d`. Esto para levantar la base de datos.
 4. Nuevamente en la raíz del proyecto ejecute el comando `yarn` para instalar las dependencias del mismo.
 5. Por ultimo, ejecute el comando `yarn start:dev` para levantar el backend.

