import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

interface GetCommunityByNameProps {
    id: Id<'community'>
}

export const useGetCommunityById = ({id}: GetCommunityByNameProps) => {
    const data = useQuery(api.community.get, { id })
    const isLoading = data === undefined
    return { data, isLoading}
}