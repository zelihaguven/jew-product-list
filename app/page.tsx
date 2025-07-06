"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { GoldPriceToggle } from "@/components/gold-price-toggle"
import { ApiTestPanel } from "@/components/api-test-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid, List } from "lucide-react"

interface Product {
  id: number
  name: string
  popularityScore: number
  weight: number
  price: number
  images: {
    yellow: string
    rose: string
    white: string
  }
}

interface ApiResponse {
  products: Product[]
  goldPrice: number
  isRealTimePrice: boolean
  timestamp: string
  cacheStatus?: string
  apiKeyStatus?: string
}

interface FilterState {
  minPrice: string
  maxPrice: string
  minPopularity: number[]
  maxPopularity: number[]
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [goldPrice, setGoldPrice] = useState<number>(0)
  const [isRealTimePrice, setIsRealTimePrice] = useState<boolean>(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [showApiTest, setShowApiTest] = useState<boolean>(true) // Show API test panel initially
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState<FilterState>({
    minPrice: "",
    maxPrice: "",
    minPopularity: [0],
    maxPopularity: [100],
  })

  const fetchProducts = async (useRealTimePrice = false) => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()

      if (useRealTimePrice) {
        params.append("realTimePrice", "true")
      }

      if (filters.minPrice) params.append("minPrice", filters.minPrice)
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)
      if (filters.minPopularity[0] > 0) params.append("minPopularity", filters.minPopularity[0].toString())
      if (filters.maxPopularity[0] < 100) params.append("maxPopularity", filters.maxPopularity[0].toString())

      console.log("Fetching products with params:", params.toString())

      const response = await fetch(`/api/products?${params.toString()}`)
      const data: ApiResponse = await response.json()

      console.log("API Response:", data)

      if (response.ok) {
        setProducts(data.products)
        setFilteredProducts(data.products)
        setGoldPrice(data.goldPrice)
        setIsRealTimePrice(data.isRealTimePrice)
        setLastUpdated(data.timestamp)

        // Hide API test panel after successful real-time price fetch
        if (useRealTimePrice && data.isRealTimePrice) {
          setShowApiTest(false)
        }
      } else {
        console.error("API Error:", data)
        throw new Error("Failed to fetch products")
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      // Show API test panel if there's an error
      setShowApiTest(true)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleRefreshGoldPrice = async () => {
    setIsRefreshing(true)
    await fetchProducts(true)
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      minPopularity: [0],
      maxPopularity: [100],
    })
  }

  const applyFilters = () => {
    fetchProducts(isRealTimePrice)
  }

  // Filter products by search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredProducts(filtered)
    }
  }, [searchTerm, products])

  // Initial load
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-left mb-8">
            <h1 className="text-black text-4xl font-light tracking-wide mb-2">Product List</h1>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search rings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-0 text-sm"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 md:hidden"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* API Test Panel - Show when needed */}
        {showApiTest && <ApiTestPanel />}

        {/* Gold Price Toggle */}
        <GoldPriceToggle
          currentPrice={goldPrice}
          isRealTime={isRealTimePrice}
          onRefresh={handleRefreshGoldPrice}
          isLoading={isRefreshing}
          lastUpdated={lastUpdated}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-6">
              <ProductFilters onFiltersChange={handleFiltersChange} onReset={handleResetFilters} />
              <Button onClick={applyFilters} className="w-full mt-4" disabled={isLoading}>
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-100 aspect-square rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600 text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                    {isRealTimePrice && <span className="text-amber-600 ml-2">• Live pricing active</span>}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
