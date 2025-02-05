import type React from "react";
import { Button } from "@/components/ui/button";
import { Subtitles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CaptionSelectorProps {
  tracks: { file: string; label: string; kind: string; default?: boolean }[];
  onCaptionChange: (label: string) => void;
  activeCaptionTrack: TextTrack | null;
}

const CaptionSelector: React.FC<CaptionSelectorProps> = ({
  tracks,
  onCaptionChange,
  activeCaptionTrack,
}) => {
  const handleTrackSelect = (label: string) => {
    onCaptionChange(label);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Subtitles className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => handleTrackSelect("Off")}>
          Off
        </DropdownMenuItem>
        {tracks.map((track) => (
          <DropdownMenuItem
            key={track.label}
            onSelect={() => handleTrackSelect(track.label)}
            className={
              activeCaptionTrack?.label === track.label ? "bg-accent" : ""
            }
          >
            {track.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CaptionSelector;
