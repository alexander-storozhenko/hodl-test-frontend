import React from 'react';
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {useWatch} from "react-hook-form";
import {Checkbox} from "@/components/ui/checkbox.tsx";



const ConvertStep = ({data, form, networkFee, handleNext}) => {
    const exchangeRate = data?.price ? parseFloat(data?.price)?.toFixed(2) : 0

    const recipientAddress = useWatch({
        control: form.control,
        name: "recipientAddress",
    });

    const getValue = useWatch({
        control: form.control,
        name: "getValue",
    });

    console.log(getValue)

    return (
        <>
            <CardHeader>
                <CardTitle>Exchange Crypto</CardTitle>
                <CardDescription>Enter your exchange details</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => {
                        console.log('====', form.getValues())
                        handleNext()
                    })} className="space-y-4 w-[100%]">
                        <FormField
                            control={form.control}
                            name="sendValue"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex justify-between gap-2 align-center">
                                            <div className="flex flex-col flex-1 space-y-2">
                                                <Label htmlFor="sendValue">You send</Label>
                                                <Input
                                                    id="sendValue"
                                                    {...field}
                                                    onFocus={(e) => e.target.select()}
                                                    onChange={(e) => {
                                                        form.setValue('getValue', (((parseFloat(e.target.value) || 0) / exchangeRate) || 0).toFixed(10))
                                                        form.setValue('sendValue', parseFloat(e.target.value))
                                                    }}
                                                    type="number"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="sendCrypto">Currency</Label>
                                                <Select value={'USDT'}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select currency"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem key={`send-USDT`} value={'USDT'}>
                                                            USDT (USDT)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Exchange rate: 1 {'BTC'} ≈ {exchangeRate} {'USDT'}
                            </span>
                        </div>

                        <FormField
                            control={form.control}
                            name="getValue"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex justify-between gap-2">
                                            <div className="flex flex-col flex-1 space-y-2">
                                                <Label htmlFor="getValue">You get</Label>
                                                <Input
                                                    id="getValue"
                                                    {...field}
                                                    onFocus={(e) => e.target.select()}
                                                    onChange={(e) => {
                                                        console.log('sendvalue', (exchangeRate * parseFloat(e.target.value) || 0).toFixed(2))
                                                        form.setValue('sendValue', (exchangeRate * parseFloat(e.target.value) || 0).toFixed(2))
                                                        form.setValue('getValue', parseFloat(e.target.value))
                                                    }}
                                                    // value={formData.sendValue}
                                                    // onChange={(e) => {
                                                    //     setFormData((prev) =>
                                                    //         ({...prev, sendValue: parseFloat(e.target.value) || null}))
                                                    // }}
                                                    type="number"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="sendCrypto">Currency</Label>
                                                <Select value={'BTC'}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select currency"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem key={`send-BTC`} value={'BTC'}>
                                                            Bitcoin (BTC)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="pt-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Exchange fee:</span>
                                <span
                                    className="font-medium">${(parseFloat(getValue ?? 0)?.toFixed(5) || 0) * 0.03 || '-'} (3%)</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                                <span className="text-muted-foreground">Network fee:</span>
                                <span className="font-medium">
                                    {networkFee} {'BTC'}
                                </span>
                            </div>
                        </div>


                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="space-y-2 w-[100%] flex flex-col">
                                            <Label htmlFor="recipientAddress">Your Email address</Label>
                                            <Input
                                                type={'email'}
                                                {...field}
                                                placeholder="Enter email"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="kyc"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <Label htmlFor="recipientAddress">KYC/AML</Label>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="recipientAddress"
                            render={({field}) => (
                                <FormItem className="w-[100%]">
                                    <FormControl>
                                        <div className="space-y-2 w-[100%] flex flex-col">
                                            <Label htmlFor="recipientAddress">Wallet address (P2PKH only)</Label>
                                            <Input
                                                {...field}
                                                placeholder="Enter recipient wallet address"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit" className="w-full"
                            disabled={!recipientAddress?.length}

                        >
                            Continue <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </form>

                </Form>
            </CardContent>
        </>
    );
};

export default ConvertStep;