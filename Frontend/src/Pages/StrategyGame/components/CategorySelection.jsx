import GameEngine from "../../../Engine/GameEngine";

const CATEGORIES = [
  {
    name: "Sports",
    icon: "🏆",
    color: "border-green-400 hover:border-green-300",
  },
  {
    name: "Movies",
    icon: "🎬",
    color: "border-red-400 hover:border-red-300",
  },
  {
    name: "History",
    icon: "🏛️",
    color: "border-yellow-400 hover:border-yellow-300",
  },
  {
    name: "Science",
    icon: "🧪",
    color: "border-blue-400 hover:border-blue-300",
  },
  {
    name: "Maths",
    icon: "📐",
    color: "border-purple-400 hover:border-purple-300",
  },
  {
    name: "CyberSecurity",
    icon: "💻",
    color: "border-cyan-400 hover:border-cyan-300",
  },
];

const CategorySelection = ({ state, refresh }) => {
  const selectCategory = (category) => {
    GameEngine.dispatch({
      type: "SELECT_CATEGORY",
      payload: {
        category,
      },
    });

    refresh();
  };

  return (
    <div className="crt-scanlines animate-page min-h-screen flex items-center justify-center px-6 py-10">

      <div className="max-w-6xl w-full">

        <div className="term-panel-cyan p-8">

          <div className="text-center mb-10">

            <h1 className="font-display text-5xl text-cyan-neon glow-cyan mb-3">
              SELECT CATEGORY
            </h1>

            <p className="text-white/60 text-lg">
              Tier <span className="text-amber-neon">{state.currentTier}</span>
            </p>

            <p className="text-white/40 mt-2">
              Choose wisely. A completed category cannot be selected again.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {CATEGORIES.map((item) => {

              const used = state.usedCategories.includes(item.name);

              return (

                <div
                  key={item.name}
                  onClick={() => {
                    if (!used) {
                      selectCategory(item.name);
                    }
                  }}
                  className={[
                    "group border rounded-sm p-8 transition-all duration-300 select-none",
                    used
                      ? "border-white/10 opacity-25 cursor-not-allowed"
                      : `${item.color} cursor-pointer hover:scale-105 hover:bg-white/5 hover:shadow-lg`,
                  ].join(" ")}
                >

                  <div className="text-6xl text-center mb-5 transition-transform duration-300 group-hover:scale-110">

                    {item.icon}

                  </div>

                  <h2 className="text-center font-display text-2xl text-cyan-neon">

                    {item.name}

                  </h2>

                  <div className="mt-5 text-center">

                    {used ? (
                      <span className="text-red-400 tracking-widest uppercase text-xs">
                        Completed
                      </span>
                    ) : (
                      <span className="text-green-400 tracking-widest uppercase text-xs">
                        Click To Play
                      </span>
                    )}

                  </div>

                </div>

              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
};

export default CategorySelection;