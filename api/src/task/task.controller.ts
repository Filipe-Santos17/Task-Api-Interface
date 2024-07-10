import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoxTaskDTO } from './task.dto';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';

@UseGuards()
@Controller('tasks')
export class TaskController {
    
    constructor( private readonly taskServices:TaskService ){}

    @Post() 
    createTaskGroup(@Body() taskBody: BoxTaskDTO){
        return this.taskServices.createBoxTask(taskBody);
    }

    @Get(":user_id")
    getAllTasks(@Param("user_id") idUser: string){
        return this.taskServices.getAllTasks(idUser)
    }

    @Get("/:user_id/:id")
    getOneTask(@Param("user_id") idUser: string, @Param("id") id: number){
        return this.taskServices.getOneTask({idUser, id: +id})
    }

    @Delete("/:user_id/:id")
    deleteOneTask(@Param("id") id: number){
        return this.taskServices.deleteOneTask(+id)
    }

    @Put("/:user_id/:id")
    modfiyOneTask(@Param("id") id: number, @Body() newTask: BoxTaskDTO){
        return this.taskServices.modifyTask(id, newTask)
    }
}
