import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CardBadgeProps } from "@/types/components/card";



const CardBadge = ({value, desc}:CardBadgeProps) => { 
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
        <Badge 
            key={value}
            className="flex items-center justify-center gap-2 rounded-md border-none bg-light-800 px-4 py-2 text-[10px] font-medium uppercase leading-[13px] text-dark-200 hover:bg-light-700 dark:bg-dark-400"
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
