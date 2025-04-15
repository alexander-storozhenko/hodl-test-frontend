"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, ArrowUpDown, ChevronLeft, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - in a real app, this would come from an API
const cryptoData = {
  USD: { price: 1, name: "US Dollar" },
  BTC: { price: 67890.42, name: "Bitcoin" },
  ETH: { price: 3456.78, name: "Ethereum" },
  SOL: { price: 156.32, name: "Solana" },
  USDT: { price: 1.0, name: "Tether" },
}

export default function CryptoExchangeCard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    sendAmount: "1000",
    sendCrypto: "USD",
    getCrypto: "BTC",
    recipientAddress: "",
  })

  // Calculate fees and conversion
  const sendCryptoPrice = cryptoData[formData.sendCrypto as keyof typeof cryptoData]?.price || 0
  const getCryptoPrice = cryptoData[formData.getCrypto as keyof typeof cryptoData]?.price || 0

  // Convert send amount to USD value first
  const sendValueUSD = Number.parseFloat(formData.sendAmount) * sendCryptoPrice
  const exchangeFee = sendValueUSD * 0.01 // 1% exchange fee
  const sendValueAfterFee = sendValueUSD - exchangeFee

  // Convert USD value to target crypto
  const getAmount = sendValueAfterFee / getCryptoPrice

  // Network fee in target crypto
  const networkFee = formData.getCrypto === "BTC" ? 0.0005 : formData.getCrypto === "ETH" ? 0.003 : 0.00001

  // Generate a mock transaction ID
  const txid = "0x" + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendCryptoChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sendCrypto: value }))
  }

  const handleGetCryptoChange = (value: string) => {
    setFormData((prev) => ({ ...prev, getCrypto: value }))
  }

  const handleSwapCurrencies = () => {
    setFormData((prev) => ({
      ...prev,
      sendCrypto: prev.getCrypto,
      getCrypto: prev.sendCrypto,
      // Recalculate the sendAmount based on the current getAmount
      sendAmount: ((getAmount * getCryptoPrice) / sendCryptoPrice).toFixed(6),
    }))
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(txid)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      {step === 1 ? (
        <>
          <CardHeader>
            <CardTitle>Exchange Crypto</CardTitle>
            <CardDescription>Enter your exchange details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="sendAmount">You send</Label>
                <Input
                  id="sendAmount"
                  name="sendAmount"
                  value={formData.sendAmount}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sendCrypto">Currency</Label>
                <Select value={formData.sendCrypto} onValueChange={handleSendCryptoChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(cryptoData).map(([symbol, data]) => (
                      <SelectItem key={`send-${symbol}`} value={symbol}>
                        {data.name} ({symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-2 pb-1 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Exchange rate: 1 {formData.sendCrypto} = {(getCryptoPrice / sendCryptoPrice).toFixed(6)}{" "}
                {formData.getCrypto}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleSwapCurrencies}
                title="Swap currencies"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="getAmount">You get</Label>
                <Input id="getAmount" value={getAmount.toFixed(8)} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="getCrypto">Currency</Label>
                <Select value={formData.getCrypto} onValueChange={handleGetCryptoChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(cryptoData).map(([symbol, data]) => (
                      <SelectItem key={`get-${symbol}`} value={symbol}>
                        {data.name} ({symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Exchange fee:</span>
                <span className="font-medium">${exchangeFee.toFixed(2)} (1%)</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Network fee:</span>
                <span className="font-medium">
                  {networkFee} {formData.getCrypto}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="recipientAddress">Wallet address</Label>
              <Input
                id="recipientAddress"
                name="recipientAddress"
                value={formData.recipientAddress}
                onChange={handleInputChange}
                placeholder="Enter recipient wallet address"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleNext} disabled={!formData.recipientAddress}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </>
      ) : (
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
                  {Number.parseFloat(formData.sendAmount).toLocaleString()} {formData.sendCrypto}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">You get:</span>
                <span className="font-medium">
                  {getAmount.toFixed(8)} {formData.getCrypto}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recipient address:</span>
                <span className="font-medium truncate max-w-[180px]">{formData.recipientAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network fee:</span>
                <span className="font-medium">
                  {networkFee} {formData.getCrypto}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exchange fee:</span>
                <span className="font-medium">${exchangeFee.toFixed(2)} (1%)</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-muted-foreground">Txid:</span>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-xs truncate max-w-[140px]">{txid}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopyClick}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button>Confirm</Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

