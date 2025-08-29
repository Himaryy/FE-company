import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomerSchema, type CustomerFormValues } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AddCustomer = () => {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: "",
      identityNo: "",
      npwp: "",
      email: "",
      phone: "",
      mobile_phone: "",
      provinceCode: "",
      cityCode: "",
      address: "",
      companyType: "",
    },
  });

  function onSubmit(values: CustomerFormValues) {
    console.log(values);
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          to="/customer"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-xl font-bold">Add Customer</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Fill Form With Your Profil Information
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="identityNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identity Number</FormLabel>
                      <FormControl>
                        <Input placeholder="623624" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="npwp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NPWP</FormLabel>
                      <FormControl>
                        <Input placeholder="48.903" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="John.Doe@user.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="022-876" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="0877234875" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="provinceCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Province Code <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="0F12285C" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cityCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        City Code <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="17D6E5B9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Address <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="JL.KI ASNAWI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Type <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Prospect" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Button type="submit">
                  Add Customer <PlusIcon className="ml-1" size={16} />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddCustomer;
