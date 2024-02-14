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
            className="subtle-medium bg-light-800 hover:bg-light-700 dark:bg-dark-300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 uppercase"
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
