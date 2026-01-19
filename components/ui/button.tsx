import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * AURIC / SHADCN UI BUTTON
 * --------------------------------
 * This component is based on shadcn/ui but heavily customized for the Auric design system.
 * 
 * CUSTOMIZATIONS:
 * 1. Default Variant: Gold gradient, drop shadow, and "shine" sweep animation.
 * 2. White Variants (Outline/Ghost): Added active "ripple" effect via ::before.
 * 3. General: Kinetic easing, hover scaling, and sharp corners (rounded-[2px]).
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] relative overflow-hidden",
  {
    variants: {
      variant: {
        // Gold Button - Shines on Hover AND Group Hover (when parent card is hovered)
        default: "bg-primary text-primary-foreground shadow-[0_10px_20px_rgba(142,111,62,0.2)] bg-gradient-to-br from-[var(--gold-primary)] to-[#8e6f3e] border-0 after:content-[''] after:absolute after:top-0 after:left-[-150%] after:w-[200%] after:h-[100%] after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:skew-x-[-20deg] after:transition-all after:duration-700 after:ease-out after:pointer-events-none hover:after:left-[150%] group-hover:after:left-[150%]",
        
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        
        // White/Outline Buttons - Gold Pulse on Click (Active State)
        outline:
          "border bg-background shadow-xs hover:border-[#c5a059] hover:bg-background/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-all duration-700 active:duration-0 active:border-[#c5a059] active:bg-[#8e6f3e] active:text-white active:shadow-[0_0_40px_10px_rgba(197,160,89,0.5)]",
        
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:border-[#c5a059]/50 transition-all duration-700 active:duration-0 active:bg-[#8e6f3e] active:text-white active:shadow-[0_0_40px_10px_rgba(197,160,89,0.5)]",
        
        ghost:
          "hover:bg-accent dark:hover:bg-accent/50 transition-all duration-700 active:duration-0 active:bg-[#c5a059]/20 active:text-[#c5a059] active:shadow-[0_0_30px_5px_rgba(197,160,89,0.3)]",
        
        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
