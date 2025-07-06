"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ApiTestResult {
  api: string
  status: number | string
  success: boolean
  data?: any
  error?: any
}

interface TestResults {
  apiKey: string
  tests: ApiTestResult[]
  recommendation: string
}

export function ApiTestPanel() {
  const [testResults, setTestResults] = useState<TestResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/test-metal-price")
      const results = await response.json()
      setTestResults(results)
    } catch (error) {
      console.error("Test failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (success: boolean, status: number | string) => {
    if (success) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (status === "error") return <XCircle className="w-4 h-4 text-red-500" />
    return <AlertCircle className="w-4 h-4 text-yellow-500" />
  }

  const getStatusBadge = (success: boolean, status: number | string) => {
    if (success) return <Badge className="bg-green-100 text-green-800">Working</Badge>
    if (status === "error") return <Badge variant="destructive">Error</Badge>
    return <Badge variant="secondary">Failed</Badge>
  }

  return (
    <Card className="mb-8 border-blue-100 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          API Connection Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Test your metal price API key with different providers to find the correct one.
          </p>

          <Button onClick={runTests} disabled={isLoading} className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Testing APIs..." : "Test API Connections"}
          </Button>

          {testResults && (
            <div className="space-y-4">
              <div className="p-3 bg-white rounded border">
                <p className="text-sm">
                  <strong>API Key Status:</strong> {testResults.apiKey}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Test Results:</h4>
                {testResults.tests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(test.success, test.status)}
                      <span className="font-medium">{test.api}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(test.success, test.status)}
                      <span className="text-xs text-gray-500">Status: {test.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white rounded border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Recommendation:</h4>
                <p className="text-sm text-blue-700">{testResults.recommendation}</p>
              </div>

              {/* Show detailed error info for debugging */}
              <details className="text-xs">
                <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                  Show detailed test results
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs">
                  {JSON.stringify(testResults, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
