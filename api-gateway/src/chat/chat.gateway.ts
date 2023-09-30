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


export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    return console.log('esto inicia altoque');
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log('[CHAT GATEWAY] Alguien se conecto al socket');
    /* console.log('[CHAT GATEWAY] USER: ', client);
    console.log('[CHAT GATEWAY] Args: ', args); */
  }
  handleDisconnect(client: any) {
    console.log('alguien se fue del socket');
  }

  @SubscribeMessage('event_message')
  handleIncomingMessage(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[CHAT GATEWAY] ENTRANDO PAYLOAD: ", payload);
    this.server.to('room_' + room).emit('new_message', user);
  }

  // EVENTO DE RECIBIR MENSAJE DE GUARDAR
  @SubscribeMessage('event_save')
  handleIncomingMessage2(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[CHAT GATEWAY] GUARDANDO PAYLOAD: ", payload);
    this.server.to('room_' + room).emit('new_save', user);
  }


  // EVENTO DE RECARGAR PAGINA
  @SubscribeMessage('event_reload')
  handleIncomingMessage3(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[CHAT GATEWAY] recargar PAYLOAD: ", payload);
    this.server.to('room_' + room).emit('new_reload', user);
  }

  // EVENTO DE CREAR REUNION
  @SubscribeMessage('event_meet')
  handleIncomingMessage4(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[CHAT GATEWAY] reunion PAYLOAD: ", payload);
    this.server.to('room_' + room).emit('new_meet', user);
  }

  // EVENTO DE CREAR ELEMENTO
  @SubscribeMessage('event_element')
  handleIncomingMessage5(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[CHAT GATEWAY] elemento PAYLOAD: ", payload);
    this.server.to('room_' + room).emit('new_element', user);
  }

  // EVENTO DE CREAR TEMA
  @SubscribeMessage('event_topic')
  handleIncomingMessage6(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[CHAT GATEWAY] tema PAYLOAD: ", payload);
    this.server.to('room_' + room).emit('new_topic', user);
  }

   // EVENTO DE CREAR TEMA
  @SubscribeMessage('event_project')
  handleIncomingMessage7(
    client: Socket,
    payload: { room: string; user: any },
  ) {
    const { room, user } = payload;
    console.log("[CHAT GATEWAY] proyect PAYLOAD: ", payload);
    this.server.to('room_' + room).emit('new_project', user);
  }

     // EVENTO DE GUARDA PROJECTO
     @SubscribeMessage('event_save_project')
     handleIncomingMessage8(
       client: Socket,
       payload: { room: string; user: any },
     ) {
       const { room, user } = payload;
       console.log("[CHAT GATEWAY] proyect PAYLOAD: ", payload);
       this.server.to('room_' + room).emit('new_save_project', user);
     }

  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, payload2: { room: string; user: any }) {
    console.log("[CHAT GATEWAY] "+ payload2.user.name+ " saliendo de: " + payload2.room);
  
    client.leave('room_' + payload2.room);
    this.server.to('room_' + payload2.room).emit('left_user', payload2.user);
  }

  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, payload: { room: string; user: any }) {
    console.log("[CHAT GATEWAY] "+ payload.user.name + " uniendose a: " + payload.room);
    client.join('room_' + payload.room);
    this.server.to('room_' + payload.room).emit('new_user', payload.user);
  }



}
