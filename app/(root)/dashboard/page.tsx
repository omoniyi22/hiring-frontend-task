"use client"
import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import { fetchProducts } from "@/app/state/product/productSlice";
import { Product } from "@/app/components/Product/Product";
import { redirect } from "next/navigation";
import ProductForm from "@/app/components/Product/ProductForm";


const Page  = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useSelector((state: RootState) => state.user)
    const [switchTab, setSwitchTab] = useState(false)
    const products = useSelector((state: RootState) => state.product.products)

    const getAllProducts = async () => {
        try {
            await dispatch(fetchProducts())
        } catch (error) {
            console.log({ error: error })
        }
    }

    if (!token) {
        redirect("/")
    }


    useEffect(() => {
        getAllProducts()
    }, [switchTab])



    return (
        <div className='px-5 mt-2 max-w-screen-lg mx-auto'>
            <div className="">
                <div className='data-details block  mt-5'>
                    <div className='p-1 mb-2'> Welcome </div>
                </div>
                <nav className="flex gap-3" aria-label="Tabs">
                    <button
                        onClick={() => setSwitchTab(false)}
                        className={!switchTab ? 'shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600 px-3' : 'shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 px-3'}
                        aria-current="page"
                    >
                        View Products
                    </button>

                    <button
                        className={switchTab ? 'shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600 px-3' : 'shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 px-3'}
                        onClick={() => setSwitchTab(true)}
                    >
                        Create Product
                    </button>

                </nav>
            </div>
            {
                !switchTab ?
                    < div className="flex flex-wrap mt-8 shadow">
                        {products && products.length > 0 ?
                            products && products.map(({ cost, name, feedbacks, uuid }, index) =>

                                <Product key={index} data={{ cost, name, feedbacks, uuid }} />

                            )
                            :
                            <div className="text-center">There is no product for now, please create a new product</div>
                        }
                    </div>
                    :
                    <ProductForm switchTab={() => setSwitchTab(false)} />
            }

        </div >
    )
}


export default Page