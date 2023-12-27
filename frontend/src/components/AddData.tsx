import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import React from "react";

export default function AddData() {
  const id = React.useRef<HTMLInputElement>(null);
  const name = React.useRef<HTMLInputElement>(null);
  const location = React.useRef<HTMLInputElement>(null);

  async function AddData() {
    if (
      !id.current?.value ||
      !name.current?.value ||
      !location.current?.value
    ) {
      toast("All fields are required");
      return;
    }
    await axios
      .post("http://localhost:3000/company", {
        id: id.current?.value,
        name: name.current?.value,
        location: location.current?.value,
      })
      .then(() => {
        toast.success("Data Updated");
        window.location.reload();
      });
  }

  return (
    <div className="grid gap-4">
      <Input placeholder="id" ref={id} />
      <Input placeholder="name" ref={name} />
      <Input placeholder="location" ref={location} />
      <div>
        <Button className="w-32" onClick={() => AddData()}>
          <Plus /> Add
        </Button>
      </div>
    </div>
  );
}
