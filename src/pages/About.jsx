// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaAndroid } from "react-icons/fa6";
import { Apple, Leaf, ShieldCheck, Truck } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { Motion } from "../widgets/motion";
import { Button } from "../shared/ui/button";
import { Card, CardContent } from "../shared/ui/card";
import MaxWidthWrapper from "../widgets/max-width-wrapper";
import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation, } from "../shared/ui/carousel";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MaxWidthWrapper className="pt-5">
      <div className="container py-8 mx-auto">
        <section className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-2 text-3xl font-bold tracking-tight capitalize text-primary sm:text-4xl md:text-5xl"
          >
            <span className="text-black">About</span> ~ RGS Groceries
          </motion.h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Bringing fresh, quality groceries to your doorstep
          </p>
          <div className="relative h-64 overflow-hidden rounded-xl">
            <img
              src="https://imageio.forbes.com/specials-images/imageserve/1183012322/0x0.jpg?format=jpg&crop=3189,1793,x0,y168,safe&height=600&width=1200&fit=bounds"
              alt="Fresh produce"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">

            </div>
          </div>
        </section>

        <Motion direction="up" duration={1.8} up={70}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              <span className="text-black">Our</span> Mission
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-300"
            >
              RGS Grocery aims to provide high-quality, fresh, and affordable groceries to customers, ensuring convenience and satisfaction. We are dedicated to fostering sustainable practices, supporting local communities, and enhancing the overall grocery shopping experience through innovation and exceptional service.
            </motion.p>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8} up={200}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              <span className="text-black">Our</span> Vision
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Trusted Grocery Provider
                </h3>
                <p className="text-muted-foreground">
                  To establish ourselves as the most trusted and customer-centric grocery platform, delivering seamless shopping experiences both online and offline, catering to diverse household needs.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Championing Sustainability
                </h3>
                <p className="text-muted-foreground">
                  To lead in promoting eco-conscious grocery shopping by adopting innovative practices, reducing environmental impact, and supporting a sustainable future through responsible packaging and waste management.
                </p>
              </div>
            </div>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              <span className="text-black">Our</span> Values
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <Leaf className="w-12 h-12 mb-4 text-green-500" />
                  <h3 className="mb-2 text-xl font-semibold">Sustainability</h3>
                  <p className="text-center text-muted-foreground">
                    We're committed to eco-friendly practices, from sourcing to
                    delivery.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <ShieldCheck className="w-12 h-12 mb-4 text-blue-500" />
                  <h3 className="mb-2 text-xl font-semibold">Quality</h3>
                  <p className="text-center text-muted-foreground">
                    We handpick every item to ensure only the best reaches your
                    kitchen.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <Truck className="w-12 h-12 mb-4 text-purple-500" />
                  <h3 className="mb-2 text-xl font-semibold">Convenience</h3>
                  <p className="text-center text-muted-foreground">
                    Fast, reliable delivery that fits your busy lifestyle.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              <span className="text-black">Our</span>Testimonials
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card >
                <CardContent className="p-6">
                  <p className="mb-4 italic text-muted-foreground">
                    "Their delivery service is impeccable! Groceries arrive on time and in perfect condition. RGS Grocery has made my life so much easier. Highly recommend!"
                  </p>
                  <p className="font-semibold">
                    - Happy Customer 1
                  </p>
                </CardContent>
              </Card>
              <Card >
                <CardContent className="p-6">
                  <p className="mb-4 italic text-muted-foreground">
                    "Their customer service is fantastic. Any issues are resolved promptly. Shopping at RGS Grocery is always a pleasant and hassle-free experience. Truly customer-focused!"
                  </p>
                  <p className="font-semibold">
                    - Happy Customer 2
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8}>
          <section className="text-center ">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              Ready to Start Shopping Smarter?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Download the RGS Groceries app today and experience the future of
              grocery shopping.
            </p>
            <div className="justify-center mx-4 space-x-4 md:flex">
              <Button className="flex items-center mb-2">
                <Apple className="w-5 h-5 mr-2" />
                Download for iOS
              </Button>

              <Button className="flex items-center bg-black hover:bg-gray-900">
                <FaAndroid className="w-5 h-5 mr-2" />
                Download for Android
              </Button>
            </div>
          </section>
        </Motion>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;
