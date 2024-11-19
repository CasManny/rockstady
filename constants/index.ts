export const POINT_TO_REFILL = 20


export const quests = [
    {
      title: "Earn 50 Gems",
      value: 50,
    }, 
    {
      title: "Earn 250 Gems",
      value: 250,
    },
    {
      title: "Earn 450 Gems",
      value: 450,
    },
    {
      title: "Earn 1500 Gems",
      value: 1500,
    },
    {
      title: "Earn 5000 Gems",
      value: 5000,
    },
  
]

export const sidebarLinks = [
  {
    imgURL: '/icons/Home.svg',
    route: '/community',
    label: 'Home',
  },

  {
    imgURL: '/icons/upcoming.svg',
    route: '/community/upcoming',
    label: 'Upcoming',
  },
  {
    imgURL: '/icons/previous.svg',
    route: '/community/previous',
    label: 'Previous',
  },
  {
    imgURL: '/icons/Video.svg',
    route: '/community/recordings',
    label: 'Recordings',
  },
  {
    imgURL: '/icons/add-personal.svg',
    route: '/community/personal-room',
    label: 'Personal Room',
  },
];
  
export const avatarImages = [
  '/images/avatar-1.jpeg',
  '/images/avatar-2.jpeg',
  '/images/avatar-3.png',
  '/images/avatar-4.png',
  '/images/avatar-5.png',
];


export const generatebookCode = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length
  let code = ""
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    code += characters.charAt(randomIndex)
  }
  return code
}






 // <div className="h-full w-full relative">
    //   <RockstaddyLogo />
    //   <div className="max-w-3xl mx-auto sm:p-20 p-10 relative z-10 h-full">
    //     <div className="">
    //       <h1 className="font-bold text-rs-bg-dark">Your community</h1>
    //       <CommunityLink
    //         href={`/community/${rockstaddy?.[0]._id}`}
    //         label={rockstaddy?.[0].name}
    //       />
    //       {otherCommunity?.length! > 0 && (
    //         <>
    //           {otherCommunity?.map((community) => (
    //             <CommunityLink
    //               href={`/community/${community?._id}`}
    //               label={community?.name}
    //             />
    //           ))}
    //         </>
    //       )}
    //     </div>
    //   </div>
// </div>
    
// const CommunityLink = ({ label, href }: { label?: string; href?: string }) => (
//   <Link
//     href={href || ""}
//     className="flex justify-between items-center mt-5 hover:bg-rs-yellow hover:text-white bg-rs-yellow/20 p-5 rounded-md"
//   >
//     <span>{label}</span>
//     <ArrowRight />
//   </Link>
// );