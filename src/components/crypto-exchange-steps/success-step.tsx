import React from 'react';
import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Copy} from "lucide-react";

const SuccessStep = ({response}) => {
    return (
        <>
            <CardHeader>
                <CardTitle>{response?.err  ? 'Something went wrong' : 'Successful'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {
                    response?.err
                        ?
                        <div className="text-m text-destructive leading-none tracking-tight">
                            {response?.err}
                        </div>
                        :
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-muted-foreground">Txid:</span>
                                <div className="flex items-center gap-1">
                                    <span className="font-mono text-xs truncate max-w-[140px]">{response?.txid}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                                        navigator.clipboard.writeText(response?.txid)
                                    }}>
                                        <Copy className="h-3 w-3"/>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <a
                                    className="underline"
                                    target="_blank"
                                    href={`https://mempool.space/signet/api/tx/${response?.txid}`}>mempool</a>
                            </div>
                        </div>
                }

            </CardContent>
        </>
    );
};

export default SuccessStep;