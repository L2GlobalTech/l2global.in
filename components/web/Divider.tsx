// app/components/Divider.tsx
import clsx from "clsx";

type DividerProps = {
    label?: string;
    className?: string;
    lineClassName?: string;
    pillClassName?: string;
    dotClassName?: string;
    // variants
    color?: "gray" | "zinc" | "slate" | "neutral" | "white";
    thickness?: "thin" | "normal" | "thick";
    blur?: boolean;
    gradient?: boolean; // gradient line
    aos?: string;       // AOS animation type, e.g. "fade-up"
    aosDelay?: number;  // AOS delay in ms
    aosDuration?: number; // AOS duration in ms
};

const colorMap: Record<NonNullable<DividerProps["color"]>, string> = {
    gray: "border-[#14141433]/20 text-gray-600",
    zinc: "border-zinc-300 text-zinc-600",
    slate: "border-slate-300 text-slate-600",
    neutral: "border-neutral-300 text-neutral-600",
    white: "border-white/30 text-white",
};

const thicknessMap: Record<NonNullable<DividerProps["thickness"]>, string> = {
    thin: "border",
    normal: "border-[1.5px]",
    thick: "border-2",
};

export default function Divider({
    label,
    className,
    lineClassName,
    pillClassName,
    dotClassName,
    color = "gray",
    thickness = "thin",
    blur = false,
    gradient = false,
    aos = "fade-up",
    aosDelay = 0,
    aosDuration = 700,
}: DividerProps) {
    return (
        <div
            className={clsx(
                "relative py-4 select-none",
                blur && "backdrop-blur-[1px]",
                className
            )}
            role="separator"
            aria-orientation="horizontal"
            data-aos={aos}
            data-aos-delay={aosDelay}
            data-aos-duration={aosDuration}
            data-aos-once="true"
        >
            {/* the line behind */}
            <div className="absolute inset-0 flex items-center">
                {gradient ? (
                    <div
                        className={clsx(
                            "w-full",
                            // gradient divider uses background + 1px height
                            "h-px bg-linear-to-r from-transparent via-gray-300 to-transparent",
                            color === "white" &&
                            "via-white/40", // adapt for dark backgrounds
                            lineClassName
                        )}
                    />
                ) : (
                    <div
                        className={clsx(
                            "w-full",
                            thicknessMap[thickness],
                            "border-t",
                            colorMap[color],
                            lineClassName
                        )}
                    />
                )}
            </div>

            {/* centered pill */}
            <div className="relative flex justify-center">
                <span
                    className={clsx(
                        // pill container
                        "inline-flex items-center gap-2 rounded-full",
                        "px-3 sm:px-4 py-1 sm:py-1.5",
                        "bg-[#F6F6F9] text-sm sm:text-base",
                        // allow gradient border option via wrapper trick
                        pillClassName
                    )}
                >
                    {/* left dot */}
                    <span
                        aria-hidden="true"
                        className={clsx(
                            "h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0",
                            dotClassName
                        )}
                    />
                    <span className="whitespace-nowrap font-medium text-sm md:text-lg tracking-[-0.5px] md:tracking-[-1px]">
                        {label}
                    </span>
                    {/* right dot */}
                    <span
                        aria-hidden="true"
                        className={clsx(
                            "h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0",
                            dotClassName
                        )}
                    />
                </span>
            </div>
        </div>
    );
}
