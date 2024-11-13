import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

interface GetCommunityByNameProps {
    communityName: string
}

export const useGetCommunityByName = ({communityName}: GetCommunityByNameProps) => {
    const data = useQuery(api.community.getCommunityByName, { communityName })
    const isLoading = data === undefined
    return {data, isLoading}
}