export enum RabbitMQ {
    GuestQueue = 'guests',
    ProjectQueue = 'projects'
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
    