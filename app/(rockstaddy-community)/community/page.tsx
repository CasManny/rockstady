"use client"

import MeetingTypeList from "@/components/community/MeetingTypeList";
import { useEffect, useState } from "react";

const CommunityHomepage = () => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );
  const [date, setDate] = useState(() =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(new Date())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <section className="flex size-full flex-col gap-10 text-neutral-700">
    <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
      <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
        <h2 className="bg-slate-200 max-w-[270px] rounded py-2 text-center text-base font-normal">
          Upcoming Meeting at 12:30 PM
        </h2>
        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-4xl lg:text-7xl">{time}</h1>
          <p className="text-lg font-medium text-black lg:text-2xl">{date}</p>
        </div>
      </div>
      </div>
      <MeetingTypeList />
  </section>
  )
}

export default CommunityHomepage