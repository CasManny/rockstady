"use client";
import CreateClassModal from "@/components/community/CreateClassModal";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/use-getcallby-id";
import { useToast } from "@/hooks/use-toast";
import { useCreateClassModal } from "@/store/create-class-modal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium text-black lg:text-xl xl:min-w-32">
      {title}
    </h1>
    <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
      {description}
    </h1>
  </div>
);

const PersonalRoomPage = () => {
  const { user } = useUser();
  const { open: openCreateClassModal } = useCreateClassModal();
  const { toast } = useToast();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const { call } = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const router = useRouter();

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col gap-10 text-black">
      <CreateClassModal />
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.firstName}'s Meeting Room`}
        />
        <Table title="Meeting ID" description={`${meetingId}`} />
        <Table title="Invite Link" description={`${meetingLink}`} />
      </div>
      <div className="flex gap-5">
        <Button
          className="bg-blue-1/80 hover:bg-blue-1 text-white"
          onClick={startRoom}
        >
          start Meeting
        </Button>
        <Button
          className="bg-green-500/80 hover:bg-green-500 text-white"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
        >
          Copy Invitation
        </Button>
        <Button
          className="bg-rs-yellow/80 text-white hover:bg-rs-yellow"
          onClick={openCreateClassModal}
        >
          Create Class
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoomPage;