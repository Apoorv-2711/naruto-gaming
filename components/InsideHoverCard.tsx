import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function InsideHoverCard() {
  return (
    <Card className="w-[350px] bg-[#1e1e1e] text-white rounded-lg border-none bg-opacity-60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base font-bold">
          Spy x Family Season 2
        </CardTitle>
        <div className="flex items-center space-x-2 my-2">
          <Badge variant="secondary">8.13</Badge>
          <Badge variant="secondary">HD</Badge>
          <Badge variant="secondary">12</Badge>
          <Badge variant="secondary">10</Badge>
          <Badge variant="secondary">TV</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          With her ability to read minds, Anya Forger is the only one who knows
          the true identities of her unconventional family. Her...
        </p>
        <p className="text-xs my-4">
          Japanese: SPY×FAMILY Season 2
          <br />
          Aired: Oct 7, 2023
          <br />
          Status: Finished Airing
          <br />
          Genres: Action, Comedy, Slice of Life, Supernatural
        </p>
        <Button className="bg-[#facc15] text-black w-full">Watch now</Button>
      </CardContent>
    </Card>
  );
}
