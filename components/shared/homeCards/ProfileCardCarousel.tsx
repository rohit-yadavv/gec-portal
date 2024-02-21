'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProfileCard from "./ProfileCards";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
const ProfileCardCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    // d:basis-1/2 lg:basis-1/3">...</
    <Carousel plugins={[plugin.current]}>
      <CarouselContent>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem> 
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <ProfileCard />{" "}
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProfileCardCarousel;
