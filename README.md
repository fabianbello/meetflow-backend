# D-Meetflow Framework
Framework basado en microservicios para la construcción de aplicaciones con actas dialogicas.

# Requisitos:
1. Node v20
2. Nest v10.1.18
3. docker v24.0.6

# Instalación local:

# 1. Crear base de datos de usuarios usando Docker:
En terminal:
1. docker run --name data-base-users -p 5000:3306 -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=dbusers -d mysql

# 2. Crear servidor RabbitMQ usando Docker:
En terminal:
1. docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3-management

# 3. Modificar archivos .env.development:
Cambiar variables según se estime necesario.

# 4. Inicializar cada microservicio en sus correspondientes ubicaciones:
En terminal:
1. npm install
2. npm run start:dev

# 5. Consultar métodos API soportados:
En navegador:
1. Ingresar al enlace: "http://localhost:3000/api/docs"


