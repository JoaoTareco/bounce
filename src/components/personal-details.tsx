// NestedComponent1.tsx
"use client";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface PersonalDetailsProps {
  errors: any;
}

// Define schema and error messages with zod
export const PersonalDetailsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ errors }) => {

  const { register } = useFormContext();

  return (
    <div>
      <div className="font-semibold mb-2">Personal Details</div>
      <Input {...register("email")} type="text" placeholder="Email" className="mb-2"/>
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <Input {...register("password")} type="password" placeholder="Password" />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
    </div>
  );
};

export default PersonalDetails;
