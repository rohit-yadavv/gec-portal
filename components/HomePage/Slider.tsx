import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = () => {
  return (
    // 50% on small screens and 33% on larger screens.
    <Carousel>
      <CarouselContent>
        <CarouselItem className="">
          <div className="relative h-[300px] w-full">
            <Image
              layout="fill"
              alt="image"
              src="/assets/homePage/image1.jpeg"
              className="size-full"
            />
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="relative h-[300px] w-full">
            <Image
              layout="fill"
              alt="image"
              src="/assets/homePage/image2.jpeg"
              className="size-full"
            />
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="relative h-[300px] w-full">
            <Image
              layout="fill"
              alt="image"
              src="/assets/homePage/image3.jpeg"
              className="size-full"
            />
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="relative h-[300px] w-full">
            <Image
              layout="fill"
              alt="image"
              src="/assets/homePage/image4.jpeg"
              className="size-full"
            />
          </div>
        </CarouselItem>
        <CarouselItem className="">
          <div className="relative h-[300px] w-full">
            <Image
              layout="fill"
              alt="image"
              src="/assets/homePage/image5.jpeg"
              className="size-full"
            />
          </div>
        </CarouselItem> 
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;
