"use client"
import Link from "next/link"


type ProductProps = {
    data: { name: string, cost: string, feedbacks?: FeedBackType[], uuid: string }
}

export const Product = ({ data }: ProductProps) => {
    return (
        <div className="sm:w-1/2 md:w-1/3 lg:w-1/3 p-2" key={data.uuid}>
            <article
                className="rounded-lg border border-gray-100 bg-[#d8dddf] p-4 pb-3 shadow-sm transition hover:shadow-lg sm:p-3"
            >
                <div className="flex justify-between">
                    <span className="inline-block rounded bg-blue-600 p-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                    </span>
                    <span> ${data.cost} </span>
                </div>

                <span>
                    <h3 className="mt-0.5 text-lg font-medium text-gray-900 line-clamp-3">
                        {data.name}
                    </h3>
                </span>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {data?.feedbacks?.length} feedbacks
                </p>

                <div className="flex mt-5 -mb-3 justify-between">
                    {data?.feedbacks && data?.feedbacks?.length > 0 ?
                        <Link className="group mt-4 mb-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600" href={`/feedbacks/${data.uuid}`}>
                            Check feedbacks
                            <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                &rarr;
                            </span>
                        </Link>
                        :
                        <span className="group mt-4 mb-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                            No feedbacks yet
                        </span>

                    }
                    <Link className="group mt-4 mb-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600" href={`/feedbacks/${data.uuid}/new`}>
                        <span className="inline-block  bg-blue-600 p-1 text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </span>
                        <span className="text-[11.5px] leading-snug">Add new <br /> feedback </span>
                    </Link>
                </div>
            </article >
        </div >
    )
}