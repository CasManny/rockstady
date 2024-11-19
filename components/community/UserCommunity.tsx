"use client";
import { useGetUserCommunities } from "@/features/community/api/use-get-communities";
import { useGetCommunityByName } from "@/features/community/api/use-get-community";
import { useUser } from "@clerk/nextjs";
import CommunityWrapper from "./CommunityWrapper";
import CommunityLink from "./CommunityLink";
import { HashIcon, Loader } from "lucide-react";

const UserCommunity = () => {
  const name = "Rockstaddy - Live community";
  const { user } = useUser();
  if (!user) {
    return;
  }

  const { data: rockstaddy, isLoading: isLoadingRockstaddy } =
      useGetCommunityByName({ communityName: name });
    
  const { data: otherCommunity, isLoading: isLoadingOtherCommunity } =
      useGetUserCommunities({ userId: user.id });
    
      if (isLoadingRockstaddy || isLoadingOtherCommunity) {
        return (
          <div className="flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-sky-1" />
          </div>
        );
      }

    return (
        <div className="">
            <CommunityWrapper label="Your Community">
                <CommunityLink label={"Rockstaddy"} id={rockstaddy?.[0]._id!} icon={HashIcon} />
            </CommunityWrapper>
      </div>
  )
};

export default UserCommunity;
