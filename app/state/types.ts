interface LoaderState {
    loading: boolean;
}

interface RegisterProps {
    name: string,
    password: string
}

interface LoginPayload {
    email: string,
    password: string
}

type UserState = {
    username: any;
    isAdmin: any;
    token?: string | null
}

type AlertState = {
    status: "SUCCESS" | "ERROR" | null,
    message: string | null
    title: string | null
    loading: boolean,
    timeoutId: NodeJS.Timeout | null;

}
type AlertProps = {
    message: string | null
    title: string | null
    status: "SUCCESS" | "ERROR" | null
    closeModal: () => void | null
}

type ProductType = {
    name: string;
    cost: string;
    user: {
        uuid: string;
        name: string;
    };
    updatedAt: string;
    createdAt: Date;
    uuid: string;
    feedbacks?: FeedBackType[]
}

type ProductState = {
    product: ProductType | null
    products: ProductType[]
}

type FeedBackType = {
    uuid: string;
    customerName: string;
    customerFeedback: string;
    sentiment: string;
    updatedAt: string;
    createdAt: Date;
}


type FeedbackState = {
    feedbacks: FeedBackType[]
}

