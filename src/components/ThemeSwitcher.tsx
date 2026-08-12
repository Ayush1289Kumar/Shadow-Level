import { Palette } from "lucide-react"
import { useTheme, type Theme } from "./ThemeProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const themes: { id: Theme; label: string }[] = [
  { id: "shadow", label: "Shadow Level" },
  { id: "radiant", label: "Radiant Light" },
  { id: "crimson", label: "Crimson Moon" },
  { id: "forest", label: "Deep Forest" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full text-silver hover:text-mana-bright hover:bg-mana-bright/10 transition-all duration-300 relative group"
          title="Change Theme"
        >
          <Palette className="w-5 h-5" />
          <span className="absolute left-16 px-3 py-1.5 rounded-md glass text-micro tracking-widest uppercase text-mana-bright opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none hidden md:block whitespace-nowrap z-50">
            Theme
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="glass border-mist text-moonlight bg-abyss/80 backdrop-blur-xl ml-4">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`cursor-pointer hover:bg-white/10 ${
              theme === t.id ? "text-mana-bright font-bold" : "text-silver"
            }`}
          >
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
