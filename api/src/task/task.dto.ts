export class BoxTaskDTO {
    id: number;
    title:  string;
    idUser: string;
    tasks:  Task[]
}

export class Task{
    id:          number;
    titleTask:   string;
    complete:    boolean;
    createdAt:   Date;
    updated_at:  Date;
    idGroupTask: number;
}