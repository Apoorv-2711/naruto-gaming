import type React from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react"

const QualitySelector: React.FC = () => {
  // In a real implementation, you'd get these qualities from the HLS manifest
  const qualities = ["Auto", "1080p", "720p", "480p", "360p"]

  const handleQualitySelect = (quality: string) => {
    // Here you would typically update the video player's quality
    console.log(`Selected quality: ${quality}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {qualities.map((quality) => (
          <DropdownMenuItem key={quality} onSelect={() => handleQualitySelect(quality)}>
            {quality}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default QualitySelector

