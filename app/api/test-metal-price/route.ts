import { NextResponse } from "next/server"

const METAL_PRICE_API_KEY = process.env.METALS_API_KEY || "ae97acf167389a7c805fa2fc3871d2b3"

export async function GET() {
  const testResults = {
    apiKey: METAL_PRICE_API_KEY ? "✓ Found" : "✗ Missing",
    tests: [] as any[],
    recommendation: "",
  }

  // Test 1: metals-api.com
  try {
    console.log("Testing metals-api.com...")
    const response1 = await fetch(
      `https://metals-api.com/api/latest?access_key=${METAL_PRICE_API_KEY}&base=USD&symbols=XAU`,
      {
        headers: { Accept: "application/json" },
      },
    )
    const data1 = await response1.json()
    testResults.tests.push({
      api: "metals-api.com",
      status: response1.status,
      success: data1.success || false,
      data: data1,
      error: data1.error || null,
    })
  } catch (error) {
    testResults.tests.push({
      api: "metals-api.com",
      status: "error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 2: metalpriceapi.com
  try {
    console.log("Testing metalpriceapi.com...")
    const response2 = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${METAL_PRICE_API_KEY}&base=USD&currencies=XAU`,
      {
        headers: { Accept: "application/json" },
      },
    )
    const data2 = await response2.json()
    testResults.tests.push({
      api: "metalpriceapi.com",
      status: response2.status,
      success: data2.success !== false,
      data: data2,
      error: data2.error || null,
    })
  } catch (error) {
    testResults.tests.push({
      api: "metalpriceapi.com",
      status: "error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 3: fcsapi.com
  try {
    console.log("Testing fcsapi.com...")
    const response3 = await fetch(
      `https://fcsapi.com/api-v3/forex/latest?symbol=XAUUSD&access_key=${METAL_PRICE_API_KEY}`,
      {
        headers: { Accept: "application/json" },
      },
    )
    const data3 = await response3.json()
    testResults.tests.push({
      api: "fcsapi.com",
      status: response3.status,
      success: data3.status === true,
      data: data3,
      error: data3.error || null,
    })
  } catch (error) {
    testResults.tests.push({
      api: "fcsapi.com",
      status: "error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 4: currencylayer.com
  try {
    console.log("Testing currencylayer.com...")
    const response4 = await fetch(
      `https://api.currencylayer.com/live?access_key=${METAL_PRICE_API_KEY}&currencies=XAU&source=USD`,
      {
        headers: { Accept: "application/json" },
      },
    )
    const data4 = await response4.json()
    testResults.tests.push({
      api: "currencylayer.com",
      status: response4.status,
      success: data4.success !== false,
      data: data4,
      error: data4.error || null,
    })
  } catch (error) {
    testResults.tests.push({
      api: "currencylayer.com",
      status: "error",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Find working API
  const workingApi = testResults.tests.find((test) => test.success === true)
  if (workingApi) {
    testResults.recommendation = `Use ${workingApi.api} - it's working with your API key!`
  } else {
    testResults.recommendation =
      "None of the tested APIs work with your key. Please check your API key or try a different service."
  }

  return NextResponse.json(testResults)
}
