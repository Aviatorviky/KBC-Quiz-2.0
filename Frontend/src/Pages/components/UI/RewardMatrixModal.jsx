import { useEffect, useState } from "react";
import {
  Trophy,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

import { TIERS } from "../../../Engine/TierEngine";

const formatMoney = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const shortMoney = (value) => {

  if (value >= 10000000)
    return `₹${(value / 10000000).toFixed(0)} Cr`;

  if (value >= 100000)
    return `₹${(value / 100000).toFixed(
      value >= 1000000 ? 1 : 0
    )} L`;

  return formatMoney(value);

};

const RewardMatrixModal = ({
  open,
  currentTier,
  currentPrize,
  guaranteedPrize,
  onContinue,
}) => {

  const [displayPrize, setDisplayPrize] =
    useState(0);

  useEffect(() => {

    if (!open) return;

    let value = 0;

    const step = Math.max(
      1,
      Math.floor(currentPrize / 60)
    );

    const timer = setInterval(() => {

      value += step;

      if (value >= currentPrize) {

        value = currentPrize;

        clearInterval(timer);

      }

      setDisplayPrize(value);

    }, 15);

    return () => clearInterval(timer);

  }, [open, currentPrize]);

  if (!open) return null;

  const ladder = [...TIERS].reverse();

  return (

<div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3">

<div
className="
w-full
max-w-5xl
max-h-[90vh]
overflow-hidden
rounded-sm
border
border-amber-neon
bg-[#09090d]
shadow-amber
flex
flex-col
"
>

{/* HEADER */}

<div className="px-6 py-5 border-b border-white/10">

<div className="flex items-center justify-center gap-3">

<Trophy
size={34}
className="text-amber-neon animate-bounce"
/>

<h1 className="font-display text-3xl md:text-4xl text-amber-neon glow-amber">

MISSION COMPLETE

</h1>

</div>

<p className="text-center text-[10px] uppercase tracking-[0.35em] text-white/50 mt-2">

Mainframe Security Layer Breached

</p>

</div>

{/* REWARD */}

<div className="px-6 pt-5">

<div className="border border-success/30 bg-success/10 rounded-sm p-4 text-center">

<div className="text-[10px] uppercase tracking-[0.35em] text-white/40">

Current Reward

</div>

<div className="font-display text-4xl md:text-5xl text-success glow-green mt-2">

{formatMoney(displayPrize)}

</div>

</div>

</div>

{/* BODY */}

<div className="flex-1 overflow-hidden p-5">

<div className="grid lg:grid-cols-[2fr_1fr] gap-4 h-full">

{/* LEFT */}

<div className="border border-white/10 rounded-sm overflow-hidden flex flex-col">

<div className="px-4 py-3 border-b border-white/10 flex justify-between">

<span className="text-cyan-neon text-xs uppercase tracking-[0.35em]">

Mission Ladder

</span>

<span className="text-white/40 text-xs">

36 Questions

</span>

</div>

<div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 max-h-[380px] scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent">
    
    {[4,3,2,1].map(zone=>{

const rows=ladder.filter(
t=>Math.ceil(t.level/3)===zone
);

return(

<div
key={zone}
className="border border-white/10 rounded-sm overflow-hidden"
>

<div
className="
bg-white/5
px-3
py-1
text-[10px]
tracking-[0.35em]
uppercase
text-white/40
border-b
border-white/10
"
>

TIER_{String(zone).padStart(2,"0")}

</div>

{rows.map(tier=>{

const active=
tier.level===currentTier;

const safe=
tier.reward===tier.guaranteed;

return(

<div

key={tier.level}

className={`
flex
items-center
justify-between
px-3
py-2
border-b
last:border-b-0
transition-all

${
active
?
"bg-amber-neon/10 border-l-4 border-l-amber-neon"
:
"hover:bg-white/5"
}

`}

>

<div className="flex items-center gap-3">

<span

className={`font-display font-bold

${
active
?
"text-amber-neon"
:
"text-cyan-neon"
}

`}

>

0x{String(tier.level).padStart(2,"0")}

</span>

<div>

<div
className="
font-display
text-white
"
>

{shortMoney(tier.reward)}

</div>

{

safe&&(

<div
className="
text-[8px]
tracking-[0.35em]
uppercase
text-cyan-neon
"
>

SAFE POINT

</div>

)

}

</div>

</div>

{

active&&(

<div
className="
text-[9px]
uppercase
tracking-[0.3em]
text-amber-neon
animate-pulse
"
>

CURRENT

</div>

)

}

</div>

);

})}

</div>

);

})}

</div>

</div>

{/* =======================
RIGHT PANEL
======================= */}

<div

className="
border
border-cyan-neon/20
rounded-sm
bg-cyan-neon/5
p-5
flex
flex-col
justify-between
"

>

<div>

<div

className="
text-cyan-neon
tracking-[0.35em]
uppercase
text-xs
mb-5
"

>

Checkpoint

</div>

<div className="space-y-4">

<div className="flex justify-between">

<span className="text-white/50">

Guaranteed

</span>

<span className="text-success">

{formatMoney(guaranteedPrize)}

</span>

</div>

<div className="flex justify-between">

<span className="text-white/50">

Current

</span>

<span className="text-amber-neon">

0x{String(currentTier).padStart(2,"0")}

</span>

</div>

<div className="flex justify-between">

<span className="text-white/50">

Questions

</span>

<span className="text-white">

36

</span>

</div>
<div className="flex justify-between">

<span className="text-white/50">

Safe Reward

</span>

<span className="text-cyan-neon">

{formatMoney(guaranteedPrize)}

</span>

</div>

</div>

</div>

{/* STATUS */}

<div className="mt-6 border border-success/20 bg-success/10 rounded-sm p-4">

<div className="text-success font-display tracking-[0.35em] uppercase text-sm">

ACCESS GRANTED

</div>

<p className="text-white/60 text-sm mt-2 leading-relaxed">

Security layer successfully breached.

Proceed to the next mission.

</p>

</div>

</div>

</div>

</div>

{/* FOOTER */}

<div className="border-t border-white/10 px-6 py-4">

<button

onClick={onContinue}

className="

w-full

py-4

font-display

tracking-[0.35em]

text-lg

border

border-cyan-neon

text-cyan-neon

bg-cyan-neon/10

hover:bg-cyan-neon

hover:text-black

transition-all

duration-300

"

>

▶ CONTINUE MISSION

</button>

</div>

</div>

</div>

);

};

export default RewardMatrixModal;