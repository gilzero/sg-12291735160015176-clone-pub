import { useState, useEffect } from "react"
import Head from "next/head"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Clock, Trash2 } from "lucide-react"

interface HistoryItem {
  prompt: string
  timestamp: number
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem("promptHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const clearHistory = () => {
    localStorage.removeItem("promptHistory")
    setHistory([])
  }

  return (
    <>
      <Head>
        <title>History - MOA</title>
        <meta name="description" content="View your prompt history" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Prompt History</h1>
            <Button
              variant="destructive"
              size="sm"
              onClick={clearHistory}
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear History</span>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <Clock className="h-12 w-12 mb-4" />
                    <p>No prompt history yet</p>
                    <p className="text-sm">Your previous prompts will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                          <p className="text-sm">{item.prompt}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}