import { Id } from "@/convex/_generated/dataModel"
import { useParams } from "next/navigation"

export const useCommunityId = () => {
    const params = useParams()
    return params.communityId as Id<'community'>
}