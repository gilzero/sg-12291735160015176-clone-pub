import { Button } from "@/components/ui/button"
import { Bird, History, Home, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"

export function Navbar() {
  const router = useRouter()
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center space-x-2">
          <Link 
            href="/" 
            className="flex items-center space-x-3 px-4 py-2 hover:bg-accent rounded-md transition-colors"
          >
            <Bird className="h-5 w-5" />
            <span className="font-bold hidden sm:inline-block">Dreamer MoA</span>
            <span className="text-xs text-muted-foreground hidden sm:inline-block">(Experimental)</span>
          </Link>

          <nav className="flex items-center space-x-1">
            <Button
              variant={router.pathname === "/" ? "secondary" : "ghost"}
              size="sm"
              className="w-9 px-0"
              asChild
            >
              <Link href="/" title="Home">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant={router.pathname === "/history" ? "secondary" : "ghost"}
              size="sm"
              className="w-9 px-0"
              asChild
            >
              <Link href="/history" title="History">
                <History className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant={router.pathname === "/settings" ? "secondary" : "ghost"}
              size="sm"
              className="w-9 px-0"
              asChild
            >
              <Link href="/settings" title="Settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}