import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface PromptInputProps {
  onSubmit: (prompt: string) => void
  isLoading: boolean
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("")
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    setCharCount(prompt.length)
  }, [prompt])

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmit(prompt.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Card className="w-full animate-in">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Enter your prompt here... (Cmd/Ctrl + Enter to submit)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[120px] resize-none pr-16 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {charCount} chars
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={handleSubmit} 
                  className="w-full transition-all duration-200 hover:shadow-lg"
                  disabled={isLoading || !prompt.trim()}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Get AI Responses"
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Press Cmd/Ctrl + Enter to submit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}