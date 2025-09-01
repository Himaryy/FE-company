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
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AddCustomer = () => {
  const {
    addDataCustomer,
    provinceList,
    getProvinceList,
    cityList,
    getCityList,
    navigate,
  } = UseAppContext();

  async function onSubmit(values: CustomerFormValues) {
    const payload = {
      ...values,
      // identityNo: values.identityNo ?? "",
      // npwp: values.npwp ?? "",
      // email: values.email ?? "",
      // phone: values.phone ?? "",
      // mobile_phone: values.mobile_phone ?? "",
    };

    try {
      await addDataCustomer(payload);
      navigate("/customer");
    } catch (error) {
      console.error("Error kirim data", error);
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
          {/* Customer Form Component */}
          <CustomerForm
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
