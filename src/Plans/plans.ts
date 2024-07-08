interface PlansProps {
     name: string
     description: string
     benefits: string[]
     price: string
}

export const Plans: PlansProps[] = [
     {
          name: "Pro plan",
          description: "Unlock the premium features for your upcoming blogs.",
          benefits: [
               "unlimited Posts",
               "verified author badge",
               "unlimited users",
          ],
          price: "$50",
     },
     {
          name: "Basic plan",
          description: "Get started with essential features for your blog.",
          benefits: ["10 posts per month", "basic author badge", "1 user"],
          price: "$10",
     },
     {
          name: "Custom plan",
          description: "Tailor-made plan to suit your specific needs.",
          benefits: [
               "custom number of posts",
               "custom author badge",
               "custom number of users",
               "priority support",
          ],
          price: "Contact us for pricing",
     },
]
