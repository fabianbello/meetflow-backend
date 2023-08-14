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
  
  

  export enum TaskMSG {
    CREATE = 'CREATE_TASK',
    FIND_ALL = 'FIND_TASK',
    FIND_ONE = 'FIND_TASK',
    UPDATE = 'UPDATE_TASK',
    DELETE = 'DELETE_TASK',
  }
  