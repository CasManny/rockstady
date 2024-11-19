"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter()
  const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const isMeetingOwer = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id

    if(!isMeetingOwer) return 
    return (
        <Button onClick={async () => {
            await call.endCall()
            router.push('/community')
        } } className="bg-red-500">
            End Call for Everyone
      </Button>
  );
};

export default EndCallButton;
