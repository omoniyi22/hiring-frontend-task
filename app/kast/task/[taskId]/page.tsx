"use client"

import { AppBar } from "@/components/AppBar";
import { BACKEND_URL } from "@/utils";
import axios from "axios"
import { useEffect, useState } from "react"


async function getTaskDetails(taskId: string) {
    const response = await axios.get(`${BACKEND_URL}/v1/user/task?taskId=${taskId}`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
    return response.data
}

export default function Page({ params: {
    taskId
} }: { params: { taskId: string } }) {
    const [result, setResult] = useState<Record<string, {
        count: number;
        option: {
            imageUrl: string
        }
    }>>({});

    const [taskDetails, setTaskDetails] = useState<{
        title?: string
    }>({});


    useEffect(() => {

        setInterval(() => {
            getTaskDetails(taskId)
                .then((data) => {
                    setResult(data.result)
                    console.log({ result: data.result })
                    console.log({ details: data.taskDetails })
                    setTaskDetails(data.taskDetails)
                })
        }, 5000);

    }, [taskId])

    return (
        <div>
            <AppBar />
            <div className="text-2xl pt-20 flex justify-center">
                {taskDetails.title}
            </div>
            <section className="container  py-8 -mt-10 -mb-10">
                <div className="flex flex-wrap gap-3 max-w-fit p-6 rounded-sm justify-center mx-auto">
                    {Object.keys(result || {}).map(taskId =>
                        <Task imageUrl={result[taskId].option.imageUrl} votes={result[taskId].count} />
                    )}
                </div>
            </section>
        </div>
    )
}

function Task({ imageUrl, votes }: { imageUrl: string; votes: number }) {
    return <div className="relative group px-8 py-5 pb-3 bg-gray-700 max-w-fit rounded-lg">
        <img src={imageUrl} className="object-cover h-32 w-44 rounded-md p-1 border mx-auto" />
        <div className="flex justify-center mt-3">
            {votes}
        </div>
    </div>
}