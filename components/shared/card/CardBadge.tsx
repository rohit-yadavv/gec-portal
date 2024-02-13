import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props{ 
    desc: string;
    value:string;
}

const CardBadge = ({value, desc}:Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
        <Badge
            key={value}
            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
          >
            {value}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {desc}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CardBadge;
