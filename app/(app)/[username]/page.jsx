import { getUserPosts } from "@/services/user";
import Portfolio from "@/components/widgets/Portfolio";

export default async function Page({ params }) {
   const { username } = await params;

   // Simulate fetching data from the API
   const apiResponse = [
      {
         _id: "68b47394f9d4a2947815b0e7",
         title: "Gerçek Zamanlı İhale Platformu Geliştirme",
         description:
            "Node.js ve WebSocket tabanlı, çok katılımcılı gerçek zamanlı ihale platformunun geliştirilmesi. Katılımcıların anlık teklif verebileceği, canlı bildirimlerin çalıştığı ve yönetici paneli olan bir sistem yapılacak.",
         author: {
            name: "Nurullah Nergiz",
            profilePicture: "avatars/689cdf84760dd260489dc065.png",
         },
      },
   ];

   // Map API response to portfolio items
   const portfolioItems = apiResponse.map((item) => ({
      image: item.author.profilePicture
         ? `https://example.com/${item.author.profilePicture}`
         : "https://via.placeholder.com/320x180",
      title: item.title,
      description: item.description,
   }));

   return (
      <>
         <Portfolio items={portfolioItems} />
      </>
   );
}
