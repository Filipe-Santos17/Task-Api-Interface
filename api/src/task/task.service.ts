import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { BoxTaskDTO } from './task.dto';

type idUserAndTask = {
    idUser: string, 
    id: number
}

@Injectable()
export class TaskService {
    constructor(private readonly DB: DbService){}

    async createBoxTask(boxTask: BoxTaskDTO){
        try{ 
            const {id} = await this.DB.groupTask.create({
                data:{
                    title: boxTask.title,
                    idUser: boxTask.idUser,
                }
            })

            boxTask.tasks.map(async t => 
                await this.DB. task.create({
                    data:{
                        titleTask: t.titleTask,
                        idGroupTask: id,
                        complete: false,
                    }
                }
            ))

            return {
                message: "Created",
                statusCode: HttpStatus.CREATED,
            }
        } catch(e){
            throw new InternalServerErrorException(`Erro na criação da Task: ${e}`)
        }
    }

    async getAllTasks(idUser: string){
        const allTasks = await this.DB.groupTask.findMany({
            include: {
                tasks: true,
            },
            where:{
                idUser
            }
        })

        return {
            tasks: allTasks,
            statusCode: HttpStatus.OK,
        }
    }

    async getOneTask({idUser, id}:idUserAndTask){
        const task = await this.DB.groupTask.findUnique({
            include:{
                tasks: true,
            },
            where:{
                id,
                idUser
            }
        })

        return {
            task,
            statusCode: HttpStatus.OK,
        }
    }

    private async isTaskExist(id: number){
        const taskExist =  await this.DB.task.findUnique({
            where:{
                id,
            }
        })

        return taskExist
    }

    async deleteOneTask(id: number){
        const taskExist =  await this.isTaskExist(id)

        if(taskExist){
            try{
                await this.DB.task.delete({
                    where:{
                        id,
                    }
                })
                
                return {
                    statusCode: HttpStatus.OK
                }
            } catch(e){
                throw new InternalServerErrorException(`Erro no delete da Task: ${e}`)
            }
        }

        throw new ForbiddenException(`Task com o id ${id} não existe!`)
    }

    async modifyTask(id: number, newTask: BoxTaskDTO){
        const taskExist =  await this.isTaskExist(id)

        if(taskExist){
            try{
                await this.DB.task.update({
                    where:{
                        id,
                    },
                    data:{

                    }
                })
                
                return {
                    statusCode: HttpStatus.OK
                }
            } catch(e){
                throw new InternalServerErrorException(`Erro ao modificar a Task: ${e}`)
            }
        }

        throw new ForbiddenException(`Task com o id ${id} não existe!`)
    }
}

