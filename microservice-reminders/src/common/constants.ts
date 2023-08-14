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
  

export enum ReminderMSG {
    CREATE = 'CREATE_REMINDER',
    FIND_ALL = 'FIND_REMINDER',
    FIND_ONE = 'FIND_REMINDER',
    UPDATE = 'UPDATE_REMINDER',
    DELETE = 'DELETE_REMINDER',
  }