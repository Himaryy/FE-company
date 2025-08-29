import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const SignUpForm = () => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="Nama">Nama</Label>
        <Input
          value=""
          // onChange={e=>setEmail(e.target.value)}
          required
          type="text"
          placeholder="John Doe"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="Phone">Phone Number</Label>
        <Input
          value=""
          // onChange={e=>setEmail(e.target.value)}
          required
          type="number"
          placeholder="08123456789"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="Email">Email</Label>
        <Input
          value=""
          // onChange={e=>setEmail(e.target.value)}
          required
          type="email"
          placeholder="JohnDoe@gmail.com"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="Address">Address</Label>
        <Input
          value=""
          // onChange={e=>setEmail(e.target.value)}
          required
          type="text"
          placeholder="Jl. Cikarang"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="Password">Password</Label>
        <Input
          value=""
          // onChange={e=>setEmail(e.target.value)}
          required
          type="password"
          placeholder="Jl. Cikarang"
        />
      </div>

      <Button>Sign Up</Button>
    </>
  );
};

export default SignUpForm;
