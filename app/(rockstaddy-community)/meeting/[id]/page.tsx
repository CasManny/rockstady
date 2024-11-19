"use client";
import Loader from "@/components/community/Loader";
import MeetingRoom from "@/components/community/MeetingRoom";
import MeetingSetup from "@/components/community/MeetingSetup";
import { useGetCallById } from "@/hooks/use-getcallby-id";
import { useGetMeetingId } from "@/hooks/use-meeting-id";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
const MeetingId = () => {
  const meetingId = useGetMeetingId()
  const { user, isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(meetingId!)
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if(!isLoaded || isCallLoading) return <Loader />
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingId;
