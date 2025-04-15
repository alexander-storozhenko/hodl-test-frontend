import { createFileRoute } from '@tanstack/react-router'
import CryptoExchangeCard from "@/components/crypto-exchange-card.tsx";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="h-[100vh] flex flex-1 justify-center items-center">
      <CryptoExchangeCard/>
    </div>
  )
}
