// -------------------- PACKAGE IMPORT FILES -------------------- //
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Phone, Mail, MapPin } from "lucide-react";

// -------------------- OTHER IMPORT FILES -------------------- //
import axiosInstance from "../shared/axios_API/axios";
import MaxWidthWrapper from "../widgets/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../shared/ui/accordion";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    subject: ""
  });

  const validateForm = () => {
    const newErrors = {};

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters long.";
    }

    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (formData.subject.trim().length < 10) {
      newErrors.subject = "Subject must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Invalid form data");
      return;
    }
    try {
      const response = await axiosInstance.post("/contact/contact-request", formData);
      if (response.status === 201) {
        toast.success("Message sent!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          subject: ""
        });
      }
    } catch (error) {
      toast.error("Request Failed");
    }
  };

  return (
    <MaxWidthWrapper className="pt-5">
      <div className="container py-8 mx-auto">
        <section className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-1 text-3xl font-bold tracking-tight capitalize text-primary sm:text-4xl md:text-5xl"
          >
            Get in touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-600 dark:text-gray-300 sm:text-base"
          >
            Our friendly team would love to hear from you.
          </motion.p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="lg:order-2">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none"
                    />
                    {errors.firstName && (
                      <span className="text-sm text-red-500">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none"
                    />
                    {errors.lastName && (
                      <span className="text-sm text-red-500">{errors.lastName}</span>
                    )}
                  </div>
                </div>
                <div className="relative w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="relative w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none"
                  />
                  {errors.phone && (
                    <span className="text-sm text-red-500">{errors.phone}</span>
                  )}
                </div>
                <div className="relative w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none"
                  />
                  {errors.subject && (
                    <span className="text-sm text-red-500">{errors.subject}</span>
                  )}
                </div>
                <div className="relative w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-sm focus:border-blue-500 focus:outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-sm hover:bg-blue-600 focus:outline-none"
                >
                  Send Message
                </button>
              </form>
            </CardContent>
          </Card>

          <div className="flex-grow space-y-8 lg:order-1">
            <div className="grid gap-4 md:grid-rows-3">
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <Phone size={24} className="text-primary" />
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+91 9244321195</p>
                  <p className="text-sm text-muted-foreground">
                    Daily : 7am-7pm
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <Mail size={24} className="text-primary" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">reeplayerindia@gmail.com</p>
                  <p className="text-sm text-muted-foreground">
                    We'll respond within 48 hours
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <MapPin size={24} className="text-primary" />
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Head Office No : 1 MPSEDC IT COMPLEX BUILDING, IT Park,
                    Badwai Bhopal <br /> 462033
                  </p>
                  <p className="text-muted-foreground">Bhopal, MP 462033</p>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
        <section className="mt-16">
          <h2 className="mb-4 text-3xl font-semibold text-[#16191E]">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are your delivery hours?</AccordionTrigger>
              <AccordionContent>
                We deliver 7 days a week, from 8am to 10pm. You can choose your
                preferred delivery slot during checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order is confirmed, you'll receive a tracking link via
                email and SMS. You can also track your order in real-time
                through our app.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What's your return policy?</AccordionTrigger>
              <AccordionContent>
                If you're not satisfied with any product, you can return it
                within 24 hours of delivery. Our delivery person can process the
                return at your doorstep.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Do you offer same-day delivery?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we offer same-day delivery for orders placed before 3pm,
                subject to availability and your location.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </MaxWidthWrapper>
  );
};

export default Contact;
