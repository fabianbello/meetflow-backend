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

export enum KanbanMSG {
    CREATE = 'CREATE_KANBAN',
    FIND_ALL = 'FIND_KANBAN',
    FIND_ONE = 'FIND_KANBAN',
    UPDATE = 'UPDATE_KANBAN',
    DELETE = 'DELETE_KANBAN',
  }