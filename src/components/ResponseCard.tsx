import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AIResponse } from "@/types/ai"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Copy, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useState } from "react"
import { MODEL_INFO } from "@/config/models"

export interface ResponseCardProps {
  response: AIResponse
  isLoading: boolean
}

export function ResponseCard({ response, isLoading }: ResponseCardProps) {
  const [copied, setCopied] = useState(false)
  const modelKey = Object.entries(MODEL_INFO).find(
    ([_, info]) => info.humanReadableName === response.model
  )?.[0]
  const modelInfo = modelKey ? MODEL_INFO[modelKey as keyof typeof MODEL_INFO] : null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response.response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full h-full transition-all duration-200 hover:shadow-lg animate-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {response.model}
          </CardTitle>
          <CardDescription className="text-xs">
            {modelInfo?.version}
          </CardDescription>
        </div>
        {!isLoading && response.response && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full animate-pulse" />
            <Skeleton className="h-4 w-[90%] animate-pulse" />
            <Skeleton className="h-4 w-[80%] animate-pulse" />
          </div>
        ) : response.error ? (
          <Alert variant="destructive" className="animate-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {response.error}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              className="text-sm text-muted-foreground"
              components={{
                p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                h1: ({ children }) => <h1 className="text-xl font-bold mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-4 space-y-1">{children}</ul>,
                ol: ({ children }) => (
                  <ol className="list-decimal pl-4 mb-4 space-y-1">{children}</ol>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
                code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>,
                pre: ({ children }) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-primary/20 pl-4 italic mb-4">{children}</blockquote>,
              }}
            >
              {response.response}
            </ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  )
}