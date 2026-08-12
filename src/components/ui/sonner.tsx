import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-center"
      expand={true}
      duration={2500}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black group-[.toaster]:border-0 group-[.toaster]:border-l-4 group-[.toaster]:shadow-2xl group-[.toaster]:font-display group-[.toaster]:px-6 group-[.toaster]:py-4 group-[.toaster]:rounded-none",
          description: "opacity-80 group-[.toast]:text-xs group-[.toast]:uppercase group-[.toast]:tracking-[0.3em]",
          title: "group-[.toast]:font-bold group-[.toast]:text-sm group-[.toast]:uppercase group-[.toast]:tracking-[0.2em]",
          icon: "group-[.toast]:mr-3 group-[.toast]:scale-125",
          success: "group-[.toaster]:border-l-mana group-[.toaster]:text-mana group-[.toaster]:box-glow-mana drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]",
          error: "group-[.toaster]:border-l-penalty group-[.toaster]:text-penalty group-[.toaster]:box-glow-penalty drop-shadow-[0_0_10px_rgba(255,0,60,0.5)]",
          info: "group-[.toaster]:border-l-silver group-[.toaster]:text-silver",
          actionButton: "group-[.toast]:bg-white group-[.toast]:text-black group-[.toast]:font-bold group-[.toast]:rounded-none",
          cancelButton: "group-[.toast]:bg-zinc-900 group-[.toast]:text-white group-[.toast]:rounded-none",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
