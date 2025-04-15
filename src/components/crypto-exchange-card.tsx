import React, {useEffect, useState} from "react"

import {useQuery} from "@tanstack/react-query";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {get} from "@/helpers/urlHelper.ts";
import ConvertStep from "@/components/crypto-exchange-steps/convert-step.tsx";
import CheckoutStep from "@/components/crypto-exchange-steps/checkout-step.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import SuccessStep from "@/components/crypto-exchange-steps/success-step.tsx";

const cryptoData = {
    USDT: {price: 1, name: "USDT"},
    BTC: {price: 67890.42, name: "Bitcoin"},
}


// ....................................................................................

const formSchema = z.object({
    sendValue: z.preprocess((val) => {
        if (typeof val === "string") return parseFloat(val);
        return val;
    }, z.number().max(30, "Limit 30 USDT")),
    getValue: z.preprocess((val) => {
        if (typeof val === "string") return parseFloat(val);
        return val;
    }, z.number()),
    recipientAddress: z.string().min(10, "Recipient address is required"),
    email: z.string().email("Invalid email address"),

    kyc: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the KYC/AML policy." }),
    }),
})

export default function CryptoExchangeCard() {
    const {isPending, isError, data, refetch, error} = useQuery({
        queryKey: ['exchange-card'],
        queryFn: async () => {
            return await get(`exchange_rate?symbol=BTCUSDT`)
        },
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sendValue: 0,
            getValue: 0,
            recipientAddress: '',
            kyc: false,
        },
    })


    const [response, setResponse] = useState({})
    const [step, setStep] = useState(0)
    const exchangeFee = '3%'
    const networkFee = 0.000006

    const handleNext = () => {
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    useEffect(() => {
        setInterval(() => {
            refetch()
        }, 3000)
    }, [refetch]);

    const stepComponents = [
        <ConvertStep
            data={data}
            form={form}
            handleNext={handleNext}
            networkFee={networkFee}
            exchangeFee={exchangeFee}
        />,
        <CheckoutStep
            form={form}
            handleBack={handleBack}
            handleNext={handleNext}
            networkFee={networkFee}
            setResponse={setResponse}
            exchangeFee={exchangeFee}
        />,
        <SuccessStep response={response}/>
    ]


    return (
        <Card className="w-full max-w-md mx-auto">
            {
                stepComponents[step]
            }
        </Card>
    )
}

