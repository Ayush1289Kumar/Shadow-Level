import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black group-[.toaster]:text-primary-foreground group-[.toaster]:border-primary/50 group-[.toaster]:shadow-[0_0_20px_rgba(59,130,246,0.3)] group-[.toaster]:font-display group-[.toaster]:border-2 overflow-hidden relative before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]",
          description: "group-[.toast]:text-blue-200/70 group-[.toast]:font-mono group-[.toast]:text-xs",
          title: "group-[.toast]:text-lg group-[.toast]:uppercase group-[.toast]:tracking-widest group-[.toast]:text-glow-primary",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
