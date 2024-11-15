"use client"

import { AppBar } from "@/components/AppBar";
import { BACKEND_URL } from "@/utils";
import axios from "axios"
import Loader from "./../../../../components/Loader/Loader";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";



export default function Page({ params: {
    taskId
} }: { params: { taskId: string } }) {
    const [result, setResult] = useState<Record<string, {
        count: number;
        option: {
            imageUrl: string
        }
    }>>({});

    const [loading, setLoading] = useState(true)

    async function getTaskDetails() {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                toast("Kindly connect your wallet and signin.")
            } else {
                setLoading(true)
                const response = await axios.get(`${BACKEND_URL}/v1/user/task?taskId=${taskId}`, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                setResult(response.data.result)
                setTaskDetails(response.data.taskDetails)
            }
        } catch (error) {
            
            toast("An error occured, Please try again.")
        } finally {
            setLoading(false)
        }
    }


    const [taskDetails, setTaskDetails] = useState<{
        title?: string

    }>({});

    useEffect(() => {
        getTaskDetails()
    }, [taskId])

    return (
        <div className="min-h-screen bg-gray-100">
            {loading && <Loader isVisible={loading} />}
            <AppBar />
            <div className="text-2xl pt-10 font-bold flex justify-center ">
                <span className=""> Task No</span>: <span className="ml-2"><span> </span > {taskId}</span>
            </div>

            {!loading && !taskDetails.title
                ?
                <div className="text-center justify-center" >
                    Not Found,   <button onClick={getTaskDetails} className='mt-4 small text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                focus:ring-gray-300 font-medium rounded-full text-xs px-2.5 py-1.5 me-2 mb-2 dark:bg-gray-800
                dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'> Try Again</button>
                </div>
                :
                <div className="text-2xl pt-20 flex  mb-1 justify-center">
                    {taskDetails.title}
                </div>
            }
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
    return (
        <>
            <div className="relative group  pb-0 bg-gray-700 border-gray-700 border max-w-fit  overflow-hidden rounded-lg">
                <img src={imageUrl} className="object-cover h-32 w-44 rounded-md p-1 border my-5 mx-auto mx-8 " />
                <div className="flex justify-center mt-3 border-t white bg-white py-1">
                    votes:  {votes}
                </div>
            </div>

        </>
    )
}