import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

interface GetUserCommunitiesProps {
    userId: string
}

export const useGetUserCommunities = ({ userId }: GetUserCommunitiesProps) => {
    const data = useQuery(api.community.getAllUserCommunity, { userId })
    const isLoading = data === undefined

    return { data, isLoading }
}