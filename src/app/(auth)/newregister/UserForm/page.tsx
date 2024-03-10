"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(50, {
      message: "Username must be at most 50 characters long",
    }),
  lastname: z
    .string()
    .min(2, {
      message: "Lastname must be at least 2 characters long",
    })
    .max(50, {
      message: "Lastname must be at most 50 characters long",
    }),
  phone: z.string().length(12, {
    message: "Please enter a valid phone number",
  }),
});

export default function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      lastname: "",
      phone: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  function resetform() {
    form.reset({
      username: "",
      lastname: "",
      phone: "",
    });
  }
  return (
    <>
      <div className="container m-auto mb-5 mt-6 space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 lg:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
               Use a correctly formatted phone number to receive SMS notifications.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter Username" {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>Enter a username</FormDescription>
                          </FormItem>
                        )}
                      />
                    </label>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lastname</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter lastname" {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>Enter a Lastname</FormDescription>
                          </FormItem>
                        )}
                      />
                    </label>
                  </div>

                  <div className="sm:col-span-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                          <FormLabel className="text-left">
                            Phone Number
                          </FormLabel>
                          <FormControl className="w-full">
                            <PhoneInput
                              placeholder="Enter a phone number"
                              international={false}
                              defaultCountry="TH"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-left">
                            Enter a phone number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={resetform}
                >
                  Cancel
                </button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
