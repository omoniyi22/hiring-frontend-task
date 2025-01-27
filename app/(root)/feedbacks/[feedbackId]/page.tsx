"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import { useRouter, useParams } from "next/navigation";
import { fetchFeedbacks } from "@/app/state/feedback/feedbackSlice";
import { formatDateTime } from "@/app/utils/time";

function Page() {
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.user)
    const feedbacks = useSelector((state: RootState) => state.feedback.feedbacks)
    const { feedbackId } = useParams()
    const router = useRouter()
    const getAllFeedbacks = async () => {
        try {
            await dispatch(fetchFeedbacks(feedbackId))
        } catch (error) {
            console.log({ error: error })
        }
    }

    if (!token) {
        router.push("/")
    }

    useEffect(() => {
        getAllFeedbacks()
    }, [])


    return (
        <div className='px-5 mt-2 max-w-screen-lg mx-auto'>
            <div className="">
                <div className='data-details block  mt-10'>
                    <div className='p-1 mb-2'>
                    </div>
                </div>
                <nav className="flex gap-6" aria-label="Tabs">


                </nav>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-left">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Date</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Feedback</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Analysis Result</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            feedbacks && feedbacks.map(feedback => (
                                <tr key={feedback.uuid}>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{formatDateTime(feedback.createdAt)}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{feedback.customerName}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{feedback.customerFeedback}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 capitalize">{feedback.sentiment}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div >
    )
}

export default Page