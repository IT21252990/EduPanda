import React from "react";
import { Button } from "flowbite-react";


export default function NavigatePage() {
return(
    <div>
    <img src="/edupanda.png" className="h-60 w-auto"/>

    <Button gradientDuoTone="purpleToBlue" className="p-2 m-4" href="/AdminHome">Admin</Button>

    <Button gradientDuoTone="purpleToBlue" className="p-2 m-4">Instructor</Button>

    </div>
)
}