# D-Meetflow Framework
Framework basado en microservicios para la construcción de aplicaciones con actas dialogicas.

# Requisitos:
1. Node v20
2. Nest v10.1.18
3. docker v24.0.6

# Instalación:

# 1. En terminal para crear base de datos de usuarios usando Docker:
1. docker run --name data-base-users -p 5000:3306 -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=dbusers -d mysql 

# 2. En terminal para inicializar cada microservicio en sus correspondientes ubicaciones:
1. npm install
2. npm run start:dev

# 3. En archivo .env:
Modificar variables según se estime necesario.
