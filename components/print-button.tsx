"use client";

import { Printer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function PrintButton() {
    return (
        <button type="button" onClick={() => window.print()} className={buttonVariants({ variant: "outline" })}>
            <Printer className="size-4" aria-hidden="true" />
            Print
        </button>
    );
}