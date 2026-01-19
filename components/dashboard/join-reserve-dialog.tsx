"use client";

import { useState } from "react";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function JoinReserveDialog() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder implementation
    alert(`Join logic for code: ${code} to be implemented.`);
    setOpen(false);
    setCode("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Join Existing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Reserve</DialogTitle>
          <DialogDescription>
            Enter the invitation code provided by the reserve owner.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Invitation Code</Label>
            <Input 
                id="code" 
                placeholder="INV-123-ABC" 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
                required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Join Reserve</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
