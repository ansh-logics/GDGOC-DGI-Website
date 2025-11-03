"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!mounted) return

    const newTheme = theme === "dark" ? "light" : "dark"
    console.log("Toggling theme from", theme, "to", newTheme)

    // Check if View Transition API is supported
    if (!document.startViewTransition || !buttonRef.current) {
      setTheme(newTheme)
      console.log("Theme set (no animation):", newTheme)
      return
    }

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme)
        })
      })

      await transition.ready

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } catch (error) {
      // Fallback if animation fails
      console.error("Theme transition error:", error)
      setTheme(newTheme)
    }
  }, [theme, setTheme, mounted, duration])

  if (!mounted) {
    return (
      <button
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 border-soft shadow-soft",
          className
        )}
        disabled
        {...props}
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-soft shadow-soft hover:shadow-medium transition-all duration-200",
        className
      )}
      {...props}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
