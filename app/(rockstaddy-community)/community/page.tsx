"use client";
import { useGetUserCommunities } from "@/features/community/api/use-get-communities";
import { useGetCommunityByName } from "@/features/community/api/use-get-community";
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import RockstaddyLogo from "./rockstaddy-logo";

const CommunityLink = ({ label, href }: { label?: string; href?: string }) => (
  <Link
    href={href || ""}
    className="flex justify-between items-center mt-5 hover:bg-rs-yellow hover:text-white bg-rs-yellow/20 p-5 rounded-md"
  >
    <span>{label}</span>
    <ArrowRight />
  </Link>
);
const Community = () => {
  const name = "Rockstaddy - Live community";
  const { user } = useUser();
  if (!user) {
    return;
  }

  const { data: rockstaddy, isLoading: isLoadingRockstaddy } =
    useGetCommunityByName({ communityName: name });
  const { data: otherCommunity, isLoading: isLoadingOtherCommunity } =
    useGetUserCommunities({ userId: user.id });

  return (
    <div className="h-full w-full relative">
      <RockstaddyLogo />
      <div className="max-w-3xl mx-auto sm:p-20 p-10 relative z-10 h-full">
        <div className="">
          <h1 className="font-bold text-rs-bg-dark">Your community</h1>
          <CommunityLink
            href={`/community/${rockstaddy?.[0]._id}`}
            label={rockstaddy?.[0].name}
          />
          {otherCommunity?.length! > 0 && (
            <>
              {otherCommunity?.map((community) => (
                <CommunityLink
                  href={`/community/${community?._id}`}
                  label={community?.name}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
