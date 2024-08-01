"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface ToastWithTitleProps {
  title: string;
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ToastWithTitle({
  title,
  description,
  open,
  setOpen,
}: ToastWithTitleProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      toast({
        title,
        description,
      });
      setOpen(false);
    }
  }, [open, toast, title, description, setOpen]);

  return null;
}
