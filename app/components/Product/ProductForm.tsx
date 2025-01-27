"use client"

import { createAlert } from "@/app/state/alert/alertSlice"
import { AppDispatch, RootState } from "@/app/state/store"
import { createProduct } from "@/app/state/product/productSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/navigation'


type Props = {
    switchTab: () => void
}

const ProductForm = ({ switchTab }: Props) => {

    const [cost, setCost] = useState("")
    const [name, setName] = useState("")
    const { token } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

    if (!token) {
        router.push("/")
    }

    const submit = async (e: any) => {
        e.preventDefault()
        if (!name) {
            dispatch(createAlert({
                status: "ERROR",
                message: "Name field must not be empty",
                title: "Fill Empty Fields!"
            }))
        } else if (!cost) {
            dispatch(createAlert({
                status: "ERROR",
                message: "Cost field must not be empty",
                title: "Fill Empty Fields!"
            }))
        } else if (name && cost) {
            let data = { cost, name }
            await dispatch(createProduct(data))
                .unwrap()
            switchTab()
        }
    }

    return (
        <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Create a new Product!</h1>

                <p className="mt-4 text-gray-500">

                </p>
            </div>

            <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label className="sr-only" htmlFor="name">Product</label>
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Product Name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="sr-only" htmlFor="cost">Cost</label>
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Cost"
                        type="text"
                        id="cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                </div>


                <div className="mt-4">
                    <button
                        className="rounded-md bg-teal-600 px-5  py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 mx-auto"
                        onClick={submit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm