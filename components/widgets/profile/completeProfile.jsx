"use client";
import { use } from "react";
import ChartsDoughnut from "@/components/charts/doughnut";
import userContext from "@/components/provider/userContext";
import { useCompleteProfileLogic } from "@/hooks/useCompleteProfileLogic";

export default function CompleteProfile({ user: userData = {} }) {
  // Determine source of user data safely
  const contextUser = use(userContext);
  
  // If userData prop is empty, try to use contextUser (handling potential tuple or object structure)
  const activeUser = Object.keys(userData).length > 0 
      ? userData 
      : (Array.isArray(contextUser) ? contextUser[0] : contextUser);

  const { fields, completionPercentage, isLoading } = useCompleteProfileLogic(activeUser);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-sm animate-pulse">
        <span className="text-gray-400">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <section 
      className="flex flex-col gap-6 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800"
      aria-labelledby="profile-completion-title"
    >
      <header className="text-center space-y-1">
        <h2 id="profile-completion-title" className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Profilinizi Tamamlayın
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Daha fazla görünürlük için profilinizi güncel tutun.
        </p>
      </header>

      <div className="relative w-full max-w-[180px] mx-auto aspect-square">
        <ChartsDoughnut
          datasets={[
            {
              label: "Tamamlanma Oranı",
              data: [100 - completionPercentage, completionPercentage],
              backgroundColor: ["#f3f4f6", "#d81f26"], // Gray-100 for empty, Brand Red for full
              hoverBackgroundColor: ["#e5e7eb", "#b91c1c"],
              borderWidth: 0,
              cutout: "75%",
            },
          ]}
        />
        {/* <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
          <span className="text-2xl font-bold text-zinc-800 dark:text-white">
            %{completionPercentage}
          </span>
        </div> */}
      </div>

      <ul className="flex flex-col gap-2 pr-1">
        {fields.map(({ key, label, isComplete }) => (
          <li
            key={key}
            className={`
              group flex items-center justify-between p-3 rounded-lg transition-all duration-200 border
              ${isComplete 
                ? "bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/20" 
                : "bg-zinc-50 border-zinc-100 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:border-zinc-800 dark:hover:bg-zinc-800"
              }
            `}
          >
            <span className={`text-sm font-medium ${isComplete ? "text-green-700 dark:text-green-400" : "text-zinc-600 dark:text-zinc-300"}`}>
              {label}
            </span>
            
            <i
              className={`bx text-xl ${
                isComplete
                  ? "bx-check-circle text-green-500"
                  : "bx-x-circle text-zinc-300 group-hover:text-zinc-400"
              }`}
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
