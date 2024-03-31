interface PlansProps {
  name: string
  description: string
  benifits: string[]
  price: string
}

export const Plans: PlansProps[] = [
  {
    name: "Pro plan",
    description: "Unlock the premieum features for your upcoming blogs.",
    benifits: [
      "unlimited Posts",
      "verified author badge",
      "unlimited users",
      "Dashboard analytics",
    ],
    price: "$50",
  },
]
