"use client"
import { RefreshCw, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GoldPriceToggleProps {
  currentPrice: number
  isRealTime: boolean
  onRefresh: () => void
  isLoading: boolean
  lastUpdated?: string
}

export function GoldPriceToggle({ currentPrice, isRealTime, onRefresh, isLoading, lastUpdated }: GoldPriceToggleProps) {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)} USD`
  }

  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    } catch {
      return "Unknown"
    }
  }

  return (
    <Card className="mb-8 border-gray-100 bg-gradient-to-r from-yellow-50 to-amber-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <p
                  className="text-gray-700 font-medium"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                  }}
                >
                  Current Gold Price
                </p>
                <Badge variant={isRealTime ? "default" : "secondary"} className="text-xs">
                  {isRealTime ? (
                    <>
                      <Zap className="w-3 h-3 mr-1" />
                      Live
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 mr-1" />
                      Mock
                    </>
                  )}
                </Badge>
              </div>
              <p
                className="text-black text-lg font-semibold mb-1"
                style={{
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 600,
                }}
              >
                {formatPrice(currentPrice)}/gram
              </p>
              {lastUpdated && isRealTime && (
                <p
                  className="text-gray-500 text-xs"
                  style={{
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Last updated: {formatTime(lastUpdated)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <Button
              onClick={onRefresh}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-amber-200 hover:bg-amber-50 bg-white/80 text-amber-800 hover:text-amber-900"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Updating..." : "🔄 Refresh with real-time gold value"}
            </Button>

            {isRealTime && <p className="text-xs text-amber-600 font-medium">Prices updated with live market data</p>}
          </div>
        </div>

        {isRealTime && (
          <div className="mt-4 p-3 bg-amber-100 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-800">
              <strong>Real-time pricing active:</strong> Product prices are calculated using current gold market rates.
              Prices are cached for 1 hour to optimize performance.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
