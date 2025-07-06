import { type NextRequest, NextResponse } from "next/server"
import productsData from "@/data/products.json"

// Get API key from environment variables
const METAL_PRICE_API_KEY = process.env.METALS_API_KEY || "ae97acf167389a7c805fa2fc3871d2b3"

// Hardcoded gold price (USD per gram) - fallback
const HARDCODED_GOLD_PRICE = 65.23

// Cache for real-time gold price (1 hour cache)
let goldPriceCache: { price: number; timestamp: number } | null = null
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

interface Product {
  id: number
  name: string
  popularityScore: number
  weight: number
  images: {
    yellow: string
    rose: string
    white: string
  }
}

interface ProductWithPrice extends Product {
  price: number
}

async function getRealTimeGoldPrice(): Promise<number> {
  // Check cache first
  if (goldPriceCache && Date.now() - goldPriceCache.timestamp < CACHE_DURATION) {
    console.log("Using cached gold price:", goldPriceCache.price)
    return goldPriceCache.price
  }

  try {
    console.log("Fetching real-time gold price from API...")
    console.log("Using API Key:", METAL_PRICE_API_KEY ? "✓ API Key found" : "✗ API Key missing")

    // Using metals-api.com with your API key
    const response = await fetch(
      `https://metals-api.com/api/latest?access_key=${METAL_PRICE_API_KEY}&base=USD&symbols=XAU`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("API Response:", data)

    if (!data.success) {
      console.error("API Error:", data.error)
      throw new Error(`API Error: ${data.error?.info || "Unknown error"}`)
    }

    // XAU is gold price per troy ounce in USD
    const goldPricePerOunce = 1 / data.rates.XAU // Convert from XAU rate to USD per ounce
    const goldPricePerGram = goldPricePerOunce / 31.1035 // Convert troy ounce to grams

    console.log("Gold price per ounce:", goldPricePerOunce)
    console.log("Gold price per gram:", goldPricePerGram)

    // Update cache
    goldPriceCache = {
      price: goldPricePerGram,
      timestamp: Date.now(),
    }

    return goldPricePerGram
  } catch (error) {
    console.error("Error fetching real-time gold price:", error)

    // Try alternative API endpoint
    try {
      console.log("Trying alternative API endpoint...")
      const response = await fetch(
        `https://metals-api.com/api/latest?access_key=${METAL_PRICE_API_KEY}&base=XAU&symbols=USD`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        console.log("Alternative API Response:", data)

        if (data.success && data.rates.USD) {
          const goldPricePerOunce = data.rates.USD
          const goldPricePerGram = goldPricePerOunce / 31.1035

          // Update cache
          goldPriceCache = {
            price: goldPricePerGram,
            timestamp: Date.now(),
          }

          return goldPricePerGram
        }
      }
    } catch (altError) {
      console.error("Alternative API also failed:", altError)
    }

    // Fallback to hardcoded price
    console.log("Using fallback hardcoded price:", HARDCODED_GOLD_PRICE)
    return HARDCODED_GOLD_PRICE
  }
}

function calculatePrice(popularityScore: number, weight: number, goldPrice: number): number {
  return (popularityScore + 1) * weight * goldPrice
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const useRealTimePrice = searchParams.get("realTimePrice") === "true"
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minPopularity = searchParams.get("minPopularity")
    const maxPopularity = searchParams.get("maxPopularity")

    console.log("API Request - useRealTimePrice:", useRealTimePrice)
    console.log("Environment check:", {
      nodeEnv: process.env.NODE_ENV,
      hasApiKey: !!process.env.METALS_API_KEY,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    })

    // Get gold price
    const goldPrice = useRealTimePrice ? await getRealTimeGoldPrice() : HARDCODED_GOLD_PRICE

    console.log("Using gold price:", goldPrice, useRealTimePrice ? "(real-time)" : "(hardcoded)")

    // Calculate prices for all products
    let productsWithPrices: ProductWithPrice[] = productsData.map((product: Product) => ({
      ...product,
      price: calculatePrice(product.popularityScore, product.weight, goldPrice),
    }))

    // Apply filters
    if (minPrice || maxPrice) {
      const min = minPrice ? Number.parseFloat(minPrice) : 0
      const max = maxPrice ? Number.parseFloat(maxPrice) : Number.POSITIVE_INFINITY
      productsWithPrices = productsWithPrices.filter((product) => product.price >= min && product.price <= max)
    }

    if (minPopularity || maxPopularity) {
      const min = minPopularity ? Number.parseFloat(minPopularity) : 0
      const max = maxPopularity ? Number.parseFloat(maxPopularity) : 100
      productsWithPrices = productsWithPrices.filter(
        (product) => product.popularityScore >= min && product.popularityScore <= max,
      )
    }

    return NextResponse.json({
      products: productsWithPrices,
      goldPrice: Number(goldPrice.toFixed(2)),
      isRealTimePrice: useRealTimePrice,
      timestamp: new Date().toISOString(),
      cacheStatus: goldPriceCache ? "cached" : "fresh",
      apiKeyStatus: METAL_PRICE_API_KEY ? "configured" : "missing",
    })
  } catch (error) {
    console.error("Error in products API:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
