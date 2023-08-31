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
    KanbanQueue = 'kanban',
    NotificationQueue = 'notifications'
  }
  

export enum NotificationMSG {
    CREATE = 'CREATE_NOTIFICATION',
    FIND_ALL = 'FIND_NOTIFICATION',
    FIND_ONE = 'FIND_RNOTIFICATION',
    UPDATE = 'UPDATE_NOTIFICATION',
    DELETE = 'DELETE_NOTIFICATION',
  }