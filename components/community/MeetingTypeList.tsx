"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import MeetingModal from "./MeetingModal";
import { Textarea } from "../ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "../ui/input";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const router = useRouter();
  const { toast } = useToast();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create a call");
      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const descripition = values.description || "Instant meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            descripition,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting Created" });
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create meeting" });
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img={"/icons/add-meeting.svg"}
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img={"/icons/schedule.svg"}
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        img={"/icons/recordings.svg"}
        title="View Recordings"
        description="check out your recordings"
        handleClick={() => router.push('/community/recordings')}
        className="bg-purple-1"
      />
      <HomeCard
        img={"/icons/join-meeting.svg"}
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          className="text-center"
          title="Create meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal font-semibold leading-[22px] text-black ">
              Add a Description
            </label>
            <Textarea
              className="bg-white focus-visible:ring-0 font-semibold focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-black font-semibold ">
              Select date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM D, yyyy h:mm aa"}
              className="w-full rounded bg-white border p-2 focus:outline-none"
              onChange={(date) => setValues({ ...values, dateTime: date! })}
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          className="text-center"
          title="Meeting created"
          buttonText="Copy meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        title="Start an instant meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        title="Type th Link here"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <div className="border w-full rounded">
          <Input
            placeholder="Paste Meeting link"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
            className="border-none bg-white text-black font-semibold placeholder:font-normal"
          />
        </div>
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
