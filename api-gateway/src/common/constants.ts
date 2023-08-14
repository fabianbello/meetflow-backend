export enum RabbitMQ {
  UserQueue = 'users',
  GuestQueue = 'guests',
  ProjectQueue = 'projects',
  MeetingQueue = 'meetings',
  PreMeetingQueue = 'pre-meetings',
  InMeetingQueue = 'in-meetings',
  PostMeetingQueue = 'post-meetings',
  MeetingMinuteQueue = 'meeting-minutes',
  ElementQueue = 'elements',
  TaskQueue = 'tasks',
  ReminderQueue = 'reminders',
  KanbanQueue = 'kanban'
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
  VALID_PASS = 'VALID_PASS',
  UPDATE_CURRENT = 'UPDATE_CURRENT_USER'
}

export enum GuestMSG {
  CREATE = 'CREATE_GUEST',
  FIND_ALL = 'FIND_GUESTS',
  FIND_ONE = 'FIND_GUEST',
  UPDATE = 'UPDATE_GUEST',
  DELETE = 'DELETE_GUEST',
}

export enum ProjectMSG {
  CREATE = 'CREATE_PROJECT',
  FIND_ALL = 'FIND_PROJECTS',
  FIND_ONE = 'FIND_PROJECT',
  UPDATE = 'UPDATE_PROJECT',
  DELETE = 'DELETE_PROJECT',
  ADD_GUEST = 'ADD_GUEST',
  ADD_MEMBER = 'ADD_MEMBER_PROJECT'
}

export enum MeetingMSG {
  CREATE = 'CREATE_MEETING',
  FIND_ALL = 'FIND_MEETINGS',
  FIND_ONE = 'FIND_MEETING',
  UPDATE = 'UPDATE_MEETING',
  DELETE = 'DELETE_MEETING',
  ADD_PROJECT = 'ADD_PROJECT',
  FIND_BY_PROJECT = 'FIND_BY_PROYECT',
  SET_STATE = 'SET_STATE_MEETING'
}

export enum PreMeetingMSG {
  CREATE = 'CREATE_PREMEETING',
  FIND_ALL = 'FIND_PREMEETINGS',
  FIND_ONE = 'FIND_PREMEETING',
  UPDATE = 'UPDATE_PREMEETING',
  DELETE = 'DELETE_PREMEETING',
}

export enum InMeetingMSG {
  CREATE = 'CREATE_INMEETING',
  FIND_ALL = 'FIND_INMEETINGS',
  FIND_ONE = 'FIND_INMEETING',
  UPDATE = 'UPDATE_INMEETING',
  DELETE = 'DELETE_INMEETING',
}

export enum PostMeetingMSG {
  CREATE = 'CREATE_POSTMEETING',
  FIND_ALL = 'FIND_POSTMEETINGS',
  FIND_ONE = 'FIND_POSTMEETING',
  UPDATE = 'UPDATE_POSTMEETING',
  DELETE = 'DELETE_POSTMEETING',
}

export enum MeetingMinuteMSG {
  CREATE = 'CREATE_MEETINGMINUTE',
  FIND_ALL = 'FIND_MEETINGMINUTE',
  FIND_ONE = 'FIND_MEETINGMINUTE',
  UPDATE = 'UPDATE_MEETINGMINUTE',
  DELETE = 'DELETE_MEETINGMINUTE',
}

export enum ElementMSG {
  CREATE = 'CREATE_ELEMENT',
  FIND_ALL = 'FIND_ELEMENT',
  FIND_ONE = 'FIND_ELEMENT',
  UPDATE = 'UPDATE_ELEMENT',
  DELETE = 'DELETE_ELEMENT',
  FIND_BY_MEET = 'FIND_BY_MEET_ELEMENT',
  FIND_BY_PROJECT= 'FIND_BY_PROJECT_ELEMENT',
  FIND_BY_PROJECT_PREVIEW = 'FIND_BY_PROJECT_PREVIEW_ELEMENT'
}

export enum TaskMSG {
  CREATE = 'CREATE_TASK',
  FIND_ALL = 'FIND_TASK',
  FIND_ONE = 'FIND_TASK',
  UPDATE = 'UPDATE_TASK',
  DELETE = 'DELETE_TASK',
}

export enum ReminderMSG {
  CREATE = 'CREATE_REMINDER',
  FIND_ALL = 'FIND_REMINDER',
  FIND_ONE = 'FIND_REMINDER',
  UPDATE = 'UPDATE_REMINDER',
  DELETE = 'DELETE_REMINDER',
}

export enum KanbanMSG {
  CREATE = 'CREATE_KANBAN',
  FIND_ALL = 'FIND_KANBAN',
  FIND_ONE = 'FIND_KANBAN',
  UPDATE = 'UPDATE_KANBAN',
  DELETE = 'DELETE_KANBAN',
}