"use client"

import { createAlert } from "@/app/state/alert/alertSlice"
import { AppDispatch, RootState } from "@/app/state/store"
import { createFeedback } from "@/app/state/feedback/feedbackSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from 'next/navigation'
import { getProduct } from "@/app/state/product/productSlice";


const NewTitle = () => {

    const [name, setName] = useState("")
    const [customerFeedback, setCustomerFeedback] = useState("")
    const { feedbackId } = useParams()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const product = useSelector((state: RootState) => state.product.product)


    const fetchProduct = async () => {
        try {
            await dispatch(getProduct(feedbackId)).unwrap()
        } catch (error) {
            router.push("/dashboard")
            console.log({ error })
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const submit = async (e: any) => {
        e.preventDefault()
        try {
            if (!customerFeedback) {
                dispatch(createAlert({
                    status: "ERROR",
                    message: "Subject field must not be empty",
                    title: "Fill Empty Fields!"
                }))
            } else if (customerFeedback) {
                let data = { name, customerFeedback, feedbackId }
                await dispatch(createFeedback(data))
                    .unwrap()
                router.push(`/feedbacks/${feedbackId}`)
            }
        } catch (error) {

        }
    }

    return (
        <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h2 className="text-2xl font-bold sm:text-3xl"><div>Product: {product?.name}</div></h2>
                <h1 className="text-2xl font-bold sm:text-3xl">Leave your feedback</h1>
                <p className="mt-4 text-gray-500">
                </p>
            </div>

            <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">

                <div>
                    <label className="sr-only" htmlFor="name">Title</label>
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="sr-only" htmlFor="message">Subject</label>
                    <textarea
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Feedback"
                        rows={8}
                        id="feedback"
                        value={customerFeedback}
                        onChange={e => setCustomerFeedback(e.target.value)}
                    ></textarea>
                </div>
                <div className="mt-4">
                    <button
                        className="rounded-md bg-teal-600 px-5  py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 mx-auto"
                        onClick={submit}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewTitle