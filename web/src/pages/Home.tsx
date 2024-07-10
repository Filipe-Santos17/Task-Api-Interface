import CardTask from "../components/Card";
import { useState, useEffect } from "react";

export default function Home(){

    const [data, setData] = useState()

    useEffect(() => {
        async function getDataFromServer() {
            //const get = await fetch("")
        }
    }, [])


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                [{
                    id: "one",
                    title:"sdfdwfsdsada"
                }].map(task => (
                    <>
                   <CardTask key={task.id}/>
                   <CardTask key={task.id}/>
                   <CardTask key={task.id}/>
                   <CardTask key={task.id}/>
                   <CardTask key={task.id}/>
                   <CardTask key={task.id}/>
                   <CardTask key={task.id}/>
                    </>
                ))
            }
        </div>
    )
}