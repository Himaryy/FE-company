import CustomerForm from "@/components/Customer/CustomerForm";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseAppContext } from "@/context/UseAppContext";
import type { CustomerFormValues } from "@/lib/zodSchemas";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const AddCustomer = () => {
  const {
    addDataCustomer,
    provinceList,
    getProvinceList,
    cityList,
    getCityList,
    navigate,
  } = UseAppContext();

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/customer";

  async function onSubmit(values: CustomerFormValues) {
    setIsLoading(true);

    try {
      const res = await addDataCustomer(values);
      if (res.responseCode === "20000") {
        navigate("/customer");
        toast.success("Berhasil menambah data customer", {
          richColors: true,
          position: "top-right",
        });
      }
    } catch {
      toast.error("Gagal menambah data customer", {
        richColors: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (provinceList.length === 0) {
      getProvinceList();
    }
  }, [provinceList, getProvinceList]);

  useEffect(() => {
    if (cityList.length === 0) {
      getCityList();
    }
  }, [cityList, getCityList]);

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          to={redirect}
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
          {/* Customer Form Component */}
          <CustomerForm
            isLoadingPostData={isLoading}
            onSubmit={onSubmit}
            provinceList={provinceList}
            cityList={cityList}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default AddCustomer;
