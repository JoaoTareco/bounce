"use client";

import BagCounter from "@/components/bag-number-counter";
import BillingDetails, { BillingDetailsSchema } from "@/components/billing-details";
import PersonalDetails, { PersonalDetailsSchema } from "@/components/personal-details";
import LoadingOverlay from "@/components/loading-overlay";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";

import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import { useRouter } from 'next/navigation';


// Initiate schema by importing from components. This way, we just need to edit inside each component if we want to add or remove fields
const schema = z.object({
  ...PersonalDetailsSchema.shape,
  ...BillingDetailsSchema.shape,
});

type FormFields = z.infer<typeof schema>;

const App = () => {

  // Use the useRouter hook to get access to the router object
  const router = useRouter();

  // State for number of bags
  const [number, setNumber] = useState(1);
  // State for price
  const [price, setPrice] = useState(null);
  // State for if booking gives error
  const [bookingError, setBookingError] = useState(false);


  // Increase variable for number of bags
  const handleNumberChange = (newValue: number) => {
    setNumber(newValue);
  };

  // Initiate Form
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods


  // Fetch price dynamically based on number of bags
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Each time we change the number of bags, fetch the price
        // Improvement: Limit the number of requests. As is, its not very scalable
        const response = await axios.post(`/api/calculate-price`, {number});

        // The price comes pre-calculated to keep all logic on the backend
        setPrice(response.data);

      } catch (error) {
        if (error instanceof Error) {
          console.error('API Error:', error.message);
        }
      }
    };

    fetchData();
  }, [number]); // Every time number changes, fetch new price


  // Handle form submit and push to success page if successful
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {

      // Post data to API with all fields for logging
      const response = await axios.post(`/api/post-booking`, {
        ...data, 
        number: number, 
        price: price,
        location: "Cody's Cookie Store"
      });

      // If there was an error in payment, render Retry button red
      if(response.data === false) {
        setBookingError(true);
      }else{
        // If successful redirect to success page
        router.push('/booking-success');
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('API Error:', error.message);
      }
    }
  };

  return (
    <div className="p-6">

      {isSubmitting && <LoadingOverlay/>}
      
      <div className="flex flex-col ">
          <div className="">Booking storage at:</div>
          <div className="font-semibold">Cody's Cookie Store</div>

          <div className="flex items-center justify-between mt-5">
            <span className="text-muted-foreground">
              Number of Bags
            </span>
            <BagCounter initialValue={number} onNumberChange={handleNumberChange}/>
          </div>

          <Separator className="mt-5 mb-5" />

          <FormProvider {...methods} >
            <form className="tutorial gap-2" id="form1" onSubmit={handleSubmit(onSubmit)}>
              <PersonalDetails errors={errors}/>
              <Separator className="mt-5 mb-5" />
              <BillingDetails errors={errors}/>
            </form>
          </FormProvider>
        </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
      <Separator className="mt-10 mb-5" />
        <div className="flex justify-between">

          <div className="grid grid-cols-1">
            <span className="">{number} bags</span>
            <span className="">{price}</span>
          </div>

          <Button form="form1" disabled={isSubmitting} type="submit" className={bookingError ? 'bg-red-500' : ''}>
            {bookingError ? "Retry" : "Submit"}
          </Button>

        </div>
      </div>
    </div>
 
  );
};


export default App;
