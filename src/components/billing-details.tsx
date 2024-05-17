// NestedComponent1.tsx
"use client";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface BillingDetailsProps {
  errors: any;
}

// Defining schema and error messages with zod
export const BillingDetailsSchema = z.object({
  card: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
});

const BillingDetails: React.FC<BillingDetailsProps> = ({ errors }) => {

  const { register } = useFormContext();

  return (
    <div>
      <div className="font-semibold mb-2">Payment Information</div>
      <Input {...register("card")} type="number" placeholder="Card Number" />
      {errors.card && (
        <div className="text-red-500">{errors.card.message}</div>
      )}
    </div>
  );
};

export default BillingDetails;
