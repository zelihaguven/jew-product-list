"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface FilterState {
  minPrice: string
  maxPrice: string
  minPopularity: number[]
  maxPopularity: number[]
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  onReset: () => void
}

export function ProductFilters({ onFiltersChange, onReset }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: "",
    maxPrice: "",
    minPopularity: [0],
    maxPopularity: [100],
  })

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      minPrice: "",
      maxPrice: "",
      minPopularity: [0],
      maxPopularity: [100],
    }
    setFilters(resetFilters)
    onReset()
  }

  return (
    <Card className="border-gray-100">
      <CardHeader className="pb-4">
        <CardTitle
          className="text-black"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "15px",
          }}
        >
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label
            className="text-black"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: "15px",
            }}
          >
            Price Range (USD)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice" className="text-xs text-gray-500">
                Min
              </Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="h-8 border-gray-200 focus:border-gray-400 focus:ring-0"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-xs text-gray-500">
                Max
              </Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="No limit"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="h-8 border-gray-200 focus:border-gray-400 focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Popularity Range */}
        <div className="space-y-3">
          <Label
            className="text-black"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: "15px",
            }}
          >
            Popularity Score: {filters.minPopularity[0]}% - {filters.maxPopularity[0]}%
          </Label>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500">Minimum</Label>
              <Slider
                value={filters.minPopularity}
                onValueChange={(value) => handleFilterChange("minPopularity", value)}
                max={100}
                step={5}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">Maximum</Label>
              <Slider
                value={filters.maxPopularity}
                onValueChange={(value) => handleFilterChange("maxPopularity", value)}
                max={100}
                step={5}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full border-gray-200 hover:bg-gray-50 bg-transparent"
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
