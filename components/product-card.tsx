"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

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

interface ProductCardProps {
  product: Product
}

const colorOptions = [
  { key: "yellow", name: "Yellow Gold", color: "#E6CA97", bgClass: "bg-[#E6CA97]" },
  { key: "white", name: "White Gold", color: "#D9D9D9", bgClass: "bg-[#D9D9D9]" },
  { key: "rose", name: "Rose Gold", color: "#E1A4A9", bgClass: "bg-[#E1A4A9]" },
] as const

export function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<keyof typeof product.images>("yellow")

  const rating = (product.popularityScore / 100) * 5 // Convert 0-100 to 0-5 scale

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)} USD`
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-black text-black" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-3 h-3 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-3 h-3 fill-black text-black" />
          </div>
        </div>,
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />)
    }

    return stars
  }

  const selectedColorName = colorOptions.find((color) => color.key === selectedColor)?.name || "Yellow Gold"

  return (
    <div className="group cursor-pointer bg-white">
      {/* Product Image */}
      <div className="relative aspect-square mb-3 overflow-hidden bg-gray-50 rounded-sm">
        <Image
          src={product.images[selectedColor] || "/placeholder.svg"}
          alt={`${product.name} in ${selectedColor}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        {/* Product Title */}
        <h3 className="text-black text-xs font-light leading-tight tracking-wide">{product.name}</h3>

        {/* Price */}
        <p className="text-black text-sm font-normal">{formatPrice(product.price)}</p>

        {/* Selected Color */}
        <p className="text-gray-600 text-sm font-normal" style={{ fontFamily: "Montserrat, sans-serif" }}>
          {selectedColorName}
        </p>

        {/* Color Options */}
        <div className="flex items-center space-x-1.5 pt-1">
          {colorOptions.map((color) => (
            <button
              key={color.key}
              className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                selectedColor === color.key
                  ? "border-black border-2 scale-110"
                  : "border-gray-300 hover:border-gray-400"
              } ${color.bgClass}`}
              onClick={() => setSelectedColor(color.key)}
              title={color.name}
            />
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 pt-1">
          <div className="flex items-center space-x-0.5">{renderStars(rating)}</div>
          <span className="text-black text-xs font-normal">{rating.toFixed(1)}/5</span>
        </div>
      </div>
    </div>
  )
}
