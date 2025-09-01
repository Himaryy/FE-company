import {
  companyTypeEnum,
  CustomerSchema,
  type CustomerFormValues,
} from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { ListCitiesItems, ListProvinceItems } from "@/lib/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CustomerFormProps {
  initialValues?: Partial<CustomerFormValues>;
  onSubmit: (values: CustomerFormValues) => void;
  provinceList?: ListProvinceItems[];
  cityList?: ListCitiesItems[];
}

const CustomerForm = ({
  initialValues,
  onSubmit,
  provinceList,
  cityList,
}: CustomerFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const isAddCustomer = pathname.includes("add-customer");

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
      companyType: "person",
      ...initialValues, // buat edit kalo ada isi form nya pake data getCustomer by Code
    },
  });

  // const selectedProvince = form.watch("provinceCode");

  // const filterdCities = useMemo(() => {
  //   if (!selectedProvince) return [];
  //   return cityList.filter((city) => city.code === selectedProvince);
  // }, [selectedProvince, cityList]);

  useEffect(() => {
    if (cityList && provinceList) {
      if (cityList.length > 0 && provinceList.length > 0) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }
  }, [cityList, provinceList]);

  useEffect(() => {
    if (initialValues) {
      form.reset({
        name: "",
        identityNo: "",
        npwp: "",
        email: "",
        phone: "",
        mobile_phone: "",
        provinceCode: "",
        cityCode: "",
        address: "",
        companyType: "person",
        ...initialValues,
      });
    }
  }, [initialValues, form]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh] gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xl text-muted-foreground">Loading...</span>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Identity No */}
              <FormField
                control={form.control}
                name="identityNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identity Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NPWP */}
              <FormField
                control={form.control}
                name="npwp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPWP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* MObile Phone */}
              <FormField
                control={form.control}
                name="mobile_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={
                isAddCustomer
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : ""
              }
            >
              {/* Province */}
              {isAddCustomer && (
                <FormField
                  control={form.control}
                  name="provinceCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Province Code <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        // ini buat filter city by sleected province
                        // onValueChange={(value) => {
                        //   field.onChange(value);
                        //   form.setValue("cityCode", "");
                        // }}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Province" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {provinceList?.map((province) => (
                            <SelectItem
                              key={province.code}
                              value={province.code}
                            >
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* City */}
              {isAddCustomer && (
                <FormField
                  control={form.control}
                  name="cityCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        City Code <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        // disabled={!selectedProvince || filterdCities.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {cityList?.map((city) => (
                            <SelectItem key={city.code} value={city.code}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Address <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Company Type */}
            {isAddCustomer && (
              <FormField
                control={form.control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Type <span className="text-red-600">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      // disabled={!selectedProvince || filterdCities.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Company Type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {companyTypeEnum.map((company) => (
                          <SelectItem key={company} value={company}>
                            {company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="text-right">
              {isAddCustomer ? (
                <>
                  <Button type="submit">
                    Add Customer <PlusIcon className="ml-1" size={16} />
                  </Button>
                </>
              ) : (
                <>
                  <Button type="submit">
                    Update Customer <PlusIcon className="ml-1" size={16} />
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default CustomerForm;
