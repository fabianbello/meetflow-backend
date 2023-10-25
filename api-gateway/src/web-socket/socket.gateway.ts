import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(82, {
  cors: {
    origin: '*',
    namespace: 'chat',
  },
})

export class ScoketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  afterInit(server: any) {
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log('Usuario nuevo conectado');
  }
  handleDisconnect(client: any) {
    console.log('Usuario desconectado');
  }

  // EVENTO DE ENVIAR MENSAJE 
  @SubscribeMessage('event_message')
  handleIncomingMessage(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[socket] mensaje enviado");
    this.server.to('room_' + room).emit('new_message', user);
  }

  // EVENTO DE RECIBIR MENSAJE DE GUARDAR
  @SubscribeMessage('event_save')
  handleIncomingMessage2(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[socket] guardar");
    this.server.to('room_' + room).emit('new_save', user);
  }


  // EVENTO DE RECARGAR PAGINA
  @SubscribeMessage('event_reload')
  handleIncomingMessage3(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[socket] recargar pagina web");
    this.server.to('room_' + room).emit('new_reload', user);
  }

  // EVENTO DE CREAR REUNIÓN
  @SubscribeMessage('event_meet')
  handleIncomingMessage4(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[socket] se ha creado una reunión", payload.room);
    this.server.to('room_' + room).emit('new_meet', user);
  }

  // EVENTO DE CREAR ELEMENTO
  @SubscribeMessage('event_element')
  handleIncomingMessage5(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[socket] se ha creado un elemento");
    this.server.to('room_' + room).emit('new_element', user);
  }

  // EVENTO DE CREAR TEMA
  @SubscribeMessage('event_topic')
  handleIncomingMessage6(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[socket] se ha creado un tema");
    this.server.to('room_' + room).emit('new_topic', user);
  }

  // EVENTO DE CREAR PROYECTO
  @SubscribeMessage('event_project')
  handleIncomingMessage7(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[socket] se ha creado un proyecto");
    this.server.to('room_' + room).emit('new_project', user);
  }

  // EVENTO DE GUARDA PROJECTO
  @SubscribeMessage('event_save_project')
  handleIncomingMessage8(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[socket] se ha guardado el proyecto");
    this.server.to('room_' + room).emit('new_save_project', user);
  }

  // EVENTO DE USUARIO SALIENDO DE LA SECCIÖN
  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, payload2: { room: string; user: any }) {
    console.log("[socket] usuario: " + payload2.user.name + ' ha salido de la sección: ' + payload2.room);
    client.leave('room_' + payload2.room);
    this.server.to('room_' + payload2.room).emit('left_user', payload2.user);
  }

  // EVENTO DE USUARIO UNIENDOSE A LA SECCIÖN
  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, payload: { room: string; user: any }) {
    console.log("[socket] usuario: " + payload.user.name + ' ha unido a la sección: ' + payload.room);
    client.join('room_' + payload.room);
    this.server.to('room_' + payload.room).emit('new_user', payload.user);
  }
}
