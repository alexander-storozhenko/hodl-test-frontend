import React, {useState} from 'react';
import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, Copy} from "lucide-react";
import {useWatch} from "react-hook-form";
import {post} from "@/helpers/urlHelper.ts";
import {shortAddress} from "@/helpers/address-helper.ts";

const CheckoutStep = ({form, handleBack, handleNext, exchangeFee, networkFee, setResponse}) => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const getValue = useWatch({
        control: form.control,
        name: "getValue",
    });

    const sendValue = useWatch({
        control: form.control,
        name: "sendValue",
    });

    const recipientAddress = useWatch({
        control: form.control,
        name: "recipientAddress",
    });

    return (
        <>
            <CardHeader>
                <CardTitle>Checkout</CardTitle>
                <CardDescription>Confirm your transaction details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="rounded-lg border p-3 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">You send:</span>
                        <span className="font-medium">
                            {Number.parseFloat(sendValue).toLocaleString()} {'USDT'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">You get:</span>
                        <span className="font-medium">
                  {parseFloat(getValue)?.toFixed(8)} {'BTC'}
                </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Recipient address:</span>
                        <span className="font-medium truncate max-w-[180px]">{shortAddress(recipientAddress)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Network fee:</span>
                        <span className="font-medium">
                            {networkFee} {'BTC'}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Exchange fee:</span>
                        <span className="font-medium">
                            {exchangeFee}
                        </span>
                    </div>

                    <div className="text-destructive">{error}</div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button disabled={isLoading} variant="outline" onClick={handleBack}>
                    <ChevronLeft className="mr-2 h-4 w-4"/> Back
                </Button>
                <Button
                    disabled={isLoading}
                    onClick={() => {
                        setIsLoading(true)
                        post('transaction/create', {
                            recipient_address: recipientAddress,
                            amount: sendValue,
                            symbol: 'BTCUSDT',
                        }).then(res => {
                            setResponse(res)
                            handleNext()
                        }).catch(err => {
                            setError(err?.err ?? 'unknown error')
                        }).finally(() => {
                            setIsLoading(false)
                        })
                    }}
                >Confirm</Button>
            </CardFooter>
        </>
    );
};

export default CheckoutStep;